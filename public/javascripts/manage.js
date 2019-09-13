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
    });
    })
});