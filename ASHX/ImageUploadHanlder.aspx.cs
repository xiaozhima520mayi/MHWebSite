using Newtonsoft.Json.Linq;
using ShangYe.FrameWork.Helper;
using ShangYe.MH.Extend;
using ShangYe.MH.Logic;
using ShangYe.MH.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Web;

namespace WebSite.ASHX
{
    public partial class ImageUploadHanlder : System.Web.UI.Page
    {
        BackStageBll bll = new BackStageBll();
        protected void Page_Load(object sender, EventArgs e)
        {

            Response.Expires = 0;
            Response.Clear();
            string action = Request["action"];

            switch (action)
            {
                case "GetImageList":
                    GetImageList();
                    break;
                default: break;
            }
        }

        #region 上传
       private void GetImageList()
        {
            try
            {
                var currentPage = ConvertToData.StringToInt(Request["page"]);
                var pageSize = ConvertToData.StringToInt(Request["rows"]);
                string order = Request["sidx"];
                string orderType = Request["sord"];
                var searchValue = Request["search"];
                int recordCount = 0;
                SearchInfo search = new SearchInfo();
                search.CurrentPage = currentPage;
                search.PageSize = pageSize;
                if (currentPage.HasValue)
                    search.CurrentPage = currentPage - 1;
                if (!string.IsNullOrEmpty(order))
                {
                    search.SortType = ConvertToData.ConvertSortType(orderType + "");
                    search.SortField = order;
                }
                else
                {
                    search.SortType = ConvertToData.ConvertSortType("desc");
                    search.SortField = "M_MsgTime";
                }
                string xml = bll.GetImageList(search, out recordCount);
                Response.ContentType = "text/xml";
                Response.Charset = "UTF-8";
                Response.Clear();
                Response.Write(xml);
            }
            catch (Exception ex)
            {
                LogHelper.LogError(MethodBase.GetCurrentMethod().ReflectedType.FullName, MethodBase.GetCurrentMethod().Name, ex);
            }
        }
        #endregion


    }
}