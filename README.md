<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Birth Plan Visualizer

Create a personalized, visual birth plan by selecting preferences for labor, delivery, and postpartum care. Includes custom notes and an AI-enhanced summary to help communicate your wishes clearly with your medical team.

View your app in AI Studio: https://ai.studio/apps/drive/15DA07i1lDMQ6Q_VXZBtpDvSDlJ7AXwi-

## 🚀 Quick Deploy

Deploy this application to your preferred platform:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/dhoscovi87/birth-plan-visualizer-)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/dhoscovi87/birth-plan-visualizer-)

Or use GitHub Pages - see [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.

## 📋 Prerequisites

- Node.js (v20 or higher)
- Gemini API Key from [Google AI Studio](https://aistudio.google.com/app/apikey)

## 🏃 Run Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/dhoscovi87/birth-plan-visualizer-.git
   cd birth-plan-visualizer-
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.local.example .env.local
   ```
   Edit `.env.local` and add your `GEMINI_API_KEY`

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:3000`

## 🏗️ Build for Production

```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## 📦 Deployment

For detailed deployment instructions to Vercel, Netlify, or GitHub Pages, see [DEPLOYMENT.md](DEPLOYMENT.md).

### Quick Deployment Steps

**Vercel:**
```bash
vercel
```

**Netlify:**
```bash
netlify deploy --prod
```

**GitHub Pages:**
- Push to `main` branch (automatic deployment via GitHub Actions)

## 🔑 Environment Variables

Required environment variable:
- `GEMINI_API_KEY` - Your Google Gemini API key for AI-enhanced features

## 🛠️ Technology Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Lucide React (icons)
- Google Gemini AI

## 📄 License

This project is open source and available for personal and commercial use.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📞 Support

For deployment help, see [DEPLOYMENT.md](DEPLOYMENT.md) or open an issue on GitHub.
