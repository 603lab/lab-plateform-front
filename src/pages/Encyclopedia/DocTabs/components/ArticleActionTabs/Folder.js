import React from 'react';
import { Card, List, Icon } from 'antd';
import { connect } from 'dva';
import ArticleListContent from '@/components/ArticleListContent';
import styles from './Folder.less';

@connect(({ loading, doc }) => ({
  doc,
  searchLoading: loading.effects['doc/search'],
}))
class Folder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'doc/search',
      payload: {
        authorName: '',
        pageSize: 20,
        currentPage: 1,
        createUserCode: '150701206',
      },
    });
  }

  render() {
    const { doc, searchLoading } = this.props;
    const { homeArticleList } = doc;

    const IconText = ({ type, text }) => (
      <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
      </span>
    );
    return (
      <div className={styles.folderWrapper}>
        <div className={styles.ArticleTabsContent}>
          <Card bordered={false} bodyStyle={{ padding: '0 15px 15px' }}>
            <List
              size="large"
              loading={searchLoading}
              rowKey="id"
              itemLayout="vertical"
              // loadMore={loadMore}
              dataSource={homeArticleList}
              renderItem={item => (
                <List.Item
                  key={item.id}
                  actions={[
                    <span>
                      <IconText type="eye" text={item.star} />
                      {item.browseNum}
                    </span>,
                    <span>
                      <IconText type="like-o" text={item.like} />
                      {item.likeNum}
                    </span>,
                    <span>
                      <IconText type="message" text={item.message} />
                      {item.collectNum}
                    </span>,
                  ]}
                  extra={<div className={styles.listItemExtra} />}
                >
                  <List.Item.Meta
                    title={
                      <span
                        style={{ cursor: 'pointer' }}
                        className={styles.listItemMetaTitle}
                        // onClick={() => openDetail({ ...item })}
                      >
                        {item.fileName}
                      </span>
                    }
                    description={
                      <span>
                        123
                        {/* {fileTag.map(tagItem => (
                          <Tag key={tagItem}>{tagItem}</Tag>
                        ))} */}
                      </span>
                    }
                  />
                  <ArticleListContent data={item} />
                </List.Item>
              )}
            />
          </Card>
        </div>
      </div>
    );
  }
}
export default Folder;
