#!/usr/bin/env node
/**
 * generate-sitemap.js
 * Auto-generates sitemap.xml by scanning all .html files in the project root.
 * 
 * Usage: node generate-sitemap.js
 * 
 * This script scans the root directory for .html files, assigns priorities
 * based on page type, and outputs a production-ready sitemap.xml.
 */

const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://drbatrasdentistree.in';
const ROOT_DIR = __dirname;
const OUTPUT_FILE = path.join(ROOT_DIR, 'sitemap.xml');

// Files to exclude from sitemap
const EXCLUDE_FILES = [
  'orthodontic-braces_copy.html', // duplicate
];

// Priority mapping by page type
const PRIORITY_MAP = {
  'index.html': { priority: '1.0', changefreq: 'weekly' },
  'contact.html': { priority: '0.9', changefreq: 'monthly' },
  'dental-implants.html': { priority: '0.9', changefreq: 'monthly' },
  'root-canal.html': { priority: '0.9', changefreq: 'monthly' },
  'orthodontic-braces.html': { priority: '0.9', changefreq: 'monthly' },
  'Invisalign_Provider.html': { priority: '0.9', changefreq: 'monthly' },
  'implants-dentistry.html': { priority: '0.9', changefreq: 'monthly' },
  'blogs.html': { priority: '0.7', changefreq: 'weekly' },
};

const DEFAULT_PRIORITY = { priority: '0.7', changefreq: 'monthly' };
const ABOUT_PRIORITY = { priority: '0.8', changefreq: 'monthly' };

function getPageConfig(filename) {
  if (PRIORITY_MAP[filename]) return PRIORITY_MAP[filename];
  if (filename.includes('about') || filename.includes('dr-')) return ABOUT_PRIORITY;
  if (filename.startsWith('all-')) return ABOUT_PRIORITY;
  return DEFAULT_PRIORITY;
}

function generateSitemap() {
  const today = new Date().toISOString().split('T')[0];
  
  // Scan for .html files in root
  const htmlFiles = fs.readdirSync(ROOT_DIR)
    .filter(f => f.endsWith('.html') && !EXCLUDE_FILES.includes(f))
    .sort();

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  htmlFiles.forEach(file => {
    const config = getPageConfig(file);
    const loc = file === 'index.html' 
      ? `${SITE_URL}/` 
      : `${SITE_URL}/${file}`;
    
    xml += `  <url>\n`;
    xml += `    <loc>${loc}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>${config.changefreq}</changefreq>\n`;
    xml += `    <priority>${config.priority}</priority>\n`;
    xml += `  </url>\n`;
  });

  xml += '</urlset>\n';

  fs.writeFileSync(OUTPUT_FILE, xml, 'utf8');
  console.log(`✅ Sitemap generated: ${OUTPUT_FILE}`);
  console.log(`   Total URLs: ${htmlFiles.length}`);
  console.log(`   Last modified: ${today}`);
}

generateSitemap();
