// 代码中会兼容本地 service mock 以及部署站点的静态数据
export default {
  // 支持值为 Object 和 Array
  'GET /api/Base-Module/Users/GetUsersInfo': {
    isSuccess: true,
    count: 3,
    message: '返回成功',
    statusCode: 200,
    data: {
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
      teamId: 190101,
      teamName: '大前端组',
      likeNum: 0,
      isTeamAdmin: 1,
      id: 10001,
      username: 'xiaobi2019',
      password: 'admin',
      phoneNum: '15869199564',
      realName: '陈晓斌',
      nickName: 'xiaobi',
      wechat: '20120000111',
      qq: '2547310077',
      className: '广播电视工程2班',
      idCard: '444444114141411112222',
      techDirection: '前端攻城狮',
      scores: 5000,
      job: '在职',
      entranceYear: 2015,
      uMajor: '广播电视工程',
      uCode: '150701203',
      email: '2547310077@qq.com',
      isMale: 1,
      isAdmin: 1,
      lastLoginToken: null,
      lastLoginTime: null,
      createUserName: 'admin',
      createUserCode: 'admin',
      createTime: '2019-01-09T23:57:00',
      followNum: 2,
      followedNum: 0,
      tags: [
        {
          key: '0',
          label: '很有想法的',
        },
        {
          key: '1',
          label: '专注设计',
        },
        {
          key: '2',
          label: '辣~',
        },
        {
          key: '3',
          label: '大长腿',
        },
        {
          key: '4',
          label: '川妹子',
        },
        {
          key: '5',
          label: '海纳百川',
        },
      ],
      notifyCount: 12,
      unreadCount: 11,
      country: 'China',
      geographic: {
        province: {
          label: '浙江省',
          key: '330000',
        },
        city: {
          label: '杭州市',
          key: '330100',
        },
      },
      address: '西湖区工专路 77 号',
      phone: '0752-268888888',
    },
  },
  // GET POST 可省略
  'GET /api/users': [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ],
  'POST /api/login/account': (req, res) => {
    const { password, userName, type } = req.body;
    if (password === 'ant.design' && userName === 'admin') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'admin',
      });
      return;
    }
    if (password === 'ant.design' && userName === 'user') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'user',
      });
      return;
    }
    res.send({
      status: 'error',
      type,
      currentAuthority: 'guest',
    });
  },
  'POST /api/register': (req, res) => {
    res.send({ status: 'ok', currentAuthority: 'user' });
  },
  'GET /api/500': (req, res) => {
    res.status(500).send({
      timestamp: 1513932555104,
      status: 500,
      error: 'error',
      message: 'error',
      path: '/base/category/list',
    });
  },
  'GET /api/404': (req, res) => {
    res.status(404).send({
      timestamp: 1513932643431,
      status: 404,
      error: 'Not Found',
      message: 'No message available',
      path: '/base/category/list/2121212',
    });
  },
  'GET /api/403': (req, res) => {
    res.status(403).send({
      timestamp: 1513932555104,
      status: 403,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
  'GET /api/401': (req, res) => {
    res.status(401).send({
      timestamp: 1513932555104,
      status: 401,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },

  'GET /api/userSkills': (req, res) => {
    const { createUserCode = '' } = req.query;
    if (createUserCode === '150701203') {
      res.send([
        {
          id: 9,
          percent: 30,
          item: 'React',
          createUserCode: '150701203',
          createUserName: '陆仁杰',
          createTime: '0001-01-01T00:00:00',
        },
        {
          id: 10,
          percent: 30,
          item: '.NET',
          createUserCode: '150701203',
          createUserName: '陆仁杰',
          createTime: '0001-01-01T00:00:00',
        },
        {
          id: 11,
          percent: 40,
          item: 'Angular',
          createUserCode: '150701203',
          createUserName: '陆仁杰',
          createTime: '0001-01-01T00:00:00',
        },
      ]);
    }
  },
};
