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

// SETTINGS
const btnClearStore = document.getElementById('btn-clear-store');
const switchTheme = document.getElementById('switch-theme');

// INITIAL OBJECTS
const user = {
    name: "Билл Гейтс",
    description: "Some quick example text to build on the card title and make up the bulk of the card's content."
}

let contacts = [
    { name: "Стив Джобс", mobile: "8979873498732" },
    { name: "Стив Возняк", mobile: "3675423475" },
    { name: "Балмер", mobile: "765467253467" }
];

let tasks = [
    { body: "Обязательно что-нибудь сделать. Хорошее"},
    { body: "Написать список задач" }
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

function createTaskItem(task) {
    return `
    <ul class="list-group">
        <li class="list-group-item d-flex justify-content-between">
            <div class="col-10">
                ${task.body}
            </div>
            <div class="col-1">
            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
            </svg>
            </div>
            <div class="col-1">
                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-check2-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M15.354 2.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L8 9.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                    <path fill-rule="evenodd" d="M1.5 13A1.5 1.5 0 0 0 3 14.5h10a1.5 1.5 0 0 0 1.5-1.5V8a.5.5 0 0 0-1 0v5a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V3a.5.5 0 0 1 .5-.5h8a.5.5 0 0 0 0-1H3A1.5 1.5 0 0 0 1.5 3v10z"/>
                </svg>
            </div>
        </li>
    </ul>
    `
}

function renderTasks(tasks) {
    taskList.innerHTML = '';

    for(let i = 0; i < tasks.length; i++) {
        const currentTask = tasks[i];
        taskList.innerHTML += createTaskItem(currentTask);
    }
}

function changeNavbarContent(value) {
    navbaContent.innerText = value;
}

function changeProfileContent(name, description) {
    profileName.innerText = name;
    profileDescription.innerText = description;
}

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

    profilePage.style.display = "none";
    settingsPage.style.display = "none";
    listPage.style.display = "block";
    contactsPage.style.display = "none";

    profileForm.style.display = "none";

    changeNavbarContent('Список дел');
    changeProfileContent(user.name, user.description);
    renderContacts(contacts);
    renderTasks(tasks);

    profileForm['name'].value = user.name;
    profileForm['description'].value = user.description;
}

initialApp();

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
        localStorage.setItem('contacts', JSON.stringify(contacts));
        renderContacts(contacts);

        addContactForm['name'].value = '';
        addContactForm['mobile'].value = '';
    }

})

addTaskForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const body = addTaskForm['body'].value;

    if (body.length) {
        tasks.unshift({ body });
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks(tasks);

        addTaskForm['body'].value = '';
    }
})

btnClearStore.addEventListener('click', function() {
    if (localStorage.length > 0) {
        const userAnswer = confirm('Вы уверены что хотите очистить localstorage?');
    
        if (userAnswer) {
            localStorage.clear();
        }
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

menuBtnsBindEvent();