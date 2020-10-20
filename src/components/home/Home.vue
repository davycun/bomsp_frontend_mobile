<template>
    <div>
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>

        <van-tabbar route>
            <van-tabbar-item to="/" icon="home-o">
                首页
            </van-tabbar-item>
            <van-tabbar-item to="/publish" icon="location-o">
                发布
            </van-tabbar-item>
            <van-tabbar-item to="/mine" icon="user-o">
                个人
            </van-tabbar-item>
        </van-tabbar>

    </div>
</template>

<script>
    import {Tabbar,TabbarItem} from 'vant';
    export default {
        name: "home",
        components:{
            [Tabbar.name]:Tabbar,
            [TabbarItem.name]:TabbarItem
        }
    }
</script>

<style scoped>

</style>