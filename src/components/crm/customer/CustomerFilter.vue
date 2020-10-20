<template>
    <div>
        <van-popup v-model="filterVisible" :style="{height:height,width:width}" position="right">
            <van-form>
                <van-field v-model="filterCondition.id"
                           name="cusId"
                           label="客户ID"
                           placeholder="请输入客户ID">
                </van-field>
                <van-field v-model="filterCondition.cusName"
                           name="cusName"
                           label="客户姓名"
                           placeholder="请输入客户姓名">
                </van-field>
                <van-field v-model="filterCondition.cusPhone"
                           name="cusPhone"
                           label="客户电话"
                           placeholder="请输入客户电话">
                </van-field>
                <van-field name="cusStatus" label="客户状态">
                    <template #input>
                        <van-radio-group v-model="filterCondition.cusState" direction="horizontal">
                            <van-radio v-for="cs in customerState" :name="cs.code" :key="cs.code">{{cs.name}}</van-radio>
                        </van-radio-group>
                    </template>
                </van-field>
                <van-field v-model="filterCondition.needAcreageStart"
                           type="number"
                           name="needAcreageStart"
                           label="面积大于"
                           placeholder="客户需求面积大于">
                </van-field>
                <van-field v-model="filterCondition.needAcreageEnd"
                           type="number"
                           name="needAcreageEnd"
                           label="面积小于"
                           placeholder="客户需求面积小于">
                </van-field>
            </van-form>
            <van-row style="position: fixed;bottom: 0px;width: 100%;">
                <van-col span="12">
                    <van-button type="default" block @click="onFilterReset">重置</van-button>
                </van-col>
                <van-col span="12">
                    <van-button type="primary" block @click="onFilterSubmitOk">确定</van-button>
                </van-col>
            </van-row>

        </van-popup>
    </div>
</template>

<script>
    import {Popup, Button, Form, Field, RadioGroup, Radio, Row, Col} from 'vant';
    import {dictionaryStorage} from "../../base/DictionaryStorage";

    export default {
        name: "CustomerFilter",
        components: {
            [Popup.name]: Popup,
            [Button.name]: Button,
            [Form.name]: Form,
            [Field.name]: Field,
            [RadioGroup.name]: RadioGroup,
            [Radio.name]: Radio,
            [Row.name]: Row,
            [Col.name]: Col
        },
        data(){
            return {
                filterCondition: {
                    cusId: null,
                    cusName: null,
                    cusState: null,
                    needAcreageStart:null,
                    needAcreageEnd:null,
                }
            }
        },
        props:{
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
                    return "100%";
                }
            },
            width: {
                default() {
                    return "70%";
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
            filterVisible: {
                get: function () {
                    return this.visible
                },
                set: function () {
                    this.onCancel()
                }
            },
            customerState: function () {
                return dictionaryStorage.get("com.cii.bomsp.crm.customer.dictionary.CustomerState")
            }
        },
        methods:{
            onFilterSubmitOk() {
                if (this.onSubmitOk) {
                    this.onSubmitOk(this.filterCondition);
                }
            },
            onFilterCancel() {
                if (this.onCancel) {
                    this.onCancel();
                }
            },
            onFilterReset() {
                this.filterCondition = {
                    cusId: null,
                    cusName: null,
                    cusStatus: null,
                    needAcreageStart:null,
                    needAcreageEnd:null,
                }
                if (this.onSubmitOk) {
                    this.onSubmitOk(this.filterCondition);
                }
            }
        }
    }
</script>

<style scoped>

</style>