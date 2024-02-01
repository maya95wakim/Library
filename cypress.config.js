const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl:'http://localhost:3000',
    specPattern:'cypress/e2e/*.{js,ts,tsx,jsx}',
  },
  env:{
    apiUrl:'http://localhost:3000'
  },
  retries:2,
  reporter:'cypress-multi-reporters',
  reporterOptions:{
    configFile:'reporter-config.json',
  }
});
