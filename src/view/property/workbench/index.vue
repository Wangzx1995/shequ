<template>
    <div class="property">
        <div
            class="workbench"
            v-if="show"
        >
            <div class="workbench-header">
                <el-row :gutter="20">
                    <el-col :span="8">
                        <div class="headerWrapper left-flex">
                            <div>
                                <span class="warp-top">楼栋(幢)</span>
                                <span class="warp-mid">118</span>
                                <span class="warp-btm">
                                    <img src="@/assets/workbench/left1.png">
                                </span>
                            </div>
                            <div>
                                <span class="warp-top">房屋(户)</span>
                                <span class="warp-mid">600</span>
                                <span class="warp-btm">
                                    <img src="@/assets/workbench/left2.png">
                                </span>
                            </div>
                            <div>
                                <span class="warp-top">入住(户)</span>
                                <span class="warp-mid">300</span>
                                <span class="warp-btm">
                                    <img src="@/assets/workbench/left3.png">
                                </span>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="4">
                        <div class="headerWrapper"></div>
                    </el-col>
                    <el-col :span="4">
                        <div class="headerWrapper"></div>
                    </el-col>
                    <el-col :span="8">
                        <div class="headerWrapper right-flex">
                            <div>
                                <span class="warp-top">
                                    <img src="@/assets/workbench/right1.png">
                                </span>
                                <span class="warp-mid">30</span>
                                <span class="warp-btm">待派工</span>
                            </div>
                            <div class="right-line"></div>
                            <div>
                                <span class="warp-top">
                                    <img src="@/assets/workbench/right2.png">
                                </span>
                                <span class="warp-mid">10</span>
                                <span class="warp-btm">待处理</span>
                            </div>
                            <div class="right-line"></div>
                            <div>
                                <span class="warp-top">
                                    <img src="@/assets/workbench/right3.png">
                                </span>
                                <span class="warp-mid">26</span>
                                <span class="warp-btm">投诉建议</span>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <br />
            <div class="com-page-header-wrap clear com-main-inner">
                <div class="com-main-inner-title">
                    <div class="clear fr">
                        <template>
                            <el-input placeholder="输入楼栋号快速定位">
                                <i
                                    slot="suffix"
                                    class="el-input__icon el-icon-search"
                                ></i>
                            </el-input>
                        </template>
                    </div>
                    <span class="com-page-header-title">楼栋信息列表</span>
                </div>
                <div class="main-body">
                    <ul class="clear">
                        <li
                            v-for="(i,index) in 10"
                            :key="i"
                            class="card"
                        >
                            <div class="card-up">
                                <div class="buildNum">
                                    <img
                                        src="@/assets/workbench/building.png"
                                        alt=""
                                    >
                                    {{index+1}}幢
                                </div>
                                <div class="buildSum">
                                    <div>
                                        <span class="sum-name">房间</span>
                                        <span class="sum-value">80<em>&nbsp;间</em></span>
                                    </div>
                                    <div>
                                        <span class="sum-name">楼层</span>
                                        <span class="sum-value">5<em>&nbsp;层</em></span>
                                    </div>
                                    <div>
                                        <span class="sum-name">总人数</span>
                                        <span class="sum-value">400<em>&nbsp;人</em></span>
                                    </div>
                                    <div>
                                        <span class="sum-name">租客</span>
                                        <span class="sum-value">206<em>&nbsp;人</em></span>
                                    </div>
                                </div>
                            </div>
                            <div class="card-down">
                                <div
                                    v-for="i in ['一','二','三','四','五','六']"
                                    :key="i"
                                    class="unit"
                                    @click="openDrawer()"
                                >
                                    {{i}}单元
                                </div>
                            </div>
                            <div class="btn">
                                <span>详情</span>
                                <i></i>
                                <span>编辑</span>
                                <i></i>
                                <span>删除</span>
                                <i></i>
                                <span>设置片区</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <drawer
            ref="drawer"
            @isHide="isHide"
        />
    </div>
</template>

<script>
import drawer from "@/components/property/workbench/drawer";
export default {
    name: "property-Workbench",
    data() {
        return {
            show: true
        };
    },
    methods: {
        openDrawer() {
            this.$refs.drawer.open();
            setTimeout(() => {
                this.show = !this.show;
            }, 500);
        },
        isHide() {
            this.show = !this.show;
        }
    },
    components: {
        drawer
    }
};
</script>


