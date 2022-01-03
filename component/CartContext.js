import React, { createContext,useState } from 'react'
export const cartContext = createContext()

function CartContext(props) {
    const[cartCount,setCartCount] = useState(0)
    return (
       <cartContext.Provider value={{cartCount,setCartCount}}>
       {props.children}
       </cartContext.Provider>
    )
}

export default CartContext
