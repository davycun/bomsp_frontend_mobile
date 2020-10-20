<template>
    <div>
        <van-popup v-model="editVisible" :position="position" :style="{height:height,width:width}">
            <van-form @submit="onEditSubmitOk"  label-align="right" colon scroll-to-error style="margin-bottom: 50px">

                <van-field label="省市区"
                           name="location"
                           readonly
                           clickable
                           :value="areaString"
                           :rules="[{required: true,message:'省市区必填'}]"
                           @click="onAreaSelectClick"
                           placeholder="请选择省市区">

                </van-field>
                <van-field label="详细地址" name="address"
                           v-model="currentData.address"
                           :rules="[{required:true,message: '详细地址必填'}]"
                           placeholder="道路和门牌号"></van-field>
                <van-field label="地图坐标"
                           readonly
                           clickable
                           name="point"
                           :value="point"
                           :rules="[{required: true,message:'地图坐标必填'}]"
                           @click="onPointSelectClick"
                           placeholder="请选择坐标">
                </van-field>
                <van-field label="出租类型"
                           :rules="[{required:true,message:'出租类型必填'}]"
                           name="leaseType">
                    <template #input>
                        <van-radio-group v-model="currentData.leaseType" direction="horizontal">
                            <van-radio v-for="dic in leaseType" :key="dic.code" :name="dic.code">{{dic.name}}
                            </van-radio>
                        </van-radio-group>
                    </template>
                </van-field>
                <van-field label="可租面积"
                           type="number"
                           v-model="currentData.leaseAcreage"
                           :rules="[{required:true,message:'可租面积必填'}]"
                           name="leaseAcreage"
                           placeholder="请填写房源可租面积">
                    <template #button>
                        平米
                    </template>
                </van-field>
                <van-field label="起租面积"
                           type="number"
                           v-model="currentData.leaseAcreageMin"
                           :rules="[{required:true,message:'起租面积必填'}]"
                           name="leaseAcreageMin"
                           placeholder="请填写房源可租面积">
                    <template #button>
                        平米
                    </template>
                </van-field>
                <van-row>
                    <van-col span="12">
                        <van-field center
                                   label="单价"
                                   type="number"
                                   name="price"
                                   v-model="currentData.price"
                                   :rules="[{required: true,message:'楼层出租单价必填'}]"
                                   placeholder="出租单价">
                        </van-field>
                    </van-col>
                    <van-col sapn="12">
                        <van-field label=""
                                   :rules="[{required: true,message:'单位必填'}]"
                                   name="priceUnit">
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
                <van-field label="地坪类型"
                           center
                           :rules="[{required: true,message:'单位必填'}]"
                           name="floorBoardType">
                    <template #input>
                        <van-radio-group v-model="currentData.floorBoardType" direction="horizontal">
                            <van-radio v-for="dic in floorBoardType" :name="dic.code" :key="dic.code">{{dic.name}}
                            </van-radio>
                        </van-radio-group>
                    </template>
                </van-field>
                <van-field label="层高"
                           type="number"
                           v-model="currentData.floorHeight"
                           :rules="[{required:true,message:'层高必填'}]"
                           name="floorHeight"
                           placeholder="楼层层高">
                    <template #button>
                        米
                    </template>
                </van-field>

                <van-field label="消防设施" name="fireDeviceTypeList" :rules="[{required: true,message:'消防设施必填'}]">
                    <template #input>
                        <van-checkbox-group v-model="currentData.fireDeviceTypeList" direction="horizontal">
                            <van-checkbox v-for="dic in fireDeviceType" :key="dic.code" :name="dic.code">{{dic.name}}
                            </van-checkbox>
                        </van-checkbox-group>
                    </template>
                </van-field>
                <van-field label="适合行业" name="fitIndustryList" :rules="[{required: true,message:'适合行业必填'}]">
                    <template #input>
                        <div style="max-height: 200px;overflow: auto;width:100%">
                            <van-checkbox-group v-model="currentData.fitIndustryList">
                                <van-checkbox v-for="dic in industry" :key="dic.code" :name="dic.code">{{dic.name}}
                                </van-checkbox>
                            </van-checkbox-group>
                        </div>
                    </template>
                </van-field>
                <van-field label="证件类型" name="certificateTypeList" :rules="[{required: true,message:'适合行业必填'}]">
                    <template #input>
                        <van-checkbox-group v-model="currentData.certificateTypeList" direction="horizontal">
                            <van-checkbox v-for="dic in certificateType" :key="dic.code" :name="dic.code">{{dic.name}}
                            </van-checkbox>
                        </van-checkbox-group>
                    </template>
                </van-field>


                <van-field label="公司注册" name="canRegistry"
                           :rules="[{validator:trueOrFalseValidator,message:'是否可注册必填'}]">
                    <template #input>
                        <van-radio-group v-model="currentData.canRegistry" direction="horizontal">
                            <van-radio :name="true">可注册</van-radio>
                            <van-radio :name="false">不可注册</van-radio>
                        </van-radio-group>
                    </template>
                </van-field>
                <van-field label="监控设施" name="hasMonitor" :rules="[{validator:trueOrFalseValidator,message:'监控设施必填'}]">
                    <template #input>
                        <van-radio-group v-model="currentData.hasMonitor" direction="horizontal">
                            <van-radio :name="true">有监控</van-radio>
                            <van-radio :name="false">无监控</van-radio>
                        </van-radio-group>
                    </template>
                </van-field>
                <van-field label="园区安保" name="hasGuard" :rules="[{validator:trueOrFalseValidator,message:'园区安保必填'}]">
                    <template #input>
                        <van-radio-group v-model="currentData.hasGuard" direction="horizontal">
                            <van-radio :name="true">有安保</van-radio>
                            <van-radio :name="false">无安保</van-radio>
                        </van-radio-group>
                    </template>
                </van-field>
                <van-field label="配套食堂" name="hasCanteen"
                           :rules="[{validator:trueOrFalseValidator,message:'配套食堂必填',}]">
                    <template #input>
                        <van-radio-group v-model="currentData.hasCanteen" direction="horizontal">
                            <van-radio :name="true">有食堂</van-radio>
                            <van-radio :name="false">无食堂</van-radio>
                        </van-radio-group>
                    </template>
                </van-field>
                <van-field label="办公区" name="hasOffice" :rules="[{validator:trueOrFalseValidator,message:'办公区必填'}]">
                    <template #input>
                        <van-radio-group v-model="currentData.hasOffice" direction="horizontal">
                            <van-radio :name="true">有办公区</van-radio>
                            <van-radio :name="false">无办公区</van-radio>
                        </van-radio-group>
                    </template>
                </van-field>
                <van-field label="停车位" name="hasParkingSpace"
                           :rules="[{validator:trueOrFalseValidator,message:'停车位必填'}]">
                    <template #input>
                        <van-radio-group v-model="currentData.hasParkingSpace" direction="horizontal">
                            <van-radio :name="true">有停车位</van-radio>
                            <van-radio :name="false">无停车位</van-radio>
                        </van-radio-group>
                    </template>
                </van-field>
                <van-field label="独门独院" name="singlePark" :rules="[{validator:trueOrFalseValidator,message:'独门独院必填'}]">
                    <template #input>
                        <van-radio-group v-model="currentData.singlePark" direction="horizontal">
                            <van-radio :name="true">是</van-radio>
                            <van-radio :name="false">否</van-radio>
                        </van-radio-group>
                    </template>
                </van-field>
                <van-field label="周转场地" type="number" name="openSpaceAcreage"
                           v-model="currentData.openSpaceAcreage"
                           :rules="[{required: true,message:'周转场地必填'}]"
                           placeholder="园区空地面积，车辆周转">
                    <template #button>
                        平米
                    </template>
                </van-field>

                <van-field label="配电量" name="voltage" type="number" placeholder="配电量单位为KVA"
                           :rules="[{required: true,message:'配电量必填'}]"
                           v-model="currentData.voltage">
                    <template #button>
                        KVA
                    </template>
                </van-field>

                <van-field label="税收要求" name="hasTax" :rules="[{validator:trueOrFalseValidator,message:'税收必填'}]">
                    <template #input>
                        <van-radio-group v-model="currentData.hasTax" direction="horizontal">
                            <van-radio :name="true">有要求</van-radio>
                            <van-radio :name="false">无要求</van-radio>
                        </van-radio-group>
                    </template>
                </van-field>


                <van-field label="建筑结构" name="structureType" :rules="[{required: true,message:'建筑结构必填'}]">
                    <template #input>
                        <van-radio-group v-model="currentData.structureType" direction="horizontal">
                            <van-radio v-for="dic in buildingStructureType" :name="dic.code" :key="dic.code">
                                {{dic.name}}
                            </van-radio>
                        </van-radio-group>
                    </template>
                </van-field>


                <van-field label="是否单层" name="singleFloor" :rules="[{validator:trueOrFalseValidator,message:'是否单层必填'}]">
                    <template #input>
                        <van-radio-group v-model="currentData.singleFloor" direction="horizontal">
                            <van-radio :name="true">单层</van-radio>
                            <van-radio :name="false">多层</van-radio>
                        </van-radio-group>
                    </template>
                </van-field>

                <van-field label="电梯" name="hasLift" :rules="[{validator:trueOrFalseValidator,message:'税收必填'}]">
                    <template #input>
                        <van-radio-group v-model="currentData.hasLift" direction="horizontal">
                            <van-radio :name="true">有电梯</van-radio>
                            <van-radio :name="false">无电梯</van-radio>
                        </van-radio-group>
                    </template>
                </van-field>

                <van-field v-if="currentData.hasLift===true" label="电梯数量" type="digit" name="liftCount"
                           v-model="currentData.liftCount"
                           placeholder="填写总共电梯数量"
                           :rules="[{required: currentData.hasLift===true,message:'电梯数量必填'}]">
                </van-field>
                <van-field v-if="currentData.hasLift===true" label="电梯承重" type="number" name="liftBearing"
                           v-model="currentData.liftBearing"
                           placeholder="填写每部电梯的承重"
                           :rules="[{required: currentData.hasLift===true,message:'电梯承重必填'}]">
                    <template #button>吨</template>
                </van-field>

                <van-field label="地面承重" type="number" name="bearing" v-model="currentData.bearing"
                           placeholder="楼层单位面积承重"
                           :rules="[{required: true,message:'承重必填'}]">
                    <template #button>吨/平米</template>
                </van-field>


                <van-field label="有杭车否" name="hasBridgeCrane"
                           :rules="[{validator:trueOrFalseValidator,message:'有无杭车必填'}]">
                    <template #input>
                        <van-radio-group v-model="currentData.hasBridgeCrane" direction="horizontal">
                            <van-radio :name="true">有行车</van-radio>
                            <van-radio :name="false">无行车</van-radio>
                        </van-radio-group>
                    </template>
                </van-field>

                <van-field label="房东电话" name="contactPhone"
                           v-model="currentData.contactPhone"
                           :rules="[{required:true,message:'请填写正确的电话',pattern:Utils.phoneReg}]"
                           placeholder="请填写房源联系人电话">
                </van-field>
                <van-field label="房东姓名" name="contactName"
                           v-model="currentData.contactName"
                           :rules="[{required:true,message:'房源联系人姓名必填'}]"
                           placeholder="请填写房源联系人电话">
                </van-field>

                <van-field label="房源对外照片" name="housePublicImagesList" :rules="[{required: true,message:'图片必填'}]">
                    <template #input>
                        <van-uploader v-model="housePublicImagesList" multiple></van-uploader>
                    </template>
                </van-field>
                <van-field label="房源隐私照片" name="housePrivateImagesList" :rules="[{required: true,message:'图片必填'}]">
                    <template #input>
                        <van-uploader v-model="housePrivateImagesList" multiple></van-uploader>
                    </template>
                </van-field>

                <van-button style="position: fixed;bottom: 0px" block type="primary" native-type="submit">提交</van-button>
            </van-form>

        </van-popup>

        <AreaSelect :visible="areaSelectVisible"
                    :on-cancel="onAreaSelectCancel"
                    :on-submit-ok="onAreaSelectSubmitOk"/>
        <MapPointSelect :visible="pointSelectVisible"
                        :address-data="pointSelectAddress"
                        :on-cancel="onPointSelectCancel"
                        :on-submit-ok="onPointSelectSubmitOk"/>

        <van-overlay :show="loading" z-index="9999">
            <van-loading class="wrapper" type="spinner" size="50px" text-size="15" vertical>加载中...</van-loading>
        </van-overlay>

    </div>
