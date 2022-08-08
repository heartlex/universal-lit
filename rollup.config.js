/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

//TODO resolve process.env.NODE_ENV
import summary from 'rollup-plugin-summary';
import { terser } from 'rollup-plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import { copy } from '@web/rollup-plugin-copy';
import typescript from 'rollup-plugin-typescript2';
import scss from "rollup-plugin-scss";
import postcss from "postcss";
import autoprefixer from "autoprefixer";
import * as path from "path";

process.env.NODE_ENV = process.env.NODE_ENV || 'development'
console.log('-->', process.env.NODE_ENV);
const devMode = (process.env.NODE_ENV === 'development');
console.log(`${devMode ? 'development' : 'production'} mode bundle`);

export default {
  input: './src/main.ts',
  output: {
    dir: './dist/js',
    format: 'esm',
    sourcemap: 'inline'
  },
  onwarn(warning) {
    if (warning.code !== 'THIS_IS_UNDEFINED') {
      console.error(`(!) ${warning.message}`);
    }
  },
  plugins: [
    replace({'Reflect.decorate': 'undefined'}),
    // Resolve bare module specifiers to relative paths
    resolve({browser: true}),
    // Minify JS
    // terser({
    //   ecma: 2020,
    //   mangle: {toplevel: true},
    //   compress: {
    //     module: true,
    //     toplevel: true,
    //     unsafe_arrows: true,
    //     // drop_console: !devMode,
    //     // drop_debugger: !devMode
    //   },
    //   output: {quote_style: 1}
    // }),
    typescript({
      useTsconfigDeclarationDir: true,
      tsconfigOverride: {
        //base component is useful only to create new components, not in the bundle
        exclude: ['src/components/base-component.ts/'],
      },
    },
      scss({
        processor: () => postcss([autoprefixer()]),
        includePaths: [
          path.resolve('node_modules')
        ],
        //minify
        outputStyle: 'compressed',
        sourceMap: true,
        extract: true,
        extensions: ['.sass','.css'],
        // Prefix global scss. Useful for variables and mixins.
        prefix: `@import "./public/theme/public.scss";`,
        output: "./dist/css/style.css",
        failOnError: true,
      })),
    // Print bundle summary
    summary(),
    // Optional: copy any static assets to build directory
    copy({
      //patterns: ['images/**/*'],
    }),
  ],
};
