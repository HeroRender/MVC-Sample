using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using Newtonsoft.Json;
using static Sample.Models.GenericModel;

namespace Sample.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Sample = JsonConvert.SerializeObject(sampleCall(),Formatting.Indented);
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        [HttpGet]
        public JsonResult sampleCall()
        {
            return QueryToJson("SELECT TOP(10) * FROM dbo.Employees");
        }

        // Eto yung function dun sa cloud bio
        private JsonResult QueryToJson(string QUERY, string ErrorReturn = null)
        {
            var model = new GenericReturn();
            try
            {
                string connectionString = ConfigurationManager.ConnectionStrings["dbAttendance"].ConnectionString;
                using (SqlConnection conn = new SqlConnection(connectionString))
                {
                    SqlCommand sqlCMD = new SqlCommand(QUERY, conn);
                    conn.Open();
                    JavaScriptSerializer j = new JavaScriptSerializer();
                    model.data = j.Deserialize(sqlDatoToJson(sqlCMD.ExecuteReader()), typeof(object));
                }
            }
            catch (Exception e)
            {
                if (ErrorReturn == null) model.data = e.Message;
                else model.data = ErrorReturn;
            }

            return Json(model, JsonRequestBehavior.AllowGet);
        }

        private string sqlDatoToJson(SqlDataReader dataReader)
        {
            var dataTable = new System.Data.DataTable();
            dataTable.Load(dataReader);
            string JSONString = string.Empty;
            JSONString = JsonConvert.SerializeObject(dataTable);

            return JSONString;
        }


    }
}