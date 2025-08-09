import type { StorybookConfig } from "@storybook/nextjs";
import path from "path";

const config: StorybookConfig = {
  stories: ["../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  webpackFinal: async (config) => {
    if (!config.resolve) {
      config.resolve = {};
    }
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "../"),
    };
    return config;
  },
  staticDirs: ["../public", "../styles"],
};
export default config;
