const api = require('../../config/config.js')
const { $Message } = require('../../iviewdist/base/index.js')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tel:'',
    password:'',
    userInfo:{},
    hasUserInfo:false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),//判断小程序的API，回调，参数，组件等是否在当前版本可用
    isLogin:false,//判断是否输入tel password 可以点击登录
    isProduct:0//是否从产品详情页跳转的登录 0-不是 1--是
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      if(options.isProduct == 1){
        this.setData({
          isProduct:1
        })
      }
      if(app.globalData.userInfo){
        this.setData({
          userInfo:app.globalData.userInfo,
          hasUserInfo:true
        })
      }else if(this.data.canIUse){
        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        app.userInfoReadyCallback = res => {
          this.setData({
            userInfo:res.userInfo,
            hasUserInfo:true
          })
        }
      }else{
        // 在没有 open-type=getUserInfo 版本的兼容处理
        wx.getUserInfo({
          success:res=>{
            app.globalData.userInfo = res.userInfo
            this.setData({
              userInfo:res.userInfo,
              hasUserInfo:true
            })
          }
        })
      }
  },
  getTel:function(e){
      this.setData({
        tel:e.detail.value,
        isLogin:true
      })
  },
  getPassword:function(e){
      this.setData({
        password:e.detail.value,
        isLogin:true
      })
  },
  login:function(e){//登录
      var that = this;
      wx.request({
        url: api.loginUrl,
        method:'post',
        header:{
          'content-type': 'application/x-www-form-urlencoded'
        },
        data:{
            tel:this.data.tel,
            password:this.data.password
        },
        success(res){
            if(res.data.code == 0){
               console.log(res.data.data)
               app.globalData.userData = res.data.data
               app.globalData.tel = res.data.tel
               app.globalData.login = 1;//用户为登录状态
               wx.showToast({
                  title:"登录成功",
                  icon:'success',
                  duration:2000,
                  mask:true,
                  success:function(){
                    console.log(that.data.isProduct+"----------")
                    if(that.data.isProduct == 1){
                      wx.navigateBack({//返回产品详情页
                        changed:true
                      })
                    }else{
                      wx.switchTab({
                        url: '../my/my'
                      })
                    }
                  }
               })
            }else{
                $Message({
                    content:res.data.msg,
                    type:'error',
                    duration:2 
                })
            }
        }
      })
  },
  getUserInfo:function(e){//同意获取
      if(e.detail.errMsg == 'getUserInfo:ok'){
          app.globalData.userinfo = e.detail.userInfo
          this.setData({
            userInfo:e.detail.userInfo,
            hasUserInfo:true
          })
      }
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