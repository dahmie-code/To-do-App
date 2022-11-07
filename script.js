
// // a function to display the todos being added
// function showToDo(todos){
//     const toDoList = document.querySelector("#list");
//     const li = document.createElement('li');
//     li.innerText = todos;
//     toDoList.appendChild(li);
// }

// // A function to prevent reloading and to submit to do values
// function formSubmit(e){
// e.preventDefault();
// const inputField = document.querySelector("#toDo_Input");
// const toDoValue = inputField.value;
// showToDo(toDoValue);
// }

// // Event handler to submit value
// const toDoForm = document.querySelector("#form-add");
// toDoForm.addEventListener('submit', formSubmit)


    //ul list
    const list = document.getElementById('list');

    // Functions
    // Function to add list items
    const submitForm = (e) => {
        e.preventDefault();
        let insertedData = formAdd.querySelector('input[type=text]').value;
        insertedData = `<li>
        <span class="name">
            <input type="text" value="${insertedData}" readonly="readonly"> 
            <p class="saveInfo">Press "Enter" to save</p>
        </span>
        <span class="action">
            <button class="mark fas fas fa-check"></button>
            <button class="up fas fa-angle-up"></button>
            <button class="down fas fa-angle-down"></button>
            <button class="edit fas fa-pencil-alt"></button>
            <button class="delete fas fa-trash-alt"></button>
         </span>
        </li>`;
        list.insertAdjacentHTML('afterbegin', insertedData);
        formAdd.querySelector('input[type=text]').value = "";
}
    
    /* once user click on UL or UL children
    Funtion to predict if it move up, move down, delete, update or mark
    */
    const control = (e) => {
        //delete 
        if(e.target.classList.contains('delete')){
            const span = e.target.parentElement;
            const li = span.parentElement;
            li.classList.add('hide');
            //use time out to give css animation time
            setTimeout(() => {
                list.removeChild(li)
            }, 600);
            //mark as complete
        }else if(e.target.classList.contains('mark')){
            const actionSpan = e.target.parentElement.previousElementSibling;
            actionSpan.querySelector('input[type=text]').classList.toggle('complete');
            //move up
        }else if(e.target.classList.contains('up')){
            const span = e.target.parentElement;
            const li = span.parentElement;
            const prevLi = li.previousElementSibling;
            if(prevLi){
                li.classList.add('move-pulsate');
                list.insertBefore(li, prevLi);
                //use time out to give css animation time
                setTimeout(() => {
                    li.classList.remove('move-pulsate');
                }, 800);
            }
            //move down
        }else if(e.target.classList.contains('down')){
            const span = e.target.parentElement;
            const li = span.parentElement;
            const nextLi = li.nextElementSibling;
            if(nextLi){
                li.classList.toggle('move-pulsate');
                list.insertBefore(nextLi, li);
                //use time out to give css animation time
                setTimeout(() => {
                    li.classList.remove('move-pulsate');
                }, 800);
            }
            //edit
        }else if(e.target.classList.contains('edit')){
            //if user click on edit
            //add to input text the border line
            //allow update input text by change readOnly
            const span = e.target.parentElement;
            const li = span.parentElement;
            const inputText = li.querySelector('.name input[type=text]');
            const saveInfo = li.querySelector('.name .saveInfo');
            inputText.classList.add('input-border');
            inputText.style.cursor = "text";
            saveInfo.style.display = "block";
            inputText.readOnly = false;

            //save by press enter btn
            inputText.addEventListener('keypress', function(e){
                var key = e.which || e.keyCode;
                if (key === 13) { // 13 is enter
                    inputText.readOnly = true;
                    inputText.style.cursor = "context-menu";
                    inputText.classList.remove('input-border');
                    saveInfo.style.display = "none";
                }
            })
        }
}

// Search function
/*const search = (e) => {
       
    //convert input to lower case
    const inputVal = e.target.value.toLowerCase();
    // collect ul items and convert to array
    const items = list.getElementsByTagName('li');
    Array.from(items).forEach(function(item) {
        //go to --> li>span>input text
        const itemName = item.firstElementChild.querySelector('input').value;
        //compare input with ul items(li)
        if(itemName.toLowerCase().indexOf(inputVal) != -1){
            item.style.display  = 'flex';
            
        }else{
            item.style.display  = 'none';

        }
    })   
    
*/

    // Use javascript Event Bubbling and capturing technique

    //predict if it move up, move down, delete, update or mark
     list.addEventListener('click', control);
     //Add new item
    const formAdd = document.forms['form-add'];
    formAdd.addEventListener('submit', submitForm);
    
    //Search through items
    // const searchForm = document.forms['searchForm'].querySelector('input[type=text]');
    // //once key up
    // searchForm.addEventListener('keyup', search);