import React, { Component, Fragment } from 'react';
import { Form, Card, List, Tag, Icon, Input, Row, Col, Button } from 'antd';
import { connect } from 'dva';
import { likeAnimation } from '@/utils/animation';
import StandardFormRow from '@/components/StandardFormRow';
import ArticleListContent from '@/components/ArticleListContent';
import styles from './Articles.less';

const FormItem = Form.Item;
const CheckableTag = Tag.CheckableTag;
const Search = Input.Search;
const tagsFromServer = [
  {
    id: 'all',
    title: '全部',
  },
  {
    id: 'react',
    title: 'React',
  },
  {
    id: 'vue',
    title: 'Vue',
  },
  {
    id: 'node',
    title: 'Node',
  },
  {
    id: 'es6',
    title: 'ES6',
  },
];
@connect(({ loading, doc }) => ({
  doc,
  searchLoading: loading.effects['doc/search'],
}))
@Form.create()
class SearchList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTags: ['all'],
      articleList: [],
    };
  }

  componentDidMount() {
    this.hanleArticleSearch();
  }

  articleSearch = value => {
    this.hanleArticleSearch(value);
  };

  hanleArticleSearch = value => {
    const { dispatch } = this.props;
    dispatch({
      type: 'doc/search',
      payload: {
        authorName: value,
        pageSize: 20,
        currentPage: 1,
      },
    }).then(articleList =>
      this.setState({
        articleList,
      })
    );
  };

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
      const { doc } = this.props;
      const { homeArticleList: newArticleList } = doc;
      console.log('newArticleList', newArticleList);
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

  handleChange(tag, checked) {
    const { selectedTags } = this.state;
    const nextSelectedTags = checked
      ? [...selectedTags, tag.id]
      : selectedTags.filter(t => t !== tag.id);
    this.setState({ selectedTags: nextSelectedTags });
  }

  render() {
    const { selectedTags, articleList } = this.state;
    const { form, loading = false, openDetail, searchLoading } = this.props;
    // const { homeArticleList } = doc;
    const { fileTag = [] } = articleList;
    const { getFieldDecorator } = form;
    const IconText = ({ type, text }) => (
      <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
      </span>
    );
    const loadMore =
      articleList.length > 0 ? (
        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <Button onClick={this.fetchMore} style={{ paddingLeft: 48, paddingRight: 48 }}>
            {loading ? (
              <span>
                <Icon type="loading" /> 加载中...
              </span>
            ) : (
              '加载更多'
            )}
          </Button>
        </div>
      ) : null;
    return (
      <Fragment>
        <Card bordered={false} bodyStyle={{ padding: '15px 15px 0' }}>
          <Form layout="inline">
            <StandardFormRow title="文章标签" grid>
              <Row>
                <Col lg={16} md={24} sm={24} xs={24}>
                  <FormItem>
                    {getFieldDecorator('articleTags', {
                      initialValue: selectedTags || ['all'],
                    })(
                      <>
                        {tagsFromServer.map(tag => (
                          <CheckableTag
                            key={tag.id}
                            checked={selectedTags.indexOf(tag.id) > -1}
                            onChange={checked => this.handleChange(tag, checked)}
                          >
                            {tag.title}
                          </CheckableTag>
                        ))}
                      </>
                    )}
                  </FormItem>
                </Col>
              </Row>
            </StandardFormRow>
            <StandardFormRow title="作者" grid>
              <Row gutter={16}>
                <Col xl={8} lg={10} md={12} sm={24} xs={24}>
                  <FormItem>
                    {getFieldDecorator('search', {})(
                      <Search
                        // size="small"
                        enterButton="搜索"
                        placeholder=" 请输入关键字"
                        style={{ width: 300 }}
                        // suffix={searchLoading ? <Icon type="loading" /> : ''}
                        onSearch={value => this.articleSearch(value)}
                      />
                    )}
                  </FormItem>
                </Col>
              </Row>
            </StandardFormRow>
          </Form>
        </Card>
        <Card bordered={false} bodyStyle={{ padding: '0 15px 15px' }}>
          <List
            size="large"
            loading={searchLoading}
            rowKey="id"
            itemLayout="vertical"
            loadMore={loadMore}
            dataSource={articleList}
            renderItem={(item, index) => (
              <List.Item
                key={item.id}
                actions={[
                  <span>
                    <IconText type="eye" text={item.star} />
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
                      onClick={() => openDetail({ ...item })}
                    >
                      {item.fileName}
                    </span>
                  }
                  description={
                    <span>
                      {fileTag.map(tagItem => (
                        <Tag key={tagItem}>{tagItem}</Tag>
                      ))}
                    </span>
                  }
                />
                <ArticleListContent data={item} />
              </List.Item>
            )}
          />
        </Card>
      </Fragment>
    );
  }
}

export default SearchList;
