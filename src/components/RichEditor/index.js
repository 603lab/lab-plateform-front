import React from 'react';
import { Icon, Card, Input, Tag, Tooltip, message } from 'antd';
// 引入编辑器组件
import BraftEditor from 'braft-editor';
// 引入编辑器样式
import 'braft-editor/dist/index.css';
import styles from './index.less';
import color from '@/utils/colors';

export default class EditorDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: ['React', '生命周期', '前端文章进阶系列一'],
      inputVisible: false,
      inputValue: '',
      saving: false,
      saveState: true,
      InitHtmlContent: '',
      // 创建一个空的editorState作为初始值
      editorState: BraftEditor.createEditorState(null),
    };
  }

  componentDidMount() {
    // 假设此处从服务端获取html格式的编辑器内容
    // const htmlContent = await fetchEditorContent();
    const InitContent = '';
    // 使用BraftEditor.createEditorState将html字符串转换为编辑器需要的editorStat
    const editorState = BraftEditor.createEditorState(InitContent);
    this.setState({
      InitHtmlContent: editorState.toHTML(), // 存储初始化内容用于判断是否需要保存
      editorState,
    });
  }

  // submitContent = async () => {
  //   const { editorState } = this.state;
  //   // 在编辑器获得焦点时按下ctrl+s会执行此方法
  //   // 编辑器内容提交到服务端之前，可直接调用editorState.toHTML()来获取HTML格式的内容
  //   const htmlContent = editorState.toHTML();
  //   // console.log('Rich Editor Content', htmlContent);
  // };

  handleEditorChange = newEditorState => {
    const { InitHtmlContent } = this.state;
    const { onChange } = this.props;
    const state = InitHtmlContent === newEditorState.toHTML();
    this.setState({
      saveState: state,
      editorState: newEditorState,
    });
    onChange(newEditorState.toHTML());
  };

  handleClose = removedTag => {
    const { tags } = this.state;
    const newTags = tags.filter(tag => tag !== removedTag);
    this.setState({ tags: newTags });
  };

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  handleInputConfirm = () => {
    const { inputValue } = this.state;
    let { tags } = this.state;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    this.setState({
      tags,
      inputVisible: false,
      inputValue: '',
    });
  };

  saveInputRef = input => {
    this.input = input;
  };

  handleEditorSave = () => {
    const { saveState, editorState } = this.state;
    if (saveState) return;
    this.setState({
      saving: true, // 保存中
      saveState: false, // 保存状态暂更为false,如果失败则变回true
    });

    setTimeout(() => {
      message.success('保存成功!');
      this.setState({
        saving: false, // 保存成功
        saveState: true, // 保存状更为false
        InitHtmlContent: editorState.toHTML(), // 更新初始化内容
      });
    }, 1200);
  };

  render() {
    const { tags, inputVisible, inputValue, saving, saveState, editorState } = this.state;
    const extendControls = [
      'separator',
      {
        key: 'tags', // 控件唯一标识，必传
        type: 'dropdown',
        title: '添加文章标签', // 指定鼠标悬停提示文案
        // className: styles.saveBtn, // 指定按钮的样式名
        html: null, // 指定在按钮中渲染的html字符串
        text: <span>标签</span>, // 指定按钮文字，此处可传入jsx，若已指定html，则text不会显示
        component: (
          <Card style={{ padding: 12 }}>
            {tags.map((tag, index) => {
              const isLongTag = tag.length > 5;
              const tagElem = (
                <Tag
                  key={tag}
                  color={color.category5[index]}
                  style={{ marginTop: 10 }}
                  // closable={index !== 0}
                  onClose={() => this.handleClose(tag)}
                >
                  {isLongTag ? `${tag.slice(0, 5)}...` : tag}
                </Tag>
              );
              return isLongTag ? (
                <Tooltip title={tag} key={tag}>
                  {tagElem}
                </Tooltip>
              ) : (
                tagElem
              );
            })}
            {inputVisible && (
              <Input
                ref={this.saveInputRef}
                type="text"
                size="small"
                style={{ width: 78 }}
                value={inputValue}
                onChange={this.handleInputChange}
                onBlur={this.handleInputConfirm}
                onPressEnter={this.handleInputConfirm}
              />
            )}
            {!inputVisible && (
              <Tag
                onClick={this.showInput}
                style={{ background: '#fff', borderStyle: 'dashed', marginTop: 10 }}
              >
                <Icon type="plus" /> New Tag
              </Tag>
            )}
          </Card>
        ),
      },
      {
        key: 'save-btn', // 控件唯一标识，必传
        type: 'button',
        title: saveState ? '文章已保存' : '文章尚未保存,请点击"保存"或"Ctrl+S"', // 指定鼠标悬停提示文案
        className: styles.saveBtn, // 指定按钮的样式名
        html: null, // 指定在按钮中渲染的html字符串
        text: (
          <span>
            保存
            {saveState ? '' : <b className={styles.noSavedIcon}>●</b>}
            {saving ? <Icon type="loading" style={{ marginLeft: 5 }} /> : ''}
          </span>
        ), // 指定按钮文字，此处可传入jsx，若已指定html，则text不会显示
        onClick: () => {
          this.handleEditorSave();
        },
      },
    ];
    return (
      <BraftEditor
        value={editorState}
        extendControls={extendControls}
        onSave={this.handleEditorSave}
        onChange={this.handleEditorChange}
      />
    );
  }
}
