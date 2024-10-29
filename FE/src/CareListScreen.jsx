import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from './Message'
import { listCares, createCare } from './actions/careActions'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { CARE_CREATE_RESET } from './constants/careConstants'

const CareListScreen = () => {
  const dispatch = useDispatch()

  const careList = useSelector((state) => state.careList)
  const { loading, error, cares } = careList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo) {
      dispatch(listCares())
    } else {
      window.location.href = '/login'
    }
  }, [dispatch, userInfo])

  const careCreate = useSelector((state) => state.careCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    care: createdCare,
  } = careCreate

  useEffect(() => {
    dispatch({ type: CARE_CREATE_RESET })

    if (!userInfo) {
      window.location.href = '/login'
    }

    if (successCreate) {
      window.location.href = `/admin/care/${createdCare._id}/edit`
    } else {
      dispatch(listCares(''))
    }
  }, [dispatch, userInfo, successCreate, createdCare])

  const createCareHandler = () => {
    dispatch(createCare())
  }

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Customer Care Diary</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createCareHandler}>
            <i className='fas fa-plus'></i> Create Care
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
              <th>CUSTOMER</th>
              <th>STAFF</th>
              <th>METHOD</th>
              <th>CONTENT</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {cares.map((care) => (
              <tr key={care._id}>
                <td>{care._id}</td>
                <td>{care.customer}</td>
                <td>{care.staff}</td>
                <td>{care.method}</td>
                <td>{care.content}</td>
                <td>
                  <LinkContainer to={`/admin/care/${care._id}/edit`}>
                    <Button variant='light' className='btn-sm' style={{ backgroundColor: 'red' }}>
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

export default CareListScreen
