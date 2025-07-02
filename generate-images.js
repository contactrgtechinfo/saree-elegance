const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

// Create directories if they don't exist
const dirs = [
    'images/hero',
    'images/products',
    'images/services',
    'images/team',
    'images/about'
];

dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

// Helper function to save canvas to file
function saveCanvas(canvas, filepath) {
    const buffer = canvas.toBuffer('image/jpeg');
    fs.writeFileSync(filepath, buffer);
}

// Generate hero background
function generateHeroImage() {
    const canvas = createCanvas(1920, 1080);
    const ctx = canvas.getContext('2d');

    // Create gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#8B0D32');
    gradient.addColorStop(1, '#D4AF37');

    // Fill background
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add decorative elements
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 2;

    for(let i = 0; i < 20; i++) {
        ctx.beginPath();
        ctx.moveTo(Math.random() * canvas.width, 0);
        ctx.lineTo(Math.random() * canvas.width, canvas.height);
        ctx.stroke();
    }

    saveCanvas(canvas, 'images/hero/hero-bg.jpg');
}

// Generate product images
function generateProductImages() {
    const canvas = createCanvas(800, 1200);
    const ctx = canvas.getContext('2d');

    const patterns = [
        {
            name: 'featured-1',
            color1: '#8B0D32',
            color2: '#D4AF37',
            pattern: 'geometric'
        },
        {
            name: 'featured-2',
            color1: '#006064',
            color2: '#D4AF37',
            pattern: 'floral'
        },
        {
            name: 'featured-3',
            color1: '#4A0404',
            color2: '#D4AF37',
            pattern: 'traditional'
        }
    ];

    patterns.forEach(pattern => {
        // Clear canvas
        ctx.fillStyle = pattern.color1;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Add pattern
        ctx.strokeStyle = pattern.color2;
        ctx.lineWidth = 3;

        if (pattern.pattern === 'geometric') {
            for(let i = 0; i < canvas.width; i += 50) {
                for(let j = 0; j < canvas.height; j += 50) {
                    ctx.beginPath();
                    ctx.rect(i, j, 40, 40);
                    ctx.stroke();
                }
            }
        } else if (pattern.pattern === 'floral') {
            for(let i = 0; i < canvas.width; i += 100) {
                for(let j = 0; j < canvas.height; j += 100) {
                    ctx.beginPath();
                    ctx.arc(i, j, 30, 0, Math.PI * 2);
                    ctx.stroke();
                    
                    for(let k = 0; k < 6; k++) {
                        ctx.beginPath();
                        ctx.ellipse(i, j, 20, 40, k * Math.PI / 3, 0, Math.PI * 2);
                        ctx.stroke();
                    }
                }
            }
        } else {
            for(let i = 0; i < canvas.width; i += 60) {
                for(let j = 0; j < canvas.height; j += 60) {
                    ctx.beginPath();
                    ctx.moveTo(i, j);
                    ctx.lineTo(i + 40, j + 40);
                    ctx.moveTo(i + 40, j);
                    ctx.lineTo(i, j + 40);
                    ctx.stroke();
                }
            }
        }

        // Add border
        ctx.strokeStyle = pattern.color2;
        ctx.lineWidth = 20;
        ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);

        saveCanvas(canvas, `images/products/${pattern.name}.jpg`);
    });
}

// Generate service images
function generateServiceImages() {
    const canvas = createCanvas(800, 600);
    const ctx = canvas.getContext('2d');

    const services = [
        { name: 'blouse-stitching', icon: 'blouse' },
        { name: 'express-delivery', icon: 'delivery' },
        { name: 'personal-styling', icon: 'styling' },
        { name: 'alterations', icon: 'alterations' }
    ];

    services.forEach(service => {
        // Clear canvas
        ctx.fillStyle = '#f8f8f8';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Add gradient background
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, '#8B0D32');
        gradient.addColorStop(1, '#D4AF37');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Add overlay
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw icon
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 8;
        ctx.fillStyle = '#FFFFFF';

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        switch(service.icon) {
            case 'blouse':
                ctx.beginPath();
                ctx.moveTo(centerX - 100, centerY - 50);
                ctx.lineTo(centerX + 100, centerY - 50);
                ctx.lineTo(centerX + 50, centerY + 100);
                ctx.lineTo(centerX - 50, centerY + 100);
                ctx.closePath();
                ctx.stroke();
                break;

            case 'delivery':
                ctx.beginPath();
                ctx.moveTo(centerX - 100, centerY);
                ctx.lineTo(centerX + 100, centerY);
                ctx.moveTo(centerX + 70, centerY - 30);
                ctx.lineTo(centerX + 100, centerY);
                ctx.lineTo(centerX + 70, centerY + 30);
                ctx.stroke();
                break;

            case 'styling':
                ctx.beginPath();
                ctx.arc(centerX, centerY - 50, 30, 0, Math.PI * 2);
                ctx.moveTo(centerX, centerY - 20);
                ctx.lineTo(centerX, centerY + 50);
                ctx.moveTo(centerX - 50, centerY);
                ctx.lineTo(centerX + 50, centerY);
                ctx.stroke();
                break;

            case 'alterations':
                ctx.beginPath();
                ctx.moveTo(centerX - 50, centerY - 50);
                ctx.lineTo(centerX + 50, centerY + 50);
                ctx.moveTo(centerX + 50, centerY - 50);
                ctx.lineTo(centerX - 50, centerY + 50);
                ctx.stroke();
                break;
        }

        saveCanvas(canvas, `images/services/${service.name}.jpg`);
    });
}

// Generate team and about images
function generateTeamAndAboutImages() {
    const canvas = createCanvas(600, 600);
    const ctx = canvas.getContext('2d');

    // Generate team member avatars
    const team = [
        { name: 'Member1', role: 'CEO' },
        { name: 'Member2', role: 'Creative Director' },
        { name: 'Member3', role: 'Head of Design' },
        { name: 'Member4', role: 'Customer Relations' }
    ];

    team.forEach(member => {
        // Clear canvas
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Create gradient background
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, '#8B0D32');
        gradient.addColorStop(1, '#D4AF37');
        
        // Draw circle for avatar
        ctx.beginPath();
        ctx.arc(canvas.width/2, canvas.height/2, 250, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Add initials
        ctx.font = 'bold 120px Arial';
        ctx.fillStyle = '#FFFFFF';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(member.name.charAt(0), canvas.width/2, canvas.height/2);

        saveCanvas(canvas, `images/team/${member.name.toLowerCase()}.jpg`);
    });

    // Generate story image
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const storyGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    storyGradient.addColorStop(0, '#8B0D32');
    storyGradient.addColorStop(1, '#D4AF37');
    ctx.fillStyle = storyGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add decorative pattern
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 2;
    
    for(let i = 0; i < canvas.width; i += 30) {
        for(let j = 0; j < canvas.height; j += 30) {
            ctx.beginPath();
            ctx.arc(i, j, 10, 0, Math.PI * 2);
            ctx.stroke();
        }
    }

    saveCanvas(canvas, 'images/about/story.jpg');
}

// Generate all images
generateHeroImage();
generateProductImages();
generateServiceImages();
generateTeamAndAboutImages();

console.log('All images generated successfully!');
