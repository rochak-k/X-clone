import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/homepage/HomePage"
import SignUp from "./pages/auth/signup/SignUp"
import Login from "./pages/auth/login/Login"
import Sidebar from "./components/common/SideBar"
import RightPanel from "./components/common/RightPanel"
const App = () =>{
  return (
   <div className="flex max-w-6xl ">
    <Sidebar/>
 <Routes>
  <Route path="/" element={<HomePage/>}/>
  <Route path = "/signup" element={<SignUp/>}/>
  <Route path="/login" element={<Login/>}/>
 </Routes>
 <RightPanel/>
   </div>
   
  )
}
export default App
