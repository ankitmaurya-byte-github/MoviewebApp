import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.scss'
import store from './store/store.js'
import { Provider } from 'react-redux'
import { auth } from './firebase/fire.js'
import { createContext } from 'react'
import { onAuthStateChanged } from 'firebase/auth'

export const Authcontext=createContext()

function Main({children}) {
  const [currentUser,setCurrentUser]=useState({})
    useEffect(()=>{

        onAuthStateChanged(auth, (user) => {
          if (user) {
            setCurrentUser(user)
          }
        });

    },[])

  return (
    <div>
      <Authcontext.Provider value={currentUser}>
        {children}
      </Authcontext.Provider>
    </div>
  )
}



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <Main>
          <App />
      </Main>
    </Provider>
  </React.StrictMode>,
)
