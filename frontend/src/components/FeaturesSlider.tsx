import {Swiper, SwiperSlide} from 'swiper/react'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/free-mode'

import { banners } from '../ts/data'

import { Pagination, Navigation} from 'swiper/modules'


function FeaturesSlider() {
    return (
        <div className='flex items-center justify-center flex-col mt-6'>
            <Swiper
                breakpoints={{
                    340: {
                       slidesPerView: 3,
                       spaceBetween: 20 
                    },
                    700: {
                        slidesPerView: 4,
                        spaceBetween: 20
                    }
                }}

                spaceBetween={100}
                modules={[ Pagination, Navigation]}
                pagination = {{
                    clickable: true
                }}
                scrollbar={{
                    draggable: true
                }}
                navigation={{
                    enabled: true
                }}
                className='max-w-full'  
            >
                {banners.map((item, i) => (
                    <SwiperSlide key={item.title}>
                        <div className={`flex flex-col gap-4 mb-20 group animate-fade-right animate-delay-100 relative shadow-lg text-white hover:scale-[1.01] hover:shadow-lg rounded-2xl transition-all px-6 py-8 h-[250px] w-[215px] lg:h-[500px] lg:w-[400px] overflow-hidden cursor-pointer`} >
                            <div
                                className="absolute inset-0 bg-cover bg-center"
                                style={{ backgroundImage: `url(${item.img})` }}
                            />
                            <div className="absolute inset-0 group-hover:opacity-50" />
                            <div className="relative flex flex-col gap-3 ">
                                <p className={`text-[12px] font-bold uppercase ${item.isWhite ? 'text-gray-500' : 'text-white'}`}>{item.product}</p>
                                <h1 className={`text-xl lg:text-2xl font-semibold ${item.isWhite ? 'text-black' : 'text-white'}`}>{item.title} </h1>
                                <p className={`text-xl lg:text-[18px] font-semibold ${item.isWhite ? 'text-black' : 'text-white'}`}>{item.description} </p>
                            </div>
                        </div>
                  </SwiperSlide>
                ))}
            </Swiper>

        </div>
    )
}

export default FeaturesSlider