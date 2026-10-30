import trimesh, numpy as np, json
from rules import classify, ich, igi, iv, pl, VL, VR
m=trimesh.load('../models/source_ensemble_meshy.glb',force='mesh'); m.merge_vertices()
V=m.vertices.copy(); F=m.faces; C=V[F].mean(1)
FL=np.load('labels.npy'); RC=classify(C,FL)
X,Y,Z=C.T
ax=np.abs(X)
def collar(x): return np.interp(np.abs(x),[0,0.008,0.035,0.065,0.1],[0.842,0.842,0.827,0.789,0.75])
mg_=np.clip((Y-0.66)/0.06,0,1)*0.004
dele=(RC==ich)&(Y<collar(X))&(Y>0.57)&(Z>0.02)&(X>pl(VL,Y)+mg_-0.0005)&(X<pl(VR,Y)-mg_+0.0005)

# front-visible ring around the hole for the surface fit
gx=np.floor(X/0.002).astype(int); gy=np.floor(Y/0.002).astype(int); key=gx*100000+gy
o=np.argsort(key); uk,st=np.unique(key[o],return_index=True); zmax=np.maximum.reduceat(Z[o],st)
front=Z>zmax[np.searchsorted(uk,key)]-0.004
vl,vr=pl(VL,Y),pl(VR,Y)
ring=~dele&front&(Z>0.02)&(Y>0.575)&(Y<0.86)&(X>vl-0.012)&(X<vr+0.012)&np.isin(RC,[igi,iv,ich])
ring&=~((X>vl+0.004)&(X<vr-0.004)&(Y<collar(X)-0.004))
def basis(x,y): return np.stack([np.ones_like(x),x,y,x*x,x*y,y*y,x**3,x*x*y,x*y*y,y**3],1)
A=basis(X[ring],Y[ring]); coef,*_=np.linalg.lstsq(A,Z[ring],rcond=None)
res=Z[ring]-A@coef; print('ring',ring.sum(),'fit rms mm',np.sqrt((res**2).mean())*1000)
fz=lambda x,y: basis(np.atleast_1d(x),np.atleast_1d(y))@coef
# patch paramétrique : lignes horizontales, bords exactement sur le V du gilet
cx_=np.linspace(0,0.1,400); cy_=collar(cx_)
def xmax_at(y):   # demi-largeur où la ligne de col passe à y-0.008
    k=np.where(cy_+0.008<y)[0]; return cx_[k[0]] if len(k) else 0.1
ys=np.linspace(0.574,0.852,190); nu=70; rows=[]
for y in ys:
    vy=np.array([y]); mg=np.clip((y-0.66)/0.06,0,1)*0.004
    lo=pl(VL,vy)[0]+mg-0.0015; hi=pl(VR,vy)[0]-mg+0.0015
    xm=xmax_at(y); lo=max(lo,-xm); hi=min(hi,xm)
    if hi<lo: lo=hi=(lo+hi)/2
    u=np.linspace(lo,hi,nu)
    e=np.minimum(u-lo,hi-u)                       # distance au bord
    dive=0.006*np.clip(1-e/0.004,0,1)**2           # plonge sous le gilet / le revers
    z=fz(u,np.full(nu,y))-0.004-dive
    rows.append(np.c_[u,np.full(nu,y),z])
Rp=np.array(rows); nv=len(ys); I=np.arange(nv*nu).reshape(nv,nu); faces=[]
for j in range(nv-1):
    for i in range(nu-1):
        a_,b_,c_,d_=I[j,i],I[j,i+1],I[j+1,i],I[j+1,i+1]; faces+=[[a_,b_,d_],[a_,d_,c_]]
