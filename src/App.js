import "./App.css";
import { react, useState } from "react";
import Navbar from "./component/Navbar";


function App() {
  
  const [text, settext] = useState([]);
  const [desc, setDesc] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  //36c1184363c0421b97eafc66b84b9b25

  const fun = () => {
    fetch("https://adg-rec-task-1.herokuapp.com/")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        settext(data);
      });
  };
  const setd = (event) => {
    setDesc(event.target.value);
  };
  const sett = (event) => {
    setTitle(event.target.value);
  };
  const seta = (event) => {
    setAuthor(event.target.value);
  };
  const takeInput =()=>{
  
    let params = {
      method: "POST",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify({
        "title": title,
        "details":desc,
        "author":author
      }),

    };
    
    fetch("https://adg-rec-task-1.herokuapp.com/createBlog" , params).then((response)=>{
      return response.json();
    }).then((d)=>{
      console.log(d);
    });

    

  };
  const del =()=>{
    fetch("https://adg-rec-task-1.herokuapp.com/deleteBlog/625307a852e1235630cfdb78" , {method : "DELETE"}).then((res)=>{
      return res.json();
    })
    .then((data) =>{
      console.log(data);
    });

  }
  return (
    <>
      
      <Navbar/>
      <div className="container my-4">
        <div className="row">
          {
            text.map((val)=>{
              return (
            <div className="col-3">
            <div class="card my-3" style={{ width: "18rem" }}>
              <div class="card-body">
                <h5 class="card-title">{val.title}</h5>
                <h6 class="card-subtitle mb-2 " style={{
                  color : "rgb(235, 232, 229)",
                }}>by - {val.author}</h6>
                <p class="card-text">
                  {val.details}
                </p>
               
              </div>
            </div>
          </div>

              );
            })
          }
        </div>
      </div>
      <div class="mb-3">
        <h3 className="container"><strong>CREATE BLOG</strong></h3>
  <h4 className ="container my-3">Enter the title of the blog</h4>
  <input type="email" onChange={sett} class="form-control container" id="exampleFormControlInput1" placeholder="Enter the title"/>
</div>
<div class="mb-3 ">
  <h4 className ="container my-3">Enter the author of the blog</h4>
  <input type="email" onChange={seta} class="form-control container" id="exampleFormControlInput1" placeholder="Enter the author"/>
</div>

      <div class="mb-3">
        <h4 class="my-3 container">Write blog description here</h4>
        <textarea
          class="form-control container"
          id="exampleFormControlTextarea1"
          rows="8"
          value={desc}
          onChange={setd}
        ></textarea>
      </div>
      <div className="container cony">
        <button type="button" onClick={fun} class="btn btn-primary ">
          show blogs
        </button>
        <button type="button" onClick={takeInput} class="btn btn-primary mx-3">
          Create blog
        </button>
        <button type="button" onClick={del}  class="btn btn-primary ">
          Delete blog
        </button>
      </div>
      
    </>
  );
}

export default App;
