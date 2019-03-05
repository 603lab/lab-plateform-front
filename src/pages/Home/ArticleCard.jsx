import React from 'react';
import { Card, Tabs, Avatar, Button, Pagination, List } from 'antd';
import styles from './ArticleCard.less';
import { developerData, articleData, techDirectionsType } from './ArticleCardJson';

const { TabPane } = Tabs;

const totalD = Object.keys(developerData).length;
// const totalA = Object.keys(articleData).length;
const pageSize = 6;
export default class CommisionWork extends React.Component {
  constructor(args) {
    super(args);

    this.state = {
      currentPage: 1,
      totalDeveloper: totalD,
    };
  }

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

  pageTurn = page => {
    this.setState({
      currentPage: page,
    });
  };

  render() {
    const gridStyle = {
      width: '33.3%',
      padding: 5,
      cursor: 'pointer',
    };
    const { currentPage, totalDeveloper } = this.state;
    return (
      <Tabs type="card" style={{ marginTop: 10 }}>
        <TabPane tab="推荐大佬" key="tabPhone" style={{ marginTop: -16, backgroundColor: 'white' }}>
          <Tabs style={{ height: 310 }}>
            {techDirectionsType.map(tech => (
              // 这里在做一个只有位置为当前页面才开始渲染
              <TabPane tab={tech.value} key={tech.key} style={{ padding: 10 }}>
                <Card style={{ width: '100%', marginTop: -20, height: 228 }}>
                  {developerData.map((item, i) => (
                    <div key={item.id}>
                      {this.isMap(i) ? (
                        <Card.Grid style={gridStyle}>
                          <div className={styles.avatarInfo}>
                            <Avatar
                              style={{ height: 50, width: 50 }}
                              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                            />
                            <Button
                              type="primary"
                              size="small"
                              style={{
                                marginTop: 5,
                                width: 48,
                                padding: 2,
                                paddingTop: 0,
                                marginLeft: -1,
                              }}
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
                  total={totalDeveloper}
                  style={{ marginLeft: '68%' }}
                  onChange={this.pageTurn}
                />
              </TabPane>
            ))}
          </Tabs>
        </TabPane>
        <TabPane tab="推荐文章" key="tab-2" style={{ marginTop: -16, backgroundColor: 'white' }}>
          <Tabs style={{ height: 310 }}>
            <TabPane tab="前端" key="2-1" style={{ padding: 10 }}>
              <List
                itemLayout="horizontal"
                dataSource={articleData}
                style={{ marginTop: -10 }}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                      }
                      title={
                        <span>
                          <a href="https://ant.design">{item.createUserName}</a>{' '}
                          <a href="" style={{ marginLeft: 10 }}>
                            {item.fileName}
                          </a>
                        </span>
                      }
                      description={item.content}
                    />
                  </List.Item>
                )}
              />
              <Pagination
                simple
                defaultCurrent={currentPage}
                defaultPageSize={pageSize}
                total={totalDeveloper}
                style={{ marginLeft: '68%' }}
                onChange={this.pageTurn}
              />
            </TabPane>
            <TabPane tab="后端" key="2-2">
              推荐文章2
            </TabPane>
            <TabPane tab="产品" key="2-3">
              推荐文章3
            </TabPane>
            <TabPane tab="美工" key="2-4">
              美工大佬
            </TabPane>
            <TabPane tab="IOS" key="2-5">
              IOS大佬
            </TabPane>
            <TabPane tab="Android" key="2-6">
              Android
            </TabPane>
            <TabPane tab="AI智能" key="2-7">
              AI智能
            </TabPane>
            <TabPane tab="VR世界" key="2-8">
              VR世界
            </TabPane>
          </Tabs>
        </TabPane>
      </Tabs>
    );
  }
}
