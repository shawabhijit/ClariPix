import { useContext } from "react";
import { AppContext } from "./AppContext";
import axios from "axios";
import toast from "react-hot-toast";

declare global {
    interface Window {
        Razorpay: any;
    }
}


const appContext = useContext(AppContext)
const backendUrl = appContext?.backendUrl;

export const placeOrder = async ({planId , getToken , onSuccess} : any) => {

    try {
        const token = await getToken();

        const response = await axios.post(`${backendUrl}/orders?planId=${planId}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        if (response.status === 200) {
            initializePayment({order: response.data , getToken , onSuccess})
        }
    }
    catch (error : any) {
        console.error("Error placing order:", error);
        toast.error("Failed to place order. Please try again." + error.message);
    }
}

const initializePayment = ({order , getToken , onSuccess} : any) => {

    const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount : order.amount,
        currency : order.currency,
        name : "Credit Payment",
        description: "Credit Payment",
        order_id : order.id,
        receipt : order.receipt,
        handler: async (paymentDetails : any) => {
            try {
                const token = await getToken();

                const response = await axios.post(`${backendUrl}/orders/verify`, paymentDetails, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

                if (response.status === 200) {
                    toast.success("Payment successful!");
                    onSuccess?.();
                }
            }
            catch (error) {
                console.error("Payment verification failed:", error);
                toast.error("Payment verification failed. Please contact support.");
            }
        }
    }

    const rzp = new window.Razorpay(options);
    rzp.open();
}