const api = require('../../config/config.js')
const { $Message } = require('../../iviewdist/base/index.js')

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
      remainSeat:'',//剩余位
      checked:false,
      customers:[],//出游人列表
      formlist:[],//选中的出游人
  },
  getVisitor:function(e){
      var i = e.currentTarget.dataset.info
      this.setData({
        checked:e.detail.current
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showToast({
      title: '玩命加载中...',
      icon: 'loading'
    });
    // this.setData({
    //   ids: options.id,
    //   remainSeat: opions.remainSeat,
    // })
    this.data.formlist.push({
        id:'',
        name:'',
        personType:'',
        identity:'',
        phone:'',
        passport:'',
        disabled:false
    })
    this.setData({
      formlist:this.data.formlist
    })
    this.getVisitorList();
    
  },
  getVisitorList:function(){
      var that = this;
      wx.request({
        url: api.visitorList,
        method: 'post',
        header: {
          'content-type': "application/x-www-form-urlencoded"
        },
        data: {
          tel: app.globalData.tel
        },
        success(res) {
          wx.hideToast();
          if (res.data.code == 0) {
            that.setData({
              customers: res.data.customers
            })
          } 
        }
      })
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