import {G} from "./G.module";
class Login{
    username:String;
    password:String;
    code:String;
    constructor(){
        this.username = "";
        this.password = "";
        this.code = "";
    }
    showError(info){
        $("#errorInfo").find("span").html(info).end().removeClass("display-hide");
    }
    hideError(){
        $("#errorInfo").addClass("display-hide");
    }
    setCookie(name, value, expireHours){
        let cookieString = name + "=" + encodeURIComponent(value);

        if(expireHours > 0){
            let date = new Date();
            date.setTime(date.getTime() + expireHours*3600*1000);
            cookieString = cookieString + ";expires=" + date.toUTCString() + ";path=/";
        }
        document.cookie = cookieString;
    }
    getCookie(name){
        let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if(arr = document.cookie.match(reg)){
            return decodeURIComponent(arr[2]);
        }else{
            return null;
        }
    }
    deleteCookie(name){
        let date = new Date();
        date.setTime(date.getTime() - 10000);
        document.cookie = name + "=v;expires=" + date.toUTCString();
    }
    submit(){

    }
    bindEvent(){
        let self = this,
            loginForm = $("#loginForm"),
            loginBtn = loginForm.find("#loginBtn"),
            closeBtn = loginForm.find("#close"),
            sendCode = loginForm.find("#sendCode");
        sendCode.on("click", function () {
            let t = 60, timer = null, that = $(this);
            timer = setInterval(function () {
                if(t > 0){

                    that.html(t + "''").addClass("disabled");
                    t--;
                }else{
                    clearInterval(timer);
                    that.html("发送短信验证码").removeClass("disabled")
                }
            }, 1000)
        });
        closeBtn.on("click", function () {
            self.hideError();
        });
        loginForm.find("input").on("change keyup paste", function () {
            let value = $(this).val(), name = $(this).attr("name");
            if(value){
                self[name] = value;
            }
        });
        loginBtn.on("click", function () {
            if(!self.username){
                return self.showError("用户名不能为空！");
            }
            if(!self.password){
                return self.showError("密码不能为空！");
            }
            if(!self.code){
                return self.showError("验证码不能为空！");
            }
            $.ajax({
                url:G.serverUrl + "/mock/login.json",
                method:"post",
                data:{
                    username: self.username,
                    password: self.password,
                    code: self.code,
                },
                success:function (data) {
                    if(data.success){
                        self.setCookie("username", self.username, 10);
                        window.location.href =  window.location.origin + window.location.pathname.replace("login\.html","") + "index.html";
                    }else{
                        self.showError(data.msg)
                    }
                }
            })

        });

    }
    init(){
        this.bindEvent();
    }
}
var applogin = new Login();
applogin.init();
