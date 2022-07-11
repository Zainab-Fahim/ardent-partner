import React, { useState } from 'react'
import {
  CButton,
  CPagination,
  CPaginationItem,
  CAvatar,
  CProgress,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CListGroup,
  CListGroupItem,
  CBadge,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilHamburgerMenu } from '@coreui/icons'

import { CCard, CCardBody, CCol, CRow } from '@coreui/react'

import avatar1 from 'src/assets/images/avatars/1.jpg'

function calcPeriod(sales) {
  let end = sales[0].date
  let len = sales.length
  let start = sales[len - 1].date
  return `${start} - ${end}`
}

function calcRevenue(sales, price) {
  var total = 0
  total = sales.length * price
  for (var i = 0; i < sales.length; i++) {
    total *= sales[i].quantity
  }
  return total
}

function freqColor(val) {
  if (val > 0 && val < 30) {
    return 'danger'
  } else if (val >= 30 && val < 70) {
    return 'dark'
  } else if (val >= 70 && val <= 100) {
    return 'success'
  }
}

const tableExample = [
  {
    item: {
      id: 'p1235',
      name: 'Cupcakes',
      measurement: 'Pieces',
      price: 100,
      avatar: avatar1,
    },
    sales: [
      {
        date: '02/09/2022',
        time: '12:40 am',
        id: 2,
        customer: {
          name: 'Kris Doe',
          contact: '011224599',
        },
        quantity: 3,
      },
      {
        date: '02/10/2022',
        time: '12:40 am',
        id: 6,
        customer: {
          name: 'Aleen Doe',
          contact: '011224599',
        },
        quantity: 3,
      },
    ],
    frequency: {
      value: 100,
    },
    itemStatus: 'menu',
  },
  {
    item: {
      id: 'p1236',
      name: 'Cookies',
      measurement: 'Pieces',
      price: 50,
      avatar: avatar1,
    },
    sales: [
      {
        date: '02/10/2022',
        time: '12:40 am',
        id: 2,
        customer: {
          name: 'Kris Doe',
          contact: '011224599',
        },
        quantity: 10,
      },
      {
        date: '02/10/2022',
        time: '12:40 am',
        id: 6,
        customer: {
          name: 'Aleen Doe',
          contact: '011224599',
        },
        quantity: 2,
      },
    ],
    frequency: {
      value: 50,
    },
    itemStatus: 'menu',
  },
  {
    item: {
      id: 'p1237',
      name: 'Ribbon Cake',
      measurement: '1 Kg',
      price: 1000,
      avatar: avatar1,
    },
    sales: [
      {
        date: '19/10/2022',
        time: '01:40 pm',
        id: 11,
        customer: {
          name: 'Kris Doe',
          contact: '011224599',
        },
        quantity: 1,
      },
    ],
    frequency: {
      value: 70,
    },
    itemStatus: 'menu',
  },
  {
    item: {
      id: 'p1238',
      name: 'Chicken Thandoori Pizza',
      measurement: 'Large',
      price: 1000,
      avatar: avatar1,
    },
    sales: [
      {
        date: '20/09/2022',
        time: '08:13 am',
        id: 5,
        customer: {
          name: 'Kris Doe',
          contact: '011224599',
        },
        quantity: 2,
      },
      {
        date: '20/07/2022',
        time: '08:13 am',
        id: 5,
        customer: {
          name: 'Aleen Doe',
          contact: '011224599',
        },
        quantity: 2,
      },
    ],
    frequency: {
      value: 60,
    },
    itemStatus: 'menu',
  },
  {
    item: {
      id: 'p1263',
      name: 'Blueburry Cheese Cake',
      measurement: '1 Kg',
      price: 2000,
      avatar: avatar1,
    },
    sales: [
      {
        date: '20/09/2022',
        time: '08:13 am',
        id: 5,
        customer: {
          name: 'Kris Doe',
          contact: '011224599',
        },
        quantity: 1,
      },
      {
        date: '20/07/2022',
        time: '08:13 am',
        id: 5,
        customer: {
          name: 'Aleen Doe',
          contact: '011224599',
        },
        quantity: 1,
      },
    ],
    frequency: {
      value: 30,
    },
    itemStatus: 'menu',
  },
  {
    item: {
      id: 'p1268',
      name: 'Chicken Submarrine',
      measurement: 'Large',
      price: 300,
      avatar: avatar1,
    },
    sales: [
      {
        date: '20/09/2022',
        time: '08:13 am',
        id: 5,
        customer: {
          name: 'Kris Doe',
          contact: '011224599',
        },
        quantity: 5,
      },
      {
        date: '20/07/2022',
        time: '08:13 am',
        id: 5,
        customer: {
          name: 'Aleen Doe',
          contact: '011224599',
        },
        quantity: 5,
      },
    ],
    frequency: {
      value: 20,
    },
    itemStatus: 'menu',
  },
]
const VerticallyCentered2 = (prod) => {
  const [visible, setVisible] = useState(false)
  return (
    <>
      <CButton onClick={() => setVisible(!visible)}>View</CButton>
      <CModal alignment="center" scrollable visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>
            <strong>{prod.item.name} </strong> <small> {prod.item.measurement}</small>
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          {prod.sales.map((order, index) => (
            <CListGroup v-for="order in prod" key={index} flush>
              <CListGroupItem v-for="product in item" key={index} component="a">
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">Order No. {order.id}</h5>
                  <small>
                    {order.date} | {order.time}
                  </small>
                </div>
                <p className="mb-1">
                  {order.customer.name} - <small>{order.customer.contact}</small>
                </p>
                <small className="text-medium-emphasis">Ordered Quantity: {order.quantity}</small>
              </CListGroupItem>
            </CListGroup>
          ))}
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={() => setVisible(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}
const Alerts = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardBody>
            <CTable align="middle" className="mb-0 border" hover responsive>
              <CTableHead color="light">
                <CTableRow>
                  <CTableHeaderCell className="text-center">
                    <CIcon icon={cilHamburgerMenu} />
                  </CTableHeaderCell>
                  <CTableHeaderCell>Item</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Total Revenue</CTableHeaderCell>
                  <CTableHeaderCell>Sales Frequency</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Sales History</CTableHeaderCell>
                  <CTableHeaderCell>Item Sale</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {tableExample.map((prod, index) => (
                  <CTableRow v-for="cust in tableItems" key={index}>
                    {/* Avatar */}
                    <CTableDataCell className="text-center">
                      <CAvatar size="md" src={prod.item.avatar} />
                    </CTableDataCell>
                    {/* Item */}
                    <CTableDataCell>
                      <div>
                        {prod.item.name}
                        {' | '}
                        <span className="small">{prod.item.id}</span>
                      </div>
                      <div className="small text-medium-emphasis">
                        <CBadge color={prod.itemStatus === 'menu' ? 'info' : 'warning'}>
                          {prod.itemStatus}
                        </CBadge>
                      </div>
                    </CTableDataCell>
                    {/* Total Revenue */}
                    <CTableDataCell className="text-center">
                      ${calcRevenue(prod.sales, prod.item.price)}
                    </CTableDataCell>
                    {/* Sales Frequency */}
                    <CTableDataCell>
                      <div className="clearfix">
                        <div className="float-start">
                          <strong>{prod.frequency.value}%</strong>
                        </div>
                        <div className="float-end">
                          <small className="text-medium-emphasis">{calcPeriod(prod.sales)}</small>
                        </div>
                      </div>
                      <CProgress
                        thin
                        color={freqColor(prod.frequency.value)}
                        value={prod.frequency.value}
                      />
                    </CTableDataCell>
                    {/* Sales History */}
                    <CTableDataCell className="text-center">
                      {VerticallyCentered2(prod)}
                    </CTableDataCell>
                    {/* Item Sale */}
                    <CTableDataCell>
                      ${prod.item.price} / {prod.item.measurement}
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
            <div style={{ paddingTop: '1rem' }}>
              <CPagination className="justify-content-end" aria-label="Page navigation example">
                <CPaginationItem disabled>Previous</CPaginationItem>
                <CPaginationItem>1</CPaginationItem>
                <CPaginationItem>2</CPaginationItem>
                <CPaginationItem>3</CPaginationItem>
                <CPaginationItem>Next</CPaginationItem>
              </CPagination>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Alerts
