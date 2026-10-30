import trimesh, numpy as np
t=trimesh.load('src/c0dd9435.glb',force='mesh'); t.merge_vertices()
V=t.vertices.copy()
B=V[V[:,1]<0.25]
c=B.mean(0); U,S,Wt=np.linalg.svd(B-c,full_matrices=False)
ax=Wt[0]; ax=ax if ax[1]<0 else -ax          # long axis pointing down
nrm=Wt[2]; nrm=nrm if nrm[2]>0 else -nrm      # blade normal toward +z (viewer side)
wid=np.cross(nrm,-ax)                          # width axis
R=np.stack([wid,-ax,nrm])                      # rows: new x, new y, new z
P=(V-c)@R.T
t2=trimesh.Trimesh(P,t.faces,process=False)
t2.export('tie_aligned.glb')
print('aligned bounds',P.min(0).round(3),P.max(0).round(3))
