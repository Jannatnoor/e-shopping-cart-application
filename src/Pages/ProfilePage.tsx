import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '../hooks/useAppSelector';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { DecodedToken } from '../types/DeodedToken';
import { decodeToken } from '../common/getToken';
import './styles/ProfilePage.scss';

const ProfilePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentUser = useAppSelector((state) => state.authReducer.currentUser);
  const [userData, setUserData] = useState<DecodedToken | undefined>(undefined);

  useEffect(() => {
    if (currentUser) {
      const tokenString = currentUser.toString();
      const decodedData = decodeToken(tokenString);
      setUserData(decodedData);
      console.log(decodedData?.email);
    }
  }, [currentUser]);

  console.log(userData);

  return (
    <div className='profile-container'>
      <h1>Your Profile</h1>

      {userData ? (
        <div className='profile-card'>
          <div className='profile-field'>
            <div className='label'>Name</div>
            <div className='value'>{userData.name}</div>
          </div>

          <div className='profile-field'>
            <div className='label'>Email</div>
            <div className='value'>{userData.email}</div>
          </div>

          <div className='profile-field'>
            <div className='label'>Role</div>
            <div className='value'>{userData.role}</div>
          </div>
        </div>
      ) : (
        <div className='loading'>Loading profile information...</div>
      )}
    </div>
  );
};

export default ProfilePage;
