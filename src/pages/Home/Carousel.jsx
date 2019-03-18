import React from 'react';
import { Carousel } from 'antd';
import styles from './Carousel.less';

class HomeCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Carousel autoplay effect="fade" style={{ height: 250 }}>
        <div className={styles.carousel_bg}>
          <h3>1</h3>
        </div>
        <div className={styles.carousel_bg}>
          <h3>2</h3>
        </div>
        <div className={styles.carousel_bg}>
          <h3>3</h3>
        </div>
        <div className={styles.carousel_bg}>
          <h3>4</h3>
        </div>
      </Carousel>
    );
  }
}

export default HomeCarousel;
