import React from 'react';
import { Card, Icon, Alert, Form, Input, Modal, DatePicker, Popconfirm } from 'antd';
import moment from 'moment';
import { connect } from 'dva';
import styles from './CommisionWork.less';
import {
  cardStyle,
  cardDefaultStyle,
  cardMoveLeftStyle,
  cardMoveRightStyle,
} from './CommisionWorkJson';

// 卡片宽度
const cardWidth = 274;
// 设置卡片长度
// const cardLength = Object.keys(cardData).length;
// // 设置极限长度
// const utMost = cardWidth * (cardLength - 1);
// 定义单次点击以后移动的距离
const moveWidth = 274;

const { TextArea } = Input;
@connect(({ user, home, loading }) => ({
  currentUser: user.currentUser,
  commisionWorkList: home.commisionWorkList,
  addTaskLoading: loading.effects['home/addTask'],
}))
class CommisionWork extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentId: '',
      position: 0,
      visible: false,
      boardVisible: false,
      taskVisible: false,
      titleInputValue: '',
      endTimeInputValue: '',
      descripInputValue: '',
      currentVisibleTask: '',
      isShowTask: true,
      isBubbleExist: false,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;

    // 获取待办工作
    dispatch({
      type: 'home/fetchCommisionWork',
      payload: {
        currentPage: 1,
        pageSize: 6,
        isDone: 0,
        createUserCode: '150701206',
      },
    });
  }

  handleClose = () => {
    this.setState({ visible: false });
  };

  showModal = () => {
    this.setState({
      boardVisible: true,
    });
  };

  doneJob = task => {
    const { dispatch } = this.props;
    dispatch({
      type: 'home/deleteTask',
      payload: {
        ID: task.id,
        taskTitle: task.taskTitle,
        endTime: task.endTime,
        taskDescription: task.taskDescription,
        receivedUserName: task.receivedUserName,
        receivedUserCode: task.receivedUserCode,
        isDone: 1,
      },
    });
  };

  showTask = (task, isShowTask, isBubbleExist) => {
    if (isShowTask && !isBubbleExist) {
      this.setState({
        taskVisible: true,
        currentVisibleTask: task,
        titleInputValue: task.taskTitle,
        endTimeInputValue: task.endTime,
        descripInputValue: task.taskDescription,
      });
    }
  };

  handleTaskCancel = () => {
    const {
      form: { resetFields },
    } = this.props;
    this.setState({ taskVisible: false });
    resetFields();
  };

  editTask = () => {
    const { dispatch } = this.props;
    const { currentVisibleTask } = this.state;
    const { titleInputValue, endTimeInputValue, descripInputValue } = this.state;
    // 编辑任务
    dispatch({
      type: 'home/editTask',
      payload: {
        ID: currentVisibleTask.id,
        taskTitle: titleInputValue,
        endTime: endTimeInputValue,
        taskDescription: descripInputValue,
        // receivedUserName: currentVisibleTask.receivedUserName,
        // receivedUserCode: currentVisibleTask.receivedUserCode,
        isDone: 0,
      },
    });
    const {
      form: { resetFields },
    } = this.props;
    this.setState({ taskVisible: false });
    resetFields();
  };

  handleOk = () => {
    const { dispatch } = this.props;
    const { titleInputValue, endTimeInputValue, descripInputValue } = this.state;
    // 添加任务
    dispatch({
      type: 'home/addTask',
      payload: {
        taskTitle: titleInputValue,
        endTime: endTimeInputValue,
        taskDescription: descripInputValue,
      },
    });
    this.setState({
      boardVisible: false,
    });
  };

  handleTitleInputChange = e => {
    this.setState({ titleInputValue: e.target.value });
  };

  handleEndTimeInputChange = (date, dateString) => {
    this.setState({ endTimeInputValue: dateString });
  };

  handleDescripInputChange = e => {
    this.setState({ descripInputValue: e.target.value });
  };

  handleCancel = () => {
    this.setState({
      boardVisible: false,
    });
  };

  taskCardMove = (distance, utMost) => {
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

  handleMouseOverCard = (id, task) => {
    this.setState({
      currentId: id,
      isShowTask: true,
      currentVisibleTask: task,
      titleInputValue: task.taskTitle,
      endTimeInputValue: task.endTime,
      descripInputValue: task.taskDescription,
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

  confirm = () => {
    const { currentVisibleTask } = this.state;
    this.doneJob(currentVisibleTask);
    this.setState({
      isBubbleExist: false,
    });
  };

  cancel = () => {
    this.setState({
      isBubbleExist: false,
    });
  };

  falseShowTask = () => {
    this.setState({
      isShowTask: false,
    });
  };

  trueShowTask = () => {
    this.setState({
      isShowTask: true,
    });
  };

  trueBubble = () => {
    this.setState({
      isBubbleExist: true,
    });
  };

  falseBubble = () => {
    this.setState({
      isBubbleExist: false,
      isShowTask: false,
    });
  };

  render() {
    const {
      currentId,
      // isShowTopIcon,
      visible,
      boardVisible,
      taskVisible,
      currentVisibleTask,
      isShowTask,
      isBubbleExist,
    } = this.state;
    const { commisionWorkList = [], addTaskLoading } = this.props;
    const cardLength = commisionWorkList.length;
    const utMost = cardWidth * (cardLength - 1);
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
      },
    };
    const {
      form: { getFieldDecorator },
    } = this.props;
    // eslint-disable-next-line no-unused-vars
    const confirm = Modal.confirm;
    return (
      <>
        <Card
          title="待办工作"
          className={styles.cardWrapperStyle}
          style={{ marginTop: 6 }}
          bodyStyle={{ height: 218, overflow: 'hidden' }}
          extra={
            <a href="#" onClick={this.showModal}>
              添加工作
            </a>
          }
        >
          {/* 设置移动按钮 */}
          <div className={styles.actionBtn}>
            <Icon type="left" onClick={() => this.taskCardMove(1, utMost)} />
            <Icon type="right" onClick={() => this.taskCardMove(-1, utMost)} />
          </div>
          {/* <Button
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
          </Button> */}
          {/*     动态设置width ↓    */}
          <div style={{ width: cardWidth * (cardLength + 1) }}>
            {commisionWorkList.map((item, i) => (
              <Card
                key={`Card${item.id}`}
                className={i === currentId ? styles.taskCard : null}
                onClick={() => this.showTask(item, isShowTask, isBubbleExist)}
                hoverable="false"
                onMouseOver={() => this.handleMouseOverCard(i, item)}
                onFocus={() => 0}
                onMouseOut={this.handleMouseOutCard}
                onBlur={this.falseBubble}
                style={this.dealCardStyle(i)}
                // extra={isShowTopIcon ? <Icon type="to-top" style={{ fontSize: '20px' }} /> : null}
                extra={
                  <Popconfirm
                    title="你确定要删除这个任务吗"
                    onConfirm={this.confirm}
                    onCancel={this.cancel}
                    okText="确定"
                    cancelText="取消"
                    onFocus={this.falseShowTask}
                    onBlur={this.trueShowTask}
                    onClick={this.trueBubble}
                  >
                    <a href="#">删除</a>
                  </Popconfirm>
                }
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
                  <div>请于{this.dateFormat(item.endTime)}前完成</div>
                  {/* <div style={{ float: 'left' }}>{this.dateDValue(item.lastEditTime)}前</div> */}
                </div>
              </Card>
            ))}
          </div>
        </Card>

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
        <div>
          <Modal
            title="添加工作"
            visible={boardVisible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            confirmLoading={addTaskLoading}
            style={{ padding: 40 }}
          >
            <Form {...formItemLayout} layout="inline">
              <Form.Item
                label="标题"
                hasFeedback
                validateStatus="success"
                style={{ marginLeft: 28, marginBottom: 20 }}
              >
                <Input
                  placeholder="任务标题"
                  id="success"
                  style={{ width: 300 }}
                  onChange={this.handleTitleInputChange}
                />
              </Form.Item>

              <Form.Item
                label="截止时间"
                hasFeedback
                validateStatus="success"
                style={{ marginBottom: 20 }}
              >
                <DatePicker style={{ width: 300 }} onChange={this.handleEndTimeInputChange} />
              </Form.Item>

              <Form.Item label="工作描述">
                <TextArea
                  placeholder="工作描述"
                  autosize={{ minRows: 2, maxRows: 6 }}
                  style={{ width: 300 }}
                  onChange={this.handleDescripInputChange}
                />
              </Form.Item>
            </Form>
          </Modal>
        </div>
        <div>
          <Modal
            title="编辑任务"
            visible={taskVisible}
            onOk={this.editTask}
            onCancel={this.handleTaskCancel}
            confirmLoading={addTaskLoading}
            style={{ padding: 40 }}
          >
            <Form {...formItemLayout} layout="inline">
              <Form.Item
                label="标题"
                hasFeedback
                validateStatus="success"
                style={{ marginLeft: 28, marginBottom: 20 }}
              >
                {getFieldDecorator('taskTitle', {
                  initialValue: currentVisibleTask.taskTitle,
                  rules: [],
                })(
                  <Input
                    placeholder="任务标题"
                    id="success"
                    style={{ width: 300 }}
                    onChange={this.handleTitleInputChange}
                  />
                )}
              </Form.Item>

              <Form.Item
                label="截止时间"
                hasFeedback
                validateStatus="success"
                style={{ marginBottom: 20 }}
              >
                {getFieldDecorator('date', {
                  initialValue: moment(currentVisibleTask.endTime, 'YYYY-MM-DD'),
                  rules: [],
                })(<DatePicker style={{ width: 300 }} onChange={this.handleEndTimeInputChange} />)}
              </Form.Item>

              <Form.Item label="工作描述">
                {getFieldDecorator('description', {
                  initialValue: currentVisibleTask.taskDescription,
                  rules: [],
                })(
                  <TextArea
                    placeholder="工作描述"
                    autosize={{ minRows: 2, maxRows: 6 }}
                    style={{ width: 300 }}
                    onChange={this.handleDescripInputChange}
                  />
                )}
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </>
    );
  }
}
export default Form.create()(CommisionWork);
