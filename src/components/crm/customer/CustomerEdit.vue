<template>
    <div>
        <van-popup v-model="editVisible" :position="position" :style="{height:height,width:width}">
            <van-form @submit="onEditSubmitOk" label-align="right" colon scroll-to-error style="margin-bottom: 50px">

                <van-field label="客户姓名" name="cusName"
                           v-model="currentData.cusName"
                           :rules="[{required: true,message:'客户姓名必填'}]"
                           placeholder="填写客户姓名"></van-field>
                <van-field label="客户电话" name="cusPhone"
                           v-model="currentData.cusPhone"
                           :rules="[{required:true,message:'请填写正确的手机号',pattern:/^1[3-9][0-9]{9}$/}]"
                           placeholder="填写客户电话">
                </van-field>
                <van-field label="性别" name="sex" :rules="[{required:true,message:'性别必填'}]">
                    <template #input>
                        <van-radio-group v-model="currentData.sex" direction="horizontal">
                            <van-radio v-for="dic in sexType" :key="dic.code" :name="dic.code">{{dic.name}}</van-radio>
                        </van-radio-group>
                    </template>
                </van-field>
                <van-field label="产品信息" name="product"
                           v-model="currentData.product"
                           :rules="[{required:true,message:'产品信息必填'}]"
                           placeholder="填写客户是做什么的">
                </van-field>
                <van-field label="找房类型" name="houseType" :rules="[{required:true,message:'找房类型必填'}]">
                    <template #input>
                        <van-radio-group v-model="currentData.houseType" direction="horizontal">
                            <van-radio v-for="dic in houseType" :key="dic.code" :name="dic.code">{{dic.name}}
                            </van-radio>
                        </van-radio-group>
                    </template>
                </van-field>

                <van-field label="需求面积" name="needAcreage"
                           type="number"
                           v-model="currentData.needAcreage"
                           :rules="[{required:true,message:'需求面积必填'}]"
                           placeholder="填写客户大致需要的面积大小">
                    <template #button>㎡</template>
                </van-field>
                <van-row>
                    <van-col span="12">
                        <van-field center label="期望价格" type="number" name="needPrice" v-model="currentData.needPrice"
                                   placeholder="出租单价"
                                   :rules="[{required: true,message:'楼层出租单价必填'}]">
                        </van-field>
                    </van-col>
                    <van-col sapn="12">
                        <van-field label="" name="priceUnit" :rules="[{required: true,message:'单位必填'}]">
                            <template #input>
                                <van-radio-group v-model="currentData.priceUnit">
                                    <van-radio v-for="dic in priceUnitType" :name="dic.code" :key="dic.code">
                                        {{dic.name}}
                                    </van-radio>
                                </van-radio-group>
                            </template>
                        </van-field>
                    </van-col>
                </van-row>
                <van-field label="楼层要求" name="needLayer" :rules="[{required:true,message:'楼层要求必填'}]">
                    <template #input>
                        <van-radio-group v-model="currentData.needLayer" direction="horizontal">
                            <van-radio v-for="dic in customerNeedLayerType" :key="dic.code" :name="dic.code">
                                {{dic.name}}
                            </van-radio>
                        </van-radio-group>
                    </template>
                </van-field>
                <van-field label="层高要求" name="layerHeight" type="number"
                           v-model="currentData.layerHeight"
                           placeholder="填写客户最低层高要求">
                    <template #button>米</template>
                </van-field>
                <van-field label="电量要求" name="needVoltage" type="number"
                           v-model="currentData.needVoltage"
                           placeholder="填写客户电量要求">
                    <template #button>KVA</template>
                </van-field>
                <van-field label="最晚入住" name="enterTime" v-model="enterTimerString" readonly clickable
                           @click="enterTimeSelectVisible=true"
                           placeholder="请选择时间">
                </van-field>
                <van-field label="期望租期" name="rentLong" type="number"
                           v-model="currentData.rentLong"
                           placeholder="填写客户期望租期">
                    <template #button>月</template>
                </van-field>
                <van-field label="消防要求" name="fireDeviceTypeList">
                    <template #input>
                        <van-checkbox-group v-model="currentData.fireDeviceTypeList" direction="horizontal">
                            <van-checkbox v-for="dic in fireDeviceType" :key="dic.code" :name="dic.code">
                                {{dic.name}}
                            </van-checkbox>
                        </van-checkbox-group>
                    </template>
                </van-field>
                <van-field label="需要环评" name="needEia">
                    <template #input>
                        <van-radio-group v-model="currentData.needEia" direction="horizontal">
                            <van-radio :name="true">是</van-radio>
                            <van-radio :name="false">否</van-radio>
                        </van-radio-group>
                    </template>
                </van-field>
                <van-field label="需要注册" name="needRegister">
                    <template #input>
                        <van-radio-group v-model="currentData.needRegister" direction="horizontal">
                            <van-radio :name="true">是</van-radio>
                            <van-radio :name="false">否</van-radio>
                        </van-radio-group>
                    </template>
                </van-field>
                <van-field label="需要产证" name="needCertificate">
                    <template #input>
                        <van-radio-group v-model="currentData.needCertificate" direction="horizontal">
                            <van-radio :name="true">是</van-radio>
                            <van-radio :name="false">否</van-radio>
                        </van-radio-group>
                    </template>
                </van-field>
                <van-field label="需要办公" name="needOffice">
                    <template #input>
                        <van-radio-group v-model="currentData.needOffice" direction="horizontal">
                            <van-radio :name="true">是</van-radio>
                            <van-radio :name="false">否</van-radio>
                        </van-radio-group>
                    </template>
                </van-field>
                <van-field label="需要独栋" name="needSingleBuilding">
                    <template #input>
                        <van-radio-group v-model="currentData.needSingleBuilding" direction="horizontal">
                            <van-radio :name="true">是</van-radio>
                            <van-radio :name="false">否</van-radio>
                        </van-radio-group>
                    </template>
                </van-field>
                <van-field label="需要独院" name="needSinglePark">
                    <template #input>
                        <van-radio-group v-model="currentData.needSinglePark" direction="horizontal">
                            <van-radio :name="true">是</van-radio>
                            <van-radio :name="false">否</van-radio>
                        </van-radio-group>
                    </template>
                </van-field>

                <van-field label="更多需求" name="remark" v-model="currentData.remark" type="textarea" rows="2" autosize
                           placeholder="客户更多需求描述">
                </van-field>

                <van-field center label="需求区域" name="areas" readonly>
                    <template #input>
                        <van-tag v-for="(area,index) in currentData.areas" :key="index" type="primary" plain closeable
                                 @close="()=>onAreaDeleteClick(index)">
                            {{`${area.cityName}${area.regionName}${area.streetName}`}}
                        </van-tag>
                    </template>
                    <template #button>
                        <van-tag size="small" type="primary" @click="onAreaSelectClick">
                            <van-icon name="plus"></van-icon>
                        </van-tag>
                    </template>
                </van-field>

                <van-button style="position: fixed;bottom: 0px" block type="primary" native-type="submit">提交
                </van-button>
            </van-form>
        </van-popup>

        <van-calendar v-model="enterTimeSelectVisible" @confirm="onEnterTimeSubmitOk"></van-calendar>
        <AreaSelect :visible="areaSelectVisible" :on-submit-ok="onAreaSelectSubmitOk" :on-cancel="onAreaSelectCancel"/>

        <van-overlay :show="loading" z-index="9999">
            <van-loading class="wrapper" type="spinner" size="50px" text-size="15" vertical>加载中...</van-loading>
        </van-overlay>
    </div>
