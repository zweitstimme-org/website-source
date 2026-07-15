# Zweitstimme.org - Private Site

This is a private website for invited users only. The site is configured to prevent search engine indexing and is only accessible to users with explicit access.

## Access Control

- **Repository**: Private - only invited collaborators can access
- **Search Engines**: Blocked via robots.txt and meta tags
- **GitHub Pages**: Deployed from private repository

## Deployment

The site is automatically deployed to GitHub Pages when changes are pushed to the main branch.

## Security Features

- `robots.txt` - Prevents search engine crawling
- Meta tags - `noindex, nofollow` on all pages
- Security headers - Additional protection against indexing
- Private repository - Access control at repository level

## Local Development

```bash
cd website-mock
hugo server
```

## Building for Production

```bash
cd website-mock
hugo --minify
```

The built site will be in the `public/` directory.


