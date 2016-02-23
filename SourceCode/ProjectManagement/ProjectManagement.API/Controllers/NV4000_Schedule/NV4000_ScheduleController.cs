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
using System.Web.Http.Cors;

namespace API.Controllers
{
    [RoutePrefix("api/schedule")]
    public class NV4000_ScheduleController : ApiController
    {
        /// <summary>
        /// Hàm lấy danh sách tiến độ theo điều kiện tìm kiếm
        /// </summary>
        /// <param name="pro"></param>
        /// <returns></returns>
        [Route("SearchSchedule")]
        [HttpPost]
        public HttpResponseMessage SearchSchedule(SearchProfileEntity searchSchedule)
        {
            NV4000_ScheduleBusiness scheduleBusiness = new NV4000_ScheduleBusiness();
            ResponseMessage response = scheduleBusiness.SearchSchedule(searchSchedule);

            if (response.IsSuccess)
            {
                return Request.CreateResponse(HttpStatusCode.OK, response.Data);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, response.MessageText);
            }
        }

        [Route("DeleteSchedule")]
        [HttpPost]
        public HttpResponseMessage DeleteSchedule(ScheduleEntity schedule)
        {
            NV4000_ScheduleBusiness scheduleBusiness = new NV4000_ScheduleBusiness();
            ResponseMessage response = scheduleBusiness.DeleteSchedule(schedule);

            if (response.IsSuccess)
            {
                return Request.CreateResponse(HttpStatusCode.OK, response.Data);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, response.MessageText);
            }
        }

        [Route("CreateSchedule")]
        [HttpPost]
        public HttpResponseMessage CreateProject(ScheduleEntity schedule)
        {
            NV4000_ScheduleBusiness scheduleBusiness = new NV4000_ScheduleBusiness();
            ResponseMessage response = scheduleBusiness.AddSchedule(schedule);

            if (response.IsSuccess)
            {
                return Request.CreateResponse(HttpStatusCode.OK, response.Data);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, response.MessageText);
            }
        }

        [Route("GetScheduleById")]
        [HttpPost]
        public HttpResponseMessage GetScheduleById(ScheduleEntity schedule)
        {
            NV4000_ScheduleBusiness scheduleBusiness = new NV4000_ScheduleBusiness();
            ResponseMessage response = scheduleBusiness.GetScheduleById(schedule.ScheduleId);

            if (response.IsSuccess)
            {
                return Request.CreateResponse(HttpStatusCode.OK, response.Data);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, response.MessageText);
            }
        }

        [Route("UpdateSchedule")]
        [HttpPost]
        public HttpResponseMessage UpdateProject(ScheduleEntity schedule)
        {
            NV4000_ScheduleBusiness scheduleBusiness = new NV4000_ScheduleBusiness();
            ResponseMessage response = scheduleBusiness.EditSchedule(schedule);

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

