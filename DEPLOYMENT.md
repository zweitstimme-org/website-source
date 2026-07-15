# Private GitHub Pages Deployment Guide

This guide will help you deploy your site to GitHub Pages with restricted access and search engine protection.

## Prerequisites

1. **Private Repository**: Ensure your GitHub repository is set to private
2. **GitHub Actions**: Enable GitHub Actions in your repository settings

## Step 1: Repository Settings

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**
4. This will use the workflow file we created (`.github/workflows/deploy.yml`)

## Step 2: Repository Access Control

1. Go to **Settings** → **Collaborators and teams**
2. Click **Add people** to invite specific users
3. Give them **Read** access to the repository
4. Only invited users will be able to access the GitHub Pages site

## Step 3: Deploy the Site

1. Commit and push your changes to the `main` branch:
   ```bash
   git add .
   git commit -m "Add private GitHub Pages configuration"
   git push origin main
   ```

2. The GitHub Action will automatically:
   - Build the Hugo site
   - Deploy it to the `gh-pages` branch
   - Make it available at `https://[username].github.io/[repository-name]`

## Step 4: Verify Security Features

After deployment, verify that:

1. **robots.txt** is accessible at `https://[username].github.io/[repository-name]/robots.txt`
2. **Meta tags** are present in the HTML head (check page source)
3. **Security headers** are applied (check browser developer tools)

## Access Control Summary

✅ **Repository Level**: Private repository - only invited users can access  
✅ **Search Engines**: Blocked via robots.txt and meta tags  
✅ **GitHub Pages**: Deployed from private repository  
✅ **Security Headers**: Additional protection against indexing  

## Testing

1. **Search Engine Test**: Try searching for your site on Google - it should not appear
2. **Access Test**: Only invited users should be able to access the site
3. **Robots Test**: Visit `/robots.txt` to verify it's blocking all crawlers

## Troubleshooting

- **Site not accessible**: Check that the repository is private and users are invited
- **Still appearing in search**: It may take time for search engines to respect the noindex tags
- **Build errors**: Check the GitHub Actions tab for any deployment issues

## Security Notes

- The site is now protected at multiple levels
- Search engines should not index the content
- Only invited users can access the repository and site
- Security headers provide additional protection


