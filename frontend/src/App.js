import React, { useState } from 'react'
import FileList from './components/FileList'
import FileData from './components/FileData'
import { Container, Row, Col } from 'react-bootstrap'

function App () {
  const [selectedFile, setSelectedFile] = useState(null)

  const handleSelectFile = (fileName) => {
    setSelectedFile(fileName)
  }

  const handleBack = () => {
    setSelectedFile(null)
  }

  return (
    <Container fluid className='mt-4'>
      <h1 className='text-center mb-4'>File Viewer</h1>
      <Row>
        {/* File List Column */}
        <Col md={4} lg={3} className='border-end'>
          <FileList onSelectFile={handleSelectFile} />
        </Col>

        {/* File Data Column */}
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
