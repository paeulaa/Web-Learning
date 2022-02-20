let section = document.querySelector("section");
let add = document.querySelector("form button");
add.addEventListener("click", e =>{
    //prevent form from being submitteds
    e.preventDefault();

    //get three input values
    let form = e.target.parentElement;
    let todoText = form.children[0].value;
    let todoMonth = form.children[1].value;
    let todoDate = form.children[2].value;

    //防呆
    if(todoText === ""){
        alert("Please enter some text.");
        return;//加了return就不會執行下面那一串
    }

    //create new div below
    let todo = document.createElement("div");
    todo.classList.add("todo");
    //create text paragraph
    let text = document.createElement("p"); 
    text.classList.add("todo-text");
    text.innerText = todoText; //get above three input values 
    //create time paragraph
    let time = document.createElement("p"); 
    time.classList.add("todo-time");
    time.innerText = todoMonth + "/" + todoDate;
    
    todo.appendChild(text);
    todo.appendChild(time);
    

    //create green check and red trash can
    let completionButton = document.createElement("button");
    completionButton.classList.add("complete");
    completionButton.innerHTML = '<img src = "./img/check.svg">';
    completionButton.addEventListener("click", e =>{
        let todoItem = e.target.parentElement;
         //javascript插件，可逆
        todoItem.classList.toggle("done");
    })

    let TrashButton = document.createElement("button");
    TrashButton.classList.add("trash");
    TrashButton.innerHTML = '<img src = "./img/trash.svg">';
    TrashButton.addEventListener("click", e =>{
        let todoItem = e.target.parentElement;
        todoItem.addEventListener("animationend", () =>{
            //remove from local storage
            let text = todoItem.children[0].innerText;
            let myListArray = JSON.parse(localStorage.getItem("list"));
            myListArray.forEach((item, index)=>{
                if(item.todoText == text){
                    myListArray.splice(index, 1);
                    localStorage.setItem("list", JSON.stringify(myListArray));
                }
            })
            todoItem.remove(); //動畫結束後，執行裡面function
        })
        todoItem.style.animation = "scaleDown 0.3s forwards";
    })
    todo.append(completionButton);
    todo.append(TrashButton);
    todo.style.animation = "scaleUp 0.3s forwards";

    //create an object
    let myTodo = {
        todoText: todoText,
        todoMonth: todoMonth,
        todoDate: todoDate
    }
    //store data into an array of objects
    let myList = localStorage.getItem("list");
    if(myList == null){
        localStorage.setItem("list", JSON.stringify([myTodo])); //預設object
    }else{
        let myListArray = JSON.parse(myList);
        myListArray.push(myTodo);
        localStorage.setItem("list", JSON.stringify(myListArray));
    }
    console.log(JSON.parse(localStorage.getItem("list")));

    form.children[0].value =""; //清空input
    form.children[1].value ="";
    form.children[2].value ="";
    section.appendChild(todo);
})

