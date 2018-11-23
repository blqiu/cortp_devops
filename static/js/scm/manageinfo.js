function checkSubmit(){
    if (!confirm("确定删除？")) {
    }else{
     var check_length = $('input[name="navi_check"]').length;
     var checkvalues = new Array();
     for (var i = 0; i < check_length; i++) {
         var checkstatus = $('input[name="navi_check"]:eq(' + i + ')').is(':checked');
         if(checkstatus.toString() == "true"){
             checkvalues.push($('input[name="navi_check"]:eq(' + i + ')').val())
         }
     }
     if(checkvalues.length == 0){
        alert("请选择删除项")
     }else{
         $.ajax({
            type: "POST",
            dataType: "text",
            url: "/scm/deleteinfo/",
            // traditional: "true",
            data:{
                csrfmiddlewaretoken: $('[name="csrfmiddlewaretoken"]').val(),
                checkvalues: checkvalues.toString(),
            },
            error: function(message){
                alert(message)
                      },
             success: function(message){
                 if(message == "successed"){
                     window.location.href = "/scm/manageinfo/"
                 }
             },
         })
     }
    }
}
function allselect(){
    $("[name='checkbox']").attr("checked",'true');
}

    $(".checkbox-toggle").click(function () {
      var clicks = $(this).data('clicks');
      if (clicks) {
        //Uncheck all checkboxes
        $(".mailbox-messages input[type='checkbox']").iCheck("uncheck");
        $(".fa", this).removeClass("fa-check-square-o").addClass('fa-square-o');
      } else {
        //Check all checkboxes
        $(".mailbox-messages input[type='checkbox']").iCheck("check");
        $(".fa", this).removeClass("fa-square-o").addClass('fa-check-square-o');
      }
      $(this).data("clicks", !clicks);
    });

function checkAll(sender, checkClass) {
    var checkItems = document.getElementsByTagName('input');
    for (var i = 0; i < checkItems.length; i++) {
        var checkItem = checkItems[i];
        if (checkItem.type === 'checkbox' && checkItem.className === 'item1') {
            checkItem.checked = sender.checked;
        }
    }
}

function showInfo(n){
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "/scm/getInfo/",
        data:{
            csrfmiddlewaretoken: $('[name="csrfmiddlewaretoken"]').val(),
            infoid:n,
        },
        error: function(message){
            alert("ajax.error")
        },
        success: function(message){
            layer.open({
            type: 1,
            title: '修改信息',
            closeBtn: 1,
            area: ['60%', '70%'],
            shadeClose: true, //点击遮罩关闭
            content:
            '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+
            '<div class="col-md-12">'+
                '<div class="box box-info">'+
                    '<div class="box-body">'+
                    '<label for="id_env">环境:</label>'+
                    '<input type="hidden" name="infoid" id="infoid" value='+ n +' />'+
                    '<p> <input  type="text" class="form-control my-colorpicker1" name="id_env" required id="id_env" value='+ message.env +' maxlength="256" /></p>'+
                    '<label for="id_server">服务器信息:</label>'+
                    '<p><input type="text" class="form-control my-colorpicker1" name="id_server" required id="id_server" value='+ message.serverip +' maxlength="256" /></p>'+
                    '<label for="id_application">应用名:</label>'+
                    '<p> <input type="text" class="form-control my-colorpicker1" name="id_application" required id="id_application" value='+ message.application +' maxlength="256" /></p>'+
                    '<label for="id_port">服务器端口:</label>'+
                    '<p> <input  type="text" class="form-control my-colorpicker1" name="id_port" required id="id_port" value='+ message.port +' maxlength="256" /></p>'+
                    '<label for="id_deployed">部署信息:</label>'+
                    '<p><input type="text" class="form-control my-colorpicker1" name="id_deployed" required id="id_deployed" value='+ message.deployed +' maxlength="256" /></p>'+
                    '<label for="id_databases">数据库信息:</label>'+
                    '<p> <input type="text" class="form-control my-colorpicker1" name="id_databases" required id="id_databases" value='+ message.databases +' maxlength="256" /></p>'+
                    '<label for="id_remarks">备注:</label>'+
                    '<textarea rows="4" id="id_remarks" class="form-control" name="id_remarks" cols="15">'+ message.remarks +
                    '</textarea>'+
                    '</div>'+
                    '<div class="box-footer">'+
                    '<li onclick="chinfo()" class="btn btn-primary" style="width: 60pt" value="">保存</li>&nbsp;&nbsp;&nbsp;&nbsp;'+
                    '</div>'+
                '</div>'+
            '</div>',
          });
        },
    })
}

function chinfo(){
    var infoid = $("#infoid").val();
    var id_env = $("#id_env").val();
    var id_server = $("#id_server").val();
    var id_application = $("#id_application").val();
    var id_port = $("#id_port").val();
    var id_deployed = $("#id_deployed").val();
    var id_databases = $("#id_databases").val();
    var id_remarks = $("#id_remarks").val();
    $.ajax({
        type: "POST",
        dataType: "text",
        url: "/scm/chinfo/",
        data:{
            csrfmiddlewaretoken:$('[name="csrfmiddlewaretoken"]').val(),
            infoid:infoid,
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
            if(message == ""){
                window.location.href="/scm/manageinfo/"
            }
        }
    })

}