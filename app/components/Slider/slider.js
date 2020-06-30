import React, { Component } from 'react';
import Slider from 'react-slick';

const SliderA = props => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: 'linear',
  };
  return <Slider {...settings}>{props && props.children}</Slider>;
};

export default SliderA;
