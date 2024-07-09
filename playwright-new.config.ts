import { defineConfig, devices } from '@playwright/test';
import type { TypeOptions } from './test-options';

require('dotenv').config();


export default defineConfig<TypeOptions>({
  timeout:30000,
  retries:1,
  use: {
    /*baseURL:process.env.DEV == '1' ? 'http://localhost:4202/'
          :process.env.UAT =='1' ? 'http://localhost:4201/'
          :'http://localhost:4200/',*/
    baseURL: "http://localhost:4200/",    
    globalsqa : 'https://www.globalsqa.com/demo-site/draganddrop/',
    trace: 'on-first-retry',
    video: {
      mode: 'off',
      size: {
        width:1920,
        height:1080
      }
    }
  },

  projects: [
    {
      name: 'Dev',
      use: { ...devices['Desktop Chrome'],
        baseURL:'http://localhost:4201/'
       }
    },
    {
      name: 'chromium' //for this i dont want use: and specify chrome because by default playwright will execute test via chrome only
    },

    {
      name: 'firefox',
      use: { browserName: 'firefox', //this will also work
        video: {
            mode: 'on',
            size: {
              width:1920,
              height:1080
            }
       }
    }
    },

    {
        name: 'pageObject',
        testMatch: 'usePageObject.spec.js',
        use:{
            browserName: 'firefox',
            viewport:{
                width:1920,
                height:1080
              },
            video:{
                mode:'on',
                size:{
                    width:1920,
                    height:1080
                }
            }
        }
    }
  ]
});
