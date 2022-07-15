
$(document).ready(function(){
        $('.table .editBtn'). click(function (evt) {

            evt.preventDefault();
           //
           $('.myForm #editModal').modal();
           //
           //  var href= $(this).attr('href');

            // $.get(href,function(user, status){
            //     $('.myForm #editId').val(user.id);
            //     $('#editName').val(user.name);
                // $('#editSurname').val(user.surname)
                // $('#editAge').val(user.age)
                // $('#editUsername').val(user.username)
                // $('#editPassword').val(user.password)
                // $('#editRole').val(user.roles)
            // });

        });

});