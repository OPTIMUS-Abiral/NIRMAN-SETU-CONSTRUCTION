#!/usr/bin/env node

/**
 * PWA Icon Generator for Nirman Setu Construction
 * Generates PNG icons from SVG source in multiple sizes
 */

import fs from 'fs';
import path from 'path';
import { createCanvas, Image } from 'canvas';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ICON_SIZES = [72, 96, 128, 144, 152, 192, 384, 512];
const ICON_SIZES_MASKABLE = [192, 512];
const SCREENSHOT_SIZES = [
  { width: 540, height: 720, name: 'screenshot-540x720.png' },
  { width: 1280, height: 720, name: 'screenshot-1280x720.png' }
];

const NAVY_DEEP = '#0a0f1c';
const NAVY_MEDIUM = '#1e293b';
const GOLD = '#f59e0b';
const GOLD_LIGHT = '#fbbf24';

function drawIcon(canvas, isRounded = false) {
  const ctx = canvas.getContext('2d');
  const size = canvas.width;
  const centerX = size / 2;
  const centerY = size / 2;

  // Background
  ctx.fillStyle = NAVY_DEEP;
  if (isRounded) {
    ctx.beginPath();
    ctx.roundRect(0, 0, size, size, [size * 0.2]);
    ctx.fill();
  } else {
    ctx.fillRect(0, 0, size, size);
  }

  // Gold accent circle
  ctx.strokeStyle = GOLD;
  ctx.globalAlpha = 0.3;
  ctx.lineWidth = size * 0.03;
  ctx.beginPath();
  ctx.arc(centerX, centerY, size * 0.47, 0, Math.PI * 2);
  ctx.stroke();
  ctx.globalAlpha = 1.0;

  // Building structure - main rectangle
  ctx.strokeStyle = GOLD;
  ctx.lineWidth = size * 0.04;
  const buildingX = size * 0.27;
  const buildingY = size * 0.23;
  const buildingW = size * 0.46;
  const buildingH = size * 0.55;

  ctx.strokeRect(buildingX, buildingY, buildingW, buildingH);

  // Building floors
  const floorCount = 4;
  for (let i = 1; i < floorCount; i++) {
    const y = buildingY + (buildingH / floorCount) * i;
    ctx.beginPath();
    ctx.moveTo(buildingX, y);
    ctx.lineTo(buildingX + buildingW, y);
    ctx.stroke();
  }

  // Windows - 3 columns x 4 rows
  const windowW = size * 0.08;
  const windowH = size * 0.065;
  const windowCols = [buildingX + size * 0.06, centerX - windowW / 2, buildingX + buildingW - size * 0.14];

  for (let col = 0; col < 3; col++) {
    for (let row = 0; row < 4; row++) {
      const wx = windowCols[col];
      const wy = buildingY + (buildingH / floorCount) * (row + 0.2);
      ctx.strokeRect(wx, wy, windowW, windowH);
    }
  }

  // Door
  const doorW = size * 0.08;
  const doorH = size * 0.16;
  const doorX = centerX - doorW / 2;
  const doorY = buildingY + buildingH - doorH - size * 0.02;
  ctx.strokeRect(doorX, doorY, doorW, doorH);

  // Door handle
  ctx.fillStyle = GOLD;
  ctx.beginPath();
  ctx.arc(doorX + doorW * 0.75, doorY + doorH / 2, size * 0.01, 0, Math.PI * 2);
  ctx.fill();

  // Crane arm
  ctx.strokeStyle = GOLD;
  ctx.lineWidth = size * 0.025;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(buildingX + buildingW + size * 0.05, buildingY - size * 0.08);
  ctx.lineTo(buildingX + buildingW + size * 0.15, buildingY - size * 0.02);
  ctx.stroke();

  // Crane hook
  ctx.fillStyle = GOLD;
  ctx.beginPath();
  ctx.arc(buildingX + buildingW + size * 0.16, buildingY - size * 0.01, size * 0.025, 0, Math.PI * 2);
  ctx.fill();

  // Blueprint grid
  ctx.strokeStyle = GOLD;
  ctx.globalAlpha = 0.4;
  ctx.lineWidth = size * 0.005;
  const gridStartX = buildingX;
  const gridStartY = buildingY + buildingH + size * 0.04;
  const gridW = buildingW * 0.6;
  const gridH = size * 0.1;
  const gridCells = 4;

  for (let i = 0; i <= gridCells; i++) {
    ctx.beginPath();
    ctx.moveTo(gridStartX + (gridW / gridCells) * i, gridStartY);
    ctx.lineTo(gridStartX + (gridW / gridCells) * i, gridStartY + gridH);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(gridStartX, gridStartY + (gridH / gridCells) * i);
    ctx.lineTo(gridStartX + gridW, gridStartY + (gridH / gridCells) * i);
    ctx.stroke();
  }

  ctx.globalAlpha = 1.0;
}

