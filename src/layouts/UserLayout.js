import React, { Fragment } from 'react';
import Link from 'umi/link';
import { Icon } from 'antd';
import GlobalFooter from '@/components/GlobalFooter';
import styles from './UserLayout.less';
import logo from '../assets/logo.png';

const popUp = [
  {
    key: 'develop',
    title: '参与成员',
    content: (
      <>
        <span>前端开发: 陈晓斌</span>
        <br />
        <span>后端开发: 陆仁杰</span>
        <br />
        <span>前端维护: 钟天</span>
        <br />
        <span>产品设计: 常继荣、吴悦、王旭、薛露娜</span>
        <br />
      </>
    ),
  },
];

const copyright = (
  <Fragment>
    Copyright <Icon type="copyright" /> 2019 603实验室
  </Fragment>
);

class UserLayout extends React.PureComponent {
  // @TODO title
  // getPageTitle() {
  //   const { routerData, location } = this.props;
  //   const { pathname } = location;
  //   let title = 'Ant Design Pro';
  //   if (routerData[pathname] && routerData[pathname].name) {
  //     title = `${routerData[pathname].name} - Ant Design Pro`;
  //   }
  //   return title;
  // }

  render() {
    const { children } = this.props;
    return (
      // @TODO <DocumentTitle title={this.getPageTitle()}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/">
                <img alt="logo" className={styles.logo} src={logo} />
                <span className={styles.title}>603实验室平台</span>
              </Link>
            </div>
            <div className={styles.desc}>xxxxx</div>
          </div>
          {children}
        </div>
        <GlobalFooter popUp={popUp} copyright={copyright} />
      </div>
    );
  }
}

export default UserLayout;
