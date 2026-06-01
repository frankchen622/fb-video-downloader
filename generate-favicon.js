const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

// Create output directory
const outputDir = path.join(__dirname, 'public');
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Function to create favicon at different sizes
function createFavicon(size) {
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext('2d');
    
    // Background - Blue gradient
    const gradient = ctx.createLinearGradient(0, 0, size, size);
    gradient.addColorStop(0, '#2563eb');
    gradient.addColorStop(1, '#1d4ed8');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
    
    // Scale factor
    const scale = size / 512;
    
    // Draw download arrow
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 28 * scale;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    // Arrow shaft
    ctx.beginPath();
    ctx.moveTo(256 * scale, 180 * scale);
    ctx.lineTo(256 * scale, 340 * scale);
    ctx.stroke();
    
    // Arrow head
    ctx.beginPath();
    ctx.moveTo(200 * scale, 284 * scale);
    ctx.lineTo(256 * scale, 340 * scale);
    ctx.lineTo(312 * scale, 284 * scale);
    ctx.stroke();
    
    // Arrow base line
    ctx.beginPath();
    ctx.moveTo(200 * scale, 380 * scale);
    ctx.lineTo(312 * scale, 380 * scale);
    ctx.stroke();
    
    return canvas;
}

// Generate different sizes
const sizes = [
    { size: 16, name: 'favicon-16x16.png' },
    { size: 32, name: 'favicon-32x32.png' },
    { size: 180, name: 'apple-touch-icon.png' },
    { size: 512, name: 'favicon-512.png' }
];

sizes.forEach(({ size, name }) => {
    const canvas = createFavicon(size);
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(path.join(outputDir, name), buffer);
    console.log(`✓ Generated ${name}`);
});

// Generate favicon.ico (using 32x32)
const canvas32 = createFavicon(32);
const buffer32 = canvas32.toBuffer('image/png');
fs.writeFileSync(path.join(outputDir, 'favicon.ico'), buffer32);
console.log('✓ Generated favicon.ico');

console.log('\n✅ All favicons generated successfully!');
