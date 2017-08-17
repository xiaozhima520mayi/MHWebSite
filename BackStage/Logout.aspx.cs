using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace WebSite.BackStage
{
    public partial class Logout : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                if (Session["adminGuid"] != null)
                {
                    Session.Remove("adminGuid");
                    Response.Write("<script>top.location.href='Login.aspx'</script>");
                }
            }
        }
    }
}