#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const locales = ['en', 'es', 'pt', 'fr', 'de', 'ja', 'id', 'vi', 'th', 'ar', 'zh', 'ru'];

// Static titles from .tsx files
const staticTitles = {
  'reels-downloader': 'Facebook Reels Downloader - Download FB Reels in HD Free',
  'private-video-downloader': 'Private Facebook Video Downloader - Download Private FB Videos',
  'facebook-to-mp3': 'Facebook to MP3 Converter - Extract Audio from FB Videos Free | Download Facebook Music',
  'facebook-to-mp4': 'Facebook to MP4 Converter - Download FB Videos as MP4 Free | HD Quality',
};

// Load translation files
const translations = {};
for (const locale of locales) {
  const file = path.join(__dirname, 'locales', `${locale}.json`);
  if (fs.existsSync(file)) {
    translations[locale] = JSON.parse(fs.readFileSync(file, 'utf8'));
  }
}

// Collect all titles
const allTitles = [];

for (const locale of locales) {
  const t = translations[locale];
  if (!t) continue;

  // Home page
  if (t.home && t.home.metaTitle) {
    allTitles.push({
      locale,
      page: 'home',
      title: t.home.metaTitle,
      url: locale === 'en' ? '/' : `/${locale}/`
    });
  }

  // Contact page
  if (t.contactPage && t.contactPage.title) {
    allTitles.push({
      locale,
      page: 'contact',
      title: t.contactPage.title,
      url: locale === 'en' ? '/contact' : `/${locale}/contact`
    });
  }

  // Privacy Policy
  if (t.privacyPage && t.privacyPage.title) {
    allTitles.push({
      locale,
      page: 'privacy-policy',
      title: t.privacyPage.title,
      url: locale === 'en' ? '/privacy-policy' : `/${locale}/privacy-policy`
    });
  }

  // Terms of Use
  if (t.termsPage && t.termsPage.title) {
    allTitles.push({
      locale,
      page: 'terms-of-use',
      title: t.termsPage.title,
      url: locale === 'en' ? '/terms-of-use' : `/${locale}/terms-of-use`
    });
  }

  // Static pages (only EN - hardcoded)
  if (locale === 'en') {
    for (const [page, title] of Object.entries(staticTitles)) {
      allTitles.push({
        locale,
        page,
        title,
        url: `/${page}`
      });
    }
  }
}

// Find duplicates
const titleCounts = {};
for (const item of allTitles) {
  if (!titleCounts[item.title]) {
    titleCounts[item.title] = [];
  }
  titleCounts[item.title].push(item.url);
}

// Report
console.log('\n=== TITLE ANALYSIS ===\n');
console.log(`Total pages: ${allTitles.length}`);
console.log(`Unique titles: ${Object.keys(titleCounts).length}\n`);

const duplicates = Object.entries(titleCounts).filter(([title, urls]) => urls.length > 1);

if (duplicates.length > 0) {
  console.log('=== DUPLICATE TITLES FOUND ===\n');
  for (const [title, urls] of duplicates) {
    console.log(`Title: "${title}"`);
    console.log(`Used by ${urls.length} pages:`);
    urls.forEach(url => console.log(`  - https://dlfb.io${url}`));
    console.log('');
  }
} else {
  console.log('✅ No duplicate titles found!\n');
}

// Show all titles grouped by page type
console.log('\n=== ALL TITLES BY PAGE ===\n');
const byPage = {};
for (const item of allTitles) {
  if (!byPage[item.page]) byPage[item.page] = [];
  byPage[item.page].push(item);
}

for (const [page, items] of Object.entries(byPage)) {
  console.log(`${page}:`);
  items.forEach(item => {
    console.log(`  [${item.locale}] ${item.title}`);
  });
  console.log('');
}

