# Configurateur 3D de costume trois-pièces : passation

Ce dossier reprend tout le travail fait dans Claude (app) sur le configurateur. Lis ce fichier en entier avant de toucher au code. La suite à construire est décrite dans « Prochaines étapes ».

## Le projet en bref

Configurateur web d'un costume trois-pièces pour un tailleur premium (style grande mesure, Genève). Le visiteur :

1. change la couleur et le motif de chaque pièce sur un mannequin 3D ;
2. importe une photo de face : son visage s'affiche sur le mannequin et un « styliste IA » lui conseille une tenue ;
3. génère une planche HD de sa tenue.

Le propriétaire est un non-développeur qui construit avec Claude Code, Next.js, Supabase et Vercel. Il veut un rendu premium et luxe. Toute l'interface est en français.

## Contenu du dossier

```
web/
  index.html          Configurateur complet, autonome (three.js 0.169 depuis jsDelivr)
  costume.glb         Modèle web : 7 maillages nommés, quantifié (4,2 Mo)
  test_face.jpg       Visage dessiné pour tester l'import (pas une vraie personne)
models/
  costume_segmente_full.glb   Même modèle non quantifié (7,2 Mo), à utiliser pour retravailler
  source_ensemble_meshy.glb   Maillage Meshy d'origine, d'un seul bloc (source du pipeline)
pipeline/             Scripts Python qui découpent le maillage Meshy en pièces (voir plus bas)
docs/captures/        Captures du résultat attendu (référence visuelle)
```

Pour lancer le configurateur : `cd web && npx serve .` (ou tout serveur statique), puis ouvrir `index.html`. Il faut passer par http, car le .glb est chargé avec fetch.

## Le modèle 3D

Unité : environ 1 unité = 0,95 m. Le mannequin fait 1,9 unité de haut, avec les pieds à y = -0,95 et le cou à y ≈ 0,95. Il regarde vers +Z.

Le .glb contient 7 nœuds/maillages, à récupérer par leur nom :

| Nom | Contenu | Remarques |
|---|---|---|
| `veste` | veste, y compris les parements intérieurs du devant et les boutons de veste | |
| `gilet` | gilet, une seule pièce continue | Ne doit jamais apparaître sur la veste (vérifié avec un test gilet vert / veste noire) |
| `pantalon` | pantalon | |
| `chemise` | chemise + plastron lisse refait à la main sous la cravate | Toujours blanche (décision du client) |
| `cravate` | cravate procédurale (nœud + pan), posée sur le plastron | Ne vient pas du fichier Meshy de cravate, qui était inutilisable |
| `souliers` | chaussures | |
| `mannequin` | moignon du cou | Prend la couleur de peau quand un visage est importé |

Il n'y a ni UV ni textures (Meshy n'en fournit pas). Les tissus sont des `MeshPhysicalMaterial` avec du sheen. Les motifs (rayures, carreaux, cravate club) sont calculés dans le shader par une projection triplanaire en coordonnées monde (voir `fabric()` dans `index.html`). Conséquence : les rayures ondulent un peu sur les manches. Si on veut de vrais tissus, il faudra déplier les UV (Blender, Smart UV Project) puis passer à des textures.

## Pourquoi les fichiers Meshy séparés ne sont pas utilisés

Meshy génère chaque pièce (chemise, gilet, cravate, pochette…) comme un objet autonome, normalisé à la même hauteur, avec ses propres proportions. Le gilet est posé sur un buste de couture, la chemise est taillée XXL, la cravate a une boucle de cou géante. Aucun ajustement de position ou d'échelle ne les fait coïncider. **Ne pas retenter d'assembler des pièces Meshy séparées.** La bonne approche, c'est un ensemble complet découpé en pièces, ce que fait `pipeline/`.

## Le pipeline de découpe (pipeline/)

Dépendances : `pip install trimesh numpy scipy rtree pillow`. Ordre d'exécution, à lancer depuis `pipeline/` :

```
python3 seg.py 60 6      # labels.npy : étiquette par face (veste, gilet, ...)
python3 fix3.py          # plastron de chemise lisse, cravate procédurale, sommets repoussés
python3 cut2.py 8        # costume_parts.glb : découpe nette en 7 maillages
npx @gltf-transform/cli quantize costume_parts.glb ../web/costume.glb --quantize-position 14 --quantize-normal 10
```

J'ai vérifié qu'à partir de zéro, on retrouve exactement le même nombre de faces par pièce que le modèle livré.

Le fonctionnement :

