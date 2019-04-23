import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';
import MenuDoc from './DocMenu';
import ContentDoc from './ContentDoc';

export default class Encyclopedia extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Row>
        <Col span={4}>
          <MenuDoc />
        </Col>
        <Col span={20}>
          <ContentDoc />
        </Col>
      </Row>
    );
  }
}
