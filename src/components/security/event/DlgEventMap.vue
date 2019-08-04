<template>
	<el-dialog
        class="full-footer no-padding"
        title="点位绘制"
        center
        :visible.sync="visible"
        width="760px"
        append-to-body
    >
        <input v-model="eventAddress" class="search-input" placeholder="搜索" id="J-eventMapSearchInput"/>
        <Map width="100%" height="400px" ref="bMap"/>
        <div slot="footer">
            <el-link class="off" :underline="false" @click="visible = false">取 消</el-link>
            <el-link type="primary" :underline="false" @click="commit">确 定</el-link>
        </div>
    </el-dialog>
</template>

<script>
    import Map from '@/components/common/other/Map'
    import bus from '@/components/bus'
    export default {
        data () {
            return {
                visible: false,
                callback: null,
                map: null,
                marker: null,
                eventAddress: null
            }
        },
        created () {
            let _this = this
            bus.$on('mapLoaded', map => {

                this.map = map
                // 地址搜索
                let ac = new BMap.Autocomplete({
                    input: 'J-eventMapSearchInput',
                    location: map
                })
                ac.setInputValue(this.eventAddress)
                // 搜索处理
                ac.addEventListener('onconfirm', e => {
                    // console.log(e)
                    let _value = e.item.value
                    this.eventAddress = _value.province +  _value.city +  _value.district +  _value.street +  _value.business
                    
                    // 清除地图图层
                    this.map.clearOverlays()
                    let local = new BMap.LocalSearch(this.map, {
                        onSearchComplete: function () {
                            const pp = local.getResults().getPoi(0).point
                            _this.marker.setPosition(pp)
                            _this.map.centerAndZoom(pp, 18)
                            _this.map.addOverlay(_this.marker)
                        }
                    })
                    local.search(this.eventAddress)

                })
                // 点击地图定位
                map.addEventListener('click', e => {
                    const pp = e.point
                    this.marker.setPosition(pp)
                    map.addOverlay(this.marker)
                })
            })
        },
        methods: {
            open (callback, position) {
                this.visible = true
                this.callback = callback

                this.eventAddress = position.eventAddress || ''

                // 默认定位
                this.$nextTick(() => {

                    let map = this.$refs.bMap.map
                    let pp = {
                        lat: position.addressX || 0,
                        lng: position.addressY || 0
                    }
                    map.clearOverlays()
                    this.marker = new BMap.Marker(pp)
                    map.addOverlay(this.marker)
                    this.marker.enableDragging()
                    if (pp.lng) {
                        setTimeout(() => {
                            // map.centerAndZoom(new BMap.Point(pp.lng, pp.lat), 18)
                            map.setCenter(new BMap.Point(pp.lng, pp.lat))
                        }, 1000)
                    }
                })
            },
            close () {
                this.visible = false
            },
            commit () {
                const position = this.marker.getPosition()

                this.callback({
                    eventAddress: this.eventAddress,
                    addressX: position.lat,
                    addressY: position.lng
                })
                this.close()
            }
        },
        components: {
            Map
        }
    }
</script>

<style lang="less">
    .search-input {
        width: 250px;
        position: absolute;
        top: 75px;
        left: 20px;
        z-index: 1;
        border-radius: 4px;
        border: 1px solid #E7EAED;
        height: 20px;
        line-height: 20px;
        padding: 5px;
    }
</style>
