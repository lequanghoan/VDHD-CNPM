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
    [RoutePrefix("api/fundsfor")]
    public class NV5000_FundsForController : ApiController
    {
        /// <summary>
        /// Tìm kiếm dự án
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [Route("SearchProject")]
        [HttpPost]
        public HttpResponseMessage SearchProject(ProjectEntity searchProject)
        {
            NV5000_FundsForBusiness FundsForBusiness = new NV5000_FundsForBusiness();
            ResponseMessage response = FundsForBusiness.SearchProject(searchProject);

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
        /// Tìm kiếm phân kỳ
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [Route("SearchPeriod")]
        [HttpPost]
        public HttpResponseMessage SearchPeriod(PeriodEntity searchPeriod)
        {
            NV5000_FundsForBusiness FundsForBusiness = new NV5000_FundsForBusiness();
            ResponseMessage response = FundsForBusiness.SearchPeriod(searchPeriod);

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
        /// Tìm kiếm phân kỳ theo Id chính
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [Route("SearchPeriodById")]
        [HttpPost]
        public HttpResponseMessage SearchPeriodById(PeriodEntity searchPeriod)
        {
            NV5000_FundsForBusiness FundsForBusiness = new NV5000_FundsForBusiness();
            ResponseMessage response = FundsForBusiness.SearchPeriodById(searchPeriod);

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
        /// Tìm kiếm kinh phí chi tiết từng phân kỳ
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [Route("SearchPeriodDetail")]
        [HttpPost]
        public HttpResponseMessage SearchPeriodDetail(PeriodEntity searchPeriodDetail)
        {
            NV5000_FundsForBusiness FundsForBusiness = new NV5000_FundsForBusiness();
            ResponseMessage response = FundsForBusiness.SearchPeriodDetail(searchPeriodDetail);

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
        /// Tìm kiếm kinh phí chi tiết từng phân kỳ theo id chính
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [Route("SearchPeriodDetailById")]
        [HttpPost]
        public HttpResponseMessage SearchPeriodDetailById(PeriodDetailEntity searchPeriodDetail)
        {
            NV5000_FundsForBusiness FundsForBusiness = new NV5000_FundsForBusiness();
            ResponseMessage response = FundsForBusiness.SearchPeriodDetailById(searchPeriodDetail);

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
        /// Lấy thông tin project
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [Route("GetComboboxProject")]
        [HttpPost]
        public HttpResponseMessage GetComboboxProject(ProjectEntity project)
        {
            NV5000_FundsForBusiness FundsForBusiness = new NV5000_FundsForBusiness();
            ResponseMessage response = FundsForBusiness.GetComboboxProject(project);

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
        /// Thêm phân kỳ
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [Route("AddPeriod")]
        [HttpPost]
        public HttpResponseMessage AddPeriod(PeriodEntity period)
        {
            NV5000_FundsForBusiness FundsForBusiness = new NV5000_FundsForBusiness();
            ResponseMessage response = FundsForBusiness.AddPeriod(period);

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
        /// Cập nhật phân kỳ
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [Route("UpdatePeriod")]
        [HttpPost]
        public HttpResponseMessage UpdatePeriod(PeriodEntity period)
        {
            NV5000_FundsForBusiness FundsForBusiness = new NV5000_FundsForBusiness();
            ResponseMessage response = FundsForBusiness.UpdatePeriod(period);

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
        /// Xóa phân kỳ
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [Route("DeletePeriod")]
        [HttpPost]
        public HttpResponseMessage DeletePeriod(PeriodEntity period)
        {
            NV5000_FundsForBusiness FundsForBusiness = new NV5000_FundsForBusiness();
            ResponseMessage response = FundsForBusiness.DeletePeriod(period);

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
        /// Chuyển tiếp phân kỳ
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [Route("UpdateTransferPeriod")]
        [HttpPost]
        public HttpResponseMessage UpdateTransferPeriod(PeriodEntity period)
        {
            NV5000_FundsForBusiness FundsForBusiness = new NV5000_FundsForBusiness();
            ResponseMessage response = FundsForBusiness.UpdateTransferPeriod(period);

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
        /// Thêm chi tiết kỳ cấp kinh phí
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [Route("AddPeriodDetail")]
        [HttpPost]
        public HttpResponseMessage AddPeriodDetail(PeriodDetailEntity period)
        {
            NV5000_FundsForBusiness FundsForBusiness = new NV5000_FundsForBusiness();
            ResponseMessage response = FundsForBusiness.AddPeriodDetail(period);

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
        /// Cập nhật chi tiết kỳ cấp kinh phí
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [Route("UpdatePeriodDetail")]
        [HttpPost]
        public HttpResponseMessage UpdatePeriodDetail(PeriodDetailEntity period)
        {
            NV5000_FundsForBusiness FundsForBusiness = new NV5000_FundsForBusiness();
            ResponseMessage response = FundsForBusiness.UpdatePeriodDetail(period);

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
        /// Xóa chi tiết kỳ cấp kinh phí
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [Route("DeletePeriodDetail")]
        [HttpPost]
        public HttpResponseMessage DeletePeriodDetail(PeriodDetailEntity period)
        {
            NV5000_FundsForBusiness FundsForBusiness = new NV5000_FundsForBusiness();
            ResponseMessage response = FundsForBusiness.DeletePeriodDetail(period);

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
