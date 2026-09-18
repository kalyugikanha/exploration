const fs = require('fs');
const path = require('path');

function stripBOM(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    if (content.charCodeAt(0) === 0xFEFF) {
        content = content.slice(1);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Stripped BOM from:', filePath);
    }
}

function walkDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walkDir(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
            stripBOM(fullPath);
        }
    }
}

walkDir('./src');
