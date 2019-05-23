import React, { PureComponent } from 'react';
import { connect } from 'dva';
// import Link from 'umi/link';
import router from 'umi/router';
// import findeIndex from 'lodash/findIndex';
import {
  Card,
  Row,
  Col,
  Icon,
  Divider,
  Spin,
  Tooltip,
  Button,
  Tag,
  Input,
  Popconfirm,
  message,
} from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import CenterPieChart from '@/components/CenterPieChart';
import CenterModal from '@/components/CenterModal';
import { basicInfo } from './personinfo';
import statisticData from '@/utils/userStatisticData';
import styles from './Center.less';
import baseColor from '@/utils/colors';

@connect(({ loading, user }) => ({
  skills: user.skills,
  skillsLoading: loading.effects['user/fetchSkills'],
  tags: user.tags,
  tagsLoading: loading.effects['user/fetchtags'],
  currentUser: user.currentUser,
  currentUserLoading: loading.effects['user/fetchCurrent'],
  listLoading: loading.effects['list/fetch'],
}))
class Center extends PureComponent {
  state = {
    modalType: '',
    inputValue: '',
    modalState: false,
    inputVisible: false,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    // 获取用户信息
    dispatch({
      type: 'user/fetchInfo',
      payload: {
        uCode: '150701206',
      },
    });
    // 获取用户技能
    dispatch({
      type: 'user/fetchSkills',
      payload: {
        createUserCode: '150701206',
      },
    });
    // 获取用户标签
    dispatch({
      type: 'user/fetchTags',
      payload: {
        createUserCode: '150701206',
      },
    });

    // 获取用户文章
    dispatch({
      type: 'list/fetch',
      payload: {
        uCode: '150701206',
        currentPage: 1,
        pageSize: 3,
      },
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

  // 更改nickName
  // changeNickName = e => {
  // console.log(e.target.value);
  // };

  showInput = () => {
    const { tags = [] } = this.props;
    if (tags.length > 7) {
      message.error('标签数量不能超过8个');
      return;
    }
    this.setState(
      {
        inputVisible: true,
      },
      () => this.input.focus()
    );
  };

  saveInputRef = input => {
    this.input = input;
  };

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  handleInputConfirm = () => {
    const { state, props } = this;
    const { inputValue } = state;
    const { dispatch } = props;
    // 未填写
    if (!inputValue) {
      this.setState({
        inputVisible: false,
      });
      return;
    }
    if (inputValue.length > 12) {
      message.error('标签字符不能超过12个');
      return;
    }
    // 添加个人标签接口
    dispatch({
      type: 'user/addTag',
      payload: {
        createUserCode: '150701206',
        createUserName: '陆仁杰',
        label: inputValue,
      },
    }).then(result => {
      if (result) {
        this.setState({
          inputVisible: false,
          inputValue: '',
        });
      }
    });
  };

  // 点击标签 -> 删除标签
  handleDeleteTag = item => {
    const { dispatch } = this.props;
    const { id, createUserCode } = item;
    // 删除个人标签接口
    dispatch({
      type: 'user/deleteTag',
      payload: {
        id,
        createUserCode,
      },
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
    const { inputVisible, inputValue, modalState, modalType } = this.state;
    const {
      tags,
      skills,
      skillsLoading,
      currentUser,
      currentUserLoading,
      listLoading,
      match,
      location,
      children,
    } = this.props;
    const transformUserInfo = {};
    // 把个人信息null的值转换成-
    currentUser &&
      Object.keys(currentUser).forEach(item => {
        transformUserInfo[item] = currentUser[item] === null ? '-' : currentUser[item];
      });
    const { avatar, scores, nickName, techList = [] } = transformUserInfo;
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
                          {/*
                           * egg: 鼠标悬浮4秒 显示在实验室的天数
                           */}
                          你在实验室的第<a className={styles.stayDay}>70</a>天！加油哟！&nbsp;
                          <Icon type="smile" />
                        </span>
                      }
                      mouseEnterDelay={4}
                    >
                      <img alt="" src={avatar} />
                    </Tooltip>
                    <div className={styles.name}>
                      <span
                        // contentEditable="true"
                        style={{ cursor: 'pointer' }}
                        // suppressContentEditableWarning
                        // onChange={() => this.changeNickName}
                      >
                        {nickName}
                      </span>
                      <br />
                      <span className={styles.techDirection}>
                        {techList.map(item => statisticData.directionOptionsTile[item])}
                      </span>
                    </div>
                    <div>
                      {/* 方向 */}
                      {/*
                       * egg: 快速点击2次，出现当前排名
                       */}
                      <Button className={styles.scores}>{scores}&nbsp;积分</Button>
                    </div>
                  </div>
                  <Divider dashed />
                  <div className={styles.detail}>
                    <div className={styles.infoTitle}>
                      个人信息&nbsp;
                      <Icon type="edit" onClick={() => this.handleOpenModal('personInfo')} />
                    </div>
                    <ul className={styles.personInfoUl}>
                      {basicInfo.map(item => (
                        <li key={item.field}>
                          <Icon type={item.icon} />
                          <span className={styles.basic}>{item.label}:</span>
                          <span>{transformUserInfo[item.field]}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Divider dashed />
                  <div className={styles.tags}>
                    <div className={styles.tagsTitle}>个人标签</div>
                    {tags.map((item, index) => (
                      <Popconfirm
                        key={item.id}
                        title={`确定要删除"${item.label}"标签吗`}
                        okText="删除"
                        cancelText={`依旧${item.label}`}
                        className={styles.tagsPop}
                        onConfirm={() => this.handleDeleteTag(item)}
                      >
                        <Tag color={this.getBaseColor(tags, index)}>{item.label}</Tag>
                      </Popconfirm>
                    ))}
                    {inputVisible && (
                      <Input
                        type="text"
                        size="small"
                        value={inputValue}
                        style={{ width: 78 }}
                        ref={this.saveInputRef}
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
                    <Spin spinning={skillsLoading}>
                      <CenterPieChart skills={skills} />
                    </Spin>
                  </div>
                </div>
              ) : (
                <Icon type="loading" />
              )}
            </Card>
          </Col>

          {modalState && (
            <CenterModal
              skills={skills}
              modalType={modalType}
              modalState={modalState}
              modalInitData={currentUser}
              onCloseModal={this.handleCloseModal}
            />
          )}
          <Col lg={18} md={24}>
            <Card
              bordered={false}
              loading={listLoading}
              tabList={operationTabList}
              className={styles.tabsCard}
              activeTabKey={location.pathname.replace(`${match.path}/`, '')}
              onTabChange={this.onTabChange}
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
