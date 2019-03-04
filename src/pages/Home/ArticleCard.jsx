import React from 'react';
import { Card, Tabs, Avatar, Button, Pagination, List } from 'antd';
import styles from './ArticleCard.less';

const { TabPane } = Tabs;
const developerData = [
  {
    id: '1',
    realName: '陈晓斌',
    avatar: '',
    className: '15广播电视工程2班',
    techDirection: '前端',
    followedNum: 42,
    tag: 'React;前端;大佬',
    isFollowed: true,
  },
  {
    id: '2',
    realName: '大白菜',
    avatar: '',
    className: '16广播电视工程2班',
    techDirection: '前端',
    followedNum: 1,
    tag: 'React;前端;菜鸡',
    isFollowed: true,
  },
  {
    id: '3',
    realName: '沈江峰',
    avatar: '',
    className: '15广播电视工程2班',
    techDirection: 'IOS',
    followedNum: 32,
    tag: '脱衣狂魔;小鸡短裤',
    isFollowed: true,
  },
  {
    id: '4',
    realName: '你傲哥',
    avatar: '',
    className: '15广播电视工程2班',
    techDirection: '全栈',
    followedNum: 8,
    tag: 'React;前端;大佬',
    isFollowed: false,
  },
  {
    id: '5',
    realName: '赵日天',
    avatar: '',
    className: '17电科1班',
    techDirection: '后端',
    followedNum: 8,
    tag: 'C#;.NET;话痨',
    isFollowed: false,
  },
  {
    id: '6',
    realName: '用户',
    avatar: '',
    className: '17电科1班',
    techDirection: '产品',
    followedNum: 23,
    tag: 'C#;aaa;aaaa;bbbbbbbbbbbbbbbbb..',
    isFollowed: false,
  },
  {
    id: '7',
    realName: '用户',
    avatar: '',
    className: '17电科1班',
    techDirection: '产品',
    followedNum: 23,
    tag: 'C#;aaa;aaaa;bb',
    isFollowed: false,
  },
  {
    id: '8',
    realName: '用户',
    avatar: '',
    className: '17电科1班',
    techDirection: '产品',
    followedNum: 23,
    tag: 'C#;aaa;aaaa;bb',
    isFollowed: false,
  },
  {
    id: '9',
    realName: '用户',
    avatar: '',
    className: '17电科1班',
    techDirection: '产品',
    followedNum: 23,
    tag: 'C#;aaa;aaaa;bb',
    isFollowed: false,
  },
  {
    id: '10',
    realName: '用户',
    avatar: '',
    className: '17电科1班',
    techDirection: '产品',
    followedNum: 23,
    tag: 'C#;aaa;aaaa;bb',
    isFollowed: false,
  },
  {
    id: '11',
    realName: '用户',
    avatar: '',
    className: '17电科1班',
    techDirection: '产品',
    followedNum: 23,
    tag: 'C#;aaa;aaaa;bb',
    isFollowed: false,
  },
  {
    id: '12',
    realName: '用户',
    avatar: '',
    className: '17电科1班',
    techDirection: '产品',
    followedNum: 23,
    tag: 'C#;aaa;aaaa;bb',
    isFollowed: false,
  },
  {
    id: '13',
    realName: '用户',
    avatar: '',
    className: '17电科1班',
    techDirection: '产品',
    followedNum: 23,
    tag: 'C#;aaa;aaaa;bb',
    isFollowed: false,
  },
];
const articleData = [
  {
    id: '1',
    fileAddress: '/Annex/doc/React总结（1）.doc',
    fileName: 'React总结（1）',
    fileTag: 'React;个人总结;前端',
    url: null,
    content: '简单的聊一聊关于React的一些总结和看法',
    likeNum: 1,
    collectNum: 0,
    browseNum: 3,
    commentNum: 0,
    type: 'doc',
    remark: '',
    createUserName: '陈晓斌',
    createTime: '2019-01-14T17:46:28',
  },
  {
    id: '2',
    fileAddress: '/Annex/doc/React总结（2）.doc',
    fileName: 'React总结 -（2）',
    fileTag: 'React;前端',
    url: null,
    content: '今天我们来说一说React的艺术，希望对大家有帮助',
    likeNum: 1,
    collectNum: 0,
    browseNum: 3,
    commentNum: 0,
    type: 'doc',
    remark: '',
    createUserName: '陈晓斌',
    createTime: '2019-01-04T19:46:28',
  },
  {
    id: '3',
    fileAddress: '/Annex/doc/实习全书.doc',
    fileName: '如何正确的划水',
    fileTag: '划水;666;走位',
    url: null,
    content: '实习所有人面临的大问题，至今都让人不解，如何正确XXX',
    likeNum: 1,
    collectNum: 0,
    browseNum: 3,
    commentNum: 0,
    type: 'doc',
    remark: '',
    createUserName: '陆仁杰',
    createTime: '2019-02-24T15:26:28',
  },
];

const techDirectionsType = [
  {
    value: '前端',
    key: '1',
  },
  {
    value: '后端',
    key: '2',
  },
  {
    value: 'IOS',
    key: '3',
  },
  {
    value: 'Andriod',
    key: '4',
  },
  {
    value: '美工',
    key: '5',
  },
  {
    value: '产品',
    key: '6',
  },
  {
    value: 'AI智能',
    key: '1',
  },
  {
    value: 'VR世界',
    key: '7',
  },
];

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
        <TabPane tab="推荐大佬" key="tab-1" style={{ marginTop: -16, backgroundColor: 'white' }}>
          <Tabs style={{ height: 310 }}>
            {techDirectionsType.map(tech => (
              // 这里在做一个只有位置为当前页面才开始渲染
              <TabPane tab={tech.value} key={`tabPhone${tech.key}`} style={{ padding: 10 }}>
                <Card
                  key={`tabCard${tech.key}`}
                  style={{ width: '100%', marginTop: -20, height: 228 }}
                >
                  {developerData.map((item, i) => (
                    <>
                      {this.isMap(i) ? (
                        <Card.Grid style={gridStyle} key={`tabPhone${tech.key}${item.id}`}>
                          <div className={styles.avatarInfo}>
                            <Avatar
                              style={{ height: 50, width: 50 }}
                              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                            />
                            <Button
                              type="primary"
                              size="small"
                              style={{ marginTop: 5, width: 58, marginLeft: -1 }}
                            >
                              {item.isFollowed === true ? '已关注' : '关注'}
                            </Button>
                          </div>
                          <div>
                            <div className={styles.nameItem}>{item.realName}</div>
                            <div className={styles.cardItem}>{item.followedNum}个关注</div>
                            <div className={styles.cardItem}>{item.className}</div>
                            <div className={styles.cardItem}>{item.tag}</div>
                          </div>
                        </Card.Grid>
                      ) : null}
                    </>
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
