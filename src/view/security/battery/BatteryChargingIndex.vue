<template>
    <div>
        <div class="com-main-inner clear">
            <!-- form -->
            <el-form inline label-width="85px">
                <el-form-item label="设备编码">
                    <el-input></el-input>
                </el-form-item>
                <el-form-item label="设备情况">
                    <el-input></el-input>
                </el-form-item>
                <el-form-item label="使用状态">
                    <el-select v-model="value" placeholder="请选择">
                        <el-option
                            label="全部"
                            value="全部"
                        />
                        <el-option
                            label="选项一"
                            value="选项一"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item class="fr">
                    <el-button type="primary" size="small">
                        查询&nbsp;<i class="icon-x-sousuo"/>
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
        <!-- content -->
        <div class="battery-charging-container">
            <div class="page-leader">
                <div class="page-title">
                    <i class="icon-x-chongdianzhuang1 el-button--text"></i>
                    <span>
                        <font>智能充电桩</font>(52)
                    </span>
                </div>
                <div class="page-label">
                    <label>
                        <i class="squre color1"></i>空闲（16）
                    </label>
                    <label>
                        <i class="squre color2"></i>空闲（16）
                    </label>
                    <label>
                        <i class="squre color3"></i>空闲（16）
                    </label>
                </div>
            </div>

            <!-- list -->
            <ul class="pile-list clear" @click="dialogVisible = true">
                <li>
                    <div class="status">
                        <i class="squre color1"></i>空闲（16）
                    </div>
                    <div class="total">
                        <div>
                            <span>空闲</span>
                            <h2>0</h2>
                        </div>
                        <div>
                            <span>充电中</span>
                            <h2>0</h2>
                        </div>
                        <div>
                            <span>故障</span>
                            <h2>0</h2>
                        </div>
                    </div>
                    <div class="position">
                        <i class="icon-x-location"></i>北门地下车库一层东面
                    </div>
                </li>
                <li>
                    <div class="status">
                        <i class="squre color2"></i>空闲（16）
                    </div>
                    <div class="total">
                        <div>
                            <span>空闲</span>
                            <h2>0</h2>
                        </div>
                        <div>
                            <span>充电中</span>
                            <h2>0</h2>
                        </div>
                        <div>
                            <span>故障</span>
                            <h2>0</h2>
                        </div>
                    </div>
                    <div class="position">
                        <i class="icon-x-location"></i>北门地下车库一层东面
                    </div>
                </li>
                <li>
                    <div class="status">
                        <i class="squre color3"></i>空闲（16）
                    </div>
                    <div class="total">
                        <div>
                            <span>空闲</span>
                            <h2>0</h2>
                        </div>
                        <div>
                            <span>充电中</span>
                            <h2>0</h2>
                        </div>
                        <div>
                            <span>故障</span>
                            <h2>0</h2>
                        </div>
                    </div>
                    <div class="position">
                        <i class="icon-x-location"></i>北门地下车库一层东面
                    </div>
                </li>
                <li>
                    <div class="status">
                        <i class="squre color1"></i>空闲（16）
                    </div>
                    <div class="total">
                        <div>
                            <span>空闲</span>
                            <h2>0</h2>
                        </div>
                        <div>
                            <span>充电中</span>
                            <h2>0</h2>
                        </div>
                        <div>
                            <span>故障</span>
                            <h2>0</h2>
                        </div>
                    </div>
                    <div class="position">
                        <i class="icon-x-location"></i>北门地下车库一层东面
                    </div>
                </li>
                <li>
                    <div class="status">
                        <i class="squre color2"></i>空闲（16）
                    </div>
                    <div class="total">
                        <div>
                            <span>空闲</span>
                            <h2>0</h2>
                        </div>
                        <div>
                            <span>充电中</span>
                            <h2>0</h2>
                        </div>
                        <div>
                            <span>故障</span>
                            <h2>0</h2>
                        </div>
                    </div>
                    <div class="position">
                        <i class="icon-x-location"></i>北门地下车库一层东面
                    </div>
                </li>
                <li>
                    <div class="status">
                        <i class="squre color3"></i>空闲（16）
                    </div>
                    <div class="total">
                        <div>
                            <span>空闲</span>
                            <h2>0</h2>
                        </div>
                        <div>
                            <span>充电中</span>
                            <h2>0</h2>
                        </div>
                        <div>
                            <span>故障</span>
                            <h2>0</h2>
                        </div>
                    </div>
                    <div class="position">
                        <i class="icon-x-location"></i>北门地下车库一层东面
                    </div>
                </li>
                <li>
                    <div class="status">
                        <i class="squre color1"></i>空闲（16）
                    </div>
                    <div class="total">
                        <div>
                            <span>空闲</span>
                            <h2>0</h2>
                        </div>
                        <div>
                            <span>充电中</span>
                            <h2>0</h2>
                        </div>
                        <div>
                            <span>故障</span>
                            <h2>0</h2>
                        </div>
                    </div>
                    <div class="position">
                        <i class="icon-x-location"></i>北门地下车库一层东面
                    </div>
                </li>
            </ul>
        </div>

        <el-dialog
            width="700px"
            title="智能充电桩东五号"
            :visible.sync="dialogVisible"
            append-to-body
            center
        >
            <ul class="socket-list clear">
                <li>
                    <p class="num">1号插座</p>
                    <div class="btn">
                        <el-switch
                            v-model="value2"
                            disabled
                        />
                    </div>
                    <div class="notes bg1">
                        <el-link type="success" :underline="false">空闲</el-link>
                    </div>
                </li>
                <li>
                    <p class="num">2号插座</p>
                    <div class="btn">
                        <el-switch
                            v-model="value3"
                            active-color="#13ce66"
                            disabled
                        />
                    </div>
                    <div class="notes bg2">
                        <el-link type="warning" :underline="false">已充电30min</el-link>
                    </div>
                </li>
                <li>
                    <p class="num">3号插座</p>
                    <div class="btn">
                        <el-switch
                            v-model="value2"
                            disabled
                        />
                    </div>
                    <div class="notes bg3">
                        <el-link type="danger" :underline="false">故障中</el-link>
                    </div>
                </li>
                <li>
                    <p class="num">1号插座</p>
                    <div class="btn">
                        <el-switch
                            v-model="value2"
                            disabled
                        />
                    </div>
                    <div class="notes bg1">
                        <el-link type="success" :underline="false">空闲</el-link>
                    </div>
                </li>
                <li>
                    <p class="num">2号插座</p>
                    <div class="btn">
                        <el-switch
                            v-model="value3"
                            active-color="#13ce66"
                            disabled
                        />
                    </div>
                    <div class="notes bg2">
                        <el-link type="warning" :underline="false">已充电30min</el-link>
                    </div>
                </li>
                <li>
                    <p class="num">3号插座</p>
                    <div class="btn">
                        <el-switch
                            v-model="value2"
                            disabled
                        />
                    </div>
                    <div class="notes bg3">
                        <el-link type="danger" :underline="false">故障中</el-link>
                    </div>
                </li>
            </ul>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                dialogVisible: false,
                value2: null,
                value3: true
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

