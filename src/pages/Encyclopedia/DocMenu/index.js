import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { withRouter } from 'dva/router';
import { Menu } from 'antd';
import styles from './index.less';

const SubMenu = Menu.SubMenu;

@connect(({ doc }) => ({
  doc,
}))
@withRouter
class Encyclopedia extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedKeys: ['1'],
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'doc/fetchMenu',
      payload: {},
    });
  }

  static getDerivedStateFromProps(props) {
    const { currentTabs, onSelect } = props;
    if (Object.keys(currentTabs).length) {
      const { key, title } = currentTabs;
      onSelect({ key, canDelete: true, title, type: 'detail' });
      return {
        selectedKeys: [key],
      };
    }
    return {};
  }

  resolveDeepMenu = deepMenu => {
    /**
     * 解决思路: 因为第一层是不可修改,所以需独立写在外层.该层返回的都是可配置项
     * 递归步骤:
     *  1. 找到当前级最深的一级,将其值加载到上一层父级
     *  2. 遍历完当前级后,再遍历上一级,以此类推
     *  3. 直到第一层map遍历结束
     */
    const result = [];
    deepMenu.forEach(item => {
      if (item.childrenList.length) {
        result.push(
          <SubMenu key={item.id} title={item.fileName}>
            {this.resolveDeepMenu(item.childrenList)}
          </SubMenu>
        );
      } else {
        result.push(<Menu.Item key={item.id}>{item.fileName}</Menu.Item>);
      }
    });
    return result;
  };

  // handleMenuClick = selectKey => {
  //   console.log('handleMenuClick', selectKey);
  // }

  handleMenuSelect = selected => {
    const {
      key,
      keyPath,
      item: {
        props: { children },
      },
    } = selected;
    const { getCurrentMenu } = this.props;
    /*
     * 由于右侧内容是通过tabs的数组渲染的，因此无法根据路由渲染
     * 通过props相互通信.Menu切换时影响Tabs切换,Tabs切换时影响Menu切换
     */
    this.setState({
      selectedKeys: keyPath,
    });
    const tabs = { key, canDelete: true, title: children, type: 'detail' };
    getCurrentMenu({ ...tabs });
    this.renderTabs({ ...tabs });
  };

  renderTabs = tabs => {
    /**
     *  @param {string} key 唯一id
     *  @param {boolean} canDelete 是否可以删除
     *  @param {string} title tabs标题
     *  @param {string} type tabs类型 detail create
     */
    const { onSelect } = this.props;
    onSelect({ ...tabs });
  };

  render() {
    const {
      doc: { menu: menuData = [] },
    } = this.props;
    const { selectedKeys } = this.state;
    return (
      <Menu
        mode="inline"
        inlineCollapsed={false}
        selectedKeys={selectedKeys}
        className={styles.menuWrapper}
        onSelect={this.handleMenuSelect}
        // onClick={this.handleMenuClick}
      >
        <Menu.Item key="1">首页</Menu.Item>
        {/* 第一层 */}
        {menuData.map(item => (
          <SubMenu key={item.id} title={item.fileName}>
            {this.resolveDeepMenu(item.childrenList)}
          </SubMenu>
        ))}
      </Menu>
    );
  }
}

export default Encyclopedia;
