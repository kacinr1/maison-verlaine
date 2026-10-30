# Maison Verlaine — site grande mesure (facelift + configurateur photo)

Ouvrir **`index.html`** dans un navigateur (double-clic). Aucune installation requise.

## Ce qui a été fait
Refonte complète du site (dark / or, Cormorant Garamond + Jost + Pinyon Script) :
hero éditorial, manifeste, **configurateur photo** (la vedette), étoffes, parcours, lookbook, prise de rendez-vous, footer. Responsive desktop + mobile.

## Le configurateur « à la Rolex »
Au lieu d'un dessin vectoriel, le costume est une **vraie photo** sur laquelle les
choix se composent **en direct, par couches** :

- **Teinte** → la photo est recolorisée (8 teintes pré-générées en gardant la texture,
  les plis et les ombres réels — transfert HSL masqué sur la seule étoffe).
- **Chemise** → calque de teinte masqué sur la chemise (`mix-blend-mode`).
- **Cravate / Pochette / Boutonnière** → calques SVG superposés, positionnés au pixel
  près sur la photo (col, gousset, revers).

> Les images viennent du web (Unsplash) uniquement pour **visualiser le concept**.
> À remplacer par vos propres prises de vue : il suffit de refaire passer vos photos
> dans les scripts `build/` (même cadrage → le masque et les calques se réalignent).

## Structure
- `index.html` — le site (autonome, CSS + JS inline).
- `assets/` — images runtime : `suit_*.jpg` (teintes), `mask_shirt.png`, textures, hero.
- `assets/shots/` — captures d'aperçu (desktop + mobile).
- `build/` — pipeline de fabrication des assets :
  - `seg6.py` → masque du costume (segmentation).
  - `recolor.py` → génération des teintes + masque chemise.
  - `shoot*.js` → captures Playwright de contrôle.
- `index-original.html` — ancienne version (sauvegarde).

## Régénérer les assets (si nouvelle photo)
```
cd build
python seg6.py       # produit assets/mask_suit.png
python recolor.py    # produit assets/suit_*.jpg + mask_shirt.png
```
(Requiert Python + Pillow + numpy + scipy.)

## À faire ensuite
- Remplacer les photos web par des prises de vue maison (même pose/cadrage).
- Brancher le formulaire de rendez-vous à un service d'envoi (Resend, Formspree…).
- Ajouter d'autres poses/coupes (croisé, 3 pièces) comme nouvelles photos de base.
