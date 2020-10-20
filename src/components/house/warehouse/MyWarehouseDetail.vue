<template>
    <div style="margin-bottom: 70px;">
        <van-sticky>
            <van-nav-bar title="仓库详情"
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
                    房源ID：{{warehouse.id}}
                </template>
            </van-cell>
            <van-cell>
                <template #default>
                    地址：{{warehouse.regionName+warehouse.streetName+warehouse.address}}
                </template>
            </van-cell>
            <van-cell>
                <template #default>
                    房源类型：{{warehouse.houseTypeName}}
                </template>
            </van-cell>
            <van-cell>
                <template #default>
                    可出租面积：<span class="red-color">{{warehouse.leaseAcreage}}</span> m²
                </template>
            </van-cell>
            <van-cell>
                <template #default>
                    起租面积：<span class="red-color">{{warehouse.leaseAcreageMin}}</span> m²
                </template>
            </van-cell>
            <van-cell>
                <template #default>
                    单价：<span class="red-color">{{warehouse.price}}</span> {{warehouse.priceUnitName}}
                </template>
            </van-cell>
            <van-cell>
                <template #default>
                    层高：{{warehouse.floorHeight}} 米
                </template>
            </van-cell>
            <van-cell>
                <template #default>
                    承重：{{warehouse.bearing}} 吨/平米
                </template>
            </van-cell>
            <van-cell>
                <template #default>
                    地坪：{{warehouse.floorBoardTypeName}}
                </template>
            </van-cell>
            <van-cell>
                <template #default>
                    消防设施：{{warehouse.fireDeviceTypeName}}
                </template>
            </van-cell>
            <van-cell>
                <template #default>
                    租赁类型：{{warehouse.leaseTypeName}}
                </template>
            </van-cell>
            <van-cell>
                <template #default>
                    适合行业：{{warehouse.fitIndustryName}}
                </template>
            </van-cell>
            <van-cell>
                <template #default>
                    房东联系：{{warehouse.contactName}}（{{warehouse.contactPhone}}）
                </template>
            </van-cell>
            <van-cell>
                <template #default>
                    <van-tag plain
                             type="warning"
                             style="margin-right: 2px;"
                             :key="tg"
                             v-for="tg in warehouse.advantageTags">
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
                <van-grid-item icon="photo-o" text="编辑楼层" @click="onWarehouseEditClick"></van-grid-item>
            </van-grid>
        </van-popup>

        <WarehouseEdit ref="warehouseEdit" :editor="true" :visible="warehouseEditVisible" :on-submit-ok="onWarehouseEditSubmitOk" :on-cancel="onWarehouseEditCancel"/>
    </div>
</template>

<script>
    import {NavBar, Sticky, Swipe, SwipeItem, Tabs, Tab, GridItem, Grid, Button, Popup,Cell,Tag,Row,Col,Dialog} from 'vant';
    import {request} from "../../base/CiiUtils";
    import {Constants} from "../../base/Constants";
    import {Size} from "../../base/Size";
    import WarehouseEdit from "./WarehouseEdit";
    export default {
        name: "MyWarehouseDetail",
        components:{
            WarehouseEdit,
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
                warehouse: {},
                Constants: Constants,
                imgClass: {
                    width: '100%',
                    height: Size.screenWidth() * 3 / 5 + 'px'
                },

                functionVisible: false,
                warehouseEditVisible: false,
            }
        },
        computed:{
            imagesList:{
                get:function(){
                    if (this.warehouse.housePublicImagesList){
                        return this.warehouse.housePublicImagesList.concat(this.warehouse.housePrivateImagesList);
                    }
                    return [];
                }
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
                        url: 'warehouse/detail',
                        data: {
                            entity: {
                                id: this.$route.params.id
                            }
                        }
                    },
                    success: (response) => {
                        this.warehouse = response.result;
                    }
                })
            },
            onWarehouseEditClick() {
                this.warehouseEditVisible = true;
                this.$refs.warehouseEdit.initCurrentData(this.warehouse);
            },
            onWarehouseEditCancel() {
                this.warehouseEditVisible = false;
            },
            onWarehouseEditSubmitOk() {
                this.warehouseEditVisible = false;
                this.loadData();
            },
            onContactPhoneClick(){
                Dialog.confirm({
                    title:'电话号码如下',
                    message:this.warehouse.contactPhone,
                    confirmButtonText:'拨号'
                }).then(()=>{
                    window.location.href='tel:'+this.warehouse.contactPhone;
                }).catch(()=>{

                })
            }
        }

    }
</script>

<style scoped>

</style>