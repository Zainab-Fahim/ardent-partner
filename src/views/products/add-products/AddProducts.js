import React, { useRef, useState } from 'react'

import {
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
  CCol,
  CProgress,
  CRow,
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
  CToaster,
  CFormSwitch,
} from '@coreui/react'
import ReactImg from 'src/assets/images/react.jpg'
import AngularImg from 'src/assets/images/angular.jpg'
import VueImg from 'src/assets/images/vue.jpg'
import { func } from 'prop-types'

const product = {
  item: { name: 'Chicken Submarine' },
  images: {
    preview: ReactImg,
    gallery: [ReactImg, AngularImg, VueImg],
  },
}
const DeleteBtn = () => {
  const [visible, setVisible] = useState(false)
  const [visibleAlert, setVisibleAlert] = useState(false)
  const toaster = useRef()
  const deleteAlert = (
    <CToast
      autohide={false}
      color="success"
      className="text-white align-items-center"
      visible={true}
    >
      <div className="d-flex">
        <CToastBody>Product updated successfully</CToastBody>
        <CToastClose className="me-2 m-auto" white />
      </div>
    </CToast>
  )
  return (
    <>
      <CButton color="primary" className="float-end" onClick={() => setVisibleAlert(deleteAlert)}>
        UPDATE CHANGES
      </CButton>
      <CToaster ref={toaster} push={visibleAlert} placement="top-end" />
    </>
  )
}

const CustomStyles = () => {
  const [validated, setValidated] = useState(false)
  const handleSubmit = (event) => {
    console.log('submitted')
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
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
            <CCardTitle style={{ paddingTop: '5%', paddingLeft: '5%' }}>
              <strong>{product.item.name} </strong>
            </CCardTitle>
            <CCardBody>
              <CRow>
                <CCarousel controls transition="crossfade">
                  {product.images.gallery.map((img, index) => (
                    <CCarouselItem v-for="img in items" key={index}>
                      <img className="d-block w-100" src={img} alt="slide 1" />
                    </CCarouselItem>
                  ))}
                </CCarousel>
              </CRow>
              <CRow>
                <div style={{ paddingTop: '5%', paddingLeft: '5%' }}>
                  <CFormSwitch
                    style={{ padding: '2%' }}
                    label="off-the-shelf availability"
                    id="formSwitchCheckChecked"
                    defaultChecked
                  />
                </div>
              </CRow>
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
