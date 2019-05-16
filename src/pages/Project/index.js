import React, { PureComponent } from 'react';
import { message } from 'antd';

export default class ProjectPage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    message.success('后续开放');
  }

  render() {
    return <div>603Platform 二期开放</div>;
  }
}
