import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from './Message'
import { listOrders } from './actions/orderActions'
import { Table, Button, Row, Col, Container } from 'react-bootstrap'

import {
  createOrder
} from './actions/orderActions'
import { ORDER_CREATE_RESET } from './constants/orderConstants'

const OrderListScreen = () => {
  const dispatch = useDispatch()

  const orderList = useSelector((state) => state.orderList)
  const { loading, error, orders } = orderList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo) {
      dispatch(listOrders())
    } else {
      window.location.href='/login'
    }
  }, [dispatch, userInfo])
  const orderCreate = useSelector((state) => state.orderCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    order: createdOrder,
  } = orderCreate

  useEffect(() => {
    dispatch({ type: ORDER_CREATE_RESET })

    if (successCreate) {
      window.location.href=`/admin/order/${createdOrder._id}/edit`;
    } else {
      dispatch(listOrders(''))
    }
  }, [
    dispatch,
    userInfo,
    successCreate,
    createdOrder,
  ])
  const createOrderHandler = () => {
    dispatch(createOrder())
  }

  return (
    <>
    <Row className='align-items-center'>
        <Col>
          <h1>Order</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createOrderHandler}>
            <i className='fas fa-plus'></i> Create Order
          </Button>
        </Col>
    </Row>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>${order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    <i className='fas fa-check' style={{ color: 'green' }}></i>
                    ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    <i className='fas fa-check' style={{ color: 'green' }}></i>
                    ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button variant='light' 
                    className='btn-sm' 
                    style={{backgroundColor:'red'}}
                    >
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default OrderListScreen
