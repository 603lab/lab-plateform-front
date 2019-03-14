/*
 * @Author: chenxiaobin
 * @Date: 2019-03-14 16:14:46
 * @Last Modified by:   chenxiaobin
 * @Last Modified time: 2019-03-14 16:14:46
 */
import React, { PureComponent } from 'react';
import { Tabs, Icon } from 'antd';
import styles from './index.less';
import OtherTabs from './OtherTabs';
import ArticleTabs from './ArticleTabs';

const TabPane = Tabs.TabPane;
export default class DocTabsContent extends PureComponent {
  constructor(props) {
    super(props);
    this.newTabIndex = 0;
    const panes = [
      {
        key: '1',
        title: '最新文章',
      },
      {
        title: (
          <span>
            最热文章
            <Icon type="close" style={{ fontSize: 12, marginLeft: 15 }} />
          </span>
        ),
        key: '2',
      },
    ];
    this.state = {
      activeKey: panes[0].key,
      panes,
    };
  }

  onChange = activeKey => {
    this.setState({ activeKey });
  };

  onEdit = (targetKey, action) => {
    this[action](targetKey);
  };

  add = () => {
    const { panes } = this.state;
    const tempPanes = [...panes];
    const activeKey = `newTab${(this.newTabIndex += 1)}`;
    tempPanes.push({ title: 'New Tab', content: 'New Tab Pane', key: activeKey });
    this.setState({ panes: tempPanes, activeKey });
  };

  remove = targetKey => {
    const { panes, activeKey } = this.state;
    let lastIndex;
    let tempActiveKey = [...activeKey];
    panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const tempPanes = panes.filter(pane => pane.key !== targetKey);
    if (panes.length && tempActiveKey === targetKey) {
      if (lastIndex >= 0) {
        tempActiveKey = panes[lastIndex].key;
      } else {
        tempActiveKey = panes[0].key;
      }
    }
    this.setState({ panes: tempPanes, activeKey: tempActiveKey });
  };

  render() {
    const { panes, activeKey } = this.state;
    return (
      <div className={styles.docTabs}>
        <Tabs
          activeKey={activeKey}
          // type="editable-card"
          // onEdit={this.onEdit}
          onChange={this.onChange}
        >
          {panes.map(pane => (
            <TabPane tab={pane.title} key={pane.key}>
              <div className={styles.docTabsPaneContent}>
                {pane.key === '1' ? <ArticleTabs /> : <OtherTabs />}
              </div>
            </TabPane>
          ))}
        </Tabs>
      </div>
    );
  }
}
