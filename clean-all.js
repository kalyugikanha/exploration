const fs = require('fs');
const path = require('path');

function cleanFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace all zero-width spaces, non-breaking spaces, BOMs, and weird unicode control characters
    const originalLength = content.length;
    content = content.replace(/[\u200B-\u200D\uFEFF]/g, '');
    
    if (originalLength !== content.length) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Removed hidden characters from:', filePath);
    }
}

function walkDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (!fullPath.includes('.next') && !fullPath.includes('node_modules')) {
                walkDir(fullPath);
            }
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
            cleanFile(fullPath);
        }
    }
}

walkDir('./src');
