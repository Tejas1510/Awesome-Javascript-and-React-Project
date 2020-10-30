(function ($) {
  $(document).ready(function(){
    $("input:file").change(function () {
      var fileName = $(this).val();
      if (fileName.length > 0) {
        $(this).parent().children('span').html(fileName);
      }
      else {
        $(this).parent().children('span').html("Choose file");

      }
    });
    //file input preview
    function readURL(input) {
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
          $('.logoContainer img').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
      }
    }
    $("input:file").change(function () {
      readURL(this);
    });
  })
}(jQuery))