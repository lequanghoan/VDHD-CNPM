using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjectManagement.Business.Entity
{
   public class ProjectEntity
    {
        public string ProjectId { get; set; }
        public string ProjectName { get; set; }
        public int? ProjectType { get; set; }
        public string Agency { get; set; }
        public decimal? FundsFor { get; set; }
        public int? MonthFrom { get; set; }
        public int? MonthTo { get; set; }
        public int? YearFrom { get; set; }
        public int? YearTo { get; set; }
        public int? PlanYear { get; set; }
        public string ProjectContent { get; set; }
        public string Target { get; set; }
        public string Necessary { get; set; }
        public string Product { get; set; }
        public DateTime? AcceptDate { get; set; }
        public int? Result { get; set; }
        public bool? Lock { get; set; }
        public string UserMain { get; set; }
        public string Note { get; set; }
        public int? Gender { get; set; }
        public string Degree { get; set; }
        public string AcademicTitles { get; set; }
        public string Position { get; set; }
        public string PhoneNumber { get; set; }
        public string Fax { get; set; }
        public string Email { get; set; }
        public string UsersJoin { get; set; }
        public string EconomyTarget { get; set; }
        public string Slogan { get; set; }
        public string Size { get; set; }
        public string ApproveNumber { get; set; }
        public string ContractNumber { get; set; }
        public string TargetExpected { get; set; }
        public string ContentExpected { get; set; }
        public string ProductExpected { get; set; }
        public decimal? FundsForExpected { get; set; }
        public string ProjectNameExpected { get; set; }
        public string UserCreateId { get; set; }
        public System.DateTime? CreateDate { get; set; }
        public string UserUpdateId { get; set; }
        public System.DateTime? UpdateDate { get; set; }
        public string DepartmentId { get; set; }
        public string CareerId { get; set; }
        public int? Status { get; set; }
    }
}
