const userList = document.getElementById("inputPointUserList");
const url = "http://localhost:8080/api/users"
let htmlUserList = ``;

let editId = document.getElementById("editIdModal");
let editName = document.getElementById("editNameModal");
let editSurname = document.getElementById("editSurnameModal");
let editAge = document.getElementById("editAgeModal");
let editUsername = document.getElementById("editUsernameModal");
let editPassword = document.getElementById("editPasswordModal");
let editRole = document.getElementById("editRolesModal");

let deleteId = document.getElementById("deleteIdModal");
let deleteName = document.getElementById("deleteNameModal");
let deleteSurname = document.getElementById("deleteSurnameModal");
let deleteAge = document.getElementById("deleteAgeModal");
let deleteUsername = document.getElementById("deleteUsernameModal");
let deletePassword = document.getElementById("deletePasswordModal");
let deleteRole = document.getElementById("deleteRolesModal");

// Get user Fetch

async function getUser(id) {
    let response = await fetch(url + '/' + id)
    return response.json();
}
tableUsersFetch(); // <---------- Launch of UserTable

// -----------------------Get fetch part---------------------------------


     async function tableUsersFetch() {
         await fetch(url)
             .then(response => response.json())
             .then(data => {
                 data.forEach(user => {
                     htmlUserList += `<tr> 
                            <td>${user.id}</td>
                            <td>${user.name}</td>
                            <td>${user.surname}</td>
                            <td>${user.age}</td>
                            <td>${user.username}</td>
                            <td>${user.roles.map(e => e.name.substring(5))} </td>
                            <td>
                                <button  type="button" class="btn btn-primary" id = "edit-user" data-id = ${user.id}>Edit</button>
                            </td>
                            <td>
                                <button  type="button" class="btn btn-danger" id = "delete-user" data-id = ${user.id}  >Delete</button>
                            </td>
                            </tr>`;
                 });
                 // userList.insertAdjacentHTML("beforeend", htmlUserList);
                 userList.innerHTML  = htmlUserList

             })
     }




// -----------------------------------------Post fetch part-----------------------------------

    const butt = document.getElementById("AddUserButton")
    butt.onclick = async function addUserFetch () {

        let firstNameAdd = document.getElementById("addFirstNameField").value;
        let lastnameAdd = document.getElementById("addLastNameField").value;
        let ageAdd = document.getElementById("addAgeField").value;
        let usernameAdd = document.getElementById("addUsernameField").value;
        let passwordAdd = document.getElementById("addPasswordField").value;
        let rolesAdd = document.getElementById("addRolesField").value;
        let roleIdAdd;

        switch (rolesAdd) {
            case "ROLE_USER":
                roleIdAdd = 1;
                break;
            case "ROLE_ADMIN":
                roleIdAdd = 2;
                break;
        }
       await fetch(url, {
            method: "post",
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                "name": firstNameAdd,
                "surname": lastnameAdd,
                "age": ageAdd,
                "username": usernameAdd,
                "password": passwordAdd,
                "roles": [{"id": roleIdAdd, "name": rolesAdd}]

            })
        })


        htmlUserList = "";
        userList.innerHTML = "";
        tableUsersFetch();
        window.location.replace("http://localhost:8080/admin");

}


// ----------------------------Edit fetch part---------------------------

userList.addEventListener('click',(e) => {
    e.preventDefault();
    let editButtonIsPressed = e.target.id == 'edit-user';
    let deleteButtonIsPressed = (e.target.id == 'delete-user');
    let id = parseInt(e.target.dataset.id)
    let user = getUser(id)

    user.then(data => {
        editId.value = data.id;
        editName.value = data.name;
        editSurname.value = data.surname;
        editAge.value = data.age;
        editUsername.value = data.username;
        editPassword.value = null;
        editRole.value = data.roles[0].name;
    })

    if (editButtonIsPressed) {
        $('#editModalFetch').modal('show');
        document.getElementById('editSubmitModal').addEventListener('click', () =>{

            let editRoleId = null;

            switch (editRole.value) {
                case "ROLE_USER":
                    editRoleId = 1;
                    break;
                case "ROLE_ADMIN":
                    editRoleId = 2;
                    break;
            }
           async function fetchPut(){
           await fetch(url, {
                method: "PUT",
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({
                    "id": editId.value,
                    "name": editName.value,
                    "surname": editSurname.value,
                    "age": editAge.value,
                    "username": editUsername.value,
                    "password": editPassword.value,
                    "roles": [{"id": editRoleId, "name": editRole.value}]
                })
            })
               htmlUserList = ""
               userList.innerHTML = ""
               tableUsersFetch()
            }
            fetchPut();
            $('#editModalFetch').modal('hide');

        });
        }


// ------------------DeleteFetchPart-------------------------------
    if (deleteButtonIsPressed) {


        user.then(data => {
            deleteId.value = data.id;
            deleteName.value = data.name;
            deleteSurname.value = data.surname;
            deleteAge.value = data.age;
            deleteUsername.value = data.username;
            deletePassword.value = null;
            deleteRole.value = data.roles[0].name;
        })


        $('#deleteModalFetch').modal('show');
        document.getElementById('deleteSubmitModal').addEventListener('click', () => {

            fetch(`${url}/${id}`, {method:"delete"} )
            .then(res => res.json())
            window.location.replace("http://localhost:8080/admin");
        })
    }


})
