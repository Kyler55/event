// ，每次调用 $.get()或 $.post()或 $.ajax()的时候
// 都会先调ajaxPrefilter()这个函数
// 在函数可以帮我们拿到ajax里的配置对象
$.ajaxPrefilter(function(options) {
    // 再发起真正的AJAX请求之前，统一拼接请求根路径
    options.url = 'http://www.liulongbin.top:3007' + options.url
})