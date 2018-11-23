function add_url() {
    var id_name = $("#id_name").val();
    var id_description = $("#id_description").val();
    var id_url = $("#id_url").val();
    if(id_name != "" && id_description != "" && id_url != ""){
        $.ajax({
            type: "POST",
            dataType: "text",
            url: "/website/addUrl/",
            data:{
                csrfmiddlewaretoken: $('[name="csrfmiddlewaretoken"]').val(),
                id_name:id_name,
                id_description:id_description,
                id_url:id_url,
            },
            error: function(message){
                alert("ajax.error")
            },
            success: function(message){
                if (message != ""){
                    window.location.href="/index/"
                }
            },
        })
    }else{
        alert("不能为空")
    }
}