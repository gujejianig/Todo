const addTaskInput = document.getElementById("add-task-input");
const taskList = document.getElementById("tasks-list");
const paginationBtnWrapper = document.getElementById("pagination-buttons-wrapper");
let initialTaskData = [];
let active_page_index = 1;
const rowsParePage = 5;

const addTask = () => {
	if (addTaskInput.value.trim().length !== 0) {
		initialTaskData.push({task: addTaskInput.value, id: Date.now()});
		addTaskInput.value = "";
		renderPagesData(initialTaskData);
	}
	// adding active class to lastElement
	const lastElement = paginationBtnWrapper.lastChild;
	if (lastElement) {
		lastElement.classList.add("active");
	}
	active_page_index = Number(lastElement.textContent);
	let start = rowsParePage * (active_page_index - 1); // first element of Slice
	let end = start + rowsParePage; // second element of Slice

	if (initialTaskData.length >= 0) {
		taskList.innerHTML = initialTaskData.slice(start, end)
			?.map((task) => {
				return `<div id="mainDiv${task.id}" class="task" > <p id="changedValue${task.id}" class="todoInput">${task.task}  </p>
               		<input onclick=onCheckBox(${task.id}) id="checkBox${task.id}" type="checkbox" /> 
                	<input value="${task.task}" id="ident${task.id}" class="hideItem"/>
                	<button onclick=removeBtn(${task.id}) id="remove${task.id}"  type="button" class="btn btn-danger">Remove</button>
                	<button onclick=editHandler(${task.id})  type="button" id="edit${task.id}" class="btn btn-info">Edit</button>
                </div>`;
			})
			.join("");
	}
};
const changePage = (pageNumber) => {
	const lastElement = paginationBtnWrapper.lastChild;
	let activeButton = paginationBtnWrapper.children.item(pageNumber - 1);
	active_page_index = pageNumber;
	let allPaginationButton = document.querySelectorAll(".paginationButton");
	if (allPaginationButton) {
		allPaginationButton.forEach((button) => {
			button.classList.remove("active");
		});
	}

	if (activeButton) {
		activeButton.classList.add('active');
	}

	if (lastElement && pageNumber - 1 === Number(lastElement.textContent) && initialTaskData.length % 5 === 0) { // If the active button is the last button and the last item is deleted
		active_page_index--;
		lastElement.classList.add('active');
	}

	let start = rowsParePage * (active_page_index - 1); // first element of slice
	let end = start + rowsParePage; // second element of slice
	if (initialTaskData.length >= 0) {
		taskList.innerHTML = initialTaskData.slice(start, end)
			.map((task) => {
				return `<div id="mainDiv${task.id}" class="task" > <p id="changedValue${task.id}" class="todoInput">${task.task}  </p>
                	<input onclick=onCheckBox(${task.id}) id="checkBox${task.id}" type="checkbox" /> 
                	<input value="${task.task}" id="ident${task.id}" class="hideItem"/>
                	<button onclick=removeBtn(${task.id}) id="remove${task.id}"  type="button" class="btn btn-danger">Remove</button>
                	<button onclick=editHandler(${task.id})  type="button" id="edit${task.id}" class="btn btn-info">Edit</button>
                </div>`;
			})
			.join("");
	}
};

addTaskInput.addEventListener("keyup", (e) => {
	if (e.keyCode === 13) {
		addTask();
		addTaskInput.value = "";
	}
});

const renderPagesData = () => {
	paginationBtnWrapper.innerHTML = '';
	for (let i = 1; i <= Math.ceil(initialTaskData.length / rowsParePage); i++) {
		const paginationBtn = document.createElement('button');
		paginationBtn.innerHTML = i;
		paginationBtn.setAttribute('class', 'btn btn-default paginationButton');
		paginationBtn.setAttribute('id', `paginationBtn${i}`);
		paginationBtn.addEventListener('click', () => {
			changePage(i);
		});
		paginationBtnWrapper.append(paginationBtn);
	}
};

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
	const removeButton = document.getElementById(`remove${identifier}`);
	initialTaskData = initialTaskData.filter((item) => {
		if (removeButton.innerHTML === "Remove") {
			return item.id !== identifier;
		} else {
			return item;
		}
	});
	renderPagesData();
	changePage(active_page_index);
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

