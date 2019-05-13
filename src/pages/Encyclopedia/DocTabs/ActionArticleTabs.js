/*
 * @Author: chenxiaobin
 * @Date: 2019-03-14 21:20:43
 * @Last Modified by: chenxiaobin
 * @Last Modified time: 2019-05-11 13:47:41
 * 新建文章、文章详情...
 */

import React, { PureComponent } from 'react';
import styles from './ActionArticleTabs.less';
import Create from './components/ArticleActionTabs/Create';
import Detail from './components/ArticleActionTabs/Detail';

export default class ActionArticleTabs extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { tabsType, tabsData } = this.props;
    return (
      <div className={styles.OtherTabsContent}>
        {tabsType === 'create' ? <Create tabsData={tabsData} /> : <Detail tabsData={tabsData} />}
      </div>
    );
  }
}
