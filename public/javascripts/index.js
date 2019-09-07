$(document).ready(function() {
    $('#fullPage').fullpage({
        resize: false, // resize窗口缩放功能，根据浏览器窗口的大小改变body的font-size
    });
});
// $(document).ready(function(){})

$(function () {
    var tags = ["灵魂画手？","五行缺王","日益喜欢霓虹国文化","此人学素描和彩铅","喜欢Macrame编制","想去环游世界","浏览了许多美食","前端爱好者","想写服务人民的好工具","……"];
    var html = ejs.render($("#model").html(),{data:tags});
    $(".fp-tableCell").eq(0).html(html)
})