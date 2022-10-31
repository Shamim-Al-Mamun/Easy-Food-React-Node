import React from 'react'

const ScreenHeader = ({ children }) => {
  return (
    <div className='bg-[url("https://i.ibb.co/FxpPTLD/breadcrumb.jpg")] bg-cover bg-no-repeat bg-center h-[300px] font-JosefinSans'>
      <div className="container flex items-center justify-center h-full text-center">
        {children}
      </div>
    </div>
  )
}

export default ScreenHeader