- **`seg.py`** : place des graines (`seeds.json`, coordonnées en pixels d'un rendu 1200×800 de face, `"b"` pour le dos, `"s"` pour le profil) et calcule une distance géodésique pondérée par les plis du tissu. Les règles de `rules.py` s'appliquent ensuite, puis un lissage par diffusion.
- **`rules.py`** : les contours tracés à la main et mesurés sur le maillage, qui ont toujours priorité. On y trouve :
  - les bords de veste `JL`/`JR`, mesurés sur l'angle réel où le gilet rencontre la veste, tous les 2,5 mm de hauteur ;
  - le V du gilet `VL`/`VR`, le bas du gilet `VB` et le col ;
  - une règle sur les normales : les surfaces tournées vers le côté au bord de la veste appartiennent à la veste. C'est elle qui supprime le liseré de gilet sur l'intérieur de la veste.
- **`fix3.py`** : remplace l'ancien drapé cabossé sous la cravate par un plastron lisse, ajusté par moindres carrés sur le pourtour, et génère la cravate procédurale.
- **`cut2.py`** : coupe les triangles exactement le long des contours (bissection), sans dents de scie, puis rattache à la veste tout fragment de gilet isolé.

## L'application (web/index.html)

Un seul fichier HTML : CSS, puis un module ES (three.js, GLTFLoader, OrbitControls, RoomEnvironment).

- **Catalogue** : objet `CAT`. Laines (8 teintes), cravates (6), souliers (4), motifs `WEAVES` (Uni, Fines rayures, Carreaux) et `TIES` (Unie, Club). La chemise est `fixed:true` (blanc uniquement, section masquée).
- **État** : `state[piece] = {c: indexCouleur, p: motif}`. L'option « Assortir les trois pièces » synchronise veste, gilet et pantalon.
- **Vues caméra** : Face, ¾, Dos, Buste. Il existe deux jeux de vues : `VIEWS0` sans tête, `VIEWS1` quand un visage est importé.
- **Clic sur une pièce dans la 3D** : fait défiler le panneau jusqu'à sa section.
- **Essayage virtuel** :
  - import, puis cadrage dans un ovale (glisser + zoom) ;
  - le visage découpé avec un bord adouci devient un `THREE.Sprite` ancré au menton, posé au-dessus du cou, qui s'efface quand on passe en profil ou de dos ;
  - le teint, mesuré sur les joues et le menton, recolore le cou.
- **Styliste IA** : dans l'artifact Claude, il passe par `window.claude.use('sample')`, une capacité propre à claude.ai qui n'existe pas sur un vrai site. Dans `web/index.html`, `window.claude` est absent : la page bascule proprement en cadrage manuel, sans conseil. **À remplacer par une route API, voir plus bas.** La réponse attendue est un JSON :
  ```json
  {"face":{"cx":0.5,"cy":0.4,"w":0.3,"h":0.4},"teint":"mat","sous_ton":"chaud","cheveux":"châtain",
   "tenue":{"veste":"Marine","gilet":"Camel","pantalon":"Marine","motif":"Fines rayures","cravate":"Bordeaux","souliers":"Cognac"},
   "conseil":"2 phrases max"}
  ```
  Les noms de la tenue doivent correspondre exactement aux noms du catalogue `CAT`. Le prompt complet se trouve dans la fonction `analyse()`.
- **Planche HD** : rendu 3D hors écran (face + ¾) en 900×1500, composé sur un canvas 1500×2000 avec titre, mot du styliste et fiche de la tenue, puis exporté en PNG.

## Décisions déjà prises (ne pas revenir dessus sans demander)

- Chemise toujours blanche.
- La démarcation gilet / veste doit être parfaite : aucun pixel de gilet sur la veste, ni dedans ni dehors.
- Cravate procédurale plutôt que le modèle Meshy de cravate.
- Direction artistique : fond nuit (#0b0f17), accent laiton (#c8a464), Cormorant Garamond (titres) + Jost (texte). Sobre, luxe.

## Défauts connus

- Le bord du col de veste reste un peu irrégulier près du cou en vue ¾ très rapprochée. Ça vient du maillage Meshy.
- On voit quelques petits morceaux de chemise irréguliers entre le gilet et la veste, près du col, en zoom fort.
- Le visage est une image plate posée sur le mannequin, pas une vraie tête 3D. Le fond de la photo peut laisser un léger halo autour de la tête.
- Ce n'est pas un rendu photoréaliste.

## Prochaines étapes (la suite à construire)

1. **Application Next.js (App Router) sur Vercel.** Porter `index.html` en React Three Fiber (`@react-three/fiber`, `@react-three/drei` `useGLTF`). Récupérer les pièces avec `nodes.veste`, etc. Garder le shader `fabric()` via `onBeforeCompile`. Servir `costume.glb` depuis `public/` en compression meshopt ou Draco.
2. **Route `/api/stylist`.** Elle reçoit la photo et appelle l'API Claude en mode vision (`claude-sonnet-5-5`), avec le prompt de `analyse()` et une sortie JSON structurée. Elle valide les champs et les noms du catalogue côté serveur. La clé API reste uniquement côté serveur.
3. **Route `/api/render` : le vrai rendu photoréaliste demandé par le client.** Elle prend la photo, la configuration et un prompt détaillé, et appelle un modèle d'essayage virtuel ou de génération qui conserve l'identité du visage. Le traitement est asynchrone (file d'attente + suivi de statut), avec un affichage de l'avancement dans l'interface.
4. **Données personnelles (nLPD suisse / RGPD).**
   - Consentement explicite avant l'envoi de la photo.
   - Stockage temporaire : Supabase Storage dans un bucket privé, avec une durée de conservation courte et une suppression automatique.
   - Aucune réutilisation des photos.
   - Une page de politique de confidentialité.
5. **Conversion.**
   - Sauvegarde de la configuration (Supabase) avec un lien partageable.
   - Bouton « Prendre rendez-vous » ou « Demander un devis » qui envoie la configuration et la planche HD.
6. **Plus tard** : vraies textures de tissu (UV), plus de pièces (pochette, revers, boutons), vrai catalogue de tissus du tailleur.

Critères d'acceptation à garder : le test « gilet vert vif + veste noire » sous 6 angles ne montre aucun vert sur la veste ; le site fonctionne sur mobile (390 px) ; le modèle se charge en moins de 3 s en 4G.
