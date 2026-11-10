import { defineConfig } from 'vite'

// Slidev treats template/ as the deck root; keep its public demo setting in
// the repository-level .env alongside .env.example.
export default defineConfig({
  envDir: '..',
})
