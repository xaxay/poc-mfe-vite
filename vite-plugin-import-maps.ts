// vite-plugin-import-maps.ts
import { existsSync, readFileSync } from 'fs';
import { ConfigEnv, Plugin } from 'vite';
import { fileURLToPath, URL } from 'node:url';
import externalize from 'vite-plugin-externalize-dependencies';
import { resolve, basename } from 'path';
import chalk from 'chalk';
import { NormalizedOutputOptions, OutputBundle, PreRenderedAsset, PreRenderedChunk } from 'rollup';

export interface ImportMapsConfig {
  importMaps: {
    type?: string;
    modules?: string;
    dev?: string[];
    build?: string[];
  };
}

export interface ImportMap {
  imports: { [key: string]: string };
  scopes?: { [key: string]: { [key: string]: string } };
}

function loadImportMapFiles(devMode: boolean, config: ImportMapsConfig): ImportMap[] {

  const devImportMapFiles = config.importMaps.dev;
  const buildImportMapFiles = config.importMaps.build;
  const importMapFiles: string[] = devMode 
    ? [...devImportMapFiles]
    : [...buildImportMapFiles];

  const modulesImportMapFile = config.importMaps.modules;
  if (modulesImportMapFile) {
    importMapFiles.push(modulesImportMapFile);
  }

  console.log('[vite-plugin-import-maps] import-map=files=', importMapFiles, 'devMode=', devMode);

  const importMaps: ImportMap[] = [];
  for (const filename of importMapFiles) {
    if (existsSync(filename)) {
      const importMap: ImportMap = JSON.parse(readFileSync(filename, { encoding: 'utf8' }));
      importMaps.push(importMap);
    } else {
      console.error('[vite-plugin-import-maps] Import map not found:', filename);
    }
  }
  return importMaps;
}

function joinImportMaps(maps: ImportMap[]): ImportMap {
  const importMap: ImportMap = { imports: {}, scopes: {} };

  for (const map of maps) {
    for (const key of Object.keys(map.imports)) {
      importMap.imports[key] = map.imports[key];
    }
    if (map.scopes) {
      for (const key of Object.keys(map.scopes)) {
        importMap.scopes[key] = {
          ...importMap.scopes[key],
          ...map.scopes[key],
        };
      }
    }
  }
  return importMap;
}

const printedModules = new Set<string>();