P=Rp.reshape(-1,3)
patch=trimesh.Trimesh(P,np.array(faces),process=False)
if patch.face_normals[:,2].mean()<0: patch.invert()
np.savez('patch.npz',v=patch.vertices,f=patch.faces,n=patch.vertex_normals)
print('patch faces',len(patch.faces))
# repousser l'ancien drapé derrière le plastron (pas de trou)
inner_v=np.zeros(len(V),bool); inner_v[F[dele].ravel()]=True
border=np.zeros(len(V),bool); border[F[~dele].ravel()]=True
mv=inner_v&~border
V2=V.copy(); V2[mv,2]=np.minimum(V[mv,2],fz(V[mv,0],V[mv,1])-0.014)
np.save('verts_mod.npy',V2); np.save('del_faces.npy',np.zeros(len(F),bool))
# ---------- cravate procédurale ----------
SZ=lambda x,y: fz(x,y)-0.004          # surface de la chemise
def grid_mesh(PTS):                    # PTS: (nv,nu,3)
    nv,nu,_=PTS.shape; I=np.arange(nv*nu).reshape(nv,nu); fs=[]
    for j in range(nv-1):
        for i in range(nu-1):
            a,b,c,d=I[j,i],I[j,i+1],I[j+1,i],I[j+1,i+1]; fs+=[[a,c,d],[a,d,b]]
    return trimesh.Trimesh(PTS.reshape(-1,3),np.array(fs),process=False)
cx=0.0015
# pan (lame) : de 0.812 jusqu'au fond du V, s'élargit vers le bas, découpé sur le V
ys=np.linspace(0.812,0.575,140); nu=40; rows=[]
for y in ys:
    w=0.030+(0.812-y)*0.17                          # 3.0 cm -> ~7 cm
    lo=max(cx-w/2,pl(VL,np.array([y]))[0]+0.0012); hi=min(cx+w/2,pl(VR,np.array([y]))[0]-0.0012)
    if y<0.583 or hi-lo<0.0015: lo=hi=cx
    u=np.linspace(lo,hi,nu); t=(u-cx)/(w/2)          # -1..1 across full width
    dome=0.0026*(1-np.clip(t,-1,1)**2)
    dimple=-0.0018*np.exp(-((u-cx)/0.004)**2)*np.clip((y-0.775)/0.03,0,1)
    vy=np.array([y]); ev=np.minimum(u-pl(VL,vy)[0],pl(VR,vy)[0]-u)
    dv=0.005*np.clip(1-ev/0.005,0,1)**2
    z=SZ(u,np.full(nu,y))+0.0022+dome+dimple-dv
    rows.append(np.c_[u,np.full(nu,y),z])
blade=grid_mesh(np.array(rows))
# épaisseur de bord : murs latéraux de 2 mm
def wall(edge):
    top=edge; bot=edge.copy(); bot[:,2]-=0.0022
    return grid_mesh(np.stack([top,bot],1))
R=np.array(rows)
walls=[wall(R[:,0]),wall(R[:,-1])]
walls[1].invert()
# nœud : trapèze bombé, 4.4 cm en haut -> 2.2 cm en bas
kys=np.linspace(0.848,0.799,60); nu=50; krows=[]
for y in kys:
    v=(0.848-y)/0.049
    w=0.044-0.022*v**1.2
    u=np.linspace(cx-w/2,cx+w/2,nu); t=(u-cx)/(w/2)
    bul=0.0115*np.sqrt(np.clip(1-t**2,0,1))**0.8*(0.55+0.45*np.sin(np.pi*min(1,v*1.1+0.15)))*(1-0.75*np.clip((v-0.7)/0.3,0,1)**2)
    twist=0.0012*np.sin(2.4*t+1.0)*(1-v)          # léger pli diagonal
    z=SZ(u,np.full(nu,y))+0.003+bul+twist
    krows.append(np.c_[u,np.full(nu,y),z])
K=np.array(krows)
# rabattre les bords du nœud vers la chemise pour fermer le volume
K[:,0,2]=SZ(K[:,0,0],K[:,0,1])+0.001; K[:,-1,2]=SZ(K[:,-1,0],K[:,-1,1])+0.001
K[-1,:,2]=np.minimum(K[-1,:,2],SZ(K[-1,:,0],K[-1,:,1])+0.0045)
K[0,:,2]=SZ(K[0,:,0],K[0,:,1])+0.002; K[1,:,2]=0.5*(K[1,:,2]+K[0,:,2]+0.003)
knot=grid_mesh(K)
tie=trimesh.util.concatenate([blade,knot]+walls)
tie.fix_normals() if False else None
fn=tie.face_normals; 
np.savez('tie_fit.npz',v=tie.vertices,f=tie.faces,n=tie.vertex_normals)
print('tie faces',len(tie.faces),'front-facing frac',(fn[:,2]>0).mean())
