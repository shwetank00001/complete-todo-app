import React from 'react'

const Modal = (props) => {

  React.useEffect(function(){
    setTimeout(function(){
      props.closeModal()
    }, 3000)
  })
  
  return (
    <div>
        <p>{props.modal}</p>
    </div>
  )
}

export default Modal