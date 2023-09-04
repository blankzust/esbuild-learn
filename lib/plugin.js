const { build } = require('esbuild');
// 完成一个替换内容的插件
let envPlugin = {
  name: 'env',
  setup(build) {
    build.onResolve({ filter: /^env$/ }, (args) => {
      // 模块路径
      console.log(args.path)
      // 父模块路径
      console.log(args.importer)
      // namespace 标识
      console.log(args.namespace)
      // 基准路径
      console.log(args.resolveDir)
      // 导入方式，如 import、require
      console.log(args.kind)
      // 额外绑定的插件数据
      console.log(args.pluginData)
      
      return {
          // 错误信息
          errors: [],
          // 是否需要 external
          external: false,
          // namespace 标识
          namespace: 'test',
          // 模块路径
          path: args.path,
          // 额外绑定的插件数据
          pluginData: null,
          // 插件名称
          pluginName: 'xxx',
          // 设置为 false，如果模块没有被用到，模块代码将会在产物中会删除。否则不会这么做
          sideEffects: false,
          // 添加一些路径后缀，如`?xxx`
          suffix: '?xxx',
          // 警告信息
          warnings: [],
          // 仅仅在 Esbuild 开启 watch 模式下生效
          // 告诉 Esbuild 需要额外监听哪些文件/目录的变化
          watchDirs: [],
          watchFiles: []
      }
    });
    build.onLoad({ filter: /.*/, namespace: 'test' }, (args) => {
      // 模块路径
      console.log(args.path);
      // namespace 标识
      console.log(args.namespace);
      // 后缀信息
      console.log(args.suffix);
      // 额外的插件数据
      console.log(args.pluginData);
      
      return {
          // 模块具体内容
          contents: '{ "PATH": "1" }',
          // 错误信息
          errors: [],
          // 指定 loader，如`js`、`ts`、`jsx`、`tsx`、`json`等等
          loader: 'json',
          // 额外的插件数据
          pluginData: null,
          // 插件名称
          pluginName: 'xxx',
          // 基准路径
          resolveDir: './dir',
          // 警告信息
          warnings: [],
          // 同上
          watchDirs: [],
          watchFiles: []
      }
    });
    // build.onResolve({ filter: /^env$/ }, args => ({
    //   path: args.path,
    //   namespace: 'env-ns'
    // }));
    // build.onLoad({ filter: /.*/, namespace: 'env-ns' }, () => ({
    //   contents: JSON.stringify(process.env),
    //   loader: 'json'
    // }))
  }
}

build({
  entryPoints: ['src/index.jsx'],
  bundle: true,
  outfile: 'dist/out1.js',
  plugins: [envPlugin],
}).catch(() => process.exit(1))

module.exports = envPlugin;