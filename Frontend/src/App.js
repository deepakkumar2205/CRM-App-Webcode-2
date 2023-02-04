import { createTheme, ThemeProvider } from '@mui/material';
import { useContext, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Login from './components/Authentication/Login/Login';
import Emailverify from './components/Authentication/mailverification/Emailverify';
import ProtectedRoute from './components/Authentication/ProtectedRoute';
import ResetPassPage from './components/Authentication/ResetPassPage/ResetPassPage';
import ResetPassword from './components/Authentication/resetPassword/ResetPassword';
import Signup from './components/Authentication/signup/Signup';
import Context from './components/ContextFold/Context';
import Dashboard from './components/Dashboard';

function App() {
  const navigate =useNavigate();
  useEffect(() => {
    const user = localStorage.getItem("x-Auth-token")
    if(user){
      navigate("/dashboard")
    }
  },[])
  const context=useContext(Context);
    const darkTheme = createTheme({
        palette:{
            mode    :  context.theme,
        }
    })

  return (
    <ThemeProvider theme={darkTheme}>
    
        <div className="App">
         <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/resetpassword' element={<ResetPassword/>}/>
          <Route path="/emailverify/:string" element={<Emailverify />} />
          <Route path="/resetPassPage/:string" element={<ResetPassPage />} />
          <Route path='dashboard/*' element={<ProtectedRoute><Dashboard/></ProtectedRoute>}>
              <Route/>
          </Route>
         </Routes>
        </div>
      
    </ThemeProvider>
  );
}

export default App;
