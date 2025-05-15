import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import flowbiteReact from "flowbite-react/plugin/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), flowbiteReact()],
})