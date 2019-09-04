$(document).ready(function() {
    $('#fullPage').fullpage({
        resize: false, // resize窗口缩放功能，根据浏览器窗口的大小改变body的font-size
        loopBottom: false,
        navigation:true,
        navigationPosition: 'right',
        anchors : ['page1','page2','page3','page4']
    });
});
//
// $(document).ready(function() {
//     $('#fullPage').pagepiling({
//         resize: false, // resize窗口缩放功能，根据浏览器窗口的大小改变body的font-size
//         // css3: true,
//     });
// });