import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/server.ts'],
  splitting: false,
  sourcemap: true,
  clean: true,
  bundle: true,
  minify: true,
  platform: 'node',
  format: ['esm'],
  tsconfig: 'tsconfig.json',
  keepNames: true,
  shims: true,
})
