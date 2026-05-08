import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: false,
  retries: 0,
  workers: undefined,
  reporter: 'html',
  use: {
    baseURL: 'https://demo6.cybersoft.edu.vn',
    trace: 'on-first-retry',
    launchOptions: {
      slowMo: 1500, // Nghỉ 1.5 giây giữa mỗi thao tác để mắt người kịp nhìn
    }
  },
  projects: [
    {
      name: 'Microsoft Edge',
      use: { ...devices['Desktop Edge'], channel: 'msedge' },
    },
  ],
});
