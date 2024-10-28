import React, { useEffect, useState } from 'react'
import { Table, Container, Button, Spinner, Alert } from 'react-bootstrap'

function FileData ({ fileName, onBack }) {
  const [fileData, setFileData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    fetch(`/files/data?fileName=${fileName}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      })
      .then(data => {
        setFileData(data[0])
        setError(null)
      })
      .catch(err => {
        setError('Failed to load file data')
        console.error(err)
      })
      .finally(() => setLoading(false))
  }, [fileName])

  useEffect(() => {
    console.log(fileData)
  }, [fileData])

  return (
    <Container>
      <div className='d-flex justify-content-between align-items-center'>
        <h2 className='mb-4'>Data for {fileName}</h2>
        <Button variant='secondary' onClick={onBack} className='mb-3'>Back to Files</Button>
      </div>

      {loading && (
        <div className='text-center my-4'>
          <Spinner animation='border' role='status' className='me-2' />
          <span>Loading data...</span>
        </div>
      )}

      {error && <Alert variant='danger' className='text-center'>{error}</Alert>}

      {!loading && !error && !fileData && (
        <Alert variant='info' className='text-center'>No data available for this file.</Alert>
      )}

      {!loading && !error && fileData && fileData.lines.length > 0 && (
        <Table responsive='md' striped bordered hover className='shadow-sm'>
          <caption className='text-muted'>List of data entries for the file {fileName}</caption>
          <thead className='bg-primary text-white'>
            <tr>
              <th>Text</th>
              <th>Number</th>
              <th>Hex</th>
            </tr>
          </thead>
          <tbody>
            {fileData.lines.map((line, index) => (
              <tr key={index}>
                <td>{line.text}</td>
                <td>{line.number}</td>
                <td className='text-monospace'>{line.hex}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  )
}

export default FileData
