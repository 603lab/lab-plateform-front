export default {
  // 个人信息弹窗
  personInfo: [
    {
      title: '姓名',
      type: 'input',
      required: true,
      field: 'realName',
    },
    {
      title: '年级',
      type: 'select',
      required: true,
      field: 'entranceYear',
      values: new Array(10).fill('').map((item, index) => 2014 + index),
    },
    {
      title: '学号',
      type: 'input',
      required: true,
      field: 'uCode',
    },
    {
      title: '专业',
      type: 'input',
      required: true,
      field: 'uMajor',
    },
    {
      title: '方向',
      type: 'select',
      required: true,
      field: 'techDirection',
      values: ['前端攻城狮', 'UI射击狮', 'android', 'ios', '3D建模', '产品经理', 'PMer'],
    },
    {
      title: '手机',
      type: 'input',
      required: true,
      field: 'phoneNum',
    },
    {
      title: 'QQ',
      type: 'input',
      required: true,
      field: 'qq',
    },
    {
      title: '微信',
      type: 'input',
      required: false,
      field: 'wechat',
    },
    {
      title: '身份证',
      type: 'input',
      required: false,
      field: 'idCard',
    },
  ],
  // 掌握技能
};
