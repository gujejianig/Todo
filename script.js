const addTaskInput = document.getElementById("add-task-input");
const taskList = document.getElementById("tasks-list");
const addTaskBtn = document.getElementById("add-task-button");
const paginationBtnWrapper = document.getElementById(
    "pagination-buttons-wrapper"
);

let initialTaskData = [];
let pagesData = [];

function showTask(indexion) {
    taskList.innerHTML =
        "<div " +

        pagesData[pagesData.length - 1]
            ///// HERE IS A PROBLEM!!!! GVCHIRDEBA DAVMAPOT SWORAD
            ?.map((task) => {
                return "<div class='task' >" + task.task + "<button onclick=removeBtn(" + task.id + ") type='button' class='btn btn-danger'>" + 'Remove' + '</button>' + "</>";
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

    // pagesData(())
};

// cvlis gverdebs

const changePage = (pageNumber) => {
    taskList.innerHTML = pagesData[pageNumber]
        .map((pageList) => {

            return "<div class='task'>" + pageList.task + "<button onclick=removeBtn(" + pageList.id +
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


    let pageCounter = 0;
    // if(pagesData.length > 5) {
    //     pageCounter = 1
    // }
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

//ვამოწმებ თუ აიტვირთ

function removeBtn(identifier) {

    initialTaskData = initialTaskData.filter((items) => {


        return items.id !== identifier

    })


    renderPagesData(initialTaskData)


}