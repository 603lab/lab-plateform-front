/*
 * @Author: chenxiaobin
 * @Date: 2019-04-03 17:08:03
 * @Last Modified by: chenxiaobin
 * @Last Modified time: 2019-05-09 23:21:42
 * 新增/编辑文章
 */
import React, { PureComponent } from 'react';
import { Input } from 'antd';
import ArticleTree from './ArticleTree';
import styles from './Create.less';
import Store from '../../../docStore';
import RichEdit from '@/components/RichEditor/index';

export default class Create extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      contentHtmlStr: '',
    };
  }

  handleTitleChange = e => {
    const { title } = this.state;
    this.setState({
      title: e.target.value,
    });
    this.changeStoreArticleState(title === e.target.value);
    // 自动存储
    // setTimeout(() => {}, 3000);
  };

  handleContentChange = newContentHtmlStr => {
    const { contentHtmlStr } = this.state;
    this.changeStoreArticleState(contentHtmlStr === newContentHtmlStr);
    this.setState({
      contentHtmlStr: newContentHtmlStr,
    });
  };

  changeStoreArticleState = state => {
    Store.setStore({
      createArticle: {
        ...Store.getCreateArticleInfo(),
        isSaving: state,
      },
    });
  };

  render() {
    return (
      <div className={styles.createWried}>
        <div className={styles.top}>
          <ArticleTree />
        </div>
        <Input
          allowClear
          placeholder="请输入文章标题..."
          className={styles.createTitle}
          onChange={() => this.handleTitleChange}
        />
        <RichEdit onChange={() => this.handleContentChange} />
      </div>
    );
  }
}
