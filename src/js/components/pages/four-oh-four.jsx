import React from 'react';
import { Link } from 'react-router-dom';

import Button from 'presentation/inputs/button.jsx';

const FourOhFour = () => {
  return (
     <div>
      <h1>404</h1>
      <h3>Looks like you took a wrong turn</h3>
      <Link to='/'>
        <Button text='Take me to the homepage' className='btn-alt' />
      </Link>
     </div>
  );
}

export default FourOhFour;