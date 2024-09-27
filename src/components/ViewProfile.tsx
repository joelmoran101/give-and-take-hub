import React from 'react'
import './ViewProfile.css'
import './DeleteAccount'


function ViewProfile() {
  const { loggedInUser } = useContext(AuthContext)
  
}
function Profile() {
  return (
    <div>
      <h2>User Profile</h2>
      <p>This is the user profile page.</p>
      
    </div>
  )
}

export default Profile
