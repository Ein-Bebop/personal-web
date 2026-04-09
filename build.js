#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { marked } = require('marked');

const POSTS_DIR = path.join(__dirname, 'posts');
const SRC_DIR = path.join(__dirname, 'src');
const PUBLIC_DIR = path.join(__dirname, 'public');
const TEMPLATES_DIR = path.join(SRC_DIR, 'templates');

// ===== Helpers =====

function readTemplate(name) {
  return fs.readFileSync(path.join(TEMPLATES_DIR, name), 'utf8');
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  ensureDir(dest);
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function renderPage(base, pageTitle, content) {
  return base
    .replace('{{PAGE_TITLE}}', pageTitle)
    .replace('{{CONTENT}}', content);
}

function toDateObj(raw) {
  // gray-matter may parse YAML dates as JS Date objects already
  if (raw instanceof Date) return raw;
  // For date-only strings like "2024-01-15", append time to avoid timezone shifts
  return new Date(String(raw).includes('T') ? raw : String(raw) + 'T00:00:00Z');
}

function formatDate(raw) {
  return toDateObj(raw).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

function toISODate(raw) {
  return toDateObj(raw).toISOString().slice(0, 10);
}

function slugify(filename) {
  return path.basename(filename, '.md');
}

// ===== Load & parse posts =====

function loadPosts() {
  if (!fs.existsSync(POSTS_DIR)) return [];

  return fs.readdirSync(POSTS_DIR)
    .filter(f => f.endsWith('.md'))
    .map(filename => {
      const raw = fs.readFileSync(path.join(POSTS_DIR, filename), 'utf8');
      const { data, content } = matter(raw);
      return {
        slug: slugify(filename),
        title: data.title || 'Untitled',
        date: data.date || '',
        dateISO: data.date ? toISODate(data.date) : '',
        dateFormatted: data.date ? formatDate(data.date) : '',
        body: marked(content),
      };
    })
    .sort((a, b) => (a.dateISO < b.dateISO ? 1 : -1)); // newest first
}

// ===== Build =====

function build() {
  ensureDir(PUBLIC_DIR);

  const base = readTemplate('base.html');
  const posts = loadPosts();

  // Copy CSS
  ensureDir(path.join(PUBLIC_DIR, 'css'));
  fs.copyFileSync(
    path.join(SRC_DIR, 'css', 'style.css'),
    path.join(PUBLIC_DIR, 'css', 'style.css')
  );

  // Copy assets
  copyDir(path.join(SRC_DIR, 'assets'), path.join(PUBLIC_DIR, 'assets'));

  // Home page
  const homeContent = readTemplate('home.html');
  fs.writeFileSync(
    path.join(PUBLIC_DIR, 'index.html'),
    renderPage(base, 'Diego Acosta', homeContent)
  );
  console.log('Built: index.html');

  // Blog listing
  const postItems = posts.map(p => `
  <li>
    <time class="post-date" datetime="${p.dateISO}">${p.dateFormatted}</time>
    <a class="post-title" href="/blog/${p.slug}/">${p.title}</a>
  </li>`).join('\n');

  const blogContent = readTemplate('blog.html').replace('{{POSTS}}', postItems);
  ensureDir(path.join(PUBLIC_DIR, 'blog'));
  fs.writeFileSync(
    path.join(PUBLIC_DIR, 'blog', 'index.html'),
    renderPage(base, 'Blog — Diego Acosta', blogContent)
  );
  console.log('Built: blog/index.html');

  // Individual posts
  const postTemplate = readTemplate('post.html');
  for (const post of posts) {
    const postContent = postTemplate
      .replace('{{POST_TITLE}}', post.title)
      .replace('{{POST_DATE_ISO}}', post.dateISO)
      .replace('{{POST_DATE}}', post.dateFormatted)
      .replace('{{POST_BODY}}', post.body);

    const postDir = path.join(PUBLIC_DIR, 'blog', post.slug);
    ensureDir(postDir);
    fs.writeFileSync(
      path.join(postDir, 'index.html'),
      renderPage(base, `${post.title} — Diego Acosta`, postContent)
    );
    console.log(`Built: blog/${post.slug}/index.html`);
  }

  console.log(`\nDone. ${posts.length} post(s) built.`);
}

build();
