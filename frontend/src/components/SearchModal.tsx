import { AnimatePresence, motion } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { HiSearch } from 'react-icons/hi';
import { useQuery } from '@tanstack/react-query';
import { search_products } from '../api/products';
import { Product } from '../Interfaces';
import { Loader } from './Loader';
import {ArrowRightIcon} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

type ModalProps = {
  isOpen: boolean;
  setOpen: (state: boolean) => void;
};

const backdropVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 }
};

const modalVariants = {
  hidden: {
    y: "-100%",
    scale: 0.8,
    opacity: 0,
  },
  visible: {
    y: 0,
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 30 },
  },
  exit: {
    y: "-100%",
    opacity: 0,
    transition: { duration: 0.3 }
  },
};

const itemVariant = {
  hidden: {
    opacity: 0
  },
  visible: ({delay}: any) => ({
    opacity: 1,
    transition: {
      delay,
      duration: 1
    }
  })
}

const SearchModal: React.FC<ModalProps> = ({ isOpen, setOpen }) => {

  const [search, setSearch] = useState('')

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

  }, [isOpen]);

  const {data, isLoading} = useQuery({
    queryKey: ["products", search],
    queryFn: () => {
      if(search) return search_products(search)
      return {products: []}
    }
  })

  return (
    <AnimatePresence mode='wait'>
      {isOpen && (
        <>
          <motion.div
            className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40"
            initial={{ backdropFilter: 'blur(0px)' }}
            animate={{ backdropFilter: 'blur(10px)' }}
            exit={{ backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.3 }}
          />

          {/* Modal content */}
          <motion.div
            className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <motion.div 
              className="bg-white p-8 rounded-lg shadow-lg w-3/6 h-5/6 mx-auto relative"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <XMarkIcon 
                className="w-7 h-7 absolute right-7 top-7 cursor-pointer" 
                onClick={() => setOpen(false)} 
              />

              <motion.h1 className="text-2xl font-semibold ml-3">
                Search
              </motion.h1>

              <form className="mt-8 flex justify-center border-b-4 border-b-gray-500 pb-3">
                <div className="relative w-full">
                  <input 
                    type="text" 
                    className="w-full font-semibold tracking-tighter caret-gray-800 rounded-full outline-none px-9 py-2 text-sm focus:border-gray-100 thick-ca" 
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <HiSearch 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-700" 
                    aria-hidden="true" 
                  />
                </div>
              </form>

              <motion.div className="flex-col gap-4 w-full overflow-auto h-3/4 mt-4">
                <div className='grid md:grid-cols-4 gap-2'>
                  <AnimatePresence mode='wait'>
                    {data && data.products.length > 0 && (
                      <>
                        {data && 
                          data.products.map((product: Product, index: number) => (
                            <motion.div 
                              key={product.id}
                              className='relative'
                              custom={{delay: (index + 1) * 0.2}}
                              initial='hidden'
                              animate='visible'
                              exit='hidden'
                              layoutId={product.slug}
                              variants={itemVariant}
                              >
                              <img src={`${import.meta.env.VITE_BACKEND_URL}${product.image}`} className='w-full object-cover rounded-md' />
                              <Link to={''} className='text-[0.5rem] flex py-2 gap-2 w-full bottom-0 rounded-sm absolute bg-black/80 text-neutral-200 px-1'>
                                  <p>{product.name}</p>
                                  <ArrowRightIcon className='w-2 pt-1 h-3 text-neutral-200' />
                              </Link>
                            </motion.div>
                          ))}
                      </>
                    )}
                  </AnimatePresence>
                </div>
                  {!!data && data.products.length === 0 && (
                    <motion.p 
                      className='text-center mt-40 text-3xl font-bold'
                      initial={{opacity: 0}}
                      animate={{opacity: 1}}
                      transition={{
                        duration: 2,
                        delay: 1
                      }}
                      >Not products found</motion.p>
                  )}
                  
                  {isLoading && <Loader />}
              </motion.div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default SearchModal;