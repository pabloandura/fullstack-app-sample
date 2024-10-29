import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectFile, clearSelectedFile } from './slices/fileSlice'
import FileList from './components/FileList'
import FileData from './components/FileData'
import { Container, Row, Col } from 'react-bootstrap'

function App () {
  const dispatch = useDispatch()
  const selectedFile = useSelector((state) => state.file.selectedFile)

  const handleSelectFile = (fileName) => {
    dispatch(selectFile(fileName))
  }

  const handleBack = () => {
    dispatch(clearSelectedFile())
  }

  return (
    <Container fluid className='mt-4'>
      <h1 className='text-center mb-4'>File Viewer</h1>
      <Row>
        <Col md={4} lg={3} className='border-end'>
          <FileList onSelectFile={handleSelectFile} />
        </Col>
        <Col md={8} lg={9}>
          {selectedFile
            ? (
              <FileData fileName={selectedFile} onBack={handleBack} />
              )
            : (
              <div className='d-flex align-items-center justify-content-center h-100'>
                <p className='text-muted'>Select a file to view its data</p>
              </div>
              )}
        </Col>
      </Row>
    </Container>
  )
}

export default App
