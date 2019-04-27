import React, { Component } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi/locale';
import { Checkbox, Alert, Form, Input, Modal, Icon, Tooltip } from 'antd';
import Login from '@/components/Login';
import styles from './Login.less';

const { Tab, UserName, Password, Mobile, Captcha, Submit } = Login;
@Form.create()
@connect(({ account, loading }) => ({
  account,
  submitting: loading.effects['account/login'],
}))
class LoginPage extends Component {
  state = {
    type: 'account',
    autoLogin: true,
    forgetModalState: false,
  };

  onTabChange = type => {
    this.setState({ type });
  };

  onGetCaptcha = () =>
    new Promise((resolve, reject) => {
      this.loginForm.validateFields(['mobile'], {}, (err, values) => {
        if (err) {
          reject(err);
        } else {
          const { dispatch } = this.props;
          dispatch({
            type: 'account/getCaptcha',
            payload: values.mobile,
          })
            .then(resolve)
            .catch(reject);
        }
      });
    });

  handleSubmit = (err, values) => {
    if (!err) {
      const { dispatch } = this.props;
      dispatch({
        type: 'account/login',
        payload: {
          ...values,
        },
      });
    }
  };

  changeAutoLogin = e => {
    this.setState({
      autoLogin: e.target.checked,
    });
  };

  renderMessage = content => (
    <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
  );

  handleForgetModalOk = () => {
    const { form } = this.props;
    // 忘记密码
    form.validateFields(err => {
      if (!err) {
        // dispatch({
        //   type: 'account/updatePassword',
        //   payload: {
        //     ...values,
        //     type,
        //   },
        // });
      }
    });
  };

  render() {
    const { form, account, submitting } = this.props;
    const { type, autoLogin, forgetModalState } = this.state;
    const { getFieldDecorator } = form;
    const itemLayout = {
      labelCol: {
        sm: {
          span: 24,
        },
        md: {
          span: 5,
        },
      },
      wrapperCol: {
        sm: {
          span: 24,
        },
        md: {
          span: 19,
        },
      },
    };
    return (
      <div className={styles.main}>
        <Login
          defaultActiveKey={type}
          onTabChange={this.onTabChange}
          onSubmit={this.handleSubmit}
          ref={i => {
            this.loginForm = i;
          }}
        >
          <Tab key="account" tab={formatMessage({ id: 'app.login.tab-login-credentials' })}>
            {account.status === 'error' &&
              account.type === 'account' &&
              !submitting &&
              this.renderMessage(formatMessage({ id: 'app.login.message-invalid-credentials' }))}
            <UserName
              name="username"
              // placeholder="username: admin or user"
              placeholder="请输入学号"
            />
            <Password
              name="password"
              // placeholder="password: ant.design"
              placeholder="请输入密码"
              onPressEnter={() => this.loginForm.validateFields(this.handleSubmit)}
            />
          </Tab>
          <Tab key="mobile" tab={formatMessage({ id: 'app.login.tab-login-mobile' })}>
            {account.status === 'error' &&
              account.type === 'mobile' &&
              !submitting &&
              this.renderMessage(
                formatMessage({ id: 'app.login.message-invalid-verification-code' })
              )}
            <Mobile name="mobile" />
            <Captcha
              name="captcha"
              countDown={120}
              onGetCaptcha={this.onGetCaptcha}
              getCaptchaButtonText={formatMessage({ id: 'form.captcha' })}
              getCaptchaSecondText={formatMessage({ id: 'form.captcha.second' })}
            />
          </Tab>
          <div>
            <Checkbox checked={autoLogin} onChange={this.changeAutoLogin}>
              <FormattedMessage id="app.login.remember-me" />
            </Checkbox>
            <a style={{ float: 'right' }} onClick={() => this.setState({ forgetModalState: true })}>
              <FormattedMessage id="app.login.forgot-password" />
            </a>
            {/* </Popconfirm> */}
          </div>
          <Submit loading={submitting}>
            <FormattedMessage id="app.login.login" />
          </Submit>
          <Modal
            width={420}
            visible={forgetModalState}
            title={<Tooltip title="不要再忘了">初始化密码</Tooltip>}
            className={styles.forgetPasswordModal}
            okText="确定"
            cancelText="取消"
            maskClosable="true"
            onOk={this.handleForgetModalOk}
            onCancel={() => {
              this.setState({
                forgetModalState: false,
              });
            }}
          >
            <Form>
              <Form.Item key="uCode" {...itemLayout} label="学号">
                {getFieldDecorator('uCode', {
                  initialValue: '',
                  rules: [{ required: true, message: '请输入你的学号!' }],
                })(
                  <Input
                    prefix={<Icon type="bulb" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="学号"
                  />
                )}
              </Form.Item>
              <Form.Item key="phoneNum" {...itemLayout} label="手机号">
                {getFieldDecorator('phoneNum', {
                  initialValue: '',
                  rules: [
                    { required: true, message: '请输入你的手机号!' },
                    { pattern: /^1\d{10}$/, message: '手机号格式不正确!' },
                  ],
                })(
                  <Input
                    prefix={<Icon type="mobile" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="手机号"
                  />
                )}
              </Form.Item>
              <Form.Item key="idcard" {...itemLayout} label="身份证">
                {getFieldDecorator('idcard', {
                  initialValue: '',
                  rules: [
                    { required: true, message: '请输入你的身份证!' },
                    // { pattern: /^1\d{10}$/, message: '手机号格式不正确!' },
                  ],
                })(
                  <Input
                    prefix={<Icon type="idcard" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="身份证"
                  />
                )}
              </Form.Item>
              <div className={styles.tips}>tips: 密码将被重置为603+学号</div>
            </Form>
          </Modal>
        </Login>
      </div>
    );
  }
}

export default LoginPage;
