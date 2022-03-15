const addTaskInput = document.getElementById("add-task-input");
const taskList = document.getElementById("tasks-list");
const paginationBtnWrapper = document.getElementById(
    "pagination-buttons-wrapper"
);
let btnNumber = 1 // slice ელემენტის მეორე პარამეტრია.
let num = 0; // წარმოადგენს ქაუნთერს, როდესაც 5 მდე აღწევს იქმნე აბათონი.

let getIndex;

let initialTaskData = [];


const showTask = () => {
    const innerDiv = document.createElement("div");
    innerDiv.addEventListener("click", () => {
    });
    if (initialTaskData.length >= 0) {
        taskList.innerHTML =
            pagesData[pagesData.length - 1]
                ?.map((task, index) => {

                    getIndex = index;
                    return `<div id="mainDiv${task.id}" class="task" > <p id="changedValue${task.id}" class="todoInput">${task.task}  </p>
                <input onclick=onCheckBox(${task.id}) id="checkBox${task.id}" type="checkbox" /> 
                <input value="${task.task}" id="ident${task.id}" class="hideItem"/>
                <button onclick=removeBtn(${task.id}) id="remove${task.id}"  type="button" class="btn btn-danger">Remove</button>
                <button onclick=editHandler(${task.id})  type="button" id="edit${task.id}" class="btn btn-info">Edit</button></div>`;
                })
                .join("");
    }
    if (pagesData[pagesData.length - 1] === undefined) {
        taskList.innerHTML = "<div>No todo exist</div>";
    }

};

const addTask = () => {

    num++;

    if (addTaskInput.value.trim().length !== 0) {
        initialTaskData.push({task: addTaskInput.value, id: Date.now()});
        addTaskInput.value = "";
        renderPagesData(initialTaskData);
    }

    const lastElement = paginationBtnWrapper.lastChild;
    if (lastElement) {
        lastElement.classList.add("active");
    }

    onPageControler = Number(lastElement.textContent);
};

let onPageControler;

const changePage = (pageNumber) => {
    const paginationBtn = document.getElementById(`paginationBtn${pageNumber}`);
    const globalPaginationBtn = document.querySelectorAll(".btn-default");

    if (paginationBtn) {
        globalPaginationBtn.forEach((button) => {
            button.classList.remove("active");

        });
        onPageControler = paginationBtn.innerHTML;
        if (Number(paginationBtn.innerHTML) === pageNumber + 1) {
            paginationBtn.classList.add("active");
        }

    } else {
        const lastElement = paginationBtnWrapper.lastChild;

        if (lastElement) {
            let akk = lastElement.textContent;
            onPageControler = Number(akk);
            lastElement.classList.add("active");
        }


    }
    // დაბლა კოდში განხორციელდა ცვლილებები !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    console.log(pageNumber)
    if (initialTaskData.length >= 0) {

        taskList.innerHTML = initialTaskData.slice(pageNumber, pageNumber + 5)
            .map((task) => {
                return `<div id="mainDiv${task.id}" class="task" > <p id="changedValue${task.id}" class="todoInput">${task.task}  </p>
                <input onclick=onCheckBox(${task.id}) id="checkBox${task.id}" type="checkbox" /> 
                <input value="${task.task}" id="ident${task.id}" class="hideItem"/>
                <button onclick=removeBtn(${task.id}) id="remove${task.id}"  type="button" class="btn btn-danger">Remove</button>
                <button onclick=editHandler(${task.id})  type="button" id="edit${task.id}" class="btn btn-info">Edit</button></div>`;
            })
            .join("");
    }

    // მაღლა კოდში განხორციელდა ცვლილებები !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

};

addTaskInput.addEventListener("keyup", (e) => {
    if (e.keyCode === 13) {
        addTask();
        addTaskInput.value = "";
    }
});




const renderPagesData = (initialData) => {
    let singlePageData = [];
    let counter = 0;

    pagesData = [];
    initialData.forEach((task, index) => {
        counter++;
        singlePageData.push(task);
        if (counter === 5 || index === initialData.length - 1) {
            pagesData.push(singlePageData);
            counter = 0;
            singlePageData = [];
        }


    });


console.log('render page data working!!!')
// იქმნება იმდენი ბთნ რამდენი აიტემიც გვაქვს ინითიალდათასი !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! დაბლა კოდში განხორციელდა ცვლილებები.
    // აქ იქმნება ბათონები!!
    console.log(initialData.slice(0,btnNumber))
    if (num > 5) {
        console.log(initialData.slice(0,btnNumber))
        btnNumber++
        paginationBtnWrapper.innerHTML = initialData.slice(0,btnNumber)
            .map((singlePageList, index) => {
                return (
                    `<button id="paginationBtn${index}" class="btn btn-default" onclick=changePage(${index})> 
                ${index + 1} 
                </button>`
                );
            })
            .join("");
        num = 0;
    }


    showTask();

};
// იქმნება იმდენი ბთნ რამდენი აიტემიც გვაქვს ინითიალდათასი !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! მაღლა კოდში განხორციელდა ცვლილებები.



const editHandler = (identifier) => {
    const inputForEdit = document.getElementById(`ident${identifier}`);
    const editBtn = document.getElementById(`edit${identifier}`);
    const initialValue = document.getElementById(`changedValue${identifier}`);
    const removeButton = document.getElementById(`remove${identifier}`);

    if (editBtn.innerHTML === 'Edit') {
        editBtn.innerHTML = "Save";
        removeButton.innerHTML = "Cancel";
        initialValue.classList.add("hideItem");
        inputForEdit.classList.remove("hideItem");
    } else if (editBtn.innerHTML === "Save" && inputForEdit.value.length > 0) {
        editBtn.innerHTML = "Edit";
        removeButton.innerHTML = "Remove";
        inputForEdit.classList.add("hideItem");
        initialValue.classList.remove("hideItem");
        initialValue.innerHTML = inputForEdit.value;
        initialTaskData.find((data) => {
            if (data.id === identifier) {
                data.task = inputForEdit.value;
            }
        });
    }


};

// Item Removing
const removeBtn = (identifier) => {
    // btnNumber--;  I probably gonna use it <--------------------------------------------------------------------
    // num--


    const removeButton = document.getElementById(`remove${identifier}`);

    initialTaskData = initialTaskData.filter((items) => {

        if (removeButton.innerHTML === "Remove") {
            return items.id !== identifier;
        } else {
            return items;
        }

    });
    renderPagesData(initialTaskData);
    changePage(onPageControler - 1);
};

const onCheckBox = (identifier) => {
    const checkBox = document.getElementById(`checkBox${identifier}`);
    const initialValue = document.getElementById(`changedValue${identifier}`);
    if (checkBox.checked === true) {
        initialValue.classList.add('done');
    } else {
        initialValue.classList.remove('done');
    }
};
