import { collection, setDoc, doc, getDocs } from 'firebase/firestore'
import db from '../../../firebase'
import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CRow,
  CFormSelect,
  CForm,
  CFormInput,
  CFormFeedback,
  CFormLabel,
  CFormTextarea,
} from '@coreui/react'

function AddProductsPage() {
  const [insertName, setInsertName] = useState('')
  const [insertMeasurement, setInsertMeasurement] = useState('')
  const [insertPrice, setInsertPrice] = useState('')
  const [insertDescription, setInsertDescription] = useState('')
  const [insertStatus, setInsertStatus] = useState('')
  // this is the insert method
  const insertRecord = async () => {
    const getProdSize = await getDocs(collection(db, 'product'))
    const prodRef = collection(db, 'product')
    let orderSize = getProdSize.size + 1
    await setDoc(doc(prodRef, `${orderSize}`), {
      name: insertName,
      measurement: insertMeasurement,
      price: insertPrice,
      description: insertDescription,
      status: insertStatus,
    })

    // clearing all the fields after backend implementation
    setInsertName('')
    setInsertMeasurement('')
    setInsertPrice('')
    setInsertDescription('')
    setInsertStatus('')
  }

  const [validated, setValidated] = useState(false)
  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    setValidated(true)
  }
  return (
    <>
      <CRow xs={{ cols: 1 }} md={{ cols: 2 }}>
        <CCol>
          <CCard className="mb-4">
            <CCardBody>
              <CForm
                className="row g-3 needs-validation"
                noValidate
                validated={validated}
                onSubmit={handleSubmit && insertRecord}
              >
                <CCol md={6}>
                  <CFormLabel htmlFor="validationCustom04" id="measurement">
                    Product Status
                  </CFormLabel>
                  <CFormSelect
                    id="validationCustom04"
                    value={insertStatus}
                    onChange={(e) => setInsertStatus(e.target.value)}
                  >
                    <option>menu</option>
                    <option>off-the-shelf</option>
                  </CFormSelect>
                  <CFormFeedback invalid>Please provide a valid measurement.</CFormFeedback>
                </CCol>
                <CCol md={12}>
                  <CFormLabel htmlFor="validationCustom01">Product Name</CFormLabel>
                  <CFormInput
                    type="text"
                    id="validationCustom01"
                    required
                    value={insertName}
                    onChange={(e) => setInsertName(e.target.value)}
                  />
                  <CFormFeedback valid>Looks good!</CFormFeedback>
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="validationCustom04" id="measurement">
                    Measurement
                  </CFormLabel>
                  <CFormSelect
                    id="validationCustom04"
                    value={insertMeasurement}
                    onChange={(e) => setInsertMeasurement(e.target.value)}
                  >
                    <option>Pieces</option>
                    <option>Large</option>
                    <option>Medium</option>
                    <option>Small</option>
                    <option>2Kg</option>
                    <option>1Kg</option>
                    <option>500g</option>
                  </CFormSelect>
                  <CFormFeedback invalid>Please provide a valid measurement.</CFormFeedback>
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="validationCustom02" id="price">
                    Price
                  </CFormLabel>
                  <CFormInput
                    type="text"
                    id="validationCustom02"
                    required
                    value={insertPrice}
                    onChange={(e) => setInsertPrice(e.target.value)}
                  />
                  <CFormFeedback valid>Looks good!</CFormFeedback>
                </CCol>
                <CCol md={12}>
                  <CFormLabel htmlFor="validationCustom02" id="description">
                    Description
                  </CFormLabel>
                  <CFormTextarea
                    id="exampleFormControlTextarea1"
                    rows="3"
                    required
                    value={insertDescription}
                    onChange={(e) => setInsertDescription(e.target.value)}
                  ></CFormTextarea>
                  <CFormFeedback valid>Looks good!</CFormFeedback>
                </CCol>
                <CCol xs={12}>
                  {' '}
                  <br />
                  <CButton color="secondary" className="text-high-emphasis float-end" type="submit">
                    ADD PRODUCT
                  </CButton>
                </CCol>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default AddProductsPage
