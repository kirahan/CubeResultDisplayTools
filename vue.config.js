module.exports = {
    // publicPath :process.env.NODE_ENV === 'production' ? '/visitors' : '/' ,  // for my own cloud server
    publicPath :process.env.NODE_ENV === 'production' ? '/pk' : '/' ,    // for github pages https://cli.vuejs.org/zh/guide/deployment.html#github-pages
    productionSourceMap : false,
}