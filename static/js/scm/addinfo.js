function addinfo(){
    var id_env = $("#id_env").val();
    var id_server = $("#id_server").val();
    var id_application = $("#id_application").val();
    var id_port = $("#id_port").val();
    var id_deployed = $("#id_deployed").val();
    var id_databases = $("#id_databases").val();
    var id_remarks = $("#id_remarks").val();
    if(id_env == "" || id_server == "" ||  id_application == "" || id_deployed == "" || id_databases == ""){
        alert("不能为空")
    }else{
        $.ajax({
            type: "POST",
            dataType: "text",
            url: "/scm/addinfo/",
            data:{
                csrfmiddlewaretoken: $('[name="csrfmiddlewaretoken"]').val(),
                id_env:id_env,
                id_server:id_server,
                id_application:id_application,
                id_port:id_port,
                id_deployed:id_deployed,
                id_databases:id_databases,
                id_remarks:id_remarks,
            },
            error: function(message){
                alert("ajax.error")
            },
            success: function(message){
                if (message == ""){
                    window.location.href="/scm/manageinfo/"
                }
            },
        })
    }
}