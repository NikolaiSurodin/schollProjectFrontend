module.exports = {
  runtimeCompiler: true,
  css: {
    loaderOptions: {
      sass: {
        prepareData: '@import "@/assets/styles.scss";'
      }
    }
  }

}