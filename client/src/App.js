import { BrowserRouter as Router } from "react-router-dom";
import './App.css';
import Navbar from './components/Navbar'
import AllRoutes from "./AllRoutes";
import { useDispatch } from "react-redux";
import {fetchAllQuestions} from "./actions/question";
import {useEffect} from "react";
import {fetchAllUsers} from "./actions/users";



function App() {


  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(fetchAllQuestions())
    dispatch(fetchAllUsers())
  }, [dispatch])
 
  
  
  return (
    

    
    <div className="App">
      <Router>
        <Navbar />
        <AllRoutes />
      </Router>
    </div>
  );
}

export default App;
