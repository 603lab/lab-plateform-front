import React from 'react';
import { Carousel } from 'antd';
import styles from './Carousel.less';
import CarouselFrist from '../../../public/01.png';
import CarouselSec from '../../../public/02.png';
import CarouselThr from '../../../public/03.png';
import CarouselFour from '../../../public/04.png';

class HomeCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Carousel autoplay effect="fade" style={{ height: 250 }}>
        <div className={styles.carousel_bg}>
          <img src={CarouselFrist} alt="01" />
        </div>
        <div className={styles.carousel_bg}>
          <img src={CarouselSec} alt="02" />
        </div>
        <div className={styles.carousel_bg}>
          <img src={CarouselThr} alt="03" />
        </div>
        <div className={styles.carousel_bg}>
          <img src={CarouselFour} alt="04" />
        </div>
      </Carousel>
    );
  }
}

export default HomeCarousel;
