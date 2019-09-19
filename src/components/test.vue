<template>
        <div>
            <h2 class="block">
               姓名：{{name}}
            </h2>
            <button class="btn">click me</button>

        </div>


</template>


<script>
export default {
    props : ['name']
}
</script>


<style scoped>
    .block{
        background-color: aqua;
        color:black;
        font-size: 30px;
    }
    .btn{
        width:300px;
        height: 100px;
    }

</style>