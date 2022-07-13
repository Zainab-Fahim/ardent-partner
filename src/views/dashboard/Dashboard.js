import React, { useEffect, useState } from 'react'
import db from '../../firebase'

import {
  CAvatar,
  CButton,
  CCard,
  CCardTitle,
  CCardText,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCardImage,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CBadge,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilCalendar, cilContact, cilPin } from '@coreui/icons'

import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar4 from 'src/assets/images/avatars/4.jpg'
import avatar5 from 'src/assets/images/avatars/5.jpg'

import WidgetsDropdown from '../widgets/WidgetsDropdown'

import ReactImg from 'src/assets/images/react.jpg'
import { collection, onSnapshot } from 'firebase/firestore'

const Dashboard = () => {
  const progressGroupExample1 = [
    { title: 'Week 1', value1: 34, value2: 78 },
    { title: 'Week 2', value1: 56, value2: 94 },
    { title: 'Week 3', value1: 12, value2: 67 },
    { title: 'Week 4', value1: 43, value2: 91 },
  ]

  const recentOrder = [
    {
      avatar: avatar1,
      name: 'Cookie',
      measurement: 'piece',
      id: 'p12345',
      price: 50,
      itemStatus: 'menu',
    },
    {
      avatar: avatar2,
      name: 'Cupcake',
      measurement: 'piece',
      id: 'p12345',
      price: 100,
      itemStatus: 'menu',
    },
    {
      avatar: avatar4,
      name: 'Ribbon Cake',
      measurement: '1 Kg',
      id: 'p12345',
      price: 1000,
      itemStatus: 'menu',
    },
    {
      avatar: avatar5,
      name: 'Chicken Thandoori Pizza',
      measurement: 'Large',
      id: 'p12345',
      price: 1000,
      itemStatus: 'menu',
    },
  ]

  const trendingOrders = [
    {
      image: ReactImg,
      name: 'Chocolate Chip Cookie',
      measurement: 'piece',
      orders: 34,
      price: 15,
    },
    {
      image: ReactImg,
      name: 'Blueburry Cheese Cake',
      measurement: '1 Kg',
      orders: 34,
      price: 50,
    },
    {
      image: ReactImg,
      name: 'Vanilla Cupcake',
      measurement: 'piece',
      orders: 64,
      price: 10,
    },
    {
      image: ReactImg,
      name: 'Fish Patty',
      measurement: 'piece',
      orders: 40,
      price: 5,
    },
    {
      image: ReactImg,
      name: 'Chicken Thandoori Pizza',
      measurement: 'Large',
      orders: 3,
      price: 100,
    },
    {
      image: ReactImg,
      name: 'Fish Roll',
      measurement: 'piece',
      orders: 4,
      price: 15,
    },
  ]

  const supportTicket = [
    {
      user: {
        name: 'Yiorgos Avraamu',
        contact: '07789012537',
      },
      date: 'Jan 1, 2021',
      subject: 'Price',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempus nisl vel felis hendrerit, pulvinar tristique dui laoreet. Vestibulum...',
      status: 'open',
    },
    {
      user: {
        name: 'Larry Smith',
        contact: '07789012537',
      },
      date: 'Jan 1, 2021',
      subject: 'Order',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempus nisl vel felis hendrerit, pulvinar tristique dui laoreet. Vestibulum...',
      status: 'closed',
    },
    {
      user: {
        name: 'Kevin Philips',
        contact: '07789012537',
      },
      date: 'Jan 1, 2021',
      subject: 'Item',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempus nisl vel felis hendrerit, pulvinar tristique dui laoreet. Vestibulum...',
      status: 'open',
    },
    {
      user: {
        name: 'Kris DOe',
        contact: '07789012537',
      },
      date: 'Jan 1, 2021',
      subject: 'Price',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempus nisl vel felis hendrerit, pulvinar tristique dui laoreet. Vestibulum...',
      status: 'open',
    },
    {
      user: {
        name: 'Yiorgos Avraamu',
        contact: '07789012537',
      },
      date: 'Jan 1, 2021',
      subject: 'Price',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempus nisl vel felis hendrerit, pulvinar tristique dui laoreet. Vestibulum...',
      status: 'closed',
    },
  ]
  const [product, setProduct] = useState([
    {
      name: 'Loading...',
      id: 'initial',
      measurement: 'pieces',
      status: 'menu',
      price: 50,
      avatar: { avatar1 },
    },
  ])
  useEffect(
    () =>
      onSnapshot(collection(db, 'product'), (snapshot) =>
        setProduct(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))),
      ),
    [],
  )
  return (
    <>
      <WidgetsDropdown />
      <CRow xs={{ cols: 1 }} md={{ cols: 2 }}>
        <CCol>
          <CCard className="mb-4">
            <CCardHeader>
              RECENT ORDERS REQUESTED{' '}
              <CButton color="primary" className="float-end">
                {' '}
                View All{' '}
              </CButton>
            </CCardHeader>
            <CCardBody>
              <CTable align="middle" className="mb-0" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell scope="col">Item</CTableHeaderCell>
                    <CTableHeaderCell scope="col"></CTableHeaderCell>
                    <CTableHeaderCell scope="col">Price</CTableHeaderCell>
                    <CTableHeaderCell scope="col" className="text-center">
                      Product Status
                    </CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {recentOrder.map((prod, index) => (
                    <CTableRow v-for="cust in recentOrder" key={index}>
                      {/* Avatar */}
                      <CTableDataCell>
                        <CAvatar size="md" src={prod.avatar} />
                      </CTableDataCell>
                      {/* Item */}
                      <CTableDataCell>{prod.name}</CTableDataCell>
                      {/* Price */}
                      <CTableDataCell>
                        ${prod.price} / {prod.measurement}
                      </CTableDataCell>
                      {/* Product Status */}
                      <CTableDataCell className="text-center">
                        <CBadge color={prod.itemStatus === 'menu' ? 'info' : 'warning'}>
                          {prod.itemStatus}
                        </CBadge>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol>
          <CCard className="mb-4">
            <CCardBody>
              <CRow>
                <CCol sm={5}>
                  <h4 id="traffic" className="card-title mb-0">
                    Revenue
                  </h4>
                  <div className="small text-medium-emphasis">January - July 2021</div>
                </CCol>
                <CCol sm={7} className="d-none d-md-block">
                  <CDropdown className="float-end">
                    <CDropdownToggle color="primary">Select Month</CDropdownToggle>
                    <CDropdownMenu>
                      {[
                        'January',
                        'February',
                        'March',
                        'April',
                        'May',
                        'June',
                        'July',
                        'August',
                        'September',
                        'October',
                        'November',
                        'December',
                      ].map((value) => (
                        <CDropdownItem href="#" key={value}>
                          {value}
                        </CDropdownItem>
                      ))}
                    </CDropdownMenu>
                  </CDropdown>
                </CCol>
                <CCol>
                  <br />
                  {progressGroupExample1.map((item, index) => (
                    <div className="progress-group mb-4" key={index}>
                      <div className="progress-group-prepend">
                        <span className="text-medium-emphasis small">{item.title}</span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress thin color="info" value={item.value1} />
                        <CProgress thin color="danger" value={item.value2} />
                      </div>
                    </div>
                  ))}
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CCard className="mb-4">
        <CCardHeader>TRENDING ORDERS</CCardHeader>
        <CCardBody>
          <CRow>
            <CCol>
              <CRow xs={{ cols: 1, gutter: 4 }} md={{ cols: 4 }}>
                {trendingOrders.map((item, index) => (
                  <CCol xs key={index}>
                    <CCard>
                      <CCardImage orientation="top" src={ReactImg} />
                      <CCardBody>
                        <CCardTitle>{item.name}</CCardTitle>
                        <CCardText>
                          <CRow>
                            <CCol xs="auto">
                              Orders: <strong>{item.orders}</strong>
                            </CCol>
                            <CCol xs="auto">
                              Revenue: <strong>${item.orders * item.price}</strong>
                            </CCol>
                          </CRow>
                          <CRow>
                            <CCol>
                              <small className="text-medium-emphasis">
                                ${item.price} per {item.measurement} {item.name}
                              </small>
                            </CCol>
                          </CRow>
                        </CCardText>
                      </CCardBody>
                    </CCard>
                  </CCol>
                ))}
              </CRow>
            </CCol>
          </CRow>
        </CCardBody>
        <CCardFooter>
          <CRow>
            <CCol xs={12} md={6} xl={6}>
              <CRow>
                <CCol sm={6}>
                  <div className="border-start border-start-4 border-start-info py-1 px-3">
                    <div className="text-medium-emphasis small">Total Orders</div>
                    <div className="fs-5 fw-semibold">9,123</div>
                  </div>
                </CCol>
                <CCol sm={6}>
                  <div className="border-start border-start-4 border-start-danger py-1 px-3 mb-3">
                    <div className="text-medium-emphasis small">New Orders</div>
                    <div className="fs-5 fw-semibold">22,643</div>
                  </div>
                </CCol>
              </CRow>
            </CCol>
            <CCol xs={12} md={6} xl={6}>
              <CRow>
                <CCol sm={6}>
                  <div className="border-start border-start-4 border-start-warning py-1 px-3 mb-3">
                    <div className="text-medium-emphasis small">Repeat Orders</div>
                    <div className="fs-5 fw-semibold">78,623</div>
                  </div>
                </CCol>
                <CCol sm={6}>
                  <div className="border-start border-start-4 border-start-success py-1 px-3 mb-3">
                    <div className="text-medium-emphasis small">Cancel Orders</div>
                    <div className="fs-5 fw-semibold">49,123</div>
                  </div>
                </CCol>
              </CRow>
            </CCol>
          </CRow>
        </CCardFooter>
      </CCard>
      <CRow xs={{ cols: 1 }} md={{ cols: 2 }}>
        <CCol>
          <CCard className="mb-4">
            <CCardHeader>
              RECENT SUPPORT TICKETS{' '}
              <CButton color="primary" className="float-end">
                {' '}
                View All{' '}
              </CButton>
            </CCardHeader>
            <CCardBody>
              <CTable hover responsive>
                <CTableBody>
                  {supportTicket.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell className="text-center" xs={2}>
                        <CAvatar
                          size="lg"
                          src={`https://ui-avatars.com/api/?background=random&rounded=true&bold=true&name=${item.user.name}`}
                        />
                      </CTableDataCell>
                      <CTableDataCell style={{ padding: '3%' }}>
                        <div>
                          {item.user.name}{' '}
                          <span className="float-end">
                            {' '}
                            <CBadge color={item.status === 'open' ? 'danger' : 'success'}>
                              {item.status}
                            </CBadge>
                          </span>
                        </div>
                        <div className="small text-medium-emphasis">
                          <CIcon className="me-2" icon={cilCalendar} size="sm" />
                          <span className="text-medium-emphasis small">{item.date}</span>
                        </div>
                        <div className="small">{item.description}</div>
                        <CRow>
                          <CCol>
                            <div className="small">
                              <CIcon className="me-2" icon={cilContact} size="sm" />
                              <span className="text-medium-emphasis small">
                                {item.user.contact}
                              </span>
                            </div>
                          </CCol>
                          <CCol>
                            <div className="small">
                              <CIcon className="me-2" icon={cilPin} size="sm" />
                              <span className="text-medium-emphasis small">{item.subject}</span>
                            </div>
                          </CCol>
                        </CRow>
                      </CTableDataCell>
                      <hr className="mt-0" />
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol>
          <CCard className="mb-4">
            <CCardBody>
              <CRow>
                <CCol sm={5}>
                  <h4 id="traffic" className="card-title mb-0">
                    Chat BOT
                  </h4>
                  <div className="small text-medium-emphasis">January - July 2021</div>
                </CCol>
              </CRow>
              <CTable align="middle" className="mb-0" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell scope="col">Item</CTableHeaderCell>
                    <CTableHeaderCell scope="col"></CTableHeaderCell>
                    <CTableHeaderCell scope="col">Price</CTableHeaderCell>
                    <CTableHeaderCell scope="col" className="text-center">
                      Product Status
                    </CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {product.map((prod) => (
                    <CTableRow v-for="cust in recentOrder" key={prod.id}>
                      {console.log(prod)}
                      {/* Avatar */}
                      <CTableDataCell>
                        <CAvatar size="md" src={prod.avatar} />
                      </CTableDataCell>
                      {/* Item */}
                      <CTableDataCell>{prod.name}</CTableDataCell>
                      {/* Price */}
                      <CTableDataCell>
                        ${prod.price} / {prod.measurement}
                      </CTableDataCell>
                      {/* Product Status */}
                      <CTableDataCell className="text-center">
                        <CBadge color={prod.status === 'menu' ? 'info' : 'warning'}>
                          {prod.status}
                        </CBadge>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
