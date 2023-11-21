Page({
  data: {
    isLoading: false, // 控制加载动画的显示与隐藏
    lotteryResult: null, // 初始化抽奖结果为空
    isModalVisible: false, // 控制模态框的显示与隐藏
    modalContent: '', // 模态框的内容
    isShaking: false, // 是否正在进行摇一摇动作
    isShakingImageVisible: false, // 是否显示抖动图片
  },

  onLoad: function() {
    // 监听摇一摇事件
    wx.onAccelerometerChange((res) => {
      // 如果正在进行摇一摇动作，则退出
      if (this.data.isShaking) {
        return;
      }

      // 计算加速度的平方和
      var acceleration = res.x * res.x + res.y * res.y + res.z * res.z;

      // 如果加速度超过阈值，则开始摇一摇动作
      if (acceleration > 3) {
        this.shakeLottery();
      }
    });
  },

  startLottery: function() {
    // 如果正在加载中，则不允许连续点击抽奖
    if (this.data.isLoading) {
      return;
    }
    this.setData({
      isLoading: true,
    });

    // 播放抽奖音效
    const app = getApp();
    const lotteryAudioContext = wx.createInnerAudioContext();
    lotteryAudioContext.src = app.globalData.lotterySoundSrc;
    lotteryAudioContext.autoplay = true;

    // 模拟抽奖耗时操作
    setTimeout(() => {
      var prizes = ['香谷','超润甜品1','师兄猪脚饭','卢大厨营养汤饭','煲仔饭','香满居','癞子店','超润甜品2','中原烤肉拌饭','博士香飘飘螺蛳粉','沙县东','沙县后','沙县前','重庆自选砂锅粉麻辣烫','陈记牛杂','龙的麻辣烫','余记牛杂','佛记烧鹅','佳味美食','胡同口炒鸡','柳州螺蛳粉','爽爽糖水店','上海老混沌-前街','机工包','隆江猪脚饭-后街1','隆江猪脚饭-后街2','人民食堂','牛牛美食','肥姐炒粉','上海老混沌-后街','后街肠粉','后街潮汕正宗汤粉','外婆菜','南街美食','红记美食'];
      var randomIndex = Math.floor(Math.random() * prizes.length);
      var result = prizes[randomIndex];

      // 播放结果音效
      const resultAudioContext = wx.createInnerAudioContext();
      resultAudioContext.src = app.globalData.resultSoundSrc;
      resultAudioContext.autoplay = true;

      this.setData({
        lotteryResult: result,
        isLoading: false,
        isModalVisible: true,
        modalContent: result,
        isShaking: false, // 摇一摇动作结束，将状态设置为 false
      });
    }, 1500);
  },

  shakeLottery: function() {
    // 设置状态为正在摇一摇动作，显示抖动图片
    this.setData({
      isShaking: true,
      isShakingImageVisible: true,
    });

    // 执行摇一摇逻辑
    this.startLottery();

    // 延时重置抖动图片的显示
    setTimeout(() => {
      this.setData({
        isShakingImageVisible: false,
      });
    }, 1500);
  },

  closeResultModal: function() {
    // 隐藏模态框
    this.setData({
      isModalVisible: false,
      modalContent: '',
    });
  },
});