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
    [RoutePrefix("api/user")]
    public class NV7200_UsersController : ApiController
    {
        /// <summary>
        /// Hàm lấy danh sách cán bộ theo điều kiện tìm kiếm
        /// </summary>
        /// <param name="User"></param>
        /// <returns></returns>
        [Route("SearchUser")]
        [HttpPost]
        public HttpResponseMessage SearchUser(UserEntity user)
        {
            NV7200_UserBusiness NV7200_UserBusiness = new NV7200_UserBusiness();
            ResponseMessage response = NV7200_UserBusiness.SearchUser(user);

            if (response.IsSuccess)
            {
                return Request.CreateResponse(HttpStatusCode.OK, response.Data);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, response.MessageText);
            }
        }

        //[Route("GetAllUser")]
        //[HttpPost]
        //public HttpResponseMessage GetAllUser()
        //{
        //    NV7200_UserBusiness NV7200_UserBusiness = new NV7200_UserBusiness();
        //    ResponseMessage response = NV7200_UserBusiness.GetAllUser();

        //    if (response.IsSuccess)
        //    {
        //        return Request.CreateResponse(HttpStatusCode.OK, response.Data);
        //    }
        //    else
        //    {
        //        return Request.CreateResponse(HttpStatusCode.InternalServerError, response.MessageText);
        //    }
        //}

        [Route("DeleteUser")]
        [HttpPost]
        public HttpResponseMessage DeleteUser(UserEntity User)
        {
            NV7200_UserBusiness NV7200_UserBusiness = new NV7200_UserBusiness();
            ResponseMessage response = NV7200_UserBusiness.DeleteUser(User);

            if (response.IsSuccess)
            {
                return Request.CreateResponse(HttpStatusCode.OK, response.Data);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, response.MessageText);
            }
        }

        [Route("LockUser")]
        [HttpPost]
        public HttpResponseMessage LockUser(UserEntity user)
        {
            NV7200_UserBusiness NV7200_UserBusiness = new NV7200_UserBusiness();
            ResponseMessage response = NV7200_UserBusiness.LockUser(user);

            if (response.IsSuccess)
            {
                return Request.CreateResponse(HttpStatusCode.OK, response.Data);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, response.MessageText);
            }
        }

        [Route("CreateUser")]
        [HttpPost]
        public HttpResponseMessage CreateUser(UserEntity user)
        {
            NV7200_UserBusiness NV7200_UserBusiness = new NV7200_UserBusiness();
            ResponseMessage response = NV7200_UserBusiness.AddUser(user);

            if (response.IsSuccess)
            {
                return Request.CreateResponse(HttpStatusCode.OK, response.Data);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, response.MessageText);
            }
        }

        [Route("GetUserById")]
        [HttpPost]
        public HttpResponseMessage GetUserById(UserEntity user)
        {
            NV7200_UserBusiness NV7200_UserBusiness = new NV7200_UserBusiness();
            ResponseMessage response = NV7200_UserBusiness.GetUserById(user.UserId);

            if (response.IsSuccess)
            {
                return Request.CreateResponse(HttpStatusCode.OK, response.Data);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, response.MessageText);
            }
        }

        [Route("UpdateUser")]
        [HttpPost]
        public HttpResponseMessage UpdateUser(UserEntity user)
        {
            NV7200_UserBusiness NV7200_UserBusiness = new NV7200_UserBusiness();
            ResponseMessage response = NV7200_UserBusiness.EditUser(user);

            if (response.IsSuccess)
            {
                return Request.CreateResponse(HttpStatusCode.OK, response.Data);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, response.MessageText);
            }
        }

        [Route("ChangePassword")]
        [HttpPost]
        public HttpResponseMessage ChangePassword(ChangePasswordEntity passwordEntity)
        {
            NV7200_UserBusiness NV7200_UserBusiness = new NV7200_UserBusiness();
            ResponseMessage response = NV7200_UserBusiness.ChangePassword(passwordEntity);

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

