import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Modal, Slider, Form, Input, message, Select, Cascader, Button } from 'antd';
import modalLabel from '@/utils/userStatisticData';
import styles from './index.less';

@connect(({ loading }) => ({
  loading: loading.effects['user/updateUserInfo'],
}))
@Form.create()
class CenterModal extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      // skillsData: [],
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

  handleOk = modalType => {
    const { form, onCloseModal, dispatch } = this.props;
    form.validateFields(err => {
      if (!err) {
        this.setState({
          confirmLoading: true,
        });
        if (modalType === 'personInfo') {
          // 更新个人信息
          dispatch({
            type: 'user/updateInfo',
            payload: {
              ...form.getFieldsValue(),
              uCode: '150701206',
            },
          });
        } else {
          // 更新技能
          dispatch({
            type: 'user/updateSkills',
            payload: {
              skillList: [...form.getFieldsValue()],
              createUserCode: '150701206',
              createUserName: '陆仁杰',
            },
          });
        }
      } else {
        message.error(`提交失败 ${err}`);
      }
      setTimeout(() => {
        this.setState({
          visible: false,
          confirmLoading: false,
          // modalData: values,
        });
        onCloseModal();
      }, 1000);
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
    const { form, skills = [], modalType, modalInitData } = this.props;
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
    const skillsTab = initialValue => (
      <Input
        // changeOnSelect
        // placeholder="请选择"
        defaultValue={[initialValue]}
        className={styles.cascaderWrapper}
        // options={modalLabel.directionOptions}
        // displayRender={label => label[label.length - 1]}
      />
    );
    return (
      <Modal
        visible={visible}
        onOk={() => this.handleOk(modalType)}
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
            {skills.map(skill => (
              <Form.Item key={skill.id} label={skillsTab(skill.item)} {...formItemLayout}>
                {getFieldDecorator(skill.item, { initialValue: skill.percent })(<Slider />)}
              </Form.Item>
            ))}
            <Button type="primary" onClick={this.handleAddSkill}>
              添加
            </Button>
            {/* <Button shape="circle" icon="plus" /> */}
            {/* <Form.Item key="newTab" label={skillsTab('')} {...newSkillsFormItemLayout}>
              {getFieldDecorator('newTab', { initialValue: 0 })(<Slider />)}
            </Form.Item> */}
          </Form>
        )}
      </Modal>
    );
  }
}

export default CenterModal;
