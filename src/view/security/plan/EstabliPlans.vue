<template>
    <div class="plan-establi">
        <!-- left-bar -->
        <div class="left-bar">
            <!-- search -->
            <div class="search-container">
                <el-input class="custom-mini" v-model="search">
                    <i slot="suffix" class="el-input__icon icon-x-sousuo"></i>
                </el-input>
                <el-button size="mini" plain class="custom-mini" @click="getList">搜索</el-button>
            </div>
            <!-- 预案列表 -->
            <div class="plan-list">
                <dl v-for="lst in list" :key="lst.id" :class="selectedEstabliPlan == lst.id ? 'selected' : ''" @click="getEatabliPlanDetail(lst)">
                    <dt>
                        <el-link type="primary" :underline="false">
                            <span class="name">{{ lst.preName }}</span>
                        </el-link>
                        <el-switch
                            :value="lst.ifOpen == 1"
                            active-color="#13ce66"
                            @change="(v) => {switchPlan(v, lst)}"
                        />
                    </dt>
                    <dd>
                        <div class="item">
                            <span v-for="item in lst.preLevels" :key="item.id" @click="selectCfgItem(item.levelType)">{{ toChinesNum(item.levelType) }}级</span>
                            <span @click="selectCfgItem(5)">人员配置</span>
                            <span @click="selectCfgItem(6)">资源配置</span>
                        </div>
                        <p class="update-time">
                            <i class="icon-x-shijian"></i>更新时间：{{ lst.updateTime }}
                        </p>
                    </dd>
                </dl>
            </div>
        </div>
        <!-- right-bar -->
        <div class="right-bar">
            <div class="inner">
                <h3 class="plan-title">火灾应急预案</h3>
                <div class="tab-button">
                    <el-button size="medium" :type="activeCfgItem == 5 ? 'primary' : 'info'" @click="selectCfgItem(5)">人员配置</el-button>
                    <el-button size="medium" :type="activeCfgItem == 6 ? 'primary' : 'info'" @click="selectCfgItem(6)">资源配置</el-button>
                    <el-button size="medium" :type="activeCfgItem == 1 ? 'primary' : 'info'" @click="selectCfgItem(1)" :disabled="!selectedEstabliPlan">一级响应</el-button>
                    <el-button size="medium" :type="activeCfgItem == 2 ? 'primary' : 'info'" @click="selectCfgItem(2)" :disabled="!selectedEstabliPlan">二级响应</el-button>
                    <el-button size="medium" :type="activeCfgItem == 3 ? 'primary' : 'info'" @click="selectCfgItem(3)" :disabled="!selectedEstabliPlan">三级响应</el-button>
                    <el-button size="medium" :type="activeCfgItem == 4 ? 'primary' : 'info'" @click="selectCfgItem(4)" :disabled="!selectedEstabliPlan">四级响应</el-button>
                </div>
                <div class="plan-config-list">
                    <CfgItem1 v-show="activeCfgItem == 5"/>
                    <!-- <CfgItem2 v-show="activeCfgItem == 6"/> -->
                    <CfgItem3 :planId='selectedEstabliPlan' level="1" v-show="activeCfgItem == 1"/>
                    <CfgItem3 :planId='selectedEstabliPlan' level="2" v-show="activeCfgItem == 2"/>
                    <CfgItem3 :planId='selectedEstabliPlan' level="3" v-show="activeCfgItem == 3"/>
                    <CfgItem3 :planId='selectedEstabliPlan' level="4" v-show="activeCfgItem == 4"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import '@/style/security/establi-plan.less'
    import CfgItem1 from '@/components/security/plan/EstabliCfgItem1'
    import CfgItem2 from '@/components/security/plan/EstabliCfgItem2'
    import CfgItem3 from '@/components/security/plan/EstabliCfgItem3'
    import utils from '@/utils/'
    export default {
        name: 'security-establi-plans',
        data () {
            return {
                // 搜索关键字(预案名称)
                search: null,
                // 预案编制列表
                list: [],
                // 选中的预案Id
                selectedEstabliPlan: null,
                // 选中预案详情
                // selectedEstabliPlanDetail: {},
                // 配置模块位置
                activeCfgItem: 5
            }
        },
        created () {
            this.getList()
        },
        methods: {
            // 预案开启/关闭
            switchPlan (v, item) {
                console.log(v, item)
                let ifOpen = v ? 1 : 2
                this.$securityApi.plan.myPlanUpdate({
                    id: item.id,
                    ifOpen
                }).then(res => {
                    if (res.code == 1000) {
                        item.ifOpen = ifOpen
                    } else {
                        this.$$message({
                            message: res.message
                        })
                    }
                })
            },
            // 选择编制模块
            selectCfgItem (num) {
                this.activeCfgItem = num
            },
            // 查询预案列表
            getList () {
                this.$securityApi.plan.establiPlanList({
                    pageNum: 1,
                    pageSize: 999,
                    search: this.search
                }).then(res => {
                    this.list = res.data.list
                })
            },
            // 获取预案详情
            getEatabliPlanDetail (item) {
                // if (item.ifOpen == 2) {

                    this.selectedEstabliPlan = item.id
                // } else {
                //     this.$$message({
                //         message: '开启中的预案不能进行操作'
                //     })
                // }

                /*this.$securityApi.plan.establiPlanGet({
                    id
                }).then(res => {
                    this.selectedEstabliPlanDetail = res.data
                })*/
            },
            // 数字转中文
            toChinesNum: utils.toChinesNum
        },
        components: {
            CfgItem1,
            CfgItem2,
            CfgItem3
        }
    }
</script>
