// pages/yiju/yiju.js
var that;
var util = require("../../utils/util.js");
var date = new Date();
var year = date.getFullYear();
var month = util.shapeMonth(date.getMonth() + 1);
var day = util.shapeDay(date.getDate());
var week = date.getDay();
var weekday = new Array(7);
weekday[0] = "星期日";
weekday[1] = "星期一";
weekday[2] = "星期二";
weekday[3] = "星期三";
weekday[4] = "星期四";
weekday[5] = "星期五";
weekday[6] = "星期六";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    year: year,
    month: month,
    day: day,
    weekday: weekday[week]
  },

  getContent: function() {
    var author = "佚名"
    //对数据中图片的来源判空
    var detail = {
      imgauthor: author,
      imgurl: "",
      word: "",
      wordfrom: ""
    }
    wx.request({
      url: "https://api.tianapi.com/txapi/one/index?key=APIKEY&rand=1",
      success: res => {
        if (res.data.code == 200) {
          if (res.data.newslist[0] != null) {
            if (res.data.newslist[0].imgauthor != "") {
              detail.imgauthor = res.data.newslist[0].imgauthor
            }
            detail.word = res.data.newslist[0].word;
            detail.wordfrom = res.data.newslist[0].wordfrom;
            detail.imgurl = res.data.newslist[0].imgurl;
          }
          that.setData({
            content: detail
          })
        } else {
          that.setData({
            content: res.data.msg
          })
        }
      }
    })
  },

  onRefresh: function(event) {
    that = this;
    that.getContent();
  },

  // 查看图片
  viewMoviePostImg: function(e) {
    var src = e.currentTarget.dataset.src;
    wx.previewImage({
      urls: [src], //需要预览的图片http链接列表
      current: src //当前显示图片的http链接
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    that = this;
    that.getContent();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})