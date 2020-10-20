<template>
    <div>
        <van-cell-group>
            <template #title>
                <span class="cell-group-title">客户基本信息</span>
            </template>
            <van-cell>
                <template #default>
                    客户ID：{{customer.id}}
                </template>
            </van-cell>
            <van-cell>
                <template #default>
                    客户姓名：{{customer.cusName}}
                </template>
            </van-cell>
            <van-cell>
                <template #default>
                    产品信息：{{customer.product}}
                </template>
            </van-cell>
            <van-cell>
                <template #default>
                    客户状态：<span class="red-color">{{customer.cusStateName}}</span>
                </template>
            </van-cell>
            <van-cell>
                <template #default>
                    需求区域：
                    <span class="red-color" v-for="area in customer.areas" :key="area.id">
                                    {{area.cityName+(area.regionName||"")+(area.streetName||"")}}
                    </span>
                </template>
            </van-cell>

        </van-cell-group>

        <van-cell-group>
            <template #title>
                <span class="cell-group-title">客户需求信息</span>
            </template>
            <van-cell>
                <template #default >
                    需求面积：<span  class="red-color">{{customer.needAcreage}} m²</span>
                </template>
            </van-cell>
            <van-cell>
                <template #default>
                    需求房源：{{customer.houseTypeName}}
                </template>
            </van-cell>
            <van-cell>
                <template #default>
                    期望价格：<span class="red-color">{{customer.needPrice}} {{customer.priceUnitName}}</span>
                </template>
            </van-cell>
            <van-cell>
                <template #default>
                    楼层需求：{{customer.needLayerName}}
                </template>
            </van-cell>
            <van-cell>
                <template #default>
                    电量需求：{{customer.needVoltage}} KVA
                </template>
            </van-cell>
            <van-cell>
                <template #default>
                    最晚入住：{{Utils.dateFormat(customer.enterTime,'yyyy-MM-dd')}}
                </template>
            </van-cell>
            <van-cell>
                <template #default>
                    消防需求：{{customer.fireDeviceTypeName}}
                </template>
            </van-cell>
            <van-cell>
                <template #default>
                    其他要求：<span v-for="(tg,index) in customer.needTags" :key="index">{{tg}},</span>
                </template>
            </van-cell>
            <van-cell>
                <template #default>
                    更多备注：{{customer.remark}}
                </template>
            </van-cell>
        </van-cell-group>

    </div>
</template>

<script>
    import {Cell,CellGroup} from 'vant';
    import {Utils} from "../../base/CiiUtils";

    export default {
        name: "CustomerInfo",
        components:{
            [Cell.name]:Cell,
            [CellGroup.name]:CellGroup
        },
        props:['customer'],
        data:function(){
            return {
                Utils: Utils
            }
        },
    }
</script>

<style scoped>

</style>