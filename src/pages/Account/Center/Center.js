import React, { PureComponent } from 'react';
import { connect } from 'dva';
// import Link from 'umi/link';
import router from 'umi/router';
import { Card, Row, Col, Icon, Tag, Divider, Spin, Input, Tooltip, Button } from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import CenterPieChart from '@/components/CenterPieChart';
import CenterModal from '@/components/CenterModal';
import styles from './Center.less';
import baseColor from '../../../utils/colors';

@connect(({ loading, user, project }) => ({
  listLoading: loading.effects['list/fetch'],
  currentUser: user.currentUser,
  currentUserLoading: loading.effects['user/fetchCurrent'],
  project,
  projectLoading: loading.effects['project/fetchNotice'],
}))
class Center extends PureComponent {
  state = {
    newTags: [],
    modalType: '',
    inputValue: '',
    modalState: false,
    inputVisible: false,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/fetchCurrent',
    });
    dispatch({
      type: 'list/fetch',
      payload: {
        count: 8,
      },
    });
    dispatch({
      type: 'project/fetchNotice',
    });
  }

  getBaseColor = (items, index) => {
    let color = [];
    if (items.length < 5) {
      color = baseColor.category5[index];
    } else if (items.length < 12) {
      color = baseColor.category12[index];
    } else {
      color = baseColor.category20[index];
    }
    return color;
  };

  onTabChange = key => {
    const { match } = this.props;
    switch (key) {
      case 'articles':
        router.push(`${match.url}/articles`);
        break;
      case 'doc':
        router.push(`${match.url}/doc`);
        break;
      case 'projects':
        router.push(`${match.url}/projects`);
        break;
      default:
        break;
    }
  };

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  saveInputRef = input => {
    this.input = input;
  };

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  handleInputConfirm = () => {
    const { state } = this;
    const { inputValue } = state;
    let { newTags } = state;
    if (inputValue && newTags.filter(tag => tag.label === inputValue).length === 0) {
      newTags = [...newTags, { key: `new-${newTags.length}`, label: inputValue }];
    }
    this.setState({
      newTags,
      inputVisible: false,
      inputValue: '',
    });
  };

  handleOpenModal = modalType => {
    this.setState({
      modalType,
      modalState: true,
    });
  };

  handleCloseModal = () => {
    this.setState({
      modalState: false,
    });
  };

  render() {
    const { newTags, inputVisible, inputValue, modalState, modalType } = this.state;
    const {
      listLoading,
      currentUser,
      currentUserLoading,
      // project: { notice },
      projectLoading,
      match,
      location,
      children,
    } = this.props;
    const operationTabList = [
      {
        key: 'articles',
        tab: (
          <span>
            我的文章 <span style={{ fontSize: 14 }}>(8)</span>
          </span>
        ),
      },
      {
        key: 'doc',
        tab: (
          <span>
            文档动态 <span style={{ fontSize: 14 }}>(8)</span>
          </span>
        ),
      },
      {
        key: 'projects',
        tab: (
          <span>
            项目动态 <span style={{ fontSize: 14 }}>(8)</span>
          </span>
        ),
      },
      {
        key: 'follow',
        tab: (
          <span>
            关注动态 <span style={{ fontSize: 14 }}>(8)</span>
          </span>
        ),
      },
    ];
    return (
      <GridContent className={styles.userCenter}>
        <Row gutter={24}>
          <Col lg={6} md={24}>
            <Card bordered={false} style={{ marginBottom: 24 }} loading={currentUserLoading}>
              {currentUser && Object.keys(currentUser).length ? (
                <div>
                  <div className={styles.avatarHolder}>
                    <Tooltip
                      title={
                        <span>
                          你在实验室的第<a className={styles.stayDay}>70</a>天！加油哟！&nbsp;
                          <Icon type="smile" />
                        </span>
                      }
                      mouseEnterDelay={4}
                    >
                      <img alt="" src={currentUser.avatar} />
                    </Tooltip>
                    <div className={styles.name}>{currentUser.nickName}</div>
                    <div>
                      {/* 方向 */}
                      {currentUser.techDirection}
                      <Button className={styles.scores}>{currentUser.scores}&nbsp;积分</Button>
                    </div>
                  </div>
                  <Divider dashed />
                  <div className={styles.detail}>
                    <div className={styles.infoTitle}>
                      个人信息&nbsp;
                      <Icon type="edit" onClick={() => this.handleOpenModal('personInfo')} />
                    </div>
                    <ul className={styles.personInfoUl}>
                      <li>
                        <Icon type="rocket" />
                        &nbsp;&nbsp;姓名：{currentUser.realName}
                      </li>
                      <li>
                        <Icon type="team" />
                        &nbsp;&nbsp;年级：{currentUser.entranceYear}
                      </li>
                      <li>
                        <Icon type="bulb" />
                        &nbsp;&nbsp;学号：{currentUser.uCode}
                      </li>
                      <li>
                        <Icon type="experiment" />
                        &nbsp;&nbsp;专业：{currentUser.uMajor}
                      </li>
                      <li>
                        <Icon type="desktop" />
                        &nbsp;&nbsp;方向：{currentUser.techDirection}
                      </li>
                      <li>
                        <Icon type="flag" />
                        &nbsp;&nbsp;团队：{currentUser.teamName}
                      </li>
                      <li>
                        <Icon type="mobile" />
                        &nbsp;&nbsp;手机：{currentUser.phoneNum}
                      </li>
                      <li>
                        <Icon type="qq" />
                        &nbsp;&nbsp;QQ：{currentUser.qq}
                      </li>
                      <li>
                        <Icon type="wechat" />
                        &nbsp;&nbsp;微信：{currentUser.wechat}
                      </li>
                      <li>
                        <Icon type="idcard" />
                        &nbsp;&nbsp;身份证：{currentUser.idCard}
                      </li>
                    </ul>
                  </div>
                  <Divider dashed />
                  <div className={styles.tags}>
                    <div className={styles.tagsTitle}>个人标签</div>
                    {currentUser.tags.concat(newTags).map((item, index) => (
                      <Tag
                        key={item.key}
                        color={this.getBaseColor(currentUser.tags.concat(newTags), index)}
                      >
                        {item.label}
                      </Tag>
                    ))}
                    {inputVisible && (
                      <Input
                        ref={this.saveInputRef}
                        type="text"
                        size="small"
                        style={{ width: 78 }}
                        value={inputValue}
                        onChange={this.handleInputChange}
                        onBlur={this.handleInputConfirm}
                        onPressEnter={this.handleInputConfirm}
                      />
                    )}
                    {!inputVisible && (
                      <Tag
                        onClick={this.showInput}
                        style={{ background: '#fff', borderStyle: 'dashed' }}
                      >
                        <Icon type="plus" />
                      </Tag>
                    )}
                  </div>
                  <Divider style={{ marginTop: 16 }} dashed />
                  <div className={styles.team}>
                    <div className={styles.teamTitle}>
                      掌握技能&nbsp;
                      <Icon type="edit" onClick={() => this.handleOpenModal('skills')} />
                    </div>
                    <Spin spinning={projectLoading}>
                      <CenterPieChart skills={currentUser.skills} />
                      {/* <Row gutter={36}>
                        {notice.map(item => (
                          <Col key={item.id} lg={24} xl={12}>
                            <Link to={item.href}>
                              <Avatar size="small" src={item.logo} />
                              {item.member}
                            </Link>
                          </Col>
                        ))}
                      </Row> */}
                    </Spin>
                  </div>
                </div>
              ) : (
                'loading...'
              )}
            </Card>
          </Col>

          {modalState && (
            <CenterModal
              modalType={modalType}
              modalState={modalState}
              modalInitData={currentUser}
              onCloseModal={this.handleCloseModal}
            />
          )}
          <Col lg={18} md={24}>
            <Card
              className={styles.tabsCard}
              bordered={false}
              tabList={operationTabList}
              activeTabKey={location.pathname.replace(`${match.path}/`, '')}
              onTabChange={this.onTabChange}
              loading={listLoading}
            >
              {children}
            </Card>
          </Col>
        </Row>
      </GridContent>
    );
  }
}

export default Center;
