<template>
    <div class="products-detail" ref="detail">
        <div>
            <div class="detail-close" @click="detailClose">
                <i class="iconfont icon-back"></i>
            </div>

            <div class="products-detail-img">
                <img :src="food.image" />
            </div>
            <div class="products-detail-content">
                <div class="products-detail-name">{{food.name}}</div>
                <div class="products-detail-desc">
                    <span class="products-detail-text">月售{{food.sellCount}}份</span>
                    <span class="products-detail-rating">好评率{{food.rating}}%</span>
                </div>
                <div class="products-detail-price">
                    <span class="new-price">
                        <span class="yuan">￥</span>
                        {{food.price}}
                    </span>
                    <span v-if="food.oldPrice" class="old-price">
                        <span class="yuan">￥</span>
                        {{food.oldPrice}}
                    </span>
                    <span class="price-button">
                        <price-button v-show="food.count" :food="food" @summary="summary"></price-button>
                        <span class="zero" v-show="!food.count" @click="summary(true)">加入购物车</span>
                    </span>
                </div>
            </div>
            <div class="section-block" v-show="food.info"></div>

            <div class="products-detail-info" v-show="food.info">
                <h2>商品介绍</h2>
                <p>{{food.info}}</p>
            </div>
            <div class="section-block"></div>
            <div class="products-detail-rating-info">
                <h2>商品评价</h2>
            </div>
            <rating
                :rdata="rdata"
                nowType="nowType"
                :isActive="isActive"
                :hideEmpty="hideEmpty"
                :desc="desc"
                @empty-comment="toggleEmptyComment"
                @change-ratings="changeRatings"
            ></rating>
            <div class="ratings-content" v-if="food">
                <ul v-if="food.ratings">
                    <template v-for="item in food.ratings">
                        <li
                            :key="item.username"
                            class="ratings-content-item border-1px"
                            v-if="showItem(item)"
                        >
                            <div class="ratings-title">
                                {{day(item.rateTime)}}
                                <div class="ratings-user">
                                    {{item.username}}
                                    <div class="ratings-img">
                                        <img :src="item.avatar" />
                                    </div>
                                </div>
                            </div>
                            <div class="ratings-text">
                                <i
                                    class="iconfont"
                                    :class="{'icon-good':item.rateType===0,'icon-bad':item.rateType===1}"
                                ></i>
                                {{item.text}}
                            </div>
                        </li>
                    </template>
                </ul>
                <div class="ratings-content-item" v-if="Number(food.ratings)===0">
                    <div class="ratings-title">暂无评价</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/javascript">
import PriceButton from "components/Button.vue";
import Rating from "components/Rating.vue";
import BScroll from "better-scroll";
import { date } from "assets/common/js/getDate.js";
const ALL = 2;
// eslint-disable-next-line
const POSITIVE = 0;
// eslint-disable-next-line
const NEGATIVE = 1;
export default {
    props: ["food", "goods"],
    components: {
        PriceButton,
        Rating
    },
    data() {
        return {
            desc: {
                all: "全部",
                positive: "推荐",
                negative: "吐槽"
            },
            rdata: {
                positive: 0,
                negative: 0,
                all: 0
            },
            hideEmpty: false,
            nowType: ALL,
            isActive: ALL
        };
    },
    methods: {
        summary(data) {
            if (data === true) {
                this.$set(this.food, "count", 1);
            }
            this.$emit("summary");
        },
        detailClose() {
            this.$emit("detail-close");
        },
        refresh() {
            this.$nextTick(function() {
                this.productDetail.refresh();
            });
        },
        changeRatings(nowType, isActive) {
            this.nowType = nowType;
            this.isActive = isActive;
        },
        toggleEmptyComment() {
            this.hideEmpty = !this.hideEmpty;
            this.productDetail.refresh();
        },
        showItem(item) {
            if (this.hideEmpty && item.text.length === 0) {
                return false;
            }
            if (this.nowType === ALL) {
                return true;
            } else {
                return item.rateType === this.nowType;
            }
            // eslint-disable-next-line
            this.refresh();
        },
        day(data) {
            return date(data);
        },
        initRdata() {
            let ratings = this.food.ratings;
            let positive = 0;
            this.rdata.all = ratings.length;
            for (let i = 0; i < ratings.length; i++) {
                if (!ratings[i].rateType) {
                    positive++;
                }
            }
            this.rdata.positive = positive;
            this.rdata.negative = this.rdata.all - this.rdata.positive;
        }
    },
    mounted() {
        this.$nextTick(function() {
            if (!this.productDetail) {
                this.productDetail = new BScroll(this.$refs.detail, {
                    click: true
                });
            } else {
                this.productDetail.refresh();
            }
        });
    },
    watch: {
        food() {
            this.$nextTick(function() {
                this.initRdata();
            });
        }
    }
};
</script>

