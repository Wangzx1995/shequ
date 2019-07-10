<template>
  <div style="padding: 18px">
    <!-- page header -->
    <div class="com-page-header-wrap clear">
      <div class="fr">
        <template v-if="!isEdit">
          <el-button type="text" size="mini" @click="isEdit = true">
            <i class="icon-x-edit"></i>&nbsp;编辑
          </el-button>
        </template>
        <template v-else>
          <el-button type="primary" size="mini">保存</el-button>
          <el-button type="info" size="mini" @click="cancle">取消</el-button>
        </template>
      </div>
      <span class="com-page-header-title">小区信息</span>
    </div>
    <!-- 未编辑 -->
    <div v-if="!isEdit" class="com-info-container block">
      <el-row class="com-info-group">
        <el-col :span="7">
          <p class="com-info-label">小区名称</p>
          <span class="com-info-value">中栋国际1期</span>
        </el-col>
        <el-col :span="7" :offset="1">
          <p class="com-info-label">详细地址</p>
          <span class="com-info-value">浙江省杭州市滨江区西兴街道201号</span>
        </el-col>
        <el-col :span="7" :offset="1">
          <p class="com-info-label">建筑年代</p>
          <span class="com-info-value">2016</span>
        </el-col>
      </el-row>
      <el-row class="com-info-group">
        <el-col :span="7">
          <p class="com-info-label">建筑面积</p>
          <span class="com-info-value">23600平米</span>
        </el-col>
        <el-col :span="7" :offset="1">
          <p class="com-info-label">占地面积</p>
          <span class="com-info-value">36000平米</span>
        </el-col>
        <el-col :span="7" :offset="1">
          <p class="com-info-label">绿化率</p>
          <span class="com-info-value">30%</span>
        </el-col>
      </el-row>
      <el-row class="com-info-group">
        <el-col :span="7">
          <p class="com-info-label">容积率</p>
          <span class="com-info-value">89%</span>
        </el-col>
        <el-col :span="7" :offset="1">
          <p class="com-info-label">负责人</p>
          <span class="com-info-value">陈山</span>
        </el-col>
        <el-col :span="7" :offset="1">
          <p class="com-info-label">联系电话</p>
          <span class="com-info-value">0551-6217788</span>
        </el-col>
      </el-row>
      <el-row class="com-info-group">
        <el-col :span="10">
          <p class="com-info-label">小区介绍</p>
          <span class="com-info-value">小区户型本小区80多栋楼，多为四层，五层，六层，极少七层，主要面积有49平58平73平，楼间距大，采光好生活配套小区北邻500米就是东湖公园东湖银座，小区西北方向1000米就是第 一人民医院教育情况本小区内有迎春中学迎春小学及迎春幼儿园，迎春中学师资力量雄厚，凭房产证可入学，迎春中学新建教学楼。小区不足小区房龄较长，绿化较少</span>
        </el-col>
      </el-row>
      <br/>
      <br/>
      <br/>
      <el-divider/>
      <el-row class="com-info-group">
        <el-col :span="10">
          <p class="com-info-label">小区图片</p>
          <span class="com-info-value">
            <el-image
              style="width: 100px; height: 100px"
              src="url"
              fit="fill"
            />
          </span>
        </el-col>
      </el-row>
    </div>
    <!-- 表单 -->
    <el-form ref="form" :model="form" :rules="rules" v-else>
      <el-row>
        <el-col :span="7">
          <el-form-item prop="name" label="小区名称">
            <el-input v-model="form.name" placeholder="请输入小区名称"/>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="1">
          <el-form-item prop="address" label="详细地址">
            <el-input v-model="form.address" placeholder="请输入详细地址"/>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="1">
          <el-form-item prop="year" label="建筑年代">
            <el-input v-model="form.year" placeholder="请输入建筑年代"/>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
  export default {
    // name: this.route,
    data () {
      console.log(this.$route)
      return {
        isEdit: false,
        infoData: {
          name: 'xx'
        },
        form: {
          name: null,
          address: null,
          year: null,
        },
        rules: {
          name: [
            {
              required: true,
              trigger: 'blur',
              message: '请输入小区名称'
            }
          ],
          address: [
            {
              required: true,
              trigger: 'blur',
              message: '请输入详细地址'
            }
          ],
          year: [
            {
              required: true,
              trigger: 'blur',
              message: '请输入建筑年代'
            }
          ]
        }
      }
    },
    created () {
      
    },
    methods: {
      // 提交保存
      commit () {
        this.$refs.form.validate(valid => {
          if (valid) {
            this.$systemApi.demo.add({

            }).then(res => {
              console.log(res)
            }).catch(e => {
              console.log(e)
            })
          }
        })
      },
      // 取消
      cancle () {
        this.isEdit = false
      }
    },
    components: {
      
    }
  }
</script>