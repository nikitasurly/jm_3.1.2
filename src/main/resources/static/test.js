$(document).ready(function () {
    createTable();
    getRoles();
    getCurrentUser();
});


function getRoles() {
    $.ajax({
        contentType : 'application/json',
        url: '/api/roles',
        type: 'GET',
        success: function (roles){
            let newRoles =  $('#roles_checkbox');
            newRoles.empty();
            roles.forEach(function (element) {
                newRoles.append(`<input class="form-check-input" type="checkbox" value='{"id":"${element.id}","name":"${element.name}"}' id="chBox${element.id}">${element.name.slice(5)}</input>`);
            });
        }
    });
}

function getCheckedCheckBoxes() {
    let values = [];
    $('input[type="checkbox"]:checked').each(function() {
        console.log($(this).val());
        let obj = jQuery.parseJSON($(this).val());
        values.push(obj);
    });
    return values;
}

function deleteUserModal(id) {
    $.ajax("/api/" + id, {
        dataType: "json",
        success: function (data) {
            $('#idDel').val(data.id);
            $('#firstNameDel').val(data.firstName);
            $('#lastNameDel').val(data.lastName);
            $('#ageDel').val(data.age);
            $('#emailDel').val(data.email);
            $('#deleteBtn').attr('onclick', 'deleteUser(' + data.id+ ')');

            $.ajax({
                contentType : 'application/json',
                url: '/api/roles',
                type: 'GET',
                success: function (roles){
                    let newRoles =  $('#del_role_checkbox');
                    newRoles.empty();
                    roles.forEach(function (element) {

                        newRoles.append(`<input class="form-check-input" readonly="" type="checkbox" value='{"id":"${element.id}","name":"${element.name}"}' id="delChBox${element.id}">${element.name.slice(5)}</input>`);
                        data.roles.forEach(function (el) {
                            if (element.name === el.name){
                                document.querySelector(`#delChBox${element.id}`).setAttribute('checked', '');
                            }
                        })
                    });
                }
            });
        },
    });
}

function deleteUser(id) {
    $.ajax({
        type: "DELETE",
        url: "/api/" + id,
        data: JSON.stringify(id),
        headers: {'content-type': "application/json"},
        success: function(){

            let row = document.getElementById(id);
            row.parentNode.removeChild(row);

            $('#deleteModal').modal('hide');
        },
    });
}

function editUserModal(id) {
    $.ajax("/api/" + id, {
        dataType: "json",
        success: function (data) {
            $('#idEdit').val(data.id);
            $('#firstNameEdit').val(data.firstName);
            $('#lastNameEdit').val(data.lastName);
            $('#ageEdit').val(data.age);
            $('#emailEdit').val(data.email);
            $('#editBtn').attr('onclick', 'editUser()');

            $.ajax({
                contentType : 'application/json',
                url: '/api/roles',
                type: 'GET',
                success: function (roles){
                    let newRoles =  $('#edit_role_checkbox');
                    newRoles.empty();
                    roles.forEach(function (element) {

                        newRoles.append(`<input class="form-check-input" type="checkbox" value='{"id":"${element.id}","name":"${element.name}"}' id="editChBox${element.id}">${element.name.slice(5)}</input>`);
                        data.roles.forEach(function (el) {
                            if (element.name === el.name){
                                document.querySelector(`#editChBox${element.id}`).setAttribute('checked', '');
                            }
                        })
                    });
                }
            });
        },
    });
}

function editUser() {
    let idEdit = $('#idEdit').val();
    let firstNameEdit = $('#firstNameEdit').val();
    let lastNameEdit = $('#lastNameEdit').val();
    let ageEdit = $('#ageEdit').val();
    let emailEdit = $('#emailEdit').val();
    let passwordEdit = $('#passwordEdit').val();
    let rolesEdit = getCheckedCheckBoxes();

    let body = {
        id: idEdit,
        firstName: firstNameEdit,
        lastName: lastNameEdit,
        age: ageEdit,
        email: emailEdit,
        password: passwordEdit,
        roles: rolesEdit
    };

    $.ajax({
        type: "POST",
        url: "/api/",
        data: JSON.stringify(body),
        dataType: "json",
        headers: {'content-type': "application/json"},
        success: function(data){

            let userRoles = "";
            for (let r = 0; r < data.roles.length; r++) {
                userRoles += (data.roles[r].name).slice(5) + " ";
            }
            let newTr = document.getElementById(data.id);

            newTr.innerHTML = ("" +
                "<td>" + data.id + "</td>" +
                "<td>" + data.firstName + "</td>" +
                "<td>" + data.lastName + "</td>" +
                "<td>" + data.age + "</td>" +
                "<td>" + data.email + "</td>" +
                "<td>" + userRoles + "</td>" +
                "<td><button onclick='editUserModal(" + data.id + ")' type=\"button\" class=\"btn btn-info\" data-toggle=\"modal\" data-target=\"#editModal\">Edit</button></td>" +
                "<td><button onclick='deleteUserModal(" + data.id  + ")' type=\"button\" class=\"btn btn-danger\" data-toggle=\"modal\" data-target=\"#deleteModal\">Delete</button></td>"
            );

            $('#editModal').modal('hide');
        },
    });
}

