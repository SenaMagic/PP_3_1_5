const form_new = document.forms["formForCreatingNewUser"];
const roles_new = document.querySelector('#roles').selectedOptions;
form_new.addEventListener("submit", ev => {
    ev.preventDefault();
    let listOfRole = [];
    for (let i = 0; i < roles_new.length; i++) {
        listOfRole.push({
            id: roles_new[i].value,
            name: "ROLE_" + roles_new[i].text
        });
        console.log(listOfRole);
    }
    fetch('/api/admin/adduser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: form_new.username.value,
            password: form_new.password.value,
            name: form_new.name.value,
            lastname: form_new.lastname.value,
            email: form_new.email.value,
            roles: listOfRole
        })
    }).then(() => {
        form_new.reset();
        findAll();
        $('#nav-home-tab').click();
    });
})