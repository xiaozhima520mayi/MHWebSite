using ShangYe.MH.Extend;
using System; 

namespace WebSite
{
    public partial class test : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void btnSendEmail_Click(object sender, EventArgs e)
        {
            SendEmail email = new SendEmail();
            email.SendEmailFJ("e://test.docx","简历");
        }
    }
}