import React, { useContext } from 'react'
import { AuthContext } from '../auth/AuthContext'
import axios from 'axios'

const DeleteAccount: React.FC = () => {
    const { loggedInUser, setLoggedInUser } = useContext(AuthContext)
    const handleDeleteAccount = async () => {
        try {
            await axios.delete('http://localhost:4000/api/delete-account/:id').then((response) => {
              console.log(response.data);
            });
            setLoggedInUser(null);
          } catch (error) {
            console.error('Error deleting account:', error);
          }
        }
  return (
    <div>
    <h2>Delete Account</h2>
      <p>Are you sure you want to delete your account?</p>
      <button onClick={handleDeleteAccount}>Delete Account</button>
      
    </div>
  )
}

export default DeleteAccount


