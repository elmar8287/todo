(()=>{const e=document.querySelector(".inputs");let t=[{index:1,description:"Create a todo list website",completed:!1},{index:2,description:"Submit all week activities",completed:!1},{index:3,description:"Spend week-end with family",completed:!1}];function o(){let e="";for(let o in t)1==t[o].complited?e+='<input type="checkbox" checked ':e+='<input type="checkbox" >',e+=t[o].description,e+='<p id="ppp"></p><br>';document.querySelector(".js-todo-list").innerHTML=e}o(),null!=localStorage.getItem("todo")&&(t=JSON.parse(localStorage.getItem("todo")),o()),e.addEventListener("submit",(e=>{e.preventDefault();const i=document.querySelector(".input").value,n={};n.description=i,n.complited=!1,n.index=Date.now();const c=t.length;t[c]=n,console.log(t),o(),localStorage.setItem("todo",JSON.stringify(t))}))})();