import React from 'react';
import { List, Icon, Tag } from 'antd';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { likeAnimation } from '@/utils/animation';
import ArticleListContent from '@/components/ArticleListContent';
// import Store from '@/utils/store';
import styles from './Articles.less';

@connect(({ list }) => ({
  list,
}))
// 点赞情况存在浅比较,使用Component
class CenterArticle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      articleList: [],
    };
  }

  static getDerivedStateFromProps(props) {
    return {
      articleList: props.list.article,
    };
  }

  showAnimation = (isLike, index) => {
    /**
     * @arguments {0}  父级DOM
     * @arguments {1}  子级DOM
     * @arguments {2}  当前操作对象
     * @arguments {3}  动画类型 false 简约型(取消点赞) true 饱满型(点赞)
     */

    likeAnimation('like-wrapper', 'like-icon', index, isLike);
  };

  handleArticleAction = (info, index) => {
    const { dispatch } = this.props;
    const { id, isLike } = info;
    // const userInfo = Store.getBasicInfo();
    this.showAnimation(isLike, index);
    dispatch({
      type: 'list/like',
      payload: {
        itemId: id,
        isLike: isLike ? 0 : 1,
        type: 'Doc',
        createUserCode: '150701206',
        createUserName: '陆仁杰',
      },
    }).then(result => {
      const { articleList: newArticleList } = this.state;
      const { isLike: articleIsLike, likeNum } = newArticleList[index];
      // 如果点赞成功,则改变状态
      if (result) {
        newArticleList[index].isLike = !articleIsLike;
        newArticleList[index].likeNum = articleIsLike ? likeNum - 1 : likeNum + 1;
        this.setState({
          articleList: [...newArticleList],
        });
      }
    });
  };

  render() {
    const { articleList } = this.state;
    // const { article } = list;
    return (
      <List
        rowKey="id"
        size="large"
        itemLayout="vertical"
        className={styles.articleList}
        dataSource={articleList}
        pagination={{
          pageSize: 5,
        }}
        renderItem={(item, index) => (
          <List.Item
            key={item.id}
            actions={[
              <span>
                <Icon type="eye" style={{ marginRight: 8 }} />
                {item.browseNum}
              </span>,
              <span className="like-wrapper">
                <Icon
                  type="like-o"
                  className="like-icon"
                  onClick={() => this.handleArticleAction(item, index)}
                  style={{ color: item.isLike ? '#722ed1' : '', marginRight: 8 }}
                />
                {item.likeNum}
              </span>,
              <span>
                <Icon type="message" style={{ marginRight: 8 }} />
                {item.commentNum}
              </span>,
            ]}
          >
            <List.Item.Meta
              title={
                <Link
                  className={styles.listItemMetaTitle}
                  to={{
                    pathname: '/doc',
                    search: `?detail=${item.id}`,
                  }}
                >
                  {item.fileName || '暂无标题'}
                </Link>
              }
              description={
                <span>
                  {item.fileTagList.map(tagItem => (
                    <Tag key={tagItem}>{tagItem}</Tag>
                  ))}
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
