// pages/password/password.js
const api = require('../../config/config.js')
const app = getApp()
import { $wuxToptips } from '../../wuxdist/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
      id:'',//用户id
      newPassword:'',//新密码
      conPassword:'',//确认密码
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.userData.id);
    this.setData({
      id: app.globalData.userData.id
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

  },
  getnewPassword: function (e) {
    var val = e.detail.value;
    this.setData({
      newPassword: val
    });
  },
  getconPassword: function (e) {
    var val = e.detail.value;
    this.setData({
      conPassword: val
    });
  },
  confirm(){//确认修改
    var chat=this;
    if (chat.data.newPassword!=''){
      if (chat.data.newPassword == chat.data.conPassword) {
        wx.request({
          url: api.baseUrl + '/wx/modifyPsw.do',
          method: 'POST',
          data: {
            password: chat.data.newPassword,
            id: chat.data.id
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          success(res) {
            if (res.data.code == 0) {
              wx.showToast({
                title: '成功',
                icon: 'succes',
                duration: 2000,
                mask: true,
                success: function () {
                  wx.navigateBack({
                    changed: true
                  }); //返回上一页
                }
              })
            }
          }
        })
      } else {
        $wuxToptips().show({
          icon: 'cancel',
          hidden: false,
          text: '两次密码不一致！',
          duration: 3000,
          success() { },
        })
      }
    }else{
      $wuxToptips().show({
        icon: 'cancel',
        hidden: false,
        text: '请输入新密码！',
        duration: 3000,
        success() { },
      })
    }
  }
})