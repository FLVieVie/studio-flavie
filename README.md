# Studio Flavie — Portfolio graphique premium

Site portfolio statique pour une graphiste freelance, version chaleureuse et colorée. Cinq pages, animations GSAP, tilt 3D, curseur custom, fonds alternés. Zéro étape de build.

---

## Structure

```
studio-flavie/
├── index.html              ← Accueil (hero animé, bénéfices, galerie, services, process, témoignages)
├── projets.html            ← Portfolio (filtres, grille tilt 3D, modal détail)
├── tarifs.html             ← Tarifs (3 formules colorées, comparatif, FAQ)
├── contact.html            ← Contact (formulaire stylisé, coordonnées, socials)
├── rendez-vous.html        ← Réservation appel découverte (calendrier, pré-appel)
├── sitemap.xml             ← Sitemap SEO
├── robots.txt              ← Directives crawlers
├── README.md
└── assets/
    ├── css/
    │   └── style.css       ← Système complet : curseur, blobs, bezels, animations
    ├── js/
    │   └── main.js         ← GSAP scroll, tilt 3D, calendrier, modal, filtres
    └── img/
        └── favicon.svg
```

---

## Stack

- **HTML5** sémantique (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`)
- **Tailwind CSS** via CDN (config inline custom)
- **CSS3** custom pour patterns avancés (curseur, blobs, tilt, transitions)
- **JavaScript vanilla**
- **GSAP 3.12 + ScrollTrigger** via CDN pour les animations premium
- **Google Fonts** : Fraunces (display serif variable) + DM Sans (corps)
- **Schema.org** : ProfessionalService (JSON-LD sur l'accueil)

Aucun `npm install`. Ouvrez `index.html` ou lancez un serveur local :

```bash
cd studio-flavie
python3 -m http.server 8000
# http://localhost:8000
```

---

## Direction artistique

### Palette pleine

| Couleur | Hex | Usage |
|---|---|---|
| Cream | `#FBF3E5` | Fond principal, espace de respiration |
| Ivory | `#F4E8D0` | Fond secondaire |
| Peach | `#F5C3A1` | Section bénéfices secondaire, accents doux |
| Terracotta | `#D67558` | Couleur signature, accents CTA |
| Terracotta deep | `#B85838` | Survols, hover states |
| Rust | `#A8482F` | Textes contrastés sur fonds clairs |
| Mustard | `#E5B85C` | Section process, dynamisme |
| Gold | `#C99641` | Accents premium |
| Sage | `#A8B89E` | Section bénéfices, équilibre vert |
| Sage deep | `#7E907A` | — |
| Plum | `#6B3D52` | Card accents |
| Ink | `#2A1810` | Texte principal, fond témoignages |
| Rose | `#E89A8F` | Accent ponctuel |

### Sections du Home alternent les fonds

1. Hero (`cream`) + blobs peach/mustard/sage
2. Marquee band (`terracotta`)
3. Bénéfices (`sage`) avec cards multicolores
4. Galerie (`ivory`)
5. Services (`peach`)
6. Process (`mustard`)
7. Témoignages (`ink`)
8. CTA final (`cream`)

### Typographies

- **Fraunces** (variable serif, italic dramatique) — titres, accents
- **DM Sans** (sans-serif chaleureux) — corps de texte, UI

---

## Animations & interactions

| Pattern | Implémentation |
|---|---|
| Intro loader | Logo « F » + nom qui monte mot à mot, clip-path reveal |
| Curseur custom | Cercle + point, lerp magnétique, grossit sur les éléments interactifs |
| Nav micro-animations | Underline animé + petit point décoratif terracotta sous chaque lien |
| Hamburger morph | Lignes qui rotent en X |
| Mobile menu | Overlay coloré radial gradient, links staggered fade-up |
| Scroll reveal | GSAP `fromTo` + ScrollTrigger sur `.reveal` (fade-up) |
| Stagger reveal | Sur `.reveal-stagger` enfants |
| Word reveal | Wrapping mot à mot + stagger sur `.word-reveal` |
| Parallax | `data-parallax="0.2"` sur les blobs SVG |
| Tilt 3D | `data-tilt` sur cards projets + visuels hero, perspective 1000px |
| Hover projets | Zoom cover + overlay sombre + meta révélée + badge qui tourne |
| Marquee | Auto-duplicate du contenu pour boucle infinie sans saut |
| FAQ accordion | `<details>` natif + plus → croix qui rotate, ferme les autres |
| Filtres projets | Chips actifs, fade des cards non concernées |
| Modal projet | Backdrop blur + scale-in, fermeture clic dehors ou Escape |
| Calendrier | JS pur, navigation mois, weekends grisés |

---

## SEO & Accessibilité

- `<title>` et `<meta description>` uniques par page
- Open Graph tags
- Canonical URLs
- Hiérarchie `<h1>` → `<h6>` cohérente
- `alt` sur tous les visuels (les blobs et décoratifs sont `aria-hidden`)
- `aria-label` sur les boutons icôniques (burger, navigation calendrier, fermeture modal)
- `aria-modal` sur la modal projet
- Navigation clavier complète
- Contrastes WCAG AA respectés sur les fonds colorés
- `@media (prefers-reduced-motion: reduce)` désactive toutes les animations
- Sitemap XML + robots.txt
- JSON-LD ProfessionalService

---

## Personnalisation

### Renommer le studio

Remplacez globalement « Studio Flavie » → votre nom dans :
- chaque `<title>`, `<meta>`, footer, navigation
- les blocs JSON-LD de l'accueil
- le `assets/img/favicon.svg` (lettre `F`)

### Changer la palette

Tout est centralisé en variables CSS en haut de `assets/css/style.css`, et dupliqué dans la config Tailwind inline (`<script>tailwind.config = ...</script>` en tête de chaque page). Mettez à jour les deux.

### Remplacer les gradients placeholder par de vraies images

Les classes `.mock-1` à `.mock-10` génèrent des dégradés colorés (poids zéro). Pour passer aux vraies images :

```html
<!-- Avant -->
<a class="project-card mock-1">
  <span class="badge">Identité</span>
  <div class="cover absolute inset-0 ...">...</div>
</a>

<!-- Après -->
<a class="project-card">
  <img src="assets/img/olivia.jpg" alt="Identité visuelle Olivia" class="cover absolute inset-0 w-full h-full object-cover" loading="lazy">
  <span class="badge">Identité</span>
  <div class="overlay"></div>
</a>
```

### Remplacer les projets

`projets.html` contient 12 cards avec `data-project` (JSON) et `data-cat` (catégorie filtre). Modifiez ces attributs pour vos vrais projets. Catégories possibles : `logo`, `identite`, `menu`, `affiche`, `mockup`, `packaging` (séparées par espace pour cumul).

### Brancher les formulaires

Les `<form data-mock>` sont mockés côté client. Pour brancher un vrai service :
- **Formspree** : ajoutez `action="https://formspree.io/f/VOTRE_ID"` et `method="POST"`, retirez `data-mock`
- **Netlify Forms** : ajoutez `netlify` au `<form>` et `name="contact"`
- **EmailJS / Web3Forms / Resend** : suivez la doc

### Brancher un vrai calendrier

Le calendrier de `rendez-vous.html` est purement visuel. Remplacez la section concernée par un `<iframe>` Cal.com / Calendly / SavvyCal / TidyCal.

---

## Performance

- Tailwind via CDN (dev). Pour la prod, passez à un build Tailwind CLI pour purger (~200 Ko gagnés).
- GSAP + ScrollTrigger : ~70 Ko gzippés combinés.
- Polices Google avec `preconnect`. Self-hosting via Fontsource possible.
- Placeholders en CSS gradients : zéro poids image.
- Quand vous ajoutez de vrais visuels : WebP/AVIF, `loading="lazy"`, dimensions explicites.

---

## Compatibilité

Chrome, Firefox, Safari, Edge — versions à jour, desktop & mobile.
Le curseur custom est automatiquement désactivé sur tactile (`@media (hover: none)`).
`backdrop-filter` a un fallback transparent sur navigateurs anciens.

---

## Licence

Tout le contenu (textes, témoignages, noms de marques fictives, chiffres) est purement illustratif. Remplacez-le par votre vrai contenu avant publication.

Polices : [Fraunces](https://fonts.google.com/specimen/Fraunces) et [DM Sans](https://fonts.google.com/specimen/DM+Sans) (SIL OFL).
Animations : [GSAP](https://gsap.com) — la version gratuite couvre tous les besoins de ce site.
