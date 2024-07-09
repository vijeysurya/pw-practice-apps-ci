import { defineConfig, devices } from '@playwright/test';
import type { TypeOptions } from './test-options';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig<TypeOptions>({
  globalTimeout: 100000,
  timeout:30000,
  expect:
  {
    timeout: 5000
  },
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['json',{outputFile:'test-results/report.json'}],
    ['junit',{outputFile:'test-results/report.xml'}],
    //['allure-playwright']
    ['html']
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL:'http://localhost:4200/',
    globalsqa : 'https://www.globalsqa.com/demo-site/draganddrop/',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    //actionTimeout:14000,
    //navigationTimeout:15000
    video: {
      mode: 'on',
      size: {
        width:1920,
        height:1080
      }
    }//default resolution is 800*800
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'Dev',
      use: { ...devices['Desktop Chrome'],
        baseURL:'http://localhost:4200/' //dev url
       }, //for eg of using baseURl here that is creating new project for dev environment using chromebrowser
    },
    {
      name: 'UAT',
      use: { ...devices['Desktop Firefox'],
        baseURL:'http://localhost:4200/' //UAT url
       }, //for eg of using baseURl here that is creating new project for UAT environment using firefoxbrowser
    },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    {
      name:'mobile',
      testMatch: 'testMobile.spec.ts',
      use: { ...devices['iPhone 14 Plus']}
    }

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  webServer:{
    command:'npm run start',
    url:'http://localhost:4200/',
    timeout: 120000
  }

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