loadData();
function loadData(){
//localstorage就是讓你刷新了data也不會消失
let myList = localStorage.getItem("list");
if(myList !== null){
    let myListArray = JSON.parse(myList);
    myListArray.forEach(item => {
        //create a todo
        let todo = document.createElement("div");
        todo.classList.add("todo");
        //create text paragraph
        let text = document.createElement("p"); 
        text.classList.add("todo-text");
        text.innerText = item.todoText; //get above three input values 
        //create time paragraph
        let time = document.createElement("p"); 
        time.classList.add("todo-time");
        time.innerText = item.todoMonth + "/" + item.todoDate;

        todo.appendChild(text);
        todo.appendChild(time);

        //create green check and red trash can
        let completionButton = document.createElement("button");
        completionButton.classList.add("complete");
        completionButton.innerHTML = '<img src = "./img/check.svg">';
        completionButton.addEventListener("click", e =>{
            let todoItem = e.target.parentElement;
            //javascript插件，可逆
            todoItem.classList.toggle("done"); 
        })

        let TrashButton = document.createElement("button");
        TrashButton.classList.add("trash");
        TrashButton.innerHTML = '<img src = "./img/trash.svg">';
        TrashButton.addEventListener("click", e =>{
            let todoItem = e.target.parentElement;
            todoItem.addEventListener("animationend", () =>{
                //remove from local storage
                let text = todoItem.children[0].innerText;
                let myListArray = JSON.parse(localStorage.getItem("list"));
                myListArray.forEach((item, index)=>{
                    if(item.todoText == text){
                        myListArray.splice(index, 1);
                        localStorage.setItem("list", JSON.stringify(myListArray));
                    }
                })
                todoItem.remove(); //動畫結束後，執行裡面function
            })
            todoItem.style.animation = "scaleDown 0.3s forwards";
        })
        todo.append(completionButton);
        todo.append(TrashButton);
        section.appendChild(todo);
    })
}
}
console.log(JSON.parse(localStorage.getItem("list")));
//using merge sort
// function mergeTime(arr1, arr2){
//     let result = [];
//     let i = 0;
//     let j = 0;

//     while(i < arr1.length && j < arr2.length){
//         if(Number(arr1[i].todoMonth) > Number(arr2[j].todoMonth)){
//             console.log(arr1[i].todoMonth,arr2[j].todoMonth);
//             result.push(arr2[j]);
//             j++;
//         }else if(Number(arr1[i].todoMonth) < Number(arr2[j].todoMonth)){
//             result.push(arr1[j]);
//             i++;
//         }else if(Number(arr1[i].todoMonth) == Number(arr2[j].todoMonth)){
//             if(Number(arr1[i].todoDate) > Number(arr2[j].todoDate)){
//                 result.push(arr2[j]);
//                 j++; 
//             }else{
//                 result.push(arr1[i]);
//                 i++; 
//             }
//         }
//     }
//     while(i < arr1.length){
//         result.push(arr1[i]);
//         i++; 
//     }
//     while(j < arr2.length){
//         result.push(arr2[j]);
//         j++;
//     }
//     return result;
// }
function mergeTime(arr1, arr2) {
    let result = [];
    let i = 0;
    let j = 0;
  
    while (i < arr1.length && j < arr2.length) {
      if (Number(arr1[i].todoMonth) > Number(arr2[j].todoMonth)) {
        result.push(arr2[j]);
        j++;
      } else if (Number(arr1[i].todoMonth) < Number(arr2[j].todoMonth)) {
        result.push(arr1[i]);
        i++;
      } else if (Number(arr1[i].todoMonth) == Number(arr2[j].todoMonth)) {
        if (Number(arr1[i].todoDate) > Number(arr2[j].todoDate)) {
          result.push(arr2[j]);
          j++;
        } else {
          result.push(arr1[i]);
          i++;
        }
      }
    }
  
    while (i < arr1.length) {
      result.push(arr1[i]);
      i++;
    }
    while (j < arr2.length) {
      result.push(arr2[j]);
      j++;
    }
  
    return result;
  }


function mergeSort(arr) {
    if (arr.length === 1) {
      return arr;
    } else {
      let middle = Math.floor(arr.length / 2);
      let right = arr.slice(0, middle);
      let left = arr.slice(middle, arr.length);
      return mergeTime(mergeSort(right), mergeSort(left));
    }
}  
 console.log(mergeSort(JSON.parse(localStorage.getItem("list"))));

let sortButton = document.querySelector("div.sort button");
sortButton.addEventListener("click", e =>{
    //sort data
    let sortedArray = mergeSort(JSON.parse(localStorage.getItem("list")));
    localStorage.setItem("list", JSON.stringify(sortedArray));

    //remove data
    let len = section.children.length;
    for(let i=0; i<len; i++){
        section.children[0].remove();
    }
    loadData();
})
