<template>
    <div>
        <van-sticky>
            <van-nav-bar left-arrow left-text="返回" title="厂房列表" @click-left="onBackClick"></van-nav-bar>
            <van-row>
                <van-col span="21">
                    <van-search v-model="keyword"
                                @search="onKeywordSearch">
                    </van-search>
                </van-col>
                <van-col span="3">
                    <van-icon style="padding-top: 12px"
                              size="32"
                              @click="onFilterClick"
                              name="filter-o"></van-icon>
                </van-col>
            </van-row>
        </van-sticky>

        <van-pull-refresh v-model="refreshing"
                          @refresh="onRefresh">
            <van-list v-model="loading"
                      :finished="finished"
                      finished-text="下拉刷新"
                      style="margin-bottom: 80px"
                      @load="loadData">


                <div class="house-item" v-for="dt in dataList" :key="dt.id">
                    <router-link style="color: #000;" :to="'/external/workshop/detail/'+dt.id">
                        <img class="house-image" :src="imgPrefix+dt.housePublicImagesList[0]"/>
                        <div class="house-msg">
                            <div class="house-msg-l1">{{dt.slogan}}</div>
                            <div class="house-msg-l2">
                                <div>面积：<span>{{dt.leaseAcreage}}</span>㎡</div>
                                <div>价格：<span>{{dt.price}}</span>{{dt.priceUnitName}}</div>
                            </div>
                        </div>
                    </router-link>

                </div>

            </van-list>
        </van-pull-refresh>

        <WorkshopFilter :visible="filterVisible" :on-submit-ok="onFilterSubmitOk" :on-cancel="onFilterCancel"/>
    </div>
</template>

<script>
    import {NavBar, List, PullRefresh, Pagination, Search, Cell, CellGroup, Tag, Sticky, Row, Col, Icon} from 'vant';
    import {request, Utils} from "../../base/CiiUtils";
    import WorkshopFilter from "./WorkshopFilter";
    import {Constants} from "../../base/Constants";

    export default {
        name: "ExternalWorkshopList",
        components: {
            WorkshopFilter,
            [NavBar.name]: NavBar,
            [List.name]: List,
            [Pagination.name]: Pagination,
            [PullRefresh.name]: PullRefresh,
            [Search.name]: Search,
            [Cell.name]: Cell,
            [CellGroup.name]: CellGroup,
            [Tag.name]: Tag,
            [Sticky.name]: Sticky,
            [Row.name]: Row,
            [Col.name]: Col,
            [Icon.name]: Icon
        },
        data: function () {
            return {
                imgPrefix:Constants.fileReadUrl,
                page: {
                    currentPage: 1,
                    totalCount: 0,
                    pageSize: 20
                },
                filterCondition: {},
                filterVisible: false,
                keyword: '',
                dataList: [],
                finished: false,
                loading: false,
                refreshing: false,
                Utils: Utils
            }
        },

        methods: {
            onBackClick: function () {
                this.$router.back();
            },
            loadData(reload) {

                if (reload) {
                    this.dataList = [];
                    this.page = {
                        currentPage: 1,
                        totalCount: 0,
                        pageSize: 20
                    }
                }

                let qc = {
                    start: (this.page.currentPage - 1) * this.page.pageSize,
                    pageSize: this.page.pageSize,
                    entity: this.filterCondition
                };
                qc.keyword = this.keyword ? this.keyword : null;

                request({
                    conf: {
                        url: "/external/workshop/list",
                        data: qc
                    },
                    success: (response) => {
                        console.log(response);
                        this.dataList = this.dataList.concat(response.result.data);
                        this.page.totalCount = response.result.totalCount;

                        if (response.result.hasNextPage){
                            this.finished = false;
                        } else{
                            this.finished = true;
                        }
                        this.loading = false;
                        this.refreshing = false;
                    }
                })


            },
            onRefresh: function () {
                this.loadData(true)
            },
            onKeywordSearch: function () {
                this.loadData(true);
            },
            onFilterClick() {
                this.filterVisible = true
            },
            onFilterSubmitOk(values) {
                this.filterVisible = false;
                this.filterCondition = values;
                this.loadData(true);
            },
            onFilterCancel() {
                this.filterVisible = false
            },
        }

    }
</script>

<style scoped>
    .red-color {
        color: #ff0000;
    }
    .house-item {
        /*width: 100%;*/
        height: 100px;
        padding: 10px 10px;
        border-bottom: 1px solid #f1f1f1;
    }

    .house-image {
        width: 30%;
        height: 100px;
        float: left;
    }

    .house-msg {
        width: 68%;
        margin-left: 2%;
        height: 100px;
        float: left;
    }

    .house-msg-l1 {
        height: 83px;
        width: 100%;
        overflow: hidden;
        font-size: 14px;
    }

    .house-msg-l2 {
        width: 100%;
        height: 17px;
        overflow: hidden;
    }

    .house-msg-l2 div {
        float: left;
        font-size: 13px;
        margin-right: 5%;
        width: 45%;
    }
    .house-msg-l2 span{
        color: #FF0000;
        font-size: 14px;
    }

    .house-msg-l3 {
        width: 100%;
        height: 20px;
    }

    .house-msg-l3 div {
        font-size: 13px;
        float: left;
        /*width: 20%;*/
        text-align: center;
        line-height: 20px;
        /*margin-top:10px;*/
        border-radius: 5px;
    }

    .house-msg-l3 .s1 {
        background: #185ac7;
        color: #fff;
    }

    .house-msg-l3 .s2 {
        margin-left: 5%;
        background: #7112b3;
        color: #fff;
    }

    .house-msg-l3 .s3 {
        margin-left: 5%;
        background: #1bc174;
        color: #fff;
    }
</style>