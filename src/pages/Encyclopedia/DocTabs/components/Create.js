import React, { PureComponent } from 'react';
import { Input } from 'antd';
import ArticleTree from './ArticleTree';
import styles from './Create.less';
import RichEdit from '@/components/RichEditor/index';

export default class Create extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className={styles.createWried}>
        <ArticleTree />
        <Input allowClear className={styles.createTitle} placeholder="请输入文章标题..." />
        <RichEdit />
      </div>
    );
  }
}
