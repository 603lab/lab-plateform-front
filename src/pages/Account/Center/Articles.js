import React, { PureComponent } from 'react';
import { List, Icon, Tag } from 'antd';
import { connect } from 'dva';
import ArticleListContent from '@/components/ArticleListContent';
import styles from './Articles.less';

@connect(({ list }) => ({
  list,
}))
class CenterArticle extends PureComponent {
  render() {
    console.log('this.props', this.props);
    const { list } = this.props;
    const { article } = list;
    const IconText = ({ type, text }) => (
      <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
      </span>
    );
    return (
      <List
        rowKey="id"
        size="large"
        itemLayout="vertical"
        className={styles.articleList}
        dataSource={article}
        pagination={{
          pageSize: 5,
        }}
        renderItem={item => (
          <List.Item
            key={item.id}
            actions={[
              <IconText type="eye" text={item.browseNum} />,
              <IconText type="like-o" text={item.likeNum} />,
              <IconText type="message" text={item.commentNum} />,
            ]}
          >
            <List.Item.Meta
              title={
                <a className={styles.listItemMetaTitle} href={item.href || ''}>
                  {item.fileName || '-'}
                </a>
              }
              description={
                <span>
                  <Tag>Ant Design</Tag>
                  <Tag>设计语言</Tag>
                  <Tag>蚂蚁金服</Tag>
                </span>
              }
            />
            <ArticleListContent data={item} />
          </List.Item>
        )}
      />
    );
  }
}

export default CenterArticle;
