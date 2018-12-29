
var signinform = $('.signinform')

var $submit = signinform.find('.subtn')
var $name = signinform.find('.named')
var $email = signinform.find('.emaild')
var $tel = signinform.find('.teld')
var $pswd1 = signinform.find('.pwdd1')
var $pswd2 = signinform.find('.pwdd2')
var $input = signinform.find('input')
var $labmsg = signinform.find('.labmsg')
var $ptitle = signinform.find('head').children('title')
var $holdname = signinform.find('.holdname')
var $emaild = signinform.find('.email')
var $tele = signinform.find('.tel')
var $pwd1 = signinform.find('.pwd1')
var $title = signinform.find('.title h1')
var $albtn = signinform.find('#alredsub')

//载入页面 内容为空时禁用提交
function onload() {

    if ($submit.val() == '注册') {
        if ($name.val().length > 0 && $email.val().length > 0 && $tel.val().length > 0 && $pswd1.val().length >
            0 &&
            $pswd2.val().length > 0) {
            //console.log($name.val())
            $submit.prop('disabled', false)
            $submit.click(function () {
                $input.blur()
            })
        } else {
            $submit.prop('disabled', true)
        }
    } else {
        if ($name.val().length > 0 && $pswd1.val().length > 0) {
            $submit.prop('disabled', false)
            $submit.click(function () {
                $input.blur()
            })
        } else {
            $submit.prop('disabled', true)
        }
    }
}

