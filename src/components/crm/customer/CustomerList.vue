<template>
    <div>
        <van-sticky>
            <van-row>
                <van-col span="24">
                    <van-nav-bar left-arrow left-text="返回" title="客户列表" @click-left="onBackClick"></van-nav-bar>
                </van-col>
            </van-row>
            <van-row>
                <van-col span="21">
                    <van-search v-model="keyword"
                                @search="onKeywordSearch">
                    </van-search>
                </van-col>
                <van-col span="3" style="text-align: center">
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
                      style="margin-bottom: 60px"
                      @load="loadData">

                <van-cell-group v-for="(cus) in customerList"
                                style="margin-top:10px"
                                :key="cus.id">
                    <van-cell :title="cus.cusName+'（'+cus.product+'）'"
                              :key="cus.id"
                              center size="large"
                              is-link :to="{path:'/mine/customer/detail/'+cus.id}">
                        <template #label>
                            <p>
                                求租 <span class="red-color">{{cus.needAcreage}}</span> m²,
                                需要 <span class="red-color">{{cus.houseTypeName}}</span>
                            </p>
                            <p v-if="cus.areas && cus.areas.length>0">
                                需求区域：
                                <span v-for="area in cus.areas" :key="area.id">
                                    {{area.cityName+(area.regionName||"")+(area.streetName||"")}}
                                </span>
                            </p>
                            <p>
                                创建时间：{{Utils.dateFormat(cus.createTime,'yyyy-MM-dd')}},
                                <span class="red-color">{{cus.noFollowupDay}}</span> 天未跟进
                            </p>
                            <p>
                                <van-tag style="margin-left: 2px" v-for="(nd,index) in cus.needTags" :key="index"
                                         type="warning">{{nd}}
                                </van-tag>
                            </p>

                        </template>
                    </van-cell>
                </van-cell-group>

            </van-list>
        </van-pull-refresh>

        <van-pagination v-model="page.currentPage"
                        style="position: fixed;bottom: 0px;width: 100%;"
                        :items-per-page="page.pageSize"
                        :total-items="page.totalCount"
                        mode="simple">
        </van-pagination>

        <CustomerFilter :visible="filterVisible" :on-submit-ok="onFilterSubmitOk" :on-cancel="onFilterCancel" />
    </div>
</template>

<script>
    import {
        List,
        PullRefresh,
        Pagination,
        Search,
        Cell,
        CellGroup,
        Tabs,
        Tab,
        Tag,
        Sticky,
        Row,
        Col,
        Icon,
        NavBar
    } from 'vant';
    import {request, Utils} from "../../base/CiiUtils";
    import CustomerFilter from "./CustomerFilter";

    export default {
        name: "CustomerList",
        components: {
            CustomerFilter,
            [List.name]: List,
            [Pagination.name]: Pagination,
            [PullRefresh.name]: PullRefresh,
            [Search.name]: Search,
            [Cell.name]: Cell,
            [CellGroup.name]: CellGroup,
            [Tab.name]: Tab,
            [Tabs.name]: Tabs,
            [Tag.name]: Tag,
            [Sticky.name]: Sticky,
            [Row.name]: Row,
            [Col.name]: Col,
            [Icon.name]: Icon,
            [NavBar.name]: NavBar
        },
        data() {
            return {
                page: {
                    currentPage: 1,
                    totalCount: 0,
                    pageSize: 20
                },
                filterCondition: {},
                filterVisible: false,
                keyword: '',
                customerList: [],
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
            loadData: function (reload) {
                this.customerList = [];

                if (reload) {
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
                qc.entity.cusOwnerType = this.cusOwnerType;
                qc.keyword = this.keyword ? this.keyword : null;

                request({
                    conf: {
                        url: "customer/query",
                        data: qc
                    },
                    success: (response) => {
                        this.customerList = response.result.data;
                        this.page.totalCount = response.result.totalCount;
                    },
                    finally:()=>{
                        this.finished = true;
                        this.loading = false;
                        this.refreshing = false;
                    }
                })

            },
            onRefresh: function () {
                this.loadData(true);
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
            }
        }
    }
</script>

<style scoped>
    /deep/ .van-tabs__nav--card {
        margin: 0px 0px !important;
    }

    .red-color {
        color: #ff0000;
    }
</style>