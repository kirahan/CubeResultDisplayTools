module.exports = {
    // publicPath :process.env.NODE_ENV === 'production' ? '/visitors' : '/' ,  // for my own cloud server
    publicPath :process.env.NODE_ENV === 'production' ? '/CubeResultDisplayTools' : '/' ,    // for github pages https://cli.vuejs.org/zh/guide/deployment.html#github-pages
    outputDir : __dirname +'/../hotel_liwei_server/visitors' ,
    productionSourceMap : false,
}