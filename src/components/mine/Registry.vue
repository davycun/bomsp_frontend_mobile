<template>
    <div style="margin-top: 60px;">
        <van-nav-bar left-arrow left-text="返回" title="注册用户" @click-left="onBackClick" fixed></van-nav-bar>

        <van-form label-align="right" colon @submit="onSubmitOk">

            <van-field label="手机号" name="userPhone"
                       v-model="user.userPhone"
                       :rules="[{required:true,message:'请填写正确的手机号',pattern:Utils.phoneReg}]"
                       placeholder="请输入手机号码"></van-field>
            <van-field label="用户姓名" name="userName"
                       v-model="user.userName"
                       :rules="[{required: true,message: '姓名必填'}]"
                       placeholder="输入您的姓名"></van-field>
            <van-field label="密码" name="secure" type="password"
                       v-model="user.secure"
                       :rules="[{required: true,message: '输入密码请牢记'}]"
                       placeholder="输入您的姓名"></van-field>
            <van-field label="再次密码" name="password" type="password"
                       v-model="user.password"
                       :rules="[{required: true,message: '输入密码请牢记'}]"
                       placeholder="输入您的姓名"></van-field>
            <van-field label="性别" name="sex" :rules="[{required:true,message:'性别必填'}]">
                <template #input>
                    <van-radio-group v-model="user.sex" direction="horizontal">
                        <van-radio name="Sir">先生</van-radio>
                        <van-radio name="Lady">女士</van-radio>
                    </van-radio-group>
                </template>
            </van-field>
            <van-field label="角色" name="userType" :rules="[{required:true,message:'角色必填'}]">
                <template #input>
                    <van-radio-group v-model="user.userType" direction="horizontal">
                        <van-radio name="HouseOwner">业主</van-radio>
                        <van-radio name="Agent">经纪人</van-radio>
                        <van-radio name="Customer">租房</van-radio>
                    </van-radio-group>
                </template>
            </van-field>
            <van-row style="margin-top: 30px" gutter="8">
                <van-col span="12">
                    <van-button block type="default" native-type="reset">重置</van-button>
                </van-col>
                <van-col span="12">
                    <van-button block type="primary" native-type="submit">注册</van-button>
                </van-col>
            </van-row>
        </van-form>


    </div>
</template>

<script>
    import {NavBar, Form, Field, RadioGroup, Radio, Button, Row, Col, Toast} from 'vant'
    import {request, Utils} from "../base/CiiUtils";

    export default {
        name: "Registry",
        components: {
            [NavBar.name]: NavBar,
            [Form.name]: Form,
            [Field.name]: Field,
            [RadioGroup.name]: RadioGroup,
            [Radio.name]: Radio,
            [Button.name]: Button,
            [Row.name]: Row,
            [Col.name]: Col,
        },
        data() {
            return {
                Utils: Utils,
                user: {
                    userPhone: "",
                    userName: "",
                    secure: "",
                    password: "",
                    sex: "",
                    userType: ""
                }
            }
        },
        computed: {},
        methods: {
            onBackClick() {
                this.$router.back();
            },
            onSubmitOk(values) {

                if (values.password !== values.secure) {
                    Toast.fail("两次密码不一致");
                    return;
                }

                request({
                    conf: {
                        url: "userFrontend/registry",
                        data: {
                            entity: values
                        }
                    },
                    success:()=>{
                        this.$router.replace("/login");
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>