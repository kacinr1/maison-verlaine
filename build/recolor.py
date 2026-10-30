import numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage

base = Image.open("cand_grey.jpg").convert("RGB")
W,H = base.size
a = np.asarray(base).astype(np.float32)/255.0
R,G,B=a[...,0],a[...,1],a[...,2]; mx=a.max(-1);mn=a.min(-1)
L=0.299*R+0.587*G+0.114*B; S=np.where(mx>0,(mx-mn)/(mx+1e-6),0)
ys,xs=np.mgrid[0:H,0:W]; X=xs/W; Y=ys/H

suit=(np.asarray(Image.open("mask_suit.png").convert("L")).astype(np.float32)/255.0)

def hsl2rgb(Hh,Ss,Ll):
    Hh=(Hh%360)/360.0
    def f(n):
        k=(n+Hh*12)%12
        return Ll-Ss*np.minimum(Ll,1-Ll)*np.clip(np.minimum(k-3,9-k),-1,1)
    return np.stack([f(0),f(8),f(4)],-1)

# per-pixel lightness of suit region, normalised a bit for contrast
Lp=L.copy()
pal={
 "gris":     None,
 "navy":    (221,0.50,0.70,-0.11),
 "charcoal":(218,0.10,0.66,-0.07),
 "noir":    (220,0.04,0.42,-0.02),
 "bordeaux":(349,0.48,0.64,-0.08),
 "vert":    (153,0.40,0.54,-0.06),
 "sable":   ( 36,0.40,1.08, 0.04),
 "camel":   ( 28,0.52,0.98, 0.00),
}
mk=suit[...,None]
for name,p in pal.items():
    if p is None:
        Image.fromarray((a*255).astype(np.uint8)).save(f"suit_{name}.jpg",quality=86); continue
    Hh,Ss,gain,off=p
    newL=np.clip(Lp*gain+off,0.02,0.98)
    rgb=hsl2rgb(Hh,Ss,newL)
    out=a*(1-mk)+rgb*mk
    Image.fromarray((out*255).clip(0,255).astype(np.uint8)).save(f"suit_{name}.jpg",quality=86)

# shirt mask (central white placket/collar area)
shirt=(L>0.74)&(S<0.16)&(X>0.40)&(X<0.56)&(Y>0.17)&(Y<0.48)
shirt=ndimage.binary_opening(shirt,np.ones((3,3)))
lbl,n=ndimage.label(shirt); 
if n>0:
    sz=ndimage.sum(np.ones_like(lbl),lbl,range(1,n+1)); shirt=lbl==(np.argmax(sz)+1)
shirt=ndimage.binary_closing(shirt,np.ones((5,5)))
Image.fromarray((shirt*255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(1.0)).save("mask_shirt.png")
print("done. shirt %:",round(100*shirt.mean(),2))
import os; print(sorted(f for f in os.listdir('.') if f.startswith('suit_')))
