<template>
    <div>
        <ul class="plan-list clear">
            <!-- <li>
                <div class="level">
                    <span class="com-page-header-title tag">
                        <el-link type="success" :underline="false"><i class="icon-x-iconshugang-copy line-tag"></i></el-link>2019年广元公寓消防应急预案
                    </span>
                    <label><el-link type="success" :underline="false">【一般】</el-link></label>
                </div>
                <div class="info">
                    <p>预案等级：三级</p>
                    <p>开始时间：2019/02/01 14:20</p>
                    <p>历史时长：46min</p>
                </div>
                <div class="relation">
                    <i class="icon-x-guanlian"></i>关联事件：广元公寓1幢1单元1201 烟感报警
                </div>
            </li>
            <li>
                <div class="level">
                    <span class="com-page-header-title tag">
                        <el-link type="success" :underline="false"><i class="icon-x-iconshugang-copy line-tag"></i></el-link>2019年广元公寓消防应急预案
                    </span>
                    <label><el-link type="primary" :underline="false">【紧急】</el-link></label>
                </div>
                <div class="info">
                    <p>预案等级：三级</p>
                    <p>开始时间：2019/02/01 14:20</p>
                    <p>历史时长：46min</p>
                </div>
                <div class="relation">
                    <i class="icon-x-guanlian"></i>关联事件：广元公寓1幢1单元1201 烟感报警
                </div>
            </li>
            <li>
                <div class="level">
                    <span class="com-page-header-title tag">
                        <el-link type="success" :underline="false"><i class="icon-x-iconshugang-copy line-tag"></i></el-link>2019年广元公寓消防应急预案
                    </span>
                    <label><el-link type="danger" :underline="false">【非常紧急】</el-link></label>
                </div>
                <div class="info">
                    <p>预案等级：三级</p>
                    <p>开始时间：2019/02/01 14:20</p>
                    <p>历史时长：46min</p>
                </div>
                <div class="relation">
                    <i class="icon-x-guanlian"></i>关联事件：广元公寓1幢1单元1201 烟感报警
                </div>
            </li> -->
            <li v-for="lst in list" :key="lst.id">
                <div class="level">
                    <template v-if="lst.currentPreDTO.securityIncident.urgencyName == '一般'">
                        <span class="com-page-header-title tag">
                            <el-link type="success" :underline="false"><i class="icon-x-iconshugang-copy line-tag"></i></el-link>{{ lst.preTitle }}
                        </span>
                        <label><el-link type="success" :underline="false">【{{ lst.currentPreDTO.securityIncident.urgencyName }}】</el-link></label>
                    </template>
                    <template v-if="lst.currentPreDTO.securityIncident.urgencyName == '紧急'">
                        <span class="com-page-header-title tag">
                            <el-link type="primary" :underline="false"><i class="icon-x-iconshugang-copy line-tag"></i></el-link>{{ lst.preTitle }}
                        </span>
                        <label><el-link type="primary" :underline="false">【{{ lst.currentPreDTO.securityIncident.urgencyName }}】</el-link></label>
                    </template>
                    <template v-if="lst.currentPreDTO.securityIncident.urgencyName == '非常紧急'">
                        <span class="com-page-header-title tag">
                            <el-link type="danger" :underline="false"><i class="icon-x-iconshugang-copy line-tag"></i></el-link>{{ lst.preTitle }}
                        </span>
                        <label><el-link type="danger" :underline="false">【{{ lst.currentPreDTO.securityIncident.urgencyName }}】</el-link></label>
                    </template>
                </div>
                <div class="info">
                    <p>预案等级：{{ toChinesNum(lst.currentPreDTO.preLevel.levelType) }}级</p>
                    <p>开始时间：{{ lst.startTime }}</p>
                    <!-- <p v-if="lst.endTime">历史时长：{{ $dateFormat(new Date(lst.endTime).getTime() - new Date(lst.startTime).getTime(), 'yyyy/MM/dd HH:mm:ss') }}</p> -->
                    <p>历史时长：{{ secondToDate((new Date(lst.endTime || Date()).getTime() - new Date(lst.startTime).getTime()) / 1000) }}</p>
                </div>
                <div class="relation">
                    <i class="icon-x-guanlian"></i>关联事件：{{ lst.currentPreDTO.securityIncident.eventName }}
                </div>
            </li>
        </ul>
        <!-- 分页 -->
        <CtrlPage :setPage="getList" align="center" ref="page" v-show="total > list.length"/>
    </div>
</template>

<script>
    import CtrlPage from '@/components/common/other/CtrlPage'
    import utils from '@/utils/'
    export default {
        name: 'security-previous-plans',
        data () {
            return {
                list: [],
                total: 0,
            }
        },
        mounted () {
            this.$refs.page.getList(1)
        },
        methods: {
            // 查询列表
            getList (pageIndex, rows, callback) {
                this.$securityApi.plan.currentPlanList({
                    pageNum: pageIndex,
                    pageSize: rows,
                    state: 2
                }).then(res => {
                    this.list = res.data.list
                    this.total = res.data.total
                    callback(this.list, this.total)
                })
            },
            // 秒转日时。。
            secondToDate: utils.secondToDate,
            // 数字转中文
            toChinesNum: utils.toChinesNum
        },
        components: {
            CtrlPage
        }
    }
</script>

<style lang="less" scoped>
    .plan-list {
        
    }
    .plan-list li {
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
    .plan-list li:nth-child(5) {
        margin-right: 0;
    }
    .plan-list li .level {
        display: flex;
        justify-content: space-between;
    }
    .plan-list li .level span,.plan-list li .level label {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .plan-list li .level label * {
        font-size: 16px;
    }
    .plan-list li .level span {
        flex: 1;
        font-size: 16px;
    }
    .plan-list li .info {
        margin: 10px 0;
        padding: 14px;
        background: #FBFBFB;
        font-size: 14px;
        color: #333;
        line-height: 1.8;
    }
    .plan-list li .relation {
        font-size: 14px;
        color: #999;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .plan-list li .relation i {
        margin-right: 5px;
    }
</style>
