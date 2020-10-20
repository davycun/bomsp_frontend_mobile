import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeContent from "./components/home/HomeContent";
import Home from "./components/home/Home";
import Mine from "./components/mine/Mine";
import Publish from "./components/publish/Publish";
import WarehouseList from "./components/house/warehouse/WarehouseList";
import OfficeList from "./components/house/office/OfficeList";
import WarehouseDetail from "./components/house/warehouse/WarehouseDetail";
import OfficeDetail from "./components/house/office/OfficeDetail";
import ShopList from "./components/house/shop/ShopList";
import Login from "./components/mine/Login";
import Registry from "./components/mine/Registry";
import CustomerList from "./components/crm/customer/CustomerList";
import CustomerDetail from "./components/crm/customer/CustomerDetail";
import CustomerFollowupEdit from "./components/crm/customer/followup/CustomerFollowupEdit";
import MyWarehouseDetail from "./components/house/warehouse/MyWarehouseDetail";
import MyWarehouseList from "./components/house/warehouse/MyWarehouseList";
import MyWorkshopDetail from "./components/house/workshop/MyWorkshopDetail";
import MyWorkshopList from "./components/house/workshop/MyWorkshopList";
import MyOfficeList from "./components/house/office/MyOfficeList";
import MyShopList from "./components/house/shop/MyShopList";
import MyShopDetail from "./components/house/shop/MyShopDetail";
import EntrustEdit from "./components/entrust/EntrustEdit";
import EntrustList from "./components/entrust/EntrustList";
import ExternalWorkshopList from "./components/house/workshop/ExternalWorkshopList";
import ExternalWorkshopDetail from "./components/house/workshop/ExternalWorkshopDetail";

Vue.use(VueRouter);

const routes = [{
    name: "home",
    path: "/",
    component: Home,
    meta: {
        keepAlive: true
    },
    children: [{
        path: '',
        component: HomeContent,
        meta: {
            keepAlive: true
        }
    }, {
        name: "publish",
        path: '/publish',
        component: Publish,
        meta: {
            keepAlive: true
        }
    }, {
        name: "mine",
        path: "/mine",
        component: Mine,
        meta: {
            keepAlive: true
        }
    }]
}, {
    name: "externalWorkshopList",
    path: "/external/workshop/list",
    component: ExternalWorkshopList
}, {
    name: "externalWorkshopDetail",
    path: "/external/workshop/detail/:id",
    component: ExternalWorkshopDetail
}, {
    name: "warehouseList",
    path: "/house/warehouse/list",
    component: WarehouseList
}, {
    name: "warehouseDetail",
    path: "/house/warehouse/detail/:id",
    component: WarehouseDetail
}, {
    name: "officeList",
    path: "/house/office/list",
    component: OfficeList
}, {
    name: "officeDetail",
    path: "/house/office/detail/:id",
    component: OfficeDetail
}, {
    name: "shopList",
    path: "/house/shop/list",
    component: ShopList
}, {
    name: "shopDetail",
    path: "/house/shop/detail/:id",
    component: OfficeDetail
}, {
    name: "entrustEdit",
    path: "/entrust/edit",
    component: EntrustEdit
}, {
    name: "entrustList",
    path: "entrust/list",
    component: EntrustList
}, {
    name: "login",
    path: "/login",
    component: Login
}, {
    name: "registry",
    path: "/registry",
    component: Registry
}, {
    name: "myCustomerList",
    path: "/mine/customer/list",
    component: CustomerList,
    meta: {
        keepAlive: true
    }
}, {
    name: "myCustomerDetail",
    path: "/mine/customer/detail/:id",
    component: CustomerDetail,
    meta: {
        keepAlive: true
    }
}, {
    name: "myFollowupEdit",
    path: "/mine/customer/followup/edit/:cusId",
    component: CustomerFollowupEdit
}, {
    name: "myWorkshopList",
    path: "/mine/workshop/list",
    component: MyWorkshopList,
    meta: {
        keepAlive: true
    }

}, {
    name: "myWorkshopDetail",
    path: "/mine/workshop/detail/:id",
    component: MyWorkshopDetail
}, {
    name: "myWarehouseList",
    path: "/mine/warehouse/list",
    component: MyWarehouseList,
    meta: {
        keepAlive: true
    }
}, {
    name: "myWarehouseDetail",
    path: "/mine/warehouse/detail/:id",
    component: MyWarehouseDetail
}, {
    name: "myOfficeList",
    path: "/mine/office/list",
    component: MyOfficeList,
    meta: {
        keepAlive: true
    }
}, {
    name: "myOfficeDetail",
    path: "/mine/office/detail/:id",
    component: MyOfficeList
}, {
    name: "myShopList",
    path: "/mine/shop/list",
    component: MyShopList,
    meta: {
        keepAlive: true
    }
}, {
    name: "myShopDetail",
    path: "/mine/shop/detail/:id",
    component: MyShopDetail
}];

const router = new VueRouter({
    mode: 'history',
    routes: routes
});

export {router}