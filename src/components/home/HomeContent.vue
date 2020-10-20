<template>
    <div>
        <van-swipe>
            <van-swipe-item v-for="(bn,index) in bannerList" :key="index">
                <img :style="imgClass" :src="bn.url"/>
            </van-swipe-item>
        </van-swipe>

        <div class='menu-box'>
            <div class='menus'>
                <router-link to="/external/workshop/list" style="color: #000;">
                    <div class='menu-item'>
                        <van-image width="30" height="30" src='/img/workshop.png'></van-image>
                        <div>厂房</div>
                    </div>
                </router-link>
                <router-link to="/external/warehouse/list" style="color: #000;">
                    <div class='menu-item'>
                        <van-image width="30" height="30" src='/img/warehouse.png'></van-image>
                        <div>仓库</div>
                    </div>
                </router-link>
                <router-link to="/external/office/list" style="color: #000;">
                    <div class='menu-item'>
                        <van-image width="30" height="30" src='/img/office.png'></van-image>
                        <div>办公</div>
                    </div>
                </router-link>
                <router-link to="/external/shop/list" style="color: #000;">
                    <div class='menu-item'>
                        <van-image width="30" height="30" src='/img/shop.png'></van-image>
                        <div>商铺</div>
                    </div>
                </router-link>
            </div>
        </div>
        <van-grid column-num="2" style="top:-20px">
            <van-grid-item icon="/img/weituo_house.png" text="委托找房" to="/entrust/edit"></van-grid-item>
            <van-grid-item icon="/img/weituo_customer.png" text="委托找客" to="/entrust/edit"></van-grid-item>
        </van-grid>
    </div>
</template>

<script>
    import {Swipe, SwipeItem, Image, Grid, GridItem} from 'vant';
    import {Size} from "../base/Size";

    export default {
        name: "HomeContent",
        components: {
            [SwipeItem.name]: SwipeItem,
            [Swipe.name]: Swipe,
            [Image.name]: Image,
            [Grid.name]: Grid,
            [GridItem.name]: GridItem

        },
        data: function () {
            return {
                bannerList: [{
                    id: "123",
                    url: "http://f.kufangwuyou.com/picture/20190525/IMG201905250024438c.jpg"
                }, {
                    id: "456",
                    url: "http://f.kufangwuyou.com/picture/20190525/IMG201905250023c50f.jpg"
                }, {
                    id: "789",
                    url: "http://f.kufangwuyou.com/picture/20190525/IMG201905250020d10c.jpg"
                }],
                imgClass: {
                    width: '100%',
                    height: Size.screenWidth() * 3 / 5 + 'px'
                },
            }
        },

        methods: {

            menuClick: function (e) {
                console.log(e);
            }
        }
    }
</script>

<style scoped>
    .menu-box {
        margin: 0px 10px;
        height: 100px;
        border-radius: 5px;
        border: 1px solid #f1f1f1;
        background-color: #fff;
        top: -30px;
        position: relative;
        box-shadow: 0px 2px #f1f1f1;
    }

    .menus {
        width: 100%;
        height: 50px;
        margin-top: 10px;
    }

    .menu-item {
        width: 25%;
        float: left;
        text-align: center;
        font-size: 14px;
    }

    .notice {
        color: #fff;
    }
</style>