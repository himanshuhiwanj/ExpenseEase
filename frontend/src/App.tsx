import './App.css'
import Login from './pages/Login.tsx'
import SignUp from './pages/SignUp.tsx'
import { Route , Routes ,BrowserRouter} from 'react-router-dom'

import AddTransaction from './pages/AddTransaction.tsx'
import TransactionHistory from './pages/TransactionHistory.tsx'
import Dashboard from './pages/Dashboard.tsx'
import Report from './pages/Report.tsx'
import WelcomePage from './pages/WelcomePage.tsx'

const App = () => {
  return (
    <BrowserRouter>
       <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signUp" element={<SignUp/>}/>
        <Route path="/history" element={<TransactionHistory/>}/>
        <Route path="/" element={<WelcomePage/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/add" element={<AddTransaction/>}/>
        <Route path="/report" element={<Report/>}/>
       </Routes>
    </BrowserRouter>
  )
}

export default App
