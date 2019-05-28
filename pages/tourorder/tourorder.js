const api = require('../../config/config.js')
const { $Message } = require('../../iviewdist/base/index.js')

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
      // right:[
      //   {
      //     text:'取消',
      //     style: 'background-color: #ddd; color: white',
      //   },
      //   {
      //     text:'删除',
      //     style:'background-color: #F4333C; color: white'
      //   }
      // ],
      imgUrl: api.baseUrl,
      name:'',//线路名称
      outDate:'',//出团日期
      remainSeat:'',//剩余位
      lineTypeId:'',//线路类型id
      img:'',//线路图片
      formlist:[],//出游人列表
      totalPrice:'',//总价

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.setData({
        name: options.name,
        outDate:options.outDate,
        remainSeat: options.remainSeat,
        lineTypeId: options.lineTypeId,
        img:options.img
      })
   
  },
  onClick:function(e){
      console.log('onclick',e.detail)
  },
  radioChange:function(e){

  },
  signChange:function(e){

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
    console.log(this.data.formlist)
    if(this.data.formlist.length != 0){
      var formlist = this.data.formlist;
      for(var i=0;i<formlist.length;i++){
        this.data.formlist[i].personType = '';//personType 1：儿童占床 2：儿童不占床 3：成人
        this.data.formlist[i].isSign = 0;
        this.data.formlist[i].disabled = false;
      }
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