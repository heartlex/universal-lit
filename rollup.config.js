/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

 import summary from 'rollup-plugin-summary';
 import {terser} from 'rollup-plugin-terser';
 import resolve from '@rollup/plugin-node-resolve';
 import replace from '@rollup/plugin-replace';
 import typescript from 'rollup-plugin-typescript2';

 
 const devMode = (process.env.NODE_ENV === 'development');
 console.log(`${ devMode ? 'development' : 'production' } mode bundle`);
 
 export default {
   input: './src/main.ts',
   output: {
     dir: './build',
     format: 'esm',
     sourcemap: false
   },
   onwarn(warning) {
     if (warning.code !== 'THIS_IS_UNDEFINED') {
       console.error(`(!) ${warning.message}`);
     }
   },
   plugins: [
     replace({'Reflect.decorate': 'undefined'}),
     resolve(),
     terser({
       ecma: 2020,
       mangle: { toplevel: true },
       compress: {
         module: true,
         toplevel: true,
         unsafe_arrows: true,
         drop_console: !devMode,
         drop_debugger: !devMode
       },
       output: { quote_style: 1 }
     }),
     typescript({
      useTsconfigDeclarationDir: true,
      tsconfigOverride: {
        exclude: [''],
      },
    }),
     summary(),
   ],
 };
 