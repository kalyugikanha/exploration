const fs = require('fs');

function cleanFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    // Remove any zero-width characters (BOM, etc) at the start
    content = content.replace(/^[\u200B\u200C\u200D\u200E\u200F\uFEFF]/, '');
    // Also try checking the first char manually
    if (content.charCodeAt(0) === 0xFEFF || content.charCodeAt(0) === 65279) {
        content = content.substring(1);
    }
    // Also remove them if they somehow got in the middle of the string at the start of a return
    content = content.replace(/\uFEFF/g, '');
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Cleaned', filePath);
}

const filesToClean = [
    'src/app/admin/blog/page.tsx',
    'src/app/admin/comments/page.tsx',
    'src/app/admin/faqs/page.tsx',
    'src/app/admin/testimonials/page.tsx',
    'src/components/layout/Footer.tsx',
    'src/app/admin/blog/[id]/page.tsx',
    'src/app/admin/faqs/[id]/page.tsx',
    'src/app/admin/testimonials/[id]/page.tsx',
    'src/app/admin/settings/SettingsTabs.tsx',
    'src/app/admin/settings/page.tsx',
    'src/app/admin/actions.ts',
    'src/components/ui/CommentForm.tsx'
];

filesToClean.forEach(f => {
    try {
        cleanFile(f);
    } catch(e) {
        console.log("Could not clean", f);
    }
});
