import React from "react"
import { UserInformation, Order } from "../Interfaces"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { create_order } from "../api/orders"
import toast from "react-hot-toast"
import { useCartStore } from "../store/cart"
import { useNavigate } from "react-router-dom"
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import {motion} from 'framer-motion'

type addressProps = {
  address: UserInformation
  setAddress: (address_client: UserInformation) => void
}

function AddressComponent({address, setAddress}: addressProps) {
  const removeAll = useCartStore(state => state.removeAll)
  const total_price = useCartStore(state => state.totalPrice)
  const cart = useCartStore(state => state.cart)
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const handleChangeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setAddress({
      ...address,
      [name]: value,
    })
  }

  const createOrderMut = useMutation({
    mutationFn: create_order,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"]})
      toast.success("Order created!")
      removeAll()
      navigate('/') 
    },
    onError: () => {
      toast.error("Error!")
      navigate('/')
    }
  })

  const createOrder = (data: any, actions: any) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: total_price
          },
        },
      ],
      application_context: {
        shipping_preference: "NO_SHIPPING"
      }
    })
  }

  const onAprove = (data: any, actions: any) => {
    return actions.order.capture(handleSubmit())
  }

  const handleSubmit = () => {
    createOrderMut.mutate({
      order_items: cart,
      total_price: total_price,
      address_1: address.address_1,
      city_state: address.city_state,
      postal_code: address.postal_code,
      country: address.country,
      suburb: address.suburb, 
    } as Order)
  }

  return (
    <motion.div 
      className="text-gray-800"
      initial={{opacity: 0, y: '-10%'}}
      animate={{opacity: 1, y: 0}}
    > 
        <p className="text-4xl font-semibold mt-10">Where should we send your order?</p>
        <p className="text-2xl font-semibold mt-5">Enter your name and address</p>    
        <form onSubmit={handleSubmit}>
          <div className="grid my-10 gap-5 w-1/2 ">
          
            <input 
              type="text" 
              className="py-3 outline-none rounded-lg text-gray-900 px-5 border-2 border-gray-400"
              name="address_1"
              onChange={handleChangeAddress}
              placeholder="Direccion" />
            <input 
              type="text" 
              className="py-3 outline-none rounded-lg text-gray-900 px-5 border-2 border-gray-400" 
              name="country"
              onChange={handleChangeAddress}
              placeholder="Pais" />
            <input 
              type="text" 
              className="py-3 outline-none rounded-lg text-gray-900 px-5 border-2 border-gray-400" 
              name="state"
              onChange={handleChangeAddress}
              placeholder="Estado" />
            <input 
              type="text" 
              className="py-3 outline-none rounded-lg text-gray-900 px-5 border-2 border-gray-400" 
              name="city"
              onChange={handleChangeAddress}
              placeholder="Ciudad" />    
          <div className="grid md:grid-cols-2 gap-2">
            <input 
                  type="text" 
                  className="py-3 outline-none rounded-lg text-gray-900 px-5 border-2 border-gray-400" 
                  value={address.postal_code}
                  name="postal_code"
                  onChange={handleChangeAddress}
                  placeholder="Codigo Postal" />
            <input 
                  type="text" 
                  className="py-3 outline-none rounded-lg text-gray-900 px-5 border-2 border-gray-400" 
                  name="suburb"
                  onChange={handleChangeAddress}
                  placeholder="Colonia" />
          </div>

          <p className="font-bold text-3xl mt-10">What's your contact information?</p>
            <input 
                type="text" 
                className="py-3 outline-none rounded-lg text-gray-900 px-5 border-2 border-gray-400" 
                name="email"
                onChange={handleChangeAddress}
                placeholder="Email" />
            <input 
                type="text" 
                className="py-3 outline-none rounded-lg text-gray-900 px-5 border-2 border-gray-400" 
                name="phone_number"
                onChange={handleChangeAddress}
                placeholder="Phone Number" />

          <PayPalScriptProvider
            options={{
              clientId: "AbBkX08KdHAChcrhEkpRtBkMnv80jKHjnnUJFvB9cROjy2wMtfTjW9X7S270tIKg7MsYuTHdvg3xEbB4",
              currency: "MXN"
            }}
          >
            <PayPalButtons
              createOrder={(data, actions) => createOrder(data, actions)}
              onApprove={(data, actions) => onAprove(data, actions)}
              style={{layout: "horizontal"}}
            />
          </PayPalScriptProvider>

        </div>

        </form>


    </motion.div>
  )
}

export default AddressComponent