using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Web;
using System.Web.Http.Filters;

namespace ProjectManagement.API
{
    public class NTSAuthorize : System.Web.Http.Filters.AuthorizationFilterAttribute
    {
        public string AllowFeature { get; set; }

        public override void OnAuthorization(System.Web.Http.Controllers.HttpActionContext actionContext)
        {
            var filterAttribute = actionContext.ActionDescriptor.GetCustomAttributes<NTSAuthorize>(true)
                .Where(a => a.GetType() == typeof(NTSAuthorize));
            string userName = string.Empty;
            string authorizeString = string.Empty;
            string authorizeItemString = string.Empty;
            if (filterAttribute != null)
            {
                foreach (NTSAuthorize attr in filterAttribute)
                {
                    AllowFeature = attr.AllowFeature;
                }
                ClaimsPrincipal principal = actionContext.RequestContext.Principal as ClaimsPrincipal;
                userName = ClaimsPrincipal.Current.Identity.Name;
                userName = principal.Claims.Where(c => c.Type == "sub").Single().Value;
                authorizeString = principal.Claims.Where(c => c.Type == "AuthorizeString").Single().Value;
                authorizeItemString = principal.Claims.Where(c => c.Type == "AuthorizeItemString").Single().Value;
            }

            //if not have permission
            //if (AllowFeature == null && !authorizeString.Contains(AllowFeature))
            //{
            //    actionContext.Response = new HttpResponseMessage(HttpStatusCode.Unauthorized);
            //}

            base.OnAuthorization(actionContext);
        }


    }

    public class NTSAuthorizeAC : System.Web.Http.Filters.ActionFilterAttribute
    {
        public override void OnActionExecuting(System.Web.Http.Controllers.HttpActionContext actionContext)
        {
            string userName = string.Empty;
            string authorizeString = string.Empty;
            string authorizeItemString = string.Empty;
            var abc = actionContext.ActionArguments.First();
            var ab = abc.Value.GetType().GetProperty("ProjectId").GetValue(abc.Value, null);
            ClaimsPrincipal principal = actionContext.RequestContext.Principal as ClaimsPrincipal;
            userName = ClaimsPrincipal.Current.Identity.Name;
            userName = principal.Claims.Where(c => c.Type == "sub").Single().Value;
            authorizeString = principal.Claims.Where(c => c.Type == "AuthorizeString").Single().Value;
            authorizeItemString = principal.Claims.Where(c => c.Type == "AuthorizeItemString").Single().Value;
            actionContext.ActionArguments.Add("UserId", "1902");

            base.OnActionExecuting(actionContext);
        }
    }
}