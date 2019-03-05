import React from 'react';
import { Card, Icon, Alert } from 'antd';
import moment from 'moment';
import { noticeList } from './NoticeCardJson';
import styles from './NoticeCard.less';

// 数组长度
const listLength = Object.keys(noticeList).length;
export default class CommisionWork extends React.Component {
  constructor(args) {
    super(args);

    this.state = {
      isShowMenu: true,
      currentKey: 0,
      visible: false,
      isShowAll: false,
    };
  }

  handleClose = () => {
    this.setState({ visible: false });
  };

  turnMenu = () => {
    const { isShowMenu } = this.state;
    this.setState({
      isShowMenu: !isShowMenu,
      isShowAll: isShowMenu,
    });
  };

  turnBoard = key => {
    const { currentKey } = this.state;
    const newKey = currentKey + key;
    if (newKey >= listLength || newKey < 0) {
      this.setState({
        visible: true,
      });
    } else {
      this.setState({
        currentKey: newKey,
      });
    }
  };

  initBoard() {
    let res = null;
    const { currentKey } = this.state;
    if (listLength > 0) {
      res = noticeList[currentKey];
    }
    return res;
  }

  render() {
    const { isShowMenu, visible, isShowAll } = this.state;
    const cardAction = isShowMenu
      ? [
          <Icon type="arrow-left" onClick={() => this.turnBoard(-1)} />,
          <Icon type="arrow-right" onClick={() => this.turnBoard(1)} />,
          <span onClick={this.turnMenu}>查看所有</span>,
        ]
      : [<Icon type="up" onClick={this.turnMenu} />];

    const board = this.initBoard();
    const boardStyle = {
      height: 152,
      width: 612,
      padding: 0,
      overflow: 'auto',
      wordBreak: 'break-all',
    };
    const showAllStyle = {
      minHeight: 152,
      width: 612,
      padding: 0,
      overflow: 'auto',
      wordBreak: 'break-all',
      maxHeight: 651,
    };

    return (
      <div className={styles.noticeBoard}>
        <Card
          title="公告栏"
          style={{ height: 250, zIndex: 3 }}
          headStyle={{ backgroundColor: '#364d79', color: 'white' }}
          actions={cardAction}
          bodyStyle={isShowAll ? showAllStyle : boardStyle}
        >
          {isShowAll ? (
            noticeList.map(item => (
              <Card title={item.mainTitle} bodyStyle={{ paddingTop: 10 }} key={item.id}>
                <h4>{item.subHead}</h4>
                <p>{item.content}</p>
                <div className={styles.author}>{item.createUserName}</div>
                <div className={styles.author}>
                  {`${moment(item.lastEditTime).fromNow(true)}前`}
                </div>
              </Card>
            ))
          ) : (
            <Card title={board === null ? null : board.mainTitle} bodyStyle={{ paddingTop: 10 }}>
              <h4>{board === null ? null : board.subHead}</h4>
              <p>{board === null ? null : board.content}</p>
              <div className={styles.author}>{board === null ? null : board.createUserName}</div>
              <div className={styles.author}>
                {board === null ? null : `${moment(board.lastEditTime).fromNow(true)}前`}
              </div>
            </Card>
          )}
        </Card>
        {visible ? (
          <Alert
            message="已经到顶了哦~"
            type="warning"
            showIcon
            closable
            style={{ position: 'absolute', marginLeft: 219, marginTop: -116, zIndex: 4 }}
            afterClose={this.handleClose}
          />
        ) : null}
      </div>
    );
  }
}
