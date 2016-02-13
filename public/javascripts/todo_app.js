$(document).ready(function () {

        $('.edit-todo').on('click', function(e){
            e.preventDefault();
            var id = $(this).attr('id');
            $('.edit-form-'+id).css('display', 'block');
        });
});