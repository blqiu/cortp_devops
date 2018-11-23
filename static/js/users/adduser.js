function adduser(){
    var username = $("#username").val();
    var password = $("#password").val();
    $.ajax({
        type: "POST",
        dataType: "text",
        url: "/users/adduser/",
        data:{
            csrfmiddlewaretoken: $('[name="csrfmiddlewaretoken"]').val(),
            username:username,
            password:password,
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