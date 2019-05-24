/* eslint-disable array-callback-return */
import React from 'react';
import { Card, Tabs, Avatar, Button, Pagination, List } from 'antd';
import { connect } from 'dva';
import styles from './ArticleCard.less';
import { techDirectionsType } from './ArticleCardJson';

const { TabPane } = Tabs;

// const totalA = Object.keys(articleData).length;
const pageSize = 6;
@connect(({ user, home, loading }) => ({
  currentUser: user.currentUser,
  userList: home.userList,
  articleList: home.articleList,
  swichTabLoading: loading.effects['home/fetchUsers'],
}))
class ArticleCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      type: '前端',
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const { type } = this.state;
    // 获取推荐大佬
    dispatch({
      type: 'home/fetchUsers',
      payload: {
        currentPage: 1,
        pageSize: 10,
        leaderType: type,
      },
    });
    // 获取推荐文章
    dispatch({
      type: 'home/fetchArticle',
      payload: {
        currentPage: 1,
        pageSize: 10,
        articleType: type,
      },
    });
  }

  onChange = activeKey => {
    const { dispatch } = this.props;
    // eslint-disable-next-line consistent-return
    const tech = techDirectionsType.find(item => {
      if (item.key === activeKey) return item;
    });

    dispatch({
      type: 'home/fetchUsers',
      payload: {
        currentPage: 1,
        pageSize: 10,
        leaderType: tech.value,
      },
    });
    this.setState({ currentPage: 1 });
  };

  articleOnChange = activeKey => {
    const { dispatch } = this.props;
    // eslint-disable-next-line consistent-return
    const tech = techDirectionsType.find(item => {
      if (item.key === activeKey) return item;
    });

    dispatch({
      type: 'home/fetchArticle',
      payload: {
        currentPage: 1,
        pageSize: 10,
        articleType: tech.value,
      },
    });
    this.setState({ currentPage: 1 });
  };

  isMap = index => {
    //  当前的页码长度
    const { currentPage } = this.state;
    const minNum = pageSize * (currentPage - 1);
    const maxNum = pageSize * currentPage;
    let state = false;
    if (maxNum > index && index >= minNum) {
      state = true;
    }
    return state;
  };

  isMapArticle = index => {
    //  当前的页码长度
    const { currentPage } = this.state;
    const minNum = 3 * (currentPage - 1);
    const maxNum = 3 * currentPage;
    let state = false;
    if (maxNum > index && index >= minNum) {
      state = true;
    }
    return state;
  };

  pageTurn = page => {
    this.setState({
      currentPage: page,
    });
  };

  showUserList = techTab => {
    this.setState({
      type: techTab,
    });
  };

  followUser = (uCode, realName, isFollowed) => {
    const { dispatch } = this.props;
    const followBool = isFollowed ? 0 : 1;
    dispatch({
      type: 'home/follow',
      payload: {
        isFollow: followBool,
        followUserCode: uCode,
        followUserName: realName,
      },
    });
  };

  render() {
    const { currentPage } = this.state;
    const { userList = [], swichTabLoading, articleList = [] } = this.props;
    const totalD = Object.keys(userList).length;
    const totalA = Object.keys(articleList).length;
    return (
      <Tabs type="card" className={styles.tabsWrapperStyle}>
        <TabPane tab="推荐大佬" key="tabPhone" style={{ marginTop: -16, backgroundColor: 'white' }}>
          <Tabs onChange={this.onChange} loading={swichTabLoading}>
            {techDirectionsType.map(tech => (
              // 这里在做一个只有位置为当前页面才开始渲染
              <TabPane tab={tech.value} key={tech.key}>
                <Card className={styles.cardStyleWrapper}>
                  {userList.map((item, i) => (
                    <div key={item.id}>
                      {this.isMap(i) ? (
                        <Card.Grid className={styles.gridStyle}>
                          <div className={styles.avatarInfo}>
                            <Avatar style={{ height: 50, width: 50 }} src={item.avatar} />
                            <Button
                              type="primary"
                              size="small"
                              className={item.isFollowed === true ? '' : styles.noFollow}
                              style={{
                                fontSize: 12,
                                marginTop: 5,
                                width: 48,
                                padding: 2,
                                paddingTop: 0,
                                marginLeft: -1,
                              }}
                              onClick={() =>
                                this.followUser(item.uCode, item.realName, item.isFollowed)
                              }
                            >
                              {item.isFollowed === true ? '已关注' : '关注'}
                            </Button>
                          </div>
                          <div className={styles.cardBody}>
                            <span>{item.realName}</span>
                            <p>{item.followedNum}个关注</p>
                            <p>{item.className}</p>
                            <p>{item.tag}</p>
                          </div>
                        </Card.Grid>
                      ) : null}
                    </div>
                  ))}
                </Card>
                <Pagination
                  simple
                  defaultCurrent={currentPage}
                  defaultPageSize={pageSize}
                  total={totalD}
                  className={styles.pagination}
                  onChange={this.pageTurn}
                />
              </TabPane>
            ))}
          </Tabs>
        </TabPane>
        <TabPane tab="推荐文章" key="tab-2" style={{ marginTop: -16, backgroundColor: 'white' }}>
          <Tabs style={{ height: 320 }} onChange={this.articleOnChange}>
            {techDirectionsType.map(tech => (
              <TabPane tab={tech.value} key={tech.key} style={{ padding: 10 }}>
                <List
                  itemLayout="horizontal"
                  dataSource={articleList}
                  style={{ marginTop: -10 }}
                  renderItem={(item, i) => (
                    <div key={item.id}>
                      {this.isMapArticle(i) ? (
                        <List.Item>
                          <List.Item.Meta
                            avatar={<Avatar src={item.avatar} />}
                            title={
                              <span>
                                <a href="https://ant.design">{item.createUserName}</a>{' '}
                                <a href="" style={{ marginLeft: 10 }}>
                                  {item.fileName}
                                </a>
                              </span>
                            }
                            description={item.content.substring(0, 40)}
                          />
                        </List.Item>
                      ) : null}
                    </div>
                  )}
                />
                <Pagination
                  simple
                  defaultCurrent={currentPage}
                  defaultPageSize={pageSize}
                  total={totalA}
                  style={{ marginLeft: '68%' }}
                  onChange={this.pageTurn}
                />
              </TabPane>
            ))}
          </Tabs>
        </TabPane>
      </Tabs>
    );
  }
}
export default ArticleCard;
