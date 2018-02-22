import React from 'react'
import { Button } from 'bloom-forms'

import Loading from 'presentation/layout/loading'

const ExampleButtons = () => {
  return (
    <div>
      <h3>Buttons</h3>
      <p>Use any of the examples below to quickly create a styled button.</p>
      <Button
        id='test-1'
        onClick={() => ''}
        contents='Default'
        key='button-00'
      />
      <Button
        key='button-01'
        id='test-2'
        onClick={() => ''}
        contents='Info'
        className='Btn--info'
      />
      <Button
        key='button-02'
        id='test-3'
        onClick={() => ''}
        contents='Success'
        className='Btn--success'
      />
      <Button
        key='button-03'
        id='test-4'
        onClick={() => ''}
        contents='Warning'
        className='Btn--warning'
      />
      <Button
        key='button-04'
        id='test-5'
        onClick={() => ''}
        contents='Danger'
        className='Btn--danger'
      />
      <Button
        key='button-05'
        id='test-loading'
        onClick={() => ''}
        contents='Loading'
        loading
        className='Btn--info'
      />
      <Button
        key='button-06'
        id='test-loading-2'
        onClick={() => ''}
        contents='Custom Loading'
        loading
        loadingElement={<Loading />}
        className='Btn--warning'
      />
      <Button
        key='button-07'
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
