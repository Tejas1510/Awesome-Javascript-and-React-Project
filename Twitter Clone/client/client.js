const form=document.querySelector(".woof-form")
const loader=document.querySelector('.loading')
const woof_ele=document.querySelector(".woofs")
const API_URL="http://localhost:3000/woofs"

loader.style.display="";
listAllWoofs();
 function listAllWoofs(){
     woof_ele.innerHTML=''
fetch(API_URL)
    .then(res=>res.json())
    .then(woofs=>{
        woofs.reverse()
      woofs.forEach(woof=>{

            const div=document.createElement('div') 

            const header=document.createElement('h4')
            header.textContent=woof.name
            const para=document.createElement('p')
            para.textContent=woof.content
            const date=document.createElement('small')
            date.textContent=woof.created_date;
            div.appendChild(header)
            div.appendChild(para)
            div.append(date);
            div.appendChild(document.createElement('hr'));
            woof_ele.append(div);

      }) 
      loader.style.display="none"; 
    })
 }



form.addEventListener('submit',(event)=>{
    event.preventDefault();
    const formData= new FormData(form);
    const name=formData.get('name');
    const content=formData.get('content')
    const woof={
        name,
        content
    };
    // console.log(woof);
    loader.style.display="";
    form.style.display="none";
    fetch(API_URL,{
        method:'POST',
        body: JSON.stringify(woof),
        headers:{
            'content-type':'application/json'
        }

    }).then(res=>
        res.json())
        .then(createdWoof=>{
            form.reset();
            loader.style.display='none';
            form.style.display='';
            // console.log(createdWoof);
            listAllWoofs();
        });
        location.reload()

});
