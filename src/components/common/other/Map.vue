<template>
    <div class="bmap-wrap" :style="`width:${mapWidth};height:${mapHeight}`">
        
        <!-- <input class="search-input" id="J-mBMapSearchInput"/> -->
        <!-- <el-select
            class="search-input"
            v-model="searchKey"
            multiple
            filterable
            remote
            reserve-keyword
            placeholder="搜索"
            :remote-method="mapSearch"
            :loading="loading"
            size="small"
        >
            <el-option
                v-for="item in addressList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
        </el-select> -->
        <div ref="bmap" style="width:100%;height:100%;"></div>
    </div>
</template>

<script>
    import bus from '@/components/bus'
    export default {
        props: {
            width: String,
            height: String
        },
        data () {
            return {
                // 地图搜索词
                searchKey: null,
                addressList: [],
                map: null,
                mapWidth: this.width || '100px',
                mapHeight: this.height || '100px'
            }
        },
        mounted () {
            let _this = this
            this.map = new BMap.Map(this.$refs.bmap)
            const point = new BMap.Point(120.222562, 30.191024)
            this.map.centerAndZoom(point, 15)
            this.map.enableScrollWheelZoom()

            // 地图加载完成
            //this.map.addEventListener('tilesloaded', () => {
                bus.$emit('mapLoaded', this.map)
            //})
        },
        components: {
            
        }
    }
</script>

<style scoped>
    .bmap-wrap {
        position: relative;
    }
</style>
