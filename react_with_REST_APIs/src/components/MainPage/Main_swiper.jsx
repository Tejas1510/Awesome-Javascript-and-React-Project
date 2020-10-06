import React from 'react';
import Swiper from 'react-id-swiper';
import 'swiper/swiper.scss'
import Aboutus from './Aboutus';
import swiper from '../../media/swiper.gif'
import Contact from './Contact';
import Insight from './Insight';

const Main_Swiper = () => {
    const params = {
        effect: 'cube',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true
        },
        pagination: {
            el: '.swiper-pagination'
        }
    }
    return (
        <>
           <p className="main_swiper"><img src={swiper} alt=""/></p>
           <br/>
            <Swiper {...params}>
                <div><Aboutus /></div>
                <div><Insight /></div>
                <div><Contact /></div>
            </Swiper>
        </>
    )
};
export default Main_Swiper;