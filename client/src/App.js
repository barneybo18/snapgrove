import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { HomeContainer, NewPost, SearchContainer } from './containers';
import { FeedDetail, Header, MainLoader } from './components';
import { firebaseAuth } from './config/firebase.config';
import { createNewUser } from './sanity';
import { useDispatch, useSelector } from 'react-redux'; // Added useSelector for accessing user state
import { SET_USER } from './context/actions/userActions';

const App = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user); // Assuming you store user data in Redux state
  const [isLoading, setIsLoading] = useState(true); // Initialize as loading

  useEffect(() => {
    firebaseAuth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        console.log('User', userAuth.providerData[0]);
        createNewUser(userAuth.providerData[0]).then(() => {
          console.log('New User Created');
          dispatch(SET_USER(userAuth.providerData[0]));
          setIsLoading(false); // Set isLoading to false when user is authenticated
        });
      } else {
        setIsLoading(false); // Set isLoading to false when user is not authenticated
      }
    });
  }, [dispatch]); // Added dispatch as a dependency

  return (
    <div className='w-screen min-h-screen flex flex-col items-center justify-start'>
      {isLoading ? (
        <MainLoader />
      ) : (
        <>
          <Header />

          <main className='w-full h-full flex items-center justify-center'>
            <Routes>
              <Route path="/*" element={<HomeContainer />} />
              <Route path="/newPost/*" element={<NewPost />} />
              <Route path="/feed-detail/:_id" element={<FeedDetail />} />
              <Route path="/search/:searchTerm" element={<SearchContainer />} />
            </Routes>
          </main>
        </>
      )}
    </div>
  );
};

export default App;



// import React, { useEffect, useState } from 'react'
// import { Route, Routes } from 'react-router-dom'
// import { HomeContainer, NewPost, SearchContainer } from './containers'
// import { FeedDetail, Header, MainLoader } from './components'
// import { firebaseAuth } from './config/firebase.config'
// import { createNewUser } from './sanity'
// import { useDispatch } from 'react-redux'
// import { SET_USER } from './context/actions/userActions'


// const App = () => {

//   const dispatch = useDispatch();
//   const [isLoading, setIsLoading] = useState(false)

//   useEffect(() => {
//     setIsLoading(true)
//     firebaseAuth.onAuthStateChanged(result => {
//       if (result) {
//         console.log('User', result.providerData[0]);
//         createNewUser(result?.providerData[0]).then(() => {
//           console.log('New User Created');
//           dispatch(SET_USER(result?.providerData[0]));
//           setInterval(() => {
//             setIsLoading(false);
//           }, 2000);
//         });
//       }
//     })
//   }, []);
//   return (
//     <div className=' w-screen min-h-screen flex flex-col items-center justify-start'>
//       {isLoading ? (
//           <MainLoader />
//         ) : (
//         <>
//           {/* Header  */}
//           <Header />


//           {/* Main content section */}
//           <main className='w-full h-full flex items-center justify-center'>
//             {/* Routes */}
//             <Routes>
//               <Route path="/*" element={<HomeContainer />} />
//               <Route path="/newPost/*" element={<NewPost />} />
//               <Route path="/feed-detail/:_id" element={<FeedDetail />} />
//               <Route path="/search/:searchTerm" element={<SearchContainer />} />
//             </Routes>
//           </main>
//         </>
//         )}
//     </div>
//   )
// }

// export default App
