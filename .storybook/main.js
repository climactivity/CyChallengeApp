module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx|svelte)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-svelte-csf",
    "@storybook/addon-postcss"
  ],
  "framework": "@storybook/svelte",
  "svelteOptions": {
    "preprocess": import('../svelte.config.js').then((module) => { return module.preprocess; })
  },
  "core": {
    "builder": "@storybook/builder-vite"
  }
}