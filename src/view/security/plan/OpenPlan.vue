<template>
    <div>
        <div class="plan-list">
            <dl v-for="(lst, index) in list" :key="lst.id">
                <dt>
                    <h4>{{ lst.preName }}</h4>
                    <el-link class="switch" :underline="false" type="primary" @click="openPlan(lst.id, lst.preLevels, index)">
                        <i class="icon-x-bofang"></i>启动
                    </el-link>
                </dt>
                <dd>
                    <div class="setting">
                        <!-- <span v-for="item in lst.preLevels" :key="item.id">{{ toChinesNum(item.levelType) }}级</span> -->
                        <el-tag
                            v-for="item in lst.preLevels"
                            :key="item.id"
                            :effect="selectedLevel.id != item.id ? 'plain' : 'dark'"
                            @click="selectedLevel = item"
                        >
                            {{ toChinesNum(item.levelType) }}级
                        </el-tag>
                    </div>
                    <p class="notes">
                        <i class="icon-x-shiyongfanwei"></i>适用范围：{{ lst.preContent }}
                    </p>
                </dd>
            </dl>
        </div>
        <!-- 分页 -->
        <CtrlPage :setPage="getList" align="center" ref="page" v-show="total > list.length"/>

        <DlgOpenPlan ref="dlgOpenPlan"/>
    </div>
</template>

<script>
    import DlgOpenPlan from '@/components/security/plan/DlgOpenPlan'
    import CtrlPage from '@/components/common/other/CtrlPage'
    import utils from '@/utils/'
    export default {
        name:'security-open-plan',
        data () {
            return {
                selectedLevel: {},
                list: [],
                total: 0,
            }
        },
        mounted () {
            this.$refs.page.getList(1)
        },
        methods: {
            // 启动预案
            openPlan (id, levels) {
                if (levels.findIndex(v => {
                    return v.id == this.selectedLevel.id
                }) != -1) {

                    this.$refs.dlgOpenPlan.open(id, this.selectedLevel.id, () => {
                        // this.list.splice(index, 1)
                    })
                } else {
                    this.$$message({
                        message: '请选择当前预案等级'
                    })
                }
            },
            // 查询列表
            getList (pageIndex, rows, callback) {
                this.$securityApi.plan.openPlanList({
                    pageNum: pageIndex,
                    pageSize: rows
                }).then(res => {
                    this.list = res.data.list
                    this.total = res.data.total
                    callback(this.list, this.total)
                })
            },
            // 数字转中文
            toChinesNum: utils.toChinesNum
            
        },
        components: {
            CtrlPage,
            DlgOpenPlan
        }
    }
</script>

<style scoped>
    .plan-list {

    }
    .plan-list dl {
        width: calc(20% - 16px);
        float: left;
        padding: 15px 20px;
        margin: 0 20px 20px 0;
        box-sizing: border-box;
        background: #fff;
        border: 1px solid #F0F0F0;
        border-radius: 4px;
        cursor: pointer;
    }
    .plan-list dl:nth-child(5) {
        margin-right: 0;
    }
    .plan-list dt {
        display: flex;
        justify-content: space-between;
    }
    .plan-list dt h4 {
        font-size: 16px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        flex: 1;
    }
    .plan-list dt .switch {
        font-size: 16px;
    }
    .plan-list dt .switch i {
        font-size: 18px;
        margin-right: 3px;
        vertical-align: middle;
    }
    .plan-list dd .setting {
        background: #FBFBFB;
        padding: 15px;
        margin: 10px 0;
        height: 90px;
        box-sizing: border-box;
    }
    .plan-list dd .setting span {
        margin: 0 10px 10px 0;
    }
    .plan-list dd .notes {
        font-size: 14px;
        color: #999;
    }
    .plan-list dd .notes i {
        margin-right: 8px;
    }
</style>
