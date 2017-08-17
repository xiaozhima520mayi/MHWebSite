using Newtonsoft.Json.Linq;
using ShangYe.FrameWork.Helper;
using ShangYe.MH.Extend;
using ShangYe.MH.Logic;
using ShangYe.MH.Model;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Web;

namespace WebSite.ASHX
{
    public partial class ProductHanlder : System.Web.UI.Page
    {
        ProductBll proBll = new ProductBll();
        protected void Page_Load(object sender, EventArgs e)
        {
            #region 页面定义
            Response.Expires = 0;
            Response.Clear();
            //Response.AddHeader("pragma", "no-cache");
            //Response.AddHeader("cache-control", "");
            //Response.CacheControl = "no-cache";
            //Response.Charset = "UTF-8";
            //Response.ContentType = "text/plain";
            string action = Request["action"];
            int id = Convert.ToInt32(Request["id"]);
            string ids = Request["ids"];
            #endregion

            switch (action)
            {
                case "getProduct":
                    GetProduct();
                    break;
                case "applyTry":
                    ApplyTry();
                    break;
                case "addMessage":
                    AddMessage();
                    break;
                case "sendEmail":
                    UsersSendEmail();
                    break;
                case "picTure":
                    GetImageList();
                    break;
                case "confirm":
                    ApplicationConfirm(id);
                    break;
                case "btnclick":
                    ApplicationClick(id);
                    break;
                case "allDel":
                    AllDelete(ids);
                    break;
                case "messagedel":
                    AllDel(ids);
                    break;
                default: break;
            }
        }

        private void AllDelete(string ids)
        {
            List<int> allId = new List<int>();
            foreach (var item in ids.Split(','))
            {
                allId.Add(int.Parse(item));
            }

            proBll.DeleteAll(allId);
        }

        private void AllDel(string ids)
        {
            List<int> allId = new List<int>();
            foreach (var item in ids.Split(','))
            {
                allId.Add(int.Parse(item));
            }

            proBll.DelAll(allId);
        }
        private void ApplicationConfirm(int id)
        {
            try
            {
                Sy_MH_TryProduct product = proBll.GetFirst(id);
                product.M_Status = 1;
                product.M_ProccessTime = DateTime.Now;
                proBll.UpdateProduct(product);
            }
            catch (Exception ex)
            {
                Response.Write(EnumCommon.ErrorCategory.Exception.ToString());
                LogHelper.LogError(MethodBase.GetCurrentMethod().ReflectedType.FullName, MethodBase.GetCurrentMethod().Name, ex);

            }
            finally
            {

            }
        }
        #region 玩在上业
        /// <summary>
        /// 获取玩在上业图片
        /// </summary>
        private void GetImageList()
        {
            StringBuilder szRet = new StringBuilder();
            try
            {
                List<Sy_MH_Picture> list = proBll.GetImageList();
                if (list == null || list.Count == 0)
                {
                    szRet.Append("{\"Message\":\"" + EnumCommon.ErrorCategory.NotFound + "\"}");
                    return;
                }

                var jsonStr = new JArray(
                     from p in list
                     select new JObject(
                             new JProperty("title", p.M_Title),
                             new JProperty("url", p.M_FileUrl)
                         )).ToString();
                szRet.Append("{\"Message\":\"1\",\"records\":" + jsonStr + "}");
            }
            catch (Exception ex)
            {
                szRet.Append("{\"Message\":\"" + EnumCommon.ErrorCategory.SaveFail + "\"}");
                LogHelper.LogError(MethodBase.GetCurrentMethod().ReflectedType.FullName, MethodBase.GetCurrentMethod().Name, ex);
            }
            Response.Write(szRet.ToString());
        }
        #endregion

