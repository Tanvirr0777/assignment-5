const manageSpinner = (status) => {
  if(status == true){
       document.getElementById("spinner").classList.remove("hidden");
       document.getElementById("card-conatiner").classList.add("hidden");
  }
  else{
     document.getElementById("spinner").classList.add("hidden");
     document.getElementById("card-conatiner").classList.remove("hidden");
  }
 }
// const loginPass = () => {
 //      manageSpinner(true);
//     const login = document.getElementById("login");
//     const main = document.getElementById("main");

//     const username = document.getElementById("Username");
//     const password = document.getElementById("password");

//     console.log("username :" + username.value);
//     console.log("pasword :" + password.value);

//     if(username.value === "admin" && password.value === "admin123"){
//         login.classList.add("hidden");
//         main.classList.remove("hidden");
//     }
//     else{
//         alert("Invalid Username or Password");
//     }
//       manageSpinner(false);
// }

let allIssues = [];
let filtedIssue = [];

const loadIssues = () => {
    manageSpinner(true);
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then(res => res.json())
    .then(data => {
        allIssues = data.data;
        displayAllIssues(data.data);
        manageSpinner(false);
    });
}
loadIssues();

const displayAllIssues = (data) => {
    const cardConatiner = document.getElementById("card-conatiner");
    cardConatiner.innerHTML = "";

    data.forEach(element => {

         const cardBody = document.createElement("div");
         cardBody.innerHTML = `
           <div onclick="loadModal(${element.id})"
            class="h-85 px-1 py-3 shadow-sm rounded-lg shadow-sm cursor-pointer
           ${element.status === 'open' ?
             "border-t-3 border-green-500" : "border-t-3 border-violet-500"
           }
           ">

            <div class="flex justify-between">
               <div>
               <img src="${element.status === 'open'?
                  './assets/Open-Status.png':'./assets/Closed- Status .png'}"
                 alt = "${element.status}"
               >
                </div>

            <div class="  px-3 rounded-full ${element.priority ==='high' ?
            "bg-[#FEECEC] text-red-500" : element.priority ==='medium'?
            "bg-[#FFF8DB] text-[#D97706]" : "bg-[#EEEFF2] text-gray-400"
             }
            ">
            ${element.priority.toUpperCase()}</div>

            </div>

            <div class="my-5 space-y-3">
               <h2 class="font-bold text-xl text-left">${element.title}</h2>
               <p class="text-gray-400 text-left line-clamp-2">${element.description}</p>
              
               <div class="flex gap-3">
                  <div class=" px-2 border rounded-full
                    ${element.labels[0]==='enhancement' ? 
                        "bg-green-100 text-green-400" :
                         "bg-[#FEECEC] text-red-500"
                      }
                  
                  ">                   
                  <i class=" 
                      ${element.labels[0]==='enhancement' ? 
                        "fa-solid fa-arrow-up-right-dots text-green-400" : 
                        element.labels[0]=== 'documentation' ? 
                        "fa-solid fa-file-code" :
                        "fa-solid fa-bug"
                      }
                      "></i>
                      ${element.labels[0].toUpperCase()}</div>

                  <div class="bg-[#FFF8DB] text-[#D97706] px-2 rounded-full

                     ${element.labels[1] ==='good first issue' ?
                    "hidden" : element.labels.length == 1 ?  "hidden" : 
                     element.labels[0] ==='enhancement' ?    "hidden" :
                     element.labels[0] ==='documentation' ?   "hidden" :
                     element.labels[1]==='enhancement' ?"bg-green-100 text-green-400":
                     element.labels[1]=== 'documentation' ? "bg-[#FEECEC] text-red-500" :
                     "border"
                   }
                
                  ">
                    <i class="
                      ${element.labels[1]==='enhancement' ? 
                        "fa-solid fa-arrow-up-right-dots text-green-400" : 
                        element.labels[1]=== 'documentation' ? 
                        "fa-solid fa-file-code" :
                        "fa-solid fa-life-ring"
                      }
                    "></i>${element.labels[1]?.toUpperCase()} </div>
               </div>

            </div>

            <div class="text-left">
                <hr class="text-gray-300">
                <p class="text-gray-400 mt-3">#by ${element.author}</p>
                <p class="text-gray-400 mt-1">${element.updatedAt.split("T")[0]}</p>
            </div>

         </div> 
         `;

         cardConatiner.appendChild(cardBody);      
    });
}

