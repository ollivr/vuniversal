import { VunLibConfig } from './interface'
import { VUN_DEFAULT_HTML_TEMPLATE } from '@cli/paths'
import { NodeEnv, isProd, isDev } from '@cli/environment'
import { appPackageJSON } from '@cli/configs/package'

const dependencies = Object.keys(appPackageJSON.dependencies)
const devDependencies = Object.keys(appPackageJSON.devDependencies)
const allDependencies = [...dependencies, ...devDependencies]

export const defaultConfig: VunLibConfig = {
  universal: true,
  modern: true,
  clientEntry: 'src/client',
  serverEntry: 'src/server',
  template: VUN_DEFAULT_HTML_TEMPLATE,
  prerender: false,
  inspect: false,
  get lintOnSave() {
    return isDev(process.env.NODE_ENV as NodeEnv) && allDependencies.includes('eslint')
      ? 'default'
      : false
  },
  env: {},
  dir: {
    build: 'dist',
    public: 'public',
    source: 'src',
    root: '.',
    modules: []
  },
  dev: {
    host: 'localhost',
    port: 3000,
    verbose: false,
    proxy: {},
    devServer: {},
  },
  build: {
    publicPath: '/',
    assetsDir: 'vun',
    analyze: false,
    runtimeCompiler: false,
    productionSourceMap: true,
    transpileDependencies: [],
    get filenameHashing() {
      return isProd(process.env.NODE_ENV as NodeEnv)
    },
    get parallel() {
      try {
        return require('os').cpus().length > 1
      } catch (error) {
        return false
      }
    },
    html: {
      crossorigin: false,
      preload: false,
      ext: {}
    },
    css: {
      get extract() {
        return isProd(process.env.NODE_ENV as NodeEnv)
      },
      requireModuleExtension: true,
      sourceMap: false,
      styleResources: {
        scss: [],
        sass: [],
        less: [],
        stylus: []
      }
    },
    loaders: {} as any,
    optimization: {}
  },
  babel: {},
  webpack: {},
  typescript: !allDependencies.includes('typescript')
    ? false
    : {
      tsLoader: {},
      forkTsChecker: true
    }
}
