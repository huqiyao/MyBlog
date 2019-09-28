// var pageNum;

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
        url: '/showArticleList',
        type: 'GET',
        dataType: 'JSON',
        success: function (res) {
            console.log("成功");
            console.log(res);
            // console.log((res.articleList)[1].content);
            // if(res.index === '2'){
            var context = {article: res.articleList};
            var html = template('model', context);
            $('#article-list').html(html);
            $(".pagination").pagination({
                currentPage: res.currentPage,   // 当前页
                // totalPage: Math.ceil(res.length / 4), //总页数
                totalPage: res.totalPage,
                isShow: true, //是否显示
                count: res.totalPage < 5 ? res.totalPage : 5, // 每次显示的页码数
                coping: true,
                homePageText: "首页",
                endPageText: "尾页",
                prevPageText: "上一页",
                nextPageText: "下一页",
                callback: function (tempPage) {
                    console.log(tempPage);
                    $.ajax({
                        url: '/showArticleList?' + "page=" + tempPage,
                        type: 'GET',
                        dataType: 'JSON',
                        // data: {
                        //     page: tempPage
                        // },
                        success: function (res) {
                            // res.articleList.tag = res.articleList.tag.split(',');
                            // console.log(res.articleList.tag);
                            var context = {article: res.articleList};
                            var html = template('model', context);
                            $('#article-list').html(html);
                        }
                    })
                }
            });
            // }
        },
        error: function (res) {
            console.log("失败:" + res);
            // console.log(res);
        },
        complete: function (res) {
            console.log("完成");
            // console.log(res);
        }
    })
});

/**
 * 获得复选框选中的值
 **/
var arr = [];
$(document).ready(function () {
    // console.log(($("input[type='checkbox']")[0].checked));
    $("input[type='checkbox']").each(function (idx) {
        // if($("input[type='checkbox']").eq(idx).checked === true && arr.indexOf($("input[type='checkbox']").eq(idx).parentNode.childNodes[2].textContent) === -1){
        //     console.log($("input[type='checkbox']").eq(idx).parentNode);
        //     arr.push($("input[type='checkbox']").eq(idx).parentNode.childNodes[2].textContent);
        // }
        // console.log("元素是:");
        console.log(this.checked);
        if(this.checked===true){
            arr.push(this.parentNode.childNodes[2].textContent)
        }
        $("input[type='checkbox']").eq(idx).change(function () {
            console.log("这个");
            console.log(this);
            var val = this.parentNode.childNodes[2].textContent;
            if (this.checked === true) {
                // console.log(val);
                if (arr.indexOf(val) === -1) {
                    arr.push(val);
                    console.log(arr);
                    $("#checkbox-value").attr('value', arr);
                    console.log($("#checkbox-value").attr('value'));
                }
            }else{
                if(arr.indexOf(val) !== -1){
                    arr.splice(arr.indexOf(val), 1);
                    console.log(arr);
                }
            }
        });
    });
});


// 改变article-head的背景颜色
// $(document).ready(function () {
//     // $('.article-head').each(function () {
//     //     var color = ["#b2dba1","#FFB6C1","#FFFACD","#87CEFA"];
//     //     var idx = Math.floor(Math.random()*4);
//     //     console.log($(this));
//     //     // $(this).style.backgroundColor = color[idx];
//     // });
//     console.log($('.article-item'));
// });
// var elem = $('.article-item');
// console.log(elem)
function deleteArticle(id,index) {
    // console.log(id);
    $.ajax({
        url:'/deleteArticle/' + id,
        type:'delete',
        success:function (res) {
            console.log("删除成功：");
            console.log(res);
            console.log(index);
            // console.log($('.article-item').eq(index));
            // $('.article-item').eq(index).remove();
            // console.log($('.ui-pagination-page-item ',$('.active')));
            var page = $(".ui-pagination-page-item.active").attr('data-current')?$(".ui-pagination-page-item.active").attr('data-current'):1;
            console.log(page);
            $.ajax({
                url: '/showArticleList',
                type: 'GET',
                dataType: 'JSON',
                data: {
                    page: page
                },
                success: function (res) {
                    var context = {article: res.articleList};
                    var html = template('model', context);
                    $('#article-list').html(html);
                    $(".pagination").pagination({
                        currentPage: res.currentPage,
                        totalPage: res.totalPage,
                        isShow: true,
                        count: res.totalPage < 5 ? res.totalPage : 5,
                        coping: true,
                        homePageText: "首页",
                        endPageText: "尾页",
                        prevPageText: "上一页",
                        nextPageText: "下一页"
                    });
                }
            })
        },
        error:function (res) {
            console.log("删除失败");
        },
        complete:function (res) {
            console.log("完成：" + res);
        }
    })
}

function updateArticle(id) {
    console.log(id);
    var title = $('#article-title').attr('value');
    var tag = arr.toString();
    var content =  $("[name='editor-html-code']")[0].innerText;
    var source_code = $("[name='editor-markdown-doc']")[0].innerText;
        // editor-markdown-doc
    console.log(tag);
    console.log(title);
    console.log(content);
    console.log(source_code);
    $.ajax({
        url:'/updateArticle/' + id,
        type: 'POST',
        dataType: 'JSON',
        data: {
            title:title,
            tag:tag,
            content:content,
            source_code:source_code
        },
        success:function (res) {
            console.log(res);
        },
        error:function () {
            console.log("失败啦");
        },
        complete:function (res) {
            console.log("完成啦");
        }
    })
}