const md = require("markdown-it")({ html: false, linkify: true, typographer: true });
const Image = require("@11ty/eleventy-img");
const path = require("path");

module.exports = function (eleventyConfig) {
  // Pass static assets through unchanged
  eleventyConfig.addPassthroughCopy({ "content/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "content/assets/images/favicon.ico": "favicon.ico" });
  eleventyConfig.addPassthroughCopy({ "content/assets/images/favicon.png": "favicon.png" });
  eleventyConfig.addPassthroughCopy({ "content/assets/images/apple-touch-icon.png": "apple-touch-icon.png" });

  // Markdown filter for bio / description fields stored as Markdown in YAML
  eleventyConfig.addFilter("markdownify", function (content) {
    if (!content) return "";
    return md.render(String(content));
  });

  // Image optimization shortcode: {% image src, alt, displayWidth, cssClass %}
  eleventyConfig.addNunjucksAsyncShortcode("image", async function (src, alt, displayWidth, cssClass) {
    if (!src) return "";

    const inputPath = (src.startsWith("http://") || src.startsWith("https://"))
      ? src
      : path.join("content", src);

    const genWidth = (displayWidth || 64) * 2;
    const isPng = src.toLowerCase().endsWith(".png");

    const metadata = await Image(inputPath, {
      widths: [genWidth],
      formats: ["webp", isPng ? "png" : "jpeg"],
      outputDir: "dist/img/",
      urlPath: "/img/",
      filenameFormat: function (id, src, width, format) {
        return `${path.basename(src, path.extname(src))}-${width}w.${format}`;
      },
      cacheOptions: { duration: "1d", directory: ".cache" },
    });

    const webp = metadata.webp[0];
    const fallback = (isPng ? metadata.png : metadata.jpeg)[0];
    const cls = cssClass ? ` class="${cssClass}"` : "";

    return `<picture>` +
      `<source type="image/webp" srcset="${webp.url}">` +
      `<img src="${fallback.url}" alt="${(alt || "").replace(/"/g, "&quot;")}"${cls}` +
      ` width="${displayWidth}" height="${displayWidth}"` +
      ` loading="lazy" decoding="async">` +
      `</picture>`;
  });

  return {
    templateFormats: ["njk"],
    markdownTemplateEngine: false,
    htmlTemplateEngine: "njk",
    dir: {
      input: "templates",
      output: "dist",
      includes: "_partials",
      layouts: "_layouts",
      data: "../_data",
    },
  };
};
