<template>
    <div style="position: fixed;
    top: 149px;
    left: 20px;
    right: 20px;bottom: 0">
        <iframe :src="src" style="width: 100%;height: 100%;border: none;"></iframe>
    </div>
</template>

<script>
    export default {
        name: 'security-fire-index',
        data () {
            return {
                src: null
            }
        },
        mounted () {
            this.$securityApi.fire.get().then(res => {
                if (res.code == 1000) {
                    this.src = res.t
                } else {

                }
            })
        }
    }
</script>
