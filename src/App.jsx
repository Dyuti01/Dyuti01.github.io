import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './index.css'

import Navbar from './components/Navbar.jsx'

import { v4 as uuidv4 } from 'uuid';
uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

import { TiTick } from "react-icons/ti";
import { FaUndoAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { IoIosSave } from "react-icons/io";

function App() {
  const sl = useRef(1)
  const [showFinished, setShowFinished] = useState(true)
  const [task, setTask] = useState("")
  const [tasks, setTasks] = useState([])

  const savetoLocalStorage = (params) => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }

  function handleSave(){
    savetoLocalStorage()
    alert("Your tasks saved succcessfully !")
  }

  useEffect(() => {
    let tskStr = localStorage.getItem("tasks")
    if (tskStr != null) {
      let tsks = JSON.parse(localStorage.getItem("tasks"))
      setTasks(tsks)
    }

  }, [])

  function toggleFinished(){
    setShowFinished(!showFinished)
  }


  function handleAdd() {
    // if (task != "") {  // This is solved using disabled={task.length<=3} attribute of button
      sl.current = tasks.length + 1;
      let newTask = { id: uuidv4(), sl: sl.current, task, isComplete: false }
      localStorage.setItem("tasks", JSON.stringify([...tasks, newTask]))

      // setTasks((currTasks)=>{
      //   // console.log(currTasks)
      //   return [...currTasks, newTask]})
      setTasks((currTasks)=>[...currTasks, newTask])  // currentTasks contain the prevTasks till before adding a new task

      console.log(tasks.length)
      setTask("")

    // }
    // console.log(tasks)
    // savetoLocalStorage() // This storage has no effect since setState function is asynchronous takes somtmime so storeToLocalStorage will not store the last updated tasks array
  }

  // Task completed or not
  function handleComplete(e, eid) {
    // console.log(e.target, eid)
    let index = tasks.findIndex(item => {
      return item.id === eid
    })
    // console.log(index)
    let newTasks = [...tasks]
    newTasks[index].isComplete = newTasks[index].isComplete ? false : true;
    setTasks(newTasks)
    // console.log(tasks)

    savetoLocalStorage()
  }
  function handleEdit(e, id) {
    let t = tasks.filter(tsk => tsk.id == id)
    setTask(t[0].task)

    // let newTasks = tasks.filter(function(tsk){
    //   return tsk.id!=id
    // })
    // setTasks(newTasks)
    handleDel(e, id)  // Though handleDel declared below it works
    // savetoLocalStorage() // present in handleDel
  }
  function handleDel(e, id) {
    // console.log(`The id is ${id}`)
    let index = tasks.findIndex(item => {
      return item.id == id
    })
    for (let i = index + 1; i < tasks.length; i++) {
      tasks[i].sl = tasks[i].sl - 1;
    }
    let newTasks = tasks.filter(function (tsk) {
      return tsk.id != id
    })
    localStorage.setItem("tasks", JSON.stringify(tasks.filter(function (tsk) {
      return tsk.id != id
    })))
    
    setTasks(newTasks)
    // savetoLocalStorage()  // This storage has no effect since setTasks is asynchronous takes somtmime so storeToLocalStorage will not store the last updated tasks array
  }

  function handleChange(e) {
    setTask(e.target.value)
    // savetoLocalStorage()

    // console.log(task)
  }

  function handleCheckbox(e) {
    // console.log(e.target.value)
    let id = e.target.name
    let index = tasks.findIndex(item => {
      return item.id == id
    })
    let newTasks = [...tasks]
    newTasks[index].isComplete = newTasks[index].isComplete ? false : true;
    setTasks(newTasks)
    // console.log(tasks)
    // console.log(e.target.value)
    savetoLocalStorage() // // This storage has no effect since setTasks is asynchronous takes somtmime so storeToLocalStorage will not store the last updated tasks array
  }



  return (
    <>
      <Navbar />

      <div className="container w-auto h-auto m-auto flex flex-col bg-cyan-300 mt-3 rounded-3xl p-6 gap-5">
        <h1 className='text-3xl text-cyan-900 flex items-center justify-center font-bold'>Manage Your Tasks</h1>
        <div className="addTask flex flex-col gap-5">
          <div className='flex flex-col gap-4'>
            <h1 className='font-bold text-xl'>Add your tasks</h1>
            <div className='flex flex-col sm:flex-row sm:items-center gap-3'>
              <input className='rounded-xl px-4 py-1 sm:py-2 w-80 sm:w-3/4' type="text" value={task} onChange={handleChange} />
              
              <div className='flex gap-3'>
                <button onClick={handleAdd} disabled={task.length<3} className='bg-sky-500 disabled:bg-gray-400 disabled:text-black font-semibold px-4 py-2 rounded-xl hover:bg-green-500 hover:text-white transition-all'><IoMdAdd /></button>
                <button onClick={handleSave} className='bg-sky-500 font-semibold px-4 py-2 rounded-xl hover:bg-green-500 hover:text-white transition-all'><IoIosSave /></button>
              </div>
            </div>

          <div>
            <input onChange={toggleFinished} type="checkbox" checked={showFinished} /> <span className='text-sm font-medium'>Show finished tasks</span>

          </div>

          </div>
          <div className="tasks flex flex-col">
            {/* right-52 */}
            <h2 className='text-xl font-semibold'>Tasks</h2>
            <div className='h-px bg-cyan-900 w-full'></div>

            {tasks.length == 0 && <div className='mt-3'>No Tasks left !!!</div>}
            {tasks.filter((tsk)=>{
              return tsk.isComplete!=true
            }).length == 0 && <div className={tasks.length!=0?'mt-3':''}>All tasks completed !!!</div>}

            <div className='py-3'>
              <ol className='flex flex-col gap-3'>
                {/* <li>my toos</li> */}

                {tasks.map(tsk => {
                  // See the important logic below in return
                  return (
                    (showFinished || !tsk.isComplete) &&
                    <div key={tsk.id} className='flex gap-6'>
                      <li className={!tsk.isComplete ? "w-96 break-words":"w-96 break-words line-through"}>{tsk.sl}. {tsk.task}</li>

                      <input onChange={handleCheckbox} name={tsk.id} type="checkbox" checked={tsk.isComplete} />
                      
                      <div className='flex items-center gap-3'>
                        <button onClick={(e) => {handleComplete(e, tsk.id) }} className='bg-sky-600 text-white px-3 py-1 rounded-md text-xs hover:bg-green-500 transition-all duration-200 font-semibold'>{tsk.isComplete ? <FaUndoAlt /> : <TiTick />}</button>

                        <button onClick={(e) => {handleEdit(e, tsk.id)}} className='bg-sky-600 text-white px-3 py-1 rounded-md text-xs hover:bg-yellow-500 transition-all duration-200 font-semibold'><FaEdit /></button>

                        <button onClick={(e) => {confirm("Are you sure want to delete?")?handleDel(e, tsk.id):""}} className='bg-sky-600 text-white px-3 py-1 rounded-md text-xs hover:bg-red-500 transition-all duration-200 font-semibold'><MdDelete /></button>

                      </div>


                    </div>

                  )
                })}
              </ol>
            </div>

          </div>
        </div>


      </div>
    </>
  )
}

export default App
