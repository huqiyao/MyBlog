/**
 *  移动端导航栏 隐藏/显示 效果
 * */
$('#navbar').click(function () {
    $('#left-nav').addClass('show-it');
})

$(document).mouseup(function (e) {
    var area = $('#left-nav');   // 设置目标区域
    if (!area.is(e.target) && area.has(e.target).length === 0) { // Mark 1
        $('#left-nav').removeClass('show-it');
    }
});

$('#close').click(function () {
    $('#left-nav').removeClass('show-it');
})

/**
 *  导航栏选项active样式
 * */
// $(document).ready(function(){
//     console.log("nhao");
//     $('.item').each(function(index){
//         console.log(index);
//         $(this).click(function(){
//             $("a").removeClass("active");
//             $("a").eq(index).addClass("active");
//         });
//     });
// });
// $('.item').each(function (index) {
//     console.log(index);
//     $(this).click(function () {
//         $("a").removeClass("active");
//         $("a").eq(index).addClass("active");
//     });
// });

$(document).ready(function () {
    $('.item-name').each(function (idx) {
        $(this).click(function () {
            $(".item-name").removeClass("active");
            $(".item-name").eq(idx).addClass("active");
            $(".content").removeClass("show");
            $(".content").eq(idx).addClass("show");
        //    根据当前选中的nav响应显示页面
        //     $.ajax({
        //         url:'/userStatus',
        //         type:'GET',
        //         data:{index:idx+1},
        //         dataType:'JSON',
        //         success:function (res) {
        //             console.log("成功");
        //             console.log(res);
        //             var temp = $("#model").html();
        //             var html = ejs.render(temp,{data:res});
        //             $("#article").html(html);
        //         },
        //         error:function (res) {
        //             console.log("失败");
        //             // console.log(res);
        //         },
        //         complete:function (res) {
        //             console.log("完成");
        //             // console.log(res);
        //         }
        //     })
        });
    })
});