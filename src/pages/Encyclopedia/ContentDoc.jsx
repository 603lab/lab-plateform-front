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

  render() {
    const breadcrumbList = [
      {
        title: '百科',
        href: '/',
      },
      {
        title: '二级菜单',
        href: '/',
      },
      {
        title: '三级菜单',
      },
    ];

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
        <DocTabsContent />
      </div>
    );
  }
}

module.exports = ContentDoc;