export function ImportMapsPlugin(config: ImportMapsConfig = {
  importMaps: {
    modules: 'src/importMap.modules.json',
    dev: ['src/importMap.dev.json'],
    build: ['src/importMap.build.json'],
    type: 'importmap',
  },
}): Plugin {
  console.log('[vite-plugin-import-maps] ImportMapsPlugin.init ...');

  let devMode = true;

  let importMap: ImportMap = {
    imports: {},
    scopes: {}
  };

  let externalDependencies: string[] = [];

  let inputs: { [name: string]: string } = {};
  let inputKeysSet: Set<string> = new Set();


  function updateImportMaps() {
    const importMaps: ImportMap[] = loadImportMapFiles(devMode, config);

    importMap = joinImportMaps(importMaps);

    externalDependencies = Object.keys(importMap.imports);

    inputs = {
      index: resolve(__dirname, 'index.html')
    };

    Object.entries(importMap.imports).forEach(([k, v]) => {
      if (v.startsWith('http://') || v.startsWith('https://')) {
        return;
      }
      inputs[k] = resolve(__dirname, v);
    });

    const inputKeysArray = Object.keys(inputs);
    inputKeysSet = new Set(inputKeysArray);
  }

  function isExternal(moduleName: string): boolean {
    const isExternalModule = externalDependencies.some(dep =>
      moduleName === dep ||
      moduleName.startsWith(dep + '/') ||
      moduleName.startsWith('http://') ||
      moduleName.startsWith('https://')
    );

    const aliasPath = moduleName
      .replace(fileURLToPath(new URL('./', import.meta.url)), '/')
      .replace('@/', '/src/');

    if (!printedModules.has(aliasPath)) {
      printedModules.add(aliasPath);
      console.log(chalk.bold.blueBright(`[${isExternalModule ? 'external' : 'internal'}]`), chalk.magentaBright(aliasPath));
    }

    return isExternalModule;
  }

  return {
    name: 'vite-plugin-import-map',

    config(config: any, env: ConfigEnv) {
      devMode = env.command === 'serve';

      updateImportMaps();

      // console.log('[vite-plugin-import-maps] ImportMapsPlugin.config ...', importMap);

      if (externalDependencies.length > 0) {
        return {
          resolve: {
            alias: importMap.imports,
          },

          plugins: [
            externalize({
              externals: [isExternal],
            }),
          ],

          build: {
            target: 'esnext',

            // assetsInlineLimit: 0,

            rollupOptions: {
              external: isExternal,
              preserveEntrySignatures: 'strict',

              input: inputs,

              output: {

                entryFileNames: (chunkInfo: {
                  exports: string[];
                  facadeModuleId: string | null;
                  isDynamicEntry: boolean;
                  isEntry: boolean;
                  isImplicitEntry: boolean;
                  moduleIds: string[];
                  name: string;
                  type: 'chunk';
                }) => {
                  const chunkName: string = chunkInfo.name;
                  console.log(chalk.blue.bold('[entry]'), chalk.magenta(chunkName), chalk.cyanBright(chunkInfo.facadeModuleId));//, chunkInfo);
                  if (inputKeysSet.has(chunkName)) {
                    return `assets/${basename(chunkName)}-[hash].js`;
                  }
                  return 'assets/[name]-[hash].[ext]';
                },

                chunkFileNames(chunkInfo: PreRenderedChunk): string {
                  const chunkName: string = chunkInfo.name;
                  console.log(chalk.blue.bold('[chunkFileNames]'), chalk.magenta(chunkName), chunkInfo.facadeModuleId);//, chunkInfo);
                  if (chunkName.includes('_')) {
                    let updatedChunkName = chunkName;
                    // if (updatedChunkName.startsWith('_')) {
                    //   updatedChunkName = chunkName.substring(1);
                    // }
                    updatedChunkName = updatedChunkName.replaceAll('_', '--');
                    return `assets/${updatedChunkName}-[hash].js`;
                  }
                  return 'assets/[name]-[hash].js';
                },

                assetFileNames: (chunkInfo: PreRenderedAsset) : string => {
                  console.log(chalk.blue.bold('[assetFileNames]'), chalk.magenta(chunkInfo.name));//, chalk.cyanBright(chunkInfo.source), chunkInfo);
                  return 'assets/[name]-[hash].[ext]';
                },
              },
            },
          },
        };
      }

      return {};
    },

    transformIndexHtml: {
      order: 'post' as const,
      async handler(html: string, ctx: { path: string; filename: string }) {
        console.log('transformIndexHtml', 'filename:', ctx.filename, 'path:', ctx.path);
        if (externalDependencies.length > 0) {
          const importMapAsString = `<script type="${config.importMaps?.type ?? 'importmap'}">\n${JSON.stringify(importMap, null, 2)}\n</script>`;
          return html.replace('</head>', `${importMapAsString}\n  </head>`);
        }
        return html;
      },
    },

    generateBundle(options: NormalizedOutputOptions, bundle: OutputBundle, isWrite: boolean) {
      Object.entries(bundle).forEach(([fileName, file]) => {
        const name: string = file.name;
        if (inputKeysSet.has(name) && importMap.imports[name]) {
          console.log(chalk.blue.bold('[map-import]'), chalk.magenta(name), chalk.greenBright(fileName), chalk.cyanBright(importMap.imports[name]));
          importMap.imports[name] = `./${fileName}`;
        } 
      });

    },

  };
}
