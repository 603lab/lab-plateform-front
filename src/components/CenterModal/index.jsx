import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Modal, Form, Input, message, Select, Cascader } from 'antd';
import modalLabel from './modalData';

@connect(({ loading }) => ({
  loading: loading.effects['user/updateUserInfo'],
}))
@Form.create()
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

  static getDerivedStateFromProps(nextProps) {
    return {
      visible: nextProps.modalState,
    };
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    const { form, onCloseModal, dispatch } = this.props;
    form.validateFields(err => {
      if (!err) {
        this.setState({
          confirmLoading: true,
        });
        dispatch({
          type: 'user/updateInfo',
          payload: {
            ...form.getFieldsValue(),
            uCode: '150701206',
          },
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
      case 'cascader':
        result = <Cascader options={modalLabel.directionOptions} />;
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
                  initialValue:
                    item.type === 'cascader'
                      ? ['developMonkey', 'frontEnd', 'react']
                      : modalInitData[item.field],
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

export default CenterModal;

/* // modalInitData[modalType].map(skillsItem => (
            //   <Form.Item key={skillsItem.id} label={skillsItem.item} {...formItemLayout}>
            //     {getFieldDecorator('progress', {})(
            //       <Progress percent={skillsItem.percent} />
            //     )}
            //   </Form.Item> */
