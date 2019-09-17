<template>
  <div class="home">
      <h2>这是展示页面</h2>
      <p>我们要在这里写界面呈现效果</p>
    
      <Playersresult3  v-for="(data,i) in resultdata" :key="i" :playerdata='data'></Playersresult3>
     
      
  </div>
</template>

<script>
// @ is an alias to /src

import Playersresult3 from '../components/Name3'
export default {
  name: 'home',
  components: { Playersresult3 },
  data(){
    return {
        resultdata : [
          {
            rank : 1,
            name : 'hanzhao',
            result : 21.35,
            t1:15.36,
            t2:25.78,
            t3:26.35
          },
          {
            rank : 2,
            name : 'nzhao',
            result : 25.35,
            t1:25.36,
            t2:25.78,
            t3:36.35
          }
          ,
          {
            rank : 3,
            name : 'zhao',
            result : 32.35,
            t1:15.36,
            t2:25.78,
            t3:26.35
          }
          ,
          {
            rank : 4,
            name : 'jo',
            result : 44.35,
            t1:15.36,
            t2:25.78,
            t3:26.35
          }
          ,
          {
            rank : 5,
            name : 'kira',
            result : 52.35,
            t1:15.36,
            t2:25.78,
            t3:26.35
          }
        ]
    }
  }
}
</script>
