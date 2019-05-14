/*
 * @Author: chenxiaobin
 * @Date: 2019-03-14 16:14:46
 * @Last Modified by: chenxiaobin
 * @Last Modified time: 2019-05-14 14:50:02
 * 最新文章无法删除、其他文章可删除Tab
 * 且新增文章一次只能一篇,其状态管理可查看store.js
 */
import React, { PureComponent } from 'react';
import { Tabs, Icon, Button, Modal } from 'antd';
import findIndex from 'lodash/findIndex';
import Store from '../docStore';
import styles from './index.less';
import ActionArticleTabs from './ActionArticleTabs';
import LastestArticleTabs from './LastestArticleTabs';

const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;
export default class DocTabsContent extends PureComponent {
  constructor(props) {
    super(props);
    this.newTabIndex = 0;
    this.state = {
      activeKey: '1',
      panes: Store.getTabsData(),
    };
  }

  static getDerivedStateFromProps(props, prevState) {
    const { selectMenu } = props;
    const { panes } = prevState;
    // 保证点击了左侧Menu, 防止页面崩溃
    if (Object.keys(selectMenu).length) {
      // 如果点击的文章不存在Tabs,则新开一个Tabs.否则只需要把activeKey指向点击的文章id即可
      if (findIndex(panes, { key: selectMenu.key }) === -1) {
        const tempPanes = [...panes];
        tempPanes.push({ ...selectMenu });
        return {
          activeKey: selectMenu.key,
          panes: [...tempPanes],
        };
      }
      return {
        activeKey: selectMenu.key,
      };
    }
    return {
      ...prevState,
    };
  }

  handleCreateInfo = () => {
    // console.log('handleCreateInfo', data);
  };

  onChange = activeKey => {
    const { panes } = this.state;
    let currentTabs = {};
    panes.forEach(item => {
      if (item.key === activeKey) {
        currentTabs = item;
      }
    });
    this.changeTabs({ ...currentTabs });
    this.setState({ activeKey });
  };

  onEdit = (targetKey, action) => {
    this[action](targetKey);
  };

  handleOpenDetail = articleInfo => {
    const { panes } = this.state;
    const activeKey = articleInfo.id; // 防止activeKey重复
    panes.push({
      key: articleInfo.id,
      title: articleInfo.fileName,
      type: 'detail',
      canDelete: true,
    });
    this.setState({
      activeKey: String(activeKey),
      panes: [...panes],
    });
  };

  create = () => {
    const { panes } = this.state;
    const tempPanes = [...panes];
    const activeKey = `create${tempPanes.length + 100}`; // 防止activeKey重复
    tempPanes.push({
      key: activeKey,
      title: '新建文章',
      canDelete: true,
      type: 'create',
    });
    this.setState({ panes: tempPanes, activeKey });
    Store.setStore({
      tabsData: [...tempPanes],
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
          this.changeTabs({ ...panes[lastIndex] });
        } else {
          tempActiveKey = panes[0].key;
          this.changeTabs({ ...panes[0] });
        }
      }
      this.setState({ panes: tempPanes, activeKey: tempActiveKey });
      Store.setStore({
        tabsData: [...tempPanes],
      });
    };
    if (tabsId === targetKey && !isSaving) {
      confirm({
        title: '提示',
        content: '文章未保存,确认删除吗?',
        onOk() {
          deleteTabs();
        },
        onCancel() {
          // console.log('取消');
        },
      });
    } else {
      deleteTabs();
    }
  };

  changeTabs = data => {
    const { tabsChange } = this.props;
    tabsChange({
      ...data,
    });
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
            <Button type="primary" size="small" style={{ fontSize: 12 }} onClick={this.create}>
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
                  <LastestArticleTabs onOpenDetail={this.handleOpenDetail} />
                ) : (
                  <ActionArticleTabs tabsType={pane.type} tabsData={pane} />
                )}
              </div>
            </TabPane>
          ))}
        </Tabs>
      </div>
    );
  }
}
