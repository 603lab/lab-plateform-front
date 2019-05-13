import React, { PureComponent } from 'react';
import { Icon, Tag, Skeleton } from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import ArticleTree from './components/ArticleTree';
import ArticleComment from './components/ArticleComment';
import styles from './Detail.less';
import Color from '@/utils/colors';

@connect(({ doc, loading }) => ({
  doc,
  loading: loading.effects['doc/detail'],
}))
class Detail extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    const { dispatch } = this.props;
    // this.props.tabsData
    dispatch({
      type: 'doc/detail',
      payload: {
        id: 3,
        createUserCode: '150701206',
      },
    });
  }

  handleShare = () => {};

  render() {
    // {
    //   "isLike": true,
    //   "isCollected": true,
    //   "id": 3,
    //   "parentId": 10028,
    //   "fileAddress": "/Annex/doc/.NET CORE.doc",
    //   "fileName": "走进.NET Core",
    //   "fileTag": "[\".NET\",\"数据库\"]",
    //   "url": null,
    //   "content": "<#SQL#>",
    //   "likeNum": 4,
    //   "collectNum": 1,
    //   "browseNum": 1,
    //   "commentNum": 0,
    //   "type": "doc",
    //   "remark": "",
    //   "createUserCode": "150701206",
    //   "createUserName": "陆仁杰",
    //   "createTime": "2019-01-14T17:46:28"
    // }
    // const { title, content } = this.state;
    const {
      doc: {
        articleDetail: {
          id, // 文章id
          isLike, // 是否收藏
          fileName, // 文章标题
          content, // 文章内容
          createTime, // 创建时间
          createUserCode, // 创建者ID
          createUserName, // 创建者姓名
          browseNum, // 阅读数量
          collectNum, // 收藏数量
          tagList = [], // 文章标签
        } = {},
      },
      loading,
    } = this.props;
    return (
      <div className={styles.detailWrapper}>
        {loading ? (
          <Skeleton />
        ) : (
          <>
            <div className={styles.top}>
              <ArticleTree />
              <div className={styles.topAction}>
                <div className={styles.topActionList}>
                  <Icon type="star" style={{ color: isLike ? '#722ed1' : '' }} />
                  &nbsp;
                  <span style={{ color: isLike ? '#722ed1' : '' }}>
                    {isLike ? '已收藏' : '收藏'}
                  </span>
                </div>
                <div className={styles.topActionList}>
                  <Icon type="edit" />
                  &nbsp;
                  <span>编辑</span>
                </div>
                <div className={styles.topActionList}>
                  <Icon type="share" />
                  &nbsp;
                  <span onClick={this.handleShare}>分享</span>
                </div>
              </div>
            </div>
            <div className={styles.content}>
              {/* 文章标题 */}
              <h1>
                {fileName}
                <div className={styles.titleTag}>
                  {tagList.map((item, index) => (
                    <Tag key={item} color={Color.category12[index]}>
                      {item}
                    </Tag>
                  ))}
                </div>
              </h1>
              <div className={styles.autorInfo}>
                由<span className={styles.autorInfo__name}>{createUserName}</span>创建于
                {moment(createTime).format('YYYY-MM-DD hh:mm:ss')}
                {/* {new Date().toDateString()} */}
              </div>
              <div className={styles.articleInfo}>
                <span className={styles.articleInfo__readNum}>阅读：{browseNum}</span>
                <span className={styles.articleInfo__collectNum}>收藏：{collectNum}</span>
              </div>
              <div className={styles.articleContent}>
                {/* 文章内容 */}
                <div dangerouslySetInnerHTML={{ __html: content }} />
              </div>
              <div className={styles.articleComment}>
                {loading ? (
                  <Skeleton />
                ) : (
                  <ArticleComment
                    docId={id}
                    createUserCode={createUserCode}
                    createUserName={createUserName}
                  />
                )}
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
}
export default Detail;
