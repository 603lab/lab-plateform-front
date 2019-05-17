/*
 * @Author: chenxiaobin
 * @Date: 2019-03-14 21:20:43
 * @Last Modified by: chenxiaobin
 * @Last Modified time: 2019-05-17 15:10:04
 * 新建文章、文章详情...
 */

import React, { PureComponent } from 'react';
import { withRouter } from 'dva/router';
import styles from './ActionArticleTabs.less';
import Edit from './components/ArticleActionTabs/Edit';
import Detail from './components/ArticleActionTabs/Detail';
import Folder from './components/ArticleActionTabs/Folder';

@withRouter
class ActionArticleTabs extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  renderTabs = query => {
    let result = '';
    const key = Object.keys(query)[0];
    const { tabsData } = this.props;
    switch (key) {
      case 'folder':
        result = <Folder tabsData={tabsData} />;
        break;
      case 'edit':
        result = <Edit tabsData={tabsData} />;
        break;
      case 'detail':
        result = <Detail tabsData={tabsData} />;
        break;
      default:
        break;
    }
    return result;
  };

  render() {
    // const { tabsType, tabsData } = this.props;
    // 根据路由参数渲染组件 ENUM:['edit': [0, 1], 'detail', 'folder'];
    const {
      location: { query },
    } = this.props;
    return (
      <div className={styles.OtherTabsContent}>
        {this.renderTabs(query)}
        {/* {tabsType === 'create' ? <Create tabsData={tabsData} /> : <Detail tabsData={tabsData} />} */}
      </div>
    );
  }
}
export default ActionArticleTabs;
