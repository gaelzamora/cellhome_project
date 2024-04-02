import bgApple from '../assets/apple_bg.jpg'
import bgAppleWhite from '../assets/apple-bg-white.jpg'
import bgAirpods from '../assets/airpods-pro.jpeg'
import bgAppleWatchs from '../assets/applewatchs.jpeg'

import { Link } from 'react-router-dom'
import {Typewriter} from 'react-simple-typewriter'

function HomePage() {

  return (
    <div className='z-30 overflow-x-hidden'>
      <section className='mx-auto text-center mb-14'>
        <Link to='/store' className='pb-0'>  
          <div
          className='relative text-center cursor-pointer animate-fade-up animate-duration-1000 animate-delay-500'>
              <h1 className='text-4xl font-semibold tracking-tight sm:text-7xl absolute text-black top-72 w-screen text-center '>
                Compra {' '}
                <Typewriter 
                  words={['iPhone', 'iPad', 'AppleWatch', 'Mac' ,'Accesorios']}
                  loop={0}
                  cursor
                  cursorStyle='_'
                  typeSpeed={120}
                  deleteSpeed={50}
                  delaySpeed={1000}
                />
              </h1>
            <img  
            className="object-cover h-[700px]"
            src={bgAppleWhite} 
            alt="" 
            />
          </div>
        </Link >
        <div
        className='relative animate-fade-up animate-duration-1000 animate-delay-500'>
          <div className='absolute text-gray-200 p-10 w-screen text-center top-24 '>
            <p className='text-[4em] tracking-tighter'>iPhone 15 Pro</p>
            <p className='text-[2em] tracking-tighter'>Titanio. Tan resistente y ligero. Tan Pro.</p>
            <div className='flex gap-4 items-center justify-center mt-4'>
              <a href="" className='text-blue-500'>Más informacion{' >'}</a>
              <a href="" className='text-blue-500'>Comprar{' >'}</a>
            </div>
          </div>
          <img 
          className='object-cover h-screen'
          src={bgApple}
          />

        </div>
        <Link to='/store'>
          <div
            className='relative text-center inline-block cursor-pointer w-screen animate-fade-up animate-duration-1000 animate-delay-500'>
            <div className='absolute text-gray-200 p-10 w-screen text-center top-16 '>
              <p className='text-[4em] tracking-tighter'>AirPods Pro</p>
              <p className='text-[2em] tracking-tighter'>Audio Adaptivo. Escucha la diferencia.</p>
              <div className='flex gap-4 items-center justify-center mt-4'>
                <a href="" className='text-blue-500 hover:underline transition-all'>Más informacion{' >'}</a>
                <a href="" className='text-blue-500 hover:underline transition-all'>Comprar{' >'}</a>
              </div>
            </div>
            <img  
            className="object-cover h-screen"
            src={bgAirpods} 
            alt="" 
            />
          </div>
        </Link>
        <Link to='/store'>
          <div
            className='relative text-center inline-block cursor-pointer w-screen animate-fade-up animate-duration-1000 animate-delay-500'>
            <div className='absolute text-black p-10 w-screen text-center top-16 '>
              <p className='text-[4em] tracking-tighter'>AirPods Pro</p>
              <p className='text-[2em] tracking-tighter'>Audio Adaptivo. Escucha la diferencia.</p>
              <div className='flex gap-4 items-center justify-center mt-4'>
                <a href="" className='text-blue-500 hover:underline transition-all'>Más informacion{' >'}</a>
                <a href="" className='text-blue-500 hover:underline transition-all'>Comprar{' >'}</a>
              </div>
            </div>
            <img  
            className="object-cover h-screen"
            src={bgAppleWatchs} 
            alt="" 
            />
          </div>
        </Link>
      </section>

      <section className='w-[50%] mx-auto mb-14'>
        <div className='grid auto-rows-[192px] grid-cols-3 gap-4'>
          {[...Array(7)].map((_, i) => (
            <div
              key={i}
              className={`row-span-1 rounded-xl border-2 border-slate-400/10 bg-black-100 p-4 dark:bg-neutral-900 ${i==3 || i == 6 ? "col-span-2" : ""}`}
            >

            </div>
          ))}


        </div>
      </section>
    </div>
  )
}

export default HomePage
