import React, { PureComponent } from 'react';
import styles from './Home.less';

export default class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={styles.toolsHomeWrapper}>
        <h1 className={styles.title}>工具模块方便成员日常设计</h1>
        <div>
          <h2>流程图示例图</h2>
          <img src="http://129.204.109.115:8022/603-2.png" alt="" />
        </div>
        <div>
          <h2>脑图示例图</h2>
          <img src="http://129.204.109.115:8022/603-1.png" alt="" />
        </div>
      </div>
    );
  }
}
