
$(document).ready(function(){
        $('.table .editBtn'). click(function (evt) {

            evt.preventDefault();
             var href= $(this).attr('href');
            $.get(href,function(user, status){
                $('#editId').val(user.id)
                $('#editFirstName').val(user.name)
                $('#editLasName').val(user.surname)
                $('#editAge').val(user.age)
                $('#editUsername').val(user.username)
            });

           $('.myFormUpdate #editModal').modal();

        });

});


