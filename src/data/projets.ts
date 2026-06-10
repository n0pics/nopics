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
}

export const projets: Projet[] = [
  {
    slug: 'solognac',
    title: 'Solognac',
    date: '2025',
    category: 'Direction artistique',
    comment:
      'Direction artistique et création de visuels pour Solognac. Remplace ce texte par ta propre description du projet.',
    cover: '/images/accueil/dino-3.jpg',
    galleryDir: 'images/accueil',
  },
  // Cartes placeholder — remplace-les par tes futurs projets (ou supprime-les).
  {
    slug: 'projet-02',
    title: 'Projet 02',
    date: '—',
    category: '',
    comment: '',
    cover: '',
    comingSoon: true,
  },
  {
    slug: 'projet-03',
    title: 'Projet 03',
    date: '—',
    category: '',
    comment: '',
    cover: '',
    comingSoon: true,
  },
];
