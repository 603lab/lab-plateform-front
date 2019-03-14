/*
 * @Author: chenxiaobin
 * @Date: 2019-03-14 16:14:09
 * @Last Modified by:   chenxiaobin
 * @Last Modified time: 2019-03-14 16:14:09
 */
import React, { PureComponent } from 'react';
import ArticleFilter from './ArticleFilter';
import styles from './ArticleTabs.less';

export default class ArticleTabs extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className={styles.articleTabsWried}>
        <ArticleFilter />
        <div className={styles.ArticleTabsContent}>
          <span>ArticleTabs</span>
        </div>
      </div>
    );
  }
}
