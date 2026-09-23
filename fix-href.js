const fs = require('fs');
let content = fs.readFileSync('src/app/(public)/destinations/page.tsx', 'utf8');
content = content.replace('href={/destinations/}', 'href={`/destinations/${spot.slug}`}');
fs.writeFileSync('src/app/(public)/destinations/page.tsx', content, 'utf8');
console.log('Fixed using node');
