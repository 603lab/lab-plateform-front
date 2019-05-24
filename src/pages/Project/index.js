import React, { PureComponent } from 'react';
// import { message } from 'antd';
import CoverCardList from './Projects';

export default class ProjectPage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    // message.success('更多功能后续开放');
  }

  render() {
    return (
      <div>
        <CoverCardList />
      </div>
    );
  }
}