function addUser() {
    let id = $('#id').val();
    let firstName = $('#firstName').val();
    let lastName = $('#lastName').val();
    let age = $('#age').val();
    let email = $('#email').val();
    let password = $('#password').val();

    let roles = getCheckedCheckBoxes();

    let body = {
        id: id,
        firstName: firstName,
        lastName: lastName,
        age: age,
        email: email,
        password: password,
        roles: roles
    };

    $.ajax({
        type: "POST",
        url: "/api",
        data: JSON.stringify(body),
        dataType: "json",
        headers: {'content-type': "application/json"},
        success: function(data){

            let userRoles = "";
            for (let r = 0; r < data.roles.length; r++) {
                userRoles += (data.roles[r].name).slice(5) + " ";
            }
            let newTr = $("<tr>").attr("id", data.id);

            newTr.append("" +
                "<td>" + data.id + "</td>" +
                "<td>" + data.firstName + "</td>" +
                "<td>" + data.lastName + "</td>" +
                "<td>" + data.age + "</td>" +
                "<td>" + data.email + "</td>" +
                "<td>" + userRoles + "</td>" +
                "<td><button onclick='editUserModal(" + data.id + ")' type=\"button\" class=\"btn btn-info\" data-toggle=\"modal\" data-target=\"#editModal\">Edit</button></td>" +
                "<td><button onclick='deleteUserModal(" + data.id  + ")' type=\"button\" class=\"btn btn-danger\" data-toggle=\"modal\" data-target=\"#deleteModal\">Delete</button></td>"
            );
            $("#users_table").append(newTr)

            $("input:checkbox").removeAttr("checked");
            $('input').not(':input[type=checkbox], :input[type=hidden]').val('');

            showHomePage();      //TODO открыть вкладку с таблицей
        },
    });
}

function createTable() {
    $.ajax("/api/users", {
        dataType: "json",
        success: function (data) {
            for (let i = 0; i < data.length; i++) {

                let tr = $("<tr>").attr("id", data[i].id);

                let userRoles = "";
                for (let r = 0; r < data[i].roles.length; r++) {
                    userRoles += (data[i].roles[r].name).slice(5) + " ";
                }

                tr.append("" +
                    "<td>" + data[i].id + "</td>" +
                    "<td>" + data[i].firstName + "</td>" +
                    "<td>" + data[i].lastName + "</td>" +
                    "<td>" + data[i].age + "</td>" +
                    "<td>" + data[i].email + "</td>" +
                    "<td>" + userRoles + "</td>" +
                    "<td><button onclick='editUserModal(" + data[i].id + ")' type=\"button\" class=\"btn btn-info\" data-toggle=\"modal\" data-target=\"#editModal\">Edit</button></td>" +
                    "<td><button onclick='deleteUserModal(" + data[i].id  + ")' type=\"button\" class=\"btn btn-danger\" data-toggle=\"modal\" data-target=\"#deleteModal\">Delete</button></td>"
                );
                $("#users_table").append(tr)
            }
        },
    });
}

function showHomePage() {
    $('[href="#allusers"]').tab('show');
}

function getCurrentUser() {
    $.ajax("/api/currentUser", {
        dataType: "json",
        success: function (data) {
            let emailUser = document.getElementById("emailCurrentUser");
            emailUser.innerText = data.email;

            let rolesUser = document.getElementById("rolesCurrentUser");
            let userRoles = "";
            for (let r = 0; r < data.roles.length; r++) {
                userRoles += (data.roles[r].name).slice(5) + " ";
            }
            rolesUser.innerText = userRoles;

            if (userRoles.includes("ADMIN")) {
                let adminBtn = document.getElementById("v-pills-admin-tab");
                adminBtn.setAttribute("aria-selected", "true");
                adminBtn.setAttribute("class", "nav-link active");
                adminBtn.removeAttribute("hidden");

                let adminPage = document.getElementById("v-pills-admin");
                adminPage.setAttribute("class", "tab-pane fade show active");

                if (userRoles.includes("USER")) {
                    let userBtn = document.getElementById("v-pills-user-tab");
                    userBtn.setAttribute("aria-selected", "false");
                    userBtn.removeAttribute("hidden");

                }
            } else if (userRoles.includes("USER")) {
                let userBtn = document.getElementById("v-pills-user-tab");
                userBtn.setAttribute("aria-selected", "true");
                userBtn.setAttribute("class", "nav-link active");
                userBtn.removeAttribute("hidden");

                let userPage = document.getElementById("v-pills-user");
                userPage.setAttribute("class", "tab-pane fade show active")
            }

            let tr = $("<tr>").attr("id", data.id);

            tr.append("" +
                "<td>" + data.id + "</td>" +
                "<td>" + data.firstName + "</td>" +
                "<td>" + data.lastName + "</td>" +
                "<td>" + data.age + "</td>" +
                "<td>" + data.email + "</td>" +
                "<td>" + userRoles + "</td>"
            );
            $("#currentUserTable").append(tr);
        },
    });
}
