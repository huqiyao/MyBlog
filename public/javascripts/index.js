// $(".pagination").pagination({
//     currentPage: res.currentPage,   // 当前页
//     // totalPage: Math.ceil(res.length / 4), //总页数
//     totalPage: res.totalPage,
//     isShow: true, //是否显示
//     count: res.totalPage < 5 ? res.totalPage : 5, // 每次显示的页码数
//     coping: true,
//     homePageText: "首页",
//     endPageText: "尾页",
//     prevPageText: "上一页",
//     nextPageText: "下一页",
//     callback: function (tempPage) {
//         console.log(tempPage);
//         $.ajax({
//             url: '/showArticleList',
//             type: 'GET',
//             dataType: 'JSON',
//             data: {
//                 page: tempPage
//             },
//             success: function (res) {
//                 // res.articleList.tag = res.articleList.tag.split(',');
//                 // console.log(res.articleList.tag);
//                 var context = {article: res.articleList};
//                 var html = template('model', context);
//                 $('#article-list').html(html);
//             }
//         })
//     }
// });