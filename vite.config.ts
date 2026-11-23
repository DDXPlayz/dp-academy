import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { localResources } from './dev/localResources';

export default defineConfig({
  // localResources only runs under `vite` (dev); it is skipped by `vite build`.
  plugins: [react(), tailwindcss(), localResources()],
  test: { environment: 'node' },
});
