/**
 * @type { import("protractor").Config }
 */
exports.config = {
  allScriptsTimeout: 20000,
  useAllAngular2AppRoots: true,
  specs: [
      'src/features/*.feature'
  ],
  capabilities: {
      browserName: 'chrome',
      chromeOptions: {
          args: ['--disable-web-security', '--disable-gpu', '--incognito', '--no-sandbox'],
          perfLoggingPrefs: {
              'enableNetwork': true,
              'enablePage': false
          }
      },
      loggingPrefs: {
          performance: 'ALL',
          browser: 'ALL'
      }
  },
  directConnect: true,
  baseUrl: 'http://localhost:4200/login',
  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  cucumberOpts: {
      require: [
          'src/steps/*.step.ts'
      ],
      format: "json:cucumber-report/results.json",
      strict: true,
      'fail-fast': true
  },
  SELENIUM_PROMISE_MANAGER: false,
   onPrepare: async () => {
     browser.driver.get(browser.baseUrl);
      require('ts-node').register({
          project: require('path').join(__dirname, './tsconfig.json')
      });

  },
   plugins: [
    {
      package: "protractor-simple-cucumber-html-reporter-plugin",
      options: {
        automaticallyGenerateReport: true,
        removeExistingJsonReportFile: true
      }
    }
  ]
};
