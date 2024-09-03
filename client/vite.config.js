import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// Define and export the Vite configuration
export default defineConfig({
  // List of plugins to use
  plugins: [react()],

  // Server configuration
  server: {
    // Port number to run the development server on
    port: 3000,
    
    // Automatically open the browser when the server starts
    open: true,

    // Proxy configuration to handle API requests
    proxy: {
      '/graphql': {
        // Target server for the proxy
        target: 'http://localhost:3001',

        // Change the origin of the request to the target server
        changeOrigin: true,

        // Disable SSL verification for the proxy
        secure: false,
      },
    },
  },
})
