/*
 * @Author: chenxiaobin
 * @Date: 2019-03-14 16:14:46
 * @Last Modified by: chenxiaobin
 * @Last Modified time: 2019-05-17 14:49:51
 * 最新文章无法删除、其他文章可删除Tab
 * 且新增文章一次只能一篇,其状态管理可查看store.js
 */
import React, { PureComponent } from 'react';
import { Tabs, Icon, Button, Modal, message } from 'antd';
import { withRouter } from 'dva/router';
import findIndex from 'lodash/findIndex';
import Store from '../docStore';
import styles from './index.less';
import ActionArticleTabs from './ActionArticleTabs';
import LastestArticleTabs from './LastestArticleTabs';

const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;

@withRouter
class DocTabsContent extends PureComponent {
  constructor(props) {
    super(props);
    this.newTabIndex = 0;
    this.state = {
      activeKey: '-1',
      panes: Store.getTabsData(),
    };
  }

  static getDerivedStateFromProps(props, prevState) {
    const { selectMenu } = props;
    const { panes } = prevState;
    // 保证点击了左侧Menu, 防止页面崩溃
    // const { query } = location;
    // const type = Object.keys(query);
    // if (!type.length) {
    //   return {
    //     activeKey: '0',
    //   };
    // }
    // if (findIndex(panes, { key: query[type], type }) === -1) {
    //   const tempPanes = [...panes];
    //   tempPanes.push({
    //     key: query[type],
    //     canDelete: true,
    //     title: '???',
    //     type,
    //   });
    //   return {
    //     activeKey: query[type],
    //     panes: [...tempPanes],
    //   };
    // }
    // return {
    //   activeKey: query[type],
    // };
    if (Object.keys(selectMenu).length) {
      // 如果点击的文章不存在Tabs,则新开一个Tabs.否则只需要把activeKey指向点击的文章id即可
      if (findIndex(panes, { key: selectMenu.key }) === -1) {
        const tempPanes = [...panes];
        tempPanes.push({ ...selectMenu });
        return {
          activeKey: selectMenu.key.toString(),
          panes: [...tempPanes],
        };
      }
      return {
        activeKey: selectMenu.key.toString(),
      };
    }
    return {
      ...prevState,
    };
  }

  handleCreateInfo = () => {
    // console.log('handleCreateInfo', data);
  };

  onChangeTabs = activeKey => {
    const { panes } = this.state;
    const { history } = this.props;
    let currentTabs = {};
    panes.forEach(item => {
      if (item.key === activeKey) {
        currentTabs = item;
        if (Object.keys(item).includes('type')) {
          history.push({
            query: {
              [item.type]: activeKey.toString(),
            },
          });
        } else {
          history.push({
            query: {},
          });
        }
      }
    });
    this.changeTabs({ ...currentTabs });
    this.setState({ activeKey });
  };

  handleOpenDetail = articleInfo => {
    const { history } = this.props;
    const { panes } = this.state;
    const activeKey = articleInfo.id.toString(); // 防止activeKey重复
    history.push({
      query: {
        detail: activeKey,
      },
    });
    panes.push({
      key: activeKey,
      title: articleInfo.fileName,
      type: 'detail',
      canDelete: true,
    });
    this.setState({
      activeKey,
      panes: [...panes],
    });
  };

  create = () => {
    const { panes } = this.state;
    if (findIndex(panes, { key: '0', type: 'edit' }) !== -1) {
      message.error('已存在新建文章Tab');
      return;
    }
    const tempPanes = [...panes];
    const { history } = this.props;
    // 仅允许新建一篇文章 edit/0
    tempPanes.push({
      key: '0',
      title: '新建文章',
      canDelete: true,
      type: 'edit',
    });
    history.push({
      query: {
        edit: '0',
      },
    });
    this.setState({ panes: tempPanes, activeKey: '0' });
    Store.setStore({
      tabsData: [...tempPanes],
    });
  };

  remove = targetKey => {
    const { panes, activeKey } = this.state;
    const { history } = this.props;
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
        const currentTab = panes[lastIndex];
        // 最后一个Tab不允许删除 所以可以省略判断
        // if (lastIndex >= 0) {
        tempActiveKey = currentTab.key;
        this.changeTabs({ ...currentTab });
        // }
        //  else {
        //   tempActiveKey = panes[0].key;
        //   this.changeTabs({ ...panes[0] });
        // }
        if (Object.keys(currentTab).includes('type')) {
          history.push({
            query: {
              [currentTab.type]: activeKey,
            },
          });
        } else {
          history.push({
            query: {},
          });
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
          onChange={this.onChangeTabs}
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
                    <Icon type="close" onClick={() => this.remove(pane.key)} />
                  ) : (
                    ''
                  )}
                </span>
              }
              key={pane.key}
            >
              <div className={styles.docTabsPaneContent}>
                {pane.key === '-1' ? (
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
export default DocTabsContent;