const activeBtn = (id) => {
    manageSpinner(true);
    
    const cardConatiner = document.getElementById("card-conatiner");
    const issueNumber = document.getElementById("issue-number");

    const btnAll = document.getElementById("btn-all");
    btnAll.classList.remove("btn-primary");

    const btnOpen = document.getElementById("btn-open");
    btnOpen.classList.remove("btn-primary");

    const btnClose = document.getElementById("btn-close");
    btnClose.classList.remove("btn-primary");

    const btn = document.getElementById(id);
    btn.classList.add("btn-primary") 

    if(id === 'btn-open'){
        const filtedIssue = allIssues.filter(substance => substance.status !== 'closed');
        openLen = filtedIssue.length;
        issueNumber.innerText = openLen;
        displayAllIssues(filtedIssue);   
    }

    if(id === 'btn-close'){
        const filtedIssue = allIssues.filter(substance => substance.status !== 'open');
        openLen = filtedIssue.length;
        issueNumber.innerText = openLen;
        displayAllIssues(filtedIssue);
    }
    if(id === 'btn-all'){
        displayAllIssues(allIssues);
        issueNumber.innerText = allIssues.length;
    }

    manageSpinner(false);
}

const loadModal = async(id) => {
     manageSpinner(true);
     const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`
     const res = await fetch(url);
     const details = await res.json();
     displayModal(details.data);
     manageSpinner(false);
}

const displayModal = (id) => {

    const modalContainer = document.getElementById("modal-details");

    modalContainer.innerHTML = `
    
        <h1 class="text-xl font-bold text-left">${id.title}</h1>

               <div class="flex gap-3 text-gray-400 my-3 items-center">
                      <div class="bg-green-500 rounded-2xl px-3  text-white">
                      ${id.status}ed</div>
                      <div> <i class="fa-solid fa-circle"></i>
                       ${id.assignee?'Opened by'+' '+ id.assignee : 'Not assignee'}
                            <i class="fa-solid fa-circle"></i>${id.createdAt.split("T")[0]} 
                      </div>
               </div>

               <div class="flex gap-3 my-3">
                    <div class="rounded-2xl px-3 border
                     ${id.labels[0]==='enhancement' ? 
                        "bg-green-100 text-green-400" :
                         "bg-[#FEECEC] text-red-500"
                      }
                    ">
                    <i class=" 
                      ${id.labels[0]==='enhancement' ? 
                        "fa-solid fa-arrow-up-right-dots text-green-400" : 
                        id.labels[0]=== 'documentation' ? 
                        "fa-solid fa-file-code" :
                        "fa-solid fa-bug"
                      }
                      "></i>
                    ${id.labels[0]?id.labels[0].toUpperCase():""}
                    </div>

                    <div class="rounded-2xl px-3 border
                     ${id.labels[1]==='enhancement' ? 
                        "bg-green-100 text-green-400" :
                         id.labels[1] === "bug" ? 
                         "bg-[#FEECEC] text-red-500" :
                        "bg-yellow-100 text-yellow-500" 
                         
                      }
                    ">
                    <i class=" 
                      ${id.labels[1]==="enhancement" ? 
                        "fa-solid fa-arrow-up-right-dots text-green-400" : 
                        id.labels[1]=== "documentation" ? 
                        "fa-solid fa-file-code" :
                        id.labels[1] === "bug" ? "fa-solid fa-bug":
                        id.labels[1] === "help wanted" ? "fa-solid fa-life-ring" :
                        "fa-solid fa-thumbs-up"                       
                      }
                      "></i>
                   ${id.labels[1]?id.labels[1].toUpperCase():""}
                   
                   </div>
               </div>

               <p class="my-4 text-gray-400 text-left">${id.description}</p>

               <div class="shadow-sm p-3 flex justify-between text-left">
                   <div>
                       <h3 class="text-gray-400">Assignee: </h3>
                       <h2>${id.assignee.toUpperCase()? id.assignee.toUpperCase() :
                        'Not assignee' }</h2>
                   </div>
                   <div>
                       <h3 class="text-gray-400">Priority :</h3>
                       <div class=" rounded-xl px-3 border
                       ${id.priority === 'low' ? "bg-gray-100 text-gray-500 " :
                        id.priority === 'medium' ? "bg-[#FFF8DB] text-[#D97706]" :
                        "bg-red-500 text-white "

                       } ">
                       ${id.priority.toUpperCase()}</div>
                   </div>
               </div>
    `;
    document.getElementById("my_modal").showModal();
}

