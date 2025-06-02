import React, { PropsWithChildren } from 'react'

const FormLayout = ({children}: PropsWithChildren) => {
  return (
    <div className='pt-20'>
        {children}
    </div>
  )
}

export default FormLayout
