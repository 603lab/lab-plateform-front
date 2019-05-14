/*
 * @Author: chenxiaobin
 * @Date: 2019-03-14 16:14:09
 * @Last Modified by: chenxiaobin
 * @Last Modified time: 2019-05-14 14:48:39
 */
import React, { PureComponent } from 'react';
import ArticleList from './components/ArticleListTabs/Articles';
import styles from './LastestArticleTabs.less';

export default class ArticleTabs extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  handleOpenDetail = articleInfo => {
    const { onOpenDetail } = this.props;
    onOpenDetail({
      ...articleInfo,
    });
  };

  render() {
    return (
      <div className={styles.articleTabsWried}>
        {/* <ArticleFilter /> */}
        <div className={styles.ArticleTabsContent}>
          <ArticleList openDetail={this.handleOpenDetail} />
        </div>
      </div>
    );
  }
}
