<template>
    <div class="ratings" v-show="rdata">
        <div class="ratings-header border-1px">
            <div
                class="ratings-all"
                @click="changeRatings(ALL,ALL)"
                :class="{active:isActive==ALL}"
            >
                <span class="text">{{desc.all}}</span>
                <span class="num">{{rdata.all}}</span>
            </div>
            <div
                class="ratings-positive"
                @click="changeRatings(POSITIVE,POSITIVE)"
                :class="{active:isActive==POSITIVE}"
            >
                <span class="text">{{desc.positive}}</span>
                <span class="num">{{rdata.positive}}</span>
            </div>
            <div
                class="ratings-negative"
                @click="changeRatings(NEGATIVE,NEGATIVE)"
                :class="{active:isActive==NEGATIVE}"
            >
                <span class="text">{{desc.negative}}</span>
                <span class="num">{{rdata.negative}}</span>
            </div>
        </div>
        <div class="ratings-filter" @click="toggleEmptyComment">
            <i class="iconfont icon-right1" :class="{active:hideEmpty}"></i>
            只查看有评价的内容
        </div>
    </div>
</template>

<script type="text/javascript">
const ALL = 2;
const POSITIVE = 0;
const NEGATIVE = 1;
export default {
    props: ["desc", "rdata", "nowType", "isActive", "hideEmpty"],
    data() {
        return {
            ALL,
            POSITIVE,
            NEGATIVE
        };
    },
    methods: {
        changeRatings(nowType, isActive) {
            this.$emit("change-ratings", nowType, isActive);
        },
        toggleEmptyComment() {
            this.$emit("empty-comment");
        }
    }
};
</script>

<style lang="scss" scoped>
@import "assets/common/css/mixin.scss";
@import "assets/common/css/base.scss";

.ratings {
    text-align: left;
    .ratings-header {
        padding: 18px 0;
        margin: 0 18px;
        font-size: 0;
        @include border-bottom-1px(rgba(7, 17, 27, 0.1));
        &:last-child {
            border-bottom: none;
        }
        .ratings-all,
        .ratings-positive,
        .ratings-negative {
            display: inline-block;
            padding: 8px 12px;
            border-radius: 2px;
            margin-right: 8px;
            .text {
                font-size: 12px;
            }
            .num {
                font-size: 8px;
                margin-left: 2px;
            }
            .num,
            .text {
                color: rgb(77, 85, 93);
                line-height: 16px;
            }
            &.active {
                .num,
                .text {
                    color: #fff;
                }
            }
        }
        .ratings-all,
        .ratings-positive {
            background-color: rgba(0, 160, 220, 0.2);
            &.active {
                background-color: $vblue;
            }
        }
        .ratings-negative {
            background-color: rgba(77, 85, 93, 0.2);
            &.active {
                background-color: rgb(77, 85, 93);
            }
        }
    }
    .ratings-filter {
        padding: 12px 18px;
        line-height: 24px;
        font-size: 12px;
        color: $vgray;
        border-bottom: 1px solid $vborder;
        vertical-align: top;
        .icon-right1 {
            display: inline-block;
            font-size: 24px;
            line-height: 24px;
            color: $vgray;
            vertical-align: top;
            margin-right: 4px;
            &.active {
                color: #00c850;
            }
        }
    }
}
</style>
