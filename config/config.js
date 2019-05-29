const baseUrl = 'https://test.dhhs.com.cn'

//const baseUrl = "https://travel.dhhs.com.cn";

const loginUrl = baseUrl+'/wx/login.do';//登录
//const tourList = baseUrl +'/wx/tourList.do'
const tourList = baseUrl +'/wx/tourPOSTList.do'//线路列表
const tourDetail = baseUrl +'/wx/tourDetail.do'//线路详情
const visitorList = baseUrl +'/wx/selectCustomerListBySale.do'//出游人列表
const orderList = baseUrl + '/wx/orderList.do'//订单列表
const detailList = baseUrl + '/wx/orderDetail.do'//订单列表
module.exports = {
  baseUrl:baseUrl,
  loginUrl:loginUrl,
  tourList: tourList,
  tourDetail:tourDetail,
  visitorList:visitorList,
  orderList: orderList,
  detailList: detailList//订单详情
}