<style lang="scss" scoped>
@import "assets/common/css/mixin.scss";
@import "assets/common/css/base.scss";

.products-detail {
    height: 100%;
    overflow: hidden;
    .detail-close {
        position: absolute;
        left: 10px;
        top: 10px;
        color: #fff;
        font-size: 20px;
        padding: 10px;
        z-index: 4;
        background-color: rgba(200, 200, 200, 0.5);
        border-radius: 50%;
    }

    //宽度自适应图片布局
    .products-detail-img {
        position: relative;
        width: 100%;
        padding-bottom: 100%; //比例自适应布局---正方形
        img {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
        }
    }
    .products-detail-content {
        padding: 18px;
        text-align: left;
        .products-detail-name {
            height: 14px;
            line-height: 14px;
            font-weight: 700;
            color: $vblack;
        }
        .products-detail-desc {
            font-size: 0;
            margin: 8px 0 18px 0;
            .products-detail-text,
            .products-detail-rating {
                display: inline-block;
                color: $vgray;
                font-size: 10px;
                line-height: 10px;
            }
            .products-detail-rating {
                margin-left: 12px;
            }
        }
        .products-detail-price {
            font-size: 0;
            width: 100%;
            .new-price,
            .old-price {
                display: inline-block;
                line-height: 24px;
            }
            .yuan {
                font-size: 10px;
                font-weight: normal;
                vertical-align: bottom;
            }
            .new-price {
                font-size: 14px;
                font-weight: 700;
                color: rgb(240, 20, 20);
                vertical-align: bottom;
                .yuan {
                    color: rgb(240, 20, 20);
                }
            }
            .old-price {
                margin-left: 8px;
                font-size: 10px;
                font-weight: 700;
                color: $vgray;
                vertical-align: top;
                text-decoration: line-through;
                .yuan {
                    color: $vgray;
                }
            }
            .price-button {
                float: right;
            }
            .zero {
                display: inline-block;
                width: 84px;
                height: 24px;
                text-align: center;
                border-radius: 12px;
                background-color: $vblue;
                padding: 6px 12px;
                line-height: 12px;
                font-size: 10px;
                color: #fff;
            }
        }
    }
    .products-detail-info {
        padding: 18px;
        text-align: left;
        h2 {
            font-size: 14px;
            line-height: 14px;
            height: 14px;
            color: $vblack;
            margin-bottom: 6px;
        }
        p {
            margin-left: 8px;
            margin-right: 8px;
            font-size: 12px;
            line-height: 24px;
            color: rgb(77, 85, 93);
        }
    }
    .products-detail-rating-info {
        padding: 18px 0 0 18px;
        text-align: left;
        h2 {
            font-size: 14px;
            line-height: 14px;
            height: 14px;
            color: $vblack;
        }
    }
    .ratings-content {
        text-align: left;
        .ratings-content-item {
            padding: 16px 0;
            margin: 0 18px;
            @include border-bottom-1px($vborder);
            &:last-child {
                @include border-none;
            }
            .ratings-title {
                font-size: 10px;
                line-height: 12px;
                color: $vgray;
                margin-bottom: 6px;
                .ratings-user {
                    float: right;
                    font-size: 10px;
                    line-height: 12px;
                    color: $vgray;
                    .ratings-img {
                        float: right;
                        margin-left: 6px;
                        height: 12px;
                        width: 12px;
                        img {
                            width: 100%;
                            height: 100%;
                            border-radius: 50%;
                        }
                    }
                }
            }

            .ratings-text {
                font-size: 12px;
                line-height: 16px;
                color: $vblack;
                .iconfont {
                    display: inline-block;
                    font-size: 12px;
                    line-height: 16px;
                    margin-right: 4px;
                }
                .icon-good {
                    color: $vblue;
                }
                .icon-bad {
                    color: $vgray;
                }
            }
        }
    }
}
</style>
