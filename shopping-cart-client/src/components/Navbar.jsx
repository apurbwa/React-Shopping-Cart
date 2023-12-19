import { useState, useContext } from 'react'
import { Button, Navbar, Modal } from 'react-bootstrap'
import { CartContext } from '../CartContext'
import CartProduct from './CartProduct'


export default function NavbarComponent() {
   const cart = useContext(CartContext)
   const totalCartItems = cart.items.reduce((sum, product) => sum + product.quantity, 0);

   const [modalShow, setModalShow] = useState(false)
   const handleShow = () => setModalShow(true)
   const handleClose = () => setModalShow(false)

   const checkout = async () => {
      await fetch("http://localhost:4000/checkout", {
         method: "POST",
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({items: cart.items})
      })
      .then(res => res.json())
      .then(res => {
         if(res.url) {
            window.location.assign(res.url)
         }
      })
   }


  return (
   <>
      <Navbar>
         <Navbar.Brand href="/">Shopping Cart</Navbar.Brand>
         <Navbar.Toggle />
         <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
               <Button onClick={handleShow}>Cart {totalCartItems} Items</Button>
            </Navbar.Text>
         </Navbar.Collapse>
      </Navbar>
      <Modal show={modalShow} onHide={handleClose} >
         <Modal.Header closeButton>
            <Modal.Title>Shopping Cart</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            {totalCartItems > 0 ? (
               <>
                  <p>Items in your cart:</p>
                  {cart.items.map((currentProduct, index) => (
                     <CartProduct key={index} id={currentProduct.id} quantity={currentProduct.quantity} />
                  ))}   
                  <h2>Total: ${cart.getTotalCost().toFixed(2)}</h2>  
                  <Button variant='success' onClick={checkout}>Purchase items!</Button>    
               </>
            ) : (
               <h3>There is no item in your cart!</h3>
            )}
         </Modal.Body>
      </Modal>
   </>
  )
}
