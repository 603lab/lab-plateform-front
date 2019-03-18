import React from 'react';
import { Card } from 'antd';

export default class CommisionWork extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Card title="文章" style={{ marginTop: 10 }}>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
    );
  }
}
