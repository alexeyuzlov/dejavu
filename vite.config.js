const { defineConfig } = require('vite');

module.exports = defineConfig({
  define: {
    'import.meta.env.VITE_BUILD_DATE': JSON.stringify(new Date().toISOString()),
  },
});
