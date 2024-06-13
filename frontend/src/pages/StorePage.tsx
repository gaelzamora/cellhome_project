import iconSupport from '../assets/support.jpg'
import Slider from "../components/Slider"
import { Link } from "react-router-dom"
import { adds, banners } from "../ts/data"
import { categories } from "../ts/data"
import {useIntersection} from '../hooks/useIntersection'
import {motion} from 'framer-motion'
import withScrollToTop from '../layouts/withScrollToTop'

function StorePage() {
  const [elementRef, isIntersecting] = useIntersection({
    threshold: 0.5,
  })

  return (
    <div className="lg:px-32 md:px-16 px-2">
      <header className="grid-cols-[200px_minmax(900px,_1fr)_100px]">
        <section className="py-20 relative transition-all duration-200 delay-200 animate-fade-down">
          <div className="lg:w-[45%]">
            <p className="text-gray-500 tracking-tighter text-[3em] font-bold"><span className="text-black">Store.</span> The best way to buy the
            products you love.</p>
          </div>
          <div className="lg:absolute gap-3 z-10 right-0 lg:top-24 md:flex-col">
            <div className="flex gap-3">
              <img src={iconSupport} className="w-9 h-9 mt-2"/>
              <div className="mb-2">
                <p className="font-bold">Need shopping help?</p>
                <a href="/" className="text-blue-700">Ask a Specialist</a>
              </div>
            </div>
            <div className="flex">
              <div>
                <p className="font-bold">Visit an Apple Store</p>
                <a href="/" className="text-blue-700">Find one near you</a>
              </div>
            </div>
          </div>
        </section>
      </header>
      <section className=" flex gap-2 mx-auto transition-all delay-200 duration-200 animate-fade-right" >
        {categories.map(categorie => (
          <Link to=''>
            <Link to={`${categorie.link}`} className="text-center text-gray-700 font-semibold">
              <img src={categorie.image} alt="itemimage" className="w-32 mb-3" />
              <p>{categorie.name}</p>
            </Link>
          </Link>
        ))}
      </section>
      <section className="mt-20  transition-all delay-200 duration-200 animate-fade-right">
          <p className="text-gray-500 font-bold text-[1.7em]"><span className="text-black">The latest.</span> Take a look at what's new, right now.</p>
          <div className="overflow-x-hidden">
            <div className="sticky top-0 pb-4 mt-4 ">
              <Slider items={banners} />
            </div>
          </div>
      </section>

      <motion.div
        ref={elementRef}
        initial={{ y: 10, opacity: 0 }}
        animate={isIntersecting ? { y: 0, opacity: 1 } : {}}
        exit={{ y: -10, opacity: 0 }}
        transition={{ duration: 2 }}
      >
        <p 
            className={`mt-16 text-gray-500 font-bold text-[1.7em]`}
        >
            <span className={`text-black`}>
              Loud and clear.
            </span> Unparalleled choices for rich, high-quality sound.
        </p>
          
        <section 
          className={`grid md:grid-cols-3 auto-rows-[300px] gap-4`} 
        >
                {adds.map((add, i) => (
                    <Link
                      to={add.link} 
                      key={i}
                      className={`w-full h-full bg-center bg-cover rounded-md hover:scale-[1.0] delay-200 duration-200 hover:shadow-xl ${i===2 || i===3 ? 'row-span-2' : ''}`} 
                      style={{ backgroundImage: `url(${add.image})` }}
                    >
                    </Link>
                ))}
        </section>
      </motion.div>
      
    </div>
  )
}

export default withScrollToTop(StorePage)
