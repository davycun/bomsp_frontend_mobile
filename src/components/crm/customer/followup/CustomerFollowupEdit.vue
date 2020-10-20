<template>
    <div>
        <van-nav-bar title="新增跟进"
                     @click-left="onBackClick"
                     left-arrow left-text="返回">
        </van-nav-bar>
        <van-form label-align="right" colon scroll-to-error  @submit="onSubmit">
            <van-field v-model="currentData.cusId"
                       label="客户ID"
                       name="cusId"
                       :rules="[{required:true,message:'客户编码必填'}]"
                       readonly/>
            <van-field name="followupType"
                       :rules="[{required:true,message:'跟进类型必填'}]"
                       label="跟进类型">
                <template #input>
                    <van-radio-group v-model="currentData.followupType" direction="horizontal">
                        <van-radio name="Phone">电话跟进</van-radio>
                        <van-radio name="Scene">实地带看</van-radio>
                    </van-radio-group>
                </template>
            </van-field>
            <van-field name="followupContent"
                       v-model="currentData.followupContent"
                       row="2"
                       autosize
                       type="textarea"
                       :rules="[{required: true,message: '跟进内容必填'}]"
                       placeholder="请输入跟进的内容"
                       label="跟进内容">
            </van-field>
            <van-field label="下次联系时间" name="enterTime" v-model="enterTimerString" readonly clickable
                       @click="nextContactTimeVisible=true"
                       placeholder="请选择时间">
            </van-field>
            <van-field v-if="currentData.followupType == 'Scene'" name="followupImages" label="带看图片">
                <template #input>
                    <van-uploader v-model="followupImagesList" multiple></van-uploader>
                </template>
            </van-field>
            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit">
                    提交
                </van-button>
            </div>
        </van-form>

        <van-calendar v-model="nextContactTimeVisible" @confirm="onNextContactTimerSubmitOk"></van-calendar>
    </div>
</template>

<script>
    import {NavBar, Form, Field, RadioGroup, Radio, Button, Uploader, Popup, Cell, Icon, Tag, Calendar} from 'vant';
    import {request, Utils} from "../../../base/CiiUtils";

    export default {
        name: "CustomerFollowupEdit",
        components: {
            [NavBar.name]: NavBar,
            [Form.name]: Form,
            [Field.name]: Field,
            [RadioGroup.name]: RadioGroup,
            [Radio.name]: Radio,
            [Button.name]: Button,
            [Uploader.name]: Uploader,
            [Popup.name]: Popup,
            [Cell.name]: Cell,
            [Icon.name]: Icon,
            [Tag.name]: Tag,
            [Calendar.name]: Calendar
        },
        data() {
            return {
                nextContactTimeVisible: false,
                currentData: {
                    cusId: this.$route.params.cusId,
                    followupType: '',
                    followupContent: '',
                    followupImages: '',
                    followupImagesList: [],
                    nextContactTime: null
                },
                followupImagesList: []
            }
        },
        computed:{
            enterTimerString() {
                return Utils.dateFormat(this.currentData.nextContactTime,'yyyy-MM-dd');
            },
        },
        methods: {
            onBackClick() {
                this.$router.back();
            },
            onNextContactTimerSubmitOk(date) {
                this.nextContactTimeVisible = false;
                this.currentData.nextContactTime = date;
            },
            onSubmit() {

                if (this.followupImagesList.length > 0) {

                    let formData = new FormData();
                    for (let i = 0; i < this.followupImages.length; i++) {
                        let fl = this.followupImages[i];
                        formData.append("file", fl.file);
                    }
                    request({
                        conf: {
                            url: '/file/upload',
                            data: formData,
                            headers: {
                                contentType: 'multipart/form-data'
                            }
                        },
                        success: (response) => {
                            for (let j = 0; j < response.result.length; j++) {
                                this.currentData.followupImagesList.push(response.result[j].id);
                            }
                            this.doRequest();

                        }
                    });
                } else {
                    this.doRequest();
                }

            },
            doRequest() {

                let _url = 'customerFollowup/create';
                // if (this.$route.params.cusStatus === 'WaitProcess') {
                //     _url = 'customerIndustryFollowup/process';
                // }
                request({
                    conf: {
                        url: _url,
                        data: {
                            entity: this.currentData
                        }
                    },
                    success: () => {
                        this.$router.back();
                    }
                })
            },
        }
    }
</script>

<style scoped>

</style>