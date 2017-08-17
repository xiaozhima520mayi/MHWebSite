//把读出来的json格式时间传入这个方法内  
function convertymd(date)
{
    var da = new Date(parseInt(date.replace("/Date(", "").replace(")/", "").split("+")[0]));
    return da.getFullYear() + "-" + strlength(da.getMonth() + 1) + "-" + strlength(da.getDate());
}

function convertymdhms(date)
{
    var da = new Date(parseInt(date.replace("/Date(", "").replace(")/", "").split("+")[0]));
    return da.getFullYear() + "-" + strlength(da.getMonth() + 1) + "-" + strlength(da.getDate()) + " " + strlength(da.getHours()) + ":" + strlength(da.getSeconds()) + ":" + strlength(da.getMinutes());
}


function strlength(str)
{

    if (str < 10)
        return "0" + str;
    else
        return str;

}