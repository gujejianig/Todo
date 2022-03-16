const addTaskInput = document.getElementById("add-task-input");
const taskList = document.getElementById("tasks-list");
const paginationBtnWrapper = document.getElementById(
	"pagination-buttons-wrapper"
);

let getIndex;
let initialTaskData = [];

let numCount = 0;
let indexControl = 0;
const showTask = () => {
	numCount = numCount + 1;
	const lastElement = paginationBtnWrapper.lastChild;
	// lastElement.classList.add('active')




	if (initialTaskData.length >= 0) {
		taskList.innerHTML =
			initialTaskData.slice(indexControl, initialTaskData.length)
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
	if (numCount > 4) { //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1
		numCount = 0;
		indexControl = indexControl + 5; // როდის უნდა გაიზარდოს?!?!?!?!
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


};

let onPageControler;

const changePage = (pageNumber) => {
	console.log('changePage works!!')
	console.log(pageNumber)
	const paginationBtn = document.getElementById(`paginationBtn${pageNumber}`);
	const globalPaginationBtn = document.querySelectorAll(".btn-default");

	console.log(paginationBtn)
	console.log(pageNumber)

	if (paginationBtn) {
		globalPaginationBtn.forEach((button) => {
			button.classList.remove("active");

		});
		onPageControler = paginationBtn.innerHTML;

		if (Number(paginationBtn.innerHTML) === pageNumber) {
			paginationBtn.classList.add("active");
			console.log('eeeeeeeeee')
		}

	}
	else {
		const lastElement = paginationBtnWrapper.lastChild;
		console.log(lastElement)
		if (lastElement) {
			let akk = lastElement.textContent;
			onPageControler = Number(akk);
			lastElement.classList.add("active");
		}
	}

	let cont;
	if(pageNumber === 1) {
		cont = 0
	}if(pageNumber === 2) {
		cont = 5
	}if(pageNumber === 3) {
		cont = 10
	}if(pageNumber === 4) {
		cont = 15
	}if(pageNumber === 5) {
		cont = 20
	}if(pageNumber === 6) {
		cont = 25
	}if(pageNumber === 7) {
		cont = 30
	}
	if (initialTaskData.length >= 0) {
		taskList.innerHTML = initialTaskData.slice(cont, cont+5)
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


	console.log('------initialData.length)', initialData.length);
	console.log('------Math.ceil(initialData.length / 5)', Math.ceil(initialData.length / 5));

	paginationBtnWrapper.innerHTML = '';

	for (let i = 1; i <= Math.ceil(initialData.length / 5); i++) {
		console.log('--------i', i);
		const paginationBtn = document.createElement('button');
		paginationBtn.innerText = i;
		paginationBtn.setAttribute('class', 'btn btn-default')
		paginationBtn.setAttribute('id', `paginationBtn${i}`)
		paginationBtn.addEventListener('click', () => {
			changePage(i)

		});

		paginationBtnWrapper.append(paginationBtn)
	}
	// paginationBtnWrapper.innerHTML = initialData
	// 	.map((singlePageList, index) => {
	// 		return (
	// 			`<button id="paginationBtn${index}" class="btn btn-default" onclick=changePage(${index})>
  //       	${index + 1}
  //       </button>`
	// 		);
	// 	})
	// 	.join("");

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

	initialTaskData = initialTaskData.filter((items) => {

		if (removeButton.innerHTML === "Remove") {
			return items.id !== identifier;
		} else {
			return items;
		}

	});

	changePage(onPageControler);
	renderPagesData(initialTaskData);

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