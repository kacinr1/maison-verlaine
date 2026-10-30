# Maison Verlaine — État du projet (handoff)

Dernière session : 29/10/2026. Projet mis en pause — reprise prévue avec une autre optique.

## Deux livrables existent

### A) Site 2D + configurateur photo — `index.html` (double-clic)
- Facelift complet (dark/or, Cormorant + Jost), sections hero/manifeste/configurateur/étoffes/parcours/lookbook/contact, responsive.
- **Configurateur photo en couches** : sur une **photo générée IA** (homme en costume **uni, sans carreaux**, `assets/base_grey.jpg` / `gen_grey.png`), recolorisation en direct :
  - Teinte costume (8) = images pré-recolorisées `assets/suit_*.jpg` (transfert HSL masqué).
  - Chemise = calque teinte masqué (SVG `<mask>` + `mask_shirt_lum.png`).
  - Matière = patterns/voile masqués (`mask_suit_lum.png`).
  - **Cravate = vraie soie générée IA**, recolorisée : `assets/tie_*.png`. Pochette/boutonnière = SVG.
- Piège résolu : les masques PNG en CSS `mask-image` NE RENDENT PAS dans Chrome local → **masques SVG `<mask><image href=lum.png></mask>`** (d'où les `*_lum.png`).

### B) Configurateur 3D par calques — `viewer/index.html` (via `Configurateur-3D.bat`)
- **Assemblage de pièces Meshy séparées** (chaque GLB = maillage propre, `3d-pieces/glb/`) :
  `chemise → pantalon → gilet → veste → cravate + chaussures`.
  Échelle/position de chaque calque réglées à la main (chemise rétrécie en fin torse pour ne pas transpercer la veste).
- **Recolorisation par pièce** nette (6 contrôles), **grain de tissu réel** par matière (laine twill / coton / soie satin / cuir) via **cartes de normales tileables + mapping triplanaire** (injection shader `onBeforeCompile`, sans UV). Cartes : `viewer/tex/*_n.png`.
- Rotation 360°, zoom, Recentrer. Three.js (CDN unpkg), RoomEnvironment.
- **Lancement** : le GLB est lourd + fetch bloqué en `file://` → `Configurateur-3D.bat` démarre `python -m http.server 8777` et ouvre `/viewer/`.

## Points NON résolus / limites (à reprendre)
1. **3D — le gilet se voit peu** : la veste Meshy est portée assez fermée → seul un petit triangle de gilet apparaît. Fix : régénérer une **veste portée ouverte** via l'API Meshy.
2. **3D — liseré irrégulier au col** de la chemise (maillage Meshy).
3. **3D — alignement des calques** approximatif (chaque pièce Meshy normalisée indépendamment → échelles/poses différentes, réglées manuellement dans `viewer/index.html` → `LAYERS`).
4. **3D — pièces non texturées** (géométrie brute Meshy preview) : couleur + grain procédural seulement, pas de texture PBR Meshy (mode "refine" non utilisé).
5. Le client reste **insatisfait du résultat global** → envisager une autre approche à la reprise (voir ci-dessous).

## Meshy API
- Clé fournie par le client (NON stockée ici). Solde ~910 crédits.
- Endpoints utilisés : `POST /openapi/v2/text-to-3d` (mode `preview`), poll `GET /openapi/v2/text-to-3d/{id}`, download `model_urls.glb`.
- Prompts des pièces : `MESHY_PROMPTS.md`. Le gilet propre a été regénéré ainsi (`gilet_new.glb` → `gilet.glb`). `gilet_BAD.glb` = version sur mannequin (écartée).

## Structure
- `index.html` (site 2D) · `viewer/index.html` (config 3D) · `Configurateur-3D.bat` (lanceur 3D).
- `assets/` : images 2D (base, suits recolorisés, cravates, masques). `assets/shots/` : captures de contrôle.
- `3d-pieces/glb/` : pièces + ensembles Meshy. `viewer/tex/` : cartes de normales tissus.
- `build/` : scripts Python (recolor, masques, génération normal maps) + scripts Playwright de contrôle (`NODE_PATH=$(npm root -g)`, Chrome, args `--use-gl=angle --use-angle=swiftshader`).
- `viewer/dev*.html` : viewers de dev/debug (segmentation, assemblage). `index-original.html` : ancien HTML d'origine.

## Reprise — pistes "autre optique"
- Soit **assumer la 3D full-3D** : régénérer un set de pièces cohérent (même échelle/pose), veste ouverte, puis texturer via Meshy refine → vrai configurateur 3D habillable.
- Soit **pro photo** : remplacer les photos web/IA par de **vraies prises de vue maison** alignées (le pipeline 2D masques/recolor se réaligne automatiquement).
- Clarifier avec le client la **référence visuelle cible** exacte (un site/config existant qu'il admire) avant de recoder.
