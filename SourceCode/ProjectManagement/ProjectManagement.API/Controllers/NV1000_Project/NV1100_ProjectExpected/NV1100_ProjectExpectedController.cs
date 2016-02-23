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
    [RoutePrefix("api/prepareProject")]
    public class NV1100_ProjectExpectedController : ApiController
    {
        /// <summary>
        /// Hàm lấy danh sách dự án theo điều kiện tìm kiếm
        /// </summary>
        /// <param name="pro"></param>
        /// <returns></returns>
        [Route("SearchProject")]
        [HttpPost]
        public HttpResponseMessage SearchProject(ProjectEntity pro)
        {
            NV1100_ProjectExpectedBusiness projectExpectedBusiness = new NV1100_ProjectExpectedBusiness();
            ResponseMessage response = projectExpectedBusiness.SearchProject(pro);

            if (response.IsSuccess)
            {
                return Request.CreateResponse(HttpStatusCode.OK, response.Data);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, response.MessageText);
            }
        }

        /// <summary>
        /// Hàm duyệt dự án,đề tài
        /// </summary>
        /// <param name="pro"></param>
        /// <returns></returns>
        [Route("ApproveProject")]
        [HttpPost]
        public HttpResponseMessage ApproveProject(ProjectEntity pro)
        {
            NV1100_ProjectExpectedBusiness projectExpectedBusiness = new NV1100_ProjectExpectedBusiness();
            ResponseMessage response = projectExpectedBusiness.ApproveProject(pro);

            if (response.IsSuccess)
            {
                return Request.CreateResponse(HttpStatusCode.OK, response.Data);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, response.MessageText);
            }
        }

        /// <summary>
        /// Hàm thay đổi phòng quản lý
        /// </summary>
        /// <param name="pro"></param>
        /// <returns></returns>
        [Route("ChangeDept")]
        [HttpPost]
        public HttpResponseMessage ChangeDept(ProjectEntity pro)
        {
            NV1100_ProjectExpectedBusiness projectExpectedBusiness = new NV1100_ProjectExpectedBusiness();
            ResponseMessage response = projectExpectedBusiness.ChangeDept(pro);

            if (response.IsSuccess)
            {
                return Request.CreateResponse(HttpStatusCode.OK, response.Data);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, response.MessageText);
            }
        }

        [Route("DeleteProject")]
        [HttpPost]
        public HttpResponseMessage DeleteProject(ProjectEntity project)
        {
            NV1100_ProjectExpectedBusiness projectExpectedBusiness = new NV1100_ProjectExpectedBusiness();
            ResponseMessage response = projectExpectedBusiness.DeleteProject(project);

            if (response.IsSuccess)
            {
                return Request.CreateResponse(HttpStatusCode.OK, response.Data);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, response.MessageText);
            }
        }

        [Route("CreateProject")]
        [HttpPost]
        public HttpResponseMessage CreateProject(ProjectEntity project)
        {
            NV1100_ProjectExpectedBusiness projectExpectedBusiness = new NV1100_ProjectExpectedBusiness();
            ResponseMessage response = projectExpectedBusiness.AddProject(project);

            if (response.IsSuccess)
            {
                return Request.CreateResponse(HttpStatusCode.OK, response.Data);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, response.MessageText);
            }
        }

        [Route("GetProjectById")]
        [HttpPost]
        public HttpResponseMessage GetProjectById(ProjectEntity project)
        {
            NV1100_ProjectExpectedBusiness projectExpectedBusiness = new NV1100_ProjectExpectedBusiness();
            ResponseMessage response = projectExpectedBusiness.GetProjectById(project.ProjectId);

            if (response.IsSuccess)
            {
                return Request.CreateResponse(HttpStatusCode.OK, response.Data);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, response.MessageText);
            }
        }

        [Route("UpdateProject")]
        [HttpPost]
        public HttpResponseMessage UpdateProject(ProjectEntity project)
        {
            NV1100_ProjectExpectedBusiness projectExpectedBusiness = new NV1100_ProjectExpectedBusiness();
            ResponseMessage response = projectExpectedBusiness.EditProject(project);

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

