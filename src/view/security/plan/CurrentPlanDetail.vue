<template>
    <div class="plan-detail">
        <div class="head">
            <div class="title">
                <div class="title-text">
                    <h3>2019年广元公寓消防应急预案-<font color="#2EC28C">三级</font></h3>
                    <span>广元公寓1幢1单元1201 烟感报警</span>
                </div>
                <span class="btn">
                    <i class="icon-x-fanhui"></i>返回至当前预案
                </span>
            </div>
            <div class="tab">
                <div>
                    <el-button size="medium" type="primary" >预案</el-button>
                    <el-button size="medium" type="info" >执行记录</el-button>
                    <el-button size="medium" type="info" >预案附件</el-button>
                </div>
                <el-link class="btn" type="danger" :underline="false" icon="icon-x-jieshu">结束</el-link>
            </div>
        </div>
        <div class="container">
            <div class="step-tree">
                <dl>
                    <dt>第一步</dt>
                    <dd>
                        <el-button type="primary" size="small">通知</el-button>
                    </dd>
                </dl>
                <dl>
                    <dt>第二步</dt>
                    <dd>
                        <el-button plain size="small">疏散人群</el-button>
                    </dd>
                </dl>
                <dl>
                    <dt>第三步</dt>
                    <dd>
                        <el-button  plain size="small">灭火</el-button>
                    </dd>
                </dl>
            </div>
            <div class="step-content"></div>
        </div>
    </div>
</template>

<script>
    import '@/style/security/plan-detail.less'
    export default {
        data () {
            return {
                preId: this.$route.query.preId,
                levelId: this.$route.query.levelId
            }
        },
        created () {
            this.getData()
        },
        methods: {
            // 查询详情
            getData () {
                console.log(this.preId)
                console.log(this.levelId)
            }
        },
        components: {
            
        }
    }
</script>

<style scoped>
    
</style>
