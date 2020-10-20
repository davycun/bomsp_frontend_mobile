<template>
    <div>
        <div class="grid-title">新增房源</div>
        <van-grid>
            <van-grid-item icon="/img/workshop.png" text="新增厂房" @click="onWorkshopCreateClick"></van-grid-item>
            <van-grid-item icon="/img/warehouse.png" text="新增仓库" @click="onWarehouseCreateClick"></van-grid-item>
            <van-grid-item icon="/img/office.png" text="新增办公" @click="onOfficeCreateClick"></van-grid-item>
            <van-grid-item icon="/img/shop.png" text="新增商铺" @click="onShopCreateClick"></van-grid-item>
        </van-grid>

        <div class="grid-title">新增客户</div>
        <van-grid>
            <van-grid-item icon="/img/customer.png" text="新增客户" @click="onCustomerCreateClick"></van-grid-item>
        </van-grid>


        <WorkshopEdit :editor="false"
                      :visible="workshopCreateVisible"
                      :on-cancel="onWorkshopCreateCancel"
                      :on-submit-ok="onWorkshopCreateCancel"/>
        <WarehouseEdit :editor="false"
                       :visible="warehouseCreateVisible"
                       :on-cancel="onWarehouseCreateCancel"
                       :on-submit-ok="onWarehouseCreateSubmitOk"/>
        <OfficeEdit :editor="false"
                    :visible="officeCreateVisible"
                    :on-cancel="onOfficeCreateCancel"
                    :on-submit-ok="onOfficeCreateSubmitOk"/>
        <ShopEdit :editor="false"
                  :visible="shopCreateVisible"
                  :on-cancel="onShopCreateCancel"
                  :on-submit-ok="onShopCreateSubmitOk"/>

        <CustomerEdit :editor="false"
                      :visible="customerCreateVisible"
                      :on-submit-ok="onCustomerCreateSubmitOk"
                      :on-cancel="onCustomerCreateCancel"/>

    </div>
</template>

<script>
    import {Grid, GridItem} from 'vant';
    import WorkshopEdit from "../house/workshop/WorkshopEdit";
    import WarehouseEdit from "../house/warehouse/WarehouseEdit";
    import OfficeEdit from "../house/office/OfficeEdit";
    import ShopEdit from "../house/shop/ShopEdit";
    import {currentContext} from "../base/CurrentContext";
    import {dictionaryStorage} from "../base/DictionaryStorage";
    import CustomerEdit from "../crm/customer/CustomerEdit";

    export default {
        name: "Publish",
        components: {
            CustomerEdit,
            ShopEdit,
            OfficeEdit,
            WarehouseEdit,
            WorkshopEdit,
            [Grid.name]: Grid,
            [GridItem.name]: GridItem
        },
        data() {
            return {
                workshopCreateVisible: false,
                warehouseCreateVisible: false,
                officeCreateVisible: false,
                shopCreateVisible: false,
                customerCreateVisible: false,
            }
        },

        created() {
            currentContext.reload();
            dictionaryStorage.init();
        },

        methods: {
            onWorkshopCreateClick() {
                if (!currentContext.getUserPhone()) {
                    // Toast.fail("请先登录!");
                    this.$router.push("/login");
                    return;
                }
                this.workshopCreateVisible = true;
            },
            onWorkshopCreateCancel() {
                this.workshopCreateVisible = false;
            },
            onWorkshopCreateSubmitOk() {
                this.workshopCreateVisible = false;
            },

            onWarehouseCreateClick() {
                if (!currentContext.getUserPhone()) {
                    // Toast.fail("请先登录!");
                    this.$router.push("/login");
                    return;
                }
                this.warehouseCreateVisible = true;
            },
            onWarehouseCreateCancel() {
                this.warehouseCreateVisible = false;
            },
            onWarehouseCreateSubmitOk() {
                this.warehouseCreateVisible = false;
            },

            onOfficeCreateClick() {
                if (!currentContext.getUserPhone()) {
                    // Toast.fail("请先登录!");
                    this.$router.push("/login");
                    return;
                }
                this.officeCreateVisible = true;
            },
            onOfficeCreateCancel() {
                this.officeCreateVisible = false;
            },
            onOfficeCreateSubmitOk() {
                this.officeCreateVisible = false;
            },

            onShopCreateClick() {
                if (!currentContext.getUserPhone()) {
                    this.$router.push("/login");
                    // Toast.fail("请先登录!");
                    return;
                }
                this.shopCreateVisible = true;
            },
            onShopCreateCancel() {
                this.shopCreateVisible = false;
            },
            onShopCreateSubmitOk() {
                this.shopCreateVisible = false;
            },
            onCustomerCreateClick() {
                if (!currentContext.getUserPhone()) {
                    // Toast.fail("请先登录!");
                    this.$router.push("/login");
                    return;
                }
                this.customerCreateVisible = true;
            },
            onCustomerCreateCancel() {
                this.customerCreateVisible = false;
            },
            onCustomerCreateSubmitOk() {
                this.customerCreateVisible = false;
            }

        }
    }
</script>

<style scoped>

    .grid-title {
        margin: 30px 0px 5px 10px;
        font-size: 13px;
        color: #323232;
        text-align: left;
    }
</style>