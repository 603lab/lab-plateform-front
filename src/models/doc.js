import { getDocMenu } from '@/services/doc';
// import { message } from 'antd';

export default {
  namespace: 'doc',

  state: {
    menu: [],
  },

  effects: {
    *fetchMenu({ payload }, { call, put }) {
      const response = yield call(getDocMenu, payload);
      const { statusCode, data } = response; // eslint-disable-line
      // if (statusCode === 200) {
      yield put({
        type: 'setDocMenu',
        payload: [
          {
            childrenList: [
              {
                childrenList: [
                  {
                    childrenList: [],
                    id: 10026,
                    fileName: '项目',
                    level: 3,
                    parentCode: 10004,
                    isMenu: 1,
                    url: null,
                    fileAddress: null,
                    lastEditTime: '2019-01-14T16:37:11',
                    lastEditUserCode: 'admin',
                    lastEditUserName: 'admin',
                    createUserCode: 'admin',
                    createUserName: 'admin',
                    createTime: '2019-01-14T16:37:21',
                  },
                  {
                    childrenList: [],
                    id: 10027,
                    fileName: '学习文档',
                    level: 3,
                    parentCode: 10004,
                    isMenu: 1,
                    url: null,
                    fileAddress: null,
                    lastEditTime: '2019-01-14T16:37:11',
                    lastEditUserCode: 'admin',
                    lastEditUserName: 'admin',
                    createUserCode: 'admin',
                    createUserName: 'admin',
                    createTime: '2019-01-14T16:37:21',
                  },
                  {
                    childrenList: [],
                    id: 10028,
                    fileName: '个人总结',
                    level: 3,
                    parentCode: 10004,
                    isMenu: 1,
                    url: null,
                    fileAddress: null,
                    lastEditTime: '2019-01-14T16:37:11',
                    lastEditUserCode: 'admin',
                    lastEditUserName: 'admin',
                    createUserCode: 'admin',
                    createUserName: 'admin',
                    createTime: '2019-01-14T16:37:21',
                  },
                ],
                id: 10004,
                fileName: 'React',
                level: 2,
                parentCode: 10000,
                isMenu: 1,
                url: null,
                fileAddress: null,
                lastEditTime: '2019-01-14T16:27:41',
                lastEditUserCode: 'admin',
                lastEditUserName: 'admin',
                createUserCode: 'admin',
                createUserName: 'admin',
                createTime: '2019-01-14T16:27:49',
              },
              {
                childrenList: [],
                id: 10005,
                fileName: 'Vue',
                level: 2,
                parentCode: 10000,
                isMenu: 1,
                url: null,
                fileAddress: null,
                lastEditTime: '2019-01-14T16:27:41',
                lastEditUserCode: 'admin',
                lastEditUserName: 'admin',
                createUserCode: 'admin',
                createUserName: 'admin',
                createTime: '2019-01-14T16:27:49',
              },
              {
                childrenList: [],
                id: 10006,
                fileName: 'Node',
                level: 2,
                parentCode: 10000,
                isMenu: 1,
                url: null,
                fileAddress: null,
                lastEditTime: '2019-01-14T16:27:41',
                lastEditUserCode: 'admin',
                lastEditUserName: 'admin',
                createUserCode: 'admin',
                createUserName: 'admin',
                createTime: '2019-01-14T16:27:49',
              },
              {
                childrenList: [],
                id: 10007,
                fileName: 'ES6',
                level: 2,
                parentCode: 10000,
                isMenu: 1,
                url: null,
                fileAddress: null,
                lastEditTime: '2019-01-14T16:27:41',
                lastEditUserCode: 'admin',
                lastEditUserName: 'admin',
                createUserCode: 'admin',
                createUserName: 'admin',
                createTime: '2019-01-14T16:27:49',
              },
              {
                childrenList: [],
                id: 10008,
                fileName: 'JS',
                level: 2,
                parentCode: 10000,
                isMenu: 1,
                url: null,
                fileAddress: null,
                lastEditTime: '2019-01-14T16:27:41',
                lastEditUserCode: 'admin',
                lastEditUserName: 'admin',
                createUserCode: 'admin',
                createUserName: 'admin',
                createTime: '2019-01-14T16:27:49',
              },
              {
                childrenList: [],
                id: 10009,
                fileName: '其他',
                level: 2,
                parentCode: 10000,
                isMenu: 1,
                url: null,
                fileAddress: null,
                lastEditTime: '2019-01-14T16:27:41',
                lastEditUserCode: 'admin',
                lastEditUserName: 'admin',
                createUserCode: 'admin',
                createUserName: 'admin',
                createTime: '2019-01-14T16:27:49',
              },
              {
                childrenList: [],
                id: 10030,
                fileName: 'Angular',
                level: 2,
                parentCode: 10000,
                isMenu: 1,
                url: null,
                fileAddress: null,
                lastEditTime: '2019-03-16T11:40:48',
                lastEditUserCode: 'admin',
                lastEditUserName: 'admin',
                createUserCode: 'admin',
                createUserName: 'admin',
                createTime: '2019-03-16T11:40:56',
              },
            ],
            id: 10000,
            fileName: '前端',
            level: 1,
            parentCode: null,
            isMenu: 1,
            url: null,
            fileAddress: '',
            lastEditTime: '2019-01-14T16:22:20',
            lastEditUserCode: 'admin',
            lastEditUserName: 'admin',
            createUserCode: 'admin',
            createUserName: 'admin',
            createTime: '2019-01-14T16:22:27',
          },
          {
            childrenList: [
              {
                childrenList: [],
                id: 10011,
                fileName: '.Net',
                level: 2,
                parentCode: 10001,
                isMenu: 1,
                url: null,
                fileAddress: null,
                lastEditTime: '2019-01-14T16:27:41',
                lastEditUserCode: 'admin',
                lastEditUserName: 'admin',
                createUserCode: 'admin',
                createUserName: 'admin',
                createTime: '2019-01-14T16:27:49',
              },
              {
                childrenList: [],
                id: 10012,
                fileName: '.Net Core',
                level: 2,
                parentCode: 10001,
                isMenu: 1,
                url: null,
                fileAddress: null,
                lastEditTime: '2019-01-14T16:27:41',
                lastEditUserCode: 'admin',
                lastEditUserName: 'admin',
                createUserCode: 'admin',
                createUserName: 'admin',
                createTime: '2019-01-14T16:27:49',
              },
              {
                childrenList: [],
                id: 10013,
                fileName: 'Pthyon',
                level: 2,
                parentCode: 10001,
                isMenu: 1,
                url: null,
                fileAddress: null,
                lastEditTime: '2019-01-14T16:27:41',
                lastEditUserCode: 'admin',
                lastEditUserName: 'admin',
                createUserCode: 'admin',
                createUserName: 'admin',
                createTime: '2019-01-14T16:27:49',
              },
              {
                childrenList: [],
                id: 10014,
                fileName: 'PHP',
                level: 2,
                parentCode: 10001,
                isMenu: 1,
                url: null,
                fileAddress: null,
                lastEditTime: '2019-01-14T16:27:41',
                lastEditUserCode: 'admin',
                lastEditUserName: 'admin',
                createUserCode: 'admin',
                createUserName: 'admin',
                createTime: '2019-01-14T16:27:49',
              },
              {
                childrenList: [],
                id: 10015,
                fileName: 'C++',
                level: 2,
                parentCode: 10001,
                isMenu: 1,
                url: null,
                fileAddress: null,
                lastEditTime: '2019-01-14T16:27:41',
                lastEditUserCode: 'admin',
                lastEditUserName: 'admin',
                createUserCode: 'admin',
                createUserName: 'admin',
                createTime: '2019-01-14T16:27:49',
              },
              {
                childrenList: [],
                id: 10016,
                fileName: 'SQL',
                level: 2,
                parentCode: 10001,
                isMenu: 1,
                url: null,
                fileAddress: null,
                lastEditTime: '2019-01-14T16:27:41',
                lastEditUserCode: 'admin',
                lastEditUserName: 'admin',
                createUserCode: 'admin',
                createUserName: 'admin',
                createTime: '2019-01-14T16:27:49',
              },
            ],
            id: 10001,
            fileName: '后端',
            level: 1,
            parentCode: null,
            isMenu: 1,
            url: null,
            fileAddress: '',
            lastEditTime: '2019-01-14T16:22:20',
            lastEditUserCode: 'admin',
            lastEditUserName: 'admin',
            createUserCode: 'admin',
            createUserName: 'admin',
            createTime: '2019-01-14T16:22:27',
          },
          {
            childrenList: [],
            id: 10002,
            fileName: '产品',
            level: 1,
            parentCode: null,
            isMenu: 1,
            url: null,
            fileAddress: '',
            lastEditTime: '2019-01-14T16:22:20',
            lastEditUserCode: 'admin',
            lastEditUserName: 'admin',
            createUserCode: 'admin',
            createUserName: 'admin',
            createTime: '2019-01-14T16:22:27',
          },
          {
            childrenList: [
              {
                childrenList: [],
                id: 10029,
                fileName: 'PS',
                level: 2,
                parentCode: 10003,
                isMenu: 1,
                url: null,
                fileAddress: null,
                lastEditTime: '2019-03-16T11:40:21',
                lastEditUserCode: 'admin',
                lastEditUserName: 'admin',
                createUserCode: 'admin',
                createUserName: 'admin',
                createTime: '2019-03-16T11:40:30',
              },
            ],
            id: 10003,
            fileName: '美工',
            level: 1,
            parentCode: null,
            isMenu: 1,
            url: null,
            fileAddress: '',
            lastEditTime: '2019-01-14T16:22:20',
            lastEditUserCode: 'admin',
            lastEditUserName: 'admin',
            createUserCode: 'admin',
            createUserName: 'admin',
            createTime: '2019-01-14T16:22:27',
          },
          {
            childrenList: [
              {
                childrenList: [],
                id: 10010,
                fileName: 'Java',
                level: 2,
                parentCode: 10025,
                isMenu: 1,
                url: null,
                fileAddress: null,
                lastEditTime: '2019-01-14T16:27:41',
                lastEditUserCode: 'admin',
                lastEditUserName: 'admin',
                createUserCode: 'admin',
                createUserName: 'admin',
                createTime: '2019-01-14T16:27:49',
              },
            ],
            id: 10025,
            fileName: '移动端开发',
            level: 1,
            parentCode: null,
            isMenu: 1,
            url: null,
            fileAddress: null,
            lastEditTime: '2019-01-14T16:35:35',
            lastEditUserCode: 'admin',
            lastEditUserName: 'admin',
            createUserCode: 'admin',
            createUserName: 'admin',
            createTime: '2019-01-14T16:35:48',
          },
        ],
      });
      // } else {
      //   message.error(`获取百科菜单数据失败 ${response.message}`);
      // }
    },
  },

  reducers: {
    setDocMenu(state, action) {
      return {
        ...state,
        menu: action.payload,
      };
    },
  },
};
