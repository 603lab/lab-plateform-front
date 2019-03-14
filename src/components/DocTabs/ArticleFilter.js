/*
 * @Author: chenxiaobin
 * @Date: 2019-03-14 16:14:27
 * @Last Modified by:   chenxiaobin
 * @Last Modified time: 2019-03-14 16:14:27
 */
import React, { PureComponent } from 'react';
import { Row, Col, Tag, Input } from 'antd';
import styles from './ArticleFilter.less';

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

export default class IndexFilter extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selectedTags: ['all'],
    };
  }

  handleChange(tag, checked) {
    const { selectedTags } = this.state;
    const nextSelectedTags = checked
      ? [...selectedTags, tag.id]
      : selectedTags.filter(t => t !== tag.id);
    this.setState({ selectedTags: nextSelectedTags });
  }

  render() {
    const { selectedTags } = this.state;
    return (
      <div className={styles.indexFilterWried}>
        <Row>
          <Col span={2}>热门标签:</Col>
          <Col span={22}>
            {tagsFromServer.map(tag => (
              <CheckableTag
                key={tag.id}
                checked={selectedTags.indexOf(tag.id) > -1}
                onChange={checked => this.handleChange(tag, checked)}
              >
                {tag.title}
              </CheckableTag>
            ))}
          </Col>
        </Row>
        <div className={styles.filterDivider} />
        <Row>
          <Col span={2}>高级检索:</Col>
          <Col span={22}>
            <Search
              // size="small"
              style={{ width: 300 }}
              enterButton="搜索"
              placeholder=" 请输入关键字"
              onSearch={value => console.log(value)}
            />
          </Col>
        </Row>
      </div>
    );
  }
}
