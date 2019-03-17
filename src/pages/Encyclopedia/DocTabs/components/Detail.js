import React, { PureComponent } from 'react';
import ArticleTree from './ArticleTree';
import styles from './Detail.less';

export default class Detail extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className={styles.detailWrapper}>
        <div className={styles.top}>
          <ArticleTree />
        </div>
      </div>
    );
  }
}
