import React from 'react';
import { Card, Icon, Alert, Button } from 'antd';
import moment from 'moment';
import styles from './CommisionWork.less';

const cardData = [
  {
    id: '1',
    taskTitle: '一篇博客',
    endTime: '2019-01-18T00:00:00',
    lastEditTime: '2019-01-11T17:53:35',
    taskDescription: '本周轮到你总结博客，主题自定义哦',
  },
  {
    id: '2',
    taskTitle: '本周是你的分享会',
    endTime: '2019-05-18T00:00:00',
    lastEditTime: '2019-01-11T04:26:16',
    taskDescription: '大家好我今天来介绍一下Mock的基本原理',
  },
  {
    id: '3',
    taskTitle: '电商项目汇总',
    endTime: '2019-05-28T00:00:00',
    lastEditTime: '2019-03-02T14:53:35',
    taskDescription: '帮助老师整理电商名单',
  },
  {
    id: '4',
    taskTitle: '艺考生！冲鸭！',
    endTime: '2019-01-29T00:00:00',
    lastEditTime: '2019-03-01T14:53:35',
    taskDescription: '请协助完成艺考任务',
  },
  {
    id: '5',
    taskTitle: '上课提醒',
    endTime: '2019-04-12T00:00:00',
    lastEditTime: '2019-02-11T17:53:35',
    taskDescription: '别旷课，别迟到',
  },
  {
    id: '6',
    taskTitle: '小斌 关注了你',
    endTime: '2019-03-18T00:00:00',
    lastEditTime: '2019-02-21T17:53:35',
    taskDescription: '马上开始你的任务吧',
  },
  {
    id: '7',
    taskTitle: '天气预报',
    endTime: '2019-02-18T00:00:00',
    lastEditTime: '2019-02-27T17:53:35',
    taskDescription: '30天连续暴雨，下的你怀疑人生',
  },
];
// 卡片宽度
const cardWidth = 274;
// 设置卡片长度
const cardLength = Object.keys(cardData).length;
// 设置极限长度
const utMost = cardWidth * (cardLength - 1);
// 定义单次点击以后移动的距离
const moveWidth = 274;
const cardStyle = {
  marginTop: '-10px',
  width: '300px',
  height: '180px',
  float: 'left',
  zIndex: 1,
};
const cardDefaultStyle = {
  height: '180px',
  width: '274px',
  float: 'left',
  marginLeft: '0px',
};
const cardMoveLeftStyle = {
  height: '180px',
  marginTop: '5px',
  width: '274px',
  float: 'left',
};
const cardMoveRightStyle = {
  height: '180px',
  marginTop: '5px',
  width: '274px',
  float: 'left',
};

export default class CommisionWork extends React.Component {
  constructor(args) {
    super(args);

    this.state = {
      currentId: '',
      position: 0,
      visible: false,
    };
  }

  handleClose = () => {
    this.setState({ visible: false });
  };

  taskCardMove = distance => {
    const { position } = this.state;
    if (position === 0 && distance !== -1) {
      //  左极限位置 则不执行距离变化
      this.setState({ visible: true });
    } else if (position <= -utMost && distance !== 1) {
      //  右极限位置 不执行移动
      //  提示
      this.setState({ visible: true });
    } else {
      const newPosition = position + distance * moveWidth;
      this.setState({
        position: newPosition,
      });
    }
  };

  dateDValue = date => {
    const dValue = moment(date).fromNow(true);
    return dValue;
  };

  handleMouseOverCard = id => {
    this.setState({
      currentId: id,
    });
  };

  handleMouseOutCard = () => {
    this.setState({
      currentId: '',
    });
  };

  dateFormat = date => {
    const resDate = moment(date).format('YYYY-MM-DD');
    return resDate;
  };

  dealCardStyle = i => {
    let { position } = this.state;
    const { currentId } = this.state;
    let resStyle = cardDefaultStyle;
    const num = 0 - Number.parseInt(position / cardWidth, 10);
    if (i < num) {
      //  计算模块当前位置
      position += (num - 1) * cardWidth;

      const TaskStyle = {
        marginLeft: `${position}px`,
        height: '180px',
        width: '274px',
        float: 'left',
      };
      resStyle = TaskStyle;
    } else if (i === currentId) {
      resStyle = cardStyle;
    } else if (currentId === i + 1) {
      resStyle = cardMoveLeftStyle;
    } else if (currentId === i - 1) {
      resStyle = cardMoveRightStyle;
    }

    return resStyle;
  };

  render() {
    const { currentId, isShowTopIcon, visible } = this.state;
    return (
      <>
        <Card
          title="待办工作"
          style={{ marginTop: 6 }}
          bodyStyle={{ height: 218, overflow: 'hidden' }}
          extra={<a href="#">添加工作</a>}
        >
          {/*     动态设置width ↓    */}
          <div style={{ width: cardWidth * (cardLength + 1) }}>
            {cardData.map((item, i) => (
              <Card
                key={`Card${item.id}`}
                className={i === currentId ? styles.taskCard : null}
                hoverable="false"
                onMouseOver={() => this.handleMouseOverCard(i)}
                onFocus={() => 0}
                onMouseOut={this.handleMouseOutCard}
                onBlur={() => 0}
                style={this.dealCardStyle(i)}
                extra={isShowTopIcon ? <Icon type="to-top" style={{ fontSize: '20px' }} /> : null}
                title={
                  <span>
                    <Icon style={{ marginRight: '4px' }} type="radar-chart" />
                    {item.taskTitle}
                  </span>
                }
              >
                <div style={{ height: 70, overflow: 'hidden', textOverFlow: 'ellipsis' }}>
                  {item.taskDescription}
                </div>
                <div
                  style={
                    i === currentId ? { color: '#fa9514' } : { color: 'rgba(39, 85, 125, 0.75)' }
                  }
                >
                  <div style={{ float: 'left', width: 170 }}>
                    请于{this.dateFormat(item.endTime)}前完成
                  </div>
                  <div style={{ float: 'left' }}>{this.dateDValue(item.lastEditTime)}前</div>
                </div>
              </Card>
            ))}
          </div>
        </Card>
        {/* 设置移动按钮 */}
        <Button
          type="primary"
          ghost
          shape="circle"
          size="large"
          onClick={() => this.taskCardMove(1)}
          className={styles.cardLeftMover}
        >
          <Icon type="left" />
        </Button>
        <Button
          type="primary"
          ghost
          shape="circle"
          size="large"
          onClick={() => this.taskCardMove(-1)}
          className={styles.cardRightMover}
        >
          <Icon type="right" />
        </Button>
        {visible ? (
          <Alert
            message="已经到顶了哦~"
            type="warning"
            showIcon
            closable
            style={{ position: 'absolute', marginLeft: 350, marginTop: -250 }}
            afterClose={this.handleClose}
          />
        ) : null}
      </>
    );
  }
}
