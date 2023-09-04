const plugin  = {
  name: 'html-plugin',
  setup(build) {
    console.log('sskhjkjhs')
    build.onEnd(async (buildResult) => {
      console.log(buildResult, 'buildResult');
    })
  }
}

module.exports = plugin;
