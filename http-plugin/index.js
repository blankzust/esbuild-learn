const http = require('http');
const https = require('https');

const plugin = {
  name: 'HttpImportPlugin',
  setup(build) {
    // step1. 拦截CDN的import
    build.onResolve({ filter: /^https?:\/\// }, (args) => ({
      // 重写路径，二次依赖的相对路径加上引入方的地址
      path: args.path,
      namespace: 'http-url'
    }))

    build.onResolve({ filter: /.*/, namespace: 'http-url' }, (args) => ({
      // 重写路径，二次依赖的相对路径加上引入方的地址
      path: new URL(args.path, args.importer).toString(),
      namespace: 'http-url'
    }))

    // step2. 上诉拦截器的资源fetch资源获取
    build.onLoad({ filter: /.*/, namespace: 'http-url' }, async (args) => {
      let contents = await new Promise((resolve, reject) => {
      function fetch(url) {
        console.log(`Downloading: ${url}`) 
        const request = url.startsWith('https') ? https: http;
        request.get(url, (res) => {
          if ([301, 302, 307].includes(res.statusCode)) {
            fetch(new URL(res.headers.location, url).toString());
          } else if (res.statusCode === 200) {
            let chunks = [];
            res.on('data', (chunk) => chunks.push(chunk));
            res.on('end', () => { resolve(Buffer.concat(chunks)) })
          }
        })
      }
      fetch(args.path);
    })
    return {
      contents,
    }
  })}
}

module.exports = plugin;