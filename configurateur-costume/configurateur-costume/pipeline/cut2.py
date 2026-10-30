import trimesh, numpy as np, json, sys
from rules import classify, names
m=trimesh.load('../models/source_ensemble_meshy.glb',force='mesh'); m.merge_vertices()
V=np.load('verts_mod.npy'); DEL=np.load('del_faces.npy'); F=m.faces; NV=len(V); NL=len(names)
mm=trimesh.Trimesh(V,F,process=False); VN=mm.vertex_normals.copy()
FL=np.load('labels.npy')
W=np.zeros((NV,NL))
for k in range(3): np.add.at(W,(F[:,k],FL),1.0)
W/=W.sum(1,keepdims=True)
E=mm.edges_unique; deg=np.bincount(E.ravel(),minlength=NV).astype(float)
for it in range(int(sys.argv[1]) if len(sys.argv)>1 else 8):
    Q=W.copy(); np.add.at(Q,E[:,0],W[E[:,1]]); np.add.at(Q,E[:,1],W[E[:,0]]); W=Q/(1+deg)[:,None]
VLd=W.argmax(1)
R=classify(V,VLd,VN)
VL=np.where(R>=0,R,VLd)
newP=[];newN=[];cache={}
def addv(p,n):
    n=n/np.linalg.norm(n); newP.append(p); newN.append(n); return NV+len(newP)-1
def edgept(i,j):
    key=(min(i,j),max(i,j))
    if key in cache: return cache[key]
    a,b=VL[i],VL[j]
    if R[i]>=0 and R[j]>=0:
        lo,hi=0.0,1.0
        for _ in range(14):
            t=(lo+hi)/2; p=V[i]*(1-t)+V[j]*t
            if classify(p[None],np.array([VLd[i]]),(VN[i]*(1-t)+VN[j]*t)[None])[0]==a: lo=t
            else: hi=t
        t=(lo+hi)/2
    else:
        fi=W[i,a]-W[i,b]; fj=W[j,a]-W[j,b]
        t=fi/(fi-fj) if fi!=fj else .5
    t=min(max(t,0.01),0.99)
    idx=addv(V[i]*(1-t)+V[j]*t,VN[i]*(1-t)+VN[j]*t); cache[key]=idx; return idx
parts=[[] for _ in range(NL)]
L3=VL[F]; same=(L3[:,0]==L3[:,1])&(L3[:,1]==L3[:,2])
for fi in np.where(~same&~DEL)[0]:
    tri=F[fi]; l=VL[tri]
    if len(set(l))==2:
        for r in range(3):
            if l[(r+1)%3]==l[(r+2)%3]: break
        i,j,k=tri[r],tri[(r+1)%3],tri[(r+2)%3]
        pij=edgept(i,j); pik=edgept(i,k)
        parts[VL[i]].append([i,pij,pik]); parts[VL[j]]+= [[pij,j,k],[pij,k,pik]]
    else:
        i,j,k=tri; c=addv(V[tri].mean(0),VN[tri].sum(0))
        pij=edgept(i,j); pjk=edgept(j,k); pki=edgept(k,i)
        parts[VL[i]]+=[[i,pij,c],[i,c,pki]]; parts[VL[j]]+=[[j,pjk,c],[j,c,pij]]; parts[VL[k]]+=[[k,pki,c],[k,c,pjk]]
P=np.vstack([V,np.array(newP)]); N=np.vstack([VN,np.array(newN)])
scene=trimesh.Scene(); built={}
tz=np.load('tie_fit.npz')
for l,n in enumerate(names):
    if n=='cravate':
        mm2=trimesh.Trimesh(tz['v'],tz['f'],vertex_normals=tz['n'],process=False)
    else:
        f=np.vstack([F[same&~DEL&(L3[:,0]==l)]]+([np.array(parts[l])] if parts[l] else []))
        used=np.unique(f); remap=-np.ones(len(P),int); remap[used]=np.arange(len(used))
        mm2=trimesh.Trimesh(P[used],remap[f],vertex_normals=N[used],process=False)
    if n=='chemise':
        pz=np.load('patch.npz'); mm2=trimesh.util.concatenate([mm2,trimesh.Trimesh(pz['v'],pz['f'],vertex_normals=pz['n'],process=False)])
    built[n]=mm2
g=built['gilet']; cc=sorted(g.split(only_watertight=False),key=lambda x:-len(x.faces))
for x in cc: x.vertex_normals=x.vertex_normals.copy()
built['gilet']=cc[0]
if len(cc)>1: built['veste']=trimesh.util.concatenate([built['veste']]+cc[1:])
for n in names:
    scene.add_geometry(built[n],node_name=n,geom_name=n); print(n,len(built[n].faces))
scene.export('costume_parts.glb')
