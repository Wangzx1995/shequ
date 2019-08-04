<template>
    <div>
        <div>
            <span class="com-page-header-title tag" style="padding-left: 28px;">
                <el-link type="primary" :underline="false"><i class="icon-x-wuziguanli1 line-tag" style="font-size: 22px;top: 4px;"></i></el-link>
                <el-button-group>
                    <el-button type="primary" size="mini" :plain="wuZiAdd" @click="wuZiAdd = false">物资配置</el-button>
                    <el-button type="primary" size="mini" :plain="!wuZiAdd" @click="wuZiAdd = true">&nbsp;&nbsp;&nbsp;附件&nbsp;&nbsp;&nbsp;</el-button>
                </el-button-group>
            </span>
        </div>
        <div class="com-space"/>
        <!-- 物资列表 -->
        <div v-if="!wuZiAdd">
            <!-- page header -->
            <div class="com-page-header-wrap clear">
                <div class="fr">
                    <el-button type="primary" size="mini" plain @click="wuZiAdd = true">添加</el-button>
                    <el-button type="danger" size="mini" plain>批量删除</el-button>
                </div>
                <span class="com-page-header-title">物资配置</span>
            </div>
            <div class="com-space"/>
            <!-- table -->
            <el-table
                class="center"
                :data="list"
                border
                :row-class-name="({row, rowIndex}) => {return rowIndex%2 == 1 ? 'bg' : ''}"
            >
                <el-table-column
                    type="selection"
                    width="55"
                />
                <el-table-column
                    prop="date"
                    label="序号"
                    width="80"
                    type="index"
                />
                <el-table-column
                    prop="eventNumber"
                    label="物资编号"
                    width="180"
                />
                <el-table-column
                    prop="occurrenceTime"
                    label="物资名称"
                />
                <el-table-column
                    prop="eventName"
                    label="物资品牌"
                />
                <el-table-column
                    prop="eventAddress"
                    label="物资型号"
                />
                <el-table-column
                    prop="eventAddress"
                    label="二级分类"
                />
                <el-table-column
                    prop="eventAddress"
                    label="一级分类"
                />
                <el-table-column
                    prop="eventAddress"
                    label="数量"
                />
                <el-table-column
                    prop="eventAddress"
                    label="计量单位"
                />
                <el-table-column
                    prop="eventAddress"
                    label="剩余年限"
                />
                <el-table-column
                    prop="eventAddress"
                    label="所在仓库"
                />
                <el-table-column
                    prop="eventAddress"
                    label="负责人"
                />
                <el-table-column
                    prop="eventAddress"
                    label="联系电话"
                />
                <el-table-column
                    label="操作"
                    width="80"
                >
                    <template slot-scope="scope">
                        <el-link type="danger" icon="el-icon-delete" style="font-size:18px;"/>
                    </template>
                </el-table-column>
            </el-table>
            <div class="com-space"/>
            <!-- 分页 -->
            <CtrlPage :setPage="getList" align="center" ref="page" v-show="total > list.length"/>
        </div>
        <!-- 添加物资 -->
        <div v-if="wuZiAdd">
            <div class="com-main-inner clear" style="border:1px solid rgb(232,232,232);border-radius:4px;">
                <!-- form -->
                <el-form inline label-width="85px">
                    <el-form-item label="所属仓库">
                        <el-select></el-select>
                    </el-form-item>
                    <el-form-item label="一级分类">
                        <el-select></el-select>
                    </el-form-item>
                    <el-form-item label="二级分类">
                        <el-select></el-select>
                    </el-form-item>
                    <el-form-item label="关键字">
                        <el-input placeholder="请输关键字"/>
                    </el-form-item>
                    <el-form-item label="采购时间">
                        <el-date-picker
                            type="date"
                            placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="报废时间">
                        <el-date-picker
                            type="date"
                            placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item class="fr">
                        <el-button type="primary" size="small">
                            查询&nbsp;<i class="icon-x-sousuo"/>
                        </el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="com-space"/>
            <!-- page header -->
            <div class="com-page-header-wrap clear">
                <div class="fr">
                    <el-button type="primary" size="mini" plain>确定添加</el-button>
                    <el-button size="mini" plain @click="wuZiAdd = false">返回</el-button>
                </div>
                <span class="com-page-header-title">物资配置</span>
            </div>
            
            <!-- table -->
            <el-table
                class="center"
                :data="list"
                border
                :row-class-name="({row, rowIndex}) => {return rowIndex%2 == 1 ? 'bg' : ''}"
            >
                <el-table-column
                    type="selection"
                    width="55"
                />
                <el-table-column
                    prop="date"
                    label="序号"
                    width="80"
                    type="index"
                />
                <el-table-column
                    prop="eventNumber"
                    label="物资编号"
                    width="180"
                />
                <el-table-column
                    prop="occurrenceTime"
                    label="物资名称"
                />
                <el-table-column
                    prop="eventName"
                    label="物资品牌"
                />
                <el-table-column
                    prop="eventAddress"
                    label="物资型号"
                />
                <el-table-column
                    prop="eventAddress"
                    label="二级分类"
                />
                <el-table-column
                    prop="eventAddress"
                    label="一级分类"
                />
                <el-table-column
                    prop="eventAddress"
                    label="数量"
                />
                <el-table-column
                    prop="eventAddress"
                    label="计量单位"
                />
                <el-table-column
                    prop="eventAddress"
                    label="所在仓库"
                />
                <el-table-column
                    label="数量"
                    width="180"
                >
                    <template slot-scope="scope">
                        <el-input-number style="width: 100px;" :min="1" :max="10" size="small"></el-input-number>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                wuZiAdd: false,
                list: [{}],
                total: 0
            }
        },
        created () {
            
        },
        methods: {
            
        },
        components: {
            
        }
    }
</script>

<style scoped>
    
</style>
