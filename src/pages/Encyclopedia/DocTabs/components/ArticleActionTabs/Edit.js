/*
 * @Author: chenxiaobin
 * @Date: 2019-04-03 17:08:03
 * @Last Modified by: chenxiaobin
 * @Last Modified time: 2019-05-16 23:07:32
 * 新增/编辑文章
 */
import React, { PureComponent } from 'react';
import { Input, Button, message } from 'antd';
import { connect } from 'dva';
import ArticleTree from './components/ArticleTree';
import styles from './Edit.less';
import Store from '../../../docStore';
import RichEdit from '@/components/RichEditor/index';

@connect(({ doc, loading }) => ({
  doc,
  createLoading: loading.effects['doc/create'],
}))
class Edit extends PureComponent {
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

  handleCreate = () => {
    const { title, contentHtmlStr } = this.state;
    const { dispatch } = this.props;
    if (title === '') {
      message.error('请输入文章标题');
      return;
    }
    if (contentHtmlStr === '') {
      message.error('请输入文章内容');
      return;
    }
    dispatch({
      type: 'doc/create',
      payload: {
        parentId: '10000',
        fileAddress: '/前端',
        fileName: title,
        content: contentHtmlStr,
        type: 'doc',
        createUserCode: '150701206',
        createUserName: '陆仁杰',
        fileTagList: ['React', '生命周期'],
      },
    }).then(result => {
      if (result)
        setTimeout(() => {
          window.location.reload(true);
        }, 400);
    });
  };

  render() {
    const { createLoading } = this.props;
    return (
      <div className={styles.createWried}>
        <div className={styles.top}>
          <ArticleTree />
        </div>
        <Input
          allowClear
          placeholder="请输入文章标题..."
          className={styles.createTitle}
          onChange={this.handleTitleChange}
        />
        <RichEdit onChange={this.handleContentChange} />
        <div className={styles.createAction}>
          <Button type="primary" loading={createLoading} onClick={this.handleCreate}>
            新建文章
          </Button>
        </div>
      </div>
    );
  }
}
export default Edit;
