<template>
    <div class="mapTagging">
        <div
            id="container"
            style="height:760px;"
        ></div>
        <div class="main">
            <div style="text-align: right;">
                <el-select
                    clearable
                    v-model="selected"
                    placeholder="请选择"
                >
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item"
                        :value="item"
                    >
                    </el-option>
                </el-select>
                <el-button
                    type="primary"
                    class="biaoji"
                    size="mini"
                >标记</el-button>
            </div>
            <div class="rightMain">
                <el-tabs
                    tab-position="left"
                    v-if="selected=='设备'"
                    class="shebei"
                >
                    <el-tab-pane label="设备">
                        <div style="display:flex;flex-direction: column;height:100%">
                            <el-collapse v-model="activeNames">
                                <el-collapse-item
                                    title="设备标签"
                                    name="1"
                                >
                                    <div>
                                        <el-checkbox-button
                                            v-for="city in cities"
                                            :label="city"
                                            :key="city"
                                        >{{city}}</el-checkbox-button>
                                    </div>
                                </el-collapse-item>
                            </el-collapse>
                            <div class="scoll">
                                <el-checkbox-group v-model="checkList">
                                    <el-checkbox
                                        :label="'复选框' +i"
                                        v-for="i in 50"
                                        :key="i.value"
                                    ></el-checkbox>
                                </el-checkbox-group>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="门禁">门禁</el-tab-pane>
                    <el-tab-pane label="消防">消防</el-tab-pane>
                    <el-tab-pane label="充电桩">充电桩</el-tab-pane>
                </el-tabs>
                <div
                    v-if="selected=='仓库'"
                    class="cangku"
                >
                    <el-checkbox-group v-model="checkList">
                        <el-checkbox
                            :label="'复选框' +i"
                            v-for="i in 50"
                            :key="i.value"
                        ></el-checkbox>
                    </el-checkbox-group>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: '',
    data() {
        return {
            options: ['设备', '楼栋', '仓库'],
            selected: '',
            activeNames: ['1'],
            cities: ['监控', '烟感', '门禁', '水位', '液压', '电表'],
            checkboxGroup: [],
            checkList: []
        }
    },
    mounted() {
        var map = new BMap.Map("container");          // 创建地图实例  
        var point = new BMap.Point(120.222562, 30.191024);  // 创建点坐标  
        map.centerAndZoom(point, 15);                 // 初始化地图，设置中心点坐标和地图级别 
    }
}
</script>
<style lang="less" scoped>
</style>
