const api = require('../../config/config.js')
const { $Message } = require('../../iviewdist/base/index.js')
let WxParse = require('../../wxParse/wxParse.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      imgUrl: api.baseUrl,
      ids:'',//线路id
      tourGroup:{},//团集合
      isGroupButtonMore:false,//是否显示更多团期
      groupVisible:false,//显示价格弹出框
      //nobtn:true,
      isData:'0',//选中的团期
      swipercurrent:0,//滑动显示的当前团期
      tabcurrent:'tab1',//显示当前tabs页签
      tab1:true,//是否显示行程
      tab2:false,//是否显示出行须知
      tab3:false,//是否显示预定须知
      remainSeat:0,//剩余位置
      backTopValue:false,//top标签是否显示
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      wx.showToast({
        title: '玩命加载中...',
        icon:'loading'
      });
      this.setData({
        ids:options.id,
        imgUrl:api.baseUrl
      })
      var that = this;
      wx.request({
        url: api.tourDetail,
        method: 'post',
        header: {
          'content-type': "application/x-www-form-urlencoded"
        },
        data:{
          id:this.data.ids
        },
        success(res){
          wx.hideToast();
          that.setData({
            tour:res.data.tour,
            tourGroup:res.data.tour.tourGroups[0],
          })
          //团期
          let priceList = res.data.tour.tourGroups;
          //判断是否显示更多按钮
          if(priceList.length > 3){
              that.setData({
                isGroupButtonMore:true
              })
          }else{
              that.setData({
                isGroupButtonMore: false
              })
          }
          var remainSeat = that.data.tourGroup.outNumber - that.data.tourGroup.applynum;//剩余位
          that.setData({
            remainSeat: remainSeat
          })
        },
        fail(){

        }
      })
  },
  getPlaceholder:function(){
      var remainSeat = this.data.tourGroup.outNumber-this.data.tourGroup.applynum;//剩余位
      // if(remainSeat != 0 && app.globalData.login == 1){//有余位且登录
          wx.navigateTo({
            url: '../tourorder/tourorder?id='+this.data.tourGroup.id+'&remainSeat='+remainSeat+'&lineTypeId='+this.data.tour.lineTypeId+'&name='+this.data.tour.name+'&outDate='+this.data.tourGroup.outDateStr+'&img='+this.data.tour.attachments[0].path,//lineTypeId:线路类型id,outDate:出团日期
            success:function(){

            },
            fail: function(){

            },
            complete:function(){

            }
          })
      // }else if(app.globalData.login != 1){//未登录，跳转登录页面
      //     wx.navigateTo({
      //       url: '../login/login?isProduct=1'
      //     })
      //     app.globalData.login = 0;
      // }else{//余位不足
      //     $Message({
      //       content: '余位不足！',
      //       type: 'error',
      //       duration: 2
      //     });
      // }
  },
  getDataBtn:function(e){
      var i = e.currentTarget.dataset.info;
      var groups = this.data.tour.tourGroups[i];
      if(i == 0){
          var current = i;
      }else{
          var index = this.data.tour.tourGroups.length-3;
          if(i<3){
            var current = 0;
          }else if(i>=3&&i<5){
            var current = 2;
          }else if(i>=5 && i<6){
            var current = 3;
          }else if(i>=6){
            var current = 4;
          }
      }
      this.setData({
        tourGroup:groups,
        isData:i,
        swipercurrent:current,
        groupVisible:false,
        remainSeat: groups.outNumber - groups.applynum
      })
  },
  change:function(e){
      console.log("index----"+e.detail.current)
  },
  groupButton:function(){
      this.setData({
        groupVisible:true
      })
  },
  hideGroup:function(){
      this.setData({
        groupVisible: false
      })
  },
  tabChange:function(e){
      console.log(e);
      this.setData({
        tabcurrent:e.detail.key,
        tab1:e.detail.key=='tab1'?true:false,
        tab2:e.detail.key == 'tab2' ? true : false,
        tab3:e.detail.key == 'tab3' ? true : false,
      })
  },
  call:function(){
    $Message({
      content: '程序员在拼命研发中！',
      type: 'default',
      duration: 2
    });
  },
  // 滚动到顶部
  backTop: function () {
    // 控制滚动
    wx.pageScrollTo({
      scrollTop: 0
    })
  },
  onPageScroll: function (e) {
    //console.log(e)
    var that = this
    var scrollTop = e.scrollTop
    var backTopValue = scrollTop > 500 ? true : false
    that.setData({
      backTopValue: backTopValue
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