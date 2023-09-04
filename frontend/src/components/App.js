import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Navbar  from "./Navbar"
import { createContext , useState } from "react";
import Alert1 from "./Alert1";
import Login from "./login";
import Signup from "./signup";



const NoteContext = createContext();
export default function App() {
  let host = "http://localhost:5000"
const notesInitial = []
const  [notes,setNotes]= useState(notesInitial);
const [alert,setAlert] = useState(null)

const showAlert = (message,type)=>{
  setAlert({
    msg:message,
    type:type
  })
  setTimeout(() => {
    setAlert(null);
  }, 1500);
}

//get all notes
const getNote=async()=>{
  //todo api call
  const response = await fetch(`${host}/api/notes/fetchnotes`,{
    method:'GET',
    headers:{
      'content-type':"application/json",
      'auth-token':localStorage.getItem('token')
    }
  })
  const json =await response.json();
  // console.log(json);
  setNotes(json)
}

//Add a note
const addNote=async(title,description,tag)=>{
  //todo api call
  const response = await fetch(`${host}/api/notes/addnotes`,{
    method:'POST',
    headers:{
      'content-type':"application/json",
      'auth-token':localStorage.getItem('token')
    },
    body:JSON.stringify({title,description,tag})
  })
  const json = await response.json();
  console.log("adding a note");
setNotes(notes.concat(json))
}

//delete a note
const deleteNote=async(id)=>{
  const response = await fetch(`${host}/api/notes/deletenotes/${id}`,{
    method:'DELETE',
    headers:{
      'content-type':"application/json",
      'auth-token':localStorage.getItem('token')
    } 
  })
  const json = await response.json();
  console.log("deleteing with id ",id,json);
  setNotes(notes.filter((note)=>{
    return id!==note._id
  }))
}

//edit a note
const editNote=async(id,title,description,tag)=>{
console.log("id is",id);
  const response = await fetch(`${host}/api/notes/updatenotes/${id}`,{
    method:'PUT',
    headers:{
      'content-type':"application/json",
      'auth-token':localStorage.getItem('token')
    },
    body:JSON.stringify({title,description,tag})
  })
  console.log(response);

  const newNotes = JSON.parse(JSON.stringify(notes))

  for (let index = 0; index < newNotes.length; index++) {
    const element = newNotes[index];
    if(id===element._id){
      newNotes[index].title=title
      newNotes[index].description=description
      newNotes[index].tag=tag
      break;
    } 
  }
  setNotes(newNotes)

}

return (
  <>
    <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,getNote}}>
    <Router>
    <Navbar />
    <Alert1 alert={alert}/>
      <Routes>
        <Route path="/" element={<Home showAlert={showAlert}/>} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login showAlert={showAlert}/>} />
        <Route path="/signup" element={<Signup showAlert={showAlert}/>} />
      </Routes>
    </Router>
    </NoteContext.Provider>  
    </>
  );
}

export {NoteContext};

