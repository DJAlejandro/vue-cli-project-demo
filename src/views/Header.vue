<template>
    <div class="header">
        <div class="header-content clearfix">
            <div class="header-content-left">
                <img :src="seller.avatar" />
            </div>
            <div class="header-content-right">
                <div class="header-title">
                    <span class="header-title-brand"></span>
                    <span :class="{android:AndroidPx}">{{seller.name}}</span>
                </div>
                <div class="header-desc">{{seller.description}} / {{seller.deliveryTime}}分钟送达~~</div>
                <div v-if="seller.supports" class="header-supports" :class="{android:AndroidPx}">
                    <pics
                        class="header-supports-brand"
                        :index="seller.supports[0].type"
                        indexArr="1"
                    ></pics>
                    <span :class="{android:AndroidPx}">{{seller.supports[0].description}}</span>
                </div>
            </div>
            <div v-if="seller.supports" class="header-more" @click="showCover">
                <span class="header-count">{{seller.supports.length}}个</span>
                <i class="iconfont icon-right" :class="{android:AndroidPx}"></i>
            </div>
        </div>
        <div class="header-bulletin" @click="showCover">
            <div class="header-bulletin-left"></div>
            <div class="header-bulletin-right" :class="{android:AndroidPx}">
                <i class="iconfont icon-right"></i>
            </div>
            <div class="header-bulletin-main" :class="{android:AndroidPx}">{{seller.bulletin}}</div>
        </div>
        <div class="header-bgimg">
            <img :src="seller.avatar" />
        </div>
        <transition name="full-screen">
            <div class="full-screen" v-show="isShow">
                <div class="wrapper clearfix">
                    <div class="full-screen-content">
                        <h1>{{seller.name}}</h1>
                        <div class="star-wrapper">
                            <star size="48" :score="seller.score"></star>
                        </div>
                        <div class="full-screen-info">
                            <span class="flex-line"></span>
                            <span class="flex-main">优惠信息</span>
                            <span class="flex-line"></span>
                        </div>
                        <div class="full-screen-info-detail" v-if="seller.supports">
                            <ul>
                                <li
                                    v-for="(item,index) in seller.supports"
                                    :key="index"
                                    class="full-screen-info-item"
                                >
                                    <pics
                                        class="full-screen-info-brand"
                                        :index="item.type"
                                        indexArr="2"
                                    ></pics>
                                    {{item.description}}
                                </li>
                            </ul>
                        </div>
                        <div class="full-screen-info">
                            <span class="flex-line"></span>
                            <span class="flex-main">商家公告</span>
                            <span class="flex-line"></span>
                        </div>
                        <div class="full-screen-bulletin">{{seller.bulletin}}</div>
                    </div>
                </div>
                <div class="footer">
                    <i class="iconfont icon-close" @click="closeCover"></i>
                </div>
            </div>
        </transition>
    </div>
</template>

<script type="text/javascript">
import Star from "components/Star.vue";
import Pics from "components/Pics.vue";
// import axios from "axios";
import { isAndroid } from "assets/common/js/Android.js";
export default {
    props: ["seller"],
    components: {
        Star,
        Pics
    },
    data() {
        return {
            isShow: false,
            AndroidPx: false
        };
    },
    methods: {
        showCover() {
            this.isShow = true;
        },
        closeCover() {
            this.isShow = false;
        }
    },
    created() {
        if (isAndroid()) {
            this.AndroidPx = true;
        }
    }
};
</script>

<style lang="scss" scoped>
@import "assets/common/css/mixin.scss";
@import "assets/common/css/base.scss";

.full-screen-enter-active,
.full-screen-leave-active {
    transition: all 0.3s ease;
}
.full-screen-enter,
.full-screen-leave-to {
    opacity: 0;
}

