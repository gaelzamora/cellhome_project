import { AnimatePresence, motion } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useEffect } from 'react';
import { useCartStore } from '../store/cart';
import { TrashIcon } from '@heroicons/react/20/solid';
import { Product } from '../Interfaces';

type modalProps = {
  isOpen: boolean;
  setOpen: (state: boolean) => void;
};

const backdropVariants = {
  visible: { opacity: 1},
  hidden: { opacity: 0 },
};

const modalVariants = {
  hidden: {
    x: "100vw",
    scale: 0.8,
    opacity: 0,
  },
  visible: {
    x: 0,
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 30 },
  },
  exit: {
    x: "100%",
    opacity: 0,
    transition: { duration: 0.3 }
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    x: '100%',
    transition: {
      duration: 0.5
    }
  },
  visible: {
    x: 0,
    opacity: 1,
  },

}
function CartModal({ isOpen, setOpen }: modalProps) {
  const items_cart = useCartStore(state => state.cart)
  const delete_item_from_cart = useCartStore(state => state.removeFromCart)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  console.log(items_cart)

  return (
    <AnimatePresence mode='wait'>
      {isOpen && (
        <motion.div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-end items-center z-50"
          variants={backdropVariants}
          initial={false}
          animate="visible"
          exit="hidden"
        >
          <motion.div 
            className="bg-[#ffff] p-8 rounded-lg shadow-lg w-2/6 h-full"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <XMarkIcon className='w-10 h-10 cursor-pointer' onClick={() => setOpen(false)} />
            <motion.p 
              className='text-2xl uppercase font-bold mt-4 mb-3 pb-3 border-b-4 border-y-neutral-800'
              animate={{}}
              >Your cart
            </motion.p>

            <motion.div className='flex-col gap-4 overflow-auto h-3/4'>
              <AnimatePresence mode='wait'>
                {items_cart.map((item: Product) => (
                    <motion.div 
                      key={item.slug}
                      initial='hidden'
                      animate='visible'
                      exit='hidden'
                      layoutId={item.slug}
                      variants={itemVariants}
                      className='w-full px-2 py-2 flex shadow-lg rounded-lg'
                    >
                      <img src={`${import.meta.env.VITE_BACKEND_URL}${item.image}`} className='w-14 h-14 object-cover rounded-md' />
                      <div className='w-screen relative '>
                          <p className='absolute left-10 top-[40%] bottom-[50%] text-xs text-gray-800 font-semibold'>{item.name}</p>
                          <p className='absolute right-14 top-[40%] bottom-[50%] text-xs text-gray-800 font-semibold'>{item.price} mx</p>
                          <TrashIcon 
                            className='text-red-700 absolute right-4 top-[35%] bottom-[40%] w-5 h-5 cursor-pointer' 
                            onClick={() => delete_item_from_cart(item)} />
                      </div>
                    </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            <motion.button className='w-full py-4 px-5 hover:bg-blue-900/80 transition-colors duration-100 bg-blue-800/80 text-neutral-300 font-bold uppercase rounded-md'>
              To buy  
            </motion.button>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default CartModal;