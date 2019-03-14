import React, { PureComponent } from 'react';
import { Modal, Form, Input, message, Select } from 'antd';
import modalLabel from './modalData';

class CenterModal extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      confirmLoading: false,
      // modalData: {},
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
    form.validateFields(err => {
      if (!err) {
        this.setState({
          confirmLoading: true,
        });
        setTimeout(() => {
          this.setState({
            visible: false,
            confirmLoading: false,
            // modalData: values,
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

  getModalTitle = type => {
    let modalTitle = '弹窗';
    switch (type) {
      case 'personInfo':
        modalTitle = '个人信息';
        break;
      case 'skills':
        modalTitle = '掌握技能';
        break;
      default:
        break;
    }
    return modalTitle;
  };

  FormContent = basicInfo => {
    let result;
    switch (basicInfo.type) {
      case 'input':
        result = <Input placeholder={`请输入你的${basicInfo.title}`} />;
        break;
      case 'select':
        result = (
          <Select>
            {basicInfo.values.map(item => (
              <Select.Option key={item}>{item}</Select.Option>
            ))}
          </Select>
        );
        break;
      default:
        break;
    }
    return result;
  };

  render() {
    const { visible, confirmLoading } = this.state;
    const { form, modalType, modalInitData } = this.props;
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };
    return (
      <Modal
        visible={visible}
        onOk={this.handleOk}
        destroyOnClose="true"
        onCancel={this.handleCancel}
        confirmLoading={confirmLoading}
        title={this.getModalTitle(modalType)}
      >
        {modalType === 'personInfo' ? (
          <Form>
            {modalLabel[modalType].map(item => (
              <Form.Item key={item.field} label={item.title} {...formItemLayout}>
                {getFieldDecorator(item.field, {
                  initialValue: modalInitData[item.field],
                  rules: [{ required: item.required, message: `请输入你的${item.title}!` }],
                })(this.FormContent(item))}
              </Form.Item>
            ))}
          </Form>
        ) : (
          <Form>
            <Form.Item label="test" {...formItemLayout}>
              {getFieldDecorator('input', { initialValue: '123' })(<Input />)}
            </Form.Item>
            )
          </Form>
        )}
      </Modal>
    );
  }
}

const CenterModalForm = Form.create({ name: 'CenterModalForm' })(CenterModal);
export default CenterModalForm;

/* // modalInitData[modalType].map(skillsItem => (
            //   <Form.Item key={skillsItem.id} label={skillsItem.item} {...formItemLayout}>
            //     {getFieldDecorator('progress', {})(
            //       <Progress percent={skillsItem.percent} />
            //     )}
            //   </Form.Item> */
