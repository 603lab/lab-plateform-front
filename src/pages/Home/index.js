import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';
import CarouselComp from './Carousel';
import NoticeCard from './NoticeCard';
import ArticleCard from './ArticleCard';
import CommisionWork from './CommisionWork';
// import styles from './index.less';

export default class Home extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <>
        <Row>
          <Col span={14}>
            <CarouselComp />
            <CommisionWork />
          </Col>
          <Col span={10} style={{ paddingLeft: 10 }}>
            <NoticeCard />
            <ArticleCard />
          </Col>
        </Row>
      </>
    );
  }
}
