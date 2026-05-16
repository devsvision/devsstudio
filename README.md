# DEVS Studio

Premium static website for **DEVS Studio**: Integrated Technology & Business Solutions.

## Stack

- Native HTML
- Tailwind CSS Play CDN
- Vanilla JavaScript modules
- CSS animations
- Dynamic `fetch()` component loading
- No framework, npm, build tools, backend, database, or server runtime

## Production Notes

This project is optimized for simple static hosting, including Hostinger shared hosting. Upload the full folder contents into `public_html` and open the domain. Keep the folder structure intact because `index.html` loads partials from `components/` and `pages/`.

Recommended before launch:

- Replace `https://devsstudio.com/` in `index.html` with the final live domain if different.
- Add the real Open Graph image at `assets/images/og-image.png`.
- Keep `.htaccess` when deploying to Apache/Hostinger for caching and basic security headers.

## Folder Structure

```text
index.html
.htaccess
assets/
components/
css/
js/
pages/
start-preview.bat
```

## Local Preview

Do not open `index.html` directly with `file://`; browser security blocks `fetch()` partials.

```bash
python -m http.server 3002 --bind 127.0.0.1
```

Open:

```text
http://127.0.0.1:3002
```

On Windows, double-click `start-preview.bat`.

## Deployment On Hostinger

1. Open Hostinger File Manager.
2. Go to `public_html`.
3. Upload all files and folders from this project.
4. Confirm `index.html`, `.htaccess`, `components/`, `css/`, `js/`, and `pages/` are directly inside `public_html`.
5. Visit the domain and hard refresh once.

No install command, build command, or Node.js app setup is needed.
