module.exports = {
  // Specifies that this is the root configuration file, stopping ESLint from looking in parent directories
  root: true,

  // Specifies the environment in which the code is expected to run
  env: {
    browser: true, // Code is intended to run in the browser
    es2020: true,  // Code is written using ECMAScript 2020 features
  },

  // Extends base configurations from ESLint and various plugins
  extends: [
    'eslint:recommended', // Use recommended rules from ESLint
    'plugin:react/recommended', // Use recommended rules from the React plugin
    'plugin:react/jsx-runtime', // Enable new JSX runtime in React 17+
    'plugin:react-hooks/recommended', // Use recommended rules for React Hooks
  ],

  // Files or directories to ignore
  ignorePatterns: [
    'dist', // Ignore the build output directory
    '.eslintrc.cjs', // Ignore this configuration file
  ],

  // Parser options specifying ECMAScript version and module type
  parserOptions: {
    ecmaVersion: 'latest', // Use the latest ECMAScript version
    sourceType: 'module',  // Allow the use of ES modules
  },

  // Settings for the React plugin
  settings: {
    react: {
      version: '18.2', // Specifies the version of React being used
    },
  },

  // Plugins used in this configuration
  plugins: ['react-refresh'], // Includes the React Refresh plugin for fast refresh

  // Custom rules and rule configurations
  rules: {
    'react/jsx-no-target-blank': 'off', // Disable the rule that prevents the use of `target="_blank"` without `rel="noopener noreferrer"`
    'react-refresh/only-export-components': [
      'warn', // Warn when non-component modules are exported
      { allowConstantExport: true }, // Allow exporting constants without warning
    ],
  },
}