<style lang="less" scoped>
    .page-leader {
        display: flex;
        align-content: space-between;
    }
    .page-title {
        flex: 1;
        font-size: 18px;
    }
    .page-title i {
        font-size: 20px;
        margin-right: 10px;
        vertical-align: middle;
    }
    .page-title font {
        font-weight: 700;
    }
    .page-label {
    }
    .page-label label {
        display: inline-block;
        padding: 8px;
        margin-left: 37px;
        border-radius: 4px;
        background: #fff;
        font-size: 16px;
        box-shadow:0px 0px 6px 0px rgba(46,194,140,0.13);
    }
    .battery-charging-container {
        margin-top: 24px;
        padding-top: 24px;
        position: relative;
    }
    .battery-charging-container:before {
        content: "";
        position: absolute;
        top: 0;
        left: -20px;
        right: -20px;
        height: 1px;
        background: #e8e8e8;
    }
    .battery-charging-container .squre {
        display: inline-block;
        width:20px;
        height:20px;
        margin-right: 10px;
        border-radius:4px;
        vertical-align: sub;
    }
    .battery-charging-container .squre.color1 {
        background:rgba(46,194,140,1);
    }
    .battery-charging-container .squre.color2 {
        background:rgba(247,150,35,1);
    }
    .battery-charging-container .squre.color3 {
        background:rgba(220,35,35,1);
    }
    .pile-list {
        margin-top: 18px;
    }
    .pile-list li {
        float: left;
        width: calc(20% - 16px);
        margin: 0 20px 20px 0;
        padding: 17px 24px;
        box-sizing: border-box;
        background:rgba(255,255,255,1);
        border:1px solid rgba(236,234,231,1);
        border-radius:4px;
        cursor: pointer;
    }
    .pile-list li:nth-child(5) {
        margin-right: 0;
    }
    .pile-list li .status {
        font-size: 18px;
        margin-bottom: 16px;
    }
    .pile-list li .total {
        display: flex;
    }
    .pile-list li .total div {
        flex: 1;
        text-align: center;
        font-size: 14px;
    }
    .pile-list li .total div h2 {
        margin-top: 10px;
        font-size: 24px;
    }
    .pile-list li .position {
        margin-top: 35px;
        font-size: 16px;
        color: #999;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    .pile-list li .position i {
        margin-right: 6px;
        font-size: 20px;
    }

    .socket-list {
    }
    .socket-list li {
        width: calc(20% - 15px);
        float: left;
        margin: 0 16px 16px 0;
        border:1px solid rgba(228,228,228,1);
        border-radius:4px;
        text-align: center;
    }
    .socket-list li:nth-child(5) {
        margin-right: 0;
    }
    .socket-list li .num {
        margin-top: 13px;
        font-size: 14px;
    }
    .socket-list li .btn {
        margin: 11px 0;
    }
    .socket-list li .notes {
        height: 30px;
        line-height: 30px;
        font-size: 14px;
        
    }
    .socket-list li .bg1 {
        background-color: #eaf9f3;
    }
    .socket-list li .bg2 {
        background-color: #fef4e9;
    }
    .socket-list li .bg3 {
        background-color: #fbe9e9;
    }
</style>
