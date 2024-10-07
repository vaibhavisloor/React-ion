import React from "react";
import {BrowserRouter as Router,Routes, Route} from "react-router-dom"
import Join from "../src/components/Join"
import Chat from "../src/components/Chat"

function App()
{
 return (<Router>
 <Routes>
    <Route path="/"  element={<Join/>}/>
    <Route path="/chat"  element={<Chat/>}/>
 </Routes>
 </Router>)   
}

export default App;