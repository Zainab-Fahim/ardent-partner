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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPeople } from '@coreui/icons'

import { CCard, CCardBody, CCol, CRow } from '@coreui/react'

function calcPeriod(order) {
  let end = order[0].date
  let len = order.length
  let start = order[len - 1].date
  return `${start} - ${end}`
}
function calcRevenue(order) {
  var total = 0
  for (var i = 0; i < order.length; i++) {
    for (var j = 0; j < order[i].item.length; j++) {
      var product = order[i].item[j]
      total += product.price * product.quantity
    }
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
    customer: {
      id: 'c1235',
      name: 'Kris Doe',
      contact: '011224599',
    },
    order: [
      {
        date: '02/10/2022',
        time: '12:40 am',
        id: 2,
        item: [
          {
            name: 'Cupcakes',
            price: 100,
            measurement: 'Pieces',
            quantity: 3,
          },
          {
            name: 'Cookies',
            price: 50,
            measurement: 'Pieces',
            quantity: 2,
          },
        ],
      },
      {
        date: '19/10/2022',
        time: '01:40 pm',
        id: 11,
        item: [
          {
            name: 'Ribbon Cake',
            price: 1000,
            measurement: '1 kg',
            quantity: 1,
          },
        ],
      },
      {
        date: '20/09/2022',
        time: '08:13 am',
        id: 5,
        item: [
          {
            name: 'Chicken Thandoori Pizza',
            price: 1000,
            measurement: 'Large',
            quantity: 2,
          },
          {
            name: 'Blueburry Cheese Cake',
            price: 2000,
            measurement: '1 kg',
            quantity: 1,
          },
          {
            name: 'Chicken Submarrine',
            price: 300,
            measurement: 'Large',
            quantity: 5,
          },
        ],
      },
    ],
    frequency: {
      value: 80,
    },
  },
  {
    customer: {
      id: 'c1531',
      name: 'Aleen Doe',
      contact: '011224599',
    },
    order: [
      {
        date: '02/10/2022',
        time: '12:40 am',
        id: 6,
        item: [
          {
            name: 'Cupcakes',
            price: 100,
            measurement: 'Pieces',
            quantity: 3,
          },
          {
            name: 'Cookies',
            price: 50,
            measurement: 'Pieces',
            quantity: 10,
          },
        ],
      },
      {
        date: '20/07/2022',
        time: '08:13 am',
        id: 5,
        item: [
          {
            name: 'Chicken Thandoori Pizza',
            price: 1000,
            measurement: 'Large',
            quantity: 2,
          },
          {
            name: 'Blueburry Cheese Cake',
            price: 2000,
            measurement: '1 kg',
            quantity: 1,
          },
          {
            name: 'Chicken Submarrine',
            price: 300,
            measurement: 'Large',
            quantity: 5,
          },
        ],
      },
    ],
    frequency: {
      value: 50,
    },
  },
]
const VerticallyCentered2 = (cust) => {
  const [visible, setVisible] = useState(false)
  return (
    <>
      <CButton onClick={() => setVisible(!visible)}>View</CButton>
      <CModal alignment="center" scrollable visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>
            <strong>{cust.customer.name}</strong> <small>{cust.customer.contact}</small>
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          {cust.order.map((purchase, index) => (
            <CListGroup v-for="purchase in cust" key={index} flush>
              <CListGroupItem v-for="product in item" key={index} component="a">
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">Order No. {purchase.id}</h5>
                  <small>{purchase.date}</small>
                </div>
                <CTable>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope="col"></CTableHeaderCell>
                      <CTableHeaderCell scope="col"></CTableHeaderCell>
                      <CTableHeaderCell scope="col" className="text-center"></CTableHeaderCell>
                      <CTableHeaderCell scope="col"></CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {purchase.item.map((item, index) => (
                      <CTableRow v-for="item in tableItems" key={index}>
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
                    <CIcon icon={cilPeople} />
                  </CTableHeaderCell>
                  <CTableHeaderCell>Customer</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Total Revenue</CTableHeaderCell>
                  <CTableHeaderCell>Order Frequency</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Purchase History</CTableHeaderCell>
                  <CTableHeaderCell>Last Ordered</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {tableExample.map((cust, index) => (
                  <CTableRow v-for="cust in tableItems" key={index}>
                    {/* Avatar */}
                    <CTableDataCell className="text-center">
                      <CAvatar
                        size="md"
                        src={`https://ui-avatars.com/api/?background=random&rounded=true&bold=true&name=${cust.customer.name}`}
                      />
                    </CTableDataCell>
                    {/* Customer */}
                    <CTableDataCell>
                      <div>
                        {cust.customer.name}
                        {' | '}
                        <span className="small">{cust.customer.id}</span>
                      </div>
                      <div className="small text-medium-emphasis">{cust.customer.contact}</div>
                    </CTableDataCell>
                    {/* Total Revenue */}
                    <CTableDataCell className="text-center">
                      ${calcRevenue(cust.order)}
                    </CTableDataCell>
                    {/* Order Frequency */}
                    <CTableDataCell>
                      <div className="clearfix">
                        <div className="float-start">
                          <strong>{cust.frequency.value}%</strong>
                        </div>
                        <div className="float-end">
                          <small className="text-medium-emphasis">{calcPeriod(cust.order)}</small>
                        </div>
                      </div>
                      <CProgress
                        thin
                        color={freqColor(cust.frequency.value)}
                        value={cust.frequency.value}
                      />
                    </CTableDataCell>
                    {/* Purchase History */}
                    <CTableDataCell className="text-center">
                      {VerticallyCentered2(cust)}
                    </CTableDataCell>
                    {/* Last Ordered */}
                    <CTableDataCell>
                      <span className="text-medium-emphasis small">{cust.order[0].time}</span>
                      <div>{cust.order[0].date}</div>
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
