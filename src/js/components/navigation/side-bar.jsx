import React from 'react'

import SideBarNav from './side-bar-nav'

const SideBar = props => {
  return (
    <div className={`Sidebar ${props.className || ''}`}>
      This is the sidebar. Stick navigation and stuff in me.
      <SideBarNav
        links={[
          { url: '/lending', text: 'My Lending' },
          { url: '/borrowing', text: 'My Borrowing' }
        ]}
      />
    </div>
  )
}

export default SideBar
