<template>
    <div>
        <van-popup v-model="editVisible" :position="position" :style="{height:height,width:width}">
            <van-form @submit="onEditSubmitOk" label-align="right" colon scroll-to-error style="margin-bottom: 50px">


                <van-button style="position: fixed;bottom: 0px" block type="primary" native-type="submit">提交</van-button>
            </van-form>
        </van-popup>

        <van-overlay :show="loading" z-index="9999">
            <van-loading class="wrapper" type="spinner" size="50px" text-size="15" vertical>加载中...</van-loading>
        </van-overlay>
    </div>
</template>

<script>
    import {Popup,Form,Field,Button,Overlay,Loading} from 'vant';

    export default {
        name: "OfficeEdit",
        components: {
            [Popup.name]: Popup,
            [Form.name]:Form,
            [Field.name]:Field,
            [Button.name]:Button,
            [Overlay.name]:Overlay,
            [Loading.name]:Loading
        },
        data: function () {

            return {
                loading:false,
                currentData:{

                }
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
        computed:{
            editVisible:{
                get:function(){
                    return this.visible;
                },
                set:function(){
                    this.onEditCancel()
                }
            }
        },

        methods: {

            //当是编辑的时候，调用此方法传入需要编辑的数据
            initCurrentData(currentData){
                Object.assign(this.currentData,currentData);
            },

            onBackClick: function () {
                this.$router.back();
            },
            onEditCancel(){
                this.onCancel()
            },
            onEditSubmitOk(){
                // this.$refs.formEdit.validate().then(()=>{
                //     //表单校验通过
                //
                // }).catch(()=>{
                // });
                this.loading = true;
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