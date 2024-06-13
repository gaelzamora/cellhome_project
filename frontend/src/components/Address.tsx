
function Address() {
  return (
    <div>
        <p className="text-3xl text-gray-700 font-semibold mt-5">Your address</p>    
        <div className="w-full grid grid-cols-2 my-10 gap-5">
            <input type="text" className="outline-none rounded-md text-gray-800 px-5 border-2 border-gray-300 w-" placeholder="Direccion 1" />
            <input type="text" className="outline-none rounded-md text-gray-800 px-5 border-2 border-gray-300 w-" placeholder="Direccion 2" />
            <input type="text" className="outline-none rounded-md text-gray-800 px-5 border-2 border-gray-300 w-" placeholder="Pais" />
            <input type="text" className="outline-none rounded-md text-gray-800 px-5 border-2 border-gray-300 w-" placeholder="Estado" />
        </div>
    </div>
  )
}

export default Address