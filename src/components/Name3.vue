<template>
    <div class="playersresult">
        <div class="rank">{{playerdata.rank}}</div>
        <div class="name">{{playerdata.name}}</div>
        <div class="result">{{playerdata.result}}</div>
        <div class="t1">{{playerdata.t1}}</div>
        <div class="t2">{{playerdata.t2}}</div>
        <div class="t2">{{playerdata.t3}}</div>
    </div>
</template>

<script>
export default {
    props : ["playerdata"],
    data(){
        return {}
    }
}
</script>

<style lang="css">
.playersresult{
    display : flex;
    color: white;
    font-size: 30px;
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
    background-color :darkslateblue
}
.t3{
    width: 20%;
    background-color :darkslateblue
}

</style>