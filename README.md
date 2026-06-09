# Portfolio — base de site

Template de portfolio bâti avec **Astro**, **React**, **Tailwind CSS v4** et
**Three.js / Framer Motion**. Tout le contenu spécifique a été remplacé par des
placeholders : il ne reste plus qu'à le remplir avec le vôtre.

## 🧞 Commandes

Lancées depuis la racine du projet :

| Commande          | Action                                          |
| :---------------- | :---------------------------------------------- |
| `pnpm install`    | Installe les dépendances                        |
| `pnpm dev`        | Serveur de dev sur `localhost:4321`             |
| `pnpm build`      | Build de production dans `./dist/`              |
| `pnpm preview`    | Prévisualise le build avant déploiement         |

> Le projet utilise **pnpm** (voir `pnpm-lock.yaml`). Node ≥ 22.12 requis.

## 📁 Structure

```text
src/
├── components/
│   ├── layout/   → Header, Footer (nav, i18n, mentions)
│   └── ui/       → composants réutilisables (galeries, héros, effets…)
├── i18n/
│   └── translations.ts  → tous les textes FR / EN du site
├── layouts/      → BaseLayout (avec footer) & LandingLayout (accueil)
├── pages/
│   ├── index.astro            → accueil (héro vidéo)
│   ├── a-propos.astro         → à propos
│   ├── services.astro         → services
│   ├── projets.astro          → galerie de projets
│   ├── projets/[slug].astro   → page de détail d'un projet
│   ├── contact.astro          → contact + formulaire
│   └── mentions-legales.astro → mentions légales
└── styles/       → global.css & tokens.css (couleurs, typo)
public/           → favicon, robots.txt, et vos médias
```

## ✍️ À personnaliser

Cherchez ces placeholders et remplacez-les par votre contenu :

- **Textes FR/EN** → `src/i18n/translations.ts` (source unique de la plupart des textes).
- **Nom / marque** → wordmark `STUDIO` dans `src/pages/index.astro` et `src/components/layout/Footer.astro`.
- **Coordonnées** → `contact@exemple.com`, `@votre_compte`, `Votre Ville, Pays` (Footer, contact, mentions légales).
- **Projets** → `src/pages/projets.astro` (liste) + `src/pages/projets/[slug].astro` (détail).
- **Vidéo d'accueil** → déposez `public/videos/hero.mp4` (sinon un fond dégradé s'affiche).
- **URL du site** → `astro.config.mjs` (`site:`) et `public/robots.txt` (sitemap).
- **Formulaire de contact** → branchez votre service d'envoi dans `src/pages/contact.astro`.

## 🌍 Internationalisation

Le site est bilingue **FR / EN**. Le sélecteur de langue (`FR / EN` dans le header)
applique les traductions de `translations.ts` aux éléments portant `data-i18n`
(texte) ou `data-i18n-html` (HTML). La langue est mémorisée dans `localStorage`
sous la clé `site-lang`.
