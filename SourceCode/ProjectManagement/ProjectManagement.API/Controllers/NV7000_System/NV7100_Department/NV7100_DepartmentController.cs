using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ProjectManagement.Business;
using ProjectManagement.Business.Entity;
using ProjectManagement.Business.Projects;


namespace API.Controllers
{
    [RoutePrefix("api/department")]
    public class NV7100_DepartmentController : ApiController
    {
        /// <summary>
        /// Hàm lấy danh sách phòng/ban theo điều kiện tìm kiếm
        /// </summary>
        /// <param name="dept"></param>
        /// <returns></returns>
        [Route("SearchDept")]
        [HttpPost]
        public HttpResponseMessage SearchDept(DepartmentEntity dept)
        {
            NV7100_DepartmentBusiness NV7100_DepartmentBusiness = new NV7100_DepartmentBusiness();
            ResponseMessage response = NV7100_DepartmentBusiness.SearchDepartment(dept);

            if (response.IsSuccess)
            {
                return Request.CreateResponse(HttpStatusCode.OK, response.Data);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, response.MessageText);
            }
        }

        [Route("GetAllDept")]
        [HttpPost]
        public HttpResponseMessage GetAllDept()
        {
            NV7100_DepartmentBusiness NV7100_DepartmentBusiness = new NV7100_DepartmentBusiness();
            ResponseMessage response = NV7100_DepartmentBusiness.GetAllDepartment();

            if (response.IsSuccess)
            {
                return Request.CreateResponse(HttpStatusCode.OK, response.Data);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, response.MessageText);
            }
        }

        [Route("DeleteDept")]
        [HttpPost]
        public HttpResponseMessage DeleteDept(DepartmentEntity dept)
        {
            NV7100_DepartmentBusiness NV7100_DepartmentBusiness = new NV7100_DepartmentBusiness();
            ResponseMessage response = NV7100_DepartmentBusiness.DeleteDepartment(dept);

            if (response.IsSuccess)
            {
                return Request.CreateResponse(HttpStatusCode.OK, response.Data);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, response.MessageText);
            }
        }

        [Route("CreateDept")]
        [HttpPost]
        public HttpResponseMessage CreateDept(DepartmentEntity dept)
        {
            NV7100_DepartmentBusiness NV7100_DepartmentBusiness = new NV7100_DepartmentBusiness();
            ResponseMessage response = NV7100_DepartmentBusiness.AddDepartment(dept);

            if (response.IsSuccess)
            {
                return Request.CreateResponse(HttpStatusCode.OK, response.Data);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, response.MessageText);
            }
        }

        [Route("GetDepartmentById")]
        [HttpPost]
        public HttpResponseMessage GetDepartmentById(DepartmentEntity dept)
        {
            NV7100_DepartmentBusiness NV7100_DepartmentBusiness = new NV7100_DepartmentBusiness();
            ResponseMessage response = NV7100_DepartmentBusiness.GetDepartmentById(dept.DepartmentId);

            if (response.IsSuccess)
            {
                return Request.CreateResponse(HttpStatusCode.OK, response.Data);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, response.MessageText);
            }
        }

        [Route("UpdateDept")]
        [HttpPost]
        public HttpResponseMessage UpdateDept(DepartmentEntity dept)
        {
            NV7100_DepartmentBusiness NV7100_DepartmentBusiness = new NV7100_DepartmentBusiness();
            ResponseMessage response = NV7100_DepartmentBusiness.EditDepartment(dept);

            if (response.IsSuccess)
            {
                return Request.CreateResponse(HttpStatusCode.OK, response.Data);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, response.MessageText);
            }
        }
    }
}

