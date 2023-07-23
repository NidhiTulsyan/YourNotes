import React from "react";
import Notes from "./Notes";
import AddNotes from "./AddNotes";

export default function Home(props) {
const {showAlert} = props;
  return (
    <>
      <div className="container my-3">
        <AddNotes showAlert={showAlert}/>  
      </div>

      <div className=" container">
        <Notes showAlert={showAlert}/>
      </div>
    </>
  );
}
