
const $msgshow = $('.formstyle');
const $userinfo = $('.userinfo');
const $usercollect = $('.usercollect');
const $usersetting = $('.usersetting');
$('.navlist li').each(function (i) {
    //console.log(i)
    $(this).click(function () {
        if(i===0){
            

            $usercollect.fadeOut('fast');
            $msgshow.fadeIn('fast');
            $usersetting.fadeOut('fast');
            $userinfo.fadeOut('fast');
        }else if(i===1){
            $usercollect.fadeIn('fast');
            $msgshow.fadeOut('fast');
            $usersetting.fadeOut('fast');
            $userinfo.fadeOut('fast');
        }else if(i===2){
            $usercollect.fadeOut('fast');
            $msgshow.fadeOut('fast');
            $usersetting.fadeOut('fast');
            $userinfo.fadeIn('fast');
        }else{
            $usercollect.fadeOut('fast');
            $msgshow.fadeOut('fast');
            $usersetting.fadeIn('fast');
            $userinfo.fadeOut('fast');
        }

    })
})

//监听内容实时输入
$('body').delegate('.comment', 'propertychange input', function () {
    // console.log($(this).val());
    if ($(this).val().length > 0) {
        //让按钮可用
        $('#btn').prop("disabled", false);
        
    } else {
        //让按钮不可用
        $('#btn').prop("disabled", true);
    }
});

//点击发送按钮提交和请求数据
$('#btn').click(function() { 
    let textarea = $(this).parents('form').siblings('textarea')
    let comment = textarea.val()
    let username = $(this).siblings('p').text()                  
    console.log(username,comment)
    $.post('/creatmsgboard',{
        username:username,
        comment:comment
    },function(data){               
        let msg = $('.messageshow')
        msg.prepend(creatMsgBoard(data))
        textarea.val("")
    } )                 
})
    


//创建留言节点
function creatMsgBoard(i){
    let msgBoard = `<div class="info">
                <p class="username">${i[1]}</p>
                <p class="infotext">${i[2]}</p>
                <p class="infooperation">
                    <span class="infotime">${i[3]}</span>
                    <span class="infohandle">
                        <a class="infoTop" href="javascript:;">${i[4]}</a>
                        <a class="infoDown" href="javascript:;">${i[5]}</a>
                        <a class="infoDel" href="javascript:;">删除</a>
                    </span>
                </p>
            </div> `
    return msgBoard;
}



//2.监听顶点击
$('body').delegate('.infoTop', 'click', function () {
    $(this).text(parseInt($(this).text()) + 1);
    var $contented = $(this).parents('.infooperation').siblings('.infotext').text()
    var $top 
    $top = 666
    //console.log($contented,$top )
    $.post('/messageinfo',{
        content: $contented,
        dowhat : $top
    },function(data,status){
        // console.log(data)
    });
})
//3.监听踩点击
$('body').delegate('.infoDown', 'click', function () {
    $(this).text(parseInt($(this).text()) + 1);
    var $contented = $(this).parents('.infooperation').siblings('.infotext').text()
    var $down 
    $down = 777
    //console.log($contented,$down )
    $.post('/messageinfo',{
        content : $contented,
        dowhat : $down
    },function(data,status){
        // console.log(data)
    });
})
//4.监听删除节点
$('body').delegate('.infoDel', 'click', function () {
    //parents()找到指定父元素;
    $(this).parents('.info').remove();
    var $contented = $(this).parents('.infooperation').siblings('.infotext').text()
    var $delete 
    $delete= 333
    $.post('/messageinfo',{
        content : $contented,
        dowhat : $delete

    },function(data,status){
        //console.log(data)
    });
})

