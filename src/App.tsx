import "./App.css";
import "./style.scss";
import "./media-query.css";
import "./App.css";
import Home from "./pages/Home";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddEditBlog from "./pages/AddEditBlog";
import Detail from "./pages/Detail";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import { useState, useEffect } from "react";
import Auth from "./pages/Auth";
import { auth } from "./utility/firebase";
import { User, signOut } from "firebase/auth";


// interface HeaderProps  {
//   setActive:(active: string) => void
//   active: string

// }



function App() {
  const [active, setActive] = useState<string>("home")
  const [user, setUser]= useState< User | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser)
      } else{
        setUser(null)
      }
    })
  }, [])

  const handleLogout = () => {
    // signout method  from firebase auth
    // setUser to null
    // setActive to login
    // navigate to Auth 
    signOut(auth).then(() => {
      setUser(null);
      setActive("/login");
      navigate("/auth");
    })

  }


  return (
    <>
      <Header setActive = {setActive} active = {active} user= {user} handleLogout = {handleLogout} />
      <ToastContainer position="top-center"/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/create" element={<AddEditBlog />} />
        <Route path="/update/:id" element={<AddEditBlog />} />
        <Route path="/about" element={<About />} />
        <Route path="/auth" element={<Auth setActive = {setActive} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;

