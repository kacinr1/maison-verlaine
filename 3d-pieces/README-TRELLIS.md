# Pièces isolées → TRELLIS (Voie B)

## Fichiers prêts (fond transparent)
- `piece_veste.png` — veste grise (recolorisable ensuite)
- `piece_pantalon.png` — pantalon gris
- `piece_cravate.png` — cravate bordeaux soie

(À venir quand Higgsfield sera rechargé : chemise, gilet, chaussures.)

## Étapes sur Hugging Face
1. Ouvre le Space : **https://huggingface.co/spaces/microsoft/TRELLIS**
   (ou la version PBR plus récente : https://huggingface.co/spaces/microsoft/TRELLIS.2 )
2. Si le Space est « en pause », clique **Restart** / ou **Duplicate this Space** (gratuit) et attends le GPU.
3. **Upload** une pièce (ex. `piece_veste.png`).
4. Lance **Generate** → aperçu 3D.
5. Clique **Extract GLB** (ou « Download GLB ») → télécharge le `.glb`.
6. Recommence pour chaque pièce.

## Réglages conseillés dans le Space
- Garder l'image telle quelle (déjà centrée, fond transparent).
- `ss_sampling_steps` / `slat_sampling_steps` : valeurs par défaut (12–25) suffisent.
- Si le maillage est bruité : relance avec un seed différent.

## Ensuite
Renomme les fichiers `veste.glb`, `pantalon.glb`, `cravate.glb` et envoie-les-moi
→ je monte le viewer Three.js (rotation 360°, zoom, recolorisation matière, assemblage du look).
