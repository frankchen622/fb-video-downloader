#!/usr/bin/env node
/**
 * Submit all pages to IndexNow for faster search engine indexing
 * Run after deployment: node scripts/submit-indexnow.js
 */

const https = require('https');

const DOMAIN = 'https://dlfb.io';
const API_ENDPOINT = `${DOMAIN}/api/indexnow`;

// All pages to submit
const PAGES = [
  '/',
  '/reels-downloader',
  '/facebook-to-mp3',
  '/facebook-to-mp4',
  '/private-video-downloader',
  '/contact',
  '/privacy-policy',
  '/terms-of-use'
];

// Build full URLs
const urls = PAGES.map(page => `${DOMAIN}${page}`);

console.log(`Submitting ${urls.length} URLs to IndexNow...`);

const postData = JSON.stringify({ urls });

const url = new URL(API_ENDPOINT);
const options = {
  hostname: url.hostname,
  port: url.port || 443,
  path: url.pathname,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};

const req = https.request(options, (res) => {
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log(`Status: ${res.statusCode}`);
    try {
      const response = JSON.parse(data);
      console.log('Response:', response);
      if (response.success) {
        console.log('✅ Successfully submitted!');
      } else {
        console.error('❌ Submission failed:', response.message);
      }
    } catch (e) {
      console.log('Raw response:', data);
    }
  });
});

req.on('error', (error) => {
  console.error('Error:', error.message);
  process.exit(1);
});

req.write(postData);
req.end();