function drawScreenshot(canvas, isWide = false) {
  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;

  // Background gradient
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, NAVY_DEEP);
  gradient.addColorStop(1, NAVY_MEDIUM);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Header bar
  ctx.fillStyle = NAVY_MEDIUM;
  ctx.fillRect(0, 0, width, height * 0.12);

  // Gold accent line
  ctx.fillStyle = GOLD;
  ctx.fillRect(0, height * 0.12 - 3, width, 3);

  // Logo/Title area
  ctx.fillStyle = GOLD;
  ctx.font = `bold ${height * 0.08}px "Arial"`;
  ctx.textAlign = 'left';
  ctx.fillText('Nirman Setu', width * 0.05, height * 0.07);

  // Main content icon
  const iconSize = height * 0.4;
  const iconCanvas = createCanvas(iconSize, iconSize);
  drawIcon(iconCanvas);
  const iconData = iconCanvas.toDataURL();

  const img = new Image();
  img.onload = () => {
    ctx.drawImage(img, width / 2 - iconSize / 2, height * 0.25, iconSize, iconSize);
  };
  img.src = iconData;

  // Feature text
  ctx.fillStyle = GOLD_LIGHT;
  ctx.font = `bold ${height * 0.04}px Arial`;
  ctx.textAlign = 'center';
  ctx.fillText('Installation Available', width / 2, height * 0.75);

  ctx.fillStyle = '#cbd5e1';
  ctx.font = `${height * 0.03}px Arial`;
  ctx.fillText('Install on your device for quick access', width / 2, height * 0.80);

  // Bottom accent
  ctx.fillStyle = GOLD;
  ctx.fillRect(0, height - 6, width, 6);
}

async function generateIcons() {
  const iconsDir = path.join(__dirname, 'public', 'icons');

  console.log('Generating PWA icons for Nirman Setu Construction...\n');

  // Generate standard icons
  for (const size of ICON_SIZES) {
    const canvas = createCanvas(size, size);
    drawIcon(canvas, false);

    const buffer = canvas.toBuffer('image/png');
    const filename = path.join(iconsDir, `icon-${size}x${size}.png`);
    fs.writeFileSync(filename, buffer);
    console.log(`✓ Generated icon-${size}x${size}.png`);
  }

  console.log('');

  // Generate maskable icons
  for (const size of ICON_SIZES_MASKABLE) {
    const canvas = createCanvas(size, size);
    drawIcon(canvas, true);

    const buffer = canvas.toBuffer('image/png');
    const filename = path.join(iconsDir, `icon-${size}x${size}-maskable.png`);
    fs.writeFileSync(filename, buffer);
    console.log(`✓ Generated icon-${size}x${size}-maskable.png`);
  }

  console.log('');

  // Generate screenshots
  for (const screenshot of SCREENSHOT_SIZES) {
    const canvas = createCanvas(screenshot.width, screenshot.height);
    drawScreenshot(canvas, screenshot.width > screenshot.height);

    const buffer = canvas.toBuffer('image/png');
    const filename = path.join(iconsDir, screenshot.name);
    fs.writeFileSync(filename, buffer);
    console.log(`✓ Generated ${screenshot.name}`);
  }

  console.log('\n✨ All PWA icons generated successfully!');
  console.log(`Icons saved to: ${iconsDir}`);
}

generateIcons().catch(err => {
  console.error('Error generating icons:', err);
  process.exit(1);
});
