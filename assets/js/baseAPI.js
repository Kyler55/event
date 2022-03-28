// ，每次调用 $.get()或 $.post()或 $.ajax()的时候
// 都会先调ajaxPrefilter()这个函数
// 在函数可以帮我们拿到ajax里的配置对象
$.ajaxPrefilter(function(options) {
    // 再发起真正的AJAX请求之前，统一拼接请求根路径
    options.url = 'http://www.liulongbin.top:3007' + options.url
        // 统一为有权限的接口，设置 headers 请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    // 全局统一挂载 complete 回调函数
    options.complete = function(res) {
        // console.log('执行了 complete 回调：')
        // console.log(res)
        // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 1. 强制清空 token
            localStorage.removeItem('token')
                // 2. 强制跳转到登录页面
            location.href = '/login.html'
        }
    }
})