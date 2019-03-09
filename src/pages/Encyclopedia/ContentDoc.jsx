import React, { PureComponent } from 'react';
import { Alert } from 'antd';
import styles from './ContentDoc.less';
import PageHeader from '@/components/PageHeader';
import DocTabsContent from '@/components/DocTabs';

class ContentDoc extends PureComponent {
  constructor(args) {
    super(args);

    this.state = {};
  }

  render() {
    const breadcrumbList = [
      {
        title: '一级菜单',
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
          type="info"
          style={{ margin: '10px 0', width: '50%' }}
          message="欢迎你！大前端的扩展离不开你的分享"
        />
        <DocTabsContent />
      </div>
    );
  }
}

module.exports = ContentDoc;
