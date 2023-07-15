// rollup -c .\rollup.config.cjs
// https://www.rollupjs.com/guide/command-line-reference

export default [
  {
    input: './index.js',
    output: [
      {
        file: 'dist/cjs/index.cjs',
        format: 'cjs'
      },
      {
        file: 'dist/mjs/index.mjs',
        format: 'esm'
      },
      {
        file: 'dist/umd/index.js',
        format: 'umd',
        name: 'utils'
      }
    ]
  },
]

