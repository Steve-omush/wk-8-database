import {Routes, Route } from "react-router-dom";
import Books from "./pages/Books";
import Add from "./pages/Add";
import Update from "./pages/Update";
import "./style.css";

// import {Books, Add, Update} from "./pages";

function App() {
  return (
    <div className="App">
        <Routes>
            <Route path="/" element={<Books/>}/>
            <Route path="/add" element={<Add/>}/>
            <Route path="/update/:id" element={<Update/>}/>
        </Routes>
    </div>
  );
}

export default App;
