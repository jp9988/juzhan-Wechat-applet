// pages/morning/morning.js
var Bmob = require('../../libs/Bmob-2.2.4.min.js');
var that;
var util = require("../../utils/util.js");
var date = new Date();
var year = date.getFullYear();
var month = util.shapeMonth(date.getMonth() + 1);
var day = util.shapeDay(date.getDate());
var week = date.getDay();
var weekday = new Array(7);
weekday[0] = "Sun";
weekday[1] = "Mon";
weekday[2] = "Tue";
weekday[3] = "Wed";
weekday[4] = "Thur";
weekday[5] = "Fri";
weekday[6] = "Sat";
//天干地支年份
var NL = util.showDate();
var TG = util.covertTg(NL);
var DZ = util.covertDz(NL);
var SX = util.covertSx(NL);
var NF = util.covertNf(NL);
var Mon = util.covertMon(NL);
var Yue = util.covertYue(NL);
var Th = util.covertTh(NL);
var Num = util.covertNum(NL);
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgurl: "",
    year: year,
    month: month,
    day: day,
    weekday: weekday[week],
    NL: NL,
    TG: TG,
    DZ: DZ,
    SX: SX,
    NF: NF,
    address:null,
    Mon:Mon,
    Yue:Yue,
    Th:Th,
    Num:Num
  },

  //在util回调数据
  processAddress: function (add) {
    that = this;
    var content;
    that.setData({
      address: add.address_component.district
    });
    var address = add.address_component.district
    wx.request({
      url: 'https://api.tianapi.com/txapi/tianqi/index?key=APIKEY&city=' + address,
      success: res => {
        if (res.data.code == 200) {
          that.setData({
            content: res.data.newslist[0]
          })
        }else{
          that.setData({
            content: res.data.msg
          })
        }
      }
    })
  },

  getMorning:function(event){
    that = this;
    wx.request({
      url: 'https://api.tianapi.com/txapi/zaoan/index?key=APIKEY',
      success: function (res) {
        if (res.data.code == 200) {
          that.setData({
            detail: res.data.newslist[0],
          })          
        } else {
          that.setData({
            detail: res.data.msg
          })
        }
      },
    })
    
  },

  onRefresh: function (event) {
    this.getMorning();
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.getLocation(this.processAddress);
    this.getMorning();
    const query = Bmob.Query('morning');
    query.get('qXIY777c').then(res => {
      that = this;
      that.setData({
        imgurl: res.imgurl
      })
    }).catch(err => {
      console.log(err)
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