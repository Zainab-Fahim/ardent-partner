import React, { useState, useEffect } from 'react'
import db from '../../../firebase'
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
  CBadge,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilHamburgerMenu } from '@coreui/icons'

import { CCard, CCardBody, CCol, CRow } from '@coreui/react'

import { collection, query, onSnapshot } from 'firebase/firestore'

function calcRevenue(sales, price) {
  var total = 0
  total = sales.length * price
  for (var i = 0; i < sales.length; i++) {
    total *= sales[i].quantity
  }
  return total
}

const ViewProductsPage = () => {
  const [order, setOrder] = useState([
    {
      item: [{ name: 'item-name', quantity: 3 }],
      date: '02/09/2022',
      time: '12:40 am',
      id: 2,
      customer: {
        name: 'Kris Doe',
        contact: '011224599',
      },
      quantity: 3,
    },
  ])
  useEffect(
    () =>
      onSnapshot(query(collection(db, 'order')), (orderSnapshot2) => {
        const orderInfoTable = []
        orderSnapshot2.forEach((orderDoc) => {
          var orderInfo = orderDoc.data()
          let itemArr = []
          orderInfo.item.forEach((orderItem) => {
            itemArr.push({ name: orderItem.name, quantity: orderItem.quantity })
          })
          orderInfoTable.push({
            item: itemArr,
            date: orderInfo.timepoint.date,
            time: orderInfo.timepoint.time,
            id: orderDoc.id,
            customer: {
              name: orderInfo.customer.name,
              contact: orderInfo.customer.contact,
            },
            quantity: parseInt(orderInfo.item[0].quantity),
          })
        })
        setOrder(orderInfoTable)
      }),
    [],
  )
  const [product, setProduct] = useState([
    {
      item: {
        id: 'p1235',
        name: 'Cupcakes',
        measurement: 'Pieces',
        price: 100,
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
      ],
      itemStatus: 'menu',
    },
  ])
  useEffect(
    () =>
      onSnapshot(query(collection(db, 'product')), (custSnapshot) => {
        const productArr = []
        custSnapshot.forEach((prodDoc) => {
          var prodInfo = prodDoc.data()
          //get sales history
          let saleList = []
          order.forEach((singleOrder) => {
            singleOrder.item.forEach((orderItem) => {
              if (orderItem.name === prodInfo.name) {
                saleList.push({
                  date: singleOrder.date,
                  time: singleOrder.time,
                  id: singleOrder.id,
                  customer: {
                    name: singleOrder.name,
                    contact: singleOrder.contact,
                  },
                  quantity: singleOrder.quantity,
                })
              }
            })
          })
          productArr.push({
            item: {
              id: prodDoc.id,
              name: prodInfo.name,
              measurement: prodInfo.measurement,
              price: parseInt(prodInfo.price),
            },
            sales: saleList,
            itemStatus: prodInfo.status,
          })
        })
        setProduct(productArr)
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
                    <CIcon icon={cilHamburgerMenu} />
                  </CTableHeaderCell>
                  <CTableHeaderCell>Item</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Total Revenue</CTableHeaderCell>
                  <CTableHeaderCell>Sales History</CTableHeaderCell>
                  <CTableHeaderCell>Item Sale</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {product.map((prod, index) => (
                  <CTableRow v-for="cust in tableItems" key={index}>
                    {/* Avatar */}
                    <CTableDataCell className="text-center">
                      <CAvatar
                        size="md"
                        src={`https://ui-avatars.com/api/?background=random&rounded=true&bold=true&name=${prod.item.id}`}
                      />
                    </CTableDataCell>
                    {/* Item */}
                    <CTableDataCell>
                      <div>{prod.item.name}</div>
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
                    {/* Sales History */}
                    {/* Purchase History */}
                    <CTableDataCell className="text-center">
                      {prod.sales.map((purchase, index) => (
                        <CAccordion v-for="purchase in cust" key={index} flush>
                          <CAccordionItem itemKey={index}>
                            <CAccordionHeader>{purchase.date}</CAccordionHeader>
                            <CAccordionBody>
                              <CTable borderless small>
                                <CTableBody>
                                  <CTableRow v-for="item in tableItems" key={index}>
                                    <CTableHeaderCell scope="row">
                                      Order No.{purchase.id}
                                    </CTableHeaderCell>
                                    <CTableDataCell className="text-center">
                                      <small>{purchase.customer.name}</small> -{' '}
                                      {purchase.customer.contact}
                                    </CTableDataCell>
                                    <CTableDataCell>
                                      {' '}
                                      Ordered Quantity : {purchase.quantity}
                                    </CTableDataCell>
                                  </CTableRow>
                                </CTableBody>
                              </CTable>
                            </CAccordionBody>
                          </CAccordionItem>
                        </CAccordion>
                      ))}
                    </CTableDataCell>
                    {/* Item Sale */}
                    <CTableDataCell>
                      ${prod.item.price} / {prod.item.measurement}
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

export default ViewProductsPage
