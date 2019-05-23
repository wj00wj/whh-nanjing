//index.js
const api = require('../../config/config.js')
const app = getApp()

Page({
  data: {
    imgUrl: api.baseUrl,
    tourName:'',//搜索名称
    visibleCategory:false,//是否显示产品类别
    visibleOrigin:false,//是否显示出发地
    categoryList:[],//产品类别
    originList:[],//出发地
    lineTypeId:'',//选择的产品类别  
    originId:'',//选择的出发地
    categorySelected:false,
    originSelected:false,
    list:[],
    nomore:false,//没有团期标志
    isError:false,//返回数据是否出错
    src:'../../images/index-default.png',//默认列表图片
  },

  onLoad: function () {
      this.setData({
        imgUrl:api.baseUrl
      })
      wx.showToast({
        title: '玩命加载中...',
        icon:'loading'
      });

  },
  onShow:function(){
      this.getRoutes();
  },
  getRoutes:function(param){//获取旅游线路
      var that = this;
      wx.request({
        url: api.tourList,
        method: 'post',
        header:{
          'content-type': "application/x-www-form-urlencoded"
        },
        data:{ 
            page:1,
            rows:100,
            name: this.data.tourName,
            lineTypeId: this.data.lineTypeId,
            originId:this.data.originId,
        },
        success(res){
            wx.hideToast();
            that.setData({
              isError:false,
              categoryList: res.data.tourTypes,
              originList: res.data.tourOrigins,
              list:res.data.tours
            })
            if(res.data.tours.length == 0){
              that.setData({
                nomore:true
              })
            }else{
              that.setData({
                nomore:false
              })
            }

            if(param != undefined){
              wx.stopPullDownRefresh();
              wx.showToast({
                title: '刷新成功',
                duration:1500
              })
            }
        },
        fail(){
          that.setData({
              isError:true
          })
        }
      })
  },
  onPullDownRefresh: function () {//页面相关事件处理函数--监听用户下拉动作
      this.getRoutes('isRefresh');//参数为刷新标识
  },
  clearname:function(){
    this.setData({
      tourName:''
    })
    this.getRoutes();
  },
  cancelname:function(){
    this.setData({
      tourName:''
    })
    this.getRoutes();
  },
  getname:function(e){
    this.setData({
      tourName:e.detail.value
    })
    this.getRoutes();
  },
  productCategory:function(){
      this.setData({
        visibleCategory: true,
        visibleOrigin: false,
        categorySelected:true,
        originSelected:false,
      })
  },
  productOrigin: function(){
      this.setData({
        visibleCategory: false,
        visibleOrigin: true,
        categorySelected: false,
        originSelected: true,
    })
  },
  hiddenCategory:function(){//隐藏产品类别
      this.setData({
        visibleCategory:false,
        categorySelected:false,
      })
  },
  hiddenOrigin:function(){//隐藏出发地选择
      this.setData({
        visibleOrigin: false,
        originSelected:false
      })
  },
  categoryOn:function(e){//产品类别选择
      this.setData({
        lineTypeId:e.currentTarget.dataset.info
      })
      this.getRoutes();
      this.setData({
        visibleCategory:false,
        categorySelected: false,
      })
  },
  originOn:function(e){//出发地选择
      this.setData({
        originId: e.currentTarget.dataset.info
      })
      this.getRoutes();
      this.setData({
        visibleOrigin: false,
        originSelected: false
      })
  }

})
