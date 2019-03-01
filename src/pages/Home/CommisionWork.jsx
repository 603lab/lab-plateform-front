import React from 'react';
import { Card } from 'antd';

export default class CommisionWork extends React.Component {
  constructor(args) {
    super(args);

    this.state = {};
  }

  render() {
    return (
      <Card title="待办工作" style={{ marginTop: 6 }}>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
    );
  }
}
