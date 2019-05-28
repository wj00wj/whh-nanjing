const baseUrl = 'https://test.dhhs.com.cn'

//const baseUrl = "https://travel.dhhs.com.cn";

const loginUrl = baseUrl+'/wx/login.do';//登录
//const tourList = baseUrl +'/wx/tourList.do'
const tourList = baseUrl +'/wx/tourPOSTList.do'//线路列表
const tourDetail = baseUrl +'/wx/tourDetail.do'//线路详情
const visitorList = baseUrl +'/wx/selectCustomerListBySale.do'//出游人列表
const uploadUrl = baseUrl +'/uploadWX.aspx'//图片上传
const saveCustomerBySale = baseUrl +'/wx/saveCustomerBySale.do'//添加出游人
module.exports = {
  baseUrl:baseUrl,
  loginUrl:loginUrl,
  tourList: tourList,
  tourDetail:tourDetail,
  visitorList:visitorList,
  uploadUrl: uploadUrl,
  saveCustomerBySale: saveCustomerBySale
}

