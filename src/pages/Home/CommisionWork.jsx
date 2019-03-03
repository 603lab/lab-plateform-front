import React from 'react';
import { Card, Row, Col } from 'antd';
import { connect } from 'dva';
import styles from './CommisionWork.less';

@connect(({ home }) => ({
  home,
}))
class CommisionWork extends React.Component {
  constructor(args) {
    super(args);

    this.state = {};
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'home/fetchCommisionWork',
      payload: {
        isDone: 0,
        currentPage: 1,
        pageSize: 2,
      },
    });
  }

  render() {
    const { home } = this.props;
    const { commisionWork = [] } = home;
    return (
      <Card title="待办工作" className={styles.wordWriedCard}>
        <Row>
          {commisionWork.map(item => (
            <Col span={8} id={item.id}>
              {item.taskTitle}
              {item.taskDescription}
            </Col>
          ))}
        </Row>
      </Card>
    );
  }
}

export default CommisionWork;
