const addTaskInput = document.getElementById("add-task-input");
const taskList = document.getElementById("tasks-list");
const paginationBtnWrapper = document.getElementById(
    "pagination-buttons-wrapper"
);

let getIndex;


let initialTaskData = [];

let pagesData = [];

function showTask() {








    const innerDiv = document.createElement('div');
    innerDiv.addEventListener('click', () => {
    });

    taskList.innerHTML =
        "<div " +
        pagesData[pagesData.length - 1]
            ?.map((task, index) => {
                getIndex = index
                return "<div id=" + 'mainDiv' + task.id + " class='task' >" + '<p  id=' + 'changedValue' + task.id + ' class="todoInput"> ' + task.task + ' </p>' +
                    "<input onclick=onCheckBox(" + task.id + ") id=" + 'checkBox' + task.id + " type='checkbox' />" +
                    '<input value=' + task.task + ' id=' + 'ident' + task.id + ' class="hideItem" ' + '/>' +
                    "<button onclick=removeBtn(" + task.id + ")  id=" + 'remove' + task.id + " type='button' class='btn btn-danger'>" + 'Remove' + '</button>'
                    + "<button onclick=editHandler(" + task.id + ")  type='button' id=" + 'edit' + task.id + " class='btn btn-info'>" + 'Edit' + "</button>" + "</div>"
            })
            .join("") +
        "</div>";
}

const addTask = () => {

    if(taskList){
        console.log('yes')
    } else {
        console.log('no')
    }

    if (addTaskInput.value.trim().length !== 0) {
        initialTaskData.push({task: addTaskInput.value, id: Date.now()});
        addTaskInput.value = "";


        renderPagesData(initialTaskData)
    }
    const lastElement = paginationBtnWrapper.lastChild;
    if (lastElement) {
        lastElement.classList.add('active')
    }
};


const changePage = (pageNumber) => {
    const paginationBtn = document.getElementById('paginationBtn' + pageNumber)
    const globalPaginationBtn = document.querySelectorAll('.btn-default')


    globalPaginationBtn.forEach((button) => {
        button.classList.remove('active')

    })

    if (Number(paginationBtn.innerHTML) === pageNumber + 1) {
        paginationBtn.classList.add('active')
    }

    taskList.innerHTML = pagesData[pageNumber]
        .map((task) => {
            return "<div id=" + 'mainDiv' + task.id + " class='task' >" + '<p id=' + 'changedValue' + task.id + ' class="todoInput"> ' + task.task + ' </p>' +
                "<input onclick=onCheckBox(" + task.id + ") id=" + 'checkBox' + task.id + " type='checkbox' />" +
                '<input value=' + task.task + ' id=' + 'ident' + task.id + ' class="hideItem" ' + '/>' +
                "<button onclick=removeBtn(" + task.id + ") id=" + 'remove' + task.id + "  type='button' class='btn btn-danger'>" + 'Remove' + '</button>'
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


    paginationBtnWrapper.innerHTML = pagesData
        .map((singlePageList, index) => {

            return (
                "<button id=" + 'paginationBtn' + index + " class='btn btn-default ' onclick=changePage(" +
                index +
                ")>" +
                (index + 1) +
                "</button>"
            );
        })
        .join("");

    showTask()

}

// Item Editing

const editHandler = (identifier) => {
    const inputForEdit = document.getElementById('ident' + identifier)
    const editBtn = document.getElementById('edit' + identifier)
    const initialValue = document.getElementById('changedValue' + identifier)
    const removeButton = document.getElementById('remove' + identifier)

    if (editBtn.innerHTML === 'Edit') {
        editBtn.innerHTML = 'Save'
        removeButton.innerHTML = 'Cancel'
        initialValue.classList.add('hideItem')
        inputForEdit.classList.remove('hideItem')
    } else if (editBtn.innerHTML === 'Save') {
        editBtn.innerHTML = 'Edit'
        removeButton.innerHTML = 'Remove'

        inputForEdit.classList.add('hideItem')
        initialValue.classList.remove('hideItem')
        initialValue.innerHTML = inputForEdit.value
        initialTaskData.find((data) => {
            if (data.id === identifier) {
                data.task = inputForEdit.value
            }
        })
    }
}

// Item Removing
function removeBtn(identifier) {
    const removeButton = document.getElementById('remove' + identifier)

    initialTaskData = initialTaskData.filter((items) => {

        if (removeButton.innerHTML === 'Remove') {
            return items.id !== identifier
        } else {
            return items
        }
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
