import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';
import MenuDoc from './DocMenu';
import ContentDoc from './ContentDoc';

export default class Encyclopedia extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentTabs: {},
      selectMenuData: {},
    };
  }

  handleSelect = menu => {
    this.setState({
      selectMenuData: menu,
    });
  };

  handleCurrentTabs = currentTabs => {
    this.setState({
      currentTabs,
    });
  };

  render() {
    const { currentTabs, selectMenuData } = this.state;
    return (
      <Row>
        <Col span={4}>
          <MenuDoc
            currentTabs={currentTabs}
            onSelect={this.handleSelect}
            getCurrentMenu={this.handleCurrentTabs}
          />
        </Col>
        <Col span={20}>
          <ContentDoc selectMenu={selectMenuData} getCurrentTabs={this.handleCurrentTabs} />
        </Col>
      </Row>
    );
  }
}
