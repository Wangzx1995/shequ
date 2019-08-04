<template>
    <el-dialog
        class="full-footer"
        :title="this.title || '请选择'"
        :visible.sync="visible"
        :modal-append-to-body='false'
        center
        :close-on-click-modal="false"
        width="560px"
    >
        <dl class="user-selecter">
            <dt>
                <div class="counter">
                    <label>
                        <el-link
                            type="primary"
                            :underline="false"
                        >
                            <i class="icon-x-jiegou"></i>
                        </el-link>18
                    </label>
                    <label>
                        <el-link
                            type="primary"
                            :underline="false"
                        >
                            <i class="icon-x-ren1"></i>
                        </el-link>18
                    </label>
                </div>
                <div>
                    <el-input
                        class="custom-mini"
                        placeholder="请输入姓名"
                        v-model="search"
                    >
                        <i
                            slot="suffix"
                            class="el-input__icon icon-x-sousuo"
                        ></i>
                    </el-input>
                </div>
            </dt>
            <dd>
                <div class="dept">
                    <el-tree
                        :data="list"
                        :props="defaultProps"
                        @node-click="handleNodeClick"
                    />
                </div>
                <div class="user">
                    <ul v-if="!firstLoad && userList.length">
                        <li
                            v-for="lst in userList"
                            :key="lst.id"
                        >
                            <el-checkbox
                                :value="getValue(lst)"
                                :disabled="disabled && !getValue(lst)"
                                @change="(v) => {handleSelect(v, lst)}"
                            >
                                <el-link
                                    :type="getValue(lst) ? 'primary' : ''"
                                    :underline="false"
                                >{{ lst.userName }}</el-link>
                            </el-checkbox>
                            <font>{{ lst.deptName }}</font>
                        </li>
                    </ul>
                    <div
                        v-if="firstLoad"
                        class="com-loading-text"
                    >请选择部门</div>
                    <div
                        v-if="!firstLoad && !userList.length"
                        class="com-loading-text"
                    >暂无数据</div>
                </div>
            </dd>
        </dl>
        <div slot="footer">
            <el-link
                class="off"
                :underline="false"
                @click="close"
            >取 消</el-link>
            <el-link
                type="primary"
                :underline="false"
                @click="confirm"
            >确 定</el-link>
        </div>
    </el-dialog>
</template>

<script>
export default {
    props: {
        // 弹窗标题
        title: [String, Object],
        // 数据内容  1 物业
        dateType: [String, Number, Object],
        // 最大选择数量
        maxLength: [String, Number, Object]
    },
    data() {
        return {
            visible: false,
            callback: null,
            search: null,
            // 
            list: [],
            // 人员列表
            userList: [],
            // 接口返回的未筛选的数据
            staticUserList: [],
            // 已选择人员列表
            selectedUserList: [],
            firstLoad: true,
            defaultProps: {
                children: 'children',
                label: 'deptName'
            }
        }
    },
    mounted() {
        if (this.dateType == 1) {
            this.getPropertyDept()
        }
    },
    watch: {
        'search'() {
            this.userList = this.staticUserList.filter(u => {
                return u.userName.indexOf(this.search) != -1
            })
        }
    },
    methods: {
        // 获取物业部门列表
        getPropertyDept() {
            this.$systemApi.estateManage.deptSelect({
                pageNum: 1,
                pageSize: 999
            }).then(res => {
                this.list = [{
                    deptName: '物业公司',
                    id: 'property',
                    children: res.data.list
                }]
            })
        },
        // 根据部门查询人员
        handleNodeClick(dept) {
            // 查询物业人员
            if (dept.deptCode) {
                this.firstLoad = false
                this.$systemApi.estateManage.staffSelect({
                    pageNum: 1,
                    pageSize: 999,
                    deptCode: dept.deptCode
                }).then(res => {
                    this.userList = res.data.list
                    this.staticUserList = res.data.list
                })
            }
        },
        // 人员选择事件
        handleSelect(v, user) {
            const index = this.selectedUserList.findIndex(u => {
                return u.id == user.id
            })
            if (v) {
                if (index == -1) {
                    this.selectedUserList.push(user)
                }
            } else {
                if (index != -1) {
                    this.selectedUserList.splice(index, 1)
                }
            }
        },
        // 判断checkbox是否选中
        getValue(user) {
            return this.selectedUserList.findIndex(u => {
                return u.id == user.id
            }) != -1
        },
        open(callback, defaultValues) {
            this.visible = true
            this.selectedUserList = JSON.parse(JSON.stringify(defaultValues || []))
            this.callback = callback
        },

        // 获取已选择列表
        close() {
            this.visible = false
            this.callback = null
            this.selectedUserList = []
        },
        // 确定
        confirm() {
            if (this.selectedUserList.length) {
                this.callback && this.callback(JSON.parse(JSON.stringify(this.selectedUserList)))
                this.close()
            } else {
                this.$$message({
                    message: '请选择人员'
                })
            }
        }
    },
    computed: {
        disabled() {
            if (!isNaN(this.maxLength)) {
                return this.maxLength <= this.selectedUserList.length
            }
            return false
        }
    }
}
</script>

<style scoped>
.user-selecter {
    border: 1px solid rgba(238, 238, 238, 1);
}
.user-selecter dt {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
    height: 44px;
    background: #faf5ef;
}
.user-selecter dt .counter {
    font-size: 14px;
}
.user-selecter dt label {
    margin-right: 25px;
}
.user-selecter dt label a {
    vertical-align: text-bottom;
}
.user-selecter dt i {
    font-size: 14px;
    margin-right: 5px;
}
.user-selecter dd {
    display: flex;
    height: 350px;
}
.user-selecter .dept {
    width: 50%;
    border-right: 1px solid #eee;
    box-sizing: border-box;
    padding: 10px;
    max-height: 100%;
    overflow: auto;
}
.user-selecter .dept >>> .el-icon-caret-right {
    transform: rotate(0) !important;
    font-size: 16px;
    color: #21b2c6;
}
.user-selecter .dept >>> .el-icon-caret-right:before {
    font-family: "iconfont" !important;
    content: "\e615";
}
.user-selecter .dept >>> .el-icon-caret-right.is-leaf {
    opacity: 0;
    padding: 0px;
    width: 10px;
}
.user-selecter .user {
    width: 50%;
    padding: 10px;
}
.user-selecter .user ul {
    max-height: 100%;
    overflow: auto;
}
.user-selecter .user li {
    display: flex;
    justify-content: space-between;
    height: 30px;
    padding: 0 10px;
    align-items: center;
    cursor: pointer;
    border: 1px solid transparent;
}
.user-selecter .user li:hover {
    border-color: #21b2c6;
}
.user-selecter .user li:nth-of-type(odd) {
    background-color: #f8f8f8;
}
.user-selecter .user li > font {
    color: #aaa;
    white-space: nowrap;
}
.user-selecter .user li >>> .el-checkbox {
    width: 100%;
}
</style>
