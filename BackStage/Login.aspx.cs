using ShangYe.MH.Logic;
using ShangYe.MH.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace WebSite.BackStage
{
    public partial class Login : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void Button1_Click(object sender, EventArgs e)
        {
            //string txtUser = "admin";// txt_DefaultName.Text.Trim();
            string txtUser = Request["txt_DefaultName"].Trim();
            string pwd = Request["txt_DefaultPwd"].Trim();
            //string txtPwd = FormsAuthentication.HashPasswordForStoringInConfigFile(txt_DefaultPwd.Text, "md5");
            string txtPwd = FormsAuthentication.HashPasswordForStoringInConfigFile(pwd, "md5");
            BackStageBll bll = new BackStageBll();
            Sy_MH_Users suu = bll.LoginIn(txtUser, txtPwd);
            if (suu == null)
            {
                ClientScript.RegisterStartupScript(this.GetType(), "", "<script>$.tips.Alert.Error({ Title: \"系统提示\", Content: \"您输入的用户名或密码错误，请重新输入\", IsCancel: \"no\", OKClass: \"bot_confirm\" });</script>");
                return;
            }
            Session["adminGuid"] = suu.M_ID;
            Response.Redirect("Index.aspx");
        }
    }
}