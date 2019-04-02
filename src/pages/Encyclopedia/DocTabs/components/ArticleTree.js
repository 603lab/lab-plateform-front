import React, { PureComponent } from 'react';
import { Icon, Breadcrumb } from 'antd';
import ArticleTree from '../../../../components/ArticleTreeModal';
import styles from './ArticleTree.less';

export default class CreateInfo extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      visiable: false,
    };
  }

  handOpenConfirm = () => {
    this.setState({
      visiable: true,
    });
  };

  render() {
    const { visiable } = this.state;
    return (
      <>
        <div className={styles.articleTree}>
          <Breadcrumb>
            <Breadcrumb.Item>大前端</Breadcrumb.Item>
            <Breadcrumb.Item>React</Breadcrumb.Item>
            <Breadcrumb.Item>生命周期</Breadcrumb.Item>
          </Breadcrumb>
          <Icon
            type="branches"
            onClick={this.handOpenConfirm}
            style={{ marginLeft: 10, cursor: 'pointer' }}
          />
        </div>
        <ArticleTree visiable={visiable} onCancel={() => this.setState({ visiable: false })} />
      </>
    );
  }
}
