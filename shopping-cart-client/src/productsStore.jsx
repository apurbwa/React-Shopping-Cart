const productsArray = [
   {
      id: 'price_1NzeMHL4S4zQrUQkjVdzvDXx',
      name: 'Coffee',
      price: 4.99,
   },
   {
      id: 'price_1NzeNFL4S4zQrUQkrxnvRzqD',
      name: 'Sunglasses',
      price: 10.99,
   },
   {
      id: 'price_1NzeNmL4S4zQrUQkKTaXE4z7',
      name: 'Camera',
      price: 59.99,
   }
]

const getProductData = (id) => {
   let productData = productsArray.find(product => product.id === id)

   if (productData === undefined) {
      console.log("Product data does not exist for ID: " + id)
      return undefined
   }

   return productData
}

export {productsArray, getProductData}