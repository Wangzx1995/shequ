<template>
    <div style="overflow: hidden;">
        <form
            class="uploadPicForm clearfix"
            enctype="multipart/form-data"
        >
            <div
                class="img1 clearfix"
                v-for="(urls, index) in imgs "
                :key="urls.value"
            >
                <!-- <div
                    :class="{deleteBtn:!isImg}"
                    class="delete clearfix"
                    v-on:click="deleteImg(index)"
                > -->
                <div
                    class="delete clearfix"
                    @click="deleteImg(index)"
                >
                    <i class="el-icon-circle-close"></i>
                </div>
                <img
                    class="img"
                    :src="urls"
                />
            </div>
            <div
                class="addimg"
                @click="imgClick()"
            >
                <!-- v-if="this.files.length<3 && isImg" -->
                <i class="el-icon-plus"></i>
            </div>
            <input
                style="float:left;display: none;"
                type="file"
                id='uploadFile'
                accept="image/*"
                @change="readLocalFile($event)"
            >
        </form>
    </div>
</template>

<script>
export default {
    props: {
        imgSetting: Object
    },
    data() {
        return {
            imgs: [],
            files: [],
            fileList: [],
            isImg: true
        };
    },
    mounted() {},
    methods: {
        //删除图片
        deleteImg(index) {
            this.imgs.splice(index, 1);
            this.fileList.splice(index, 1);
        },
        //图片click
        imgClick() {
            document.getElementById("uploadFile").click();
        },
        //图片上传
        readLocalFile(e) {
            // alert(JSON.stringify(e))
            let localFile = document.getElementById("uploadFile").files[0];
            // alert(localFile.name+'--'+localFile.type+'--'+localFile.size)
            // console.log(localFile)
            if (!localFile || localFile.size == 0) {
                return;
            }
            //开关控制
            // this.isImg = false;
            // this.$refs.addSafeBtn.disabled = true;
            // console.log(this.$refs.addSafeBtn.disabled)

            // console.log(document.getElementById("uploadFile").files)
            this.files.push(localFile);
            // alert(JSON.stringify(localFile))

            //获取图片base64代码
            var reader = new FileReader();
            var content;
            var current = this;
            content = reader.readAsDataURL(localFile, "UTF-8");

            reader.onload = function(event) {
                content = event.target.result;
                current.imgs.push(content);
            };
            reader.onerror = function(event) {
                alert("error");
            };
            //上传
            var formData = new FormData();
            formData.append("file", this.files[this.files.length - 1]);
            // console.log(formData.get("file"))
            this.$systemApi.demo
                .uploadUrl(formData)
                .then(res => {
                    if (res.success) {
                        // this.$refs.addSafeBtn.disabled = false;
                        this.$message({
                            message: "图片上传成功！",
                            type: "success"
                        });
                        this.fileList.push(res.data);
                        // this.isImg = true;
                        console.log(this.imgs);
                    }
                })
                .catch(res => {
                    console.log(res);
                });
        }
    }
};
</script>

<style lang="less">
//拍照
.uploadPicForm {
    .img1 {
        float: left;
        margin: 0 0.4rem;
        position: relative;
        border: 1px solid #ccc;

        .delete {
            text-align: right;
            position: absolute;
            right: 0px;
            padding: 0px;
            background: rgba(255, 255, 255, 0.4);

            i {
                float: left;
            }
        }

        .img {
            border: none;
            display: block;
            width: 6rem;
            height: 6rem;
        }
    }
    .addimg {
        width: 6rem;
        height: 6rem;
        border: 1px dashed #cccccc;
        border-radius: 6px;
        float: left;
        margin: 0 0.4rem;
        padding: 0;
        background: #fbfdff;

        i {
            display: inline-block;
            width: 6rem;
            height: 6rem;
            line-height: 6rem;
            text-align: center;
            font-size: 25px;
            cursor: pointer;
            color: #cccccc;
        }
    }
}

.btnBg {
    background: #cccccc !important;
}

.deleteBtn {
    display: none;
}

.listDeal {
    .list {
        border-bottom: 1px solid #ccc;
        padding: 0.625rem;

        b {
            display: inline-block;
            font-size: 1.125rem;
            width: 15rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .auditing {
            float: right;
            margin-right: 2rem;
        }

        .right {
            float: right;
            color: #03a9f4;
        }

        .chaoshi {
            color: red;
            float: right;
            margin-right: 2rem;
            font-size: 0.5rem;
            line-height: 1rem;
            border: 1px solid red;
            margin-top: 6px;
        }

        div {
            line-height: 1.875rem;
        }

        .flex {
            display: flex;
            padding-left: 1.25rem;

            .type {
                flex: 1;
                font-size: 0.875rem;
            }
        }
    }
}
</style>

