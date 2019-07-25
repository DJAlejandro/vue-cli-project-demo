<template>
    <div class="shop-cart clearfix">
        <div class="shop-cart-left">
            <div class="cart-left-content">
                <div class="shop-calculate">
                    <div
                        class="calculate-content"
                        @click="toggleShow"
                        :class="{active:this.$store.state.countAll>0}"
                    >
                        <i class="iconfont icon-cart"></i>
                    </div>
                    <span
                        class="count-all"
                        v-show="this.$store.state.countAll>0"
                    >{{this.$store.state.countAll}}</span>
                </div>
                <span
                    class="shop-price-all border-right-1px"
                    :class="{active:this.$store.state.countAll>0}"
                >￥{{this.$store.state.priceAll}}</span>
                <span class="delivery-price">另需配送费￥{{seller.deliveryPrice}}元</span>
            </div>
        </div>
        <div class="shop-cart-right">
            <span
                class="shop-cart-btn"
                :class="{active:isActive}"
                @click="openAlertDialog"
            >{{cartContent}}</span>
        </div>
    </div>
</template>

<script type="text/javascript">
export default {
    props: ["seller", "goods"],
    data() {
        return {
            isActive: false
        };
    },
    methods: {
        toggleShow() {
            if (this.$store.state.countAll > 0) {
                let isShow = !this.$store.state.isShow;
                this.$store.commit("toggleShow", isShow);
            }
        },
        openAlertDialog() {
            if (this.isActive) {
                this.$emit("alert-show");
            }
        }
    },
    computed: {
        cartContent() {
            let priceAll = this.$store.state.priceAll;
            let diff = this.seller.minPrice - priceAll;
            if (priceAll === 0) {
                this.isActive = false;
                return `￥${this.seller.minPrice}元起送`;
            } else if (diff > 0) {
                this.isActive = false;
                return `还差￥${diff}元起送`;
            } else {
                this.isActive = true;
                return `结算`;
            }
        }
    }
};
</script>

<style lang="scss" scoped>
@import "assets/common/css/mixin.scss";
@import "assets/common/css/base.scss";

.shop-cart {
    position: relative;
    background-color: #141d27;
    padding-left: 80px;
    text-align: left;
    font-size: 0;

    .shop-cart-left {
        padding: 12px 0;
        width: 100%;
        float: left;
        .cart-left-content {
            margin-right: 105px;
        }
    }

    .shop-calculate {
        position: absolute;
        left: 12px;
        bottom: 2px;
        width: 56px;
        height: 56px;
        border-radius: 50%;
        background-color: #141d27;
        .calculate-content {
            width: 44px;
            height: 44px;
            margin: 6px;
            background-color: #333;
            border-radius: 50%;
            text-align: center;
            vertical-align: middle;
            .iconfont {
                line-height: 44px;
                font-size: 24px;
                color: rgba(255, 255, 255, 0.4);
            }
            &.active {
                background-color: $vblue;
                .iconfont {
                    color: rgb(255, 255, 255);
                }
            }
        }
        .count-all {
            display: inline-block;
            position: absolute;
            top: 0;
            right: 0;
            width: 24px;
            height: 16px;
            padding: 0 6px;
            line-height: 16px;
            font-size: 9px;
            font-weight: 700;
            color: rgb(255, 255, 255);
            border-radius: 12px;
            background-color: rgb(240, 20, 20);
            text-align: center;
            vertical-align: middle;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
        }
    }
    .shop-price-all {
        display: inline-block;
        font-size: 16px;
        font-weight: 700;
        color: rgba(255, 255, 255, 0.4);
        line-height: 24px;
        height: 24px;
        padding-right: 12px;
        @include border-right-1px(rgba(255, 255, 255, 0.1));
        vertical-align: middle;
        &.active {
            color: #fff;
        }
    }
    .delivery-price {
        display: inline-block;
        font-size: 10px;
        color: rgba(255, 255, 255, 0.4);
        line-height: 24px;
        height: 24px;
        padding-left: 12px;
        vertical-align: middle;
    }

    .shop-cart-right {
        float: left;
        margin-left: -105px;
        .shop-cart-btn {
            display: table-cell;
            width: 105px;
            height: 48px;
            background-color: #333;
            padding: 0 8px;
            text-align: center;
            font-size: 12px;
            vertical-align: middle;
            color: rgba(255, 255, 255, 0.4);
            font-weight: 700;
            &.active {
                background-color: #00b43c;
                color: rgb(255, 255, 255);
            }
        }
    }
}
</style>
