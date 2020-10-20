<template>
    <div style="margin-bottom: 70px;">
        <van-sticky>
            <van-nav-bar title="厂房详情"
                         @click-left="onBackClick"
                         left-arrow left-text="返回">
            </van-nav-bar>
        </van-sticky>
        <van-swipe>
            <van-swipe-item v-for="(img,index) in imagesList" :key="index">
                <img :style="imgClass" :src="Constants.fileReadUrl+img+'@detail'"/>
            </van-swipe-item>
        </van-swipe>

        <div>
            <van-cell style="margin-top: 10px">
                <template #default>
                    房源ID：{{workshop.id}}
                </template>
            </van-cell>
            <van-cell>
                <template #default>
                    地址：{{workshop.regionName+workshop.streetName+workshop.address}}
                </template>
            </van-cell>
            <van-cell>
                <template #default>
                    房源类型：{{workshop.houseTypeName}}
                </template>
            </van-cell>
            <van-cell>
                <template #default>
                    可出租面积：<span class="red-color">{{workshop.leaseAcreage}}</span> m²
                </template>
            </van-cell>
            <van-cell>
                <template #default>
                    起租面积：<span class="red-color">{{workshop.leaseAcreageMin}}</span> m²
                </template>
            </van-cell>
            <van-cell>
                <template #default>
                    单价：<span class="red-color">{{workshop.price}}</span> {{workshop.priceUnitName}}
                </template>
            </van-cell>
            <van-cell>
                <template #default>
                    层高：{{workshop.floorHeight}} 米
                </template>
            </van-cell>
            <van-cell>
                <template #default>
                    承重：{{workshop.bearing}} 吨/平米
                </template>
            </van-cell>
            <van-cell>
                <template #default>
                    地坪：{{workshop.floorBoardTypeName}}
                </template>
            </van-cell>
            <van-cell>
                <template #default>
                    消防设施：{{workshop.fireDeviceTypeName}}
                </template>
            </van-cell>
            <van-cell>
                <template #default>
                    租赁类型：{{workshop.leaseTypeName}}
                </template>
            </van-cell>
            <van-cell>
                <template #default>
                    适合行业：{{workshop.fitIndustryName}}
                </template>
            </van-cell>
            <van-cell>
                <template #default>
                    房东联系：{{workshop.contactName}}（{{workshop.contactPhone}}）
                </template>
            </van-cell>
            <van-cell>
                <template #default>
                    <van-tag plain
                             type="warning"
                             style="margin-right: 2px;"
                             :key="tg"
                             v-for="tg in workshop.advantageTags">
                        {{tg}}
                    </van-tag>
                </template>
            </van-cell>
        </div>

        <div style="position: fixed;bottom: 0px;width:100%">
            <van-row>
                <van-col span="12">
                    <van-button type="default" block  @click="onContactPhoneClick">联系房东</van-button>
                </van-col>
                <van-col span="12">
                    <van-button type="primary" block  @click="functionVisible=true">功能区</van-button>
                </van-col>
            </van-row>
        </div>


        <van-popup v-model="functionVisible" position="bottom" style="height:40%;width:100%">
            <van-grid>
                <van-grid-item icon="photo-o" text="编辑房源" @click="onWorkshopEditClick"></van-grid-item>
            </van-grid>
        </van-popup>

        <WorkshopEdit ref="workshopEdit" :editor="true" :visible="workshopEditVisible" :on-submit-ok="onWorkshopEditSubmitOk" :on-cancel="onWorkshopEditCancel"/>
    </div>
</template>

<script>
    import {NavBar, Sticky, Swipe, SwipeItem, Tabs, Tab, GridItem, Grid, Button, Popup,Cell,Tag,Row,Col,Dialog} from 'vant';
    import {request} from "../../base/CiiUtils";
    import {Constants} from "../../base/Constants";
    import {Size} from "../../base/Size";
    import WorkshopEdit from "./WorkshopEdit";
    export default {
        name: "MyWorkshopDetail",
        components:{
            WorkshopEdit,
            [NavBar.name]: NavBar,
            [Sticky.name]: Sticky,
            [Swipe.name]: Swipe,
            [SwipeItem.name]: SwipeItem,
            [Tabs.name]: Tabs,
            [Tab.name]: Tab,
            [GridItem.name]: GridItem,
            [Grid.name]: Grid,
            [Button.name]: Button,
            [Popup.name]: Popup,
            [Cell.name]:Cell,
            [Tag.name]:Tag,
            [Row.name]:Row,
            [Col.name]:Col
        },
        data: function () {
            return {
                workshop: {},
                Constants: Constants,
                imgClass: {
                    width: '100%',
                    height: Size.screenWidth() * 3 / 5 + 'px'
                },

                functionVisible: false,
                workshopEditVisible: false,
            }
        },
        computed:{
            imagesList(){
                if (this.workshop.housePublicImagesList){
                    return this.workshop.housePublicImagesList.concat(this.workshop.housePrivateImagesList);
                }
                return [];
            }
        },
        created: function () {
            this.loadData();
        },
        methods: {
            onBackClick: function () {
                this.$router.back();
            },
            loadData: function () {
                request({
                    conf: {
                        url: 'workshop/detail',
                        data: {
                            entity: {
                                id: this.$route.params.id
                            }
                        }
                    },
                    success: (response) => {
                        this.workshop = response.result;
                    }
                })
            },
            onWorkshopEditClick() {
                this.workshopEditVisible = true;
                this.$refs.workshopEdit.initCurrentData(this.workshop);
            },
            onWorkshopEditCancel() {
                this.workshopEditVisible = false;
            },
            onWorkshopEditSubmitOk() {
                this.workshopEditVisible = false;
                this.loadData();
            },
            onContactPhoneClick(){
                Dialog.confirm({
                    title:'电话号码如下',
                    message:this.workshop.contactPhone,
                    confirmButtonText:'拨号'
                }).then(()=>{
                    window.location.href='tel:'+this.workshop.contactPhone;
                }).catch(()=>{

                })
            }
        }

    }
</script>

<style scoped>

</style>