import React, { PureComponent } from 'react';
import { Menu } from 'antd';
import { withRouter } from 'dva/router';
import styles from './index.less';

const SubMenu = Menu.SubMenu;

@withRouter
class ToolsMenu extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedKeys: ['home'],
    };
  }

  handleMenuSelect = selected => {
    const { key, keyPath } = selected;
    const { match, history } = this.props;
    if (key === 'home') {
      history.push(`/editor`);
    } else {
      history.push(`${match.url}editor/${key}`);
    }
    this.setState({
      selectedKeys: keyPath,
    });
  };

  render() {
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
        <Menu.Item key="home">首页</Menu.Item>
        <SubMenu key="editor" title="编辑器">
          <Menu.Item key="flow">流程编辑器</Menu.Item>
          <Menu.Item key="mind">脑图编辑器</Menu.Item>
          <Menu.Item key="koni">拓扑编辑器</Menu.Item>
        </SubMenu>
      </Menu>
    );
  }
}
export default ToolsMenu;
