const addTaskInput = document.getElementById("add-task-input");
const taskList = document.getElementById("tasks-list");
const paginationBtnWrapper = document.getElementById(
    "pagination-buttons-wrapper"
);

let  getIndex;




let initialTaskData = [];

let pagesData = [];

function showTask() {
    console.log(initialTaskData)
    const innerDiv = document.createElement('div');
    innerDiv.addEventListener('click', () =>  {});

    taskList.innerHTML =
        "<div " +
        pagesData[pagesData.length - 1]
            ?.map((task, index) => {
                getIndex = index
                return "<div id=" + 'mainDiv' + task.id + " class='task' >" + '<p  id=' + 'changedValue' + task.id + ' class="todoInput"> ' + task.task + ' </p>' +
                    "<input onclick=onCheckBox(" + task.id + ") id=" + 'checkBox' + task.id + " type='checkbox' />" +
                    '<input value=' + task.task + ' id=' + 'ident' + task.id + ' class="hideItem" ' + '/>' +
                    "<button onclick=removeBtn(" + task.id + ") type='button' class='btn btn-danger'>" + 'Remove' + '</button>'
                    + "<button onclick=editHandler(" + task.id +  ")  type='button' id=" + 'edit' + task.id + " class='btn btn-info'>" + 'Edit' + "</button>" + "</div>"
            })
            .join("") +
        "</div>";
}

const addTask = () => {

    if (addTaskInput.value.trim().length !== 0) {
        initialTaskData.push({task: addTaskInput.value, id: Date.now()});
        addTaskInput.value = "";


        renderPagesData(initialTaskData)
    }
};


const changePage = (pageNumber) => {
    taskList.innerHTML = pagesData[pageNumber]
        .map((task, index) => {
            return "<div id=" + 'mainDiv' + task.id + " class='task' >" + '<p id=' + 'changedValue' + task.id + ' class="todoInput"> ' + task.task + ' </p>' +
                "<input onclick=onCheckBox(" + task.id + ") id=" + 'checkBox' + task.id + " type='checkbox' />" +
                '<input value=' + task.task + ' id=' + 'ident' + task.id + ' class="hideItem" ' + '/>' +    // მჭირდება ეს ველიუ
                "<button onclick=removeBtn(" + task.id + ") type='button' class='btn btn-danger'>" + 'Remove' + '</button>'
                + "<button onclick=editHandler(" + task.id + ")  type='button' id=" + 'edit' + task.id + " class='btn btn-info'>" + 'Edit' + '</button>' + "</div>"
        })
        .join("");
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


    showTask()


    paginationBtnWrapper.innerHTML = pagesData
        .map((singlePageList, index) => {
            return (
                "<button class='btn btn-default' onclick=changePage(" +
                index +
                ")>" +
                (index + 1) +
                "</button>"
            );
        })
        .join("");

}

// Item Editing

const editHandler = (identifier, index) => {
    console.log('identifier', identifier);
    console.log('index', index);
    const inputForEdit = document.getElementById('ident' + identifier)
    const editBtn = document.getElementById('edit' + identifier)
    const initialValue = document.getElementById('changedValue' + identifier)
    const mainDivElement = document.getElementById('mainDiv'+identifier)
    if (editBtn.innerHTML === 'Edit') {
        editBtn.innerHTML = 'Save'
        initialValue.classList.add('hideItem')
        inputForEdit.classList.remove('hideItem')
        console.log(mainDivElement.querySelectorAll("button"))

    } else if (editBtn.innerHTML === 'Save') {
        editBtn.innerHTML = 'Edit'
        inputForEdit.classList.add('hideItem')
        initialValue.classList.remove('hideItem')
        initialValue.innerHTML = inputForEdit.value

        initialTaskData.find((task, index) => initialTaskData[2].task = inputForEdit.value) // ცვლის ინფორმაციას ინფუთში და ობიექტში
        initialTaskData.find((task, index) => console.log(index)) // konsoli

        console.log(initialTaskData[1])
        console.log(initialTaskData)
        console.log(index)
    }

}

// Item Removing
function removeBtn(identifier) {
    initialTaskData = initialTaskData.filter((items) => {

        return items.id !== identifier

    })
    renderPagesData(initialTaskData)

}

function onCheckBox(identifier) {
    const checkBox = document.getElementById('checkBox' + identifier)
    const initialValue = document.getElementById('changedValue' + identifier)
    if (checkBox.checked === true) {
        initialValue.classList.add('done')
    } else {
        initialValue.classList.remove('done')

    }

}