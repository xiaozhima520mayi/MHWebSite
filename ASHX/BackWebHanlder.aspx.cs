using ShangYe.FrameWork.Helper;
using ShangYe.MH.Extend;
using ShangYe.MH.Logic;
using ShangYe.MH.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace WebSite.ASHX
{
    public partial class BackWebHanlder : System.Web.UI.Page
    {
        BackStageBll bll = new BackStageBll();
        protected void Page_Load(object sender, EventArgs e)
        {

            Response.Expires = 0;
            Response.Clear();
            string action = Request["action"];

            switch (action)
            {
                case "getTryProList":
                    GetTryProList();
                    break;
                case "getMessageList":
                    GetMessageList();
                    break;
                case "getActivityList":
                    GetMessageList();
                    break;

                default: break;
            }
        }

        /// <summary>
        /// 获取所有申请产品试用列表
        /// </summary>
        private void GetTryProList()
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
                    search.SortField = "M_ApplyTime";
                }
                string xml = bll.GetTryProductXml(search, out recordCount);
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
        
        /// <summary>
        /// 获取所有在线留言列表
        /// </summary>
        private void GetMessageList()
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
                string xml = bll.GetMessageXml(search, out recordCount);
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
    }
}