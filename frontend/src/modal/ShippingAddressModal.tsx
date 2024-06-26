import { XMarkIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { itemForm } from '../animations/animations';
import useAnimatedPlaceholder from '../hooks/useAnimatedPlaceholder';
import { Token, User } from '../Interfaces';
import { useAuthStore } from '../store/auth';
import jwt_decode from 'jwt-decode';
import { useEffect, useState } from 'react';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { get_user, shipping_address } from '../api/users';
import toast from 'react-hot-toast';

type ShippingAddressModalProps = {
  isOpenAddress: boolean;
  setIsOpenAddress: (state: boolean) => void;
};

function ShippingAddressModal({ isOpenAddress, setIsOpenAddress }: ShippingAddressModalProps) {
  const token: string = useAuthStore.getState().access;
  const tokenDecoded: Token = jwt_decode(token);
  const email = tokenDecoded.email

  const [information, setInformation] = useState({
    FirstName: tokenDecoded.first_name,
    LastName: tokenDecoded.last_name,
    StreetAddress: '',
    PostalCode: '',
    Country: '',
    CityState: '',
    Suburb: '',
    PhoneNumber: '',
    email: email
  })

  console.log(information)


  const queryClient = useQueryClient()

  const {data: user} = useQuery<User>({
    queryKey: ['users', tokenDecoded.user_id],
    queryFn: () => get_user(tokenDecoded.user_id)
  })

  const editShippingAddress = useMutation({
    mutationFn: shipping_address,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
      toast.success('Shipping address updated')
      setIsOpenAddress(false)
    },
    onError: () => {
      toast.error("Error!")
    }
  })

  useEffect(() => {
    if(user) {
      setInformation({
        ...information,
        FirstName: user.first_name,
        LastName: user.last_name,
        StreetAddress: user.address,
        PostalCode: user.postal_code,
        Country: user.country,
        CityState: user.state_city,
        Suburb: user.suburb,
        PhoneNumber: user.phone_number
      })
    }
  }, [user])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    editShippingAddress.mutate({
      first_name:information.FirstName,
      last_name:information.LastName,
      address:information.StreetAddress,
      postal_code:information.PostalCode,
      country:information.Country,
      state_city:information.CityState,
      suburb:information.Suburb,
      phone_number:information.PhoneNumber,
      email: tokenDecoded.email
    } as User)
  }

  const handleChangeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setInformation({
      ...information,
      [name]: value,
    })
  }

  const fieldNames = [
    'FirstName',
    'LastName',
    'StreetAddress',
    'PostalCode',
    'Country',
    'CityState',
    'Suburb',
    'PhoneNumber',
  ];

  const fields = fieldNames.reduce((acc, name) => {
    acc[name] = useAnimatedPlaceholder();
    return acc;
  }, {} as Record<string, ReturnType<typeof useAnimatedPlaceholder>>);

  return (
    <>
      {isOpenAddress && (
        <>
          <motion.div 
            className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40'
            onClick={() => setIsOpenAddress(false)}
          />
          <motion.div
            className='fixed inset-0 flex justify-center items-center z-40'    
          >
            <motion.div
              className='bg-white px-20 py-14 rounded-2xl shadow-lg w-3/6 mx-auto relative max-h-[80vh] overflow-y-auto'
              onClick={(e) => e.stopPropagation()}
            >
              <XMarkIcon 
                className='w-8 absolute right-5 p-1 top-5 cursor-pointer bg-gray-300 rounded-3xl' 
                onClick={() => setIsOpenAddress(false)}
              />
              <p className='text-4xl font-bold text-gray-800 text-center'>Edit your shipping address.</p>

              <form className='grid py-8 gap-4 w-4/5 mx-auto' onSubmit={handleSubmit}>
                {fieldNames.map((fieldName) => (
                  <div className='relative' key={fieldName}>
                    <motion.input 
                      type="text"
                      name={fieldName}
                      className='outline-none border-[1px] rounded-xl px-4 py-4 border-gray-400 w-full'
                      onFocus={fields[fieldName].onFocus}
                      onBlur={fields[fieldName].onBlur}
                      ref={fields[fieldName].inputRef}
                      onChange={handleChangeAddress}
                      value={information[fieldName as keyof typeof information] || ''}
                    />
                    <motion.p 
                      className='absolute left-4 text-lg text-gray-500 pointer-events-none'
                      initial='static'
                      animate={fields[fieldName].onInput ? 'movement' : 'static'}
                      variants={itemForm}
                    >
                      {fieldName.split(/(?=[A-Z])/).join(' ')}
                    </motion.p>
                  </div>
                ))}

                <p className='text-gray-800 text-sm'>The phone number you enter can’t be changed after you place your order, so please make sure it’s correct.</p>
                <button className='w-full bg-blue-600 text-gray-200 py-4 rounded-xl text-lg mt-10'>Save</button>
                <p className='w-full text-center py-4 cursor-pointer text-blue-600 text-lg' onClick={() => setIsOpenAddress(false)}>Cancel</p>
              </form>
            </motion.div>
          </motion.div>
        </>
      )}
    </>
  );
}

export default ShippingAddressModal;
