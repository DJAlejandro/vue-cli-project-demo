<template>
    <div id="app">
        <my-header :seller="seller"></my-header>
        <div class="nav-tab">
            <router-link class="tab-item" active-class="active" to="/">商品</router-link>
            <router-link class="tab-item" active-class="active" to="/grade">评价</router-link>
            <router-link class="tab-item" active-class="active" to="/seller">商家</router-link>
            <div class="nav-line" ref="line"></div>
        </div>
        <transition :name="transitionName">
            <keep-alive>
                <router-view :goods="goods" :ratings="ratings" :seller="seller"></router-view>
            </keep-alive>
        </transition>

        <div class="shop-cart-wrapper">
            <shop-cart :seller="seller" :goods="goods" @alert-show="alertShow"></shop-cart>
        </div>

        <transition name="move" mode="out-in">
            <div class="detail-wrapper" @click="toggleShow" v-show="this.$store.state.isShow">
                <shop-detail :goods="goods" @confirm-show="confirmShow"></shop-detail>
            </div>
        </transition>

        <transition name="fade">
            <div class="blur-bg" v-show="this.$store.state.isShow"></div>
        </transition>
        <transition name="fade">
            <div class="dialog-bg" v-show="isConfirmShow || isAlertShow"></div>
        </transition>

        <transition name="bounce">
            <div class="dialog-confirm" v-if="isConfirmShow">
                <div class="dialog-confirm-title">清空购物车？</div>
                <div class="dialog-confirm-btns border-1px">
                    <div class="dialog-confirm-btns-item" @click="clearAll(false)">取消</div>
                    <div
                        class="dialog-confirm-btns-item ok border-left-1px"
                        @click="clearAll(true)"
                    >确定</div>
                </div>
            </div>
        </transition>
        <transition name="bounce">
            <div class="dialog-alert" v-if="isAlertShow">
                <h2 class="dialog-alert-title">支付</h2>
                <div class="dialog-alert-content">您需要支付{{this.$store.state.priceAll}}元</div>
                <div class="dialog-alert-btns border-1px" @click="closeAlertDialog">确定</div>
            </div>
        </transition>
    </div>
</template>
<script type="text/javascript">
import _ from 'lodash-es';
import Header from "views/Header.vue";
import ShopCart from "views/pages/ShopCart.vue";
import ShopDetail from "views/pages/ShopDetail.vue";

// import axios from "axios";

