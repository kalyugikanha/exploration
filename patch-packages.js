const fs = require('fs');
let content = fs.readFileSync('src/app/admin/packages/[id]/page.tsx', 'utf8');
content = content.replace('<label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>', '<label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>\n              <p className="text-xs text-gray-400 mb-2">Recommended: 15-30 words (approx. 100-150 characters).</p>');
content = content.replace('<label className="block text-sm font-medium text-gray-700 mb-1">Detailed Content</label>', '<label className="block text-sm font-medium text-gray-700 mb-1">Detailed Content</label>\n            <p className="text-xs text-gray-400 mb-2">Recommended: 100-250 words.</p>');
fs.writeFileSync('src/app/admin/packages/[id]/page.tsx', content, 'utf8');
