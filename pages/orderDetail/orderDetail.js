const api = require('../../config/config.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',//订单id
    isError:true,//加载失败,
    orderDetail:'',//订单信息
    people:'',//出游人列表
    baseUrl:api.baseUrl,//地址
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
    wx.showLoading({
      title: '玩命加载中',
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
    this.detail();
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
    this.detail('isRefresh');//参数为刷新标识
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
  detail(param){//获取订单详情
    var chat=this;
    wx.request({
      url: api.detailList + '?id=' + chat.data.id,
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'post',
      success(res) {
        console.log(res.data.travelOrder.travelVisitors[0].frontAttachment);
        wx.hideLoading();
        chat.setData({
          orderDetail: res.data.travelOrder,
          isError:true
        });
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
      fail(res) {
        chat.setData({
          isError:false
        })
      }
    });
  },
  chooseImage: function (e) {
    var chat = this;
    var sid = e.target.dataset.sid;//出游人id
    var type = e.target.dataset.type;//照片类型
    // 选择图片
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilesSize = res.tempFiles[0].size;  //获取图片的大小，单位B
        if (tempFilesSize <= 2000000) {   //图片小于或者等于2M时 可以执行获取图片
          var tempFilePaths = res.tempFilePaths[0]; //获取图片
            wx.uploadFile({
              url: api.baseUrl + '/uploadWX.aspx', // 仅为示例，非真实的接口地址
              filePath: tempFilePaths,
              name: 'file',
              formData: {
                sid: sid,
                type: type
              },
              success(res) {
                // do something
                console.log(res);
                wx.showToast({
                  title: '上传成功',
                  icon: 'success',
                  duration: 2000
                });
                chat.onShow();
              },
              fail(){
                wx.showToast({
                  title: '上传失败',
                  icon: 'none',
                  duration: 2000
                });
              }
            })
        } else {    //图片大于2M，弹出一个提示框
          wx.showToast({
            title: '上传图片不能大于2M!',  //标题
            icon: 'none'//图标 none不使用图标，详情看官方文档
          })
        }
      }
    })
  },
  // 图片预览
  previewImage: function (e) {
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current,
      urls: [current]
    })
  },
  //删除图片
  deleteImg(e){
    var id = e.target.dataset.id;
    var chat = this;
    wx.showModal({
      content: '确定删除？',
      success: (res) => {
        if (res.confirm) {
          wx.request({
            url: api.baseUrl + '/deletePicture.do?id=' + id,
            method: 'post',
            header: {
              'content-type': 'application/json' // 默认值
            },
            success(res) {
              wx.showToast({
                title: '删除成功',
                icon: 'success',
                duration: 2000
              });
              chat.onShow();
            }
          })
        }else {
          
        }
      }
    })
  },
  cancel(){//取消订单

  }
})