export default {
    components: {
        myHeader: Header,
        ShopCart,
        ShopDetail
    },
    data() {
        return {
            /* eslint-disable */
            data:{
                "seller": {
                    "name": "粥品香坊（回龙观）",
                    "description": "蜂鸟专送",
                    "deliveryTime": 38,
                    "score": 4.6,
                    "serviceScore": 4.1,
                    "foodScore": 4.3,
                    "rankRate": 69.2,
                    "minPrice": 20,
                    "deliveryPrice": 4,
                    "ratingCount": 24,
                    "sellCount": 90,
                    "bulletin": "粥品香坊其烹饪粥料的秘方源于中国千年古法，在融和现代制作工艺，由世界烹饪大师屈浩先生领衔研发。坚守纯天然、0添加的良心品质深得消费者青睐，发展至今成为粥类的引领品牌。是2008年奥运会和2013年园博会指定餐饮服务商。",
                    "supports": [
                    {
                        "type": 0,
                        "description": "在线支付满28减5"
                    },
                    {
                        "type": 1,
                        "description": "VC无限橙果汁全场8折"
                    },
                    {
                        "type": 2,
                        "description": "单人精彩套餐"
                    },
                    {
                        "type": 3,
                        "description": "该商家支持发票,请下单写好发票抬头"
                    },
                    {
                        "type": 4,
                        "description": "已加入“外卖保”计划,食品安全保障"
                    }
                    ],
                    "avatar": "http://static.galileo.xiaojukeji.com/static/tms/seller_avatar_256px.jpg",
                    "pics": [
                    "http://fuss10.elemecdn.com/8/71/c5cf5715740998d5040dda6e66abfjpeg.jpeg?imageView2/1/w/180/h/180",
                    "http://fuss10.elemecdn.com/b/6c/75bd250e5ba69868f3b1178afbda3jpeg.jpeg?imageView2/1/w/180/h/180",
                    "http://fuss10.elemecdn.com/f/96/3d608c5811bc2d902fc9ab9a5baa7jpeg.jpeg?imageView2/1/w/180/h/180",
                    "http://fuss10.elemecdn.com/6/ad/779f8620ff49f701cd4c58f6448b6jpeg.jpeg?imageView2/1/w/180/h/180",
                    "http://fuss10.elemecdn.com/8/71/c5cf5715740998d5040dda6e66abfjpeg.jpeg?imageView2/1/w/180/h/180",
                    "http://fuss10.elemecdn.com/b/6c/75bd250e5ba69868f3b1178afbda3jpeg.jpeg?imageView2/1/w/180/h/180",
                    "http://fuss10.elemecdn.com/f/96/3d608c5811bc2d902fc9ab9a5baa7jpeg.jpeg?imageView2/1/w/180/h/180",
                    "http://fuss10.elemecdn.com/6/ad/779f8620ff49f701cd4c58f6448b6jpeg.jpeg?imageView2/1/w/180/h/180"
                    ],
                    "infos": [
                    "该商家支持发票,请下单写好发票抬头",
                    "品类:其他菜系,包子粥店",
                    "北京市昌平区回龙观西大街龙观置业大厦底商B座102单元1340",
                    "营业时间:10:00-20:30"
                    ]
                },
                "goods": [
                    {
                    "name": "热销榜",
                    "type": -1,
                    "foods": [
                        {
                        "name": "皮蛋瘦肉粥",
                        "price": 10,
                        "oldPrice": 12,
                        "description": "咸粥",
                        "sellCount": 229,
                        "rating": 100,
                        "info": "一碗皮蛋瘦肉粥，总是我到粥店时的不二之选。香浓软滑，饱腹暖心，皮蛋的Q弹与瘦肉的滑嫩伴着粥香溢于满口，让人喝这样的一碗粥也觉得心满意足",
                        "ratings": [
                            {
                            "username": "3******c",
                            "rateTime": 1469281964000,
                            "rateType": 0,
                            "text": "很喜欢的粥",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            },
                            {
                            "username": "2******3",
                            "rateTime": 1469271264000,
                            "rateType": 0,
                            "text": "",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            },
                            {
                            "username": "3******b",
                            "rateTime": 1469261964000,
                            "rateType": 1,
                            "text": "",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            }
                        ],
                        "icon": "http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/114/h/114",
                        "image": "http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/750/h/750"
                        },
                        {
                        "name": "扁豆焖面",
                        "price": 14,
                        "oldPrice": "",
                        "description": "",
                        "sellCount": 188,
                        "rating": 96,
                        "ratings": [
                            {
                            "username": "3******c",
                            "rateTime": 1469281964000,
                            "rateType": 0,
                            "text": "",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            },
                            {
                            "username": "2******3",
                            "rateTime": 1469271264000,
                            "rateType": 0,
                            "text": "",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            },
                            {
                            "username": "3******b",
                            "rateTime": 1469261964000,
                            "rateType": 1,
                            "text": "",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            }
                        ],
                        "info": "",
                        "icon": "http://fuss10.elemecdn.com/c/6b/29e3d29b0db63d36f7c500bca31d8jpeg.jpeg?imageView2/1/w/114/h/114",
                        "image": "http://fuss10.elemecdn.com/c/6b/29e3d29b0db63d36f7c500bca31d8jpeg.jpeg?imageView2/1/w/750/h/750"
                        },
                        {
                        "name": "葱花饼",
                        "price": 10,
                        "oldPrice": "",
                        "description": "",
                        "sellCount": 124,
                        "rating": 85,
                        "info": "",
                        "ratings": [
                            {
                            "username": "3******c",
                            "rateTime": 1469281964000,
                            "rateType": 1,
                            "text": "没啥味道",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            },
                            {
                            "username": "2******3",
                            "rateTime": 1469271264000,
                            "rateType": 1,
                            "text": "很一般啊",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            },
                            {
                            "username": "3******b",
                            "rateTime": 1469261964000,
                            "rateType": 0,
                            "text": "",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            }
                        ],
                        "icon": "http://fuss10.elemecdn.com/f/28/a51e7b18751bcdf871648a23fd3b4jpeg.jpeg?imageView2/1/w/114/h/114",
                        "image": "http://fuss10.elemecdn.com/f/28/a51e7b18751bcdf871648a23fd3b4jpeg.jpeg?imageView2/1/w/750/h/750"
                        },
                        {
                        "name": "牛肉馅饼",
                        "price": 14,
                        "oldPrice": "",
                        "description": "",
                        "sellCount": 114,
                        "rating": 91,
                        "info": "",
                        "ratings": [
                            {
                            "username": "3******c",
                            "rateTime": 1469281964000,
                            "rateType": 1,
                            "text": "难吃不推荐",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            },
                            {
                            "username": "2******3",
                            "rateTime": 1469271264000,
                            "rateType": 0,
                            "text": "",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            },
                            {
                            "username": "3******b",
                            "rateTime": 1469261964000,
                            "rateType": 0,
                            "text": "",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            }
                        ],
                        "icon": "http://fuss10.elemecdn.com/d/b9/bcab0e8ad97758e65ae5a62b2664ejpeg.jpeg?imageView2/1/w/114/h/114",
                        "image": "http://fuss10.elemecdn.com/d/b9/bcab0e8ad97758e65ae5a62b2664ejpeg.jpeg?imageView2/1/w/750/h/750"
                        },
                        {
                        "name": "招牌猪肉白菜锅贴/10个",
                        "price": 17,
                        "oldPrice": "",
                        "description": "",
                        "sellCount": 101,
                        "rating": 78,
                        "info": "",
                        "ratings": [
                            {
                            "username": "3******c",
                            "rateTime": 1469281964000,
                            "rateType": 1,
                            "text": "不脆,不好吃",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            },
                            {
                            "username": "2******3",
                            "rateTime": 1469271264000,
                            "rateType": 0,
                            "text": "",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            },
                            {
                            "username": "3******b",
                            "rateTime": 1469261964000,
                            "rateType": 0,
                            "text": "",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            }
                        ],
                        "icon": "http://fuss10.elemecdn.com/7/72/9a580c1462ca1e4d3c07e112bc035jpeg.jpeg?imageView2/1/w/114/h/114",
                        "image": "http://fuss10.elemecdn.com/7/72/9a580c1462ca1e4d3c07e112bc035jpeg.jpeg?imageView2/1/w/750/h/750"
                        },
                        {
                        "name": "南瓜粥",
                        "price": 9,
                        "oldPrice": "",
                        "description": "甜粥",
                        "sellCount": 91,
                        "rating": 100,
                        "ratings": [
                            {
                            "username": "3******c",
                            "rateTime": 1469281964000,
                            "rateType": 0,
                            "text": "",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            },
                            {
                            "username": "2******3",
                            "rateTime": 1469271264000,
                            "rateType": 0,
                            "text": "",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            },
                            {
                            "username": "3******b",
                            "rateTime": 1469261964000,
                            "rateType": 0,
                            "text": "",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            }
                        ],
                        "icon": "http://fuss10.elemecdn.com/8/a6/453f65f16b1391942af11511b7a90jpeg.jpeg?imageView2/1/w/114/h/114",
                        "image": "http://fuss10.elemecdn.com/8/a6/453f65f16b1391942af11511b7a90jpeg.jpeg?imageView2/1/w/750/h/750"
                        },
                        {
                        "name": "红豆薏米美肤粥",
                        "price": 12,
                        "oldPrice": "",
                        "description": "甜粥",
                        "sellCount": 86,
                        "rating": 100,
                        "info": "",
                        "ratings": [
                            {
                            "username": "3******c",
                            "rateTime": 1469281964000,
                            "rateType": 0,
                            "text": "",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            },
                            {
                            "username": "2******3",
                            "rateTime": 1469271264000,
                            "rateType": 0,
                            "text": "",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            },
                            {
                            "username": "3******b",
                            "rateTime": 1469261964000,
                            "rateType": 0,
                            "text": "",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            }
                        ],
                        "icon": "http://fuss10.elemecdn.com/d/22/260bd78ee6ac6051136c5447fe307jpeg.jpeg?imageView2/1/w/114/h/114",
                        "image": "http://fuss10.elemecdn.com/d/22/260bd78ee6ac6051136c5447fe307jpeg.jpeg?imageView2/1/w/750/h/750"
                        },
                        {
                        "name": "八宝酱菜",
                        "price": 4,
                        "oldPrice": "",
                        "description": "",
                        "sellCount": 84,
                        "rating": 100,
                        "info": "",
                        "ratings": [
                            {
                            "username": "3******c",
                            "rateTime": 1469281964000,
                            "rateType": 0,
                            "text": "",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            },
                            {
                            "username": "2******3",
                            "rateTime": 1469271264000,
                            "rateType": 0,
                            "text": "",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            },
                            {
                            "username": "3******b",
                            "rateTime": 1469261964000,
                            "rateType": 0,
                            "text": "",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            }
                        ],
                        "icon": "http://fuss10.elemecdn.com/9/b5/469d8854f9a3a03797933fd01398bjpeg.jpeg?imageView2/1/w/114/h/114",
                        "image": "http://fuss10.elemecdn.com/9/b5/469d8854f9a3a03797933fd01398bjpeg.jpeg?imageView2/1/w/750/h/750"
                        },
                        {
                        "name": "红枣山药糙米粥",
                        "price": 10,
                        "oldPrice": "",
                        "description": "",
                        "sellCount": 81,
                        "rating": 91,
                        "info": "",
                        "ratings": [
                            {
                            "username": "3******c",
                            "rateTime": 1469281964000,
                            "rateType": 0,
                            "text": "",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            },
                            {
                            "username": "2******3",
                            "rateTime": 1469271264000,
                            "rateType": 0,
                            "text": "",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            },
                            {
                            "username": "3******b",
                            "rateTime": 1469261964000,
                            "rateType": 0,
                            "text": "",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            }
                        ],
                        "icon": "http://fuss10.elemecdn.com/9/b5/469d8854f9a3a03797933fd01398bjpeg.jpeg?imageView2/1/w/114/h/114",
                        "image": "http://fuss10.elemecdn.com/9/b5/469d8854f9a3a03797933fd01398bjpeg.jpeg?imageView2/1/w/750/h/750"
                        },
                        {
                        "name": "糊塌子",
                        "price": 10,
                        "oldPrice": "",
                        "description": "",
                        "sellCount": 80,
                        "rating": 93,
                        "info": "",
                        "ratings": [
                            {
                            "username": "3******c",
                            "rateTime": 1469281964000,
                            "rateType": 0,
                            "text": "",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            },
                            {
                            "username": "2******3",
                            "rateTime": 1469271264000,
                            "rateType": 0,
                            "text": "",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            },
                            {
                            "username": "3******b",
                            "rateTime": 1469261964000,
                            "rateType": 0,
                            "text": "",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            }
                        ],
                        "icon": "http://fuss10.elemecdn.com/0/05/097a2a59fd2a2292d08067e16380cjpeg.jpeg?imageView2/1/w/114/h/114",
                        "image": "http://fuss10.elemecdn.com/0/05/097a2a59fd2a2292d08067e16380cjpeg.jpeg?imageView2/1/w/750/h/750"
                        }
                    ]
                    },
                    {
                    "name": "单人精彩套餐",
                    "type": 2,
                    "foods": [
                        {
                        "name": "红枣山药粥套餐",
                        "price": 29,
                        "oldPrice": 36,
                        "description": "红枣山药糙米粥,素材包,爽口莴笋丝,四川泡菜或八宝酱菜,配菜可备注",
                        "sellCount": 17,
                        "rating": 100,
                        "info": "",
                        "ratings": [
                            {
                            "username": "2******3",
                            "rateTime": 1469271264000,
                            "rateType": 0,
                            "text": "",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            }
                        ],
                        "icon": "http://fuss10.elemecdn.com/6/72/cb844f0bb60c502c6d5c05e0bddf5jpeg.jpeg?imageView2/1/w/114/h/114",
                        "image": "http://fuss10.elemecdn.com/6/72/cb844f0bb60c502c6d5c05e0bddf5jpeg.jpeg?imageView2/1/w/750/h/750"
                        }
                    ]
                    },
                    {
                    "name": "冰爽饮品限时特惠",
                    "type": 1,
                    "foods": [
                        {
                        "name": "VC无限橙果汁",
                        "price": 8,
                        "oldPrice": 10,
                        "description": "",
                        "sellCount": 15,
                        "rating": 100,
                        "info": "",
                        "ratings": [
                            {
                            "username": "3******c",
                            "rateTime": 1469281964000,
                            "rateType": 0,
                            "text": "还可以",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            },
                            {
                            "username": "2******3",
                            "rateTime": 1469271264000,
                            "rateType": 0,
                            "text": "",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            }
                        ],
                        "icon": "http://fuss10.elemecdn.com/e/c6/f348e811772016ae24e968238bcbfjpeg.jpeg?imageView2/1/w/114/h/114",
                        "image": "http://fuss10.elemecdn.com/e/c6/f348e811772016ae24e968238bcbfjpeg.jpeg?imageView2/1/w/750/h/750"
                        }
                    ]
                    },
                    {
                    "name": "精选热菜",
                    "type": -1,
                    "foods": [
                        {
                        "name": "娃娃菜炖豆腐",
                        "price": 17,
                        "oldPrice": "",
                        "description": "",
                        "sellCount": 43,
                        "rating": 92,
                        "info": "",
                        "ratings": [
                            {
                            "username": "3******c",
                            "rateTime": 1469281964000,
                            "rateType": 0,
                            "text": "菜量还可以,味道还可以",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            },
                            {
                            "username": "2******3",
                            "rateTime": 1469271264000,
                            "rateType": 0,
                            "text": "",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            }
                        ],
                        "icon": "http://fuss10.elemecdn.com/d/2d/b1eb45b305635d9dd04ddf157165fjpeg.jpeg?imageView2/1/w/114/h/114",
                        "image": "http://fuss10.elemecdn.com/d/2d/b1eb45b305635d9dd04ddf157165fjpeg.jpeg?imageView2/1/w/750/h/750"
                        },
                        {
                        "name": "手撕包菜",
                        "price": 16,
                        "oldPrice": "",
                        "description": "",
                        "sellCount": 29,
                        "rating": 100,
                        "info": "",
                        "ratings": [
                            {
                            "username": "3******c",
                            "rateTime": 1469281964000,
                            "rateType": 0,
                            "text": "",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            },
                            {
                            "username": "2******3",
                            "rateTime": 1469271264000,
                            "rateType": 0,
                            "text": "",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            }
                        ],
                        "icon": "http://fuss10.elemecdn.com/9/c6/f3bc84468820121112e79583c24efjpeg.jpeg?imageView2/1/w/114/h/114",
                        "image": "http://fuss10.elemecdn.com/9/c6/f3bc84468820121112e79583c24efjpeg.jpeg?imageView2/1/w/750/h/750"
                        },
                        {
                        "name": "香酥黄金鱼/3条",
                        "price": 11,
                        "oldPrice": "",
                        "description": "",
                        "sellCount": 15,
                        "rating": 100,
                        "info": "",
                        "ratings": [
                            {
                            "username": "3******c",
                            "rateTime": 1469281964000,
                            "rateType": 0,
                            "text": "",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            },
                            {
                            "username": "2******3",
                            "rateTime": 1469271264000,
                            "rateType": 0,
                            "text": "",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            }
                        ],
                        "icon": "http://fuss10.elemecdn.com/4/e7/8277a6a2ea0a2e97710290499fc41jpeg.jpeg?imageView2/1/w/114/h/114",
                        "image": "http://fuss10.elemecdn.com/4/e7/8277a6a2ea0a2e97710290499fc41jpeg.jpeg?imageView2/1/w/750/h/750"
                        }
                    ]
                    },
                    {
                    "name": "爽口凉菜",
                    "type": -1,
                    "foods": [
                        {
                        "name": "八宝酱菜",
                        "price": 4,
                        "oldPrice": "",
                        "description": "",
                        "sellCount": 84,
                        "rating": 100,
                        "info": "",
                        "ratings": [
                            {
                            "username": "3******c",
                            "rateTime": 1469281964000,
                            "rateType": 0,
                            "text": "",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            },
                            {
                            "username": "2******3",
                            "rateTime": 1469271264000,
                            "rateType": 0,
                            "text": "",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            },
                            {
                            "username": "3******b",
                            "rateTime": 1469261964000,
                            "rateType": 0,
                            "text": "",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            }
                        ],
                        "icon": "http://fuss10.elemecdn.com/9/b5/469d8854f9a3a03797933fd01398bjpeg.jpeg?imageView2/1/w/114/h/114",
                        "image": "http://fuss10.elemecdn.com/9/b5/469d8854f9a3a03797933fd01398bjpeg.jpeg?imageView2/1/w/750/h/750"
                        },
                        {
                        "name": "拍黄瓜",
                        "price": 9,
                        "oldPrice": "",
                        "description": "",
                        "sellCount": 28,
                        "rating": 100,
                        "info": "",
                        "ratings": [
                            {
                            "username": "3******c",
                            "rateTime": 1469281964000,
                            "rateType": 0,
                            "text": "",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            },
                            {
                            "username": "2******3",
                            "rateTime": 1469271264000,
                            "rateType": 0,
                            "text": "",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            },
                            {
                            "username": "3******b",
                            "rateTime": 1469261964000,
                            "rateType": 0,
                            "text": "",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            }
                        ],
                        "icon": "http://fuss10.elemecdn.com/6/54/f654985b4e185f06eb07f8fa2b2e8jpeg.jpeg?imageView2/1/w/114/h/114",
                        "image": "http://fuss10.elemecdn.com/6/54/f654985b4e185f06eb07f8fa2b2e8jpeg.jpeg?imageView2/1/w/750/h/750"
                        }
                    ]
                    },
                    {
                    "name": "精选套餐",
                    "type": -1,
                    "foods": [
                        {
                        "name": "红豆薏米粥套餐",
                        "price": 37,
                        "oldPrice": "",
                        "description": "红豆薏米粥,三鲜干蒸烧卖,拍黄瓜",
                        "sellCount": 3,
                        "rating": 100,
                        "info": "",
                        "ratings": [
                            {
                            "username": "2******3",
                            "rateTime": 1469271264000,
                            "rateType": 0,
                            "text": "",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            }
                        ],
                        "icon": "http://fuss10.elemecdn.com/f/49/27f26ed00c025b2200a9ccbb7e67ejpeg.jpeg?imageView2/1/w/114/h/114",
                        "image": "http://fuss10.elemecdn.com/f/49/27f26ed00c025b2200a9ccbb7e67ejpeg.jpeg?imageView2/1/w/750/h/750"
                        },
                        {
                        "name": "皮蛋瘦肉粥套餐",
                        "price": 31,
                        "oldPrice": "",
                        "description": "",
                        "sellCount": 12,
                        "rating": 100,
                        "info": "",
                        "ratings": [
                            {
                            "username": "2******3",
                            "rateTime": 1469271264000,
                            "rateType": 0,
                            "text": "",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            }
                        ],
                        "icon": "http://fuss10.elemecdn.com/8/96/f444a8087f0e940ef264617f9d98ajpeg.jpeg?imageView2/1/w/114/h/114",
                        "image": "http://fuss10.elemecdn.com/8/96/f444a8087f0e940ef264617f9d98ajpeg.jpeg?imageView2/1/w/750/h/750"
                        }
                    ]
                    },
                    {
                    "name": "果拼果汁",
                    "type": -1,
                    "foods": [
                        {
                        "name": "蜜瓜圣女萝莉杯",
                        "price": 6,
                        "oldPrice": "",
                        "description": "",
                        "sellCount": 1,
                        "rating": "",
                        "info": "",
                        "ratings": [],
                        "icon": "http://fuss10.elemecdn.com/b/5f/b3b04c259d5ec9fa52e1856ee50dajpeg.jpeg?imageView2/1/w/114/h/114",
                        "image": "http://fuss10.elemecdn.com/b/5f/b3b04c259d5ec9fa52e1856ee50dajpeg.jpeg?imageView2/1/w/750/h/750"
                        },
                        {
                        "name": "加多宝",
                        "price": 6,
                        "oldPrice": "",
                        "description": "",
                        "sellCount": 7,
                        "rating": 100,
                        "info": "",
                        "ratings": [
                            {
                            "username": "3******c",
                            "rateTime": 1469281964000,
                            "rateType": 0,
                            "text": "",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            },
                            {
                            "username": "2******3",
                            "rateTime": 1469271264000,
                            "rateType": 0,
                            "text": "",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            },
                            {
                            "username": "3******b",
                            "rateTime": 1469261964000,
                            "rateType": 0,
                            "text": "",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            }
                        ],
                        "icon": "http://fuss10.elemecdn.com/b/9f/5e6c99c593cf65229225c5661bcdejpeg.jpeg?imageView2/1/w/114/h/114",
                        "image": "http://fuss10.elemecdn.com/b/9f/5e6c99c593cf65229225c5661bcdejpeg.jpeg?imageView2/1/w/750/h/750"
                        },
                        {
                        "name": "VC无限橙果汁",
                        "price": 8,
                        "oldPrice": 10,
                        "description": "",
                        "sellCount": 15,
                        "rating": 100,
                        "info": "",
                        "ratings": [
                            {
                            "username": "3******c",
                            "rateTime": 1469281964000,
                            "rateType": 0,
                            "text": "还可以",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            },
                            {
                            "username": "2******3",
                            "rateTime": 1469271264000,
                            "rateType": 0,
                            "text": "",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            }
                        ],
                        "icon": "http://fuss10.elemecdn.com/e/c6/f348e811772016ae24e968238bcbfjpeg.jpeg?imageView2/1/w/114/h/114",
                        "image": "http://fuss10.elemecdn.com/e/c6/f348e811772016ae24e968238bcbfjpeg.jpeg?imageView2/1/w/750/h/750"
                        }
                    ]
                    },
                    {
                    "name": "小吃主食",
                    "type": -1,
                    "foods": [
                        {
                        "name": "扁豆焖面",
                        "price": 14,
                        "oldPrice": "",
                        "description": "",
                        "sellCount": 188,
                        "rating": 96,
                        "info": "",
                        "ratings": [
                            {
                            "username": "3******c",
                            "rateTime": 1469281964000,
                            "rateType": 0,
                            "text": "",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            },
                            {
                            "username": "2******3",
                            "rateTime": 1469271264000,
                            "rateType": 0,
                            "text": "",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            },
                            {
                            "username": "3******b",
                            "rateTime": 1469261964000,
                            "rateType": 1,
                            "text": "",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            }
                        ],
                        "icon": "http://fuss10.elemecdn.com/c/6b/29e3d29b0db63d36f7c500bca31d8jpeg.jpeg?imageView2/1/w/114/h/114",
                        "image": "http://fuss10.elemecdn.com/c/6b/29e3d29b0db63d36f7c500bca31d8jpeg.jpeg?imageView2/1/w/750/h/750"
                        },
                        {
                        "name": "葱花饼",
                        "price": 10,
                        "oldPrice": "",
                        "description": "",
                        "sellCount": 124,
                        "rating": 85,
                        "info": "",
                        "ratings": [
                            {
                            "username": "3******c",
                            "rateTime": 1469281964000,
                            "rateType": 1,
                            "text": "没啥味道",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            },
                            {
                            "username": "2******3",
                            "rateTime": 1469271264000,
                            "rateType": 1,
                            "text": "很一般啊",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            },
                            {
                            "username": "3******b",
                            "rateTime": 1469261964000,
                            "rateType": 0,
                            "text": "",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            }
                        ],
                        "icon": "http://fuss10.elemecdn.com/f/28/a51e7b18751bcdf871648a23fd3b4jpeg.jpeg?imageView2/1/w/114/h/114",
                        "image": "http://fuss10.elemecdn.com/f/28/a51e7b18751bcdf871648a23fd3b4jpeg.jpeg?imageView2/1/w/750/h/750"
                        },
                        {
                        "name": "牛肉馅饼",
                        "price": 14,
                        "oldPrice": "",
                        "description": "",
                        "sellCount": 114,
                        "rating": 91,
                        "info": "",
                        "ratings": [
                            {
                            "username": "3******c",
                            "rateTime": 1469281964000,
                            "rateType": 1,
                            "text": "难吃不推荐",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            },
                            {
                            "username": "2******3",
                            "rateTime": 1469271264000,
                            "rateType": 0,
                            "text": "",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            },
                            {
                            "username": "3******b",
                            "rateTime": 1469261964000,
                            "rateType": 0,
                            "text": "",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            }
                        ],
                        "icon": "http://fuss10.elemecdn.com/d/b9/bcab0e8ad97758e65ae5a62b2664ejpeg.jpeg?imageView2/1/w/114/h/114",
                        "image": "http://fuss10.elemecdn.com/d/b9/bcab0e8ad97758e65ae5a62b2664ejpeg.jpeg?imageView2/1/w/750/h/750"
                        },
                        {
                        "name": "招牌猪肉白菜锅贴/10个",
                        "price": 17,
                        "oldPrice": "",
                        "description": "",
                        "sellCount": 101,
                        "rating": 78,
                        "info": "",
                        "ratings": [
                            {
                            "username": "3******c",
                            "rateTime": 1469281964000,
                            "rateType": 1,
                            "text": "不脆,不好吃",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            },
                            {
                            "username": "2******3",
                            "rateTime": 1469271264000,
                            "rateType": 0,
                            "text": "",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            },
                            {
                            "username": "3******b",
                            "rateTime": 1469261964000,
                            "rateType": 0,
                            "text": "",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            }
                        ],
                        "icon": "http://fuss10.elemecdn.com/7/72/9a580c1462ca1e4d3c07e112bc035jpeg.jpeg?imageView2/1/w/114/h/114",
                        "image": "http://fuss10.elemecdn.com/7/72/9a580c1462ca1e4d3c07e112bc035jpeg.jpeg?imageView2/1/w/750/h/750"
                        },
                        {
                        "name": "糊塌子",
                        "price": 10,
                        "oldPrice": "",
                        "description": "",
                        "sellCount": 80,
                        "rating": 93,
                        "info": "",
                        "ratings": [
                            {
                            "username": "3******c",
                            "rateTime": 1469281964000,
                            "rateType": 0,
                            "text": "",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            },
                            {
                            "username": "2******3",
                            "rateTime": 1469271264000,
                            "rateType": 0,
                            "text": "",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            },
                            {
                            "username": "3******b",
                            "rateTime": 1469261964000,
                            "rateType": 0,
                            "text": "",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            }
                        ],
                        "icon": "http://fuss10.elemecdn.com/0/05/097a2a59fd2a2292d08067e16380cjpeg.jpeg?imageView2/1/w/114/h/114",
                        "image": "http://fuss10.elemecdn.com/0/05/097a2a59fd2a2292d08067e16380cjpeg.jpeg?imageView2/1/w/750/h/750"
                        }
                    ]
                    },
                    {
                    "name": "特色粥品",
                    "type": -1,
                    "foods": [
                        {
                        "name": "皮蛋瘦肉粥",
                        "price": 10,
                        "oldPrice": "",
                        "description": "咸粥",
                        "sellCount": 229,
                        "rating": 100,
                        "ratings": [
                            {
                            "username": "3******c",
                            "rateTime": 1469281964000,
                            "rateType": 0,
                            "text": "很喜欢的粥",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            },
                            {
                            "username": "2******3",
                            "rateTime": 1469271264000,
                            "rateType": 0,
                            "text": "",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            },
                            {
                            "username": "3******b",
                            "rateTime": 1469261964000,
                            "rateType": 1,
                            "text": "",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            }
                        ],
                        "icon": "http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/114/h/114",
                        "image": "http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/750/h/750"
                        },
                        {
                        "name": "南瓜粥",
                        "price": 9,
                        "oldPrice": "",
                        "description": "甜粥",
                        "sellCount": 91,
                        "rating": 100,
                        "info": "",
                        "ratings": [
                            {
                            "username": "3******c",
                            "rateTime": 1469281964000,
                            "rateType": 0,
                            "text": "",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            },
                            {
                            "username": "2******3",
                            "rateTime": 1469271264000,
                            "rateType": 0,
                            "text": "",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            },
                            {
                            "username": "3******b",
                            "rateTime": 1469261964000,
                            "rateType": 0,
                            "text": "",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            }
                        ],
                        "icon": "http://fuss10.elemecdn.com/8/a6/453f65f16b1391942af11511b7a90jpeg.jpeg?imageView2/1/w/114/h/114",
                        "image": "http://fuss10.elemecdn.com/8/a6/453f65f16b1391942af11511b7a90jpeg.jpeg?imageView2/1/w/750/h/750"
                        },
                        {
                        "name": "红豆薏米美肤粥",
                        "price": 12,
                        "oldPrice": "",
                        "description": "甜粥",
                        "sellCount": 86,
                        "rating": 100,
                        "info": "",
                        "ratings": [
                            {
                            "username": "3******c",
                            "rateTime": 1469281964000,
                            "rateType": 0,
                            "text": "",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            },
                            {
                            "username": "2******3",
                            "rateTime": 1469271264000,
                            "rateType": 0,
                            "text": "",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            },
                            {
                            "username": "3******b",
                            "rateTime": 1469261964000,
                            "rateType": 0,
                            "text": "",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            }
                        ],
                        "icon": "http://fuss10.elemecdn.com/d/22/260bd78ee6ac6051136c5447fe307jpeg.jpeg?imageView2/1/w/114/h/114",
                        "image": "http://fuss10.elemecdn.com/d/22/260bd78ee6ac6051136c5447fe307jpeg.jpeg?imageView2/1/w/750/h/750"
                        },
                        {
                        "name": "红枣山药糙米粥",
                        "price": 10,
                        "oldPrice": "",
                        "description": "",
                        "sellCount": 81,
                        "rating": 91,
                        "info": "",
                        "ratings": [
                            {
                            "username": "3******c",
                            "rateTime": 1469281964000,
                            "rateType": 0,
                            "text": "",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            },
                            {
                            "username": "2******3",
                            "rateTime": 1469271264000,
                            "rateType": 0,
                            "text": "",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            },
                            {
                            "username": "3******b",
                            "rateTime": 1469261964000,
                            "rateType": 0,
                            "text": "",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            }
                        ],
                        "icon": "http://fuss10.elemecdn.com/9/b5/469d8854f9a3a03797933fd01398bjpeg.jpeg?imageView2/1/w/114/h/114",
                        "image": "http://fuss10.elemecdn.com/9/b5/469d8854f9a3a03797933fd01398bjpeg.jpeg?imageView2/1/w/750/h/750"
                        },
                        {
                        "name": "鲜蔬菌菇粥",
                        "price": 11,
                        "oldPrice": "",
                        "description": "咸粥",
                        "sellCount": 56,
                        "rating": 100,
                        "info": "",
                        "ratings": [
                            {
                            "username": "3******c",
                            "rateTime": 1469281964000,
                            "rateType": 0,
                            "text": "",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            },
                            {
                            "username": "2******3",
                            "rateTime": 1469271264000,
                            "rateType": 0,
                            "text": ""
                            },
                            {
                            "username": "3******b",
                            "rateTime": 1469261964000,
                            "rateType": 0,
                            "text": "",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            }
                        ],
                        "icon": "http://fuss10.elemecdn.com/e/a3/5317c68dd618929b6ac05804e429ajpeg.jpeg?imageView2/1/w/114/h/114",
                        "image": "http://fuss10.elemecdn.com/e/a3/5317c68dd618929b6ac05804e429ajpeg.jpeg?imageView2/1/w/750/h/750"
                        },
                        {
                        "name": "田园蔬菜粥",
                        "price": 10,
                        "oldPrice": "",
                        "description": "咸粥",
                        "sellCount": 33,
                        "rating": 100,
                        "info": "",
                        "ratings": [
                            {
                            "username": "3******c",
                            "rateTime": 1469281964000,
                            "rateType": 0,
                            "text": "",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            },
                            {
                            "username": "2******3",
                            "rateTime": 1469271264000,
                            "rateType": 0,
                            "text": "",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            },
                            {
                            "username": "3******b",
                            "rateTime": 1469261964000,
                            "rateType": 0,
                            "text": "",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            }
                        ],
                        "icon": "http://fuss10.elemecdn.com/a/94/7371083792c19df00e546b29e344cjpeg.jpeg?imageView2/1/w/114/h/114",
                        "image": "http://fuss10.elemecdn.com/a/94/7371083792c19df00e546b29e344cjpeg.jpeg?imageView2/1/w/750/h/750"
                        }
                    ]
                    }
                ],
                "ratings": [
                    {
                    "username": "3******c",
                    "rateTime": 1469281964000,
                    "deliveryTime": 30,
                    "score": 5,
                    "rateType": 0,
                    "text": "不错,粥很好喝,我经常吃这一家,非常赞,以后也会常来吃,强烈推荐.",
                    "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
                    "recommend": [
                        "南瓜粥",
                        "皮蛋瘦肉粥",
                        "扁豆焖面",
                        "娃娃菜炖豆腐娃娃菜炖豆腐",
                        "牛肉馅饼",
                        "牛肉馅饼",
                        "牛肉馅饼",
                        "牛肉馅饼",
                        "牛肉馅饼",
                        "牛肉馅饼"
                    ]

                    },
                    {
                    "username": "2******3",
                    "rateTime": 1469271264000,
                    "deliveryTime": "",
                    "score": 4,
                    "rateType": 0,
                    "deliveryTime": "",
                    "text": "服务态度不错",
                    "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
                    "recommend": [
                        "扁豆焖面"
                    ]
                    },
                    {
                    "username": "3******b",
                    "rateTime": 1469261964000,
                    "score": 3,
                    "rateType": 1,
                    "text": "",
                    "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
                    "recommend": []
                    },
                    {
                    "username": "1******c",
                    "rateTime": 1469261864000,
                    "deliveryTime": 20,
                    "score": 5,
                    "rateType": 0,
                    "text": "良心店铺",
                    "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
                    "recommend": []
                    },
                    {
                    "username": "2******d",
                    "rateTime": 1469251264000,
                    "deliveryTime": 10,
                    "score": 4,
                    "rateType": 0,
                    "text": "",
                    "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
                    "recommend": []
                    },
                    {
                    "username": "9******0",
                    "rateTime": 1469241964000,
                    "deliveryTime": 70,
                    "score": 1,
                    "rateType": 1,
                    "text": "送货速度蜗牛一样",
                    "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
                    "recommend": []
                    },
                    {
                    "username": "d******c",
                    "rateTime": 1469231964000,
                    "deliveryTime": 30,
                    "score": 5,
                    "rateType": 0,
                    "text": "很喜欢的粥店",
                    "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
                    "recommend": []
                    },
                    {
                    "username": "2******3",
                    "rateTime": 1469221264000,
                    "deliveryTime": "",
                    "score": 4,
                    "rateType": 0,
                    "text": "量给的还可以",
                    "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
                    "recommend": []
                    },
                    {
                    "username": "3******8",
                    "rateTime": 1469211964000,
                    "deliveryTime": "",
                    "score": 3,
                    "rateType": 1,
                    "text": "",
                    "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
                    "recommend": []
                    },
                    {
                    "username": "a******a",
                    "rateTime": 1469201964000,
                    "deliveryTime": "",
                    "score": 4,
                    "rateType": 0,
                    "text": "孩子喜欢吃这家",
                    "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
                    "recommend": [
                        "南瓜粥"
                    ]
                    },
                    {
                    "username": "3******3",
                    "rateTime": 1469191264000,
                    "deliveryTime": "",
                    "score": 4,
                    "rateType": 0,
                    "text": "粥挺好吃的",
                    "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
                    "recommend": []
                    },
                    {
                    "username": "t******b",
                    "rateTime": 1469181964000,
                    "deliveryTime": "",
                    "score": 3,
                    "rateType": 1,
                    "text": "",
                    "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
                    "recommend": []
                    },
                    {
                    "username": "f******c",
                    "rateTime": 1469171964000,
                    "deliveryTime": 15,
                    "score": 5,
                    "rateType": 0,
                    "text": "送货速度很快",
                    "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
                    "recommend": []
                    },
                    {
                    "username": "k******3",
                    "rateTime": 1469161264000,
                    "deliveryTime": "",
                    "score": 4,
                    "rateType": 0,
                    "text": "",
                    "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
                    "recommend": []
                    },
                    {
                    "username": "u******b",
                    "rateTime": 1469151964000,
                    "deliveryTime": "",
                    "score": 4,
                    "rateType": 0,
                    "text": "下雨天给快递小哥点个赞",
                    "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
                    "recommend": []
                    },
                    {
                    "username": "s******c",
                    "rateTime": 1469141964000,
                    "deliveryTime": "",
                    "score": 4,
                    "rateType": 0,
                    "text": "好",
                    "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
                    "recommend": []
                    },
                    {
                    "username": "z******3",
                    "rateTime": 1469131264000,
                    "deliveryTime": "",
                    "score": 5,
                    "rateType": 0,
                    "text": "吃了还想再吃",
                    "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
                    "recommend": []
                    },
                    {
                    "username": "n******b",
                    "rateTime": 1469121964000,
                    "deliveryTime": "",
                    "score": 3,
                    "rateType": 1,
                    "text": "发票开的不对",
                    "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
                    "recommend": []
                    },
                    {
                    "username": "m******c",
                    "rateTime": 1469111964000,
                    "deliveryTime": 30,
                    "score": 5,
                    "rateType": 0,
                    "text": "好吃",
                    "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
                    "recommend": []
                    },
                    {
                    "username": "l******3",
                    "rateTime": 1469101264000,
                    "deliveryTime": 40,
                    "score": 5,
                    "rateType": 0,
                    "text": "还不错吧",
                    "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
                    "recommend": []
                    },
                    {
                    "username": "3******o",
                    "rateTime": 1469091964000,
                    "deliveryTime": "",
                    "score": 2,
                    "rateType": 1,
                    "text": "",
                    "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
                    "recommend": []
                    },
                    {
                    "username": "3******p",
                    "rateTime": 1469081964000,
                    "deliveryTime": "",
                    "score": 4,
                    "rateType": 0,
                    "text": "很喜欢的粥",
                    "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
                    "recommend": []
                    },
                    {
                    "username": "o******k",
                    "rateTime": 1469071264000,
                    "deliveryTime": "",
                    "score": 5,
                    "rateType": 0,
                    "text": "",
                    "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
                    "recommend": []
                    },
                    {
                    "username": "k******b",
                    "rateTime": 1469061964000,
                    "deliveryTime": "",
                    "score": 4,
                    "rateType": 0,
                    "text": "",
                    "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
                    "recommend": []
                    }
                ]
            },
            /* eslint-disable */
            seller: {},
            goods: [],
            ratings: [],
            transitionName: "slide-left",
            routerDepth: ["products", "grade", "seller"],
            isAlertShow: false,
            isConfirmShow: false
        };
    },
    methods: {
        getInfo(){
                this.seller = this.data.seller;
                this.ratings =this.data.ratings;
                let temp = this.data.goods;
                for (let i = 0; i < temp.length; i++) {
                    let item = temp[i].foods;
                    temp[i]["calCount"] = 0;
                    for (let j = 0; j < item.length; j++) {
                        item[j]["count"] = 0;
                    }
                }
                if (temp.length > 0) {
                    this.goods = temp;
                }
        },
        // getInfo() {
        //     axios.get("api/index.json").then(res => {
        //         let data = res.data;
        //         this.seller = data.seller;
        //         this.ratings = data.ratings;
        //         let temp = data.goods;
        //         for (let i = 0; i < temp.length; i++) {
        //             let item = temp[i].foods;
        //             temp[i]["calCount"] = 0;
        //             for (let j = 0; j < item.length; j++) {
        //                 item[j]["count"] = 0;
        //             }
        //         }
        //         if (temp.length > 0) {
        //             this.goods = temp;
        //         }
        //     });
        // },
        toggleShow() {
            if (!this.isConfirmShow) {
                if (this.$store.state.countAll > 0) {
                    let isShow = !this.$store.state.isShow;
                    this.$store.commit("toggleShow", isShow);
                }
            }
        },
        load() {
            window.addEventListener("load", () => {
                this.$router.push("/");
            });
        },
        alertShow() {
            this.isAlertShow = true;
        },
        confirmShow() {
            this.isConfirmShow = true;
        },
        clearAll(data) {
            if (data) {
                let temp = this.goods;
                for (let i = 0; i < temp.length; i++) {
                    let item = temp[i].foods;
                    this.goods[i]["calCount"] = 0;
                    for (let j = 0; j < item.length; j++) {
                        item[j]["count"] = 0;
                    }
                }
                this.$store.commit("summary", { count: 0, price: 0 });
                this.$store.commit("toggleShow", false);
            }
            this.isConfirmShow = false;
            this.$emit("confirm-show", false);
        },
        closeAlertDialog() {
            this.isAlertShow = false;
        }
    },
    created() {
        this.getInfo();
        this.load();
        
    },
    watch: {
        $route(to, from) {
            let toDepth = to.path.split("/")[1];
            let fromDepth = from.path.split("/")[1];
            let toIndex = this.routerDepth.indexOf(toDepth);
            let fromIndex = this.routerDepth.indexOf(fromDepth);
            this.transitionName =
                toIndex < fromIndex ? "slide-right" : "slide-left";
            if (toIndex === 1) {
                this.$refs.line.style.transform = "translate3d(100%,0,0)";
            } else if (toIndex === 2) {
                this.$refs.line.style.transform = "translate3d(200%,0,0)";
            } else {
                this.$refs.line.style.transform = "translate3d(0,0,0)";
            }
        }
    },
    mounted() {
        $$("#app").addClass("nononono")
        let nnn = _.map([1, 2, 3], i => i + 1);
        console.log(nnn)
        console.log('VUE_APP_SECRET:'+process.env.VUE_APP_SECRET);
        
    }
};
</script>

