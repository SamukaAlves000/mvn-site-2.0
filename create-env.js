const fs = require('fs');
const path = require('path');

// Tenta carregar do arquivo .env manualmente se não estiver no process.env
let geminiKey = process.env.GEMINI_API_KEY;

if (!geminiKey) {
  const envPath = path.join(__dirname, '.env');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const match = envContent.match(/^GEMINI_API_KEY=["']?(.*?)["']?$/m);
    if (match && match[1]) {
      geminiKey = match[1];
      console.log('Chave GEMINI_API_KEY carregada do arquivo .env');
    }
  }
}

const envFileContent = `(function(window) {
  window.__env = window.__env || {};
  window.__env.GEMINI_API_KEY = '${geminiKey || ''}';
})(this);
`;

const assetsDir = path.join(__dirname, 'public', 'assets');
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

fs.writeFileSync(path.join(assetsDir, 'env.js'), envFileContent);
console.log('public/assets/env.js gerado com sucesso.');
