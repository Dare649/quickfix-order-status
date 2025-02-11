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


          {/* <div className="flex flex-col items-center justify-center min-h-screen w-full px-4">
                <Image
                  src='/logo.png'
                  alt='QuickFix'
                  width={300} 
                  height={200}
                  className="mb-6"
                />
                <div className="w-full max-w-lg flex items-center border-2 border-primary-1 rounded-full p-2 bg-primary-6">
                  <input
                    type="text"
                    className="flex-1 bg-transparent outline-none px-4 text-base"
                    placeholder="Enter order ID EX: 0AFVYY4"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                  />
                  <button
                    className="bg-primary-4 text-primary-2 font-bold px-4 py-2 rounded-full flex items-center gap-2"
                    onClick={handleSearch}
                    disabled={loading}
                  >
                    <RiSendPlaneLine size={20} />
                    <span>{loading ? "Tracking..." : "Track Order"}</span>
                  </button>
                </div>
              </div> */}
    </div>
  )
}

export default TopBar