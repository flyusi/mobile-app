const navbaContent = document.getElementById('navbar-content');
const menuBtns = document.getElementsByClassName('btn-bottom');

// PAGES
const profilePage = document.getElementById('profile-page');
const listPage = document.getElementById('list-page');
const contactsPage = document.getElementById('contacts-page');
const settingsPage = document.getElementById('settings-page');

// PROFILE
const profileCard = document.getElementById('card-profile');
const profileForm = document.getElementById('profile-form');
const btnRedactProfile = document.getElementById('btn-redact-profile');
const btnSaveProfile = document.getElementById('btn-save-profile');
const profileName = document.getElementById('profile-name');
const profileDescription = document.getElementById('profile-description');

// CONTACTS
const contactsList = document.getElementById('contacts-list');
const searchContactsForm = document.getElementById('contacts-search-form');
// const btnAddContact = document.getElementById('btn-add-contact');
const addContactForm = document.getElementById('add-contact-form');

//TASK LIST
const taskList = document.getElementById('task-list');
const addTaskForm = document.getElementById('add-task-form');
const allTasks = document.querySelector('#tast-list');

// SETTINGS
const btnClearStore = document.getElementById('btn-clear-store');
const btnClearTasks = document.getElementById('btn-clear-tasks');
const btnClearContacts = document.getElementById('btn-clear-contacts')
const switchTheme = document.getElementById('switch-theme');

// INITIAL OBJECTS
const user = {
    name: "Билл Гейтс",
    description: "Some quick example text to build on the card title and make up the bulk of the card's content."
}

let contacts = [
    {name: "Стив Джобс", mobile: "8979873498732"},
    {name: "Стив Возняк", mobile: "3675423475"},
    {name: "Балмер", mobile: "765467253467"}
];

let tasks = [
    {body: "Обязательно что-нибудь сделать. Хорошее", completed: false, taskId: "1"},
    {body: "Написать список задач", completed: true, taskId: "2"}
];

function createContactItem(contact) {
    return `
        <li class="list-group-item">
            ${contact.name}
            <div>
                <small>${contact.mobile}</small>
            </div>
        </li>
    `
}

function renderContacts(contacts) {
    contactsList.innerHTML = '';

    for(let i = 0; i < contacts.length; i++) {
        const currentContact = contacts[i];
        contactsList.innerHTML += createContactItem(currentContact);
    }
}

function getTaskId() {
    return Math.random().toString(36).substr(2, 16);
}

function createTaskItem(task) {
    // console.log(task);
    let c = "";
    let taskItem = `
        <li class="list-group-item d-flex justify-content-between" id="${task.taskId}">
            <div class="col-9 one-task ${c}">
                ${task.body}
            </div> 
            <button class="btn edit" action="edit" id="${task.taskId}">
                <svg width="1.3em" height="1.3em" viewBox="0 0 16 16" class="bi bi-pencil-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                </svg>
            </button>
            <button class="btn delete" action="delete" id="${task.taskId}">
                <svg width="1.3em" height="1.3em" viewBox="0 0 16 16" class="bi bi-x-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                    <path fill-rule="evenodd" d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"/>
                    <path fill-rule="evenodd" d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"/>
                </svg>
            </button>
        </li>
    `
    return taskItem;
}

function renderTasks(tasks) {
    taskList.innerHTML = '';

    for(let i = 0; i < tasks.length; i++) {
        const currentTask = tasks[i];
        taskList.innerHTML += createTaskItem(currentTask);
    }
}

// deleting (and todo: editing) tasks
taskList.addEventListener('click', (event) => {
    const element = event.target; // to know where user clicked on
    const elementAction = element.parentNode.attributes.action;  // to know if elem has an action
    const elementId = element.parentNode.attributes.id;  // ...if elem has an id
    const tasks = getFromLocalStorage('tasks');

    if(element.classList[1] === 'one-task' ) {
        console.log('it is a task!');
        element.parentNode.querySelector(".one-task").classList.toggle('checked');

        // saving changes to local storage
        tasks.forEach((task) => {
            if(task.taskId === elementId.value) {
                task.completed = task.completed ? false : true; 
            }
        });
    }
    
    if(elementAction) {
        console.log(element.parentNode.attributes.id);
        
        if(elementAction.value === "delete") {
            element.parentNode.parentNode.parentNode.removeChild(element.parentNode.parentNode);

            // need to delete from local storage
            tasks.forEach((task,index) => {
                if(task.taskId === elementId.value) {
                    tasks.splice(index, 1);
                }
            });
        } else if(elementAction.value === 'edit'){
            console.log('lets edit...');
        }
        
         
    }
    saveToLocalStorage('tasks', tasks);
})

function changeNavbarContent(value) {
    navbaContent.innerText = value;
}

function changeProfileContent(name, description) {
    profileName.innerText = name;
    profileDescription.innerText = description;
}

function getFromLocalStorage(key) {
    let list;
    if(localStorage.getItem(key) === null) {
        list = [];
    }else{
        list = JSON.parse(localStorage.getItem(key));
    }
    return list;
}

function saveToLocalStorage(itemWhere, itemWhat) {
    localStorage.setItem(itemWhere, JSON.stringify(itemWhat));
}

