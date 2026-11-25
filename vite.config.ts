import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { localResources } from './dev/localResources';
import { devApi } from './dev/devApi';

export default defineConfig({
  // devApi runs the account API under `vite` (dev); localResources serves/copies private data.
  plugins: [react(), tailwindcss(), localResources(), devApi()],
  // resources/ holds tens of thousands of private files (served by localResources, not bundled): don't watch them.
  server: { watch: { ignored: ['**/resources/**', '**/.data/**', '**/dist/**'] } },
  test: { environment: 'node' },
});
