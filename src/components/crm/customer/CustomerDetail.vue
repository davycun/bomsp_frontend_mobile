<template>
    <div>
        <van-nav-bar title="客户详情"
                     @click-left="onBackClick"
                     left-arrow left-text="返回">
        </van-nav-bar>
        <van-tabs sticky style="margin-bottom: 50px;">
            <van-tab title="基本信息">
                <CustomerInfo v-bind:customer="customer"/>
            </van-tab>
            <van-tab title="跟进信息">
                <CustomerFollowupList ref="followupList" :cus-id="$route.params.id"/>
            </van-tab>
        </van-tabs>

        <div style="position: fixed;bottom: 0px;width:100%">
            <van-row>
                <van-col span="12">
                    <van-button type="default" block  @click="onPhoneCallClick">联系房东</van-button>
                </van-col>
                <van-col span="12">
                    <van-button type="primary" block  @click="functionVisible=true">功能区</van-button>
                </van-col>
            </van-row>
        </div>

        <van-popup v-model="functionVisible" position="bottom" style="height:40%;width:100%">
            <van-grid>
                <van-grid-item icon="photo-o" text="跟进"
                               :to="{path:'/mine/customer/followup/edit/'+customer.id}">
                </van-grid-item>
                <van-grid-item icon="photo-o" text="编辑客户" @click="onCustomerEditClick"></van-grid-item>
            </van-grid>
        </van-popup>

        <CustomerEdit ref="customerEdit" :editor="true" :visible="customerEditVisible" :on-cancel="onCustomerEditCancel" :on-submit-ok="onCustomerEditSubmitOk"/>
    </div>
</template>

<script>
    import {NavBar, Tabs, Tab, Popup, Row, Col, Button, Sticky,Dialog,Grid,GridItem} from 'vant';
    import {request} from "../../base/CiiUtils";
    import CustomerInfo from './CustomerInfo';
    import CustomerFollowupList from "./followup/CustomerFollowupList";
    import CustomerEdit from "./CustomerEdit";
    export default {
        name: "CustomerDetail",
        components: {
            CustomerEdit,
            CustomerFollowupList,
            CustomerInfo,
            [NavBar.name]: NavBar,
            [Tabs.name]: Tabs,
            [Tab.name]: Tab,
            [Popup.name]: Popup,
            [Row.name]: Row,
            [Col.name]: Col,
            [Button.name]: Button,
            [Sticky.name]: Sticky,
            [Dialog.Component.name]:Dialog.Component,
            [Grid.name]:Grid,
            [GridItem.name]:GridItem
        },
        data: function () {
            return {
                customer: {},
                functionVisible: false,
                customerEditVisible:false
            }
        },
        beforeRouteEnter: function (to, from, next) {
            next((vm) => {
                if (from.name !== 'followupEdit') {
                    vm.loadData();
                    if (vm.$refs) {
                        if (vm.$refs.followupList) {
                            vm.$refs.followupList.loadData(true);
                        }
                    }
                }
            });
        },
        methods:{
            loadData: function () {
                request({
                    conf: {
                        url: 'customer/detail',
                        data: {
                            entity: {
                                id: this.$route.params.id
                            }
                        }
                    },
                    success: (response) => {
                        this.customer = response.result;
                    }
                })
            },
            onBackClick: function () {
                this.$router.back()
            },
            onCustomerEditClick(){
                this.customerEditVisible = true;
                this.$refs.customerEdit.initCurrentData(this.customer);
            },
            onCustomerEditCancel(){
                this.customerEditVisible = false;
            },
            onCustomerEditSubmitOk(){
                this.customerEditVisible = false;
                this.loadData();
            },
            onPhoneCallClick(){
                Dialog.confirm({
                    title:'电话号码如下',
                    message:this.customer.cusPhone,
                    confirmButtonText:'拨号'
                }).then(()=>{
                    window.location.href='tel:'+this.customer.cusPhone;
                }).catch(()=>{

                })
            }
        }
    }
</script>

<style scoped>

</style>