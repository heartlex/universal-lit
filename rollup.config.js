/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

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
import minifyHTML from 'rollup-plugin-minify-html-literals';


console.log('ENV: ', process.env.NODE_ENV);
const devMode = (process.env.NODE_ENV === 'dev');

let _plugins = [
  replace({
    preventAssignment: true,
    'process.env.BASE_PATH': devMode?  JSON.stringify('localhost') : JSON.stringify('prod.com')
  }),
  // Resolve bare module specifiers to relative paths
  resolve({browser: true}),
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
      //minify css
      outputStyle: devMode? '' : 'compressed',
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
];

if (!devMode) {
  _plugins.push(
    // Minify HTML template literals
    minifyHTML(),
    // Minify JS
    terser({
      ecma: 2020,
      mangle: {toplevel: true},
      compress: {
        module: true,
        toplevel: true,
        unsafe_arrows: true,
        drop_console: !devMode,
        drop_debugger: !devMode
      },
      output: {quote_style: 1}
    }))
}

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
  plugins: _plugins,
};
