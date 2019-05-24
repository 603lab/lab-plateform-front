import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';
import { Router, Route, Switch } from 'dva/router';
import { createBrowserHistory } from 'history';
import ToolsMenu from './ToolsMenu';
import Flow from './Editor/GGEditor/Flow';
import Mind from './Editor/GGEditor/Mind';
import Koni from './Editor/GGEditor/Koni';
import Home from './Home';

export default class Tools extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Router history={createBrowserHistory()}>
        <Row>
          <Col span={4}>
            <ToolsMenu />
          </Col>
          <Col span={20}>
            {/* <ContentDoc selectMenu={selectMenuData} getCurrentTabs={this.handleCurrentTabs} /> */}
            {/* <div style={{ height: '90vh' }}> */}
            <Switch>
              <Route exact path="/editor" component={Home} />
              <Route path="/editor/flow" component={Flow} />
              <Route path="/editor/mind" component={Mind} />
              <Route path="/editor/koni" component={Koni} />
            </Switch>
            {/* </div> */}
          </Col>
        </Row>
      </Router>
    );
  }
}
