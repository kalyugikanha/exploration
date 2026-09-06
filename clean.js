const fs = require("fs");
const file = "d:/Project/Colladome/Exploration-Tours/src/app/(public)/page.tsx";
let content = fs.readFileSync(file, "utf8");

// The corruption contains sequences like Â, Ã, ƒ, â, €, œ, etc.
// Let's strip all non-ASCII characters from the entire file.
// Since we only use standard English characters and HTML entities for special symbols, this is safe.
const cleanContent = content.replace(/[^\x00-\x7F]/g, '');

fs.writeFileSync(file, cleanContent, "utf8");
console.log("Cleaned page.tsx");