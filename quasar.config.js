/* eslint-env node */

/*
 * This file runs in a Node context (it's NOT transpiled by Babel), so use only
 * the ES6 features that are supported by your Node version. https://node.green/
 */

// Configuration for your app
// https://v2.quasar.dev/quasar-cli-vite/quasar-config-js

/* eslint func-names: 0 */
/* eslint global-require: 0 */

const { configure } = require('quasar/wrappers');


module.exports = configure(function (ctx) {
  return {
    // eslint: {
    //   // fix: true,
    //   // include: [],
    //   // exclude: [],
    //   // rawOptions: {},
    //   warnings: true,
    //   errors: false
    // },

    // https://v2.quasar.dev/quasar-cli-vite/prefetch-feature
    // preFetch: true,

    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    // https://v2.quasar.dev/quasar-cli-vite/boot-files
    boot: [
      'axios',
    ],

    // https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#css
    css: [
      'app.scss'
    ],

    // https://github.com/quasarframework/quasar/tree/dev/extras
    extras: [
      // 'ionicons-v4',
      // 'mdi-v5',
      'fontawesome-v6',
      // 'eva-icons',
      // 'themify',
      // 'line-awesome',
      // 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!

      // 'roboto-font', // optional, you are not bound to it
      'material-icons', // optional, you are not bound to it
    ],

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#build
    build: {
      target: {
        browser: [ 'es2020', 'edge88', 'firefox78', 'chrome87', 'safari13.1' ],
        node: 'node18'
      },

      vueRouterMode: 'history', // available values: 'hash', 'history'
      // vueRouterBase,
      // vueDevtools,
      // vueOptionsAPI: false,

      // rebuildCache: true, // rebuilds Vite/linter/etc cache on startup

      // publicPath: '/',
      // analyze: true,
      env: {
        DEFAULT_IPFS_GATEWAY: ctx.dev ? 'http://localhost:8080/api/v0' : 'https://stateborn.org/api/v0',
        IS_LOCALHOST: ctx.dev,
        DEVELOPMENT_NETWORK_CHAIN_ID: '1337',
        DEVELOPMENT_NETWORK_CHAIN_ID_HEX: '0x539',
        DEVELOPMENT_NETWORK_NAME: 'Ganache local NEW',
        DEVELOPMENT_NETWORK_ICON_NAME: '/hardhat.png',
        DEVELOPMENT_NETWORK_ERC_20_TOKEN_ADDRESS: '0x3a7b679BA0F23F2B27B48608908f9248ea0a72f0',
        DEVELOPMENT_NETWORK_ERC_20_DAO_FACTORY_ADDRESS: '0x1703D6576BF0FbCdc0e8034f04bd08197eBD6334',
        DEVELOPMENT_NETWORK_NFT_DAO_FACTORY_ADDRESS: '0xbAcd5c23bcFb01Dee7aF9FC453cBCB575D752713',
        POLYGON_ERC_20_DAO_FACTORY_ADDRESS: '0xBC4Be7cA45e84E5a30abF72Af4D40d5d5611F666',
        POLYGON_NFT_DAO_FACTORY_ADDRESS: '0x93C2366436c80cb43548000D24263402673ba74A',
        MINIMUM_WEI_TO_SEND_IN_TRANSFER: '100000000',
      },
      // rawDefine: {}
      // ignorePublicFolder: true,
      // minify: false,
      // polyfillModulePreload: true,
      // distDir

      // extendViteConf (viteConf) {
      //   viteConf.build = {
      //     target: 'es2020',
      //   }
      //   return viteConf;
      // },
      // viteVuePluginOptions: {},


      // vitePlugins: [
      //   [ 'package-name', { ..options.. } ]
      // ]
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#devServer
    devServer: {
      // https: true
      open: true, // opens browser window automatically
      port: 8080,
      proxy: {
        // proxy all requests starting with /api to jsonplaceholder
        '/api': {
          // target: 'http://bittery-backend:3001',
          target: 'http://localhost:8000',
          changeOrigin: true,
          pathRewrite: {
            '^/api': '',
          },
        },
      },
    },

    // https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#framework
    framework: {
      config: {},

      // iconSet: 'material-icons', // Quasar icon set
      // lang: 'en-US', // Quasar language pack

      // For special cases outside of where the auto-import strategy can have an impact
      // (like functional components as one of the examples),
      // you can manually specify Quasar components/directives to be available everywhere:
      //
      components: ['QVideo'],
      // directives: [],

      // Quasar plugins
      plugins: [
        'Notify',
        'Loading',
        'Meta',
      ]
    },

    // animations: 'all', // --- includes all animations
    // https://v2.quasar.dev/options/animations
    animations: 'all',

    // https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#sourcefiles
    // sourceFiles: {
    //   rootComponent: 'src/App.vue',
    //   router: 'src/router/index',
    //   store: 'src/store/index',
    //   registerServiceWorker: 'src-pwa/register-service-worker',
    //   serviceWorker: 'src-pwa/custom-service-worker',
    //   pwaManifestFile: 'src-pwa/manifest.json',
    //   electronMain: 'src-electron/electron-main',
    //   electronPreload: 'src-electron/electron-preload'
    // },

    // https://v2.quasar.dev/quasar-cli-vite/developing-ssr/configuring-ssr
    ssr: {
      // ssrPwaHtmlFilename: 'offline.html', // do NOT use index.html as name!
                                          // will mess up SSR

      // extendSSRWebserverConf (esbuildConf) {},
      // extendPackageJson (json) {},

      pwa: false,

      // manualStoreHydration: true,
      // manualPostHydrationTrigger: true,

      prodPort: 3000, // The default port that the production server should use
                      // (gets superseded if process.env.PORT is specified at runtime)

      middlewares: [
        'render' // keep this as last one
      ]
    },

    // https://v2.quasar.dev/quasar-cli-vite/developing-pwa/configuring-pwa
    pwa: {
      workboxMode: 'generateSW', // or 'injectManifest'
      injectPwaMetaTags: true,
      swFilename: 'sw.js',
      manifestFilename: 'manifest.json',
      useCredentialsForManifestTag: false,
      // useFilenameHashes: true,
      // extendGenerateSWOptions (cfg) {}
      // extendInjectManifestOptions (cfg) {},
      // extendManifestJson (json) {}
      // extendPWACustomSWConf (esbuildConf) {}
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/developing-cordova-apps/configuring-cordova
    cordova: {
      // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/developing-capacitor-apps/configuring-capacitor
    capacitor: {
      hideSplashscreen: true
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/developing-electron-apps/configuring-electron
    electron: {
      // extendElectronMainConf (esbuildConf)
      // extendElectronPreloadConf (esbuildConf)

      inspectPort: 5858,

      bundler: 'packager', // 'packager' or 'builder'

      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',

        // Windows only
        // win32metadata: { ... }
      },

      builder: {
        // https://www.electron.build/configuration/configuration

        appId: 'stateborn-client'
      }
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/developing-browser-extensions/configuring-bex
    bex: {
      contentScripts: [
        'my-content-script'
      ],

      // extendBexScriptsConf (esbuildConf) {}
      // extendBexManifestJson (json) {}
    }
  }
});