</template>

<script>
    import {
        Popup,
        Form,
        Field,
        Button,
        Toast,
        Radio,
        RadioGroup,
        Row,
        Col,
        CheckboxGroup,
        Checkbox,
        Uploader,
        Overlay,
        Loading
    } from 'vant';
    import AreaSelect from "../../base/AreaSelect";
    import MapPointSelect from "../../base/MapPointSelect";
    import {dictionaryStorage} from "../../base/DictionaryStorage";
    import {Utils, request} from "../../base/CiiUtils";
    import {Constants} from "../../base/Constants";

    export default {
        name: "WorkshopEdit",
        components: {
            MapPointSelect,
            AreaSelect,
            [Popup.name]: Popup,
            [Form.name]: Form,
            [Field.name]: Field,
            [Button.name]: Button,
            [Radio.name]: Radio,
            [RadioGroup.name]: RadioGroup,
            [Row.name]: Row,
            [Col.name]: Col,
            [CheckboxGroup.name]: CheckboxGroup,
            [Checkbox.name]: Checkbox,
            [Uploader.name]: Uploader,
            [Overlay.name]:Overlay,
            [Loading.name]:Loading
        },
        data: function () {

            return {
                Utils: Utils,
                currentData: {
                    cityId: null,
                    cityName: null,
                    regionId: null,
                    regionName: null,
                    streetId: null,
                    streetName: null,
                    communityId: null,
                    communityName: null,
                    address: null,
                    longitude: null,
                    latitude: null,
                    houseType: "WorkShop",
                    leaseType: null,
                    leaseAcreage: null,
                    leaseAcreageMin: null,
                    price: null,
                    priceUnit: null,
                    floorBoardType: null,
                    floorHeight: null,
                    fireDeviceTypeList: [],
                    fitIndustryList: [],
                    certificateTypeList: [],
                    contactPhone: null,
                    contactName: null,
                    housePublicImagesList: [],
                    housePrivateImagesList: [],
                    canRegistry: null,
                    hasMonitor: null,
                    hasGuard: null,
                    hasCanteen: null,
                    hasOffice: null,
                    hasParkingSpace: null,
                    singlePark: null,
                    openSpaceAcreage: null,
                    voltage: null,
                    hasTax: null,
                    structureType: null,
                    singleFloor: null,
                    hasLift: null,
                    liftCount: null,
                    liftBearing: null,
                    bearing: null,
                    hasBridgeCrane: null
                },
                housePublicImagesList: [],
                housePrivateImagesList: [],
                areaSelectVisible: false,
                pointSelectVisible: false,
                pointSelectAddress: {},
                loading:false
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
            areaString: {
                get: function () {
                    return `${this.currentData.cityName || ""}${this.currentData.regionName || ""}${this.currentData.streetName || ""}${this.currentData.communityName || ""}`;
                }
            },
            point: {
                get: function () {
                    if (this.currentData.longitude) {
                        return `${this.currentData.longitude},${this.currentData.latitude}`;
                    }
                    return '';
                }
            },
            leaseType: {
                get() {
                    return dictionaryStorage.get("com.cii.bomsp.house.base.dictionary.LeaseType")
                }
            },
            priceUnitType: {
                get() {
                    return dictionaryStorage.get("com.cii.bomsp.house.base.dictionary.PriceUnitType")
                }
            },
            floorBoardType: {
                get() {
                    return dictionaryStorage.get("com.cii.bomsp.house.base.dictionary.FloorBoardType")
                }
            },
            fireDeviceType: {
                get() {
                    return dictionaryStorage.get("com.cii.bomsp.house.base.dictionary.FireDeviceType")
                }
            },
            industry: {
                get() {
                    return dictionaryStorage.get("com.cii.bomsp.common.dictionary.Industry")
                }
            },
            certificateType: {
                get() {
                    return dictionaryStorage.get("com.cii.bomsp.house.base.dictionary.CertificateType")
                }
            },
            buildingStructureType: {
                get() {
                    return dictionaryStorage.get("com.cii.bomsp.house.base.dictionary.BuildingStructureType")
                }
            },
        },

        methods: {

            //当是编辑的时候，调用此方法传入需要编辑的数据
            initCurrentData(editData) {
                Object.assign(this.currentData, editData);

                if (editData.housePublicImagesList) {
                    this.housePublicImagesList = editData.housePublicImagesList.map((f) => {
                        return {
                            url: window.location.origin + Constants.fileReadUrl + f,
                            isImage: true,
                            fileId: f,
                        }
                    });
                }
                if (editData.housePrivateImagesList) {
                    this.housePrivateImagesList = editData.housePrivateImagesList.map((f) => {
                        return {
                            url: window.location.origin + Constants.fileReadUrl + f,
                            isImage: true,
                            fileId: f,
                        }
                    });
                }
            },

            trueOrFalseValidator(value) {
                return value === true || value === false;
            },

            onBackClick: function () {
                this.$router.back();
            },
            onEditCancel() {
                this.onCancel()
            },
            onEditSubmitOk() {

                // this.$refs.formEdit.validate().then(() => {
                //     //表单校验通过
                // }).catch(() => {
                // });

                if (!this.housePublicImagesList || this.housePublicImagesList.length < 1) {
                    Toast.fail("对外获客图片至少传一张!");
                    return;
                }
                if (!this.housePrivateImagesList || this.housePrivateImagesList.length < 1) {
                    Toast.fail("至少传一张房源隐私照片!");
                    return;
                }

                this.loading = true;
                //内部会调用房源隐私照片上传函数
                //房源隐私照片上传函数会调用房源新增接口
                this.processHousePublicImages();
            },

            processHousePublicImages() {

                //清空图片数组，重新加载
                this.currentData.housePublicImagesList = [];

                let formData = new FormData();
                let hasNewFile = false;

                for (let i = 0; i < this.housePublicImagesList.length; i++) {
                    formData.append("file", this.housePublicImagesList[i].file);

                    if (this.housePublicImagesList[i].fileId) {
                        this.currentData.housePublicImagesList.push(this.housePublicImagesList[i].fileId);
                    } else {
                        hasNewFile = true;
                        formData.append("file", this.housePublicImagesList[i].file);
                    }
                }

                if (hasNewFile) {
                    request({
                        conf: {
                            url: "file/upload",
                            data: formData,
                            headers: {
                                contentType: 'multipart/form-data'
                            }
                        },
                        success: (response) => {
                            response.result.forEach((fl) => {
                                this.currentData.housePublicImagesList.push(fl.id);
                            });
                            this.processHousePrivateImages()
                        }
                    })
                } else {
                    this.processHousePrivateImages()
                }
            },
            processHousePrivateImages() {

                //清空图片数组，重新加载
                this.currentData.housePrivateImagesList = [];

                let formData = new FormData();
                let hasNewFile = false;

                for (let i = 0; i < this.housePrivateImagesList.length; i++) {
                    formData.append("file", this.housePrivateImagesList[i].file);

                    if (this.housePrivateImagesList[i].fileId) {
                        this.currentData.housePrivateImagesList.push(this.housePrivateImagesList[i].fileId);
                    } else {
                        hasNewFile = true;
                        formData.append("file", this.housePrivateImagesList[i].file);
                    }
                }

                if (hasNewFile) {
                    request({
                        conf: {
                            url: "file/upload",
                            data: formData,
                            headers: {
                                contentType: 'multipart/form-data'
                            }
                        },
                        success: (response) => {
                            response.result.forEach((fl) => {
                                this.currentData.housePrivateImagesList.push(fl.id);
                            })

                            this.doRequest()
                        }
                    })
                } else {
                    this.doRequest()
                }
            },
            doRequest() {

                let _url = this.editor ? "workshop/update" : "workshop/create";

                request({
                    conf: {
                        url: _url,
                        data: {
                            entity: this.currentData
                        }
                    },
                    success:()=>{
                        this.loading = false;
                        if (this.onSubmitOk){
                            this.onSubmitOk();
                        }
                    },
                    finally:()=>{
                        this.loading=false;
                    }
                })
            },
            onAreaSelectClick() {
                this.areaSelectVisible = true;

            },
            onAreaSelectCancel() {
                this.areaSelectVisible = false;
            },
            onAreaSelectSubmitOk(values) {
                this.areaSelectVisible = false;
                Object.assign(this.currentData, values);

            },
            onPointSelectClick() {
                if (!this.currentData.cityName || !this.currentData.address) {
                    Toast.fail("请先填写市区及详细地址！");
                    return;
                }

                this.pointSelectAddress = {
                    cityName: this.currentData.cityName,
                    regionName: this.currentData.regionName,
                    streetName: this.currentData.streetName,
                    communityName: this.currentData.communityName,
                    address: this.currentData.address,
                }
                this.pointSelectVisible = true;
            },
            onPointSelectCancel() {
                this.pointSelectVisible = false;
            },
            onPointSelectSubmitOk(point) {
                this.pointSelectVisible = false;
                this.currentData.longitude = point.lng;
                this.currentData.latitude = point.lat;
            }
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