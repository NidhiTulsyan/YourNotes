import React, { useContext, useState }  from 'react';
import {NoteContext} from '../components/App';

export default function AddNotes(props){
  const {showAlert} = props;

    const context = useContext(NoteContext);
    const {notes,addNote} = context;
    const [note,setNote]=useState({title:"",description:"",tag:""})

    const handleClick=(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setNote({title:"",description:"",tag:""})
        showAlert("Note Added successfully","success");
    }

    const onChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }
    
    return(
        <div>
            <h1>Add Note</h1>
        <form>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
             Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              onChange={onChange}
              minLength={5}
              required
               value={note.title}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              onChange={onChange}
              minLength={5}
              required value={note.description}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
             Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              onChange={onChange}
              minLength={5}
              required value={note.tag}
            />
          </div>
          
          <button disabled={note.title.length<5||note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>
            Add Note
          </button>
        </form>
        </div>
    )
}