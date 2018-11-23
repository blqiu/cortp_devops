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
            url: "/website/deleteweb/",
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
                     window.location.href = "/website/manageweb/"
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

function showUrlInfo(n){
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "/website/getUrlInfo/",
        data:{
            csrfmiddlewaretoken: $('[name="csrfmiddlewaretoken"]').val(),
            webid:n,
        },
        error: function(message){
            alert("ajax.error")
        },
        success: function(message){
            layer.open({
            type: 1,
            title: '修改信息',
            closeBtn: 1,
            area: ['40%', '50%'],
            shadeClose: true, //点击遮罩关闭
            content:
            '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+
            '<div class="col-md-12">'+
                '<div class="box box-info">'+
                    '<div class="box-body">'+
                    '<label for="id_name">名称:</label>'+
                    '<input type="hidden" name="webid" id="webid" value='+ n +' />'+
                    '<p> <input  type="text" class="form-control my-colorpicker1" name="name" required id="id_name" value='+ message.name +' maxlength="50" /></p>'+
                    '<label for="id_description">描述:</label>'+
                    '<p><input type="text" class="form-control my-colorpicker1" name="description" required id="id_description" value='+ message.description +' maxlength="50" /></p>'+
                    '<label for="id_url">网址:</label>'+
                    '<p> <input type="text" class="form-control my-colorpicker1" name="url" required id="id_url" value='+ message.url +' maxlength="128" /></p>'+
                    '</div>'+
                    '<div class="box-footer">'+
                    '<li onclick="chweb()" class="btn btn-primary" style="width: 60pt" value="">保存</li>&nbsp;&nbsp;&nbsp;&nbsp;'+
                    '</div>'+
                '</div>'+
            '</div>',
          });
        },
    })
}

function chweb(){
    var webid = $("#webid").val();
    var name = $("#id_name").val();
    var description = $("#id_description").val();
    var url = $("#id_url").val();
    $.ajax({
        type: "POST",
        dataType: "text",
        url: "/website/chweb/",
        data:{
            csrfmiddlewaretoken:$('[name="csrfmiddlewaretoken"]').val(),
            webid:webid,
            name:name,
            description:description,
            url:url,
        },
        error: function(message){
            alert("ajax.error")
        },
        success: function(message){
            if(message == ""){
                window.location.href="/website/manageweb/"
            }
        }
    })

}