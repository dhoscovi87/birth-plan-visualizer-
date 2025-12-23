# Deployment Plan for Birth Plan Visualizer

This guide outlines how to deploy your application for free using **Vercel** or **Netlify**, which are the best platforms for Vite-based projects.

## 🚀 Prerequisites

1.  **GitHub Repository**: Ensure your code is pushed to a private or public GitHub repository. (Private is recommended to avoid exposing your API key if you commit `.env` by mistake).
2.  **Google Gemini API Key**: You already have this in your `.env` file.

---

## Option 1: Vercel (Recommended)

Vercel is the most seamless experience for Vite/React apps.

### Steps:
1.  **Sign Up**: Go to [vercel.com](https://vercel.com) and sign up with your GitHub account.
2.  **Import Project**:
    *   Click **"Add New"** -> **"Project"**.
    *   Import your `birth-plan-visualizer` repository.
3.  **Configure Environment Variables**:
    *   In the **Environment Variables** section, add:
        *   **Key**: `VITE_GEMINI_API_KEY`
        *   **Value**: *[Paste your AIzaSy... key here]*
4.  **Deploy**: Click **"Deploy"**. Vercel will automatically detect Vite and build the project.
5.  **Live Site**: You will get a link like `birth-plan-visualizer.vercel.app`.

---

## Option 2: Netlify

Netlify is equally simple and provides a very generous free tier.

### Steps:
1.  **Sign Up**: Go to [netlify.com](https://app.netlify.com) and log in with GitHub.
2.  **Add New Site**:
    *   Click **"Add new site"** -> **"Import an existing project"**.
    *   Choose GitHub and select your repository.
3.  **Site Settings**:
    *   **Build command**: `npm run build`
    *   **Publish directory**: `dist` (Vite's default)
4.  **Environment Variables**:
    *   Go to **Site Configuration** -> **Environment variables**.
    *   Add `VITE_GEMINI_API_KEY`.
5.  **Deploy**: Click **"Deploy [Site Name]"**.

---

## 🔒 Security Note (Important)

Your current code sends the API Key directly from the browser to Google. This means anyone who visits your site can technically find your API key in the "Network" tab of their browser tools.

**To protect your key:**
1.  Go to the [Google AI Studio API Keys page](https://aistudio.google.com/app/apikey).
2.  Click on the key you are using.
3.  Under **"API key restrictions"**, strictly set **"Webside restrictions"** (Referrers) to your live URL (e.g., `https://your-app.vercel.app/*`).
4.  This prevents other people from using your key on their own websites.

---

## 🛠 Pre-Deployment Check

Run this command locally to ensure the "production" version of your app works before you push:

```bash
npm run build && npm run preview
```

If it opens in your browser and works, you are ready to deploy!
