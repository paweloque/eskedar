# Image Processing Pipeline

## Purpose

Build-time image optimization using `@11ty/eleventy-img`. Resizes oversized photos to match display dimensions, converts to WebP with JPEG/PNG fallback, and outputs `<picture>` elements.

## Architecture

```
content/assets/images/speakers/*.jpg  →  sharp (via eleventy-img)  →  dist/img/*-128w.webp
                                                                      dist/img/*-128w.jpeg
```

Source images stay unchanged. Processed images go to `dist/img/` with deterministic filenames: `{name}-{width}w.{format}`.

## Shortcode

```nunjucks
{% image src, alt, displayWidth, cssClass %}
```

| Param          | Type   | Description                                                                  |
| -------------- | ------ | ---------------------------------------------------------------------------- |
| `src`          | string | Image path from YAML (e.g. `assets/images/speakers/foo.jpg`) or external URL |
| `alt`          | string | Alt text                                                                     |
| `displayWidth` | number | Display size in px — generates at 2× for retina                              |
| `cssClass`     | string | CSS class for the inner `<img>`                                              |

Behavior:

- Local paths: prepends `content/` to resolve source file
- Remote URLs: fetches and caches (`.cache/`, 1-day TTL)
- Fallback format: PNG sources → WebP + PNG (transparency). Others → WebP + JPEG.
- Output: `<picture>` with `<source type="image/webp">` and `<img>` fallback
- Attributes: `loading="lazy"`, `decoding="async"`, `width`/`height` set to `displayWidth`

## Display sizes

| Context           | Display     | Generated                           | Template                |
| ----------------- | ----------- | ----------------------------------- | ----------------------- |
| Speaker avatars   | 64×64       | 128px                               | `speakers.njk`          |
| Previous speakers | 200×200     | 400px                               | `index.njk`             |
| Sponsor logos     | 64px height | 128px                               | `sponsors.njk`          |
| PMF logo          | 40×40       | not processed (12 KB, not worth it) | `nav.njk`, `footer.njk` |

## Dependencies

- `@11ty/eleventy-img` v4.x (compatible with Eleventy 2.x)
- Brings `sharp` (image processing) and `@11ty/eleventy-fetch` (remote URL caching)

## CSS requirements

```css
picture {
  display: block;
}
.sponsor-logo {
  width: auto;
  height: 64px;
  object-fit: contain;
}
```
