import React, { PureComponent } from 'react';
import { Modal, Form, Icon, Input, message } from 'antd';

class CenterModal extends PureComponent {
  constructor(args) {
    super(args);

    this.state = {
      visible: false,
      confirmLoading: false,
      modalData: {},
    };
  }

  componentDidMount() {
    const { form } = this.props;
    form.validateFields();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      visible: nextProps.modalState,
    });
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    const { form, onCloseModal } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        this.setState({
          confirmLoading: true,
        });
        setTimeout(() => {
          this.setState({
            visible: false,
            confirmLoading: false,
            modalData: values,
          });
          onCloseModal();
        }, 2000);
      } else {
        message.error(`提交失败 ${err}`);
      }
    });
  };

  handleCancel = () => {
    const { onCloseModal } = this.props;
    this.setState({
      visible: false,
    });
    onCloseModal();
  };

  render() {
    const { visible, confirmLoading, modalData } = this.state;
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <div>
        <Modal
          title="Title"
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          confirmLoading={confirmLoading}
        >
          <Form>
            <Form.Item>
              {getFieldDecorator('userName', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Username"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="Password"
                />
              )}
            </Form.Item>
          </Form>
        </Modal>
        <span>{modalData}</span>
      </div>
    );
  }
}

const CenterModalForm = Form.create({ name: 'CenterModalForm' })(CenterModal);
export default CenterModalForm;
