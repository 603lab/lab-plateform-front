import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Menu } from 'antd';

const SubMenu = Menu.SubMenu;

@connect(({ doc }) => ({
  doc,
}))
class Encyclopedia extends PureComponent {
  constructor(propas) {
    super(propas);
    this.state = {};
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'doc/fetchMenu',
      payload: {},
    });
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

  handleMenuSelect = () => {};

  render() {
    const {
      doc: { menu: menuData = [] },
    } = this.props;
    return (
      <Menu
        mode="inline"
        style={{ width: '100%', minHeight: 500 }}
        onSelect={this.handleMenuSelect}
      >
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
