import Image from 'next/image';

const TopBar = () => {
  return (
    <div className='w-full bg-primary-2 lg:p-5 sm:p-2'>
        <Image
            src='/logo.svg'
            alt='QuickFix'
            width={200} 
            height={200}
        />


          {/* <hr  className="w-full bg-gray-700 h-0.5"/>
            <h4 className="text-gray-700 uppercase font-bold text-sm py-3">order details</h4>
            <div className="w-full grid lg:grid-cols-4 sm:grid-cols-2 gap-5 ">
              <div>
                <h4 className="text-primary-1 uppercase font-bold text-xs">order ID</h4>
                <h2 className="font-bold text-sm text-gray-500">{orderDetails.order_id}</h2>
              </div>
              <div>
                <h4 className="text-primary-1 uppercase font-bold text-xs">description</h4>
                <h2 className="font-bold text-sm text-gray-500">{orderDetails.description}</h2>
              </div>
              <div>
                <h4 className="text-primary-1 uppercase font-bold text-xs">amount</h4>
                <h2 className="font-bold text-sm text-gray-500">{orderDetails.amount}</h2>
              </div>
              <div>
                <h4 className="text-primary-1 uppercase font-bold text-xs">delivery fee</h4>
                <h2 className="font-bold text-sm text-gray-500">{orderDetails.delivery_fee}</h2>
              </div>
              <div>
                <h4 className="text-primary-1 uppercase font-bold text-xs">address</h4>
                <h2 className="font-bold text-sm text-gray-500">{orderDetails.address}</h2>
              </div>
              <div>
                <h4 className="text-primary-1 uppercase font-bold text-xs">order ID</h4>
                <h2 className="font-bold text-sm text-gray-500">{orderDetails.order_id}</h2>
              </div>
            </div>
           
            <div className="py-3">
              <h4 className="text-primary-1 uppercase font-bold text-xs">items</h4>
              <div className="w-full grid lg:grid-cols-4 sm:grid-cols-2 gap-3 ">
                {orderDetails.items.map((item, index) => (
                    <h2 
                      key={index}
                      className="font-bold text-sm text-gray-500"
                    >
                      {item.name} - <span className="flex items-center"><TbCurrencyNaira size={20}/>{formatAmountWithCommas(item.price)}</span> (x{item.quantity})
                    </h2>
                  ))}
              </div>
            </div>
            
            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md"
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </button> */}
    </div>
  )
}

export default TopBar