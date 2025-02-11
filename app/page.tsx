"use client";

import { useState } from "react";
import { RiSendPlaneLine } from "react-icons/ri";
import axiosInstance from "@/service/axios";
import { toast } from "react-toastify";
import { TbCurrencyNaira } from "react-icons/tb";
import { FaArrowRightLong, FaCheck } from "react-icons/fa6";
import { IoMdCloseCircleOutline } from "react-icons/io";
import Image from "next/image";

// Define the structure of the order response
interface OrderItem {
  name: string;
  price: number;
  quantity: number;
}

interface OrderDetails {
  _id: string;
  order_id: string;
  description: string;
  items: OrderItem[];
  amount: number;
  delivery_fee: number;
  user: string;
  service: string;
  transaction: string;
  location: string;
  pickup_date: string;
  address: string;
  landmark: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

const Home = () => {
  const [orderId, setOrderId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const STATUS_STEPS = ["Pending", "Washed", "Ironed", "Packaged", "Delivered"];

  const handleSearch = async () => {
    if (!orderId.trim()) {
      toast.error("Please enter a valid order ID.");
      return;
    }

    setLoading(true);
    try {
      const response = await axiosInstance.post<OrderDetails>(`/orders/track`, { order_id: orderId });

      setOrderDetails(response.data); // Store the response data
    } catch (error) {
      toast.error("An error occurred while fetching orders.");
    } finally {
      setLoading(false);
    }
  };

  // function to open modal
  const handleModal = () => {
    setIsModalOpen((prev) => !prev);
  }

  const getStatusIndex = (status: string) => STATUS_STEPS.indexOf(status.charAt(0).toUpperCase() + status.slice(1));

  const formatAmountWithCommas = (price: number | string): string => {
    if (price === "" || price === null || price === undefined) {
      return "";
    }
  
    const numericPrice = typeof price === "number" ? price : parseFloat(price.toString().replace(/,/g, ""));
  
    return isNaN(numericPrice) ? "" : numericPrice.toLocaleString();
  };
  


  return (
    <div className="w-full ">
      <div 
        className={`flex flex-col items-center justify-center min-h-screen lg:p-4 sm:p-4 transition-all duration-300  
          ${orderDetails ? 'lg:w-[50%] sm:w-full mx-auto' : 'lg:w-[60%] sm:w-full mx-auto'}
        `}
      >
          <Image
            src='/logo.png'
            alt='QuickFix'
            width={200} 
            height={200}
            className={`transition-all duration-300 ${orderDetails ? 'lg:mt-[-1%] sm:mt-[-2%]' : ''}`}
          />
          <div 
            className={`w-full p-2 border-[1.5px] border-primary-1 rounded-[3rem] flex items-center gap-x-2 transition-all duration-300 focus-within:border-primary-1 bg-primary-6
            ${orderDetails ? 'lg:mt-[2%] sm:mt-[3%]' : 'lg:mt-[5%] sm:mt-[3%]'}
          `}
          >
            <input
              type="text"
              className="outline-none border-none w-full bg-transparent focus:ring-0 lg:px-4 sm:px-2 lg:text-base sm:text-[10px]"
              placeholder="Enter order ID EX: 0AFVYY4"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
            />
            <button
              className={`lg:w-[30%] sm:w-[40%] lg:p-2 sm:p-1 bg-primary-4 flex items-center justify-center lg:gap-x-2 sm:gap-x-1 text-white font-bold rounded-4xl text-center capitalize cursor-pointer ${orderDetails ? 'lg:w-[40%]' : ''}`}
              onClick={handleSearch}
              disabled={loading}
            >
              <span className="bg-primary-3 flex items-center justify-center p-1 lg:gap-x-3 gap-x-0 lg:h-10 lg:w-10 sm:w-5 sm:h-5 rounded-full text-primary-4">
                <RiSendPlaneLine size={25}/>
              </span>
              <span className="capitalize lg:text-base sm:text-[10px] text-primary-3">
                {loading ? "tracking..." : "track order"}
              </span>
            </button>
          </div>
          {/* Modal Popup */}
      { orderDetails && (
        <div className="bg-primary-6 p-3 shadow-lg border-primary-1 border-[1.5px] mt-[3%] rounded-4xl w-full ">

        {/* Status Progress Bar */}
        <div className="lg:p-10 sm:p-3 border-primary-1 rounded-2xl w-full">
          <div className="w-full flex lg:flex-row sm:flex-col items-center justify-between mb-10 gap-y-3">
            {/* Order Info Section */}
            <div className="w-full flex gap-x-5 items-center">
              <div className="lg:w-15 lg:h-15 sm:w-10 sm:h-10 rounded-full flex items-center justify-center">
                <Image
                  src='/wash.png'
                  alt="QuickFix"
                  width={100}
                  height={100}
                  className="w-full"
                />
              </div>
              <div>
                <h2 className="text-secondary-1 flex lg:gap-x-2 sm:gap-x-1 font-bold lg:text-md sm:text-xs">
                  <span className="first-letter:capitalize">order ID:</span>
                  <span>{orderDetails.order_id}</span>
                </h2>
              </div>
            </div>

            {/* View Order Button - Aligned to the Right */}
            <div 
              className="w-full flex lg:justify-end sm:justify-start items-center text-primary-1 font-bold lg:gap-x-2 sm:gap-x-1 lg:text-base sm:text-xs capitalize cursor-pointer"
              onClick={handleModal}
            >
              <span>view order</span>
              <FaArrowRightLong size={20}/>
            </div>
          </div>

          <div className="flex flex-col w-full sm:ml-3 ">
            {STATUS_STEPS.map((step, index) => {
              const isActive = getStatusIndex(orderDetails.status) >= index;
              return (
                <div key={index} className="flex items-center gap-x-3">
                  {/* Status Indicator + Line Container */}
                  <div className="flex flex-col items-center">
                    {/* Status Circle */}
                    <div className={`w-8 h-8 flex items-center justify-center rounded-full text-white ${isActive ? "bg-primary-1" : "bg-secondary-1"}`}>
                      <FaCheck />
                    </div>
                    {/* Connecting Line (Hidden for last item) */}
                    {index !== STATUS_STEPS.length - 1 && (
                      <div className="w-[2px] h-10 bg-secondary-1"></div>
                    )}
                  </div>
                  {/* Step Label */}
                  <div className="text-sm text-secondary-1 sm:-mt-8">{step}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      )}
      </div>
        {
          isModalOpen && orderDetails && (
            <div
              className="fixed inset-0 bg-primary-3/50 lg:p-0 sm:p-2 bg-opacity-50 flex justify-center items-center">
              <div className="bg-white lg:p-10 sm:p-3 rounded-4xl shadow-lg lg:w-[60%] sm:w-full">
                <div
                  onClick={handleModal}
                  className="flex float-end cursor-pointer"
                >
                  <IoMdCloseCircleOutline size={30}/>
                </div>
                <div className="flex items-center gap-3">
                  <div className="lg:w-15 lg:h-15 sm:w-10 sm:h-10 rounded-full flex items-center justify-center">
                    <Image
                      src='/wash.png'
                      alt="QuickFix"
                      width={100}
                      height={100}
                      className="w-full"
                    />
                  </div>
                  <h2 className="text-secondary-1 font-medium flex items-center gap-x-1 lg:text-md sm:text-[10px]">
                    <span className="first-letter:capitalize">order ID:</span>
                    <span>{orderDetails.order_id}</span>
                  </h2>
                </div>
                <div className="lg:py-10 sm:py-5 ">
                  <div className="w-full border-[1.5px] border-primary-1  bg-primary-6 rounded-2xl lg:p-7 sm:p-2">
                    <div>
                      {orderDetails.items.map((item, index) => (
                        <div 
                          key={index}
                          className="w-full flex items-center justify-between lg:text-lg sm:text-xs lg:py-3 sm:py-1"
                        >
                          <h2 className="capitalize">{item.name}</h2> 
                          <h2 className="text-primary-2 flex items-center gap-x-2 font-medium text-right">
                            <span className="flex items-center"><TbCurrencyNaira size={18}/>{formatAmountWithCommas(item.price)}</span>
                            <span>x</span>
                            <span>{item.quantity}</span>
                          </h2>
                          
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-col items-end text-right lg:text-lg sm:text-xs mt-3">
                      <h2 className="flex justify-end items-center font-medium capitalize text-primary-2 mb-3">
                        <span className="mr-2">sub total:</span>
                        <span className="flex items-center"><TbCurrencyNaira size={18}/>{formatAmountWithCommas(orderDetails.amount)}</span>
                      </h2>
                      <h2 className="flex justify-end items-center font-medium capitalize text-primary-2 mb-3">
                        <span className="mr-2">delivery fee:</span>
                        <span className="flex items-center"><TbCurrencyNaira size={18}/>{formatAmountWithCommas(orderDetails.delivery_fee)}</span>
                      </h2>
                      <h2 className="flex justify-end items-center font-medium capitalize text-primary-2 mb-3">
                        <span className="mr-2">total:</span>
                        <span className="flex items-center"><TbCurrencyNaira size={18}/>{formatAmountWithCommas(orderDetails.amount + orderDetails.delivery_fee)}</span>
                      </h2>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          )
        }
    </div>
  );
};

export default Home;
