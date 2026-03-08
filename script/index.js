 let cardArray = [];
// const loginPass = () => {
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
// }

const loadIssues = () => {
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then(res => res.json())
    .then(data => displayAllIssues(data.data));
}
loadIssues();

const displayAllIssues = (data) => {
    const cardConatiner = document.getElementById("card-conatiner");
    cardConatiner.innerHTML = "";

    data.forEach(element => {
         
        cardArray.push({
            element
         });

         const cardBody = document.createElement("div");
         cardBody.innerHTML = `
           <div class="h-85 px-1 py-3 shadow-sm rounded-lg shadow-sm
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
    const cardConatiner = document.getElementById("card-conatiner");
    const openCard = document.getElementById("open-card");
    const closeCard = document.getElementById("close-card");

    const btnAll = document.getElementById("btn-all");
    btnAll.classList.remove("btn-primary");

    const btnOpen = document.getElementById("btn-open");
    btnOpen.classList.remove("btn-primary");

    const btnClose = document.getElementById("btn-close");
    btnClose.classList.remove("btn-primary");

    const btn = document.getElementById(id);
    btn.classList.add("btn-primary") 

    if(id === 'btn-open'){
        const updateCard = cardArray.filter(substance => substance.element.status != 'closed');
        cardArray = updateCard;

        cardConatiner.classList.add("hidden");
        closeCard.classList.add("hidden");
        openCard.classList.remove("hidden");
    }
    if(id === 'btn-close'){
        const updateCard = cardArray.filter(substance => substance.element.status != 'open');
        cardArray = updateCard ;

        cardConatiner.classList.add("hidden");
        openCard.classList.add("hidden");
        closeCard.classList.remove("hidden");
    }
    if(id === 'btn-all'){
        openCard.classList.add("hidden");
        closeCard.classList.add("hidden");
        cardConatiner.classList.remove("hidden");
    }
    console.log(cardArray);

    cardArray = [];
    loadIssues();
    
}

