const fs = require('fs');
const path = require('path');
const copyFile = (source, target) => { const targetDir = path.dirname(target);

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  fs.copyFileSync(source, target); };
const assetsPath = path.join(__dirname, 'src', 'db');
const distPath = path.join(__dirname, 'dist/src', 'db');

fs.readdirSync(assetsPath)
  .forEach(file => {
  if (file.endsWith('.json')) {
    copyFile(path.join(assetsPath, file), path.join(distPath, file));
    }
   }
  );
