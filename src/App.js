import React, { useEffect } from 'react';
import './App.css';
import LoginPage from './LoginPage';
// import HomePage from './HomePage';
// import NavBar from './NavBar';

import MyAccount from "./MyAccount";
import DashBoard from "./DashBoard";
import MyHousehold from "./MyHousehold";
import SignupPage from "./SignupPage";
// import LoadingSpinner from "./LoadingSpinner";

import {
  Routes,
  Route
} from "react-router-dom";
import db, { auth } from './firebase';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/counter/userSlice';
import { collection, getDoc, getDocs, onSnapshot, query } from 'firebase/firestore';
import { addHouseholdId } from './features/counter/householdIdSlice';
import { addHousehold, addMembers, selectMembers } from './features/counter/householdSlice';
import AddBills from './AddBills';


function App() {

  const user = useSelector(selectUser);

  const dispatch = useDispatch();


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        dispatch(login({
          uid: userAuth.uid,
          email: userAuth.email,
          displayName: userAuth.displayName
        }));

        const querySnapshot = await getDocs(collection(db, 'households'));
        querySnapshot.forEach(doc => {
          console.log(doc.data());
          const members = doc.data().members;

          console.log(members)

          const findMember = members.find(member => member.uid === userAuth.uid);

          if (findMember) {
            console.log(findMember)
            // console.log(doc.data().householdId);
            dispatch(addHousehold(doc.data()));
            dispatch(addHouseholdId(doc.data().householdId));
          }



          // members.forEach(member => {
          //   if (member.uid === userAuth.uid) {
          //     dispatch(addHouseholdId(doc.data().householdId));



          //   }
          // });
        });




      } else {
        dispatch(logout());
      }
    });

    return unsubscribe;
  }, [dispatch]);

  // useEffect(async () => {
  //   if (user) {
  //     const querySnapshot = await getDocs(collection(db, 'households'));
  //     querySnapshot.forEach(doc => {
  //       console.log(doc.data());
  //     });
  //   }

  // }, [dispatch]);

  return (
    // <div className='App'>
    //   <NavBar />

    //   <div className='App-header'>
    //     <HomePage />
    //   </div>



    // </div>
    <>
      {user ?
        <>
          {/* <LoadingSpinner /> */}
          <Routes>
            < Route path='/' element={< DashBoard />} />
            < Route path='/myhousehold' element={< MyHousehold />} />
            < Route path='/addbills' element={< AddBills />} />
            < Route path='/myaccount' element={< MyAccount />} />
            {/* <Route path='/' element={<HomeScreen />} /> */}

          </Routes >
        </>

        :
        <Routes>
          < Route path='/' element={<LoginPage />} />
          < Route path='/signup' element={<SignupPage />} />
          < Route path='/resetpassword' element={< MyAccount />} />
          {/* <Route path='/' element={<HomeScreen />} /> */}

        </Routes >


      }




    </>
    // <LoginPage />
  );
}

export default App;
