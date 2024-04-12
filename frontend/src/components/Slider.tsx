import {Autoplay, Pagination} from 'swiper/modules'
import {Swiper, SwiperSlide} from 'swiper/react';
import "swiper/css"
import { banners } from '../ts/data';
import { Item } from '../Interfaces';
import Card from './Card';

function Slider() {
  return (
    <div>
      <div>
          <Swiper
              modules={[Pagination, Autoplay]}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false
              }}
              pagination={{
                el: ".pagination",
                clickable: true,
              }}
              slidesPerView={4}
              breakpoints={{
                "@0.00": {
                  slidesPerView: 1,
                  spaceBetween: 25,
                },
                "@0.50": {
                  slidesPerView: 1.25,
                  spaceBetween: 25,
                },
                "@1.00": {
                  slidesPerView: 2,
                  spaceBetween: 25,
                },
                "@1.25": {
                  slidesPerView: 2.5,
                  spaceBetween: 20,
                },
                "@1.50": {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
                "@1.75": {
                  slidesPerView: 4,
                  spaceBetween: 20,
                },
              }}
            >
              {banners.map((item: Item) => (
                <SwiperSlide key={item.product}>
                  <Card 
                    product={item.product} 
                    title={item.title} 
                    description={item.description} 
                    img={item.img} 
                    isColor={item.isWhite}/>
                </SwiperSlide>
              ))}
          </Swiper>
      </div>
      <div className='pagination' />
    </div>
  )
}

export default Slider
