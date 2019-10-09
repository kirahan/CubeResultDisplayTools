# deploy 
具体参考[VUE 部署到Github Pages](https://cli.vuejs.org/zh/guide/deployment.html#github-pages)

## 第一部分 部署到github pages 
- 好处： 不需要云服务器，但是需要一个api服务器
  
> 主要使用github pages

1. 在github 上开通pages 建立分支gh-pages
2. 把项目的dist目录上传到gh-pages即可
3. 写一个脚本deploy.sh 自动执行build + push dist目录，每次commit到master之后再 bash deploy.sh即可    
> notices
> 只能工作在hash模式下，不能在history

- [ ] 使用Git actions实现每次push之后自动在github上build