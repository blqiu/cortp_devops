function resetpasswd(){
    var oldpd = $("#oldpd").val();
    var newpd = $("#newpd").val();
    var repd = $("#repd").val();
    if(oldpd != "" && newpd != ""){
        if(newpd != repd){
            alert("两次密码输入不一致")
        }else{
            $.ajax({
                type: "POST",
                dataType: "text",
                url: "/chpasswd/",
                data:{
                    csrfmiddlewaretoken: $('[name="csrfmiddlewaretoken"]').val(),
                    oldpd:oldpd,
                    newpd:newpd,
                },
                error: function(message){
                    alert("ajax.error")
                },
                success: function(message){
                    if(message == ""){
                        window.location.href="/index/"
                    }else{
                        alert(message)
                    }
                },
            })
        }
    }else{
        alert("不能为空")
    }
}