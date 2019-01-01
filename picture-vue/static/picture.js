$(function () {

    $(window).scroll(function () {
        //浏览器所能看到的页面的那部分的高度
        let alldatalist = $('.allcontent')
        let winH = $(window).height();
        let scrH = $(window).scrollTop(); //滚动的高度
        //获取整个页面的高度 htmH为设置的滚动到的高度位置
        let htmH = $(document).height() - 100;
        let max = 1
        //可见高度+滚动高度 超出 设置的高度，触发方法
        if (winH + scrH >= htmH) {
            max = max + 1
            console.log(max)
            //到达底部-100的高度，触发方法
            $.post('/getmore', {
                    numbmax: max,
                },
                function (data) {
                    data.forEach(element => {
                        element.forEach(e => {
                            alldatalist.append(creatoldst(element, e))
                        })
                    });
                });
        }
    })

    function creatoldst(i, e) {
        let oldst =
            `<div class="oldst">
                        <div class="folder">
                            <div class="tmsg">
                                <p>${ i[1][0] }</p>
                            </div>
                            <img src="${ i[0][0][1] }" src='' alt="">
                            <li class="img">
                                <img scr="${e[1]}" alt="">
                                <div class="icon">
                                    <a class='a1' href="javascript:void(0);">${e[2]}</a>
                                    <a class='a2' href="javascript:void(0);">${e[3]}</a>
                                    <a class='a3' href="javascript:void(0);">${e[4]}</a>
                                </div>
                            </li>    
                        </div>
                        </div>`
        return oldst
    }
    // })
    //图片处理
    // $('img').each(function () { 
    //     var imgwidth = $(this).width()
    //     var imgheight = $(this).height()
    //     var divicewidth = window.screen.width
    //     console.log(divicewidth)

    //     if(divicewidth < 500){
    //         //如果是横图
    //         if($(this).width() > $(this).height()){
    //         //设置宽高
    //             $(this).css({'width':'auto','height':'320px'})
    //         }else{//如果是竖图
    //             $(this).css({'width':'180px','height':'auto'})
    //             $('.folder').css({'width':'180px','height':'auto',' overflow':'hidden','position':'relative'})
    //         }
    //     }else{
    //         return
    //     }
    //  })



    let $folder = $('.folder')
    let $siginform = $(".signinform")
    let $backbtn = $('.backbtn')
    let $signbtn = $('nav div .signbtn')
    let $navbox = $('.navbox')
    //登陆或注册按钮事件
    $signbtn.click(function () {
        $backbtn.css('display', 'block')
        $siginform.slideDown('fast')
        folderbackstyle(100,15)
        $(this).css('display', 'none')
    })
    //注册表单数据提交
    $siginform.find('.subtn').click(function () {
        let username = $siginform.find('.named').val()
        let email = $siginform.find('.emaild').val()
        let tel = $siginform.find('.teld').val()
        let password = $siginform.find('.pwdd1').val()
        let subvalue = $siginform.find('.subtn').val()
        let divtitle = $siginform.find('.title')
        let formnavhead = $('.navhead')
        $.post('/signinform', {
            username,
            email,
            tel,
            password,
            subvalue
        }, function (data) {
            //console.log(data)
            if (data.length > 1) {
                $backbtn.css('display', 'none')
                $signbtn.css('display', 'none')
                $siginform.slideUp('fast')
                folderbackstyle(100,0)
                //$('.givememsg').css('display','block')
                $navbox.prepend(usernamed(data))
                formnavhead.append(usernamed(data))
            } else {
                divtitle.append(msgalert(data))
            }
        })
    })




    function msgalert(data) {
        let msg = `<label class="labmsg" for="">${data}</label>`
        return msg
    }

    function usernamed(data) {
        let username = `<p class="username">${data[1]}</p>`
        return username
    }
    //背景style方法
    function folderbackstyle(i,e){
        let foldbacsty =  $folder.each(function () {
            $(this).css({
                'webkitFilter': 'saturate('+i+'%) blur('+e+'px)'
            })
        })
        return foldbacsty
    }
    //用户名长度
 
    

    $('.givemsgbtn').click(function () {
        if ($navbox.children().length > 1) {
            //let $nav = '1'
            $('.msgboard').slideDown('fast')
            $backbtn.css('display', 'block')
            folderbackstyle(100,15)
            $.post('/messageboard', {
                //username:$nav
            }, function (data) {
                //console.log(data)
                data.forEach(element => {
                    let msg = $('.messageshow')
                    msg.append(creatMsgBoard(element))
                });
            })
        } else {
            alert('你还没登陆请登陆后再评论!')
        }
    })

    $backbtn.click(function () {
        $('.msgboard').slideUp('fast')
        $siginform.slideUp('fast')
        $(this).css('display', 'none')
        folderbackstyle(100,0)
        $('.info').remove()
        if ($navbox.children().length> 1){
            $signbtn.css('display', 'none')
        }else{
            $signbtn.css('display', 'block')
        }
        
    })

    //2.监听留言点击
    $('body').delegate('.a2', 'click', function () {
        var imgwd = $(this).parent('div').siblings('img').width()
        $(this).parent('div').next('div').css({
            'display': 'block',
            'width': imgwd,
            'z-index': '999',
            'position': 'relative',
        });
        $(this).parent('div').next('div').find('textarea').css({
            'width': imgwd,
        })
    })

    //3.监听heart点击
    $('body').delegate('.a1', 'click', function () {
        let $tablename = $(this).parents('.showpic').siblings('p').text()
        let $href = $(this).parent('.icon').siblings('img').attr('src')
        let like = $(this).text()
        //console.log(like,$tablename,$href,)
        $(this).text(parseInt(like) + 1);
        $.post("/like", {
                name: $tablename,
                href: $href,
                like:like
            },
            function (data, status) {
                return;
            });

    })

    //3.监听.img点击
    $('body').delegate('.img img', 'click', function () {
        $(this).parent('.img').css({
            'position': 'relative',
            'transform': 'scale(2)',
            'z-index': '999'
        });
        $(this).siblings('.icon').animate({
            'top': '320px'
        }, 300)
    })
    $('body').delegate('.img', 'mouseover', function () {

        $(this).children('.icon').animate({
            'top': '290px'
        }, 100);
    })
    $('body').delegate('.img', 'mouseleave', function () {

        $(this).css({
            'position': '',
            'transform': 'scale(1)',
            'z-index': '0'
        });
        $(this).children('.icon').animate({
            'top': '320px'
        }, 300)
    })


    //folder 样式 .图片hover时显示标题

    $folder.each(function () {

        $(this).on("mouseover", function () {
            $(this).children('.tmsg').animate({
                'top': '150px',
            }, 300)
        })

    })
    $folder.each(function () {
        $(this).on("mouseleave", function () {
            $(this).children('.tmsg').animate({
                'top': '320px',
                'display': 'none'
            }, 100)
        })
    })



    var $showpic = $('.showpic')
    var $allcont = $('.allcontent')
    $('.folder').each(function () {
        $(this).click(function () {
            $folder.each(function () {
                $(this).css({
                    'webkitFilter': 'saturate(100%) blur(10px)'
                })
            })
            $('nav').css('display', 'none')
            $allcont.css('margin-top', '0')
            var $pic = $(this).html();
            $showpic.prepend($pic)
            $('.showp').prepend($(this).children('.tmsg').html())
            // $showpic.children('p').remove()
            $showpic.children('img').remove()
            $showpic.children('.tmsg').remove()
            $showpic.fadeIn()
            $('.showp').css({
                'display': 'block',
                'color': 'white'
            })
            $showpic.css('display', 'flex')
            $('.showpic img').each(function (i) {
                $(this).attr('src', $(this).attr('scr'))
            })

            $('.showpic .img').css({
                'display': 'block',
            })
            $('.button').css('display', 'block')
        })
    })
    $('.button').on('click', function () {
        $allcont.css('margin-top', '50px')
        $('nav').css('display', 'block')
        $showpic.fadeOut()
        $showpic.html("")
        $(this).css('display', 'none')
        $('.showp').css('display', 'none')
        $('.showp p').remove()
        folderbackstyle(100,0)
    })


    //个人中心hover样式
    // $('nav div').click(function () {
    //     $(this).children('ul').slideToggle('fast')
    // })


})