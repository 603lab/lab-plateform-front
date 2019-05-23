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
      values: new Array(10).fill('').map((item, index) => 2010 + index),
    },
    // {
    //   title: '学号',
    //   type: 'input',
    //   required: true,
    //   field: 'uCode',
    // },
    {
      title: '专业',
      type: 'input',
      required: true,
      field: 'uMajor',
    },
    {
      title: '方向',
      type: 'cascader',
      required: true,
      field: 'techList',
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

  // 专业方向 级联选项数据
  directionOptions: [
    {
      value: 'developMonkey',
      label: '开发',
      children: [
        {
          value: 'frontEnd',
          label: '前端',
          children: [
            {
              label: 'React',
              value: 'react',
            },
            {
              label: '小程序',
              value: 'miniProgram',
            },
            {
              label: 'Vue',
              value: 'vue',
            },
          ],
        },
        {
          value: 'backEnd',
          label: '后端',
          children: [
            {
              label: 'Java',
              value: 'java',
            },
            {
              label: 'C#',
              value: 'C#',
            },
            {
              label: '大数据',
              value: 'bigData',
            },
          ],
        },
        {
          value: 'mobileTerminal',
          label: '移动端',
          children: [
            {
              label: 'IOS',
              value: 'ios',
            },
            {
              label: '安卓',
              value: 'android',
            },
          ],
        },
      ],
    },
    {
      label: '设计',
      value: 'designerDog',
      children: [
        {
          label: '美工',
          value: 'photoShop',
        },
        {
          label: '建模',
          value: '3DMax',
        },
        {
          label: '视频',
          value: 'afterEffect',
        },
      ],
    },
    {
      label: '产品',
      value: 'project',
      children: [
        {
          label: '产品经理',
          value: 'PM',
        },
        {
          label: '项目负责人',
          value: 'PL',
        },
      ],
    },
  ],
  // 专业方向 一级数据: 用于后端传输字段和前端展示字段互相转换及随机获取其中一个
  directionOptionsTile: {
    developMonkey: '开发',
    frontEnd: '前端',
    react: 'React',
    miniProgram: '小程序',
    vue: 'Vue',
    backEnd: '后端',
    java: 'Java',
    'C#': 'C#',
    bigData: '大数据',
    mobileTerminal: '移动端',
    ios: 'IOS',
    android: '安卓',
    designerDog: '设计',
    photoShop: '美工',
    '3DMax': '建模',
    afterEffect: '视频后期',
    project: '产品',
    PM: '产品经理',
    PL: '项目负责人',
  },
};
