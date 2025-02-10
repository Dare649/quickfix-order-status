"use client";

import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import axiosInstance from "@/service/axios";
import { toast } from "react-toastify";

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
      setIsModalOpen(true); // Show the modal
    } catch (error) {
      toast.error("An error occurred while fetching orders.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusIndex = (status: string) => STATUS_STEPS.indexOf(status.charAt(0).toUpperCase() + status.slice(1));


  return (
    <div className="w-full mt-10">
      <h2 className="text-center font-bold text-xl text-gray-500">
        Enter your Order ID
      </h2>

      <div className="flex lg:flex-row sm:flex-col items-center justify-center mx-auto">
        <div className="flex items-center gap-x-4 mt-5">
          <div className="w-full p-2 border-[2.5px] border-gray-400 rounded-md flex items-center gap-x-2 transition-colors focus-within:border-green-500">
            <CiSearch />
            <input
              type="text"
              className="outline-none border-none w-full bg-transparent focus:ring-0"
              placeholder="Enter order ID"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
            />
          </div>
          <button
            className="bg-primary-2 text-white font-bold rounded-md text-center px-7 capitalize py-3 cursor-pointer"
            onClick={handleSearch}
            disabled={loading}
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>
      </div>

      {/* Modal Popup */}
      {isModalOpen && orderDetails && (
        <div className="fixed inset-0 bg-primary-3/50 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">

            {/* Status Progress Bar */}
            <div className="lg:py-5 sm:py-3">
              <h4 className="text-gray-700 uppercase font-bold text-sm">order status</h4>
              <div className="flex items-center justify-between mt-2 w-full relative">
                {STATUS_STEPS.map((step, index) => {
                  const isActive = getStatusIndex(orderDetails.status) >= index;
                  return (
                    <div key={index} className="relative flex flex-1 flex-col items-center">
                      
                      {/* Status Circle */}
                      <div className={`w-8 h-8 flex items-center justify-center rounded-full text-white ${isActive ? "bg-green-500" : "bg-gray-300"}`}>
                        {index + 1}
                      </div>
                      <span className="text-xs text-center mt-1 text-gray-600">{step}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <hr  className="w-full bg-gray-700 h-0.5"/>
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
              <div className="w-full grid lg:grid-cols-4 sm:grid-cols-2 gap-3">
                {orderDetails.items.map((item, index) => (
                    <h2 
                      key={index}
                      className="font-bold text-sm text-gray-500"
                    >
                      {item.name} - ${item.price} (x{item.quantity})
                    </h2>
                  ))}
              </div>
            </div>
            
            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md"
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
