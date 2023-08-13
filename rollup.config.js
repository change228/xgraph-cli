import path from "node:path";
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { getBabelOutputPlugin } from "@rollup/plugin-babel";
import alias from "@rollup/plugin-alias";
import typescript from "@rollup/plugin-typescript"

const formats = ["es", "amd", "cjs"];
const outputDir = "lib";
const __dirname = path.resolve();
const input = "./src/index.ts";
const output = formats.map((format) => {
  const outputItem = {
    dir: outputDir,
    entryFileNames: `[name].${format}.js`,
    format,
  };
  return outputItem;
});
const plugins = [
  nodeResolve({
    browser: true,
  }),
  commonjs(),
  alias({
    entries: [
      {
        find: "@",
        replacement: path.resolve(__dirname, "./src"),
      },
    ],
  }),
  typescript(),
  getBabelOutputPlugin({
  "allowAllFormats": true,
  "plugins": [
    [
      "@babel/transform-runtime",
      {
        "absoluteRuntime": false,
        "corejs": 3,
        "helpers": true,
        "regenerator": true
      }
    ]
  ],
  "presets": [
    [
      "@babel/env",
      {
        "modules": "amd"
      }
    ]
  ]
})
];

export default {
  input,
  output,
  plugins,
};
