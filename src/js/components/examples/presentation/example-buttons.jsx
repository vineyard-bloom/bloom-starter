import React from 'react'
import { Button } from 'bloom-forms'

import Loading from 'presentation/layout/loading'

const ExampleButtons = () => {
  return (
    <div>
      <h3>Buttons</h3>
      <p>Use any of the examples below to quickly create a styled button.</p>
      <Button id='test-1' onClick={() => ''} contents='Default' />
      <Button
        id='test-2'
        onClick={() => ''}
        contents='Info'
        className='Btn--info'
      />
      <Button
        id='test-3'
        onClick={() => ''}
        contents='Success'
        className='Btn--success'
      />
      <Button
        id='test-4'
        onClick={() => ''}
        contents='Warning'
        className='Btn--warning'
      />
      <Button
        id='test-5'
        onClick={() => ''}
        contents='Danger'
        className='Btn--danger'
      />
      <Button
        id='test-loading'
        onClick={() => ''}
        contents='Loading'
        loading
        className='Btn--info'
      />
      <Button
        id='test-loading-2'
        onClick={() => ''}
        contents='Custom Loading'
        loading
        loadingElement={<Loading />}
        className='Btn--warning'
      />
      <Button
        id='test-disabled'
        onClick={() => ''}
        contents='Button Disabled'
        className='Btn--danger'
        disabled
      />
    </div>
  )
}

export default ExampleButtons
