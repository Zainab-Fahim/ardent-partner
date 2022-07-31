import React, { useEffect, useState } from 'react'
import db from '../../firebase'
import {
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
  CAvatar,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPeople } from '@coreui/icons'

import { CCard, CCardBody, CCol, CRow } from '@coreui/react'
import { collection, query, onSnapshot } from 'firebase/firestore'

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

const CustomerPage = () => {
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
  //CUST STATE
  const [customer, setCust] = useState([
    {
      customer: {
        id: '#id',
        name: 'Full Name',
        contact: '011224599',
      },
      order: [
        {
          timepoint: { date: 'dd/mm/yyyy', time: 'hh:mm:ss' },
          id: '#id',
          item: [
            {
              name: 'product name',
              price: 100,
              measurement: 'measuremnet',
              quantity: 3,
            },
            {
              name: 'Cookies',
              price: 50,
              measurement: 'measurement',
              quantity: 2,
            },
          ],
        },
      ],
      frequency: {
        value: 80,
      },
    },
  ])
  useEffect(
    () =>
      onSnapshot(query(collection(db, 'customer')), (custSnapshot) => {
        const customerArr = []
        custSnapshot.forEach((custItem) => {
          //customers.push(custItem.data().name)
          let orderList = []
          order.forEach((singleOrder) => {
            if (singleOrder.customer.contact === custItem.data().contact) {
              orderList.push(singleOrder)
            }
          })
          customerArr.push({
            customer: {
              id: '#id',
              name: custItem.data().name,
              contact: custItem.data().contact,
            },
            order: orderList,
            frequency: {
              value: 80,
            },
          })
        })
        setCust(customerArr)
      }),
    [order],
  )

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardBody>
            <CTable align="middle" className="mb-0 border" responsive>
              <CTableHead color="light">
                <CTableRow>
                  <CTableHeaderCell className="text-center">
                    <CIcon icon={cilPeople} />
                  </CTableHeaderCell>
                  <CTableHeaderCell>Customer</CTableHeaderCell>
                  <CTableHeaderCell>Contact</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Total Revenue</CTableHeaderCell>
                  <CTableHeaderCell>Purchase History</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {customer.map((cust, index) => (
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
                      <div>{cust.customer.name}</div>
                    </CTableDataCell>
                    {/* Customer Contact */}
                    <CTableDataCell>
                      <div>{cust.customer.contact}</div>
                    </CTableDataCell>
                    {/* Total Revenue */}
                    <CTableDataCell className="text-center">
                      ${calcRevenue(cust.order)}
                    </CTableDataCell>
                    {/* Purchase History */}
                    <CTableDataCell className="text-center">
                      {cust.order.map((purchase, index) => (
                        <CAccordion v-for="purchase in cust" key={index} flush>
                          <CAccordionItem itemKey={index}>
                            <CAccordionHeader>
                              {purchase.timepoint.date} - {purchase.timepoint.time}
                            </CAccordionHeader>
                            <CAccordionBody>
                              <CTable borderless small>
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
                            </CAccordionBody>
                          </CAccordionItem>
                        </CAccordion>
                      ))}
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

export default CustomerPage