        #region 发送简历 
        /// <summary>
        /// 发送简历
        /// </summary>
        private void UsersSendEmail()
        {
            try
            {
                SendEmail email = new SendEmail();
                string folderPath = Server.MapPath("~/TempUpload");
                var jobName = Request["job"];
                if (!Directory.Exists(folderPath))
                    Directory.CreateDirectory(folderPath);

                if (Request.Files.Count == 0)
                {
                    Response.Write("-2");
                    //Response.End();
                    //HttpContext.Current.ApplicationInstance.CompleteRequest();
                }
                else
                {
                    HttpPostedFile postFile = Request.Files[0];
                    var nameList = postFile.FileName.Split(new string[] { "\\" }, StringSplitOptions.RemoveEmptyEntries);
                    string fileName = nameList.Last();
                    string fileNameExt = Path.GetExtension(fileName);
                    List<string> extList = new List<string>();
                    extList.Add(".DOC");
                    extList.Add(".DOCX");
                    extList.Add(".PDF");
                    if (!extList.Contains(fileNameExt.ToUpper()))
                    {
                        Response.Write("-1");
                        //HttpContext.Current.ApplicationInstance.CompleteRequest();
                    }
                    else
                    {
                        //string savePath = folderPath + "\\" + (DateTime.Now.ToString("yyyyMMdd") + new Random().Next(9999)) + fileNameExt;
                        string savePath = folderPath + "\\" + fileName;
                        postFile.SaveAs(savePath);
                        var result = email.SendEmailFJ(savePath, fileName.Replace(fileNameExt, "") + "-" + jobName + "-公司门户投递简历");
                        if (result) Response.Write("1");
                        else Response.Write("0");
                        //Response.End();
                        //HttpContext.Current.ApplicationInstance.CompleteRequest();
                    }
                }
            }
            catch (Exception ex)
            {
                Response.Write(ex.Message);
                Response.End();
                //HttpContext.Current.ApplicationInstance.CompleteRequest();
            }
        }
        #endregion

        #region 申请
        /// <summary>
        /// 申请在线试用
        /// </summary>
        private void ApplyTry()
        {
            try
            {
                //var txtName = Request.Form["txtName"] + "";
                //var txtPhone = Request.Form["txtPhone"] + "";
                //var txtEMail = Request.Form["txtEMail"] + "";
                //var txtSchool = Request.Form["txtSchool"] + "";
                //var txtDept = Request.Form["txtDept"] + "";
                //var txtJob = Request.Form["txtJob"] + "";
                var txtName = Request["txtName"] + "";
                var txtPhone = Request["txtPhone"] + "";
                var txtEMail = Request["txtEMail"] + "";
                var txtSchool = DefendXss(Request["txtSchool"] + "");
                var txtDept = Request["txtDept"] + "";
                var txtJob = Request["txtJob"] + "";
                var proList = Request["proList"] + "";
                if (string.IsNullOrEmpty(txtName) || string.IsNullOrEmpty(txtPhone) || string.IsNullOrEmpty(txtEMail))
                {
                    Response.Write("请输入必填项");
                    Response.End();
                }
                else if (txtName.Length > 40)
                {

                    Response.Write("姓名长度最多40位");
                    Response.End();
                }
                else
                {
                    if (string.IsNullOrEmpty(proList) || string.IsNullOrEmpty(proList.Remove(proList.Length - 1, 1)))
                    {
                        Response.Write("请选择您的需求");
                        Response.End();
                    }
                    else
                    {
                        Sy_MH_TryProduct model = new Sy_MH_TryProduct()
                        {
                            M_Name = txtName,
                            M_Phone = txtPhone,
                            M_EMail = txtEMail,
                            M_School = txtSchool,
                            M_Dept = txtDept,
                            M_Job = txtJob,
                            M_Status = (int)EnumCommon.MessageStatus.留言,
                            M_IP = ClientHelper.ClientIP,
                            M_ApplyTime = DateTime.Now,
                            M_ProductIDs = proList.Remove(proList.Length - 1, 1)
                        };
                        var result = proBll.AddTryProduct(model);
                        Response.Write(result ? "1" : EnumCommon.ErrorCategory.SaveFail.ToString());
                    }
                }
            }
            catch (Exception ex)
            {
                Response.Write(EnumCommon.ErrorCategory.Exception.ToString());
                LogHelper.LogError(MethodBase.GetCurrentMethod().ReflectedType.FullName, MethodBase.GetCurrentMethod().Name, ex);
            }
        }