</template>

<script>
    import {
        Toast,Popup, Form, Field, Button, Overlay, Loading, RadioGroup, Radio,CheckboxGroup, Checkbox, Calendar, Icon, Tag, Row, Col
    } from 'vant';
    import AreaSelect from "../../base/AreaSelect";
    import {request, Utils} from "../../base/CiiUtils";
    import {dictionaryStorage} from "../../base/DictionaryStorage";

    export default {
        name: "CustomerEdit",
        components: {
            AreaSelect,
            [Popup.name]: Popup,
            [Form.name]: Form,
            [Field.name]: Field,
            [Button.name]: Button,
            [Overlay.name]: Overlay,
            [Loading.name]: Loading,
            [Radio.name]: Radio,
            [RadioGroup.name]: RadioGroup,
            [Checkbox.name]: Checkbox,
            [CheckboxGroup.name]: CheckboxGroup,
            [Calendar.name]: Calendar,
            [Icon.name]: Icon,
            [Tag.name]: Tag,
            [Row.name]: Row,
            [Col.name]: Col
        },
        data: function () {

            return {
                loading: false,
                currentData: {
                    cusName: null,
                    cusPhone: null,
                    sex: null,
                    product:null,
                    houseType: null,

                    needAcreage: null,
                    needPrice: null,
                    priceUnit: null,
                    needLayer: null,
                    layerHeight: null,
                    needVoltage: null,
                    enterTime: null,
                    rentLong: null,
                    fireDeviceTypeList: [],
                    needEia: null,
                    needRegister: null,
                    needCertificate: null,
                    needOffice: null,
                    needSingleBuilding: null,
                    needSinglePark: null,

                    areas: [],
                    remark: null,
                },
                areaSelectVisible: false,
                enterTimeSelectVisible:false
            }
        },
        props: {
            editor: {
                type: Boolean,
                required: true,
                default: function () {
                    return false;
                }
            },
            visible: {
                type: Boolean
            },
            position: {
                default() {
                    return "bottom";
                }
            },
            height: {
                default() {
                    return "80%";
                }
            },
            width: {
                default() {
                    return "100%";
                }
            },
            onCancel: {
                type: Function
            },
            onSubmitOk: {
                type: Function
            }
        },
        computed: {
            editVisible: {
                get: function () {
                    return this.visible;
                },
                set: function () {
                    this.onEditCancel()
                }
            },
            enterTimerString() {
                return Utils.dateFormat(this.currentData.enterTime,'yyyy-MM-dd');
            },
            sexType: {
                get() {
                    return dictionaryStorage.get("com.ciiframework.common.dictionary.SexType")
                }
            },
            priceUnitType() {
                return dictionaryStorage.get("com.cii.bomsp.house.base.dictionary.PriceUnitType")
            },
            customerNeedLayerType() {
                return dictionaryStorage.get("com.cii.bomsp.crm.customer.dictionary.CustomerNeedLayerType")
            },
            fireDeviceType() {
                return dictionaryStorage.get("com.cii.bomsp.house.base.dictionary.FireDeviceType")
            },
            houseType() {
                return dictionaryStorage.get("com.cii.bomsp.house.base.dictionary.HouseType")
            },
        },

        methods: {
            trueOrFalseValidator(value) {
                return value === true || value === false;
            },
            //当是编辑的时候，调用此方法传入需要编辑的数据
            initCurrentData(currentData) {
                Object.assign(this.currentData, currentData);
            },

            onBackClick: function () {
                this.$router.back();
            },
            onEditCancel() {
                this.onCancel()
            },
            onEditSubmitOk() {
                // this.$refs.formEdit.validate().then(()=>{
                //     //表单校验通过
                //
                // }).catch(()=>{
                // });
                if (this.currentData.areas.length < 1) {
                    Toast.fail("客户需求区域必填");
                    return;
                }
                this.loading = true;

                let _url = this.editor?"customer/update":"customer/create";

                request({
                    conf:{
                        url:_url,
                        data:{
                            entity:this.currentData
                        }
                    },
                    success:()=>{
                        if (this.onSubmitOk){
                            this.onSubmitOk();
                        }
                    },
                    finally:()=> {
                        this.loading = false;
                    }
                })
            },
            onEnterTimeSubmitOk(date) {
                this.enterTimeSelectVisible = false;
                this.currentData.enterTime = date;
            },
            onAreaSelectClick() {
                this.areaSelectVisible = true;
            },
            onAreaSelectCancel() {
                this.areaSelectVisible = false;
            },
            onAreaSelectSubmitOk(area) {
                this.areaSelectVisible = false;
                this.currentData.areas.push({
                    cityId: area.cityId,
                    cityName: area.cityName,
                    regionId: area.regionId,
                    regionName: area.regionName,
                    streetId: area.streetId,
                    streetName: area.streetName,
                    communityId: area.communityId,
                    communityName: area.communityName
                });
            },
            onAreaDeleteClick(index) {
                this.currentData.areas.splice(index, 1);
            },
        }

    }
</script>

<style scoped>
    .wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        color: #ffffff;
    }
</style>