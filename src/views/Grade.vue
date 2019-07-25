<template>
    <div class="evaluate" ref="evaluate">
        <div>
            <div class="evaluate-header">
                <div class="evaluate-rank-rate border-right-1px">
                    <h2 class="rank-rate-score">{{seller.score}}</h2>
                    <p class="rank-rate-text">综合评分</p>
                    <p class="rank-rate-desc">高于周边商家{{seller.rankRate}}%</p>
                </div>
                <div class="evaluate-score">
                    <div class="evaluate-score-item">
                        <div class="evaluate-score-title">商品评分</div>
                        <div class="star-wrapper">
                            <star size="36" :score="seller.foodScore"></star>
                        </div>
                        <div class="evaluate-score-content">{{seller.foodScore}}</div>
                    </div>
                    <div class="evaluate-score-item">
                        <div class="evaluate-score-title">服务态度</div>
                        <div class="star-wrapper">
                            <star size="36" :score="seller.serviceScore"></star>
                        </div>
                        <div class="evaluate-score-content">{{seller.serviceScore}}</div>
                    </div>
                    <div class="evaluate-score-item">
                        <div class="evaluate-score-title">送货时间</div>
                        <div class="evaluate-score-delivery">{{seller.deliveryTime}}分钟</div>
                    </div>
                </div>
            </div>
            <div class="section-block"></div>
            <rating
                :rdata="rdata"
                nowType="nowType"
                :isActive="isActive"
                :hideEmpty="hideEmpty"
                :desc="desc"
                @empty-comment="toggleEmptyComment"
                @change-ratings="changeRatings"
            ></rating>
            <div class="evaluate-list">
                <ul>
                    <template v-for="item in ratings">
                        <li
                            class="evaluate-list-item border-1px"
                            :key="item.username"
                            v-show="showItem(item)"
                        >
                            <div class="evaluate-list-img">
                                <img :src="item.avatar" />
                            </div>
                            <div class="evaluate-list-content">
                                <div class="evaluate-list-title">
                                    {{item.username}}
                                    <div class="evaluate-rateTime">{{day(item.rateTime)}}</div>
                                </div>
                                <div class="evaluate-list-desc">
                                    <div class="star-wrapper2">
                                        <star size="24" :score="item.score"></star>
                                    </div>
                                    <div
                                        class="evaluate-deliveryTime"
                                        v-if="item.deliveryTime"
                                    >{{item.deliveryTime}}分钟送达</div>
                                </div>
                                <div
                                    class="evaluate-list-text"
                                    v-show="item.text.length"
                                >{{item.text}}</div>
                                <div class="evaluate-list-recommend" v-if="item.recommend.length">
                                    <div class="evaluate-recommend-left">
                                        <i
                                            class="iconfont"
                                            :class="{'icon-good':item.rateType===0,'icon-bad':item.rateType===1}"
                                        ></i>
                                    </div>
                                    <div class="evaluate-recommend-right">
                                        <template v-for="(item,index) in item.recommend">
                                            <span class="recommend-content" :key="index">{{item}}</span>
                                        </template>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </template>
                </ul>
            </div>
        </div>
    </div>
</template>

