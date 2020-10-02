import React, { Component, useEffect, useState } from "react";
import { getAllTask, getAllCategories, createTodo,deleteTodo,updateStatus,updateTodo} from "./coreapicalls";
import { isAutheticated } from "../Auth/apicall";
const EditTodo = ({index="", title="",description="",todoId="",className="Edit"}) => {
    console.log(title,description,todoId,index);
    const { user, token } = isAutheticated();
    const [categories, setCategories] = useState([]);
    //state variable for todo
    const [ti,setTi]=useState("");
    const [desc,setDesc]=useState("");
    const preload = () => {
        setTi(title);
        setDesc(description);
       
        // console.log(token);
        
        // getAllCategories()
        //   .then((data) => {
        //     if (data.error) {
        //       console.log(data.error);
        //     } else {
        //       setCategories(data);
        //     }
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //   });
      };
      useEffect(() => {
        preload();
      }, []);
    

    //handling input of todo
  const handleChange = (name) => (event) => {
    let value = event.target.value;
    if(name==="title"){
        setTi(value);
    }
    if(name==="description"){
        setDesc(value)
    }
  };
  //handling submitt todo
  const handleSubmit = (event) => {
    const { user, token } = isAutheticated();
     console.log(ti,desc);
     event.preventDefault();
     console.log(title,description);
     let todo={title:ti,description:desc}
     let userId=user._id;
     updateTodo(token,todoId,userId,todo).then(data=>{
         console.log(data);
     }).catch(err=>{console.log(err)});
    //  createTodo(token,user,values).then(data=>{
    //    console.log(data);
    //    if(data.error){
    //      setValues({...values,error:data.error,success:false});
    //    }
    //    else{
    //      setValues({...values,title:"",description:"",category:"",status:"",due:"",success:true})
         
    //      alert("new todo created");
    //      window.location.reload();
    //    }
    //  }).catch(err=>{console.log(err)});   
  }
    const loadTodoForm = () => {
        let arr = [
          "btn btn-primary",
          "btn btn-warning",
          "btn btn-danger",
          "btn btn-warning",
          "btn btn-info",
          "btn btn-dark",
          "btn btn-success",
          "btn btn-light",
        ];
        return (
            
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder="title"
                name="title"
                onChange={handleChange("title")}
                value={ti}
              />
              <textarea
                className="form-control"
                rows="2"
                cols="10"
                placeholder="describe"
                name="description"
                onChange={handleChange("description")}
                value={desc}
              />
            </div>
    
            {/* <div className="form-group">
              <label className="text-dark">category</label>
              <br />
              {categories.map((cate, index) => {
                return (
                  <label className={arr[index]} key={index}>
                    <input
                      type="radio"
                      name="category"
                      value={cate.name}
                      onChange={handleChange("category")}
                    />
                    {cate.name}
                  </label>
                );
              })}
            </div> */}
           
            <button
              type="button"
              className="btn btn-danger"
              data-dismiss="modal"
            >
              Cancel
            </button>
            <input
              type="reset"
              className="btn btn-secondary"
            />
            <button
              type="submit"
              className="btn btn-primary"
            >
              Add
            </button>
          </form>
        );
      };
    
  return <div>
      {
          loadTodoForm()
      }
  </div>;
};

export default EditTodo;