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
    [RoutePrefix("api/career")]
    public class NV7300_CareerController : ApiController
    {
        /// <summary>
        /// Hàm lấy danh sách phòng/ban theo điều kiện tìm kiếm
        /// </summary>
        /// <param name="Career"></param>
        /// <returns></returns>
        [Route("SearchCareer")]
        [HttpPost]
        public HttpResponseMessage SearchCareer(CareerEntity Career)
        {
            NV7300_CareerBusiness NV7300_CareerBusiness = new NV7300_CareerBusiness();
            ResponseMessage response = NV7300_CareerBusiness.SearchCareer(Career);

            if (response.IsSuccess)
            {
                return Request.CreateResponse(HttpStatusCode.OK, response.Data);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, response.MessageText);
            }
        }

        [Route("GetAllCareer")]
        [HttpPost]
        public HttpResponseMessage GetAllCareer()
        {
            NV7300_CareerBusiness NV7300_CareerBusiness = new NV7300_CareerBusiness();
            ResponseMessage response = NV7300_CareerBusiness.GetAllCareer();

            if (response.IsSuccess)
            {
                return Request.CreateResponse(HttpStatusCode.OK, response.Data);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, response.MessageText);
            }
        }

        [Route("DeleteCareer")]
        [HttpPost]
        public HttpResponseMessage DeleteCareer(CareerEntity Career)
        {
            NV7300_CareerBusiness NV7300_CareerBusiness = new NV7300_CareerBusiness();
            ResponseMessage response = NV7300_CareerBusiness.DeleteCareer(Career);

            if (response.IsSuccess)
            {
                return Request.CreateResponse(HttpStatusCode.OK, response.Data);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, response.MessageText);
            }
        }

        [Route("CreateCareer")]
        [HttpPost]
        public HttpResponseMessage CreateCareer(CareerEntity Career)
        {
            NV7300_CareerBusiness NV7300_CareerBusiness = new NV7300_CareerBusiness();
            ResponseMessage response = NV7300_CareerBusiness.AddCareer(Career);

            if (response.IsSuccess)
            {
                return Request.CreateResponse(HttpStatusCode.OK, response.Data);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, response.MessageText);
            }
        }

        [Route("GetCareerById")]
        [HttpPost]
        public HttpResponseMessage GetCareerById(CareerEntity Career)
        {
            NV7300_CareerBusiness NV7300_CareerBusiness = new NV7300_CareerBusiness();
            ResponseMessage response = NV7300_CareerBusiness.GetCareerById(Career.CareerId);

            if (response.IsSuccess)
            {
                return Request.CreateResponse(HttpStatusCode.OK, response.Data);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, response.MessageText);
            }
        }

        [Route("UpdateCareer")]
        [HttpPost]
        public HttpResponseMessage UpdateCareer(CareerEntity Career)
        {
            NV7300_CareerBusiness NV7300_CareerBusiness = new NV7300_CareerBusiness();
            ResponseMessage response = NV7300_CareerBusiness.EditCareer(Career);

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

