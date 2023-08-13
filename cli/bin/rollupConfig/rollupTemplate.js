const rollupTemplate = `import path from "node:path";
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { getBabelOutputPlugin } from "@rollup/plugin-babel";
import alias from "@rollup/plugin-alias";
{{typescriptPluginImport}}

const formats = ["es", "amd", "cjs"];
const outputDir = "lib";
const __dirname = path.resolve();
const input = {{inputFile}};
const output = formats.map((format) => {
  const outputItem = {
    dir: outputDir,
    entryFileNames: \`[name].\${format}.js\`,
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
  {{typescriptPlugin}}
  getBabelOutputPlugin({{babelPlugin}})
];

export default {
  input,
  output,
  plugins,
};
`
export default rollupTemplate
