<template>
    <div>
        <div class='header' v-if="hasLogin">
            <div class='header-left'>
                <van-image round width="90" height="90" style="margin-top: 30px" :src="avatar"></van-image>
            </div>
            <div class='header-right' >
                <div class="header-right-top">
                    <div class='login-name'>{{userName}}</div>
                    <div class="login-setting">
                        <van-icon name="setting-o" style="color:#ffffff" size="30px" />
                    </div>
                </div>
                <div class="header-right-bottom">
                    <van-icon name="phone-o">{{userPhone}}</van-icon>
                    <van-icon style="margin-left: 20px" name="location-o" color="#ffffff">{{userTypeName}}</van-icon>
                </div>
            </div>
        </div>
        <div class='header-unlogin' v-if="!hasLogin">
            <router-link style="color: #000;" to="/login">
                点击注册/登录
            </router-link>
        </div>

        <div style="margin-bottom: 80px">

            <van-cell-group title="我的房源">
                <van-grid>
                    <van-grid-item icon="/img/workshop.png" text="我的厂房" @click="onMyWorkshopListClick" ></van-grid-item>
                    <van-grid-item icon="/img/warehouse.png" text="我的仓库" @click="onMyWarehouseListClick"></van-grid-item>
                    <van-grid-item icon="/img/office.png" text="我的办公室" @click="onMyOfficeListClick"></van-grid-item>
                    <van-grid-item icon="/img/shop.png" text="我的商铺" @click="onMyShopListClick"></van-grid-item>
                </van-grid>
            </van-cell-group>

            <van-cell-group title="我的客户">
                <van-grid>
                    <van-grid-item icon="/img/customer.png" text="我的客户" @click="onMyCustomerListClick"></van-grid-item>
                    <van-grid-item icon="/img/warehouse.png" text="我的跟进" @click="onMyFollowupListClick"></van-grid-item>
                </van-grid>
            </van-cell-group>

            <van-cell-group title="我的获客">
                <van-grid>
                    <van-grid-item icon="/img/yuyue.png" text="客户预约" @click="onMyBespeakListClick"></van-grid-item>
                    <van-grid-item icon="/img/weituo_customer.png" text="客户委托" @click="onMyEntrustCustomerListClick"></van-grid-item>
                    <van-grid-item icon="/img/weituo_house.png" text="业主委托" @click="onMyEntrustHouseListClick"></van-grid-item>
                </van-grid>
            </van-cell-group>

            <van-button v-if="hasLogin" style="margin-top: 50px" block type="primary" @click="logout">退出</van-button>
        </div>

    </div>
</template>

<script>
    import {Image,Cell,Icon,Button,CellGroup,Grid,GridItem} from 'vant';
    import {currentContext} from "../base/CurrentContext";
    import {dictionaryStorage} from "../base/DictionaryStorage";
    import {Constants} from "../base/Constants";
    import {request} from "../base/CiiUtils";

    export default {
        name: "Mine",
        components:{
            [Image.name]:Image,
            [Cell.name]:Cell,
            [Icon.name]:Icon,
            [Button.name]:Button,
            [CellGroup.name]:CellGroup,
            [Grid.name]:Grid,
            [GridItem.name]:GridItem
        },
        data(){
            return {

                hasLogin:false,
                userName:"",
                userPhone:"",
                avatar:"/img/logo.png",
                userTypeName:""
            }
        },
        beforeRouteEnter:function(to, from, next){
            next((vm)=>{
                if (!vm.hasLogin){
                    vm.loadData();
                }
            })
        },
        methods:{
            loadData(){
                currentContext.reload(()=>{
                    this.hasLogin = true;
                    this.userName = currentContext.getUserName();
                    this.userPhone = currentContext.getUserPhone();
                    let at  = "/img/logo.png";
                    if (currentContext.getAvatar()){
                        at = Constants.fileReadUrl+currentContext.getAvatar();
                    }
                    this.avatar = at;
                });
                dictionaryStorage.init();

            },
            logout(){
                request({
                    conf:{
                        url:"userFrontend/logout"
                    },
                    success:()=>{
                        this.hasLogin = false;
                    }
                })
            },
            onUserUpdateClick(){

            },
            onMyCustomerListClick(){
                if (!currentContext.getUserPhone()) {
                    this.$router.push("/login");
                    return;
                }
                this.$router.push("/mine/customer/list");
            },
            onMyFollowupListClick(){
                if (!currentContext.getUserPhone()) {
                    this.$router.push("/login");
                    return;
                }
                this.$router.push("/mine/customer/followup/list");
            },
            onMyWorkshopListClick(){
                if (!currentContext.getUserPhone()) {
                    this.$router.push("/login");
                    return;
                }
                this.$router.push("/mine/workshop/list");
            },
            onMyWarehouseListClick(){
                if (!currentContext.getUserPhone()) {
                    this.$router.push("/login");
                    return;
                }
                this.$router.push("/mine/warehouse/list");
            },
            onMyOfficeListClick(){
                if (!currentContext.getUserPhone()) {
                    this.$router.push("/login");
                    return;
                }
                this.$router.push("/mine/office/list");
            },
            onMyShopListClick(){
                if (!currentContext.getUserPhone()) {
                    this.$router.push("/login");
                    return;
                }
                this.$router.push("/mine/shop/list");
            },
            onMyEntrustCustomerListClick(){
                if (!currentContext.getUserPhone()) {
                    this.$router.push("/login");
                    return;
                }
                this.$router.push("/mine/entrust/customer/list");
            },
            onMyEntrustHouseListClick(){
                if (!currentContext.getUserPhone()) {
                    this.$router.push("/login");
                    return;
                }
                this.$router.push("/mine/entrust/house/list");
            },
            onMyBespeakListClick(){
                if (!currentContext.getUserPhone()) {
                    this.$router.push("/login");
                    return;
                }
                this.$router.push("/mine/appointment/list");
            },
        }

    }
</script>

<style scoped>

    .header-unlogin{
        line-height: 150px;
        font-size: 15px;
        background-color: #4a89dc;
        text-align: center;
    }
    .header {
        height: 150px;
        width: 100%;
        background-color: #4a89dc;
    }

    .header .header-left {
        width: 30%;
        height: 150px;
        text-align: center;
        float: left;
    }

    .header-right{
        width: 70%;
        height: 150px;
        float: left;
        color: #fff;
    }
    .header-right-top,.header-right-bottom{
        height:50%;
        width:100%;
        text-align: left;
    }
    .header-right-bottom{
        padding-top: 10px;
    }

    .header-right .login-name {
        font-size: 14px;
        margin-top: 50px;
        float: left;
    }
    .header-right .login-setting{
        font-size: 14px;
        margin-right: 20px;
        margin-top:20px;
        width:20%;
        float: right;
    }
    .grid-title {
        margin: 30px 0px 5px 10px;
        font-size: 13px;
        color: #323232;
        text-align: left;
    }
</style>