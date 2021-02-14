import React, { useRef, useState,useEffect } from 'react'
import "../App.css"
import { VscSymbolColor } from "react-icons/vsc";
import { AiOutlineDelete } from "react-icons/ai";
import { IoIosArrowDropdown } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { FiMic } from "react-icons/fi";
import {useAuth} from "../context/authContext"
import uuid from 'react-uuid'
import {database} from "../firebase"
import { BiLogOut } from "react-icons/bi";
function Main() {
  const {currentUser} = useAuth()
const [day, setDay] = useState(new Date())
const [settings ,setSettings] = useState(true)
const [color , setColor] = useState(["info","dark","primary"])
const [tasks, setTasks] = useState([{title: "Tesst", tasks:["Try Something"], Date: day.getDay()+"/"+day.getMonth()+"/"+day.getFullYear(),}])
const [notes, setNotes] = useState([{title:"try", content: "Write your soul out", Date: day.getDay()+"/"+day.getMonth()+"/"+day.getFullYear(),}])
const [addTodo, setAddTodo] = useState(false)
const [AddNotes, setAddNotes] = useState(false)
const [kalam, setKalam] = useState("type anything")
const[drop, setDrop] = useState(false)
const [listening, setListening] = useState(false)
const [display, setDisplay] = useState([{}]);
const [displayn, setDisplayn] = useState([{}]);
const {logout} = useAuth()
function writeNewPost( data) {
  // A post entry.
  

  // Get a key for a new Post.
  var newPostKey = database.ref().child('posts').push().key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  
  updates[currentUser.displayName +'/' + newPostKey] = data;

  return database.ref().update(updates);
}
function writeNewNote( data) {
  // A post entry.
  

  // Get a key for a new Post.
  var newPostKey = database.ref().child('posts').push().key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  
  updates['/notes/'+currentUser.displayName +'/' + newPostKey] = data;

  return database.ref().update(updates);
}
const commands = [
  {
    command: 'Add to-do *',
    callback: (word) => {setTasks(tasks.concat({title: word, tasks:["Try Something"], Date: day.getDay()+"/"+day.getMonth()+"/"+day.getFullYear(),}));writeNewPost({title: word, tasks:["Try Something"], Date: day.getDay()+"/"+day.getMonth()+"/"+day.getFullYear(),})}

  },
  {
    command: 'Add to do *',
    callback: (word) => {setTasks(tasks.concat({title: word, tasks:["Try Something"], Date: day.getDay()+"/"+day.getMonth()+"/"+day.getFullYear(),}));writeNewPost({title: word, tasks:["Try Something"], Date: day.getDay()+"/"+day.getMonth()+"/"+day.getFullYear(),})}
  },
  {
    command: 'add to do *',
    callback: (word) => {setTasks(tasks.concat({title: word, tasks:["Try Something"], Date: day.getDay()+"/"+day.getMonth()+"/"+day.getFullYear(),}));writeNewPost({title: word, tasks:["Try Something"], Date: day.getDay()+"/"+day.getMonth()+"/"+day.getFullYear(),})}
  },
  {
    command: 'to do *',
    callback: (word) => {setTasks(tasks.concat({title: word, tasks:["Try Something"], Date: day.getDay()+"/"+day.getMonth()+"/"+day.getFullYear(),}));writeNewPost({title: word, tasks:["Try Something"], Date: day.getDay()+"/"+day.getMonth()+"/"+day.getFullYear(),})}
  },
 
  
    
  {
    command: 'clear',
    callback: ({ resetTranscript }) => resetTranscript()
  }
]
useEffect(() => {
  var starCountRef = database.ref(currentUser.displayName + '/');
starCountRef.on('value', (snapshot) =>{
  const data = snapshot.val();
  setDisplay(data)
});
var starCountRefN = database.ref('/notes/'+currentUser.displayName + '/');
starCountRefN.on('value', (snapshot) =>{
  const dataN = snapshot.val();
  setDisplayn(dataN)
});
}, [tasks, notes, kalam])
const { transcript, resetTranscript } = useSpeechRecognition({commands})
const title = useRef("")


const handleClickn = () =>{
    if(title.current.value===""){
        alert("Title cant be empty");
        console.log(display)
        
    } else{
    setNotes(notes.concat({title: title.current.value, content:"", Date: day.getDay()+"/"+day.getMonth()+"/"+day.getFullYear(),}));
    writeNewNote({title: title.current.value, content:"", Date: day.getDay()+"/"+day.getMonth()+"/"+day.getFullYear(),})
    setAddTodo(false); setSettings(false); setAddNotes(!AddNotes);
    }

}
const handleClick = () =>{
  if(title.current.value===""){
      alert("Title cant be empty");
      console.log(currentUser)
      
  } else{
  setTasks(tasks.concat({title: title.current.value, tasks:["Try Something"], Date: day.getDay()+"/"+day.getMonth()+"/"+day.getFullYear(),}));
  writeNewPost({title: title.current.value, tasks:["Try Something"], Date: day.getDay()+"/"+day.getMonth()+"/"+day.getFullYear(),})
  setAddTodo(!addTodo); setSettings(false); setAddNotes(false);
  }

}
   if(display === undefined){
     return(<h1 className="text-center">Loading</h1>)
   }
return (
        
        <div className={` bg-${color[1]} h-100 pooper`}>
            <div  className= {` w-100 h-25 bg-${color[0]} p-4 position-relative back `}><h5 className="text-center text-light">Welcome {currentUser.displayName}</h5><span className={`mx-auto text-center text-light`}>{day.getDate()}/{day.getMonth()}/{day.getFullYear()}</span>
            <button onClick={()=>{setSettings(!settings); setAddTodo(false); setAddNotes(false)}} className={`btn btn-${color[2]} bt `}><VscSymbolColor></VscSymbolColor></button>
            <button onClick={()=>logout()} className={`btn btn-${color[2]} bl `}><BiLogOut className="mx-auto"></BiLogOut></button>
            <button onClick={()=>{setAddTodo(!addTodo); setSettings(false); setAddNotes(false)}} className={`btn btn-${color[2]} btt `}>Add TODO</button>
            <button onClick={()=>{setAddTodo(false); setSettings(false); setAddNotes(!AddNotes)}} className={`btn btn-${color[2]} bttt `}>Add NOTES</button>
            </div>
            {(!settings&& !AddNotes &&!addTodo)&&<div class={`container  bg-${color[1]} `}>
                          <div className="row m-1">
                            {!display&& <h3 className={`text-light`}>What is on your mind today?</h3>}
                         {display&&Object.keys(display).map((key, index)=> <div class="card text-left mb-2 mr-2 p-2  col-12 mr-1 shadow-lg">
                            
                            <div class="mx-2  card-body text-left">
                              <div className="row">
                              <h4 class="card-title">{display[key].title} </h4>
                              <button onClick={()=>{setTasks(tasks.filter(it=>it!==display[key])); console.log(key); database.ref(currentUser.displayName + '/'+ key).remove();}} className={`ml-auto btn btn-${color[2]} pleh`}>DEL<AiOutlineDelete></AiOutlineDelete></button>
                              <button onClick={()=>{let name = prompt("what do you want to change the title to"); database.ref(currentUser.displayName + '/'+ key).update({title: name, tasks:["Try Something"], Date: day.getDay()+"/"+day.getMonth()+"/"+day.getFullYear(),}) ; }}  className={`ml-2 btn btn-${color[2]} pleh`}>EDT<FiEdit></FiEdit></button>
                              <span className="col-12">{display[key].Date}</span>
                            </div>
                          
                            </div>
                          </div>)}
                        
                          {displayn&&Object.keys(displayn).map((key, index)=>(<div class="card text-left mb-2 mr-2 p-2  col-12 mr-1 shadow-lg">
                            
                            <div class="mx-2  card-body text-left">
                              <div className="row">
                              <h4 class="card-title">{displayn[key].title} </h4>
                              <button onClick={()=>{setNotes(notes.filter(it=>it!==displayn[key]));database.ref('/notes/'+currentUser.displayName + '/'+ key).remove();}} className={`ml-auto btn btn-${color[2]} pleh`}>DEL<AiOutlineDelete></AiOutlineDelete></button>
                              <button onClick={()=>{let namee = prompt("what do you want to change the title to"); database.ref('/notes/'+currentUser.displayName + '/'+ key).update({title: namee, content: displayn[key].content, Date: day.getDay()+"/"+day.getMonth()+"/"+day.getFullYear(),}) ; }}  className={`ml-2 btn btn-${color[2]} pleh`}>EDT<FiEdit></FiEdit></button>
                              <button onClick={()=>setDrop(!drop)} className={`ml-2 btn pleh sm`}><IoIosArrowDropdown></IoIosArrowDropdown></button>
                              <span className="col-12">{displayn[key].Date}</span>
                            
                            {drop&&<textarea class="ar container text-area text-box multi-line" onChange={(e)=>{setKalam(e.target.value); database.ref('/notes/'+currentUser.displayName + '/'+ key).update({title: displayn[key].title, content: e.target.value, Date: day.getDay()+"/"+day.getMonth()+"/"+day.getFullYear(),});}}  placeholder="say something" data-val="true" data-val-length="Maximum = 2045 characters" value={displayn[key].content} data-val-length-max="2045" id="info" name="info" cols="40" rows="3"></textarea>}
                            
                            </div>
                          
                            </div>
                          </div>))}
                          

                         
                          
                          </div>
                          </div>}
            
            
            {settings&&<div class="w-75 mx-auto card text-left position-absolute ppp">
              <div class="card-body">
                <h4 class="card-title">Choose A Theme</h4>
                <button onClick={()=>setColor(["primary","dark","dark"])} className="btn btn-primary mr-2 round"></button>
                <button onClick={()=>setColor(["dark","info","info"])} className="btn btn-dark mr-2  round"></button>
                <button onClick={()=>setColor(["info","dark","primary"])} className="btn btn-info mr-2  round"></button>
                <button onClick={()=>setColor(["danger","info","info"])} className="btn btn-danger mr-2  round"></button>
                <button onClick={()=>setColor(["warning","dark","primary"])} className="btn btn-warning mr-2  round"></button>

              </div>
            </div>}
            {(!settings && !AddNotes && addTodo)&&<div class="w-75 mx-auto card text-left position-absolute ppp">
              <div class="card-body">
                <h4 class="card-title">ADD A LIST OF TASKS</h4>
                <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                <button onClick={()=>handleClick()} className={`btn btn-sm btn-outline-${color[2]}`}>Add List</button>
                                </div>
                                <input type="text" ref={title} class="form-control" placeholder="Type A Title" aria-label="" aria-describedby="basic-addon1"/>
                                </div>
                

              </div>
            </div>}
            {(!settings && !addTodo && AddNotes)&&<div class="w-75 mx-auto card text-left position-absolute ppp">
              <div class="card-body">
                <h4 class="card-title">ADD A NOTE</h4>
                <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                <button onClick={()=>handleClickn()} className={`btn btn-sm btn-outline-${color[2]}`}>Add List</button>
                                </div>
                                <input type="text" ref={title} class="form-control" placeholder="Type A Title" aria-label="" aria-describedby="basic-addon1"/>
                                </div>
                

              </div>
            </div>}
            <button onClick={()=>{if(listening){SpeechRecognition.stopListening(); SpeechRecognition.abortListening(); resetTranscript(); setListening(false) }else{SpeechRecognition.startListening({continuous: true}); setListening(true)}}} className={`btn text-color-light btn-outline-light speech`}>{transcript}<FiMic className="h3 text-color-light"></FiMic></button>
            
        </div>
    )
}

export default Main
