import React from 'react'

const AlertError = (props) => {
  return (
    <div className='alert alert-danger' role='alert'>
      {
          Object.values(props.error).map((error, index) =>
            <small key={index}>{error}</small>
          )
        }
    </div>
  )
}

export default AlertError
