import React from 'react';
import { Card } from 'antd';

export default class CommisionWork extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Card title="全部公告" style={{ height: 250 }}>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
    );
  }
}
