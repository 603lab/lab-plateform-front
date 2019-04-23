import React from 'react';
import { Icon, message } from 'antd';
// 引入编辑器组件
import BraftEditor from 'braft-editor';
// 引入编辑器样式
import 'braft-editor/dist/index.css';
import styles from './index.less';

export default class EditorDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
    const { saving, saveState, editorState } = this.state;
    const extendControls = [
      'separator',
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
