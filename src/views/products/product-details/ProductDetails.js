import React, { useState, useRef } from 'react'

import {
  CAlert,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CCarouselItem,
  CCarousel,
  CBadge,
  CToast,
  CToastBody,
  CToastClose,
  CToaster,
} from '@coreui/react'
import ReactImg from 'src/assets/images/react.jpg'
import AngularImg from 'src/assets/images/angular.jpg'
import VueImg from 'src/assets/images/vue.jpg'

const product = {
  item: {
    id: 'p1268',
    name: 'Chicken Submarrine',
    measurement: 'Large',
    price: 300,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book type and scrambled it to make a type specimen book.",
  },
  images: {
    preview: ReactImg,
    gallery: [ReactImg, AngularImg, VueImg],
  },
  sales: [
    {
      date: '20/09/2022',
      time: '08:13 am',
      id: 5,
      customer: {
        name: 'Kris Doe',
        contact: '011224549',
      },
      quantity: 5,
    },
    {
      date: '20/09/2022',
      time: '08:13 am',
      id: 19,
      customer: {
        name: 'Kris Doe',
        contact: '011224549',
      },
      quantity: 5,
    },
    {
      date: '20/09/2022',
      time: '08:13 am',
      id: 15,
      customer: {
        name: 'Kris Doe',
        contact: '011224549',
      },
      quantity: 5,
    },
    {
      date: '20/09/2022',
      time: '08:13 am',
      id: 7,
      customer: {
        name: 'Kris Doe',
        contact: '011224549',
      },
      quantity: 5,
    },
    {
      date: '20/07/2022',
      time: '08:13 am',
      id: 9,
      customer: {
        name: 'Aleen Doe',
        contact: '011224599',
      },
      quantity: 5,
    },
    {
      date: '20/07/2022',
      time: '08:13 am',
      id: 4,
      customer: {
        name: 'Kristeen Doe',
        contact: '011324399',
      },
      quantity: 3,
    },
  ],
  frequency: {
    value: 20,
  },
  itemStatus: 'menu',
}

function calcTotal(sales) {
  var total = 0
  for (var i = 0; i < sales.length; i++) {
    total += sales[i].quantity
  }
  return total
}

function newOrders(sales) {
  var result = sales.reduce((groupedCust, cust) => {
    const number = cust.customer.contact
    if (groupedCust[number] == null) groupedCust[number] = []
    groupedCust[number].push(cust)
    return groupedCust
  }, {})
  var quant = 0
  for (var key in result) {
    quant += result[key][0].quantity
  }
  return quant
}

const DeleteBtn1 = (prod) => {
  const [visible, setVisible] = useState(false)
  const [visibleAlert, setVisibleAlert] = useState(false)
  const toaster = useRef()
  const deleteAlert = (
    <CToast
      autohide={false}
      color="danger"
      className="text-white align-items-center"
      visible={true}
    >
      <div className="d-flex">
        <CToastBody>
          <strong>{prod.item.name} </strong> removed from the menu
        </CToastBody>
        <CToastClose className="me-2 m-auto" white />
      </div>
    </CToast>
  )
  return (
    <>
      <CButton
        color="primary"
        className="float-end"
        onClick={() => setVisible(!visible)}
        style={{ paddingLeft: '10%', paddingRight: '10%' }}
      >
        DELETE ITEM
      </CButton>
      <CModal
        alignment="center"
        backdrop="static"
        visible={visible}
        onClose={() => setVisible(false)}
      >
        <CModalHeader>
          <CModalTitle>
            <strong>Delete {prod.item.name}</strong>
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <p>Are you sure you want to delete {prod.item.name}?</p>
        </CModalBody>
        <CModalFooter>
          <CButton
            color="danger"
            onClick={() => {
              setVisible(false)
              setVisibleAlert(deleteAlert)
            }}
          >
            Delete
          </CButton>
        </CModalFooter>
      </CModal>
      <CToaster ref={toaster} push={visibleAlert} placement="top-end" />
    </>
  )
}

