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
$(document).ready(function () {
    $('.item-name').each(function (idx) {
        $(this).click(function () {
            $(".item-name").removeClass("active");
            $(".item-name").eq(idx).addClass("active");
            $(".content").removeClass("show");
            $(".content").eq(idx).addClass("show");

        });
    })
});

$('#my-article').click(function () {
    //    根据当前选中的nav响应显示页面
    $.ajax({
        url:'/showArticleList',
        type:'GET',
        dataType:'JSON',
        success:function (res) {
            console.log("成功");
            console.log(res);
            // console.log((res.articleList)[1].content);
            // if(res.index === '2'){
                var context = {article: res.articleList};
                var html = template('model',context);
                $('#article-list').html(html);
                $(".pagination").pagination({
                    currentPage:res.currentPage,   // 当前页
                    // totalPage: Math.ceil(res.length / 4), //总页数
                    totalPage:res.totalPage,
                    isShow: true, //是否显示
                    count: res.totalPage<5?res.totalPage:5, // 每次显示的页码数
                    coping:true,
                    homePageText: "首页",
                    endPageText: "尾页",
                    prevPageText: "上一页",
                    nextPageText: "下一页",
                    callback: function (tempPage) { //当点击之后的回调函数，current为当前页码
                        $(".ui-pagination-page-item").click(function () {
                            tempPage = this.getAttribute("data-current");
                            // console.log(tempPage)
                            // showProject(tempPage);
                            $.ajax({
                                url:'/showArticleList',
                                type:'GET',
                                dataType:'JSON',
                                data:{
                                    page:tempPage
                                },
                                success:function (res) {
                                    var context = {article: res.articleList};
                                    var html = template('model',context);
                                    $('#article-list').html(html);
                                }
                            })
                        })
                    }
                });
            // }
        },
        error:function (res) {
            console.log("失败:" + res);
            // console.log(res);
        },
        complete:function (res) {
            console.log("完成");
            // console.log(res);
        }
    })
});

// 获得复选框选中的值
$(document).ready(function () {
    var arr = [];
    $("input[type='checkbox']").each(function (idx) {
        // if($("input[type='checkbox']").eq(idx).checked === true && arr.indexOf($("input[type='checkbox']").eq(idx).parentNode.childNodes[2].textContent) === -1){
        //     console.log($("input[type='checkbox']").eq(idx).parentNode);
        //     arr.push($("input[type='checkbox']").eq(idx).parentNode.childNodes[2].textContent);
        // }
        $("input[type='checkbox']").eq(idx).change(function () {
            if(this.checked === true){
                var val = this.parentNode.childNodes[2].textContent;
                // console.log(val);
                if(arr.indexOf(val) === -1){
                    arr.push(val);
                    console.log(arr);
                    $("#checkbox-value").attr('value',arr);
                    console.log($("#checkbox-value").attr('value'));
                }
            }
        });
    });
});