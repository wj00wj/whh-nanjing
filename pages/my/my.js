const api = require('../../config/config.js')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},//微信信息
    userData:{},//登陆信息
    islogin:'',//判断是否登陆
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getLogin();
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
    this.setData({
      userInfo: app.globalData.userInfo,
      userData: app.globalData.userData,
      islogin: app.globalData.login
    });
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
    
  },
  goLogin(){//跳转登录页
    wx.navigateTo({
      url: '../login/login'
    })
  },
  outLogin() {//退出登陆
    app.globalData.userData = null;
    app.globalData.login = 0;
    wx.removeStorageSync('tel');
    wx.removeStorageSync('password');
    this.onShow();
  },
  getLogin() {//获取本地缓存
    var chat = this;
    var tel = wx.getStorageSync('tel');
    var password = wx.getStorageSync('password');
    console.log(tel);
    if (tel!='') {
      wx.request({
        url: api.loginUrl,
        method: 'post',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          tel: tel,
          password: password
        },
        success(res) {
          if (res.data.code == 0) {
            console.log(res.data.data)
            app.globalData.userData = res.data.data;
            app.globalData.tel = res.data.data.tel;
            app.globalData.login = 1;//用户为登录状态
            chat.onShow();
          }
        }
      })
    }
  }
})