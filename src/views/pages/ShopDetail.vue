<template>
    <div class="shop-detail" @click.stop>
        <div class="detail-title">
            <span class="detail-title-text" :class="{android:AndroidPx}">购物车</span>
            <div class="clear-all" @click="openDeleteDialog">清空</div>
        </div>
        <div class="shop-detail-list" ref="detailList">
            <ul>
                <template v-for="good in goods">
                    <template v-for="food in good.foods">
                        <li
                            class="shop-detail-item border-1px clearfix"
                            v-if="food.count"
                            :key="food.name"
                        >
                            {{food.name}}
                            <div class="shop-detail-price">
                                <span class="yuan">￥</span>
                                <span class="new">{{food.price*food.count}}</span>
                                <span class="price-button">
                                    <price-button :food="food" @summary="summary"></price-button>
                                </span>
                            </div>
                        </li>
                    </template>
                </template>
            </ul>
        </div>
    </div>
</template>
<script type="text/javascript">
import PriceButton from "components/Button.vue";
import BScroll from "better-scroll";
import { isAndroid } from "assets/common/js/Android.js";

export default {
    props: ["goods"],
    components: {
        PriceButton
    },
    methods: {
        summary() {
            let temp = this.goods;
            let count = 0;
            let price = 0;
            for (let i = 0; i < temp.length; i++) {
                let item = temp[i].foods;
                let calCount = 0;
                for (let j = 0; j < item.length; j++) {
                    calCount = calCount + item[j]["count"];
                    count = item[j]["count"] + count;
                    price = item[j]["count"] * item[j]["price"] + price;
                }
                this.goods[i]["calCount"] = calCount;
            }

            this.$store.commit("summary", { count, price });

            if (!count) {
                this.$store.commit("toggleShow", false);
            }
        },
        openDeleteDialog() {
            this.$emit("confirm-show");
        }
    },
    created() {
        if (isAndroid()) {
            this.AndroidPx = true;
        }
    },
    mounted() {
        this.$nextTick(function() {
            if (!this.DetailList) {
                this.DetailList = new BScroll(this.$refs.detailList, {
                    click: true
                });
            } else {
                this.DetailList.refresh();
            }
        });
    }
};
</script>

<style lang="scss" scoped>
@import "assets/common/css/mixin.scss";
@import "assets/common/css/base.scss";

.shop-detail {
    background-color: rgb(255, 255, 255);
    position: absolute;
    bottom: 48px;
    left: 0;
    width: 100%;
    .detail-title {
        height: 40px;
        padding: 0 18px;
        background-color: $bggray;
        border-bottom: 1px solid $vborder;
        .detail-title-text {
            line-height: 40px;
            font-size: 14px;
            color: $vblack;
            text-align: left;
        }
        .clear-all {
            display: inline-block;
            float: right;
            line-height: 40px;
            height: 40px;
            font-size: 12px;
            color: $vblue;
        }
    }
    .shop-detail-list {
        max-height: 217px;
        overflow: hidden;
        padding: 0 18px;
        .shop-detail-item {
            height: 48px;
            text-align: left;
            font-size: 14px;
            line-height: 24px;
            padding: 12px 0;
            color: $vblack;
            @include border-bottom-1px($vborder);
            &:last-child {
                @include border-none;
            }
        }
    }
}
.shop-detail-price {
    display: inline-block;
    float: right;
    height: 24px;
    font-size: 0;
    vertical-align: middle;
    .yuan,
    .new,
    .price-button {
        display: inline-block;
        height: 24px;
        line-height: 24px;
        vertical-align: middle;
    }
    .yuan {
        font-size: 10px;
        font-weight: normal;
        color: rgb(240, 20, 20);
    }
    .new {
        font-size: 14px;
        font-weight: 700;
        color: rgb(240, 20, 20);
        margin-right: 12px;
    }
}
</style>