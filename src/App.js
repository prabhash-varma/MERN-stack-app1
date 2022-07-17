import React,{useState,useEffect, useSyncExternalStore} from 'react';
import Axios from 'axios'
import './App.css';

function App() {


  const [list,setList]=useState([]);

  const [name,setName]=useState("");
  const [age,setAge]=useState(0);
  const [email,setEmail]=useState("");
  const [message,setMessage]=useState("");
  useEffect(()=>{
    Axios.get("https://mymern-project1.herokuapp.com/getUsers").then((res)=>{
      setList(res.data);
    })
  },[list])


  const submit = ()=>{
    Axios.post("https://mymern-project1.herokuapp.com/createUser",{name,age,email,message}).then(()=>{
      console.log("user created");
      console.log(name);
      console.log(email);
      console.log(age);
      console.log(message);
      alert('User created')
    
    })
  }


  const deleteUser = (ind)=>{

    const obj = list.filter((ob,index)=>{
      return ind ===index;
    })
    console.log(obj);

    console.log(obj[0].name);

   

    

    Axios.post("https://mymern-project1.herokuapp.com/deleteUser",{name:obj[0].name}).then(()=>{
      console.log("user deleted");
      alert('user Deleted');
    })
  }






  return (
    <div className="App">
      <h1>MERN Project-1</h1>


      <div className="createuser">
        
        <input type="text" name="name" placeholder="Name" onChange={(e)=>{
          setName(e.target.value)
        }}></input>
        <br></br>
       
        <input type="number" name="age" placeholder="Age" onChange={(e)=>{
           setAge(e.target.value)
        }}></input>
        <br></br>
        
        <input type="text" name="email" placeholder="hero@gmail.com" onChange={(e)=>{
          setEmail(e.target.value)
        }}></input>
        <br></br>
        
        <input type="text" name="message" placeholder="Message" onChange={(e)=>{
           setMessage(e.target.value)
        }}></input>
        <br></br>
        <button onClick={submit}>Submit</button>
      </div>




      <div className='getusers'>
        {list.map((obj,index)=>{
          return (
          <div className="box">

          <table>
            <tbody>
              <tr>
                <td>Name:</td>
                <td>{obj.name}</td>
              </tr>
              <tr>
                <td>Age:</td>
                <td>{obj.age}</td>
              </tr>
              <tr>
                <td>Email:</td>
                <td>{obj.email}</td>
              </tr>
              <tr>
                <td>Message:</td>
                <td>{obj.message}</td>
              </tr>
            
             
      
            </tbody>

          </table>

          <button onClick={()=>{
                deleteUser(index);
          }}>Delete</button>
          
          
          </div>
          )

        })}
      </div>


      
        
    </div>
  );
}

export default App;
