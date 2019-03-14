import React, { PureComponent } from 'react';
import styles from './OtherTabs.less';

export default class OtherTabs extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className={styles.OtherTabsContent}>
        <span>OtherTabs</span>
      </div>
    );
  }
}
