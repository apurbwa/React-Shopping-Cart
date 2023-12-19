// sk_test_51NzeFuL4S4zQrUQkJtEuENwHkFVxABsiUBhmsitJSRyNKyriCnRafV9zeEYOuXL86Jx23KFld9uUxLd5CgFkFdzf00aJR70c0w
// coffee: price_1NzeMHL4S4zQrUQkjVdzvDXx
// sunglasses: price_1NzeNFL4S4zQrUQkrxnvRzqD
// camera: price_1NzeNmL4S4zQrUQkKTaXE4z7


const express = require('express')
var cors = require('cors')
const stripe = require('stripe')('sk_test_51NzeFuL4S4zQrUQkJtEuENwHkFVxABsiUBhmsitJSRyNKyriCnRafV9zeEYOuXL86Jx23KFld9uUxLd5CgFkFdzf00aJR70c0w')

const app = express()
app.use(cors())
app.use(express.static("public"))
app.use(express.json())


app.post("/checkout", async(req, res) => {

   console.log(req.body);
   const items = req.body.items;
   let lineItems = [];
   items.forEach((item) => {
      lineItems.push(
         {
            price: item.id,
            quantity: item.quantity
         }
      )
   })
   const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: 'payment',
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel"
   })
   
   res.send(JSON.stringify({
      url: session.url
   }))
})

app.listen(4000, () => console.log("listening backend"))







