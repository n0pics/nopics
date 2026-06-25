export interface Projet {
  slug: string;
  title: string;
  date: string;
  /** Courte catégorie / discipline, affichée sur la page détail */
  category: string;
  /** Commentaire / description courte */
  comment: string;
  /** Image (ou vidéo) de couverture — chemin depuis /public */
  cover: string;
  /** Dossier des photos du projet (depuis /public), ex: 'images/accueil' */
  galleryDir?: string;
  /** Carte « bientôt disponible », non cliquable */
  comingSoon?: boolean;
  /** Clé i18n du projet (pour traduire catégorie/commentaire), ex: 'solognac' */
  i18n?: string;
  /** Clé i18n pour traduire le titre (cartes placeholder), ex: 'project.placeholder.title' */
  titleKey?: string;
  /** Le projet a sa propre page dédiée (ex: /projets/naaman) → exclu de [slug].astro */
  customPage?: boolean;
  /** Crédit « Engagé par » affiché en haut à droite de la page détail, ex: '@TinyForestprod' */
  credit?: string;
}

export const projets: Projet[] = [
  {
    slug: 'solognac',
    title: 'Solognac',
    date: '2026',
    category: '',
    comment: 'Création de visuels pour Solognac.',
    cover: '/images/solognac-cover.jpg',
    galleryDir: 'images/accueil',
    i18n: 'solognac',
    credit: '@TinyForestprod',
    customPage: true,
  },
  // Cartes placeholder — remplace-les par tes futurs projets (ou supprime-les).
  {
    slug: 'naaman',
    title: 'Naâman',
    date: '2026',
    category: '',
    comment: 'Proposition de design promotionnel pour Naâman.',
    cover: '/images/NAAMAN rendu final 1.jpg',
    customPage: true,
    i18n: 'naaman',
  },
  {
    slug: 'projet-03',
    title: 'Projet 03',
    titleKey: 'project.placeholder.title',
    date: '—',
    category: '',
    comment: '',
    cover: '',
    comingSoon: true,
  },
];
