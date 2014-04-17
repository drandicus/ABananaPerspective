$(document).ready(function(){
  $('#done').click(function(){
    if($('#description').val() != "") {
      $('#myModal').modal({
        keyboard: false
      });
    }
  });

  $('#save').click(function(){
    $('#add_dish').submit();
  });

  $('#close').click(function(){
    window.location='/admin';
  });
})
