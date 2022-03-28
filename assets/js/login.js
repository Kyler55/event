$(function() {
    //点击"去注册账号"的链接
    $('#link_reg').on('click', function() {
        $('.login-box').hide();
        $('.reg-box').show();
    });
    //点击"去注册账号"的链接
    $('#link_login').on('click', function() {
        $('.login-box').show();
        $('.reg-box').hide();
    });
    //表单验证
    //从 layui中获取form对象
    let form = layui.form;
    let layer = layui.layer;
    //通过form.verify()函数自定义校验规则
    form.verify({
            //自定义一个pwd的密码校验规则
            pwd: [
                /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
            ],
            // 校验两次密码是否一致
            repwd: function(value) {
                //通过形参拿到 确认密码框里的值
                //再拿到密码框里的值
                // 然后进行以此判断
                // 如果判断失败，就return一个提示信息
                let pwd = $('.reg-box [name=password]').val();
                if (value !== pwd) {
                    return '两次输入的密码不一致'
                }
            }

        })
        //监听注册表单的提交事件
    $('#form_reg').on('submit', function(e) {
            // 阻止form表单的默认请求
            e.preventDefault();
            // 发送AJAX的POST请求
            let data = {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val()
            };
            $.post('/api/reguser', data, function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('注册成功，请登录~');
                $('#link_login').click()
            })
        })
        //监听登录表单的提交事件
    $('#form_login').submit(function(e) {
        e.preventDefault();
        $.ajax({
                url: '/api/login',
                method: 'POST',
                // 快速获取表单中的数据
                data: $(this).serialize(),
                success: function(res) {
                    if (res.status !== 0) {
                        // return layer.msg('登陆失败！')
                        return layer.msg(res.message)
                    }
                    layer.msg('登录成功');
                    // 将成功后得到的token字符串，保存到localStorage中
                    localStorage.setItem('token', res.token)
                        // 跳转到后台首页
                    location.href = '/index.html'
                }
            })
            // let data1 = {
            //     username: $('#form_login [name=username]').val(),
            //     password: $('#form_login [name=password]').val()
            // };
            // $.post('http://www.liulongbin.top:3007/api/login', data1, function(res) {
            //     if (res.status !== 0) {
            //         return layer.msg('登录失败！');
            //     }
            //     layer.msg('登录成功');
            //     //    将成功后得到的token字符串，保存到localStorage中
            //     localStorage.setItem('token', res.token)
            //         // 跳转到后台首页
            //     location.href = '/index.html'
            // })
    })
})