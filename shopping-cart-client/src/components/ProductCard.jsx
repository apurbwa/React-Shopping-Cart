import { useContext } from 'react'
import {Card, Button, Form, Row, Col} from 'react-bootstrap'
import { CartContext } from '../CartContext'

export default function ProductCard({product}) {
  const cart = useContext(CartContext)
  const productQuantity = cart.getProductQuantity(product.id)

  



  return (
    <Card>
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Body>€{product.price}</Card.Body>
        {productQuantity > 0 ? (
          <>
            <Form as={Row}>
              <Form.Label column="true" sm="6">In Cart: {productQuantity}</Form.Label>
              <Col sm="6">
                <Button className='mx-2' sm="6" onClick={() => cart.addOneToCart(product.id)} >+</Button>
                <Button className='mx-2' sm="6" onClick={() => cart.removeOneToCart(product.id)} >-</Button>
              </Col>
            </Form>
            <Button className='my-2' variant='danger' sm="6" onClick={() => cart.deleteFromCart(product.id)}>Remove from cart</Button>
          </>
        ) : (
          <Button variant='primary' onClick={() => cart.addOneToCart(product.id)}>Add To Cart</Button>
        )}
      </Card.Body>
    </Card>
  )
}
