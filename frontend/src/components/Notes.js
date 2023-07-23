import React, { useEffect ,useRef ,useState}  from 'react'
import NotesItem from './NotesItem'
import {useContext}  from 'react';
import {NoteContext} from '../components/App';
import { useNavigate } from 'react-router-dom';


export default function Notes(props) {
  const {showAlert} = props;

    const context = useContext(NoteContext);
    const {notes,getNote,editNote} = context;

    const ref = useRef(null);
    const refClose = useRef(null);

    const navigate = useNavigate();

  const [note,setNote]=useState({id:"",etitle:"",edescription:"",etag:""})

    const handleClick=(e)=>{
        editNote(note.id,note.etitle,note.edescription,note.etag);
        console.log("updating the note", note);
        ref.current.click()
        showAlert("Note Updated Successfully","Success")
    }

    const onChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }

    useEffect(()=>{
      if(localStorage.getItem('token')){
        getNote();
      }
      else{
        navigate('/login');
      }
    })

    const updateNote=(currentNote)=>{
        console.log(currentNote);
        ref.current.click()
        setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})
    }

    return (
    <>
    <button
          type="button"
          className="btn btn-primary d-none"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          ref={ref}
        >
          Launch demo modal
        </button>

        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Edit a Note
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Title
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="etitle"
                      name="etitle"
                      onChange={onChange}
                        value={note.etitle}
                        minLength={5}
                        required
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="exampleInputPassword1"
                      className="form-label"
                    >
                      Description
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="edescription"
                      name="edescription"
                      onChange={onChange}
                    value={note.edescription}
                    minLength={5}
                    required
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="exampleInputPassword1"
                      className="form-label"
                    >
                      Tag
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="etag"
                      name="etag"
                      onChange={onChange}
                        value={note.etag}
                        minLength={5}
                        required
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  ref={refClose}
                >
                  Close
                </button>
                <button type="button" className="btn btn-primary" onClick={handleClick}>
                  Update Note
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
        <h1>Your Notes</h1>
        { notes.length===0 && <div className='container mx-2'>
        No notes to display so add one
        </div>}
            {notes.map((note)=>{
                return <NotesItem key={note._id} updateNote={updateNote} note={note} showAlert={showAlert}/>
            })}            
      </div> 
      </>  
  )
}
