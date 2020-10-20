<template>
    <div>
        <van-nav-bar left-arrow left-text="返回" title="厂房详情" @click-left="onBackClick" fixed></van-nav-bar>
    </div>
</template>

<script>
    import {NavBar} from 'vant';
    export default {
        name: "WorkshopDetail",
        components:{
            [NavBar.name]:NavBar
        },
        data:function(){

            return {

            }
        },

        methods:{
            onBackClick:function(){
                this.$router.back();
            }
        }

    }
</script>

<style scoped>

</style>