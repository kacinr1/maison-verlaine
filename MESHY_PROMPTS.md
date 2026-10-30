# Maison Verlaine — Prompts Meshy (3D)

But : générer les pièces 3D (GLB) pour un configurateur 3D temps réel (Three.js).
Règle d'or : **chaque pièce = un modèle séparé**, en **gris neutre** (recolorisable dans le code), forme **« ghost mannequin »** (portée mais sans corps visible), **A-pose**.

## Réglages Meshy recommandés (pour chaque pièce)
- Mode : **Text to 3D** (ou **Image to 3D** en uploadant les images du dossier `assets/` → bien meilleure fidélité : `base_grey.jpg`, `suit_navy.jpg`, `tie_bordeaux.png`).
- Art Style : **Realistic**
- **PBR : ON** (textures matière réalistes)
- Topology : **Quad** · Target polycount : **Medium/High (~30–50k)**
- Symmetry : **On** (veste/pantalon/chemise/gilet), **Off** pour la cravate
- Texture : **Enable texture / 4K** si dispo

---

## 1) Veste (jacket)
```
A men's single-breasted suit jacket, notch lapel, two-button front, flap hip pockets and a welt chest pocket, structured padded shoulders, slim tailored fit, shown as a hollow ghost-mannequin garment (worn shape, no body, no head, no arms inside), solid neutral mid-grey wool with subtle fabric sheen, realistic PBR materials, clean quad topology, A-pose, centered studio product model.
```

## 2) Pantalon (trousers)
```
A pair of men's tailored suit trousers, flat front, slim straight leg, belt loops, side pockets, hemmed bottoms, shown as a hollow ghost-mannequin garment (worn shape, no legs, no body), solid neutral mid-grey wool, realistic PBR materials, clean quad topology, centered product model.
```

## 3) Gilet (waistcoat — pour la 3 pièces)
```
A men's five-button suit waistcoat (vest), V-neck front, two welt pockets, adjustable back strap with buckle, slim fit, shown as a hollow ghost-mannequin garment (no body), solid neutral mid-grey wool, realistic PBR materials, clean quad topology, centered product model.
```

## 4) Chemise (dress shirt)
```
A men's slim-fit dress shirt, spread collar, full button placket, long sleeves with barrel cuffs, chest dart, shown as a hollow ghost-mannequin garment (no body, no head), crisp solid white cotton with subtle weave, realistic PBR materials, clean quad topology, A-pose, centered product model.
```

## 5) Cravate (tie)
```
A men's silk necktie with a neat four-in-hand knot at the top and a dimple under the knot, wide blade hanging straight down to a pointed V tip, solid deep burgundy silk with soft natural sheen and gentle folds, realistic PBR materials, clean topology, isolated single object, vertical, centered.
```

## 6) Chaussures (derbies)
```
A pair of men's brown full-grain leather derby dress shoes, round toe, five-eyelet lacing, leather sole, lightly polished, realistic PBR leather materials, clean quad topology, product model, placed side by side.
```

## 7) Pochette (pocket square) — optionnel
```
A folded silk pocket square in a flat presidential fold, crisp white silk with soft sheen, small rectangular shape peeking out, realistic PBR materials, clean topology, isolated.
```

---

## Option « la totale » — mannequin complet (1 seul modèle, pour un hero 3D)
```
A full men's two-piece tailored suit outfit worn on a neutral light-grey ghost mannequin standing in a relaxed A-pose: single-breasted notch-lapel jacket (two buttons), matching slim trousers, crisp white spread-collar dress shirt and a burgundy silk four-in-hand necktie, brown leather derby shoes, realistic PBR wool-and-silk materials, high detail, clean quad topology, full body head-to-toe, studio product render.
```

## Astuces
- Pour **recoloriser** chaque pièce dans le configurateur Three.js : garder le gris neutre et teinter le material (baseColor) → infinité de couleurs sans régénérer.
- Pour la **meilleure fidélité** : utilise **Image-to-3D** avec les rendus déjà générés (`assets/suit_navy.jpg`, `assets/tie_bordeaux.png`) comme référence.
- Exporte en **GLB** (avec textures) → je l'intègre dans un viewer Three.js (rotation 360°, zoom, swap matière/pièce).
- Pour un **essayage sur photo du client** : c'est une autre techno (génération d'image IA), à faire en 2e temps.
