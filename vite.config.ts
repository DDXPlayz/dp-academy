import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { localResources } from './dev/localResources';
import { devApi } from './dev/devApi';

export default defineConfig({
  // devApi runs the account API under `vite` (dev); localResources serves/copies private data.
  plugins: [react(), tailwindcss(), localResources(), devApi()],
  test: { environment: 'node' },
});
