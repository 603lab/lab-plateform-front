/*
 * @Author: chenxiaobin
 * @Date: 2019-04-02 11:27:23
 * @Last Modified by: chenxiaobin
 * @Last Modified time: 2019-04-27 15:41:54
 * 修改/新增文章分支Modal组件
 */
import React, { PureComponent } from 'react';
import { Modal, Layout, Menu } from 'antd';
import ChooseTree from './Form/ChooseTree';
import CreateTree from './Form/CreateTree';
import styles from './index.less';

const { Sider, Content } = Layout;

export default class ArticleTreeModal extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selectedKeys: ['choose'],
      visiable: props.visiable,
    };
  }

  static getDerivedStateFromProps(nextProps) {
    return {
      visiable: nextProps.visiable,
    };
  }

  handleConfirmOk = () => {
    this.handleCloseModal();
  };

  handleConfirmCancel = () => {
    this.handleCloseModal();
  };

  handleCloseModal = () => {
    const { onCancel } = this.props;
    this.setState({
      visiable: false,
    });
    onCancel();
  };

  handleMenuSelect = item => {
    const { selectedKeys } = item;
    this.setState({
      selectedKeys,
    });
  };

  showForm = key => {
    let result;
    switch (key) {
      case 'create':
        result = <CreateTree />;
        break;
      case 'choose':
        result = <ChooseTree />;
        break;
      default:
        break;
    }
    return result;
  };

  render() {
    const { selectedKeys, visiable } = this.state;
    return (
      <Modal
        width="50%"
        title="文章分支"
        visible={visiable}
        className={styles.treeModalWrapper}
        onOk={this.handleConfirmOk}
        onCancel={this.handleConfirmCancel}
      >
        <Layout>
          <Sider theme="light" width="15%">
            <Menu
              mode="inline"
              style={{ height: '100%' }}
              defaultSelectedKeys={selectedKeys}
              onSelect={this.handleMenuSelect}
            >
              <Menu.Item key="create">
                <span>新增分支</span>
              </Menu.Item>
              <Menu.Item key="choose">
                <span>选择分支</span>
              </Menu.Item>
            </Menu>
          </Sider>
          <Content className={styles.rightContentWrapper}>
            <div className={styles.formWrapper}>{this.showForm(selectedKeys[0])}</div>
            <div className={styles.locationWrapper}>
              <span>当前位置: 前端/React/PureComponent</span>
              <br />
              <span>更新位置: </span>
            </div>
          </Content>
        </Layout>
      </Modal>
    );
  }
}
