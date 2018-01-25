import React from 'react'

import { spinner } from 'icons'
import 'styles/components/loading.scss'

const Loading = () => {
  return (
    <img src={spinner} alt='This section is loading.' className='Loading' />
  )
}

export default Loading
