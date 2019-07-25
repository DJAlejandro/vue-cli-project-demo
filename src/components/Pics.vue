<template>
    <span :class="picClass"></span>
</template>

<script>
export default {
    props: ["indexArr", "index"],
    data() {
        return {
            type: ["decrease", "discount", "special", "invoice", "guarantee"]
        };
    },
    computed: {
        picClass() {
            return `type${this.indexArr} ${this.type[this.index]}`;
        }
    }
};
</script>
<style lang="scss" scoped>
@import "assets/common/css/mixin.scss";
@import "assets/common/css/base.scss";

.type1 {
    display: inline-block;
    width: 12px;
    height: 12px;
    background-size: 12px 12px;
    background-repeat: no-repeat;
    &.decrease {
        @include bg-img("../assets/img/sprites/decrease/decrease_1");
    }
    &.discount {
        @include bg-img("../assets/img/sprites/discount/discount_1");
    }
    &.guarantee {
        @include bg-img("../assets/img/sprites/guarantee/guarantee_1");
    }
    &.invoice {
        @include bg-img("../assets/img/sprites/invoice/invoice_1");
    }
    &.special {
        @include bg-img("../assets/img/sprites/special/special_1");
    }
}
.type2 {
    display: inline-block;
    width: 16px;
    height: 16px;
    background-size: 16px 16px;
    background-repeat: no-repeat;
    &.decrease {
        @include bg-img("../assets/img/sprites/decrease/decrease_2");
    }
    &.discount {
        @include bg-img("../assets/img/sprites/discount/discount_2");
    }
    &.guarantee {
        @include bg-img("../assets/img/sprites/guarantee/guarantee_2");
    }
    &.invoice {
        @include bg-img("../assets/img/sprites/invoice/invoice_2");
    }
    &.special {
        @include bg-img("../assets/img/sprites/special/special_2");
    }
}

.type3 {
    display: inline-block;
    width: 12px;
    height: 12px;
    background-size: 12px 12px;
    background-repeat: no-repeat;
    &.decrease {
        @include bg-img("../assets/img/sprites/decrease/decrease_3");
    }
    &.discount {
        @include bg-img("../assets/img/sprites/discount/discount_3");
    }
    &.guarantee {
        @include bg-img("../assets/img/sprites/guarantee/guarantee_3");
    }
    &.invoice {
        @include bg-img("../assets/img/sprites/invoice/invoice_3");
    }
    &.special {
        @include bg-img("../assets/img/sprites/special/special_3");
    }
}
.type4 {
    display: inline-block;
    width: 16px;
    height: 16px;
    background-size: 16px 16px;
    background-repeat: no-repeat;
    &.decrease {
        @include bg-img("../assets/img/sprites/decrease/decrease_4");
    }
    &.discount {
        @include bg-img("../assets/img/sprites/discount/discount_4");
    }
    &.guarantee {
        @include bg-img("../assets/img/sprites/guarantee/guarantee_4");
    }
    &.invoice {
        @include bg-img("../assets/img/sprites/invoice/invoice_4");
    }
    &.special {
        @include bg-img("../assets/img/sprites/special/special_4");
    }
}
</style>
