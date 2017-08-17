/*如有侵权行为请及时联系本网站，我们将及时处理相应内容*/
// JavaScript Document
//中文英文数字：^[a-zA-Z0-9\u4e00-\u9fa5]{3,15}$
function ltrim(s) //去左空格
{
    return s.replace(/^\s*/, "");
}

function rtrim(s)//去右空格
{
    return s.replace(/\s*$/, "");
}

function trim(s)//去处首尾空格
{
    return s.replace(/(^\s*)|(\s*$)/g, "");
}

function isEmpty(s)//非空效验
{
    if (s == null || trim(s) == "")
        return true;
    else
        return false;
}

function valueReplace(v) {   //多个引号转json
    v = v.toString().replace(new RegExp('(["\"])', 'g'), "\\\"");
    return v;
}

function valueReplacehtml(v) {   //多个引号转html
    v = v.toString().replace(new RegExp('([\"])', 'g'), "&quot;");
    return v;
}

//转义字符串中的\和"
function EnReplace(v) {   
    var b = '\\\\'; //转义\
    var c = '\\"'; //转义 "
    var nv = v.toString().replace(/\\/g, b).replace(/\"/g, c);
    return nv;
}

//反转义字符串中的\\和\",主要用在拼接html的字符串中
function DeReplace(v) {   
    var b = '\\'; //反转义\\
    var c = '&quot;'; //转义 \",用在拼接的html代码中
    var nv = v.toString().replace(/\\"/g, c).replace(/\\\\/g, b);
    return nv;
}


function len(s)//返回字符串长度，中文字符算作两个
{
    return s.replace(/[^\x00-\xff]/g, "aa").length;
}

function exitsSpace(s)//是否存在空格
{
    if (s.indexOf(" ") > -1)
        return true;
    else
        return false;
}

function checkTaxNo(s) {
    if (isEmpty(s))
        return false;
    s = trim(s);
    var p = /^([xX0-9]{1,18})$/;
    return p.test(s);
}

function isNumber(s)//数字
{

    return !isNaN(s);
}

function isNumber(s, len)//数字（两位小数） 0.xx或(123456789)xxxx.xx
{
    if (isEmpty(s))
        return false;
    var l = len - 1;
    var regex = new RegExp("^((0(.\d{1,2})?)|([1-9][0-9]{0," + l + "}(.\\d{1,2})?))$");
    return regex.test(s);
}

function isNumber(s, len, point) {
    if (isEmpty(s))
        return false;
    var l = len - 1;
    var regex = new RegExp("^((0(.\\d{1," + point + "})?)|([1-9]{1," + l + "}(.\\d{1," + point + "})?))$");
    return regex.test(s);
}

function isColor(s)//颜色值
{
    s = trim(s);
    if (s.length != 7) return false;
    return s.search(/\#[a-fA-F0-9]{6}/) != -1;
}

function isDigit(s)//判断是否为整数
{
    if (isEmpty(s))
        return false;
    s = trim(s);
    var p = /^[0-9]+$/;
    return p.test(s);
}

function isPositiveInt(s)//判断是正整数,并且不能也0开头
{
    if (isEmpty(s))
        return false;
    s = trim(s);
    var p = /^[1-9]+[0-9]*$/;
    return p.test(s);
}

function isPostCode(s) //邮编
{
    if (isEmpty(s))
        return false;
    s = trim(s);
    var p = /^[1-9]\d{5}$/;
    return p.test(s);
}

function isMobile(s)//验证11位手机号码
{
    if (isEmpty(s))
        return false;
    s = trim(s);
    var p = /^1[3|4|5|7|8][0-9]\d{8}$/; // 11 位手机
    return p.test(s);
}

function isPhone(s) //Phone
{
    s = trim(s);
    var p = /^((\(\d{3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}$/;
    return p.test(s);
}
function isPhonenew(s) //Phone
{
    s = trim(s);
    var p = /^(((13\d{1})|(15\d{1})|(18\d{1})){1}\d{8})$/;
    return p.test(s);
}
function isTellPhone(s) //电话号码
{
    s = trim(s);
    var p = /^(\d{3,4}-)?\d{7,9}(-[0-9]{3,4})?$/;
    return p.test(s);
}
function isMail(s)//验证邮箱格式
{
    if (isEmpty(s))
        return false;
    s = trim(s);
    //var p = /^[_\.0-9a-z-]+@([0-9a-z][0-9a-z-]+\.){1,4}[a-z]{2,3}$/i; 
    //var p = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
    var p = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
    return p.test(s);
}


function isCard(s) //身份证
{
    if (isEmpty(s))
        return false;
    s = trim(s);
    var p = /^\d{15}(\d{2}[xX0-9])?$/;
    return p.test(s);
}

function isURL(s) //URL
{
    if (isEmpty(s))
        return false;
    s = trim(s).toLowerCase();
    var p = /^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/;
    return p.test(s);
}

function isZip(s) //Zip
{
    if (isEmpty(s))
        return false;
    s = trim(s);
    var p = /^[1-9]\d{5}$/;
    return p.test(s);
}

function isEnglish(s) //English;
{
    if (isEmpty(s))
        return false;
    s = trim(s);
    var p = /^[A-Za-z]+$/;
    return p.test(s);
}
function isChinese(s) //简体中文
{
    if (isEmpty(s))
        return false;
    s = trim(s);
    var p = /^[\u0391-\uFFE5]+$/;
    return p.test(s);
}
function isChina(s) //验证是否为中文（简体与繁体）
{
    if (isEmpty(s))
        return false;
    s = trim(s);
    var p = /[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi;
    if (!p.exec(s))
        return false;
    else
        return true;
}

function strValidate(szString) {
    var reg = /['|\\|"]/g;
    var len = 0;
    try {
        len = szString.match(reg).length;
    }
    catch (e)
    { }
    if (len > 0)
        return false;
    else
        return true;
}

function isDoubleChar(s) //双字节 
{
    var p = /^[^\x00-\xff]+$/;
    return p.test(s);
}

function hasChineseChar(s) //含有中文字符 
{
    var p = /[^\x00-\xff]/;
    return p.test(s);
}

function limitLen(s, minLength, maxLength) //字符串界线范围
{
    if (isEmpty(s))
        return false;
    s = trim(s);
    if (s.toString().length > maxLength || s.toString().length < minLength)
        return false;
    else
        return true;
}

function limitLenMAX(s, maxLength) //字符串最大界线范围
{
    if (isEmpty(s))
        return false;
    s = trim(s);
    if (s.toString().length > maxLength)
        return false;
    else
        return true;
}

function limitLenMIN(s, minLength) //字符串最小界线范围
{
    if (isEmpty(s))
        return false;
    s = trim(s);
    if (s.toString().length < minLength)
        return false;
    else
        return true;
}

function isIPAddress(s) //检查IP是否合法
{
    if (isEmpty(s))
        return false;
    s = trim(s);
    var p = /^([1-9]\d{0,1}|1\d\d|2[0-2]\[0-3]|22[0-3])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
    if (!p.exec(s)) {
        return false;
    }
    else
        return true;
}

function isSMTP(s) //检查SMTP服务器地址//不要加smtp了  如：gmail.com
{
    if (isEmpty(s))
        return false;
    s = trim(s);
    var p = /^((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-zA-Z]{2,6}(?:\.[a-zA-Z]{2})?)$/;
    if (!p.exec(s)) {
        return false;
    }
    else
        return true;
}

function IsWebAddress(s) //检查服务器WEB是否合法
{
    if (isEmpty(s))
        return true;
    s = trim(s);
    var p = /^(http:\/\/([1-9]\d{0,1}|1\d\d|2[0-2]\[0-3]|22[0-3])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5]):\d{1,5})$/;
    if (!p.exec(s)) {
        return false;
    }
    else
        return true;
}

function IsPortValidate(s) //端口号效验
{
    if (isEmpty(s))
        return false;
    s = trim(s);
    if (!isDigit(s)) {
        return false;
    }
    else if (parseInt(s, 10) <= 0 || parseInt(s, 10) > 65535) {
        return false;
    }
    else
        return true;
}

function ContainSpecialChar(s) {
    var result = s.search(/['"]/);
    return result != -1;
}



//转换null为""
function ConvertNull(obj) {
    if (obj == null)
        return "";
    return obj;
}

//判断字符串是否为Guid.Empty
function IsGuidEmpty(s) {
    if (s == '00000000-0000-0000-0000-000000000000')
        return true;
    return false;
}

function formatJSONDate(s, type) //日期-格式服务器JOSN数据
{
    if (this.isEmpty(s))
        return "";
    s = this.trim(s);
    var d = eval('new ' + s.replace('/', '', 'g').replace('/', '', 'g'));
    var _year = d.getFullYear();
    var _month = (d.getMonth() + 1) < 10 ? "0" + (d.getMonth() + 1) : (d.getMonth() + 1);
    var _day = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();
    var _hours = d.getHours() < 10 ? "0" + d.getHours() : d.getHours();
    var _minutes = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
    var _seconds = d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds();
    switch (type) {
        case 1: //yyyy-MM-dd
            return _year + "-" + _month + "-" + _day;
        case 2: //yyyy/MM/dd HH:mm:ss
            return _year + "/" + _month + "/" + _day + " " + _hours + ":" + _minutes + ":" + _seconds;
        case 3: //yyyy-MM-dd HH:mm:ss
            return _year + "-" + _month + "-" + _day + " " + _hours + ":" + _minutes + ":" + _seconds;
        case 4: //yyyy-MM-dd HH:mm
            return _year + "-" + _month + "-" + _day + " " + _hours + ":" + _minutes;
        case 5: //yyyy年MM月dd日
            return _year + "年" + _month + "月" + _day + "日";
        default:
            return "";
    }
}

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
// 例子： 
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

function getIFrameDOM(id) {
    var ofrm1 = document.getElementById(id).document;
    if (ofrm1 == undefined) {
        ofrm1 = document.getElementById(id).contentWindow.document;
    }
    else {
        ofrm1 = document.frames[id].document;
    }
    return ofrm1;
}