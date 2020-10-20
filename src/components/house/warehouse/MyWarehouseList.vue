<template>
    <div>
        <van-sticky>
            <van-nav-bar left-arrow left-text="返回" title="仓库列表" @click-left="onBackClick"></van-nav-bar>
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

                <van-cell-group v-for="dt in dataList"
                                style="margin-top:10px"
                                :key="dt.id">
                    <van-cell :title="dt.streetName + dt.address"
                              center
                              size="large"
                              is-link :to="{path:'/mine/warehouse/detail/'+dt.id}"
                              :key="dt.id">
                        <template #label>
                            <p>
                                起租 <span class="red-color">{{dt.leaseAcreageMin}} m²</span>，
                                目前可租 <span class="red-color">{{dt.leaseAcreage}} m²</span>
                            </p>
                            <p>
                                价格 <span class="red-color">{{dt.price}}{{dt.priceUnitName}}</span>，
                                层高 <span class="red-color">{{dt.floorHeight}} m</span>，
                                用途：<span class="red-color">{{dt.houseTypeName}}</span>
                            </p>
                            <p>
                                <van-tag plain
                                         type="warning"
                                         style="margin-right: 2px;"
                                         :key="tg"
                                         v-for="tg in dt.advantageTags">
                                    {{tg}}
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

        <WarehouseFilter :visible="filterVisible" :on-submit-ok="onFilterSubmitOk" :on-cancel="onFilterCancel"/>
    </div>
</template>

<script>
    import {NavBar, List, PullRefresh, Pagination, Search, Cell, CellGroup, Tag, Sticky, Row, Col, Icon} from 'vant';
    import {request, Utils} from "../../base/CiiUtils";
    import WarehouseFilter from "./WarehouseFilter";

    export default {
        name: "MyWarehouseList",
        components: {
            WarehouseFilter,
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
                //
                this.dataList = [];

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
                qc.keyword = this.keyword ? this.keyword : null;

                request({
                    conf: {
                        url: "warehouse/query",
                        data: qc
                    },
                    success: (response) => {
                        this.dataList = response.result.data;
                        this.page.totalCount = response.result.totalCount;
                        this.finished = true;
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
</style>