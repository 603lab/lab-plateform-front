import React, { PureComponent } from 'react';
import { Form, Tooltip, Icon, Input, Alert } from 'antd';
import styles from './CreateTree.less';

class CreateTree extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      newTreePath: '',
    };
  }

  render() {
    const { newTreePath } = this.state;
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        md: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        md: { span: 17 },
      },
    };
    return (
      <>
        <Alert
          message="路径格式：大前端/React。不支持新增一级目录。"
          className={styles.topAlert}
          closable="true"
          closeText="知道了"
        />
        <Form>
          <Form.Item
            {...formItemLayout}
            label={
              <span>
                文章目录&nbsp;
                <Tooltip title="填写至上层父级,请注意分类规范">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            }
          >
            {getFieldDecorator('newTreePath', {
              initValue: newTreePath || '',
              rules: [{ required: true, message: '请选择文章对应分支' }],
            })(<Input />)}
          </Form.Item>
        </Form>
      </>
    );
  }
}
const WrapperCreateTreeForm = Form.create({ name: 'CreateTreeForm' })(CreateTree);
export default WrapperCreateTreeForm;
