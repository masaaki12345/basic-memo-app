// import { useState } from 'react';
// import './App.css';
// import Button from './Button';


// const name = "nissho";


// function App() {

//   const [count , setCount] = useState(0)
//   const onClickCountUp = ()=>{
//     setCount((prev)=> {
//       return prev + 1;
//     })
//   }

//   const onClickCountDawn = () =>{
//     setCount((prev)=> {
//       return prev - 1;
//     })
//   }
//   return (
//     <div className="App">
//       <p>カウント：{count}</p>
//       <Button btn_click={onClickCountUp} btn_txt="1増やす"/>
//       <Button btn_click={onClickCountDawn} btn_txt="1減らす"/>
//       <br />
//       <Button btn_click={()=>{setCount(count + 2)}} btn_txt="2増やす"/>
//     </div>
//   );
// }

import React, { useState } from 'react'
import './App.css';

function App() {
  
    const [notes,setNotes] = useState([]);
    const [selectedNote,setSelectedNote] = useState(null);
    const [edetedText,setEdetedText] = useState("");

    const handleNoteAdd = () => {
      const newNote ={
      id:Date.now(),
      text: "新規ノート📝"
    }
    console.log(newNote);
    setNotes([...notes,newNote]);
    setSelectedNote(newNote);
    setEdetedText(newNote.text);
    }

    const handleSelect = (note) =>{
      console.log(note);
      setSelectedNote(note);
      setEdetedText(note.text);
    }

    const handleDelete = (noteId) => {
      const filterdNote = notes.filter((note) => note.id !== noteId);
      // console.log(noteId);
      console.log(filterdNote);
      setNotes(filterdNote);

      if(filterdNote.length > 0){
        const lastNote = filterdNote[filterdNote.length - 1];
        setSelectedNote(lastNote);
      }else{
        setSelectedNote(null);
      }
    }

    const handleChange = (e) => {
      console.log(e.target.value);
      setEdetedText(e.target.value);
    }

    const handleSave = () => {
      const updateNotes = notes.map((note)=>{
        if(note.id == selectedNote.id){
          return{...note,text:edetedText}
        }
        return note;
      });
      console.log(updateNotes);
      setNotes(updateNotes);
    }

    const handleKeyDawn = (e) =>{
      if(e.key == "Enter" && !e.shiftKey ){
        e.preventDefault();
        handleSave();
      }
    }

  return (
  <div className="app-container">

    <div className="sidebar">
      <button id="create" onClick={handleNoteAdd}>ノート追加</button>
        <ul>
          {notes.map((note)=>(
          <li id={note.id} className={selectedNote.id == note.id ? "selected" : ""}>
            <button onClick={()=> handleDelete(note.id)} className="delete">削除</button>
            <span tabIndex={0} onClick={() => handleSelect(note)}>{note.text}</span>
          </li>
          ))}
        </ul>
    </div>
    <div className="main">
      {selectedNote ? (
        <>
      <h2>内容</h2>
      <textarea value={edetedText} onChange={handleChange} onKeyDown={handleKeyDawn}/>
      <button onClick={handleSave} className="save"
      onKeyDown={(e)=> {
        if(e.key == "Enter"){
          handleSelect(notes);
        }
      }}>保存</button>
      </>
      ) : (
        <div>
          ノートを作成してください。
        </div>
        )}
    </div>
  </div>
)
}

export default App;


// export default App;
