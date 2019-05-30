const api = require('../../config/config.js')
const app = getApp()
import { $wuxToptips } from '../../wuxdist/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    originSelected:false, //订单状态是否显示
    orderStates: '',//订单状态条件查询
    orderTypeId: '',//选择的订单状态
    islogin:'', //登陆状态
    orderList:[],//订单列表
    nomore:false,//是否有订单
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showToast({
      title: '玩命加载中...',
      icon: 'loading',
      duration: 1500
    });
    if (app.globalData.login == 0) {
      this.getLogin(); 
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
    this.setData({
      islogin: app.globalData.login
    })
    if (app.globalData.login == 1) {
      this.getOrderList();
    }
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
    wx.showNavigationBarLoading()
    this.getOrderList('isRefresh');//参数为刷新标识
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
  getOrderList(param){
    var chat=this;
    if (app.globalData.tel!=''){
      wx.request({
        url: api.orderList + '?name =' + chat.data.name + '&tel=' + app.globalData.tel + '&rows=100&page=1&orderState=' + chat.data.orderTypeId, // 仅为示例，并非真实的接口地址
        method: 'get',
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          wx.hideToast();
          if (res.data.total == 0) {
            chat.setData({
              nomore: true
            })
          }else {
            console.log(res.data.travelOrders);
            chat.setData({
              nomore: false,
              orderList: res.data.travelOrders,
              orderStates: res.data.orderStates
            })
          }
          if (param != undefined) {
            wx.stopPullDownRefresh();
            //隐藏动画
            wx.hideNavigationBarLoading();
            wx.showToast({
              title: '刷新成功',
              duration: 1500
            })
          }
        },
        fail() {
         
        }
      })
    }
  },
  orderOrigin(){//订单状态开关
    this.setData({
      originSelected: true
    })
  },
  hiddenCategory(){
    this.setData({
        originSelected:false
      })
  },
  orderDetail(e){//跳转订单详情页
    var id=e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../orderDetail/orderDetail?id='+id
    })
  },
  send(e){//发送签署
    var _this = this;
    wx.request({
      url: api.baseUrl + '/wx/signEContract.do?',
      header: {
        'content-type': "application/json"
      },
      data: {
        id: e.currentTarget.dataset.info
      },
      method: 'post',
      success: function (res) {
        if (res.data.result == true) {
          $wuxToptips().success({
            hidden: false,
            text: '发送成功！',
            duration: 3000,
            success() { },
          })
          _this.list();
        } else {
          $wuxToptips().show({
            icon: 'cancel',
            hidden: false,
            text: '发送失败！',
            duration: 3000,
            success() { },
          })
        }
      },
      fail: function (res) {

      }
    })
  },
  ressend: function (e) {//重发签署协议
    wx.request({
      url: api.baseUrl + '/wx/resendSms.do',
      header: {
        'content-type': "application/json"
      },
      method: 'post',
      data: {
        id: e.currentTarget.dataset.info
      },
      success: function (res) {
        if (res.data.result == true) {
          $wuxToptips().success({
            hidden: false,
            text: '发送成功！',
            duration: 3000,
            success() { },
          })
        } else {
          $wuxToptips().show({
            icon: 'cancel',
            hidden: false,
            text: '发送失败！',
            duration: 3000,
            success() { },
          })
        }
      },
      fail: function (res) {

      }
    })
  },
  supplyressend: function (e) {//重发补充协议
    wx.request({
      url: api.baseUrl + '/wx/resendSupplySms.do',
      header: {
        'content-type': "application/json"
      },
      method: 'post',
      data: {
        id: e.currentTarget.dataset.info
      },
      success: function (res) {
        if (res.data.result == true) {
          $wuxToptips().success({
            hidden: false,
            text: '发送成功！',
            duration: 3000,
            success() { },
          })
        } else {
          $wuxToptips().show({
            icon: 'cancel',
            hidden: false,
            text: '发送失败！',
            duration: 3000,
            success() { },
          })
        }
      },
      fail: function (res) {

      }
    })
  },
  ressendsms: function (e) {//重发短信作废
    wx.request({
      url: api.baseUrl + '/wx/resendInvalidSms.do',
      header: {
        'content-type': "application/json"
      },
      method: 'post',
      data: {
        id: e.currentTarget.dataset.info
      },
      success: function (res) {
        if (res.data.result == true) {
          $wuxToptips().success({
            hidden: false,
            text: '发送成功！',
            duration: 3000,
            success() { },
          })
        } else {
          $wuxToptips().show({
            icon: 'cancel',
            hidden: false,
            text: '发送失败！',
            duration: 3000,
            success() { },
          })
        }
      },
      fail: function (res) {

      }
    })
  },
  categoryOn(e){//订单状态查询
    this.setData({
      orderTypeId: e.currentTarget.dataset.info,
      originSelected:false
    });
    this.getOrderList();
  },
  getLogin(){//获取本地缓存
    var chat=this;
    var tel = wx.getStorageSync('tel');
    var password = wx.getStorageSync('password');
    if (tel!=''){
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
            app.globalData.userData = res.data.data;
            app.globalData.tel = res.data.data.tel;
            app.globalData.login = 1;//用户为登录状态
            //chat.onShow();
            chat.getOrderList();
          }
        }
      })
    }
  },
  toLogin(){//去登陆
    wx.navigateTo({
      url: '../login/login?isProduct=1'
    })
  }
})