import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss'

export default {
  input: 'src/index.tsx',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: true,
    },
  ], 
  external: ['react', 'react-dom', '@nextui-org/react'],
  plugins: [
    resolve(),
    commonjs(),
    typescript(),
    postcss({
      extract: true, // Optionally, extracts the CSS into a separate file
      minimize: true, // Minifies the CSS
    }),
  ],
};
