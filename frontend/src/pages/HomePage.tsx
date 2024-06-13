import bgApple from '../assets/apple_bg.jpg'
import bgAppleWhite from '../assets/apple-bg-white.jpg'
import bgAirpods from '../assets/airpods-pro.jpeg'
import bgAppleWatchs from '../assets/applewatchs.jpeg'

import { Link } from 'react-router-dom'
import {Typewriter} from 'react-simple-typewriter'
import {motion} from 'framer-motion'
import {useIntersection} from '../hooks/useIntersection'
import withScrollToTop from '../layouts/withScrollToTop'

function HomePage() {
  const [primaryImage, isIntersectingPrimaryImage] = useIntersection({
    threshold: 1,
  })

  const [imageRef, isIntersectingImage] = useIntersection({
    threshold: 1,
  })

  const [secondImage, isIntersectingSecondImage] = useIntersection({
    threshold: 1,
  })

  const [threeImage, isIntersectingThreeImage] = useIntersection({
    threshold: 1,
  })

  return (
    <div className='z-30 overflow-x-hidden'>
      <section className='mx-auto text-center mb-14'>
        <Link to='/store' className='pb-0'>  
          <div
          className='relative text-center cursor-pointer animate-fade-up animate-duration-1000 animate-delay-500'>
              <motion.h1 
                ref={primaryImage}
                initial={{ opacity: 0, y: 50 }}
                animate={isIntersectingPrimaryImage ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
                className='text-4xl font-semibold tracking-tight sm:text-7xl absolute text-black top-72 w-screen text-center '>
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
              </motion.h1>
            <img  
            className="object-cover h-[700px]"
            src={bgAppleWhite} 
            alt="" 
            />
          </div>
        </Link >
        <div
        className='relative animate-fade-up animate-duration-1000 animate-delay-500'>
          <motion.div  
            ref={imageRef}
            initial={{ opacity: 0, y: 50 }}
            animate={isIntersectingImage ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 2 }}
            className='absolute text-gray-200 p-10 w-screen text-center top-24 '
            >
            <p className='text-[4em] tracking-tighter'>iPhone 15 Pro</p>
            <p className='text-[2em] tracking-tighter'>Titanio. Tan resistente y ligero. Tan Pro.</p>
            <div className='flex gap-4 items-center justify-center mt-4'>
              <a href="" className='text-blue-500'>Más informacion{' >'}</a>
              <a href="" className='text-blue-500'>Comprar{' >'}</a>
            </div>
          </motion.div>
          <img 
          className='object-cover h-screen'
          src={bgApple}
          />

        </div>
        <Link to='/store'>
          <div
            className='relative text-center inline-block cursor-pointer w-screen animate-fade-up animate-duration-1000 animate-delay-500'>
            <motion.div 
              ref={secondImage}
              initial={{ opacity: 0, y: 50 }}
              animate={isIntersectingSecondImage ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 2 }}
              className='absolute text-gray-200 p-10 w-screen text-center top-16 '
            >
              <p className='text-[4em] tracking-tighter'>AirPods Pro</p>
              <p className='text-[2em] tracking-tighter'>Audio Adaptivo. Escucha la diferencia.</p>
              <div className='flex gap-4 items-center justify-center mt-4'>
                <a href="" className='text-blue-500 hover:underline transition-all'>Más informacion{' >'}</a>
                <a href="" className='text-blue-500 hover:underline transition-all'>Comprar{' >'}</a>
              </div>
            </motion.div>
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
            <motion.div 
              ref={threeImage}
              initial={{ opacity: 0 }}
              animate={isIntersectingThreeImage ? { opacity: 1} : {}}
              transition={{
                duration: 2
              }}  
              className='absolute text-black p-10 w-screen text-center top-16 '
            >
              <p className='text-[4em] tracking-tighter'>AirPods Pro</p>
              <p className='text-[2em] tracking-tighter'>Audio Adaptivo. Escucha la diferencia.</p>
              <div className='flex gap-4 items-center justify-center mt-4'>
                <a href="" className='text-blue-500 hover:underline transition-all'>Más informacion{' >'}</a>
                <a href="" className='text-blue-500 hover:underline transition-all'>Comprar{' >'}</a>
              </div>
            </motion.div>
            <img  
            className="object-cover h-screen"
            src={bgAppleWatchs} 
            alt="" 
            />
          </div>
        </Link>
      </section>

    </div>
  )
}

export default withScrollToTop(HomePage)
