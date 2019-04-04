/*
 * @Author: chenxiaobin
 * @Date: 2019-04-03 16:40:25
 * @Last Modified by: chenxiaobin
 * @Last Modified time: 2019-04-04 10:36:06
 * 维护百科模块需要的状态:
 *  - 新增文章状态
 *  - 编辑文章状态
 */

class Store {
  constructor(store) {
    this.store = {
      ...store,
    };
    this.instance = null;
  }

  static getInstance(store) {
    if (!this.instance) {
      this.instance = new Store(store);
    }
    return this.instance;
  }

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
