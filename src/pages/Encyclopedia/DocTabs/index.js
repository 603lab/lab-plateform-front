/*
 * @Author: chenxiaobin
 * @Date: 2019-03-14 16:14:46
 * @Last Modified by: chenxiaobin
 * @Last Modified time: 2019-04-04 16:30:56
 * 最新文章无法删除、其他文章可删除Tab
 * 且新增文章一次只能一篇,其状态管理可查看store.js
 */
import React, { PureComponent } from 'react';
import { Tabs, Icon, Button, Modal } from 'antd';
import Store from '../store';
import styles from './index.less';
import ActionArticleTabs from './ActionArticleTabs';
import LastestArticleTabs from './LastestArticleTabs';

const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;
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
      // {
      //   key: '2',
      //   canDelete: true,
      //   title: '新建文章',
      //   type: 'create',
      // },
      {
        key: '3',
        canDelete: true,
        title: 'React',
        type: 'detail',
      },
    ];
    this.state = {
      activeKey: panes[0].key,
      panes,
    };
  }

  handleCreateInfo = () => {
    // console.log('handleCreateInfo', data);
  };

  onChange = activeKey => {
    this.setState({ activeKey });
  };

  onEdit = (targetKey, action) => {
    this[action](targetKey);
  };

  add = () => {
    const { panes } = this.state;
    const tempPanes = [...panes];
    const activeKey = `${tempPanes.length + 100}`; // 防止activeKey重复
    tempPanes.push({
      key: activeKey,
      title: '新建文章',
      canDelete: true,
      type: 'create',
    });
    this.setState({ panes: tempPanes, activeKey });
    Store.setStore({
      createArticleInfo: {
        tabsId: activeKey,
        isSaving: true,
      },
    });
  };

  remove = targetKey => {
    const { panes, activeKey } = this.state;
    const { tabsId, isSaving } = Store.getCreateArticleInfo();
    let lastIndex;
    let tempActiveKey = activeKey;
    const deleteTabs = () => {
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
    if (tabsId === targetKey && !isSaving) {
      confirm({
        title: '提示',
        content: '文章未保存,确认删除吗?',
        onOk() {
          deleteTabs();
        },
        onCancel() {
          console.log('取消');
        },
      });
    } else {
      deleteTabs();
    }
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
          tabBarExtraContent={
            <Button type="primary" size="small" style={{ fontSize: 12 }} onClick={this.add}>
              新增文章
            </Button>
          }
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
                {pane.key === '1' ? (
                  <LastestArticleTabs />
                ) : (
                  <ActionArticleTabs tabType={pane.type} />
                )}
              </div>
            </TabPane>
          ))}
        </Tabs>
      </div>
    );
  }
}
