import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/homepage/HomePage"
import SignUp from "./pages/auth/signup/SignUp"
import Login from "./pages/auth/login/Login"
import Sidebar from "./components/common/SideBar"
import RightPanel from "./components/common/RightPanel"
import NotificationPage from "./pages/notification/NotificationPage"
import ProfilePage from "./pages/profile/ProfilePage"
const App = () =>{
  return (
   <div className="flex max-w-6xl ">
    <Sidebar/>
 <Routes>
  <Route path="/" element={<HomePage/>}/>
  <Route path = "/signup" element={<SignUp/>}/>
  <Route path="/login" element={<Login/>}/>
  <Route path="/notifications" element={<NotificationPage/>}/>
  <Route path="/profile/:username" element={<ProfilePage/>}/>
 </Routes>
 <RightPanel/>
   </div>
   
  )
}
export default App
