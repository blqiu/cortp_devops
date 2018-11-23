function veify_login(){
    var checkbox_status = $("input[type='checkbox']").is(':checked');
    var username = $("#username").val();
    var password = $("#password").val();
    $.ajax({
        type: "POST",
        dataType: "text",
        url: "/login/",
        data:{
            csrfmiddlewaretoken: $('[name="csrfmiddlewaretoken"]').val(),
            username:username,
            password:password,
            checkbox_status:checkbox_status,
        },
        error: function(message){
                      alert("ajax.error")
                  },
         success: function(message){
               if (message == ""){
                    window.location.href="/index/"
                }else{
                    alert(message)
               }
         },
    })
}
// 获取checkbox值
//   $(function () {
//     $('input').iCheck({
//       checkboxClass: 'icheckbox_square-blue',
//       radioClass: 'iradio_square-blue',
//       increaseArea: '20%' /* optional */
//     });
//   });

