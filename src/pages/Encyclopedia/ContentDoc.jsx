/*
 * @Author: chenxiaobin
 * @Date: 2019-04-03 16:29:31
 * @Last Modified by: chenxiaobin
 * @Last Modified time: 2019-05-10 16:34:23
 */
import React, { PureComponent } from 'react';
import { Alert } from 'antd';
import styles from './ContentDoc.less';
import PageHeader from '@/components/PageHeader';
import DocTabsContent from './DocTabs/index';

class ContentDoc extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  /**
   * 触发回调事件
   * 切换tabs: 改变Menu的selectedKeys为当前changeTabs的key
   */
  handleTabsChange = tabs => {
    const { getCurrentTabs } = this.props;
    getCurrentTabs({
      ...tabs,
    });
  };

  render() {
    const breadcrumbList = [
      {
        title: '百科',
        // href: '/',
      },
      {
        title: '首页',
      },
    ];
    const { selectMenu } = this.props;
    return (
      <div className={styles.contentWried}>
        <PageHeader breadcrumbList={breadcrumbList} />
        <Alert
          closable
          type="info"
          closeText="知道了"
          style={{ margin: '10px 0', width: '50%' }}
          message="欢迎你！百科的扩展离不开你的分享"
        />
        <DocTabsContent selectMenu={selectMenu} tabsChange={this.handleTabsChange} />
      </div>
    );
  }
}

module.exports = ContentDoc;
