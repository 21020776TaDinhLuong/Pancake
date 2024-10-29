import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from './Message'
import FormContainer from './FormContainer'
import { updateCare } from './actions/careActions'
import { CARE_UPDATE_RESET } from './constants/careConstants'

const CareAddScreen = () => {
  const { id: careId } = useParams()

  const [selectedMethod, setSelectedMethod] = useState('')
  const [customer, setCustomer] = useState('')
  const [staff, setStaff] = useState('')
  const [content, setContent] = useState('')
  const [error, setError] = useState('')

  const dispatch = useDispatch()

  const careUpdate = useSelector((state) => state.careUpdate)
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = careUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: CARE_UPDATE_RESET })
      window.location.href = '/admin/carelist'
    }
  }, [dispatch, successUpdate])

  const submitHandler = (e) => {
    e.preventDefault()

    if (!customer || !staff || !content || !selectedMethod) {
      setError('Please fill in all required fields.')
      return
    }

    dispatch(
      updateCare({
        _id: careId,
        customer,
        staff,
        method: selectedMethod,
        content
      })
    )
  }

  return (
    <>
      <Link to='/admin/carelist' className='btn btn-light my-3'>Go Back</Link>
      <FormContainer>
        <h1>Update Care</h1>
        {error && <Message variant='danger'>{error}</Message>}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loadingUpdate && <p>Loading...</p>}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='customer'>
            <Form.Label>Customer</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter Customer'
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='staff'>
            <Form.Label>Staff</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter Staff'
              value={staff}
              onChange={(e) => setStaff(e.target.value)}
            ></Form.Control>
          </Form.Group>


          <Form.Group controlId='selectMethod'>
            <Form.Label>Select Method</Form.Label>
            <Form.Control
              as='select'
              value={selectedMethod}
              onChange={(e) => setSelectedMethod(e.target.value)}
            >
              <option value=''>--Select--</option>
              <option value='Zalo'>Zalo</option>
              <option value='Messenger'>Messenger</option>
              <option value='Phone'>Phone</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId='content'>
            <Form.Label>Content</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter Content'
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type='submit' variant='primary'>Update Care</Button>
        </Form>
      </FormContainer>
    </>
  )
}

export default CareAddScreen
