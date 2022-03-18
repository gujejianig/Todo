const addTaskInput = document.getElementById("add-task-input");
const taskList = document.getElementById("tasks-list");
const paginationBtnWrapper = document.getElementById("pagination-buttons-wrapper");
let getIndex;
let initialTaskData = [];
let onPageControler = 1;
let activePage = 1;
let numCount = 0;
let indexControl = 0;

const rowsParePage = 5
const showTask = () => {
	activePage--
	console.log(activePage)

	let start = rowsParePage * activePage
	let end = start + rowsParePage

	const lastElement = paginationBtnWrapper.lastChild;
	if (paginationManage === 0 || paginationManage === Number(lastElement.textContent) || paginationManage - 1 === Number(lastElement.textContent)) {
		onPageControler = Number(lastElement.textContent);
		paginationManage = 0;

	} else if (paginationManage !== Number(lastElement.textContent)) {
		onPageControler = paginationManage;
		paginationManage = 0;
	}


	if (initialTaskData.length >= 0) {
		taskList.innerHTML = initialTaskData.slice(start, end)
			?.map((task, index) => {
				getIndex = index;
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

const addTask = () => {
	const last = paginationBtnWrapper.lastChild;


	if (numCount > 4) {
		numCount = 0;
		indexControl = indexControl + 5;
	}
	if (indexControl > initialTaskData.length) {
		indexControl = indexControl - 5;
	}
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

	if (last) {
		onPageControler = Number(last.textContent);

	}
	activePage = Number(lastElement.textContent)
};
let paginationManage = 0;

const changePage = (pageNumber) => {

	activePage = pageNumber
	let paginationBtn = document.getElementById(`paginationBtn${pageNumber}`);
	paginationManage = paginationBtn.innerHTML;
	const globalPaginationBtn = document.querySelectorAll(".btn-default");
	paginationManage = paginationBtn.innerHTML;
	if (paginationBtn) {
		globalPaginationBtn.forEach((button) => {
			button.classList.remove("active");

		});
		onPageControler = paginationBtn.innerHTML;
		if (Number(paginationBtn.innerHTML) === pageNumber) {
			paginationBtn.classList.add("active");
		}
	}
	paginationBtn.classList.add("active");

	let start = rowsParePage * (activePage - 1)
	let end = start + rowsParePage
	console.log(start, end)
	console.log(activePage)
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
	console.log(paginationBtn)


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
		paginationBtn.setAttribute('class', 'btn btn-default');
		paginationBtn.setAttribute('id', `paginationBtn${i}`);
		paginationBtn.addEventListener('click', () => {
			changePage(i);
		});
		paginationBtnWrapper.append(paginationBtn);
	}

	showTask();
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

	renderPagesData(initialTaskData);
	changePage(onPageControler);

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