.header {
    background-color: rgba(7, 17, 27, 0.5);
    position: relative;
    .header-content {
        padding: 24px 12px 18px 24px;
        position: relative;
        .header-content-left {
            float: left;
            img {
                width: 64px;
                height: 64px;
                border-radius: 2px;
            }
        }
        .header-content-right {
            margin-left: 80px;
            text-align: left;
            .header-title {
                font-size: 16px;
                line-height: 18px;
                font-weight: bold;
                margin-top: 2px;
                color: #fff;
                .header-title-brand {
                    display: inline-block;
                    width: 30px;
                    height: 18px;
                    @include bg-img("../assets/img/brand");
                    background-repeat: no-repeat;
                    background-size: 30px 18px;
                    vertical-align: top;
                    margin-right: 6px;
                }
            }
            .header-desc {
                margin-top: 8px;
                margin-bottom: 10px;
                font-size: 12px;
                line-height: 12px;
            }
            .header-supports {
                margin-bottom: 2px;
                font-size: 10px;
                line-height: 12px;
                vertical-align: middle;
                .header-supports-brand {
                    display: inline-block;
                    margin-right: 4px;
                    width: 12px;
                    height: 12px;
                    background-size: 12px 12px;
                    background-repeat: no-repeat;
                    vertical-align: middle;
                }
            }
        }
        .header-more {
            position: absolute;
            right: 12px;
            bottom: 18px;
            font-size: 10px;
            line-height: 12px;
            background-color: rgba(0, 0, 0, 0.2);
            padding: 7px 8px;
            border-radius: 14px;
            .header-count {
                margin-right: 2px;
                vertical-align: middle;
            }
            .iconfont {
                vertical-align: middle;
            }
        }
    }
    .header-bulletin {
        padding: 0 12px;
        height: 28px;
        line-height: 28px;
        background-color: rgba(7, 17, 27, 0.2);
        @include ellipsis;
        .header-bulletin-left {
            float: left;
            width: 22px;
            height: 12px;
            margin-top: 8px;
            margin-right: 4px;
            @include bg-img("../assets/img/bulletin");
            background-size: 22px 12px;
            background-repeat: no-repeat;
        }
        .header-bulletin-main {
            font-size: 10px;
            padding-left: 4px;
            @include ellipsis;
        }
        .header-bulletin-right {
            float: right;
            font-size: 10px;
            margin-left: 4px;
        }
    }
    .header-bgimg {
        position: absolute;
        left: 0;
        top: 0;
        z-index: -1;
        width: 100%;
        height: 100%;
        filter: blur(10px);
        img {
            width: 100%;
            height: 100%;
        }
    }
}

.full-screen {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(7, 17, 27, 0.8);
    z-index: 6;
    backdrop-filter: blur(10px);
    .wrapper {
        height: auto;
        min-height: 100%;
        padding-left: 36px;
        padding-right: 36px;
        .full-screen-content {
            margin: 64px auto 0 auto;
            padding-bottom: 64px; /* 必须使用和footer相同的高度 */
            h1 {
                font-size: 16px;
                line-height: 16px;
                font-weight: 700;
                color: rgb(255, 255, 255);
                text-align: center;
            }
            .star-wrapper {
                height: 24px;
                margin-top: 16px;
                text-align: center;
            }
            .full-screen-info {
                font-size: 0;
                display: flex;
                margin-top: 28px;
                margin-bottom: 24px;
                .flex-line {
                    flex: 1;
                    position: relative;
                    top: -6px;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
                }
                .flex-main {
                    padding-left: 12px;
                    padding-right: 12px;
                    color: rgb(255, 255, 255);
                    font-size: 14px;
                    font-weight: 700;
                }
            }
            .full-screen-info-detail {
                padding: 0 12px;
                .full-screen-info-item {
                    height: 16px;
                    margin-bottom: 12px;
                    font-size: 12px;
                    line-height: 16px;
                    text-align: left;
                    &:last-child {
                        margin-bottom: 0;
                    }
                    .full-screen-info-brand {
                        margin-right: 6px;
                        vertical-align: top;
                    }
                }
            }
            .full-screen-bulletin {
                padding: 0 12px;
                font-size: 12px;
                line-height: 24px;
                text-align: left;
                color: rgb(255, 255, 255);
            }
        }
    }
    .footer {
        margin: -64px auto 0 auto; /* footer高度的负值 */
        width: 32px;
        height: 64px;
        clear: both;
        font-size: 32px;
        color: rgba(255, 255, 255, 0.5);
    }
}
</style>
