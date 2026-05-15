/**
 * Studio Flavie — serveur statique minimal
 * Sert le site (HTML/CSS/JS) tel quel.
 * Compatible Hostinger Node.js et n'importe quel hébergeur Node standard.
 */

const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Sécurité de base + cache pour les assets statiques (1 jour)
app.use(express.static(__dirname, {
  extensions: ['html'],
  maxAge: '1d',
  setHeaders(res, filePath) {
    if (filePath.endsWith('.html')) {
      res.setHeader('Cache-Control', 'no-cache'); // HTML toujours frais
    }
  }
}));

// Fallback : tout chemin non trouvé renvoie sur l'accueil
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`✦ Studio Flavie en ligne — port ${PORT}`);
});
