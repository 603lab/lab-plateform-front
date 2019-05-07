/*
 * @Author: chenxiaobin
 * @Date: 2019-03-14 16:14:09
 * @Last Modified by: chenxiaobin
 * @Last Modified time: 2019-04-04 17:13:36
 */
import React, { PureComponent } from 'react';
import ArticleList from './components/ArticleListTabs/Articles';
import styles from './LastestArticleTabs.less';

export default class ArticleTabs extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const articleList = [
      {
        id: 1,
        parentId: 10028,
        fileAddress: '/Annex/doc/',
        fileName: 'React总结（1）',
        fileTag: 'React;个人总结;前端',
        url: null,
        content:
          '<h1>H1:Test</h1><p>姓名:陈晓斌</p><p>领域:前端</p><p>技术</p><h1>H1:Test</h1><p>姓名:陈晓斌</p><p>领域:前端</p><p>技术</p><h1>H1:Test</h1><p>姓名:陈晓斌</p><p>领域:前端</p><p>技术</p><h1>H1:Test</h1><p>姓名:陈晓斌</p><p>领域:前端</p><p>技术</p><h1>H1:Test</h1><p>姓名:陈晓斌</p><p>领域:前端</p><p>技术</p><h1>H1:Test</h1><p>姓名:陈晓斌</p><p>领域:前端</p><p>技术</p><h1>H1:Test</h1><p>姓名:陈晓斌</p><p>领域:前端</p><p>技术</p><h1>H1:Test</h1><p>姓名:陈晓斌</p><p>领域:前端</p><p>技术</p><h1>H1:Test</h1><p>姓名:陈晓斌</p><p>领域:前端</p><p>技术</p>',
        likeNum: 1,
        collectNum: 0,
        browseNum: 3,
        commentNum: 0,
        type: 'doc',
        remark: '',
        createUserCode: '150701204',
        createUserName: '陈晓斌',
        createTime: '2019-01-14T17:46:28',
      },
      {
        id: 2,
        parentId: 10028,
        fileAddress: '/Annex/doc/',
        fileName: 'React总结 -（2）',
        fileTag: 'React;前端',
        url: null,
        content: '<h1>H1:Test2</h1><p>姓名:陈晓斌</p><p>领域:前端</p><p>技术栈:React</p>',
        likeNum: 1,
        collectNum: 0,
        browseNum: 3,
        commentNum: 0,
        type: 'doc',
        remark: '',
        createUserCode: '150701204',
        createUserName: '陈晓斌',
        createTime: '2019-01-14T17:46:28',
      },
    ];
    return (
      <div className={styles.articleTabsWried}>
        {/* <ArticleFilter /> */}
        <div className={styles.ArticleTabsContent}>
          <ArticleList list={articleList} />
        </div>
      </div>
    );
  }
}
