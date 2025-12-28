# Vercel Deployment Setup Guide

This guide will walk you through deploying this website to Vercel on the free plan.

## Prerequisites

- A Vercel account (sign up at https://vercel.com - it's free)
- Your GitHub repository connected to your account

## Step-by-Step Deployment

### 1. Sign Up / Log In to Vercel

1. Go to https://vercel.com
2. Click "Sign Up" (or "Log In" if you already have an account)
3. Sign up with your GitHub account (recommended for easy integration)

### 2. Import Your Project

1. After logging in, click "Add New..." → "Project"
2. You'll see a list of your GitHub repositories
3. Find and select `ctsc.github.io` repository
4. Click "Import"

### 3. Configure Project Settings

Vercel should auto-detect your Vite configuration, but verify these settings:

- **Framework Preset:** Vite (should be auto-detected)
- **Root Directory:** `./` (leave as default)
- **Build Command:** `npm run build` (should be auto-detected)
- **Output Directory:** `dist` (should be auto-detected)
- **Install Command:** `npm install` (should be auto-detected)

Click "Deploy" to start the deployment.

### 4. Wait for Deployment

- Vercel will automatically install dependencies and build your project
- The first deployment usually takes 1-2 minutes
- You'll see a success message when it's complete
- Your site will be live at a URL like: `ctsc-github-io.vercel.app`

### 5. Add Your Custom Domain (ctsc.io)

1. In your Vercel project dashboard, go to **Settings** → **Domains**
2. Enter `ctsc.io` in the domain field
3. Click "Add"
4. Vercel will show you DNS records to configure

### 6. Configure DNS Records

You'll need to add DNS records at your domain registrar (where you bought ctsc.io):

**Option A: A Record (Apex Domain)**
- Type: `A`
- Name: `@` (or leave blank, depending on your registrar)
- Value: `76.76.21.21` (Vercel's IP address)

**Option B: CNAME Record (Recommended)**
- Type: `CNAME`
- Name: `@` (or leave blank for apex domain - some registrars support this)
- Value: `cname.vercel-dns.com`

**Option C: CNAME for www Subdomain**
- Type: `CNAME`
- Name: `www`
- Value: `cname.vercel-dns.com`

**Note:** Vercel will show you the exact records needed in the Domains settings page. Follow those instructions.

### 7. Wait for DNS Propagation

- DNS changes can take a few minutes to 48 hours to propagate
- Vercel will automatically detect when DNS is configured correctly
- Once detected, SSL certificate will be automatically provisioned (usually within minutes)

### 8. Verify HTTPS

- After DNS propagates, Vercel automatically enables HTTPS
- Your site will be accessible at `https://ctsc.io`
- The SSL certificate is automatically renewed by Vercel

## Automatic Deployments

Once set up, Vercel will automatically:
- Deploy when you push to the `main` branch
- Create preview deployments for pull requests
- Provide deployment preview URLs for each commit

## Environment Variables (if needed)

If you need to add environment variables:
1. Go to **Settings** → **Environment Variables**
2. Add your variables
3. Redeploy the project

## Vercel Free Plan Limits

- ✅ Unlimited deployments
- ✅ 100 GB bandwidth per month
- ✅ Custom domains
- ✅ Automatic SSL certificates
- ✅ Global CDN
- ✅ 100 serverless function invocations per day

This is more than enough for a personal portfolio website!

## Troubleshooting

### Build Fails
- Check the build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify Node.js version (Vercel uses Node 18.x by default, which should work)

### Domain Not Working
- Verify DNS records are correctly configured
- Wait for DNS propagation (use https://dnschecker.org to check)
- Ensure domain is added in Vercel Domains settings
- Check that SSL certificate is provisioned (can take a few minutes)

### 404 Errors on Routes
- The `vercel.json` file includes SPA rewrites to handle client-side routing
- If you see 404s, verify `vercel.json` is in the root directory

## Support

- Vercel Documentation: https://vercel.com/docs
- Vercel Discord: https://vercel.com/discord
- Check build logs in your Vercel dashboard for specific errors

