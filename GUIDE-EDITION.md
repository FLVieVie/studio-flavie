# 📝 Guide d'édition de ton site — Studio Flavie

Ce guide t'explique **comment modifier ton site sans toucher au code**.
Pas de panique, **tu n'as rien à installer**, tout se passe directement dans l'interface Hostinger.

---

## 🎯 Comment ça marche, en bref

Hostinger te fournit un **éditeur de texte intégré** : tu cliques droit sur un fichier de ton site, tu choisis « Éditer », et tu peux modifier les textes directement dans la fenêtre. Pas besoin de télécharger / remonter des fichiers.

✏️ **Tu modifies → 💾 Tu sauvegardes → 🔄 Tu rafraîchis ton site → ✨ C'est en ligne**.

---

## 📍 Étape 0 — Ouvrir l'éditeur Hostinger

1. Va sur **https://hpanel.hostinger.com**
2. Menu de gauche : **Sites web** → trouve ton site → bouton **Gérer**
3. Dans le menu latéral : **Fichiers → Gestionnaire de fichiers**
4. Double-clique sur le dossier **`public_html`**
5. **Clic droit** sur le fichier que tu veux modifier → **« Éditer »** (ou icône crayon ✏️)
6. Une fenêtre d'édition s'ouvre avec ton fichier

> 💡 **Truc essentiel** : pour chercher quelque chose dans le fichier, fais **`Cmd + F`** (Mac) ou **`Ctrl + F`** (PC). Tu tapes le mot que tu cherches, l'éditeur le surligne directement.

---

## 🛑 La règle d'or absolue

**Ne touche JAMAIS à ce qui est entre `<` et `>`** (les chevrons).

Voici la règle visuelle :

```html
<h1 class="big-title">CE TEXTE-LÀ TU PEUX LE MODIFIER</h1>
   ↑──────────────↑                                    ↑──↑
   NE TOUCHE PAS                                       NE TOUCHE PAS
```

