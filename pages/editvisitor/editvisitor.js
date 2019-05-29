const api = require('../../config/config.js')
const { $Message } = require('../../iviewdist/base/index.js')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',//姓名
    identity:'',//身份证
    phone:'',//电话
    passport:'',//护照
    remark:'',//备注
    gender:'',//性别男-0、女-1
    // genderValue:'',//性别0、1
   // genderVisible:false,//性别弹出框
    identityUrl: '',//图片正面 type=1
    identityDownUrl: '',//身份证图片反面 type=2
    passportUrl: '',//护照首页图片 type=3
    healthyUrl: '',//健康正面图片 type=4
    otherUrl: '',//其他图片 type=5
    url: api.uploadUrl,//图片上传url
    imgIds:'',//出游人图片字符串
    imgList: [],//出游人图片列表
    identityUpData:{
      sid:'',
      type:1
    },
    identityDownData: {
      sid: '',
      type: 2
    },
    passportData:{
      sid: '',
      type: 3
    },
    healthyData:{
      sid: '',
      type: 4
    },
    otherData:{
      sid: '',
      type: 5
    }
  },
  getname:function(e){
      var i = e.currentTarget.dataset.info
      this.setData({
        name:e.detail.value
      })
  },
  getGender:function(){
      this.setData({
        genderVisible:true
      })
  },
  hiddenGender: function(){
    this.setData({
      genderVisible: false
    })
  },
  onGenderChange:function(e){
    console.log(e.detail.value)
      this.setData({
        gender:e.detail.value,
        // genderValue:e.detail.value
      })
  },
  getidnum:function(e){
      this.setData({
        identity:e.detail.value
      })
  },
  getphone:function(e){
      this.setData({
        phone:e.detail.value
      })
  },
  getpassport:function(e){
      this.setData({
        passport:e.detail.value
      })
  },
  getcomment:function(e){
      this.setData({
        remark:e.detail.value
      })
  },
  addVisitor:function(e){
    var reg = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/; //身份证
    var regPhone = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/ //手机号
    var regName = /^(([\u4e00-\u9fa5]+)|([a-zA-Z· ]+))$/ //姓名
    var regpassport = /^([a-zA-z]|[0-9]){5,17}$/ //护照
    var that = this;
    var state = false;
    var iscard = this.checkCard(this.data.identity)
    if(this.data.name == '' || regName.test(this.data.name) == false){
        $Message({
          content:'出游人姓名不合规则!',
          type:'error',
          duration:2
        })
        return false;
    }else if(this.data.identity == '' || iscard == false){
        $Message({
          content:'出游人身份证号不合规则!',
          type:'error',
          duration:2
        })
        return false;
    }else if(this.data.phone == '' || regPhone.test(this.data.phone) == false){
        $Message({
          content:'出游人手机号不合规则!',
          type:'error',
          duration:2
        })
        return false;
    }else if(this.data.passport != ''){
      if(regpassport.test(this.data.passport) == false){
        $Message({
          content: '出游人护照号不合规则!',
          type: 'error',
          duration: 2
        })
        return false;
      }else{
        this.submit();
      }  
    }else{
      this.submit();
    }
  },
  submit:function(){
      var that = this;
      wx.showLoading({
        title: '拼命提交中...',
      })
      if(this.data.imgList.length!=0){
        var str = JSON.stringify(this.data.imgList);
      }else{
        var str = '';
      }
      console.log(str+"------------------"+app.globalData.tel)
    var customerInfo = new Object();
    customerInfo.name = this.data.name
    customerInfo.identity = this.data.identity
    customerInfo.phone = this.data.phone
    customerInfo.passport = this.data.passport
    customerInfo.remark = this.data.remark
    customerInfo.imgIds = str
    customerInfo.tel = app.globalData.tel

      wx.request({
        url: api.saveCustomerBySale,
        method:'post',
        header: {
          // 'content-type': "application/x-www-form-urlencoded"
           'content-type': 'application/json' // 默认值
        },
        data: {
          tel:app.globalData.tel,
          customerInfo: customerInfo
          // customerInfo:{
          //   tel: app.globalData.tel,
          //   name: this.data.name,
          //   identity: this.data.identity,
          //   phone: this.data.phone,
          //   passport: this.data.passport,
          //   remark: this.data.note,
          //   imgIds: str
          // },
        },
        success(res){
            wx.hideLoading();
            if(res.data.code == 0){
              wx.navigateTo({
                url: '../tourvisitor/tourvisitor',//跳转出游人列表
                success:function(){},
                fail:function(){},
                complete:function(){}
              })
            }else{
              $Message({
                content: res.data.msg,
                type: 'error',
                duration: 2
              })
            }
        }
      })
  },
  checkCard:function(card){//验证身份证
      card = card.toLowerCase();
      var vcity = {
        11: "北京",
        12: "天津",
        13: "河北",
        14: "山西",
        15: "内蒙古",
        21: "辽宁",
        22: "吉林",
        23: "黑龙江",
        31: "上海",
        32: "江苏",
        33: "浙江",
        34: "安徽",
        35: "福建",
        36: "江西",
        37: "山东",
        41: "河南",
        42: "湖北",
        43: "湖南",
        44: "广东",
        45: "广西",
        46: "海南",
        50: "重庆",
        51: "四川",
        52: "贵州",
        53: "云南",
        54: "西藏",
        61: "陕西",
        62: "甘肃",
        63: "青海",
        64: "宁夏",
        65: "新疆",
        71: "台湾",
        81: "香港",
        82: "澳门",
        91: "国外"
      };
      var arrint = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
      var arrch = new Array('1', '0', 'x', '9', '8', '7', '6', '5', '4', '3', '2');
      var reg = /(^\d{15}$)|(^\d{17}(\d|x)$)/;
      if (!reg.test(card)) return false;
      if (vcity[card.substr(0, 2)] == undefined) return false;
      var len = card.length;
      if (len == 15)
        reg = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/;
      else
        reg = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|x)$/;
      var d, a = card.match(new RegExp(reg));
      if (!a) return false;
      if (len == 15) {
        d = new Date("19" + a[2] + "/" + a[3] + "/" + a[4]);
      } else {
        d = new Date(a[2] + "/" + a[3] + "/" + a[4]);
      }
      if (!(d.getFullYear() == a[2] && (d.getMonth() + 1) == a[3] && d.getDate() == a[4])) return false;
      if (len = 18) {
        len = 0;
        for (var i = 0; i < 17; i++) len += card.substr(i, 1) * arrint[i];
        return arrch[len % 11] == card.substr(17, 1);
      }
      return true;
      console.log(56)
  },
  //身份证正面
  uploadComplete:function(e){
    console.log('onComplete', e)
    wx.hideLoading()
    if(e.detail.statusCode == 200){
      var obj = JSON.parse(e.detail.data);
      console.log(obj.id)
      this.data.imgList.push(obj.id);
      this.setData({
        imgList: this.data.imgList
      })
    }
  },
  uploadFail: function (e) {
    console.log('onFail', e)
    $Message({
      content: '上传图片失败',
      type: 'error',
      duration: 2
    })
  },
  uploadRemove:function(e){
    const { file, fileList } = e.detail
    console.log(e.detail)
    wx.showModal({
      content: '确定删除？',
      success: (res) => {
        if (res.confirm) {
          var obj = JSON.parse(e.detail.file.res.data);
          var id = obj.id;
          var index = this.data.imgList.indexOf(id);
          if(index > -1){
            this.data.imgList.aplice(index,1);
          }
          this.setData({
            identityUrl: '',
            imgList: this.data.imgList
          })
        }
      },
    })
  },
  //身份证反面
  uploadRemove2: function (e) {
    const { file, fileList } = e.detail
    console.log(e.detail)
    wx.showModal({
      content: '确定删除？',
      success: (res) => {
        if (res.confirm) {
          var obj = JSON.parse(e.detail.file.res.data);
          var id = obj.id;
          var index = this.data.imgList.indexOf(id);
          if (index > -1) {
            this.data.imgList.aplice(index, 1);
          }
          this.setData({
            identityDownUrl: '',
            imgList: this.data.imgList
          })
        }
      },
    })
  },
  uploadRemove3: function (e) {
    const { file, fileList } = e.detail
    console.log(e.detail)
    wx.showModal({
      content: '确定删除？',
      success: (res) => {
        if (res.confirm) {
          var obj = JSON.parse(e.detail.file.res.data);
          var id = obj.id;
          var index = this.data.imgList.indexOf(id);
          if (index > -1) {
            this.data.imgList.aplice(index, 1);
          }
          this.setData({
            passportUrl: '',
            imgList: this.data.imgList
          })
        }
      },
    })
  },
  uploadRemove4: function (e) {
    const { file, fileList } = e.detail
    console.log(e.detail)
    wx.showModal({
      content: '确定删除？',
      success: (res) => {
        if (res.confirm) {
          var obj = JSON.parse(e.detail.file.res.data);
          var id = obj.id;
          var index = this.data.imgList.indexOf(id);
          if (index > -1) {
            this.data.imgList.aplice(index, 1);
          }
          this.setData({
            healthyUrl: '',
            imgList: this.data.imgList
          })
        }
      },
    })
  },
  uploadRemove5: function (e) {
    const { file, fileList } = e.detail
    console.log(e.detail)
    wx.showModal({
      content: '确定删除？',
      success: (res) => {
        if (res.confirm) {
          var obj = JSON.parse(e.detail.file.res.data);
          var id = obj.id;
          var index = this.data.imgList.indexOf(id);
          if (index > -1) {
            this.data.imgList.aplice(index, 1);
          }
          this.setData({
            otherUrl: '',
            imgList: this.data.imgList
          })
        }
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})