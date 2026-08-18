/**
 * Génère les miniatures de la galerie 3D de la page d'accueil.
 *
 * La galerie affiche les photos sous forme de textures WebGL de quelques
 * centaines de pixels : servir les originaux (jusqu'à 1,4 Mo pièce) n'apporte
 * rien à l'écran et retarde l'affichage. On produit donc une version légère
 * de chaque photo dans public/gallery/, et la page pointe dessus.
 *
 * Lancé automatiquement avant `dev` et `build` (voir package.json).
 * Les miniatures à jour sont conservées : seules les photos nouvelles ou
 * modifiées sont régénérées.
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = process.cwd();
const SRC_DIR = path.join(ROOT, 'public', 'images');
const OUT_DIR = path.join(ROOT, 'public', 'gallery');

const MAX_EDGE = 600; // largement au-dessus de la taille réelle à l'écran
const QUALITY = 70;
const EXCLUDE = new Set(['about-portrait.jpg']);

/** Chemin de sortie « aplati » : images/accueil/dino-1.jpg -> accueil__dino-1.webp */
const flatName = (rel) =>
  rel.replace(/\.[^.]+$/, '').split(path.sep).join('__') + '.webp';

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) return walk(full);
    if (!/\.(jpe?g|png|webp)$/i.test(e.name) || EXCLUDE.has(e.name)) return [];
    return [full];
  });
}

if (!fs.existsSync(SRC_DIR)) {
  console.log('[gallery] public/images introuvable, rien à faire');
  process.exit(0);
}

fs.mkdirSync(OUT_DIR, { recursive: true });

const sources = walk(SRC_DIR);
const expected = new Set();
let built = 0;
let skipped = 0;
let bytesIn = 0;
let bytesOut = 0;

await Promise.all(
  sources.map(async (src) => {
    const rel = path.relative(SRC_DIR, src);
    const out = path.join(OUT_DIR, flatName(rel));
    expected.add(path.basename(out));

    const srcStat = fs.statSync(src);
    bytesIn += srcStat.size;

    // Miniature déjà à jour ? on la garde
    if (fs.existsSync(out) && fs.statSync(out).mtimeMs >= srcStat.mtimeMs) {
      bytesOut += fs.statSync(out).size;
      skipped++;
      return;
    }

    await sharp(src)
      .rotate() // applique l'orientation EXIF
      .resize(MAX_EDGE, MAX_EDGE, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(out);

    bytesOut += fs.statSync(out).size;
    built++;
  }),
);

// Nettoie les miniatures dont la photo source a disparu
let removed = 0;
for (const f of fs.readdirSync(OUT_DIR)) {
  if (f.endsWith('.webp') && !expected.has(f)) {
    fs.unlinkSync(path.join(OUT_DIR, f));
    removed++;
  }
}

const mo = (b) => (b / 1024 / 1024).toFixed(1);
console.log(
  `[gallery] ${sources.length} photos — ${built} générée(s), ${skipped} à jour` +
    (removed ? `, ${removed} obsolète(s) supprimée(s)` : '') +
    ` — ${mo(bytesIn)} Mo -> ${mo(bytesOut)} Mo`,
);
