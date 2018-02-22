import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'bloom-forms'

const FourOhFour = () => {
  return (
    <div>
      <h1>404</h1>
      <h3>Looks like you took a wrong turn</h3>
      <Link to='/home'>
        <Button contents='Take me to the homepage' className='Btn--alt' />
      </Link>
    </div>
  )
}

export default FourOhFour
