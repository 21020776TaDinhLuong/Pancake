import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from './Message';
import FormContainer from './FormContainer';
import { updateOrder } from './actions/orderActions';
import { ORDER_UPDATE_RESET } from './constants/orderConstants';

const OrderAddScreen = () => {
  const { id: orderId } = useParams();
  const navigate = useNavigate();

  const [orderItems, setOrderItems] = useState('');
  const [user, setUser] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [itemsPrice, setItemsPrice] = useState(0);
  const [taxPrice, setTaxPrice] = useState(0);
  const [shippingPrice, setShippingPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [error, setError] = useState('');

  const dispatch = useDispatch();

  const orderUpdate = useSelector((state) => state.orderUpdate);
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = orderUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: ORDER_UPDATE_RESET });
      navigate('/admin/orderlist');
    }
    // Load order details if needed
  }, [dispatch, navigate, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (!orderItems || !shippingAddress || !paymentMethod) {
      setError('Please fill in all required fields.');
      return;
    }

    dispatch(
      updateOrder({
        _id: orderId,
        user,
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      })
    );
  };

  return (
    <Container>
      <Link to='/admin/orderlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <h1>Update Order</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
      {loadingUpdate && <p>Loading...</p>}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='user'>
          <Form.Label>User</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter UserName'
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='orderItems'>
          <Form.Label>Order Items</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter order items'
            value={orderItems}
            onChange={(e) => setOrderItems(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='shippingAddress'>
          <Form.Label>Shipping Address</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter shipping address'
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='paymentMethod'>
          <Form.Label>Payment Method</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter payment method'
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='itemsPrice'>
          <Form.Label>Items Price</Form.Label>
          <Form.Control
            type='number'
            placeholder='Enter items price'
            value={itemsPrice}
            onChange={(e) => setItemsPrice(Number(e.target.value))}
          />
        </Form.Group>
        <Form.Group controlId='taxPrice'>
          <Form.Label>Tax Price</Form.Label>
          <Form.Control
            type='number'
            placeholder='Enter tax price'
            value={taxPrice}
            onChange={(e) => setTaxPrice(Number(e.target.value))}
          />
        </Form.Group>
        <Form.Group controlId='shippingPrice'>
          <Form.Label>Shipping Price</Form.Label>
          <Form.Control
            type='number'
            placeholder='Enter shipping price'
            value={shippingPrice}
            onChange={(e) => setShippingPrice(Number(e.target.value))}
          />
        </Form.Group>
        <Form.Group controlId='totalPrice'>
          <Form.Label>Total Price</Form.Label>
          <Form.Control
            type='number'
            placeholder='Enter total price'
            value={totalPrice}
            onChange={(e) => setTotalPrice(Number(e.target.value))}
          />
        </Form.Group>
        <Button type='submit' variant='primary'>
          Update Order
        </Button>
      </Form>
    </Container>
  );
};

export default OrderAddScreen;
