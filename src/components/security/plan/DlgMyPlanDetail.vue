<template>
    <div>
        <el-dialog
            :class="isChecking ? 'full-footer' : ''"
            title="预案详情"
            center
            :visible.sync="visible"
            width="700px"
            append-to-body
            @close="close"
        >
            <template v-if="data">
                <ul class="com-dialog-info">
                    <li class="item">
                        <label class="label">预案类型</label>
                        <div class="content">
                            <DictionaryText
                                :typeCode="2005"
                                :dicCode="data.preType"
                            />
                        </div>
                    </li>
                    <li class="item">
                        <label class="label">预案等级</label>
                        <div class="content">{{ data.preLevels }}</div>
                    </li>
                    <li class="item">
                        <label class="label">预案名称</label>
                        <div class="content">{{ data.preName }}</div>
                    </li>
                    <li class="item">
                        <label class="label">预案内容</label>
                        <div class="content">{{ data.preContent }}</div>
                    </li>
                    <li class="item" v-if="data.fileNameUrl">
                        <label class="label">预案附件</label>
                        <div class="content">
                            <el-link
                                :href="$joinImgPrefix(data.fileNameUrl.fileUrl)"
                                target="_blank"
                            >{{ data.fileNameUrl.fileName }}</el-link>
                        </div>
                    </li>
                    <li
                        class="item"
                        v-if="data.auditState == 2 && data.auditReason"
                    >
                        <label class="label">未通过原因</label>
                        <div class="content">{{ data.auditReason }}</div>
                    </li>
                </ul>
                <div
                    slot="footer"
                    v-if="isChecking"
                >
                    <el-link
                        class="off"
                        :underline="false"
                        @click="ok"
                    >审核通过</el-link>
                    <el-link
                        type="primary"
                        :underline="false"
                        @click="visible2 = true"
                    >审核不通过</el-link>
                </div>
            </template>
            <div
                v-else
                class="com-loading-text"
            >数据加载中...</div>
        </el-dialog>
        <!-- 审核不通过原因填写 -->
        <el-dialog
            class="full-footer"
            title="原因"
            center
            :visible.sync="visible2"
            width="500px"
            append-to-body
        >
            <el-form
                class="full-input"
                ref="form"
                :model="form"
                :rules="rules"
            >
                <el-form-item prop="auditReason">
                    <el-input
                        type="textarea"
                        v-model="form.auditReason"
                        placeholder="请填写原因"
                    ></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-link
                    type="primary"
                    :underline="false"
                    style="border:none;"
                    @click="no"
                >提 交</el-link>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import DictionaryText from '@/components/common/select/DictionaryText'
export default {
    data() {
        return {
            callback: null,
            visible: false,
            visible2: false,
            isChecking: false,
            data: null,
            form: {
                auditReason: null
            },
            rules: {
                auditReason: [
                    {
                        required: true,
                        trigger: 'blur',
                        message: '请填写原因'
                    }
                ]
            }
        }
    },
    methods: {
        open(id, checking, callback) {
            this.callback = callback
            this.isChecking = checking
            this.getData(id)
            this.visible = true
        },
        close() {
            this.visible = false
            this.visible2 = false
            this.data = null

            this.$refs.form && this.$refs.form.resetFields()
        },
        // 查询详情
        getData(id) {
            this.$securityApi.plan.myPlanGet({
                id
            }).then(res => {
                if (res.code == 1000) {
                    this.data = { ...res.data, fileNameUrl: JSON.parse(res.data.fileNameUrl) }
                } else {
                    this.$$message({
                        message: res.message
                    })
                }
            })
        },
        // 审核通过
        ok() {
            this.$$confirm({
                message: '确认通过该预案?'
            }).then(() => {
                this.$securityApi.plan.myPlanUpdate({
                    id: this.data.id,
                    auditState: 1,
                    auditTime: this.$dateFormat(new Date(), 'yyyy/MM/dd HH:mm:ss')
                }).then(res => {
                    if (res.code == 1000) {
                        this.$$notify({
                            message: '预案审核成功'
                        })
                        this.close()
                        this.callback()
                    } else {
                        this.$$message({
                            message: res.message
                        })
                    }
                })
            }).catch(() => { })
        },
        // 审核不通过
        no() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    this.$securityApi.plan.myPlanUpdate({
                        id: this.data.id,
                        auditState: 2,
                        auditReason: this.form.auditReason,
                        auditTime: this.$dateFormat(new Date(), 'yyyy/MM/dd HH:mm:ss')
                    }).then(res => {
                        if (res.code == 1000) {
                            this.$$notify({
                                message: '预案审核成功'
                            })
                            this.close()
                            this.callback()
                        } else {
                            this.$$message({
                                message: res.message
                            })
                        }
                    })
                }
            })
        }
    },
    components: {
        DictionaryText
    }
}
</script>