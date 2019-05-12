/*
 * @Author: chenxiaobin
 * @Date: 2019-04-03 16:40:25
 * @Last Modified by: chenxiaobin
 * @Last Modified time: 2019-05-11 16:14:07
 * 维护百科模块需要的状态:
 *  - 新增文章状态
 *  - 编辑文章状态
 */

/**
 * 关于新开Tabs的逻辑
 * 新开Tabs有以下情况:
 * 1. 新增文章
 * 2. 打开文章详情
 * 均通过openTabs方式打开,而渲染Tabs也是通过getTabs方法获取所有的Tabs
 * tabsData
 */
class Store {
  constructor(store) {
    this.store = {
      ...store,
      /**
       *  TabsData枚举值
       * @param {key} 唯一ID
       * @param {canDelete} 是否可与删除
       * @param {title} 标题
       * @param {type} 类型 create:新建 detail:详情
       */
      tabsData: [
        {
          key: '1',
          canDelete: false,
          title: '最新文章',
        },
        {
          key: '2',
          canDelete: true,
          title: 'React',
          type: 'detail',
        },
      ],
    };
    this.instance = null;
  }

  static getInstance(store) {
    if (!this.instance) {
      this.instance = new Store(store);
    }
    return this.instance;
  }

  getTabsData = () => {
    const { tabsData } = this.store || {};
    return tabsData;
  };

  getCreateArticleInfo = () => {
    const { createArticleInfo } = this.store || {};
    return createArticleInfo;
  };

  getSideMenu = () => {
    const { sideMenu = [] } = this.store || {};
    return sideMenu;
  };

  setStore = payload => {
    this.store = {
      ...this.store,
      ...payload,
    };
  };
}

export default new Store({
  createArticleInfo: {
    tabsId: -1,
    isSaving: true,
  },
});