$(function () {

    //输入框动画效果
    $input.focus(function () {
        $(this).next().css('font-size', '14px')
        $(this).next().animate({
            'top': '-5px'
        }, 100)
       
    })
    $input.blur(function () {
        if ($(this).val() === "") {
            $(this).next().css({
                'font-size': '16px',
                'color': 'rgb(255, 0, 119)'
            })
            $(this).next().animate({
                'top': '15px'
            }, 100)
        } else {
            return
        }
    })
    //修改点击文字时出现的bug
    $input.next().click(function () {
        $(this).siblings('input').focus()
    })

    // 注册与登陆界面切换
    $albtn.click(function () {
        $labmsg.remove();
        if ($(this).val() === '已有账号?点击登陆') {
            $holdname.text('输入用户名或邮箱')
            $emaild.css('display', 'none')
            $tele.css('display', 'none')
            $ptitle.text('登陆')
            $title.text('登陆SEX图库账号')
            $(this).val('没有账号?点击注册')
            $name.focus()
            $name.next().css('color', 'rgb(255, 0, 119)')
            $pwd1.css({
                'width': '308px'
            })
            $('.pwd1 div').css({
                'left': '50px'
            })
            $pswd1.css({
                'width': '300px'
            })
            $('.pwd2').css('display', 'none')
            $submit.val('登陆')
            // var newroute = '/login'
            // $('form').attr('action', newroute)
            if ($name.val().length > 0 && $pswd1.val().length > 0) {
                $submit.prop('disabled', false)

            } else {
                $submit.prop('disabled', true)
            }

        } else {
            $labmsg.text('')
            $title.text('注册SEX图库账号')
            $ptitle.text('注册')
            $holdname.text('输入用户名')
            $emaild.css('display', 'flex')
            $tele.css('display', 'flex')
            $(this).val('已有账号?点击登陆')
            $name.focus()
            $pwd1.css({
                'width': '150px'
            })
            $('.pwd1 div').css({
                'left': '25px'
            })
            $pswd1.css({
                'width': '145px'
            })
            $('.pwd2').css('display', 'block')
            $submit.val('注册')
            // var route = '/signin'
            // $('form').attr('action', route)

            if ($name.val().length > 0 && $name.val().length<9) {
                //console.log($name.val().length)
                $.post("/checkname", {
                        name: $name.val(),
                    },
                    function (data, status) {
                        if (data.length > 1) {
                            $name.next().text('用户名已占用')
                            $name.next().css('color', 'blue')
                            $submit.prop("disabled", true);
                        } else {
                            $name.next().text('用户名可用')
                            $name.next().css('color', 'rgb(255, 0, 119)')
                        }
                    });
            }else if($name.val().length>9){
                $name.next().text('抱歉!我装不下那么长的名字')
                $name.next().css('color', 'blue')
                $submit.prop("disabled", true);
            } else {
                $holdname.text('输入用户名')
                $holdname.css('color', 'rgb(255, 0, 119)')
                $submit.prop("disabled", true);
            }
        }
    })

    //注册时验证两次密码是否一致
    $('body').delegate('.pwdd2', 'propertychange input', function () {
        var pval = $(this).val().length;
        //console.log(pval)
        if ($submit.val() == '注册') {
            if (pval > 5) {
                if ($(this).val() !== $pswd1.val()) {
                    $(this).next().text('两次密码不一样')
                    $submit.prop('disabled', true)
                    $(this).next().css('color', 'blue')
                } else {
                    $(this).next().text('确认')
                    $pswd1.next().text('密码')
                    $pswd1.next().css('color', 'rgb(255, 0, 119)')
                    $(this).next().css('color', 'rgb(255, 0, 119)')
                    if ($name.val().length > 0 && $email.val().length > 0 && $tel.val().length >
                        0) {
                        $submit.prop("disabled", false);
                    } else {
                        $submit.prop("disabled", true);
                    }
                }

            } else {
                $(this).next().text('密码太短至少6位')
                $(this).next().css('color', 'rgb(255, 0, 119)')
                $submit.prop("disabled", true);
            }
        } else {
            return
        }
    })

    //登陆时检查密码是否为空
    $('body').delegate('.pwdd1', 'propertychange input', function () {
        //登陆时验证密码
        if ($submit.val() == '登陆') {
            if ($(this).val().length > 0) {
                if ($name.val().length > 0) {
                    $submit.prop("disabled", false);
                } else {
                    $name.next().text("内容不能为空")
                    $name.next().css('color', 'blue')
                    $submit.prop("disabled", true);
                }

            } else {
                $submit.prop("disabled", true);

                $pswd1.next().text('密码不能为空')
            }
            //注册时验证密码
        } else {
            if ($(this).val().length > 5) {
                if ($(this).val() !== $pswd2.val()) {
                    $(this).next().text('两次密码不一样')
                    $submit.prop('disabled', true)
                    $(this).next().css('color', 'blue')
                } else {
                    $(this).next().text('密码')
                    $(this).next().css('color', 'rgb(255, 0, 119)')
                    $pswd2.next().text('确认')
                    $pswd2.next().css('color', 'rgb(255, 0, 119)')
                    if ($name.val().length > 0 && $email.val().length > 0 && $tel.val().length >
                        0) {
                        $submit.prop("disabled", false);
                    } else {
                        $submit.prop("disabled", true);
                    }
                }

            } else {
                $submit.prop("disabled", true);
                $pswd1.next().css('color', 'rgb(255, 0, 119)')
                $pswd1.next().text('密码太短至少6位')

            }
        }
    })

    //-注册 失去焦点时与服务器通信验证用户名是否可用
    $('body').delegate('.named', 'propertychange input', function () {
        var inputField = $name.val()
        //注册时验证
        if ($submit.val() == '注册') {
            //console.log(inputField)
            $name.next().text('输入用户名')
            $name.next().css('color', 'rgb(255, 0, 119)')
            if (inputField.length > 1 && inputField.length < 9) {
                $.post("/checkname", {
                        name: inputField,
                    },
                    function (data, status) {
                        if (data.length > 0) {
                            //console.log(data)
                            $name.next().text('用户名已占用')
                            $name.next().css('color', 'blue')
                            $submit.prop("disabled", true);
                        } else {
                            $name.next().text('用户名可用')
                            $name.next().css('color', 'rgb(255, 0, 119)')
                        }
                    });
            }else if(inputField.length >= 9){
                $name.next().text('抱歉!我装不下那么长的名字')
                $name.next().css('color', 'blue')
                $submit.prop("disabled", true);
            }  else {
                $name.next().text("用户名太短")
                $name.next().css('color', 'blue')
                $submit.prop("disabled", true);
            }
            //登陆时验证用户名
        } else {
            $name.next().text('输入用户名或邮箱')
            $name.next().css('color', 'rgb(255, 0, 119)')
            if (inputField.length > 0) {
                $name.next().text('输入用户名或邮箱')
                $name.next().css('color', 'rgb(255, 0, 119)')
                // $submit.prop("disabled", false);
            } else {
                $name.next().text("用户名不能为空")
                $name.next().css('color', 'blue')
                $submit.prop("disabled", true);
            }
        }
    })

    //-注册 失去焦点时与服务器通信验证邮箱是否可用
    $email.blur(function () {
        if ($submit.val() == '注册') {
            var inputField = $(".emaild").val()
            //console.log(inputField)
            if (inputField.length > 7) {
                $.post("/checkmail", {
                        name: inputField,
                    },
                    function (data, status) {
                        if (data.length > 0) {
                            //console.log(data)
                            $email.next().text('邮箱已经注册过')
                            $email.next().css('color', 'blue')
                            $submit.prop("disabled", true);
                        } else {
                            $email.next().text('输入邮箱账号')
                            $email.next().css('color', 'rgb(255, 0, 119)')
                        }
                    });
            } else {
                $email.next().text('输入邮箱账号')
                $email.next().css('color', 'rgb(255, 0, 119)')
                $submit.prop("disabled", true);
            }
        } else {
            return
        }
    })

    //-注册 失去焦点时与服务器通信验证手机号码是否可用
    $tel.blur(function () {
        if ($submit.val() == '注册') {
            var inputField = $tel.val()
            //console.log(inputField.length)
            if (inputField.length == 11) {
                $.post("/checktel", {
                        name: inputField,
                    },
                    function (data, status) {
                        if (data.length > 0) {
                            //console.log(data)
                            $tel.next().text('号码已被填写过')
                            $tel.next().css('color', 'blue')
                            $submit.prop("disabled", true);
                        } else {
                            $tel.next().css('color', 'rgb(255, 0, 119)')
                            $tel.next().text('手机号码')
                        }
                    });
                    
            }else if (inputField.length >11 || (inputField.length < 11 && inputField.length >0)){
                $tel.next().css('color', 'blue')
                $tel.next().text('请填写有效的手机号码')
                $submit.prop("disabled", true);
            }else {
                $tel.next().css('color', 'rgb(255, 0, 119)')
                $tel.next().text('输入手机号码')
                $submit.prop("disabled", true);
            }
        } else {
            return
        }
    })

})