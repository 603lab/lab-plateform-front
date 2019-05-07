import React, { PureComponent } from 'react';
import { Form, Tooltip, Icon, TreeSelect } from 'antd';
import isArray from 'lodash/isArray';
import { connect } from 'dva';

// const TreeNode = TreeSelect.TreeNode;

@connect(({ loading, doc }) => ({
  initloading: loading.effects['doc/fetchMenu'],
  menu: doc.menu,
}))
class ChooseTree extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      treeSelect: '',
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'doc/fetchMenu',
      payload: {},
    });
  }

  resolveDeepMenu = deepMenu => {
    const result = [];
    isArray(deepMenu) &&
      deepMenu.forEach(item => {
        const { fileName: title, id: value } = item;
        // 公共参数
        const c = {
          title,
          value,
          key: value,
        };
        if (item.childrenList.length) {
          result.push({
            ...c,
            children: this.resolveDeepMenu(item.childrenList),
          });
        } else {
          result.push({
            ...c,
            children: [],
          });
        }
      });
    return result;
  };

  getTreeData = (menu = []) => {
    const treeValue = [];
    // 第一层区分
    menu &&
      menu.forEach(item => {
        const { fileName, id } = item;
        treeValue.push({
          title: fileName,
          key: id,
          value: id,
          children: this.resolveDeepMenu(item.childrenList),
        });
      });
    return treeValue;
  };

  handleTreeSelect = () => {
    // console.log('keys', keys);
    // console.log('e', e);
  };

  handleTreeSearch = () => {
    // console.log('param1', param1);
    // console.log('param2', param2);
  };

  render() {
    const { treeSelect } = this.state;
    const { form, initloading, menu } = this.props;
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        md: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 20 },
        md: { span: 15 },
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
              // labelInValue // 返回值加上value
              // treeDefaultExpandAll
              placeholder="请选择文章分支"
              treeData={this.getTreeData(menu)}
              onSelect={this.handleTreeSelect}
              onSearch={this.handleTreeSearch}
              // showCheckedStrategy={TreeSelect.SHOW_ALL}
              suffixIcon={initloading && <Icon type="loading" />}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            />
          )}
        </Form.Item>
      </Form>
    );
  }
}
const WrapperChooseTreeForm = Form.create({ name: 'ChooseTreeForm' })(ChooseTree);
export default WrapperChooseTreeForm;
