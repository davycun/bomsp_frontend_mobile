<template>
    <div style="margin-top: 100px;">
        <van-nav-bar left-arrow left-text="返回" title="登录" @click-left="onBackClick" fixed></van-nav-bar>

        <van-form @submit="onSubmit">

            <van-field v-model="userPhone"
                       :rules="[{required:true,message:'请填写正确的手机号',pattern:Utils.phoneReg}]"
                       label="手机号" name="userPhone" placeholder="请输入登录手机号">
            </van-field>
            <van-field v-model="secure"
                       :rules="[{required:true,message:'请输入密码'}]"
                       type="password" label="密码" name="secure" placeholder="请输入登录手机号">
            </van-field>

            <div style="margin-top: 30px">
                <van-row gutter="8">
                    <van-col span="12">
                        <van-button block type="default" to="/registry">注册</van-button>
                    </van-col>

                    <van-col span="12">
                        <van-button block type="primary" native-type="submit">登录</van-button>
                    </van-col>
                </van-row>
            </div>
        </van-form>
    </div>
</template>

<script>
    import {NavBar,Form,Field,Row,Col,Button} from 'vant';
    import {request} from "../base/CiiUtils";
    import {Utils} from "../base/CiiUtils";
    import {currentContext} from "../base/CurrentContext";
    import {dictionaryStorage} from "../base/DictionaryStorage";

    export default {
        name: "Login",
        components:{
            [NavBar.name]:NavBar,
            [Form.name]:Form,
            [Field.name]:Field,
            [Row.name]:Row,
            [Col.name]:Col,
            [Button.name]:Button,
        },
        data(){
            return {
                Utils:Utils,
                userPhone:"",
                secure:"",
            }
        },
        methods:{
            onBackClick(){
                this.$router.back();
            },
            onSubmit(values){
                request({
                    conf:{
                        url:"userFrontend/login",
                        data:{
                            entity:values
                        }
                    },
                    success:()=>{
                        currentContext.reload();
                        dictionaryStorage.init();
                        this.$router.back();
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>