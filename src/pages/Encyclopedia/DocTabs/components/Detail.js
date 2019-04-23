import React, { PureComponent } from 'react';
import { Icon, Tag } from 'antd';
import ArticleTree from './ArticleTree';
import styles from './Detail.less';
import Color from '../../../../utils/colors';

export default class Detail extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      title: 'PureComponent',
      content: '<h1>h1</h1><p><strong>strong</strong></p><p>p</p><p></p>',
    };
  }

  handleShare = () => {};

  render() {
    const { title, content } = this.state;
    return (
      <div className={styles.detailWrapper}>
        <div className={styles.top}>
          <ArticleTree />
          <div className={styles.topAction}>
            <div className={styles.topActionList}>
              <Icon type="star" />
              &nbsp;
              <span>收藏</span>
            </div>
            <div className={styles.topActionList}>
              <Icon type="edit" />
              &nbsp;
              <span>编辑</span>
            </div>
            <div className={styles.topActionList}>
              <Icon type="share" />
              &nbsp;
              <span onClick={this.handleShare}>分享</span>
            </div>
          </div>
        </div>
        <div className={styles.content}>
          {/* 文章标题 */}
          <h1>
            {title}
            <div className={styles.titleTag}>
              {['React', 'Node', 'ES6'].map((item, index) => (
                <Tag key={item} color={Color.category12[index]}>
                  {item}
                </Tag>
              ))}
            </div>
          </h1>
          <div className={styles.autorInfo}>
            由<span className={styles.autorInfo__name}>xiaobe</span>创建于
            {new Date().toDateString()}
          </div>
          <div className={styles.articleInfo}>
            <span className={styles.articleInfo__readNum}>阅读：1999</span>
            <span className={styles.articleInfo__collectNum}>收藏：10</span>
          </div>
          <div className={styles.articleContent}>
            {/* 文章内容 */}
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        </div>
      </div>
    );
  }
}
