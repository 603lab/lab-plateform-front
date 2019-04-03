/*
 * @Author: chenxiaobin
 * @Date: 2019-03-29 14:46:58
 * @Last Modified by: chenxiaobin
 * @Last Modified time: 2019-03-29 15:09:18
 * 用于存储用户全局信息的redux 仓库
 */

export class Store {
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

  setStore = payload => {
    this.store = {
      ...this.store,
      ...payload,
    };
  };

  getBasicInfo = () => {
    const { basicInfo = '' } = this.store || {};
    return basicInfo;
  };
}

export default new Store({});