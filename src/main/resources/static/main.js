
$(document).ready(function(){
        $('.table .editBtn'). click(function (evt) {

            evt.preventDefault();
             var href= $(this).attr('href');
            $.get(href,function(restUser){
                fetch(restUser)
                    .then(response => response.json())
                    .then()
                $('#editId').val(user.id)
                $('#editFirstName').val(user.name)
                $('#editLasName').val(user.surname)
                $('#editAge').val(user.age)
                $('#editUsername').val(user.username)
            });

           $('.myFormUpdate #editModal').modal();

        });

    $('.table .deleteBtn'). click(function (evt) {
        evt.preventDefault();
        $('.myFormDelete #deleteModal').modal();

        var href= $(this).attr('href');
        $.get(href,function(user){
            $('#deleteId').val(user.id)
            $('#deleteFirstName').val(user.name)
            $('#deleteLasName').val(user.surname)
            $('#deleteAge').val(user.age)
            $('#deleteUsername').val(user.username)
        });
    });


});


// $('.table .editBtn'). click(function (evt) {
//
//     evt.preventDefault();
//     var href= $(this).attr('href');
//     $.get(href,function(user){
//         $('#editId').val(user.id)
//         $('#editFirstName').val(user.name)
//         $('#editLasName').val(user.surname)
//         $('#editAge').val(user.age)
//         $('#editUsername').val(user.username)
//     });
//
//     $('.myFormUpdate #editModal').modal();
//
// });