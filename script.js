const addTaskInput = document.getElementById("add-task-input");
const taskList = document.getElementById("tasks-list");
const paginationBtnWrapper = document.getElementById(
	"pagination-buttons-wrapper"
);


let getIndex;
let initialTaskData = [];

let onPageControler = 1;
const items = [0, 5, 10, 15, 20, 25, 30, 35, 40,];
const showItems = [0, 5, 10, 15, 20, 25, 30, 35, 40,];
let numCount = 0;
let indexControl = 0;
const showTask = () => {
	console.log('showTask');



	const lastElement = paginationBtnWrapper.lastChild;


	if (lola === 0 || lola === Number(lastElement.textContent) || lola - 1 === Number(lastElement.textContent)) {
		// onPageControler = Number(lola);
		// console.log('lola:', lola);
		onPageControler = Number(lastElement.textContent);
		lola = 0;

	} else if (lola !== Number(lastElement.textContent)) {
		onPageControler = lola;
		console.log('working els eif');
		lola = 0;
	}

	// onPageControler = Number(lastElement.textContent);
	console.log('lola:', lola);
	console.log('lastElement:', lastElement.textContent);

	console.log('onpageControler', onPageControler);

	if (initialTaskData.length >= 0) {
		taskList.innerHTML =
			initialTaskData.slice(showItems[onPageControler - 1], showItems[onPageControler])
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

};


const addTask = () => {
	const last = paginationBtnWrapper.lastChild;

	items.push(items[items.length - 1] + 5);

	if (numCount > 4) { //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1
		numCount = 0;
		indexControl = indexControl + 5; // როდის უნდა გაიზარდოს?!?!?!?!
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
};
let lola = 0;

const changePage = (pageNumber) => {
	console.log('changePage');
	let paginationBtn = document.getElementById(`paginationBtn${pageNumber}`);
	lola = paginationBtn.innerHTML;
	// console.log(paginationBtn);
	console.log('lola', lola);
	const globalPaginationBtn = document.querySelectorAll(".btn-default");
	lola = paginationBtn.innerHTML;
	if (paginationBtn) {
		globalPaginationBtn.forEach((button) => {
			button.classList.remove("active");


		});
		onPageControler = paginationBtn.innerHTML;
		if (Number(paginationBtn.innerHTML) === pageNumber) {
			paginationBtn.classList.add("active");
			console.log('this works');
		}
	}
	paginationBtn.classList.add("active");

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! შესაძლო ბაგებისთვის
	// else {
	// 	const lastElement = paginationBtnWrapper.lastChild;
	// 	console.log(lastElement);
	// 	if (lastElement) {
	// 		let akk = lastElement.textContent;
	// 		onPageControler = Number(akk);
	// 		lastElement.classList.add("active");
	// 	}
	// }


	if (initialTaskData.length >= 0) {
		taskList.innerHTML = initialTaskData.slice(items[onPageControler - 1], items[onPageControler - 1] + 5)
			.map((task) => {
				return `<div id="mainDiv${task.id}" class="task" > <p id="changedValue${task.id}" class="todoInput">${task.task}  </p>
                <input onclick=onCheckBox(${task.id}) id="checkBox${task.id}" type="checkbox" /> 
                <input value="${task.task}" id="ident${task.id}" class="hideItem"/>
                <button onclick=removeBtn(${task.id}) id="remove${task.id}"  type="button" class="btn btn-danger">Remove</button>
                <button onclick=editHandler(${task.id})  type="button" id="edit${task.id}" class="btn btn-info">Edit</button></div>`;
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

const renderPagesData = (initialData) => {

	console.log('renderPaage');


	paginationBtnWrapper.innerHTML = '';

	for (let i = 1; i <= Math.ceil(initialTaskData.length / 5); i++) {
		console.log('--------i', i);
		console.log('fffffffffffffffffffffffffffffffffff');
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
	console.log(onPageControler);


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