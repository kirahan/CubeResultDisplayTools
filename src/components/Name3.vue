<template>
    <div class="playersresult">
        <h1 class="title">{{title}}</h1>
        <div class="panel">
            <div class="rank">{{result_title.rank}}</div>
            <div class="name">{{result_title.name}}</div>
            <div class="result">{{result_title.result}}</div>
            <div class="t1">{{result_title.t1}}</div>
            <div class="t2">{{result_title.t2}}</div>
            <div class="t3">{{result_title.t3}}</div>
        </div>
        <div class="panel" v-for="(data,i) in playerdata" :key="i">
            <div class="rank">{{data.rank}}</div>
            <div class="name">{{data.name}}</div>
            <div class="result">{{formatresult(data.result)}}</div>
            <div class="t1">{{formatresult(data.t1)}}</div>
            <div class="t2">{{formatresult(data.t2)}}</div>
            <div class="t3">{{formatresult(data.t3)}}</div>
        </div>
        
    </div>
</template>



<script>
export default {
    props : ["playerdata",'title'],
    data(){
        return {
            text : '你好',
            result_title : {
                    rank : '排名',
                    name: '姓名',
                    result : '成绩',
                    t1: '第一次',
                    t2: '第二次',
                    t3: '第三次',
                    },
        }
    },
    methods : {
        formatresult(result){
            if(result == 'DNF'){
                return "DNF"
            }else{
                const data = Math.floor(result)
                let min = Math.floor(data/6000)
                let sec = Math.floor(data%6000/100)
                let ms = data%100
                // 12345
                
                // console.log(`${min}:${sec}.${ms}`)
                if(min==0){
                    return `${sec}.${ms}` 
                }else{
                    return `${min}:${sec}.${ms}` 
                }
            }
            
        },

        change(){
            setTimeout(()=>{
                this.text = '进口量方法'
            },2000)
        }
    },
    created(){
        this.change()
    }
}
</script>

<style lang="css">
.title{
    color: black;
    font-size: 40px;
    margin: 0%;
}
.playersresult{
    /* display : flex; */
    color: white;
    font-size: 30px;
}
.panel{
    width: 100%;
    display: flex;
    margin-right: 50px;
    /* flex-direction: column; */
}
.rank{
    width: 10%;
    background-color: burlywood;
}
.name{
    width: 30%;
     background-color:cornflowerblue
}
.result{
    width: 20%;
     background-color :darkcyan
}
.t1{
    width: 20%;
     background-color :darkslateblue
}
.t2{
    width: 20%;
    background-color :rgb(45, 182, 102)
}
.t3{
    width: 20%;
    background-color :darkslateblue
}

</style>