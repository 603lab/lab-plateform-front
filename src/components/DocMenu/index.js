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
    this.state = {
      menuData: [],
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'doc/fetchMenu',
      payload: {},
    });
  }

  static getDerivedStateFromProps(nextProps) {
    return {
      menuData: nextProps.doc.menu,
    };
  }

  render() {
    const { menuData } = this.state;
    const menuLevelOne = menuData.filter(item => item.level === 1);
    // console.log('menuLevelOne', menuLevelOne);
    const menuLevelDeep = menuData.filter(item => item.level > 1);
    // console.log('menuLevelDeep', menuLevelDeep);
    return (
      <Menu mode="inline" style={{ width: '100%', minHeight: 500 }}>
        {menuLevelOne.map(item => (
          <SubMenu key={item.id} title={item.fileName}>
            {menuLevelDeep
              .filter(_d => Number(_d.parentCode) === item.id)
              .map(deepItem => (
                <SubMenu key={deepItem.id} title={deepItem.fileName} />
              ))}
          </SubMenu>
        ))}
      </Menu>
    );
  }
}

export default Encyclopedia;
