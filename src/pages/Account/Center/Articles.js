import React from 'react';
import { List, Icon, Tag } from 'antd';
import mojs from 'mo-js';
import { connect } from 'dva';
import ArticleListContent from '@/components/ArticleListContent';
// import Store from '@/utils/store';
import styles from './Articles.less';

@connect(({ list }) => ({
  list,
}))
// 点赞情况存在浅比较,使用Component
class CenterArticle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      articleList: [],
    };
  }

  static getDerivedStateFromProps(props) {
    return {
      articleList: props.list.article,
    };
  }

  showAnimation = index => {
    const LikeWrapper = document.getElementsByClassName('like-wrapper')[index];
    const LikeIcon = document.getElementsByClassName('like-icon')[index];
    const opacityCurve16 = mojs.easing.path('M0,0 L25.333,0 L75.333,100 L100,0');
    const translationCurve16 = mojs.easing.path(
      'M0,100h25.3c0,0,6.5-37.3,15-56c12.3-27,35-44,35-44v150c0,0-1.1-12.2,9.7-33.3c9.7-19,15-22.9,15-22.9'
    );
    const squashCurve16 = mojs.easing.path(
      'M0,100.004963 C0,100.004963 25,147.596355 25,100.004961 C25,70.7741867 32.2461944,85.3230873 58.484375,94.8579105 C68.9280825,98.6531013 83.2611815,99.9999999 100,100'
    );
    const Burst = new mojs.Burst({
      parent: LikeWrapper,
      duration: 1700,
      delay: 350,
      shape: 'circle',
      fill: '#722ed1',
      x: '40%',
      y: '50%',
      opacity: 0.3,
      childOptions: { radius: { 'rand(15,5)': 0 } },
      radius: { 0: 150 },
      degree: 50,
      angle: -25,
      count: 6,
      isRunLess: true,
      easing: mojs.easing.bezier(0.1, 1, 0.3, 1),
    });
    // burst animation (line1)
    const Burst2 = new mojs.Burst({
      parent: LikeWrapper,
      duration: 600,
      delay: 200,
      shape: 'circle',
      fill: '#C0C1C3',
      x: '15%',
      y: '100%',
      childOptions: {
        radius: { 60: 0 },
        type: 'line',
        stroke: '#722ed1',
        strokeWidth: 2,
        strokeLinecap: 'round',
      },
      radius: { 50: 180 },
      angle: 180,
      count: 1,
      opacity: 0.4,
      isRunLess: true,
      easing: mojs.easing.bezier(0.1, 1, 0.3, 1),
    });
    // burst animation (line2)
    const Burst3 = new mojs.Burst({
      parent: LikeWrapper,
      duration: 600,
      delay: 200,
      shape: 'circle',
      fill: '#722ed1',
      x: '50%',
      y: '100%',
      childOptions: {
        radius: { 60: 0 },
        type: 'line',
        stroke: '#722ed1',
        strokeWidth: 2,
        strokeLinecap: 'round',
      },
      radius: { 50: 220 },
      angle: 180,
      count: 1,
      opacity: 0.4,
      isRunLess: true,
      easing: mojs.easing.bezier(0.1, 1, 0.3, 1),
    });
    const Tween = new mojs.Tween({
      duration: 500,
      onUpdate: progress => {
        const translateProgress = translationCurve16(progress);
        const squashProgress = squashCurve16(progress);
        const scaleX = 1 - 2 * squashProgress;
        const scaleY = 1 + 2 * squashProgress;

        const t = `translate3d(0, ${-180 * translateProgress}px,0) scale3d(${scaleX},${scaleY},1)`;
        const opacityProgress = opacityCurve16(progress);
        LikeIcon.style.transform = t;
        LikeIcon.style.WebkitTransform = t;
        LikeIcon.style.opacity = opacityProgress;
      },
    });
    index === 0
      ? new mojs.Timeline().add(Tween).play()
      : new mojs.Timeline().add(Burst, Burst2, Burst3, Tween).play();
  };

  handleArticleAction = (info, index) => {
    const { dispatch } = this.props;
    const { id, isLike } = info;
    // const userInfo = Store.getBasicInfo();
    this.showAnimation(index);
    dispatch({
      type: 'list/like',
      payload: {
        itemId: id,
        isLike: isLike ? 0 : 1,
        type: 'Doc',
        createUserCode: '150701206',
        createUserName: '陆仁杰',
      },
    }).then(result => {
      const { articleList: newArticleList } = this.state;
      const { isLike: articleIsLike, likeNum } = newArticleList[index];
      // 如果点赞成功,则改变状态
      if (result) {
        newArticleList[index].isLike = !articleIsLike;
        newArticleList[index].likeNum = articleIsLike ? likeNum - 1 : likeNum + 1;
        this.setState({
          articleList: [...newArticleList],
        });
      }
    });
  };

  render() {
    const { articleList } = this.state;
    // const { article } = list;
    return (
      <List
        rowKey="id"
        size="large"
        itemLayout="vertical"
        className={styles.articleList}
        dataSource={articleList}
        pagination={{
          pageSize: 5,
        }}
        renderItem={(item, index) => (
          <List.Item
            key={item.id}
            actions={[
              <span>
                <Icon type="eye" style={{ marginRight: 8 }} />
                {item.browseNum}
              </span>,
              <span className="like-wrapper">
                <Icon
                  type="like-o"
                  className="like-icon"
                  onClick={() => this.handleArticleAction(item, index)}
                  style={{ color: item.isLike ? '#722ed1' : '', marginRight: 8 }}
                />
                {item.likeNum}
              </span>,
              <span>
                <Icon type="message" style={{ marginRight: 8 }} />
                {item.commentNum}
              </span>,
            ]}
          >
            <List.Item.Meta
              title={
                <a className={styles.listItemMetaTitle} href={item.href || ''}>
                  {item.fileName || '暂无标题'}
                </a>
              }
              description={
                <span>
                  {item.fileTagList.map(tagItem => (
                    <Tag key={tagItem}>{tagItem}</Tag>
                  ))}
                </span>
              }
            />
            <ArticleListContent data={item} />
          </List.Item>
        )}
      />
    );
  }
}

export default CenterArticle;
