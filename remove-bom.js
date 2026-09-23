const fs = require('fs');
const path = require('path');

function removeBom(filePath) {
    const buffer = fs.readFileSync(filePath);
    if (buffer.length >= 3 && buffer[0] === 0xEF && buffer[1] === 0xBB && buffer[2] === 0xBF) {
        console.log('Removing BOM from:', filePath);
        fs.writeFileSync(filePath, buffer.slice(3));
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
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts') || fullPath.endsWith('.css') || fullPath.endsWith('.js')) {
            removeBom(fullPath);
        }
    }
}

walkDir('./src');
walkDir('./prisma');
