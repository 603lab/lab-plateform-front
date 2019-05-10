import React, { Component, Fragment } from 'react';
import { Form, Card, List, Tag, Icon, Input, Row, Col, Button } from 'antd';
import { connect } from 'dva';
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
    };
  }

  articleSearch = value => {
    const { dispatch } = this.props;
    dispatch({
      type: 'doc/search',
      payload: {
        authorName: value,
      },
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
    const { selectedTags } = this.state;
    const { form, list, loading = false, searchLoading } = this.props;
    const { getFieldDecorator } = form;
    const IconText = ({ type, text }) => (
      <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
      </span>
    );
    const loadMore =
      list.length > 0 ? (
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
            <StandardFormRow title="高级检索" grid>
              <Row gutter={16}>
                <Col xl={8} lg={10} md={12} sm={24} xs={24}>
                  <FormItem>
                    {getFieldDecorator('search', {})(
                      <Search
                        // size="small"
                        enterButton="搜索"
                        placeholder=" 请输入关键字"
                        style={{ width: 300 }}
                        suffix={searchLoading ? <Icon type="loading" /> : ''}
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
            loading={list.length === 0 ? loading : false}
            rowKey="id"
            itemLayout="vertical"
            loadMore={loadMore}
            dataSource={list}
            renderItem={item => (
              <List.Item
                key={item.id}
                actions={[
                  <IconText type="star-o" text={item.star} />,
                  <IconText type="like-o" text={item.like} />,
                  <IconText type="message" text={item.message} />,
                ]}
                extra={<div className={styles.listItemExtra} />}
              >
                <List.Item.Meta
                  title={
                    <a className={styles.listItemMetaTitle} href={item.href}>
                      {item.fileName}
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
        </Card>
      </Fragment>
    );
  }
}

export default SearchList;
