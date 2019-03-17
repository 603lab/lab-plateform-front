/*
 * @Author: chenxiaobin
 * @Date: 2019-03-14 21:20:43
 * @Last Modified by: chenxiaobin
 * @Last Modified time: 2019-03-15 09:54:52
 * 新建文章、文章详情...
 */

import React, { PureComponent } from 'react';
import styles from './OtherTabs.less';
import Create from './components/Create';
import Detail from './components/Detail';

export default class OtherTabs extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { tabType } = this.props;
    return (
      <div className={styles.OtherTabsContent}>
        {tabType === 'create' ? <Create /> : <Detail />}
      </div>
    );
  }
}