        /// <summary>
        /// 在线留言
        /// </summary>
        private void AddMessage()
        {
            try
            {
                //var txtAName = DefendXss(Request.Form["txtAName"] + "");
                //var txtAPhone = DefendXss(Request.Form["txtAPhone"] + "");
                //var txtAEMail = DefendXss(Request.Form["txtAEMail"] + "");
                //var txtASchool = DefendXss(Request.Form["txtASchool"] + "");
                //var txtAJob = DefendXss(Request.Form["txtAJob"] + "");
                //var txtATitle = DefendXss(Request.Form["txtATitle"] + "");
                //var txtMessage = DefendXss(Request.Form["txtMessage"] + "");
                var txtAName = DefendXss(Request["txtAName"] + "");
                var txtAPhone = DefendXss(Request["txtAPhone"] + "");
                var txtAEMail = DefendXss(Request["txtAEMail"] + "");
                var txtASchool = DefendXss(Request["txtASchool"] + "");
                var txtAJob = DefendXss(Request["txtAJob"] + "");
                var txtATitle = DefendXss(Request["txtATitle"] + "");
                var txtMessage = DefendXss(Request["txtMessage"] + "");
                if (string.IsNullOrEmpty(txtAName) || string.IsNullOrEmpty(txtAPhone) || string.IsNullOrEmpty(txtMessage))
                {
                    Response.Write("请输入必填项");
                    Response.End();
                }
                else if (txtAName.Length > 40)
                {

                    Response.Write("姓名长度最多40位");
                    Response.End();
                }
                else
                {
                    Sy_MH_Message model = new Sy_MH_Message()
                    {
                        M_Name = txtAName,
                        M_Phone = txtAPhone,
                        M_EMail = txtAEMail,
                        M_School = txtASchool,
                        M_Title = txtATitle,
                        M_Job = txtAJob,
                        M_Status = (int)EnumCommon.TryProStatus.申请,
                        M_IP = ClientHelper.ClientIP,
                        M_MsgTime = DateTime.Now,
                        M_Context = txtMessage
                    };
                    var result = proBll.AddMessage(model);
                    Response.Write(result ? "1" : EnumCommon.ErrorCategory.SaveFail.ToString());
                }
            }
            catch (Exception ex)
            {
                Response.Write(EnumCommon.ErrorCategory.Exception.ToString());
                LogHelper.LogError(MethodBase.GetCurrentMethod().ReflectedType.FullName, MethodBase.GetCurrentMethod().Name, ex);
            }
        }
        private void ApplicationClick(int id)
        {
            try
            {
                Sy_MH_Message smm = proBll.Get(id);
                smm.M_Status = 1;
                smm.M_ProccessTime = DateTime.Now;
                proBll.Update(smm);
            }
            catch (Exception ex)
            {
                Response.Write(EnumCommon.ErrorCategory.Exception.ToString());
                LogHelper.LogError(MethodBase.GetCurrentMethod().ReflectedType.FullName, MethodBase.GetCurrentMethod().Name, ex);

            }
            finally
            {

            }
        }
        #endregion

        #region 公用
        /// <summary>
        /// Ip地区
        /// </summary>
        /// <param name="context"></param>
        public void AreaSchoolIp(HttpContext context)
        {
            string ipadd = (context.Request["ip"]);
            string qqwryUrl = System.Web.HttpContext.Current.Request.PhysicalApplicationPath + "Resources\\Data\\qqwry.dat";
            IpAreaSeach ip = new IpAreaSeach(qqwryUrl);
            context.Response.Write(ip.GetIPLocation(ipadd).country);
        }

        /// <summary>
        /// 获取产品信息
        /// </summary>
        public void GetProduct()
        {
            StringBuilder szRet = new StringBuilder();
            try
            {
                List<Sy_MH_Product> list = proBll.GetProductList();
                if (list == null || list.Count == 0)
                {
                    szRet.Append("{\"Message\":\"" + EnumCommon.ErrorCategory.NotFound + "\"}");
                    return;
                }

                var jsonStr = new JArray(
                     from p in list
                     select new JObject(
                             new JProperty("pID", p.M_ID),
                             new JProperty("pName", p.M_Name)
                         )).ToString();
                szRet.Append("{\"Message\":\"1\",\"records\":" + jsonStr + "}");
            }
            catch (Exception ex)
            {
                szRet.Append("{\"Message\":\"" + EnumCommon.ErrorCategory.SaveFail + "\"}");
                LogHelper.LogError(MethodBase.GetCurrentMethod().ReflectedType.FullName, MethodBase.GetCurrentMethod().Name, ex);
            }
            Response.Write(szRet.ToString());
        }

        public string DefendXss(string str)
        {
            str = str.Replace("<", "&lt").Replace(">", "&gt");
            return str;
        }
        #endregion
    }
}