- ❌ Tout ce qui est entre `<` et `>` = **interdit** (c'est le code qui dit au navigateur comment afficher)
- ✅ Tout ce qui est **entre les chevrons fermants `>` et les chevrons ouvrants `<` suivants** = c'est ton texte, tu peux le changer

**Autre règle** : ne supprime jamais un fichier sans m'en parler d'abord 😉

---

## 📋 Quel fichier contrôle quoi ?

| Page de ton site | Fichier à modifier |
|---|---|
| **Page d'accueil** (le tout premier écran que voient les visiteurs) | `index.html` |
| **Page Projets** (portfolio) | `projets.html` |
| **Page Tarifs** | `tarifs.html` |
| **Page Contact** | `contact.html` |
| **Page Réservation d'appel** | `rendez-vous.html` |
| **Pied de page** (présent sur toutes les pages) | Dans chacune des 5 pages, vers le bas |

---

## 🍳 Le livre de recettes — modifications fréquentes

### 🔹 RECETTE 1 — Changer ton email partout sur le site

L'email apparaît sur les 5 pages. Pour le changer **partout d'un coup** :

1. Ouvre **chacun des 5 fichiers HTML** un par un dans l'éditeur Hostinger
2. Dans chaque fichier, fais **`Cmd+F`** → tape : `bonjour@studio-flavie.fr`
3. Remplace par ton vrai email
4. **Sauvegarde** (bouton « Save » ou `Cmd+S`)

⏱️ Temps total : ~3 minutes

---

### 🔹 RECETTE 2 — Changer ton numéro de téléphone

Même principe que l'email :

1. Dans chaque fichier HTML, cherche : `+33 6 12 34 56 78`
2. Remplace par ton vrai numéro
3. ⚠️ Cherche aussi `+33612345678` (sans espaces) — c'est utilisé pour le lien cliquable
4. Sauvegarde

---

### 🔹 RECETTE 3 — Modifier les prix

1. Ouvre **`tarifs.html`**
2. Cherche :
   - `400 ` *(prix du logo seul — l'espace après le chiffre est important)*
   - `700 ` *(prix de l'identité complète)*
3. Remplace par tes nouveaux prix

---

### 🔹 RECETTE 4 — Modifier le titre principal de l'accueil

1. Ouvre **`index.html`**
2. Cherche : `L'image qui fait grandir`
3. Tu peux changer ce texte. **Attention** : il y a une partie en italique après (`votre marque`) — si tu changes le titre complet, vérifie que tu gardes la structure des balises `<span>` autour de la partie en italique.

> 💡 Si tu n'es pas sûre, **fais une capture d'écran de la zone HTML avant de modifier** — comme ça si tu fais une boulette, tu peux remettre comme c'était.

---

### 🔹 RECETTE 5 — Modifier un témoignage client

1. Ouvre **`index.html`**
2. Cherche un nom de témoignage actuel (ex : `Camille Bertin`)
3. Tu trouves un bloc qui ressemble à ça :
   ```html
   <blockquote class="font-display text-2xl leading-snug">« En trois mois, j'ai doublé mon panier moyen... »</blockquote>
   ...
   <div class="font-medium">Camille Bertin</div>
   <div class="text-xs text-cream/60">Fondatrice — Olivia Boulangerie</div>
   ```
4. Tu modifies **uniquement** :
   - Le texte du témoignage *(entre `« »`)*
   - Le nom *(« Camille Bertin »)*
   - Le rôle *(« Fondatrice — Olivia Boulangerie »)*

⚠️ Ne touche pas aux balises `<blockquote>`, `<div>`, etc.

---

### 🔹 RECETTE 6 — Modifier les infos d'un projet (portfolio)

1. Ouvre **`projets.html`**
2. Cherche le nom d'un projet (ex : `Olivia`)
3. Tu vas trouver un grand bloc avec `data-project='{...}'` qui contient toutes les infos du projet
4. **À l'intérieur des accolades**, tu peux modifier :
   - `"title":` → le titre
   - `"client":` → le nom du client
   - `"brief":` → le brief
   - `"solution":` → la solution
   - `"results":` → les résultats

⚠️ **Très important pour ces blocs** :
- Les guillemets `"` doivent rester en place
- Les virgules entre chaque info aussi
- N'utilise **pas** d'apostrophes simples `'` dans tes textes (ça casse le bloc) — utilise plutôt « `texte` » ou tape ' comme caractère normal au lieu d'apostrophe

---

### 🔹 RECETTE 7 — Remplacer une image

C'est en deux temps :

**Étape A : Uploader la nouvelle image**

1. Dans le Gestionnaire de fichiers Hostinger : double-clique sur `assets` → puis sur `img`
2. Bouton **Upload** en haut → choisis ta nouvelle image depuis ton Mac
3. **Renomme-la** *avant ou après l'upload* pour qu'elle ait un nom simple, ex : `mon-projet-olivia.jpg`

> 💡 **Conseil** : compresse tes images avant de les uploader sur **https://tinypng.com** (gratuit, jusqu'à 5 Mo réduits à ~200 Ko sans perte visible).

**Étape B : Indiquer la nouvelle image dans le code**

Pour ta **photo personnelle dans la section « Qui suis-je »** :

1. Ouvre `index.html`
2. Cherche : `Portrait : remplacez le placeholder`
3. Juste en dessous, tu vas voir un gros bloc `<svg ...>...</svg>` (la silhouette grise actuelle)
4. **Sélectionne tout ce bloc `<svg>` jusqu'à `</svg>` inclus**
5. Remplace-le par :
   ```html
   <img src="assets/img/mon-portrait.jpg" alt="Flavie graphiste" class="absolute inset-0 w-full h-full object-cover" loading="lazy">
   ```
   *(en remplaçant `mon-portrait.jpg` par le vrai nom de ton fichier)*

---

### 🔹 RECETTE 8 — Modifier les liens vers tes réseaux sociaux

Actuellement, tous les liens vers Instagram, Behance, LinkedIn, Pinterest pointent vers `#` (= rien). Pour les rendre fonctionnels :

1. Ouvre **chaque fichier HTML** (ou au moins `index.html` et `contact.html` pour commencer)
2. Cherche : `aria-label="Instagram"`
3. Juste avant, tu verras `href="#"` → remplace `#` par ton vrai lien, ex : `https://instagram.com/studioflavie`
4. Pareil pour `aria-label="Behance"`, `aria-label="LinkedIn"`, `aria-label="Pinterest"`

---

## 🆘 Que faire si tu casses quelque chose ?

Si tu fais une modification et que le site ne s'affiche plus correctement (page blanche, design cassé, etc.) :

### Solution 1 — Restaurer depuis GitHub

Tu as la chance d'avoir **tout l'historique sauvegardé sur GitHub** ! Pour récupérer la version d'origine d'un fichier :

1. Va sur **https://github.com/FLVieVie/studio-flavie**
2. Clique sur le fichier que tu as cassé (ex : `index.html`)
3. Clique sur **« Raw »** (en haut à droite) → ça affiche le contenu brut
4. **`Cmd+A`** pour tout sélectionner → **`Cmd+C`** pour copier
5. Retourne dans le Gestionnaire de fichiers Hostinger → ouvre le fichier cassé
6. **`Cmd+A`** dans l'éditeur → **`Cmd+V`** pour coller la version d'origine
7. Sauvegarde

### Solution 2 — Réécrire moi
Tu peux toujours me demander, je peux te regénérer une nouvelle version du fichier.

---

## ✅ Checklist avant de modifier

Avant chaque modification, fais ça :

1. ☑ **Note ce que tu vas changer** (sur papier ou dans Notes)
2. ☑ **Garde un onglet GitHub ouvert** sur ton fichier (pour copier-coller en cas de boulette)
3. ☑ **Modifie petit à petit** et vérifie en rafraîchissant ton site entre chaque changement

---

## 🚀 Tableau des modifications les plus utiles

| Ce que tu veux changer | Fichier(s) | Cherche le texte (Cmd+F) |
|---|---|---|
| Ton email | Tous les `.html` | `bonjour@studio-flavie.fr` |
| Ton téléphone | Tous les `.html` | `+33 6 12 34 56 78` et `+33612345678` |
| Ta ville | Tous les `.html` | `Paris, France · Travail à distance` |
| Prix « Logo seul » | `tarifs.html` | `400 ` *(avec espace)* |
| Prix « Identité complète » | `tarifs.html` | `700 ` *(avec espace)* |
| Le titre du hero accueil | `index.html` | `L'image qui fait grandir` |
| Le texte « Qui suis-je » | `index.html` | `Diplômée des Arts Déco` |
| Disponibilité affichée | `index.html` | `Mars 2026` |
| Nom d'un projet | `projets.html` | Le nom actuel (ex : `Olivia`) |
| Un témoignage | `index.html` | Le nom du client actuel (ex : `Camille Bertin`) |
| Questions FAQ | `tarifs.html` | Le début de la question actuelle |

---

## 🛟 Si tu hésites, demande-moi

Avant de modifier quelque chose qui te semble compliqué, **envoie-moi un message** avec :
- Ce que tu veux changer
- Une capture d'écran de la zone en question

Je peux te dire exactement quoi changer, à quelle ligne, et te prévenir si ça risque de casser quelque chose.

---

## 💡 Pour aller plus loin (plus tard)

Si tu veux à terme un vrai éditeur visuel (clic sur le texte, tu édites en direct, ça enregistre automatiquement), il existe des solutions :

- **Decap CMS** (gratuit, open-source) — intègre une interface admin à ton site
- **Hostinger Website Builder** (payant, dans ton offre Hostinger) — refaire le site avec un éditeur drag-and-drop
- **Webflow / Framer** (payants) — refaire le site avec éditeur visuel pro

Mais pour modifier ponctuellement quelques textes et images, ce guide te suffit largement. Bonne édition 💛
