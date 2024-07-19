// vite.config.mts
import { ConfigEnv, Plugin, UserConfig } from 'vite';
import Vue from '@vitejs/plugin-vue'

// import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// It is customized version that allows to handle `autoImport: true` for case when import map is reffered to vuetify as single file esm browser module from CDN. 
import vuetify, { transformAssetUrls } from './vite-plugin-vuetify-browser'

import { ImportMapsPlugin } from './vite-plugin-import-maps';
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'

import { vueBuildInjectedCss } from './vite-plugin-vue-build-injected-css';

// https://vitejs.dev/config/
const config = defineConfig((env: ConfigEnv) => { 

  return {
    base: './',

    plugins: [
      ImportMapsPlugin(),
  
      Vue({
        template: { transformAssetUrls },
      }),

      // string({
      //   include: './_plugin-vue_export-helper-*.js', // inline it
      // }),

      vueBuildInjectedCss(),

      // https://github.com/vuetifyjs/vuetify-loader/tree/master/packages/vite-plugin#readme
      vuetify({
        autoImport: false,
        styles: 'sass',
        injectCSS: true
      }),

      // {
      //   name: 'log-config-plugin',
      //   configResolved(config) {
      //     console.log(chalk.bold.red('Resolved Vite Configuration:\n'), chalk.red(util.inspect(config, { showHidden: false, depth: null, colors: true })));
      //   }
      // } as Plugin
    ],

    define: { 'process.env': {} },

    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
      extensions: [
        '.js',
        '.json',
        '.jsx',
        '.mjs',
        '.ts',
        '.tsx',
        '.vue',
      ],
    },

    server: {
      port: 3000,
    },
    
    build: {
      // minify: false,

      outDir: 'docs',

      rollupOptions: {
        output: {
          // inlineDynamicImports: true
        }
      }
    }
  } as UserConfig;
})


export default config;