<script type="text/javascript">
import BScroll from "better-scroll";
import Rating from "components/Rating.vue";
import Star from "components/Star.vue";
import { date } from "assets/common/js/getDate.js";
// eslint-disable-next-line
const ALL = 2;
// eslint-disable-next-line
const POSITIVE = 0;
// eslint-disable-next-line
const NEGATIVE = 1;
export default {
    props: ["seller", "ratings"],
    components: {
        Rating,
        Star
    },
    data() {
        return {
            desc: {
                all: "全部",
                positive: "推荐",
                negative: "不推荐"
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
        refresh() {
            this.$nextTick(function() {
                this.evaluate.refresh();
            });
        },
        changeRatings(nowType, isActive) {
            this.nowType = nowType;
            this.isActive = isActive;
        },
        toggleEmptyComment() {
            this.hideEmpty = !this.hideEmpty;
            this.refresh();
        },
        showItem(item) {
            if (this.hideEmpty) {
                if (item.text.length === 0) {
                    return false;
                }
            }
            if (this.nowType === ALL) {
                return true;
            } else {
                return item.rateType === this.nowType;
            }
            // eslint-disable-next-line
            this.refresh();
        },
        initRdata() {
            let ratings = this.ratings;
            let positive = 0;
            this.rdata.all = ratings.length;
            for (let i = 0; i < ratings.length; i++) {
                if (!ratings[i].rateType) {
                    positive++;
                }
            }
            this.rdata.positive = positive;
            this.rdata.negative = this.rdata.all - this.rdata.positive;
        },
        day(data) {
            return date(data);
        }
    },
    mounted() {
        this.$nextTick(function() {
            this.initRdata();

            if (!this.evaluate) {
                this.evaluate = new BScroll(this.$refs.evaluate, {
                    click: true
                });
            } else {
                this.evaluate.refresh();
            }
        });
    }
};
</script>

<style lang="scss" scoped>
@import "assets/common/css/mixin.scss";
@import "assets/common/css/base.scss";

.evaluate {
    position: absolute;
    width: 100%;
    top: 178px;
    bottom: 48px;
    overflow: hidden;
    .evaluate-header {
        padding: 18px 0;
        .evaluate-rank-rate {
            float: left;
            width: 137px;
            text-align: center;
            @include border-right-1px($vborder);
            @media only screen and (max-width: 360px) {
                width: 115px;
            }
            .rank-rate-score {
                font-size: 24px;
                line-height: 28px;
                color: rgb(255, 153, 0);
            }
            .rank-rate-text {
                margin-top: 6px;
                margin-bottom: 8px;
                font-size: 12px;
                line-height: 12px;
                color: $vblack;
            }
            .rank-rate-desc {
                margin-bottom: 6px;
                font-size: 10px;
                line-height: 10px;
                color: $vgray;
            }
        }
        .evaluate-score {
            padding: 0 24px;
            margin-left: 137px;
            @media only screen and (max-width: 360px) {
                padding: 0 8px;
                margin-left: 115px;
            }
            .evaluate-score-item {
                margin-bottom: 8px;
                text-align: left;
                font-size: 0;
                &:last-child {
                    margin-bottom: 0;
                }
                .evaluate-score-title,
                .star-wrapper,
                .evaluate-score-content,
                .evaluate-score-delivery {
                    display: inline-block;
                    vertical-align: top;
                }
                .evaluate-score-title {
                    font-size: 12px;
                    line-height: 18px;
                    color: $vblack;
                }
                .star-wrapper {
                    height: 18px;
                    margin: 0 12px;
                }
                .evaluate-score-content {
                    font-size: 12px;
                    line-height: 18px;
                    color: rgb(255, 153, 0);
                }
                .evaluate-score-delivery {
                    font-size: 12px;
                    line-height: 18px;
                    color: $vgray;
                    margin-left: 12px;
                }
            }
        }
    }
    .evaluate-list {
        .evaluate-list-item {
            padding: 18px 0;
            margin: 0 18px;
            @include border-bottom-1px($vborder);
            &:last-child {
                @include border-none;
            }
        }
        .evaluate-list-img {
            width: 28px;
            float: left;
            img {
                width: 28px;
                height: 28px;
                border-radius: 50%;
            }
        }
        .evaluate-list-content {
            margin-left: 40px;
            text-align: left;
            .evaluate-list-title {
                font-size: 10px;
                line-height: 12px;
                color: $vblack;
                .evaluate-rateTime {
                    float: right;
                    font-size: 10px;
                    line-height: 12px;
                    color: $vgray;
                }
            }
            .evaluate-list-desc {
                margin-top: 4px;
                .star-wrapper2 {
                    display: inline-block;
                    height: 12px;
                }
                .evaluate-deliveryTime {
                    margin-left: 6px;
                    display: inline-block;
                    font-size: 10px;
                    line-height: 12px;
                    color: $vgray;
                }
            }
            .evaluate-list-text {
                margin-top: 6px;
                font-size: 12px;
                line-height: 18px;
                color: $vblack;
            }
            .evaluate-list-recommend {
                margin-top: 8px;
                .evaluate-recommend-left {
                    float: left;
                    margin-right: 8px;
                    .iconfont {
                        display: inline-block;
                        font-size: 12px;
                        line-height: 16px;
                    }
                    .icon-good {
                        color: $vblue;
                    }
                    .icon-bad {
                        color: $vgray;
                    }
                }
                .evaluate-recommend-right {
                    font-size: 0;
                    margin-bottom: -8px;
                    .recommend-content {
                        display: inline-block;
                        margin-right: 8px;
                        margin-bottom: 8px;
                        padding: 0 6px;
                        max-width: 62px;
                        height: 16px;
                        line-height: 16px;
                        font-size: 9px;
                        color: $vgray;
                        border: 1px solid $vborder;
                        border-radius: 1px;
                        @include ellipsis;
                        &:last-child {
                            margin-right: 0;
                        }
                    }
                }
            }
        }
    }
}
</style>
