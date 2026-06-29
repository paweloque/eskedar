module.exports = {
  eleventyComputed: {
    permalink: (data) => {
      if (data.pageKey && data.pages && data.pages[data.pageKey] && data.pages[data.pageKey].hidden) {
        return false;
      }
      return data.permalink;
    },
  },
};
