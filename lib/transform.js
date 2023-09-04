const { transform } = require('esbuild');

function runTransform() {
  transform(
    `const isNull = (str: string) => str.length > 0`,
    {
      sourcemap: true,
      loader: 'ts'
    }
  ).then(res => {
    console.log(res.code)
  })
}

function runTransformEs6() {
  transform(
    `async () => {}`,
    {
      sourcemap: true,
      target: 'es2016'
    }
  ).then(res => {
    console.log(res.code)
  })
}

runTransform();
runTransformEs6();