<template>
    <div class="star">
        <div
            v-for="(item,index) in starClass"
            class="star-item"
            :class="[item,starSize]"
            :key="index"
        ></div>
    </div>
</template>

<script type="text/javascript">
// import { square } from "../js/index.js";
// square(1, 2);
// // let [a, b, c] = [1, 2, 3];
// // const s = new Set();

// // [2, 3, 5, 4, 5, 2, 2].forEach(x => s.add(x));

// for (let i of s) {
//     console.log(i);
// }
export default {
    props: ["score", "size"],
    data() {
        return {
            starClass: []
        };
    },
    methods: {
        starPoint() {
            let starArr = [];
            let onScore = Math.floor(this.score);
            let halfScore = this.score - onScore >= 0.5 ? 1 : 0;
            let offScore = 5 - onScore - halfScore;
            for (let i = 0; i < onScore; i++) {
                starArr.push("on");
            }
            if (halfScore) {
                starArr.push("half");
            }
            for (let i = 0; i < offScore; i++) {
                starArr.push("off");
            }
            this.starClass = starArr;
        }
    },

    watch: {
        score: function() {
            this.$nextTick(function() {
                this.starPoint();
            });
        }
    },
    mounted() {
        this.$nextTick(function() {
            this.starPoint();
        });
    },
    computed: {
        starSize() {
            return "star" + this.size;
        }
    }
};
</script>

<style lang="scss" scoped>
@import "assets/common/css/mixin.scss";
@import "assets/common/css/base.scss";
@import "../css/index.css";

.star {
    font-size: 0;
    .star-item {
        display: inline-block;
    }
}

.star24 {
    width: 10px;
    height: 10px;
    background-size: 10px 10px;
    margin-left: 1.5px;
    margin-right: 1.5px;
    &:first-child {
        margin-left: 0;
    }
    &:last-child {
        margin-right: 0;
    }
    &.on {
        @include bg-img("../assets/img/sprites/star/star24_on");
    }
    &.off {
        @include bg-img("../assets/img/sprites/star/star24_off");
    }
    &.half {
        @include bg-img("../assets/img/sprites/star/star24_half");
    }
}
.star36 {
    width: 15px;
    height: 15px;
    background-size: 15px 15px;
    margin-left: 3px;
    margin-right: 3px;
    &:first-child {
        margin-left: 0;
    }
    &:last-child {
        margin-right: 0;
    }
    &.on {
        @include bg-img("../assets/img/sprites/star/star36_on");
    }
    &.off {
        @include bg-img("../assets/img/sprites/star/star36_off");
    }
    &.half {
        @include bg-img("../assets/img/sprites/star/star36_half");
    }
}
.star48 {
    width: 20px;
    height: 20px;
    background-size: 20px 20px;
    margin-left: 10px;
    margin-right: 10px;
    &:first-child {
        margin-left: 0;
    }
    &:last-child {
        margin-right: 0;
    }
    &.on {
        @include bg-img("../assets/img/sprites/star/star48_on");
    }
    &.off {
        @include bg-img("../assets/img/sprites/star/star48_off");
    }
    &.half {
        @include bg-img("../assets/img/sprites/star/star48_half");
    }
}
</style>
