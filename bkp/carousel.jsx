import '../styles/carousel.css';
import { Helmet } from 'react-helmet-async';
import { useEffect, useRef } from 'react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import credicard from '../assets/images/credicard_of_millions.png';
import openAccount from '../assets/images/open_account.png';
import raspadinha from '../assets/images/raspadinha.png';
import loan from '../assets/images/take_a_loan.png';
import family from '../assets/images/family.jpeg';
import meeting from '../assets/images/business_meeting.jpeg';
import fun from '../assets/images/fun.jpeg';

export default function Index() {
  const carouselRef = useRef(null);

  useEffect(() => {
    if (!carouselRef.current) {
      return undefined;
    }

    const swiper = new Swiper(carouselRef.current, {
      modules: [Navigation, Pagination, Autoplay],
      loop: true,
      autoplay: {
        delay: 7000,
        disableOnInteraction: false,
      },
      pagination: {
        el: carouselRef.current.querySelector('.swiper-pagination'),
        clickable: true,
      },
      navigation: {
        nextEl: carouselRef.current.querySelector('.swiper-button-next'),
        prevEl: carouselRef.current.querySelector('.swiper-button-prev'),
      },
    });

    return () => {
      swiper.destroy();
    };
  }, []);
  return (
    <div className="w-full">
      <Helmet>
        <title>Internet Banking</title>
      </Helmet>

      <div className="mt-24 flex flex-col items-center">
        <p>sample text</p>
      </div>

      <div className="max-w-2xl m-auto">
        <div
          ref={carouselRef}
          className="swiper default-carousel swiper-container rounded-2xl"
        >
          <div className="swiper-wrapper">
            <div className="swiper-slide">
              <div className="bg-indigo-50 rounded-2xl flex justify-center items-center">
                <span className="text-3xl font-semibold text-indigo-600">
                  <img
                    src={openAccount}
                    alt="Abra sua conta"
                    className="w-full h-[350px] object-cover rounded-2xl"
                  />
                </span>
              </div>
            </div>
            <div className="swiper-slide">
              <div className="bg-indigo-50 rounded-2xl flex justify-center items-center">
                <span className="text-3xl font-semibold text-indigo-600">
                  <img
                    src={loan}
                    alt="Empréstimos"
                    className="w-full h-[350px] object-cover rounded-2xl"
                  />
                </span>
              </div>
            </div>
            <div className="swiper-slide">
              <div className="bg-indigo-50 rounded-2xl flex justify-center items-center">
                <span className="text-3xl font-semibold text-indigo-600">
                  <img
                    src={credicard}
                    alt="Solicite seu cartão"
                    className="w-full h-[350px] object-cover rounded-2xl"
                  />
                </span>
              </div>
            </div>
            <div className="swiper-slide">
              <div className="bg-indigo-50 rounded-2xl flex justify-center items-center">
                <span className="text-3xl font-semibold text-indigo-600">
                  <img
                    src={raspadinha}
                    alt="Participe da raspadinha"
                    className="w-full h-[350px] object-cover rounded-2xl"
                  />
                </span>
              </div>
            </div>
          </div>
          <div className="swiper-pagination"></div>
        </div>
      </div>
      <div className="flex flex-col presenting">
        <div className="flex slide-1st">
          <div className="w-[50%] border-black">
            {/* texto1 */}
            <p>try-it</p>
          </div>
          <div className="max-w-[50%]">
            {/* foto1 */}
            <img src={family} alt="family" />
          </div>
        </div>

        <div className="flex slide-2nd">
          <div className="max-w-[50%]">
            {/* foto2 */}
            <img src={meeting} alt="meeting" />
          </div>
          <div className="w-[50%] border-black">
            {/* texto2 */}

            <p>try-it</p>
          </div>
        </div>

        <div className="flex slide-1st">
          <div className="w-[50%] border-black">
            {/* texto3 */}
            <p>try-it</p>
          </div>
          <div className="max-w-[50%]">
            {/* foto3 */}
            <img src={fun} alt="fun" />
          </div>
        </div>
      </div>
    </div>
  );
}
