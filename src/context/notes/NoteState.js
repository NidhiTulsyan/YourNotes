// import React, { useState } from "react";
// import NoteContext from "./NoteContext";

// const NoteState = (props)=>{
//     const notesInitial = [
//         {
//           "_id": "64b2cde1a4102648327ec371",
//           "user": "64b18d9603a019992cabdedf",
//           "title": "my first",
//           "description": "my personal diary",
//           "tag": "general",
//           "createdAt": "2023-07-15T16:48:33.821Z",
//           "updatedAt": "2023-07-15T16:48:33.821Z",
//           "__v": 0
//         },
//         {
//           "_id": "64b2cde3a4102648327ec373",
//           "user": "64b18d9603a019992cabdedf",
//           "title": "my first",
//           "description": "my personal diary",
//           "tag": "general",
//           "createdAt": "2023-07-15T16:48:35.279Z",
//           "updatedAt": "2023-07-15T16:48:35.279Z",
//           "__v": 0
//         }
//       ]

//     const  [notes,setNotes]= useState(notesInitial);


//     return(
//         <NoteContext.Provider value={{notes,setNotes}}>
//             {props.Children}
//         </NoteContext.Provider>
//     )
// }
// export default NoteState;