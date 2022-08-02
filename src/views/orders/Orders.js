import React, { useEffect, useState } from 'react'
import {
  CAvatar,
  CBadge,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilFastfood } from '@coreui/icons'

import { CCard, CCardBody, CCol, CRow } from '@coreui/react'
import db from '../../firebase'
import { collection, query, onSnapshot } from 'firebase/firestore'

//main component
const OrderPage = () => {
  const [order, setOrder] = useState([
    {
      id: `#id`,
      customer: {
        name: 'Full Name',
        contact: '011224599',
      },
      timepoint: {
        date: '02/10/2022',
        time: '12:40 am',
      },
      item: [
        {
          name: 'Cupcakes',
          price: 100,
          measurement: 'Pieces',
          quantity: 3,
        },
      ],
      status: 'pending',
      type: 'instant',
      total: 333,
    },
  ])
  useEffect(
    () =>
      onSnapshot(query(collection(db, 'order')), (orderSnapshot2) => {
        const orderInfoTable = []
        orderSnapshot2.forEach((orderDoc) => {
          var orderInfo = orderDoc.data()
          let itemArr = []
          orderInfo.item.forEach((item) => {
            itemArr.push({
              name: item.name,
              price: parseInt(item.price),
              measurement: item.measurement,
              quantity: parseInt(item.quantity),
            })
          })
          orderInfoTable.push({
            id: orderDoc.id,
            customer: { name: orderInfo.customer.name, contact: orderInfo.customer.contact },
            timepoint: { date: orderInfo.timepoint.date, time: orderInfo.timepoint.time },
            item: itemArr,
            status: orderInfo.status,
            type: orderInfo.type,
            total: orderInfo.total,
          })
        })
        setOrder(orderInfoTable)
      }),
    [],
  )
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardBody>
            <CTable align="middle" className="mb-0 border" hover responsive>
              <CTableHead color="light">
                <CTableRow>
                  <CTableHeaderCell className="text-center">
                    <CIcon icon={cilFastfood} />
                  </CTableHeaderCell>
                  <CTableHeaderCell>Customer</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Order Type</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Total</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Order Status</CTableHeaderCell>
                  <CTableHeaderCell>Items Ordered</CTableHeaderCell>
                  <CTableHeaderCell>Order Timepoint</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {order.map((order, index) => (
                  <CTableRow v-for="cust in tableItems" key={index}>
                    {/* Avatar */}
                    <CTableDataCell className="text-center">
                      <CAvatar
                        size="md"
                        src={`https://ui-avatars.com/api/?background=random&rounded=true&bold=true&name=${order.id}`}
                      />
                    </CTableDataCell>
                    {/* Customer */}
                    <CTableDataCell>
                      <div>
                        {order.customer.name}
                        <span className="small">{order.customer.id}</span>
                      </div>
                      <div className="small text-medium-emphasis">{order.customer.contact}</div>
                    </CTableDataCell>
                    {/* Order Type */}
                    <CTableDataCell className="text-center">
                      <CBadge color={order.type === 'menu' ? 'info' : 'warning'}>
                        {order.type}
                      </CBadge>
                    </CTableDataCell>
                    {/* Total Revenue */}
                    <CTableDataCell className="text-center">${order.total}</CTableDataCell>
                    {/* Order Frequency */}
                    <CTableDataCell className="text-center">
                      <CBadge
                        color={
                          order.status === 'purchased'
                            ? 'success'
                            : order.status === 'confirmed'
                            ? 'dark'
                            : 'danger'
                        }
                      >
                        {order.status}
                      </CBadge>
                    </CTableDataCell>
                    {/* Purchase History */}
                    <CTableDataCell>
                      {' '}
                      {order.item.map((item, index) => (
                        <div v-for="item in tableItems" key={index}>
                          <span>{item.name}</span>
                          <small> ({item.measurement}</small> x {item.quantity})
                        </div>
                      ))}
                    </CTableDataCell>
                    {/* Last Ordered */}
                    <CTableDataCell>
                      <span className="text-medium-emphasis small">{order.timepoint.time}</span>
                      <div>{order.timepoint.date}</div>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default OrderPage