<style lang="scss" scoped>
@import "assets/common/css/iconfont.css";
@import "assets/common/css/mixin.scss";
@import "assets/common/css/base.scss";

/* 购物车遮罩层动画 */
.fade-enter-active,
.fade-leave-active {
    transition: all 0.3s ease;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}

/* 购物车详情页动画 */
.move-enter,
.move-leave-active {
    transform: translate3d(0, 100%, 0);
}
.move-enter-active,
.move-leave-active {
    transition: all 0.3s ease-in-out;
}

/* 路由切换动画 */
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
    transition: all 0.3s ease;
}
.slide-left-enter,
.slide-left-leave-active,
.slide-right-enter,
.slide-left-leave-active {
    opacity: 0;
}
.slide-left-leave-active,
.slide-right-enter {
    transform: translate3d(-100%, 0, 0);
}
.slide-left-enter,
.slide-right-leave-active {
    transform: translate3d(100%, 0, 0);
}

.bounce-enter-active,
.bounce-leave-active {
    transition: all 0.3s ease;
}
.bounce-enter,
.bounce-leave-to {
    opacity: 0;
}
.bounce-enter-active {
    animation: bounce-in 0.3s;
}
.bounce-leave-active {
    animation: bounce-in 0.3s reverse;
}
@keyframes bounce-in {
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.2);
    }
    100% {
        transform: scale(1);
    }
}

