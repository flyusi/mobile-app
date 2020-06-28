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
const btnAddContact = document.getElementById('btn-add-contact');
const addContactForm = document.getElementById('add-contact-form');

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

    if (savedTheme === 'dark') {
        document.body.classList.add('theme-dark');
        switchTheme.classList.add('switch-active');
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

    profilePage.style.display = "none";
    settingsPage.style.display = "block";
    listPage.style.display = "none";
    contactsPage.style.display = "none";

    profileForm.style.display = "none";

    changeNavbarContent('Настройки');
    changeProfileContent(user.name, user.description);
    renderContacts(contacts);

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

            changeNavbarContent(pageName);
            switchPage(path);
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

    // Сохраняем изменные данные
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