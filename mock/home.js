export default {
  // 支持值为 Object 和 Array
  'GET /api/home/commision-work': {
    isSuccess: true,
    count: 3,
    message: '返回成功',
    statusCode: 200,
    data: [
      {
        id: 3,
        taskTitle: '一篇博客',
        endTime: '2019-01-18T00:00:00',
        taskDescription: '本周轮到你总结博客，主题自定哦',
        receivedUserName: '陆仁杰',
        receivedUserCode: 150701206,
        isDone: 0,
        lastEditTime: '2019-01-11T17:53:35',
        createUserCode: 'admin22',
        createUserName: 'admin22',
        createTime: '2019-01-11T17:11:26',
        lastEditUserCode: 'admin22',
        lastEditUserName: 'admin22',
      },
      {
        id: 1,
        taskTitle: '本周是你的分享会',
        endTime: '2019-01-18T15:59:20',
        taskDescription: '大家好我今天来介绍一下Mock的基本原理',
        receivedUserName: '陆仁杰',
        receivedUserCode: 150701206,
        isDone: 0,
        lastEditTime: '2019-01-11T04:26:16',
        createUserCode: 'admin',
        createUserName: 'admin',
        createTime: '2019-01-11T16:00:20',
        lastEditUserCode: null,
        lastEditUserName: null,
      },
    ],
  },
};