.router-component {
    position: absolute;
    width: 100%;
    top: 178px;
    bottom: 48px;
}

.nav-tab {
    font-size: 0;
    height: 40px;
    line-height: 40px;
    vertical-align: middle;
    position: relative;
    border-bottom: 1px solid $vborder;
    .nav-line {
        transition: all 0.3s ease;
        transform: translate3d(0, 0, 0);
        position: absolute;
        left: 0;
        bottom: -1px;
        width: 33.33333333333%;
        height: 1px;
        background-color: rgb(240, 20, 20);
    }
    .tab-item {
        display: inline-block;
        width: 33.33333333333%;
        text-align: center;
        text-decoration: none;
        color: rgb(77, 85, 93);
        font-size: 14px;
        &.active {
            color: rgb(240, 20, 20);
        }
    }
}

.shop-cart-wrapper {
    width: 100%;
    height: 48px;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 3;
}

.detail-wrapper {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    z-index: 2;
}

.blur-bg {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(7, 17, 27, 0.6);
    filter: blur(10px);
    z-index: 1;
}
.dialog-bg {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(7, 17, 27, 0.6);
    filter: blur(10px);
    z-index: 4;
}

.dialog-confirm {
    position: fixed;
    left: 50%;
    top: 50%;
    margin-left: -135px;
    margin-top: -50px;
    width: 270px;
    text-align: center;
    background-color: #fff;
    z-index: 5;
    .dialog-confirm-title {
        color: #666;
        font-size: 14px;
        line-height: 22px;
        margin: 16px 0;
    }
    .dialog-confirm-btns {
        font-size: 0;
        @include border-top-1px($vborder);
        .dialog-confirm-btns-item {
            display: inline-block;
            width: 50%;
            color: #999;
            font-size: 16px;
            line-height: 1;
            padding: 17px 10px;
            &.ok {
                color: #fc9153;
                @include border-left-1px($vborder);
            }
        }
    }
}

.dialog-alert {
    text-align: center;
    position: fixed;
    left: 50%;
    top: 50%;
    margin-top: -75px;
    margin-left: -135px;
    z-index: 8;
    width: 270px;
    background-color: #fff;
    .dialog-alert-title {
        margin: 30px 16px 16px 16px;
        color: #333;
        font-size: 16px;
        line-height: 1;
    }
    .dialog-alert-content {
        color: #666;
        font-size: 14px;
        line-height: 22px;
        margin: 12px 16px 16px 16px;
    }
    .dialog-alert-btns {
        font-size: 16px;
        line-height: 1;
        padding: 17px 0;
        color: #fc9153;
        @include border-top-1px($vborder);
    }
}
</style>
