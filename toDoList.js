let tasksObj = {
    pendingArray: [],
    completedArray: []
}

const PENDING_LIST = 'pending';
const COMPLETED_LIST = 'completed';
const TODO_STORAGE_KEY = 'todoData';

const addField = document.getElementById('addField');
const addBtn = document.getElementById('addBtn');
const pendingTasks = document.getElementById('pendingTasks');
const completedTasks = document.getElementById('completedTasks');
const saveLS = document.getElementById('saveLS');
const loadLS = document.getElementById('loadLS');

saveLS.addEventListener('click', () => {
    localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(tasksObj));
});
loadLS.addEventListener('click', () => {
    const todoData = localStorage.getItem(TODO_STORAGE_KEY);
    if (todoData) {
        tasksObj = JSON.parse(todoData);
        updateList(PENDING_LIST);
        updateList(COMPLETED_LIST);
    }
})

addBtn.addEventListener('click', () => {
    const value = addField.value.trim();
    if (value) {
        tasksObj.pendingArray.push(value);
        addField.value = '';
        updateList(PENDING_LIST);
    }
})

function updateList(list) {
    list === PENDING_LIST ? pendingTasks.innerHTML = '' : completedTasks.innerHTML = '';
    tasksObj[`${list}Array`].forEach((item, index) => {
        taskTemplate(item, list, index);
    });
    updateEvents(list);
}

function taskTemplate(message, todoposition, index) {
    const task = `
        <div class="task ${todoposition === COMPLETED_LIST ? 'completed' : ''}" data-type="${todoposition}" data-index="${index}">
            <button class="ticket"></button>
            <p class="text">${message}</p>
            <input class="edit" type="edit">
            <div class="buttons__wrapper">
                <button class="tool-button edit-btn"><i class='bx bxs-edit'></i></button>
                <button class="tool-button save-btn"><i class='bx bxs-save' ></i></button>
                <button class="tool-button delete-btn"><i class='bx bxs-message-square-x' ></i></button>
            </div>
        </div>
    `;
    if (todoposition === PENDING_LIST) {
        pendingTasks.insertAdjacentHTML('beforeend', task);
    }
    if (todoposition === COMPLETED_LIST) {
        completedTasks.insertAdjacentHTML('beforeend', task);
    }
}

function updateEvents(listType) {
    const list = document.getElementById(`${listType}Tasks`);
    const tasks = list.querySelectorAll('.task');
    tasks.forEach(task => {
        const ticket = task.querySelector('.ticket');
        const text = task.querySelector('.text');
        const edit = task.querySelector('.edit');
        const saveBtn = task.querySelector('.save-btn');
        const editBtn = task.querySelector('.edit-btn');
        const deleteBtn = task.querySelector('.delete-btn');

        ticket.addEventListener('click', () => {
            const secondList = listType === PENDING_LIST ? COMPLETED_LIST : PENDING_LIST;
            const [saveTaskData] = tasksObj[`${listType}Array`].splice(+task.dataset.index, 1);
            tasksObj[`${secondList}Array`].unshift(saveTaskData);
            updateList(listType);
            updateList(secondList);
        })
        editBtn.addEventListener('click', () => {
            saveBtn.style.display = 'block';
            editBtn.style.display = 'none';
            text.style.display = 'none';
            edit.style.display = 'block';
            edit.value = tasksObj[`${listType}Array`][+task.dataset.index];
        });
        saveBtn.addEventListener('click', () => {
            editBtn.style.display = 'block';
            saveBtn.style.display = 'none';
            text.style.display = 'block';
            edit.style.display = 'none';
            text.innerText = edit.value;
            tasksObj[`${listType}Array`][+task.dataset.index] = edit.value;
        });
        deleteBtn.addEventListener('click', () => {
            tasksObj[`${listType}Array`].splice(+task.dataset.index, 1);
            updateList(listType);
        });

    })
}
