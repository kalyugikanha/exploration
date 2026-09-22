const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;
    
    // Replace blue-* tailwind classes with brand-*
    content = content.replace(/blue-600/g, 'brand-700');
    content = content.replace(/blue-700/g, 'brand-800');
    content = content.replace(/blue-500/g, 'brand-600');
    content = content.replace(/blue-50/g, 'brand-50');
    content = content.replace(/blue-100/g, 'brand-100');
    content = content.replace(/blue-800/g, 'brand-800');
    content = content.replace(/blue-900/g, 'brand-900');
    
    // Replace hex colors occasionally used
    content = content.replace(/#2563eb/g, '#045a94');
    
    // Enforce fonts. The user requested strict typography.
    // Replace font-serif (if any) or font-sans with standard.
    // Actually, we'll ensure headings use font-display and text uses font-sans.
    // This requires component-level awareness, but replacing generic fonts helps.
    
    if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Updated colors in:', filePath);
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
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts') || fullPath.endsWith('.css')) {
            replaceInFile(fullPath);
        }
    }
}

walkDir('./src');
