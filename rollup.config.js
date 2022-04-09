import path from 'path'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import pluginVue from 'rollup-plugin-vue'
import ts2 from 'rollup-plugin-typescript2'
import postcss from 'rollup-plugin-postcss'
import { terser } from 'rollup-plugin-terser'
import { uglify } from 'rollup-plugin-uglify'
import clear from 'rollup-plugin-clear'

module.exports = {
  input: path.resolve(__dirname, './package/index.ts'),
  output: [
    {
      file: path.resolve(__dirname, './lib/vue3-seamless-scroll.js'),
      format: 'umd',
      name: 'SeamlessScroll',
      globals: {
        vue: 'Vue',
      },
    },
    {
      file: path.resolve(__dirname, './lib/vue3-seamless-scroll.min.js'),
      format: 'umd',
      name: 'SeamlessScroll',
      globals: {
        vue: 'Vue',
      },
      plugins: [
        uglify(),
        terser(),
      ],
    },
    {
      file: path.resolve(__dirname, './lib/vue3-seamless-scroll.es.js'),
      format: 'es',
      globals: {
        vue: 'Vue',
      },
    },
  ],
  plugins: [
    resolve(),
    ts2({
      tsconfig: path.resolve(__dirname, './tsconfig.build.json'),
    }),
    pluginVue(),
    commonjs(),
    postcss(),
    clear({
      targets: ['./lib'],
      watch: true,
    }),
  ],
  external: [
    'vue',
  ],
}