const DeleteBtn = (prod) => {
  const [visible, setVisible] = useState(false)
  return (
    <>
      <CButton
        color="primary"
        style={{ paddingLeft: '10%', paddingRight: '10%' }}
        className="float-end"
        onClick={() => setVisible(!visible)}
      >
        DELETE
      </CButton>
      <CModal alignment="center" scrollable visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>
            <strong>{prod.item.name} </strong> <small> {prod.item.measurement}</small>
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <p>Are you sure you want to delete the product?</p>
        </CModalBody>
        <CModalFooter>
          <CButton
            color="danger"
            onClick={() => {
              setVisible(false)
            }}
          >
            Delete
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

const Dashboard = () => {
  return (
    <>
      <CRow xs={{ cols: 1 }} md={{ cols: 2 }}>
        <CCol>
          <CCard className="mb-4">
            <CCardBody>
              <CCard className="mb-4">
                <CCardHeader>
                  <strong>{product.item.name} </strong>
                </CCardHeader>
                <CCardBody>
                  <CCarousel controls transition="crossfade">
                    {product.images.gallery.map((img, index) => (
                      <CCarouselItem v-for="img in items" key={index}>
                        <img className="d-block w-100" src={img} alt="slide 1" />
                      </CCarouselItem>
                    ))}
                  </CCarousel>
                </CCardBody>
              </CCard>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol>
          <CCard className="mb-4">
            <CCardBody>
              <CTable align="middle" className="mb-0" responsive>
                <CTableHead color="light">
                  <CTableRow className="mt-0">
                    <CTableHeaderCell scope="col">PRODUCT INFO</CTableHeaderCell>
                    <CTableHeaderCell scope="col" className="text-end"></CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  <CTableRow>
                    <CTableHeaderCell>Product Identification</CTableHeaderCell>
                    <CTableDataCell className="text-end">{product.item.id}</CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableHeaderCell>Status</CTableHeaderCell>
                    <CTableDataCell className="text-end">
                      <CBadge color={product.itemStatus === 'menu' ? 'info' : 'warning'}>
                        {product.itemStatus}
                      </CBadge>{' '}
                    </CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableHeaderCell>Price</CTableHeaderCell>
                    <CTableDataCell className="text-end">${product.item.price}</CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableHeaderCell>Measurement</CTableHeaderCell>
                    <CTableDataCell className="text-end">
                      {product.item.measurement}{' '}
                    </CTableDataCell>
                  </CTableRow>
                </CTableBody>
              </CTable>
              <br />
              <CButton
                color="secondary"
                style={{ paddingLeft: '10%', paddingRight: '10%' }}
                className="text-high-emphasis"
              >
                EDIT
              </CButton>{' '}
              {DeleteBtn1(product)}
            </CCardBody>
          </CCard>

          <CRow>
            <CCol xs>
              <CCard className="mb-4">
                <CCardBody>
                  <div className="fs-5 fw-bolder">Product Details</div>
                  <br />
                  <hr className="mt-0" />
                  <CRow>
                    <div
                      style={{
                        paddingLeft: '6%',
                        paddingRight: '6%',
                        paddingTop: '2%',
                        paddingBottom: '2%',
                      }}
                    >
                      {product.item.description}
                    </div>
                  </CRow>
                </CCardBody>
                <CCardFooter>
                  <CRow md={{ cols: 4 }}>
                    <CCol>
                      <div className="border-start border-start-4 border-start-success py-1 px-3">
                        <div className="text-medium-emphasis small">New Orders</div>
                        <div className="fs-5 fw-semibold">{newOrders(product.sales)}</div>
                      </div>
                    </CCol>
                    <CCol>
                      <div className="border-start border-start-4 border-start-info py-1 px-3">
                        <div className="text-medium-emphasis small">Repatative Orders</div>
                        <div className="fs-5 fw-semibold">
                          {calcTotal(product.sales) - newOrders(product.sales)}
                        </div>
                      </div>
                    </CCol>
                    <CCol>
                      <div className="border-start border-start-4 border-start-warning py-1 px-3">
                        <div className="text-medium-emphasis small">Total Orders</div>
                        <div className="fs-5 fw-semibold">{calcTotal(product.sales)}</div>
                      </div>
                    </CCol>
                    <CCol>
                      <div className="border-start border-start-4 border-start-dark py-1 px-3 mb-3">
                        <div className="text-medium-emphasis small">Total Revenue</div>
                        <div className="fs-5 fw-semibold">
                          ${calcTotal(product.sales) * product.item.price}
                        </div>
                      </div>
                    </CCol>
                  </CRow>
                </CCardFooter>
              </CCard>
            </CCol>
          </CRow>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
