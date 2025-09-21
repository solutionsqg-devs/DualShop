import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl:"https://ovejero92.github.io/Metsys",
    //baseUrl: "http://localhost:5173",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});