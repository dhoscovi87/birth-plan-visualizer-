# Deployment Guide for Birth Plan Visualizer

This guide provides step-by-step instructions for deploying the Birth Plan Visualizer application to various hosting platforms.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Environment Variables](#environment-variables)
- [Deployment Options](#deployment-options)
  - [Vercel (Recommended)](#vercel-recommended)
  - [Netlify](#netlify)
  - [GitHub Pages](#github-pages)
- [Local Testing](#local-testing)

---

## Prerequisites

Before deploying, ensure you have:
1. **Node.js** (v20 or higher) installed
2. **Gemini API Key** from [Google AI Studio](https://aistudio.google.com/app/apikey)
3. Git repository set up (already done for this project)

---

## Environment Variables

The application requires the following environment variable:

- `GEMINI_API_KEY` - Your Google Gemini API key for AI features

### Setting Up Environment Variables Locally

1. Copy the example environment file:
   ```bash
   cp .env.local.example .env.local
   ```

2. Edit `.env.local` and add your API key:
   ```
   GEMINI_API_KEY=your_actual_api_key_here
   ```

---

## Deployment Options

### Vercel (Recommended)

Vercel offers the easiest deployment with automatic builds and previews.

#### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/dhoscovi87/birth-plan-visualizer-)

#### Manual Deployment

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy:
   ```bash
   vercel
   ```

4. Add environment variable in Vercel dashboard:
   - Go to your project settings
   - Navigate to "Environment Variables"
   - Add `GEMINI_API_KEY` with your API key value
   - Redeploy the project

#### Configuration

The project includes a `vercel.json` file with the following configuration:
- Build command: `npm run build`
- Output directory: `dist`
- Framework: Vite

---

### Netlify

Netlify provides continuous deployment from Git with easy configuration.

#### One-Click Deploy

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/dhoscovi87/birth-plan-visualizer-)

#### Manual Deployment

1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Login to Netlify:
   ```bash
   netlify login
   ```

3. Initialize and deploy:
   ```bash
   netlify init
   ```

4. Add environment variable:
   ```bash
   netlify env:set GEMINI_API_KEY "your_api_key_here"
   ```

5. Deploy:
   ```bash
   netlify deploy --prod
   ```

#### Configuration

The project includes a `netlify.toml` file with:
- Build command: `npm run build`
- Publish directory: `dist`
- SPA redirect rules for routing

---

### GitHub Pages

GitHub Pages offers free static hosting directly from your repository.

#### Setup Instructions

1. **Enable GitHub Pages in Repository Settings:**
   - Go to your repository on GitHub
   - Navigate to Settings → Pages
   - Under "Build and deployment", set:
     - Source: GitHub Actions

2. **Add API Key as Repository Secret:**
   - Go to Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Name: `GEMINI_API_KEY`
   - Value: Your Gemini API key
   - Click "Add secret"

3. **Trigger Deployment:**
   - Push to the `main` branch, or
   - Go to Actions tab and manually run the "Deploy to GitHub Pages" workflow

4. **Access Your Site:**
   - After deployment completes, your site will be available at:
   - `https://dhoscovi87.github.io/birth-plan-visualizer-/`

#### How It Works

The included `.github/workflows/deploy.yml` workflow:
- Triggers on push to `main` or manual dispatch
- Installs dependencies and builds the app
- Deploys to GitHub Pages automatically
- Uses the `GEMINI_API_KEY` secret for build-time API configuration

---

## Local Testing

Before deploying, test the application locally:

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local and add your GEMINI_API_KEY
   ```

3. **Run development server:**
   ```bash
   npm run dev
   ```
   - Application will be available at `http://localhost:3000`

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Preview production build:**
   ```bash
   npm run preview
   ```

---

## Troubleshooting

### Build Failures

- **Missing API Key:** Ensure `GEMINI_API_KEY` is set in your deployment platform's environment variables
- **Node Version:** Use Node.js v20 or higher
- **Dependencies:** Run `npm ci` to ensure clean dependency installation

### Runtime Errors

- **API Key Issues:** Check that the API key is correctly set and has necessary permissions
- **404 on Refresh:** Ensure SPA redirect rules are configured (handled automatically in provided configs)

### GitHub Pages Specific

- **404 Error:** Make sure GitHub Pages is enabled and set to use GitHub Actions as source
- **Assets Not Loading:** Verify the `base` path in `vite.config.ts` matches your repository name

---

## Post-Deployment

After successful deployment:
1. Test all features including AI-enhanced summary
2. Verify environment variables are working correctly
3. Test on different devices and browsers
4. Monitor build logs for any warnings or errors

---

## Support

For issues or questions:
- Check the [main README](README.md) for project overview
- Review deployment platform documentation
- Check GitHub repository issues

---

## Security Notes

- **Never commit** `.env.local` or any file containing API keys
- Keep API keys secure and rotate them regularly
- Monitor API usage in Google AI Studio dashboard
- Consider implementing rate limiting for production use

### Important: Client-Side API Key Exposure

⚠️ **Note**: This application uses a client-side architecture where the Gemini API key is embedded in the JavaScript bundle at build time. This means the API key will be visible in the browser's developer tools.

**Recommendations for production use:**
- Use API key restrictions in Google Cloud Console (restrict to your domain)
- Set usage quotas to prevent abuse
- Monitor your API usage regularly
- Consider implementing a backend proxy for production deployments to keep the API key secure
- For public deployments, be aware that your API key may be discovered and used by others

For sensitive production use, consider creating a backend service that proxies requests to the Gemini API, keeping the API key server-side.
