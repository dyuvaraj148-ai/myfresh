import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";
import axios from 'axios'

axios.defaults.withCredentials=true
axios.defaults.baseURL=import.meta.env.VITE_BACKEND_URL
export const AppContext=createContext()

export const AppContextProvider=({children})=>{
    const currency = import.meta.env.VITE_CURRENCY

    const navigate=useNavigate()
    const [user,setUser]=useState(null)
    const [isSeller,setIsSeller]=useState(false)
    const [showUserLogin,setShowUserLogin]=useState(false)
    const [products,setProducts]=useState([])
    const [cartItems,setCartItems]=useState({})
    const [searchQuery, setSearchQuery] = useState("")

    const fetchSeller=async()=>{
        try{
            const {data}=await axios.get('/api/seller/is-auth')
            if(data.success){
                setIsSeller(true)
            }
            else{
                setIsSeller(false)
            }
        }
        catch(error){
            setIsSeller(false)
        }
    }

    const fetchUser = async () => {
    try {
        const { data } = await axios.get('/api/user/is-auth');

        if (data.success) {
            setUser(data.user);

            const cartObj = {};

            if (Array.isArray(data.user.cartItems)) {
                data.user.cartItems.forEach(item => {
                    const id =
                        typeof item.productId === "object"
                            ? item.productId._id
                            : item.productId;

                    if (id && id !== 'undefined' && id !== 'null') {
                        cartObj[id] = item.quantity;
                    }
                });
            }

            setCartItems(cartObj);
        } else {
            setUser(null);
            setCartItems({});
        }

    } catch (error) {
        setUser(null);
        setCartItems({});
    }
};

    const fetchProducts=async()=>{
        try{
            const {data}=await axios.get('/api/product/list')
            if(data.success){
                setProducts(data.products)
            }
            else{
                toast.error(data.message)
            }
        }
        catch(error){
            toast.error(error.message)
        }
    }

    const isValidCartId = (itemId) => {
        return Boolean(itemId) && itemId !== 'undefined' && itemId !== 'null';
    }

    const addToCart=(itemId)=>{
        if(!isValidCartId(itemId)) return;
        let cartData=structuredClone(cartItems);
        if(cartData[itemId]){
            cartData[itemId]+=1;
        }
        else{
            cartData[itemId]=1;
        }
        setCartItems(cartData)
        toast.success("Added to cart")
    }

    const updateCartItem=(itemId,quantity)=>{
        if(!isValidCartId(itemId)) return;
        let cartData=structuredClone(cartItems);
        if(quantity > 0) {
            cartData[itemId]=quantity;
        } else {
            delete cartData[itemId];
        }
        setCartItems(cartData)
        toast.success("Cart Updated")
    }
    const removeFromCart=(itemId)=>{
        if(!isValidCartId(itemId)) return;
        let cartData=structuredClone(cartItems);
        if(cartData[itemId]){
            cartData[itemId]-=1;
            if( cartData[itemId]==0){
                delete cartData[itemId]
            }
        }
        toast.success("Removed from cart")
        setCartItems(cartData)
    }

    const getCartCount=()=>{
        let total=0;
        if(cartItems && typeof cartItems === 'object'){
            for(const item in cartItems){
                total+= cartItems[item] || 0;
            }
        }
        return total;
    }

    const getCartAmount = () => {
        let total = 0;
        for (const item in cartItems) {
            let iteminfo = products.find(product => product._id === item);
            if (iteminfo && cartItems[item] > 0) {
                total += iteminfo.offerPrice * cartItems[item];
            }
        }
        return total.toFixed(2);
    };

    useEffect(()=>{
        fetchProducts()
        fetchUser()
        fetchSeller()
    },[])

    useEffect(() => {
    if (!user) return;
    const timeout = setTimeout(async () => {
        try {
            const { data } = await axios.post('/api/cart/update', { cartItems });

            if (!data.success) {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }, 500); // debounce 500ms

    return () => clearTimeout(timeout);

}, [cartItems, user]);


    const values={  navigate,user,setUser,isSeller,setIsSeller,
                    showUserLogin,setShowUserLogin,currency,
                    addToCart,updateCartItem,removeFromCart,
                    cartItems,products,searchQuery,setSearchQuery,setCartItems,
                    getCartCount,getCartAmount,axios,fetchProducts,fetchUser
                }
    return <AppContext.Provider value={values}>
        {children}
    </AppContext.Provider>
}

export const useAppContext=()=>{
    return useContext(AppContext)
}
