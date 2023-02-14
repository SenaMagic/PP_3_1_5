const form_ed = document.getElementById("formForEditing");
const username_ed = document.getElementById('usernameE');
const password_ed = document.getElementById('passwordE');
const name_ed = document.getElementById('nameE');
const lastname_ed = document.getElementById('lastnameE');
const email_ed = document.getElementById('emailE');
const roles_ed = document.getElementById('selectRolesE');
const roleAdmin_ed = document.getElementById('roleAdminE');
const roleUser_ed = document.getElementById('roleUserE');
let id_ed = 0;

async function editModalData(id) {
    let usersPageEd = await fetch('/api/admin/' + id);
    await usersPageEd.json().then(user => {
        id_ed = user.id;
        username_ed.value = user.username;
        password_ed.value = user.password;
        name_ed.value = user.name;
        lastname_ed.value = user.lastname;
        email_ed.value = user.email;

        if (user.roles.length === 2) {
            roleAdmin_ed.selected = true;
            roleUser_ed.selected = true;
        } else if (user.roles.length === 1 && (user.roles[0].id === 1)) {
            roleAdmin_ed.selected = false;
            roleUser_ed.selected = true;
        } else if (user.roles.length === 1 && (user.roles[0].id === 2)) {
            roleAdmin_ed.selected = true;
            roleUser_ed.selected = false;
        }
    })
}

form_ed.addEventListener('submit', async (e) => {
    e.preventDefault();
    const roles = roles_ed.selectedOptions;
    let listOfRoles = [];
    for (let i = 0; i < roles.length; i++) {
        listOfRoles.push({
            id: roles[i].value,
            name: "ROLE_" + roles[i].text
        });
    }
    await fetch('/api/admin/edit/' + id_ed, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            // id: id_ed.value,
            username: username_ed.value,
            password: password_ed.value,
            name: name_ed.value,
            lastname: lastname_ed.value,
            email: email_ed.value,
            roles: listOfRoles,
        })
    }).then(() => {
        findAll();
        $("#editCloseBtn").click();
    })
})