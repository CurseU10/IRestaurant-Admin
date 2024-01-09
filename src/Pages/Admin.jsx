import { useState, useEffect } from 'react'
import { Table, Button } from 'react-bootstrap'
import axios from 'axios'

const Admin = () => {
  const [orders, setOrders] = useState([])
  const [servedState, setServed] = useState([])

  useEffect(() => {
    const fetchOrders = async () => {
      const rid = window.localStorage.getItem('rid')
      const { data } = await axios.get(
        `http://localhost:8080/menu/nonServed/${rid}`
      )
      setOrders(data)
      setServed(Array(data.length).fill(false))
    }
    fetchOrders()
  }, [])

  const changeServedStatus = async (index) => {
    setServed((prevservedState) =>
      prevservedState.map((i) =>
        i === index ? servedState(false) : servedState(true)
      )
    )

    const fetchServedOrders = async () => {
      const { data } = await axios.get(
        `http://localhost:8080/menu/updateServed/${orders.oid}`
      )
      setOrders(data)
    }
    fetchServedOrders()
  }

  return (
    <>
      <h1>Orders</h1>
      <Table striped bordered hover responsive className="table-sm">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Created On</th>
            <th>Customer Name</th>
            <th>Items</th>
            <th>Total</th>
            <th>Table Number</th>
            <th>Served</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order.oid}>
              <td>{order.oid}</td>
              <td>{order.createdon}</td>
              <td>{order.oname}</td>
              <td>{order.oitems}</td>
              <td>{order.oprice}</td>
              <td>{order.tableno}</td>
              <td>
                <Button
                  onClick={() => changeServedStatus(order.oid)}
                  variant={servedState ? 'primary' : 'light'}
                  className="btn-sm"
                >
                  {servedState[order.oid] ? 'Yes' : 'No'}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}

export default Admin
