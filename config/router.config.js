export default [
  // 登陆注册
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', component: './User/Login' },
      // { path: '/user/register', component: './User/Register' },
      // { path: '/user/register-result', component: './User/RegisterResult' },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    // component: '../layouts/BlankLayout',
    // Routes: ['src/pages/Authorized'],
    // authority: ['admin', 'user'],  // 是否有权限查看该组件
    routes: [
      // 首页
      { path: '/', redirect: '/home' },
      {
        path: '/home',
        name: 'home',
        icon: 'home',
        component: './Home/index',
      },
      // 百科
      {
        path: '/doc',
        name: 'doc',
        icon: 'inbox',
        component: './Encyclopedia/index',
        // routes: [
        //   {
        //     path: '/doc/create/:id',
        //     component: './Encyclopedia/DocTabs/components/Create',
        //   },
        // ]
      },
      // 项目
      {
        path: '/project',
        name: 'project',
        icon: 'project',
        component: './Project/index',
      },
      // 个人中心
      {
        name: 'account',
        icon: 'user',
        path: '/account/center',
        component: './Account/Center/Center',
        routes: [
          {
            path: '/account/center',
            redirect: '/account/center/articles',
          },
          {
            path: '/account/center/articles',
            component: './Account/Center/Articles',
          },
          {
            path: '/account/center/doc',
            component: './Account/Center/Encyclopedia',
          },
          {
            path: '/account/center/projects',
            component: './Account/Center/Projects',
          },
        ],
      },
      // 个人设置
      {
        hideInMenu: true,
        path: '/account/settings',
        name: 'account.settings',
        component: './Account/Settings/Info',
        routes: [
          {
            path: '/account/settings',
            redirect: '/account/settings/base',
          },
          {
            path: '/account/settings/base',
            component: './Account/Settings/BaseView',
          },
          {
            path: '/account/settings/security',
            component: './Account/Settings/SecurityView',
          },
          {
            path: '/account/settings/binding',
            component: './Account/Settings/BindingView',
          },
          {
            path: '/account/settings/notification',
            component: './Account/Settings/NotificationView',
          },
        ],
      },

      {
        component: '404',
      },
    ],
  },
];
