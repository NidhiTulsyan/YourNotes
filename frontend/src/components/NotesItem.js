import React,{useContext} from 'react'
import {NoteContext} from '../components/App';


export default function NotesItem(props) {
  const context = useContext(NoteContext);
  const {deleteNote} = context;
    const {note,updateNote,showAlert} = props;

  return (
    <div className='col-md-3 my-3'>
      <div className="card">
  <div className="card-body">
    <h5 className="card-title">{note.title}</h5>
    <p className="card-text">{note.description}</p>
    <i className="fa-sharp fa-solid fa-trash mx-2" style={{cursor:"pointer"}} onClick={()=>{deleteNote(note._id); showAlert("Note Deleted Successfully","success")}}></i>
    <i className="fa-solid fa-pen-to-square mx-2" style={{cursor:"pointer"}} onClick={()=>{updateNote(note);}}></i>
  </div>
</div>
    </div>
  )
}
