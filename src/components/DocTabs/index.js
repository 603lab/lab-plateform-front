/*
 * @Author: chenxiaobin
 * @Date: 2019-03-14 16:14:46
 * @Last Modified by: chenxiaobin
 * @Last Modified time: 2019-03-15 10:38:48
 * 最新文章无法删除、其他文章可删除
 */
import React, { PureComponent } from 'react';
import { Tabs, Icon } from 'antd';
import styles from './index.less';
import OtherTabs from './OtherTabs';
import NewArticleTabs from './NewArticleTabs';

const TabPane = Tabs.TabPane;
export default class DocTabsContent extends PureComponent {
  constructor(props) {
    super(props);
    this.newTabIndex = 0;
    const panes = [
      {
        key: '1',
        canDelete: false,
        title: '最新文章',
      },
      {
        key: '2',
        canDelete: true,
        title: '新建文章',
        type: 'create',
      },
      {
        key: '3',
        canDelete: true,
        title: 'React',
        type: 'detail',
      },
    ];
    this.state = {
      activeKey: panes[1].key,
      panes,
    };
  }

  onChange = activeKey => {
    this.setState({ activeKey });
  };

  onEdit = (targetKey, action) => {
    console.log('targetKey', targetKey);
    console.log('action', action);
    this[action](targetKey);
  };

  // add = () => {
  //   const { panes } = this.state;
  //   const tempPanes = [...panes];
  //   const activeKey = `newTab${(this.newTabIndex += 1)}`;
  //   tempPanes.push({ title: 'New Tab', content: 'New Tab Pane', key: activeKey });
  //   this.setState({ panes: tempPanes, activeKey });
  // };

  remove = targetKey => {
    const { panes, activeKey } = this.state;
    let lastIndex;
    let tempActiveKey = activeKey;
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
            <TabPane
              tab={
                <span className={styles.tabsTitle}>
                  {pane.title}
                  {pane.canDelete ? (
                    <Icon type="close" onClick={() => this.onEdit(pane.key, 'remove')} />
                  ) : (
                    ''
                  )}
                </span>
              }
              key={pane.key}
            >
              <div className={styles.docTabsPaneContent}>
                {pane.key === '1' ? <NewArticleTabs /> : <OtherTabs tabType={pane.type} />}
              </div>
            </TabPane>
          ))}
        </Tabs>
      </div>
    );
  }
}
