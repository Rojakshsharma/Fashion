import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {useNavigate} from "react-router-dom"
import axios from 'axios'
export const ShopContext=createContext()

export const ShopContextProvider=(props)=>{
    const currency='$'
    const deleivery_fee=10
    const backend_url=import.meta.env.VITE_BACKEND_URL
    const [search,setSearch]=useState('')
    const [showSearch,setShowsearch]=useState(false)
    const [cartItem,setCartItem]=useState({})
    const [products,setProducts]=useState([])
    const [token,setToken]=useState('')
    const navigate=useNavigate()

    const addTocart=async(itemId,size)=>{
        let cartData=structuredClone(cartItem)

        if(!size){
            toast.error('Select product size')
            return 
        }
        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size]+=1
            }
            else{
                {
                    cartData[itemId][size]=1
                }
            }
        }

        else{
            cartData[itemId]={}
            cartData[itemId][size]=1  
        }

        setCartItem(cartData)
        // console.log(cartData)
        if(token){
            try {
                // console.log("this is an api call")
                const response = await axios.post(backend_url+'api/cart/add',{itemId,size},{headers:{token}})
                toast.success(response.data.message)
                // console.log(response)
            } catch (error) {
             console.log(error)
             toast.error(error.message)   
            }
        }
    }

    const getCartCount=()=>{
        let totalCount=0
        for(const itemId in cartItem){
            const items=cartItem[itemId]
            for(const item in items){
                try{
                    if(items[item]>0){
                        totalCount+=items[item]
                    }
                }catch(error){
                    console.log(error)
                    toast.error(error.message)
                }
            }      
        }

        return totalCount
    }

    const updateQuantity=async (itemId,size,quantity)=>{
        let cartData=structuredClone(cartItem)
        cartData[itemId][size]=quantity
        setCartItem(cartData)
        if(token){
            try {
                await axios.post(backend_url + 'api/cart/update',{itemId,size,quantity},{headers:{token}})
            } catch (error) {
                console.log(error)
                toast.error(error.message)  
            }
        }
    }

    const getCartAmount=()=>{
        let TotalAmount=0;
        for(const items in cartItem){
            let itemInfo=products.find((product)=>product._id===items)
            for(const item in cartItem[items]){
                try{
                    if(cartItem[items][item]>0){
                        TotalAmount+=itemInfo.price*cartItem[items][item]
                    }
                }catch(error){
                 console.log(error)
                toast.error(error.message)  
                }
            }
        }

        return TotalAmount
    }

    const getProductsData = async()=>{
        try {
            const response = await axios.get(backend_url+'api/product/list')
            if(response.data.success){
                setProducts(response.data.products)
            }else{
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const getUserCart = async (token)=>{
        try {
            const response = await axios.post(backend_url+'api/cart/get',{},{headers:{token}})
            if(response.data.success){
                setCartItem(response.data.cartData)
            }   
        } catch (error) {
            console.log(error)
            toast.error(error.message)   
        }
    }


    useEffect(()=>{
        getProductsData()
    },[])
    

    useEffect(()=>{
        if(!token && localStorage.getItem('token')){
            setToken(localStorage.getItem('token'))
            getUserCart(localStorage.getItem('token'))
        }
    },[])


    const value={
        products,currency,deleivery_fee,
        search,setSearch,showSearch,setShowsearch,
        cartItem,addTocart,getCartCount,
        updateQuantity,
        getCartAmount,
        navigate,
        backend_url,
        setToken,token,setCartItem
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}