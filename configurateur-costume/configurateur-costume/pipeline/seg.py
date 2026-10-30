import trimesh, numpy as np, json, sys
from scipy.sparse import coo_matrix
from scipy.sparse.csgraph import dijkstra
m=trimesh.load('../models/source_ensemble_meshy.glb',force='mesh'); m.merge_vertices()
S=373.0
def px(p,q): return ((p-600)/S,(400-q)/S)
seeds=json.load(open('seeds.json'))
K=float(sys.argv[1]) if len(sys.argv)>1 else 40
C=m.triangles_center
adj=m.face_adjacency; ang=m.face_adjacency_angles; convex=m.face_adjacency_convex
d=np.linalg.norm(C[adj[:,0]]-C[adj[:,1]],axis=1)
w=d*(1+K*np.where(convex,0.15,1.0)*ang**2)+1e-9
G=coo_matrix((np.r_[w,w],(np.r_[adj[:,0],adj[:,1]],np.r_[adj[:,1],adj[:,0]])),shape=(len(C),)*2).tocsr()
src=[];lab=[]
names=list(seeds.keys())
for li,n in enumerate(names):
    for s in seeds[n]:
        x,y=px(s[0],s[1]); v=s[2] if len(s)>2 else 'f'
        if v=='f': o=[x,y,2.0]; dv=[0,0,-1.0]
        elif v=='b': o=[-x,y,-2.0]; dv=[0,0,1.0]
        else: o=[-2.0,y,x]; dv=[1.0,0,0]
        o=np.array([o]); dvec=np.array([dv])
        loc,ri,ti=m.ray.intersects_location(o,dvec,multiple_hits=True)
        if len(ti)==0: print('miss',n,s); continue
        k=np.argmin(np.linalg.norm(loc-o,axis=1)); src.append(ti[k]); lab.append(li)
dist,pred,sources=dijkstra(G,indices=src,min_only=True,return_predecessors=True)
srcmap=dict(zip(src,lab))
labels=np.array([srcmap.get(s,-1) for s in sources])

# ---- frontal chest override (traced on ortho normal map) ----
X,Y,Z=C[:,0],C[:,1],C[:,2]
def pl(pts,y):
    pts=np.array(sorted(pts)); return np.interp(y,pts[:,0],pts[:,1])
JL=[[0.86,-0.0765],[0.78,-0.074],[0.70,-0.070],[0.60,-0.067],[0.55,-0.065],[0.50,-0.062],[0.45,-0.062],[0.40,-0.065],[0.35,-0.072],[0.30,-0.080],[0.25,-0.090],[0.20,-0.105],[0.16,-0.115]]
JR=[[0.86,0.073],[0.78,0.071],[0.70,0.069],[0.60,0.060],[0.55,0.055],[0.50,0.053],[0.45,0.055],[0.40,0.060],[0.35,0.063],[0.30,0.070],[0.25,0.078],[0.20,0.088],[0.16,0.100]]
VL=[[0.84,-0.066],[0.80,-0.064],[0.70,-0.056],[0.65,-0.035],[0.62,-0.022],[0.60,-0.011],[0.583,0.0],[0.50,0.0]]
VR=[[0.84,0.064],[0.80,0.062],[0.70,0.053],[0.65,0.036],[0.62,0.026],[0.60,0.015],[0.583,0.003],[0.50,0.003]]
TL=[[0.846,-0.006],[0.83,-0.034],[0.80,-0.021],[0.79,-0.018],[0.75,-0.028],[0.70,-0.035],[0.60,-0.035]]
TR=[[0.846,0.005],[0.83,0.033],[0.80,0.020],[0.79,0.016],[0.75,0.030],[0.70,0.036],[0.60,0.036]]
# front visibility via depth binning (2mm)
gx=np.floor(X/0.002).astype(int); gy=np.floor(Y/0.002).astype(int)
key=gx*100000+gy
order=np.argsort(key); ks=key[order]; zs=Z[order]
uk,start=np.unique(ks,return_index=True)
zmax=np.maximum.reduceat(zs,start)
zfront=zmax[np.searchsorted(uk,key)]
front=(Z>zfront-0.025)&(Z>0)
iv,ich,itie,igi=names.index('veste'),names.index('chemise'),names.index('cravate'),names.index('gilet')
mann=names.index('mannequin')
jl,jr=pl(JL,Y),pl(JR,Y)
zone=(Z>0.02)&(Y>0.16)&(Y<0.86)&(np.abs(X)<0.17)&(labels!=mann)
lap=zone&(Y<0.83)&(((X<jl)&((Y>0.51)|(X>jl-0.04)))|((X>jr)&((Y>0.51)|(X<jr+0.04))))
labels[lap]=iv
inner=zone&(X>=jl)&(X<=jr)
vl,vr=pl(VL,Y),pl(VR,Y)
VB=[[-0.15,0.215],[-0.09,0.21],[-0.052,0.18],[-0.005,0.235],[0.005,0.25],[0.05,0.18],[0.085,0.21],[0.15,0.215]]
VBa=np.array(VB); vb=np.interp(X,VBa[:,0],VBa[:,1])
trou=inner&(Y<vb)&(X>jl+0.012)&(X<jr-0.012)
labels[trou]=names.index('pantalon')
inner=inner&~trou
vest=inner&((X<vl)|(X>vr)|(Y<0.583))
labels[vest]=igi
labels[vest&(Y>0.715)]=iv   # haut des bandes de gilet -> parement de veste
rest=inner&~vest
tie=rest&(Y<0.846)&(Y>0.6)&(X>pl(TL,Y))&(X<pl(TR,Y))
labels[rest]=ich
labels[tie]=ich   # cravate remplacée par le modèle Meshy
labels[labels==itie]=ich
# ---- back of neck: jacket collar / shirt collar / neck ----
zc=np.median(Z[labels==mann])
bk=(Z<zc)&(np.abs(X)<0.085)&(Y>0.86)&np.isin(labels,[mann,ich,iv])
b1=0.906-1.5*X**2; b2=0.926-3*X**2
labels[bk&(Y>=b2)]=mann
labels[bk&(Y<b2)&(Y>=b1)]=ich
labels[bk&(Y<b1)]=iv
# diffusion smoothing of one-hot labels on the face graph
A=adj
deg=np.bincount(np.r_[A[:,0],A[:,1]],minlength=len(C)).astype(np.float32)
P=np.eye(len(names),dtype=np.float32)[labels]
for it in range(int(sys.argv[2]) if len(sys.argv)>2 else 12):
    Q=P.copy()
    np.add.at(Q,A[:,0],P[A[:,1]]); np.add.at(Q,A[:,1],P[A[:,0]])
    P=Q/(1+deg)[:,None]
labels=P.argmax(1)
np.save('labels.npy',labels)
for i,n in enumerate(names): print(n,(labels==i).sum())
json.dump(names,open('names.json','w'))
