import { createContext, useState } from "react";
import {getProductData} from "./productsStore";

const CartContext = createContext({
   items: [],
   getProductQuantity: () => {},
   addOneToCart: () => {},
   removeOneToCart: () => {},
   deleteFromCart: () => {},
   getTotalCost: () => {}
});

function CardProvider({children}) {
   const [cartProducts, setCartProducts] = useState([])

   const getProductQuantity = (id) => {
      const quantity = cartProducts.find(product => product.id === id)?.quantity
      if (quantity === undefined) {
         return 0;
      }
      return quantity
   }
   
   const addOneToCart = (id) => {
      const quantity = getProductQuantity(id)

      if (quantity === 0) {
         setCartProducts(
            [
               ...cartProducts, 
               {
                  id: id, 
                  quantity: 1
               }
            ]
         )
      } else {
         setCartProducts(
            cartProducts.map(product =>
               product.id === id ? {...product, quantity: product.quantity + 1} : product
            )
         )
      }
   }

   const removeOneToCart = (id) => {
      const quantity = getProductQuantity(id)
      if (quantity === 1) {
         deleteFromCart(id)
      } else {
         setCartProducts(
            cartProducts.map(product => 
               product.id === id ? {...product, quantity: product.quantity - 1} : product
            )
         )
      }
   }

   const deleteFromCart = (id) => {
      setCartProducts(
         cartProducts => cartProducts.filter(currentProduct => {
            return currentProduct.id !== id;
         })
      )
   }

   const getTotalCost = () => {
      let totalCost = 0;

      cartProducts.map(cartItem => {
         const productData = getProductData(cartItem.id)
         return totalCost += (productData.price * cartItem.quantity)
      })
      return totalCost
   }
   

   const contextValue ={
      items: cartProducts,
      getProductQuantity,
      addOneToCart,
      removeOneToCart,
      deleteFromCart,
      getTotalCost
   } 

   return (
      <CartContext.Provider value={contextValue}>
         {children}
      </CartContext.Provider>
   )
}

export {CartContext, CardProvider}