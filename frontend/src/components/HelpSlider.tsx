import {Swiper, SwiperSlide} from 'swiper/react'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/free-mode'

import { helpBanners } from '../ts/data'

import { Pagination, Navigation} from 'swiper/modules'


function HelpSlider() {
    return (
        <div className='flex items-center justify-center flex-col mt-6'>
            <Swiper
                breakpoints={{
                    340: {
                       slidesPerView: 3,
                       spaceBetween: 100 
                    },
                    700: {
                        slidesPerView: 3,
                        spaceBetween: 60
                    }
                }}

                spaceBetween={50}
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
                {helpBanners.map((item) => (
                    <SwiperSlide key={item.title}>
                        <div className="flex flex-col gap-6 mb-20 group relative animate-fade-right animate-delay-100 shadow-lg text-white rounded-2xl transition-all px-6 py-8 h-[250px] w-[215px] lg:h-[500px] lg:w-[500px] overflow-hidden cursor-pointer">
                            <div
                                className="absolute inset-0 bg-cover bg-center"
                                style={{ backgroundImage: `url(${item.img})` }}
                            />
                            <div className="absolute inset-0 group-hover:opacity-50" />
                            <div className="relative flex flex-col gap-3 ">
                                <p className={`text-[12px] font-bold uppercase ${item.isColor ? 'text-gray-500' : 'text-[#da5858]'}`}>{item.type}</p>
                                <h1 className={`text-xl lg:text-2xl font-semibold ${item.isColor ? 'text-black' : 'text-white'}`}>{item.title} </h1>
                                <p className={`text-xl lg:text-[18px] font-semibold ${item.isColor ? 'text-black' : 'text-white'}`}>{item.description} </p>
                            </div>
                        </div>
                  </SwiperSlide>
                ))}
            </Swiper>

        </div>
    )
}

export default HelpSlider