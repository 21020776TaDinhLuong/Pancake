import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listOrders } from './actions/orderActions'
import { listCares } from './actions/careActions'
import Message from './Message'

const UserInfo = () => {
  const [customerName, setCustomerName] = useState('')
  const [customerInfo, setCustomerInfo] = useState(null)

  const dispatch = useDispatch()

  const orderList = useSelector((state) => state.orderList)
  const { loading: loadingOrders, error: errorOrders, orders } = orderList

  const careList = useSelector((state) => state.careList)
  const { loading: loadingCares, error: errorCares, cares } = careList

  const handleSubmit = (e) => {
    console.log(orders)
    e.preventDefault()
    const filteredOrders = orders.filter(order => order.user === customerName)
    const filteredCares = cares.filter(care => care.customer === customerName)

    setCustomerInfo({
      orders: filteredOrders,
      cares: filteredCares,
    })
  }

  useEffect(() => {
    dispatch(listOrders())
    dispatch(listCares())
  }, [dispatch])

  return (
    <div>
      <h1>User Information</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter customer name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>

      {loadingOrders || loadingCares ? (
        <p>Loading...</p>
      ) : errorOrders ? (
        <Message variant='danger'>{errorOrders}</Message>
      ) : errorCares ? (
        <Message variant='danger'>{errorCares}</Message>
      ) : customerInfo ? (
        <div>
          <h2>Customer Info for {customerName}</h2>
          <h3>Orders</h3>
          <ul>
            {customerInfo.orders.map(order => (
              <li key={order._id}>
                {order._id} - Total: ${order.totalPrice}
              </li>
            ))}
          </ul>
          <h3>Cares</h3>
          <ul>
            {customerInfo.cares.map(care => (
              <li key={care._id}>
                {care._id} - Method: {care.method} - Content: {care.content}
              </li>
            ))}
          </ul>
        </div>
      ) : ''}
    </div>
  )
}

export default UserInfo
