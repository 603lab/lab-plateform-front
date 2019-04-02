import React, { PureComponent } from 'react';
import { Form, Tooltip, Icon, TreeSelect } from 'antd';

const TreeNode = TreeSelect.TreeNode;

class ChooseTree extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      treeSelect: '',
    };
  }

  handleTreeChange = () => {
    // console.log('param1', param1);
    // console.log('param2', param2);
    // console.log('param3', param3);
  };

  handleTreeSearch = () => {
    // console.log('param1', param1);
    // console.log('param2', param2);
  };

  render() {
    const { treeSelect } = this.state;
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
      <Form>
        <Form.Item
          {...formItemLayout}
          label={
            <span>
              文章目录&nbsp;
              <Tooltip title="除一级目录外，其他位置任意新建，但请注意分类的规范">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator('fileAdress', {
            initValue: treeSelect || '',
            rules: [{ required: true, message: '请选择文章对应分支' }],
          })(
            <TreeSelect
              showSearch
              allowClear
              treeDefaultExpandAll
              onChange={this.handleTreeChange}
              onSearch={this.handleTreeSearch}
              placeholder="请选择文章分支"
              showCheckedStrategy={TreeSelect.SHOW_ALL}
              // dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            >
              <TreeNode value="parent 1" title="parent 1" key="0-1">
                <TreeNode value="parent 1-0" title="parent 1-0" key="0-1-1">
                  <TreeNode value="leaf1" title="my leaf" key="random" />
                  <TreeNode value="leaf2" title="your leaf" key="random1" />
                </TreeNode>
                <TreeNode value="parent 1-1" title="parent 1-1" key="random2">
                  <TreeNode
                    value="sss"
                    title={<b style={{ color: '#08c' }}>sss</b>}
                    key="random3"
                  />
                </TreeNode>
              </TreeNode>
            </TreeSelect>
          )}
        </Form.Item>
      </Form>
    );
  }
}
const WrapperChooseTreeForm = Form.create({ name: 'ChooseTreeForm' })(ChooseTree);
export default WrapperChooseTreeForm;
