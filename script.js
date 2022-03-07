const addTaskInput = document.getElementById("add-task-input");
const taskList = document.getElementById("tasks-list");
const addTaskBtn = document.getElementById("add-task-button");
const todoInput = document.querySelector('.todoInput')
const paginationBtnWrapper = document.getElementById(
    "pagination-buttons-wrapper"
);

let initialTaskData = [];
let pagesData = [];

function showTask() {
    taskList.innerHTML =
        "<div " +

        pagesData[pagesData.length - 1]
            ?.map((task) => {
                return "<div class='task' >" + '<input readonly  class="todoInput" value=' + task.task + ' />' + "<button onclick=removeBtn(" + task.id + ") type='button' class='btn btn-danger'>" + 'Remove' + '</button>' + "</>";
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
        .map((pageList) => {

            return "<div class='task'>" + '<input value=' + pageList.task + ' class="todoInput"/>' + "<button onclick=removeBtn(" + pageList.id +
                ") type='button' class='btn btn-danger'>" + 'Remove' + '</button>' + "</div>";
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
                "<button class='btn btn-default' onclick=changePage(" + ////////////////////////////////////////
                index +
                ")>" +
                (index + 1) +
                "</button>"
            );
        })
        .join("");

}

// Edit function should start here!

function removeBtn(identifier) {

    initialTaskData = initialTaskData.filter((items) => {


        return items.id !== identifier

    })


    renderPagesData(initialTaskData)


}