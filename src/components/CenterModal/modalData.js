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
          label: '',
        },
        {
          label: '项目负责人',
          value: 'PM',
        },
      ],
    },
  ],
};
