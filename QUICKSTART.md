# Quick Start Deployment Guide

This is a quick reference for deploying the Birth Plan Visualizer. For detailed instructions, see [DEPLOYMENT.md](DEPLOYMENT.md).

## What's Been Set Up

✅ Deployment configurations for:
- **Vercel** (`vercel.json`)
- **Netlify** (`netlify.toml`)
- **GitHub Pages** (`.github/workflows/deploy.yml`)

✅ Environment variable template (`.env.local.example`)

✅ Updated README with deployment badges and instructions

## Next Steps to Deploy

### Option 1: Vercel (Easiest)
1. Click: [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/dhoscovi87/birth-plan-visualizer-)
2. Add environment variable: `GEMINI_API_KEY=your_key`
3. Deploy!

### Option 2: Netlify
1. Click: [![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/dhoscovi87/birth-plan-visualizer-)
2. Add environment variable: `GEMINI_API_KEY=your_key`
3. Deploy!

### Option 3: GitHub Pages
1. Go to repository Settings → Pages
2. Set Source to "GitHub Actions"
3. Go to Settings → Secrets and variables → Actions
4. Add secret: `GEMINI_API_KEY` with your API key
5. Push to `main` branch or manually trigger the workflow

## Required: Gemini API Key

Get your API key from: https://aistudio.google.com/app/apikey

All deployment options require this environment variable:
- **Name:** `GEMINI_API_KEY`
- **Value:** Your API key from Google AI Studio

## Testing

After deployment:
1. Visit your deployed URL
2. Test creating a birth plan
3. Verify the AI-enhanced summary feature works
4. Test printing functionality

## Support

- Full guide: [DEPLOYMENT.md](DEPLOYMENT.md)
- Main README: [README.md](README.md)
- Issues: https://github.com/dhoscovi87/birth-plan-visualizer-/issues
