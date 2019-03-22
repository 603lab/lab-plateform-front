import React from 'react';
import moment from 'moment';
import { Avatar } from 'antd';
import styles from './index.less';
import { replaceHtmlTag } from '../../utils/article';

const ArticleListContent = ({
  data: { content, createTime, avatar, createUserName, fileAddress },
}) => (
  <div className={styles.listContent}>
    <div className={styles.description}>{replaceHtmlTag(content)}</div>
    <div className={styles.extra}>
      <Avatar src={avatar} size="small" />
      <a>{createUserName}</a> 发布在 {fileAddress}
      <em>{moment(createTime).format('YYYY-MM-DD HH:mm')}</em>
    </div>
  </div>
);

export default ArticleListContent;
