import React, { useRef, useState } from 'react'

import {
  CAvatar,
  CListGroup,
  CListGroupItem,
  CAlert,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CButton,
  CButtonGroup,
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
  CCarouselItem,
  CCarousel,
  CFormSelect,
  CBadge,
  CForm,
  CFormCheck,
  CFormInput,
  CFormFeedback,
  CFormLabel,
  CFormTextarea,
  CInputGroup,
  CInputGroupText,
  CToast,
  CToastBody,
  CToastClose,
  CToastHeader,
  CToaster,
} from '@coreui/react'
import ReactImg from 'src/assets/images/react.jpg'
import AngularImg from 'src/assets/images/angular.jpg'
import VueImg from 'src/assets/images/vue.jpg'
import { func } from 'prop-types'

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
const DeleteBtn = () => {
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
        <CToastBody>Product removed from the menu</CToastBody>
        <CToastClose className="me-2 m-auto" white />
      </div>
    </CToast>
  )
  return (
    <>
      <CButton color="primary" className="float-end" onClick={() => setVisible(!visible)}>
        DISCARD CHANGES
      </CButton>
      <CModal
        alignment="center"
        backdrop="static"
        visible={visible}
        onClose={() => setVisible(false)}
      >
        <CModalHeader>
          <CModalTitle>
            <strong>Item Discard</strong>
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

const SaveAlert = () => {
  const [toast, addToast] = useState(0)
  const toaster = useRef()
  const exampleToast = (
    <CToast
      autohide={false}
      color="success"
      className="text-white align-items-center"
      visible={true}
    >
      <div className="d-flex">
        <CToastBody>Product Successfully added to the menu</CToastBody>
        <CToastClose className="me-2 m-auto" white />
      </div>
    </CToast>
  )
  return (
    <>
      <CButton
        color="secondary"
        className="text-high-emphasis"
        onClick={() => addToast(exampleToast)}
      >
        ADD PRODUCT
      </CButton>
      <CToaster ref={toaster} push={toast} placement="top-end" />
    </>
  )
}

const CustomStyles = () => {
  const [validated, setValidated] = useState(false)
  const [toast, addToast] = useState(0)
  const toaster = useRef()
  const exampleToast = (
    <CToast
      autohide={false}
      color="success"
      className="text-white align-items-center"
      visible={true}
    >
      <div className="d-flex">
        <CToastBody>Product Successfully added to the menu</CToastBody>
        <CToastClose className="me-2 m-auto" white />
      </div>
    </CToast>
  )
  const handleSubmit = (event) => {
    console.log('submitted')
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    } else {
      console.log('val')
      return (
        <>
          {/* {console.log('return')}
          {console.log(toaster)}
          <div>HELLO</div>
          <CButton
            color="secondary"
            className="text-high-emphasis"
            onClick={() => addToast(exampleToast)}
          >
            ADD PRODUCT
          </CButton>
          <CToaster ref={toaster} push={toast} placement="top-end" />
          {console.log('return end')} */}
        </>
      )
    }
    setValidated(true)
  }
  return (
    <CForm
      className="row g-3 needs-validation"
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
    >
      <CCol md={12}>
        <CFormLabel htmlFor="validationCustom01">Product Name</CFormLabel>
        <CFormInput type="text" id="validationCustom01" required />
        <CFormFeedback valid>Looks good!</CFormFeedback>
      </CCol>
      <CCol md={6}>
        <CFormLabel htmlFor="validationCustom04">Measurement</CFormLabel>
        <CFormSelect id="validationCustom04">
          <option>Pieces</option>
          <option>Large</option>
          <option>Medium</option>
          <option>Small</option>
          <option>2 Kg</option>
          <option>1 Kg</option>
          <option>500 g</option>
        </CFormSelect>
        <CFormFeedback invalid>Please provide a valid measurement.</CFormFeedback>
      </CCol>
      <CCol md={6}>
        <CFormLabel htmlFor="validationCustom02">Price</CFormLabel>
        <CFormInput type="text" id="validationCustom02" required />
        <CFormFeedback valid>Looks good!</CFormFeedback>
      </CCol>
      <CCol md={12}>
        <CFormLabel htmlFor="validationCustom02">Description</CFormLabel>
        <CFormTextarea id="exampleFormControlTextarea1" rows="3" required></CFormTextarea>
        <CFormFeedback valid>Looks good!</CFormFeedback>
      </CCol>
      <CCol md={12}>
        <CFormLabel htmlFor="validationCustom02">Product Preview</CFormLabel>
        <CFormInput type="file" id="formFile" required />
        <CFormFeedback valid>Looks good!</CFormFeedback>
      </CCol>
      <CCol md={12}>
        <CFormLabel htmlFor="validationCustom02">Product Gallery</CFormLabel>
        <CFormInput type="file" id="formFileMultiple" multiple required />
        <CFormFeedback valid>Looks good!</CFormFeedback>
      </CCol>
      <CCol xs={12}>
        {' '}
        <br />
        <CButton color="secondary" className="text-high-emphasis" type="submit">
          ADD PRODUCT
        </CButton>
        {DeleteBtn()}
      </CCol>
    </CForm>
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
              <div style={{ padding: '2%' }}>{CustomStyles()}</div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
