// import react from "@vitejs/plugin-react-swc"; // Neither of these work
import react from "@vitejs/plugin-react"; // Neither of these work
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  define: {
    "process.env": JSON.stringify({}),
  },
  test: {
    passWithNoTests: true,
    setupFiles: ["./vitest.setup.ts"],
    deps: {
      optimizer: {
        web: {
          include: ["@testing-library/react"],
        },
      },
    },
    projects: [
      {
        test: {
          name: "browser",
          include: ["**/*.browser.{test,spec}.(tsx|ts)"],
          browser: {
            enabled: true,
            headless: true,
            isolate: true,
            provider: "playwright",
            instances: [{ browser: "chromium" }, { browser: "firefox" }, { browser: "webkit" }],
            locators: {
              testIdAttribute: "data-testid",
            },
          },
        },
      },
      {
        test: {
          name: "unit",
          include: ["**/*.{test,spec}.ts"],
          environment: "jsdom",
          globals: true,
        },
      },
    ],
  },
});
