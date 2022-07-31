import React, { useEffect, useState } from 'react'
import db from '../../firebase'

import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTableCaption,
  CBadge,
  CToaster,
  CToast,
  CToastHeader,
  CToastBody,
  CToastClose,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilFastfood, cilMoney, cilChatBubble, cilCheckAlt } from '@coreui/icons'

import { collection, query, where, updateDoc, doc, onSnapshot } from 'firebase/firestore'

async function setConfirmed(id) {
  const incoming = doc(db, 'order', `${id}`)
  await updateDoc(incoming, {
    status: 'confirmed',
  })
}
async function setPurchased(id) {
  const confirmed = doc(db, 'order', `${id}`)
  await updateDoc(confirmed, {
    status: 'purchased',
  })
}
const Dashboard = () => {
  const [orderPending, setOrderPending] = useState([
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
      type: 'menu',
      total: 333,
    },
  ])
  useEffect(
    () =>
      onSnapshot(
        query(collection(db, 'order'), where('status', '==', 'pending')),
        (orderSnapshot2) => {
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
          setOrderPending(orderInfoTable)
        },
      ),
    [],
  )
  const [orderConfirmed, setOrderConfirmed] = useState([
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
      type: 'menu',
      total: 333,
    },
  ])
  useEffect(
    () =>
      onSnapshot(
        query(collection(db, 'order'), where('status', '==', 'confirmed')),
        (orderSnapshot2) => {
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
              customer: { name: orderInfo.customer.name, contact: orderInfo.customer.number },
              timepoint: { date: orderInfo.timepoint.date, time: orderInfo.timepoint.time },
              item: itemArr,
              status: orderInfo.status,
              type: orderInfo.type,
              total: orderInfo.total,
            })
          })
          setOrderConfirmed(orderInfoTable)
        },
      ),
    [],
  )

  return (
    <div>
      <CRow xs={{ cols: 1 }} md={{ cols: 2 }}>
        {/* incoming orders */}
        <CCol md={6}>
          <CCard className="mb-4">
            <CCardBody>
              <CRow>
                <CCol sm={7}>
                  <h4 id="traffic" className="card-title mb-0">
                    Incoming Orders
                  </h4>
                </CCol>
                <CCol sm={5} className="d-none d-md-block"></CCol>
              </CRow>
              <CRow>
                <>
                  {orderPending.map((order, index) => (
                    <CToaster key={index} md={6}>
                      <CToast autohide={false} visible={true}>
                        <CToastHeader>
                          <CCol xs={1.5}>
                            <CIcon icon={cilFastfood} className="me-2" size="xl" />
                          </CCol>
                          <CCol xs={6}>
                            <strong style={{ padding: '.5rem' }}>Order No. {order.id}</strong>{' '}
                            {'     '}
                            <CBadge color={order.type === 'off-the-shelf' ? 'warning' : 'info'}>
                              {order.type}
                            </CBadge>
                          </CCol>
                          <CCol xs={5}>
                            <div className="float-end">
                              {order.timepoint.date} <small>{order.timepoint.time}</small>
                            </div>
                          </CCol>
                        </CToastHeader>
                        <CToastBody>
                          <CTable borderless caption="top">
                            <CTableCaption>
                              <div className="text-medium-emphasis">
                                {order.customer.name} {order.customer.contact}
                                <CButton
                                  color="dark"
                                  variant="ghost"
                                  size="sm"
                                  className="float-end"
                                >
                                  <CIcon icon={cilChatBubble} className="me-2" />
                                  Chat
                                </CButton>
                              </div>{' '}
                            </CTableCaption>
                            <CTableHead>
                              <CTableRow>
                                <CTableHeaderCell scope="col"></CTableHeaderCell>
                                <CTableHeaderCell scope="col"></CTableHeaderCell>
                                <CTableHeaderCell
                                  scope="col"
                                  className="text-center"
                                ></CTableHeaderCell>
                                <CTableHeaderCell scope="col"></CTableHeaderCell>
                              </CTableRow>
                            </CTableHead>
                            <CTableBody>
                              {order.item.map((item, index) => (
                                <CTableRow v-for="item in order" key={index}>
                                  <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                                  <CTableDataCell scope="row">{item.name}</CTableDataCell>
                                  <CTableDataCell className="text-center">
                                    <small>{item.measurement}</small> x {item.quantity}
                                  </CTableDataCell>
                                  <CTableDataCell>${item.price * item.quantity}</CTableDataCell>
                                </CTableRow>
                              ))}
                            </CTableBody>
                          </CTable>
                          <div className="mt-2 pt-2 border-top">
                            <CButton
                              style={{ margin: '0', padding: '0' }}
                              onClick={() => setConfirmed(order.id)}
                            >
                              <CToastClose component={CButton} color="primary" size="sm">
                                <CIcon icon={cilCheckAlt} className="me-2" />
                                Accept Order
                              </CToastClose>
                            </CButton>
                          </div>
                        </CToastBody>
                      </CToast>
                    </CToaster>
                  ))}
                </>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
        {/* confirmed orders */}
        <CCol md={6}>
          <CCard className="mb-4">
            <CCardBody>
              <CRow>
                <CCol sm={7}>
                  <h4 id="traffic" className="card-title mb-0">
                    Confirmed Orders
                  </h4>
                </CCol>
                <CCol sm={5} className="d-none d-md-block"></CCol>
              </CRow>
              <CRow>
                <>
                  {orderConfirmed.map((order, index) => (
                    <CToaster key={index} md={6}>
                      <CToast autohide={false} visible={true}>
                        <CToastHeader>
                          <CCol xs={1.5}>
                            <CIcon icon={cilFastfood} className="me-2" size="xl" />
                          </CCol>
                          <CCol xs={6}>
                            <strong style={{ padding: '.5rem' }}>Order No. {order.id}</strong>{' '}
                            {'     '}
                            <CBadge color={order.type === 'off-the-shelf' ? 'warning' : 'info'}>
                              {order.type}
                            </CBadge>
                          </CCol>
                          <CCol xs={5}>
                            <div className="float-end">
                              {order.timepoint.date} <small>{order.timepoint.time}</small>
                            </div>
                          </CCol>
                        </CToastHeader>
                        <CToastBody>
                          <CTable borderless caption="top">
                            <CTableCaption>
                              <div className="text-medium-emphasis">
                                {order.customer.name} {order.customer.contact}
                                <CButton
                                  color="dark"
                                  variant="ghost"
                                  size="sm"
                                  className="float-end"
                                >
                                  <CIcon icon={cilChatBubble} className="me-2" />
                                  Chat
                                </CButton>
                              </div>{' '}
                            </CTableCaption>
                            <CTableHead>
                              <CTableRow>
                                <CTableHeaderCell scope="col"></CTableHeaderCell>
                                <CTableHeaderCell scope="col"></CTableHeaderCell>
                                <CTableHeaderCell
                                  scope="col"
                                  className="text-center"
                                ></CTableHeaderCell>
                                <CTableHeaderCell scope="col"></CTableHeaderCell>
                              </CTableRow>
                            </CTableHead>
                            <CTableBody>
                              {order.item.map((item, index) => (
                                <CTableRow v-for="item in order" key={index}>
                                  <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                                  <CTableDataCell scope="row">{item.name}</CTableDataCell>
                                  <CTableDataCell className="text-center">
                                    <small>{item.measurement}</small> x {item.quantity}
                                  </CTableDataCell>
                                  <CTableDataCell>${item.price * item.quantity}</CTableDataCell>
                                </CTableRow>
                              ))}
                            </CTableBody>
                          </CTable>
                          <div className="mt-2 pt-2 border-top">
                            <CButton
                              style={{ margin: '0', padding: '0', backgroundColor: 'none' }}
                              onClick={() => setPurchased(order.id)}
                            >
                              <CToastClose
                                component={CButton}
                                color="success"
                                size="sm"
                                className="ms-1"
                              >
                                <CIcon icon={cilMoney} className="me-2" />
                                Purchased = ${order.total}
                              </CToastClose>
                            </CButton>
                          </div>
                        </CToastBody>
                      </CToast>
                    </CToaster>
                  ))}
                </>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  )
}

export default Dashboard
