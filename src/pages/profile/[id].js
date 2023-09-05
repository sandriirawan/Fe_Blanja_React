import React, { useEffect, useState } from 'react';
import Seller from './seller/[id]';
import Customer from './custommer/[id]';

function Profile() {
  const userRole = localStorage.getItem('role'); 
  const [profileComponent, setProfileComponent] = useState(null);

  useEffect(() => {
    if (userRole === 'seller') {
      setProfileComponent(<Seller />);
    } else if (userRole === 'custommer') {
      setProfileComponent(<Customer />);
    }
  }, [userRole]);

  return (
    <div>
      {profileComponent}
    </div>
  );
}

export default Profile;
