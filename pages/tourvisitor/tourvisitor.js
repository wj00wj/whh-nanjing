const api = require('../../config/config.js')
const { $Message } = require('../../iviewdist/base/index.js')

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
      remainSeat:'',//剩余位
      current:'',
      customers:[],//出游人列表
      formlist:[],//选中的出游人
  },
  getVisitor:function(e){
      var i = e.currentTarget.dataset.info
      var flag = e.detail.current;
      if(flag){
        this.data.customers[i].checked = true;
        this.setData({
          customers:this.data.customers
        })
        this.data.formlist.push(this.data.customers[i]);
      }else{
        this.data.customers[i].checked = false;
        this.setData({
          customers: this.data.customers
        })
        this.data.formlist.splice(i,1);
      }
      this.setData({
        formlist: this.data.formlist
      })
      console.log(this.data.formlist)
  },
  deterVisitor:function(e){
      if(this.data.formlist.length <= this.data.remainSeat){
        let pages = getCurrentPages();
        let prevPage = pages[pages.length - 2];
        prevPage.setData({
          formlist: this.data.formlist,
        })
        wx.navigateBack({
          delta: 1,
        })
      }else{
        $Message({
          content: '剩余位不足!',
          type: 'error',
          duration: 2
        })
      }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showToast({
      title: '玩命加载中...',
      icon: 'loading'
    });
    this.setData({
      remainSeat: options.remainSeat,
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
            for(var i=0;i<res.data.customers.length;i++){
              res.data.customers[i].checked = false;//添加复选字段
            }
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