// changing pages display
function menuBtnsBindEvent() {
    for (let i = 0; i < menuBtns.length; i++) {
        const btn = menuBtns[i];

        btn.addEventListener('click', function() {
            const pageName = btn.getAttribute('data-pagename');
            const path = btn.getAttribute('data-path');

            changeNavbarContent(pageName);  // changing page name in navbar
            switchPage(path);  // changing page content
        })
    }
}

function switchPage(activePage) {
    switch(activePage) {
        case "profile":
            profilePage.style.display = "block";
            settingsPage.style.display = "none";
            listPage.style.display = "none";
            contactsPage.style.display = "none";
            break;

        case "list":
            profilePage.style.display = "none";
            listPage.style.display = "block";
            contactsPage.style.display = "none";
            settingsPage.style.display = "none";
            break;

        case "contacts":
            profilePage.style.display = "none";
            listPage.style.display = "none";
            contactsPage.style.display = "block";
            settingsPage.style.display = "none";
            break;

        case "settings":
            profilePage.style.display = "none";
            listPage.style.display = "none";
            contactsPage.style.display = "none";
            settingsPage.style.display = "block";
            break;
    }
}

// changing card profile data
function switchProfileForm(showProfileForm) {
    if (showProfileForm) {
        profileForm.style.display = 'block';
        profileCard.style.display = "none";
        showProfileForm = false;
        return;
    }

    profileForm.style.display = 'none';
    profileCard.style.display = "block";
    showProfileForm = true;
    return;
}

btnRedactProfile.addEventListener('click', function() {
    switchProfileForm(true);
})

profileForm.addEventListener('submit', function(event) {
    event.preventDefault();

    // Сохраняем измененные данные
    // F12 -> Application -> storage
    localStorage.setItem('name', profileForm['name'].value);
    localStorage.setItem('description', profileForm['description'].value);

    changeProfileContent(
        profileForm['name'].value, 
        profileForm['description'].value
    )
    switchProfileForm(false);
})

searchContactsForm['search-query-contacts'].addEventListener('input', function() {
    const query = searchContactsForm['search-query-contacts'].value;
    const filtredContacts = contacts.filter(function(contact) {
        return contact.name.includes(query);
    })

    renderContacts(filtredContacts);
})

addContactForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const name = addContactForm['name'].value;
    const mobile = addContactForm['mobile'].value;

    if (name.length && mobile.length) {
        // const contact = { name: name, mobile: mobile };
        contacts.unshift({ name, mobile });
        saveToLocalStorage('contacts', contacts);
        renderContacts(contacts);

        addContactForm['name'].value = '';
        addContactForm['mobile'].value = '';
    }

})

//add new task to list
addTaskForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const body = addTaskForm['body'].value;
    const completed = false;
    const taskId = getTaskId();

    if (body.length) {
        addedTask = {body: body, completed: completed, taskId: taskId}
        tasks.unshift({ body, completed, taskId });
        console.log(addedTask);
        saveToLocalStorage('tasks', tasks);
        renderTasks(tasks);

        addTaskForm['body'].value = '';
    }
})

btnClearStore.addEventListener('click', function() {
    if (localStorage.length > 0) {
        const userAnswer = confirm('Вы уверены что хотите очистить localstorage? 👀');
    
        if (userAnswer) {
            localStorage.clear();
        }
    }
})

btnClearTasks.addEventListener('click', function() {
    if (localStorage.getItem('tasks')) {
        const userAnswer = confirm('Начнем список дел заново? 🤔');

        if(userAnswer) {
            localStorage.removeItem('tasks');
        }
        taskList.innerHTML = '';
    }
})

btnClearContacts.addEventListener('click', function() {
    if (localStorage.getItem('contacts')) {
        const userAnswer = confirm('Убираем ВСЕ контакты из списка? 😱');

        if(userAnswer) {
            localStorage.removeItem('contacts');
        }
        contactsList.innerHTML = '';
    }
})

switchTheme.addEventListener('click', function() {
    const checked = switchTheme.getAttribute('data-checked');
    switchTheme.classList.toggle('switch-active');
    document.body.classList.toggle('theme-dark');

    if (checked === '0') {
        switchTheme.setAttribute('data-checked', '1');
        localStorage.setItem('theme', 'dark');
    } else {
        switchTheme.setAttribute('data-checked', '0');
        localStorage.setItem('theme', 'light');
    }
})

function initialApp() {
    const savedName = localStorage.getItem('name');
    const savedDescription = localStorage.getItem('description');
    const savedContacts = localStorage.getItem('contacts');
    const savedTheme = localStorage.getItem('theme');
    const savedTasks = localStorage.getItem('tasks');

    if (savedTheme === 'dark') {
        document.body.classList.add('theme-dark');  //for css changing
        switchTheme.classList.add('switch-active');  //for switcher position
        switchTheme.setAttribute('data-checked', "1");  
    }

    // Проверка на сохранённые имя и описание
    if (savedName) {
        user.name = savedName;
    }

    if (savedDescription) {
        user.description = savedDescription;
    }

    // Проверка сохраннённых контактов
    if (savedContacts) {
        contacts = JSON.parse(savedContacts);
    }

    if(savedTasks) {
        tasks = JSON.parse(savedTasks);
    }
    
    changeNavbarContent('Список дел');
    switchPage('list');
    switchProfileForm(false);

    changeProfileContent(user.name, user.description);
    renderContacts(contacts);
    renderTasks(tasks);

    profileForm['name'].value = user.name;
    profileForm['description'].value = user.description;
}

initialApp();
menuBtnsBindEvent();