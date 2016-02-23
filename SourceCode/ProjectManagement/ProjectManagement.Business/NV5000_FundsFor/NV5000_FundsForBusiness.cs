using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ProjectManagement.Business.Data;
using ProjectManagement.Business.Entity;

namespace ProjectManagement.Business.Projects
{
    public class NV5000_FundsForBusiness
    {

        private ProjectManagementEntities db;

        public NV5000_FundsForBusiness()
        {
            db = new ProjectManagementEntities();
        }

        public ResponseMessage SearchProject(ProjectEntity searchProject)
        {
            //count project each year
            var listCount = (from p in db.Projects.AsNoTracking()
                             select new
                             {
                                 p.PlanYear
                             }
            );

            //calculate amount each project
            var listAmount = (from p in db.Projects.AsNoTracking()
                              join d in db.Periods.AsNoTracking() on p.ProjectId equals d.ProjectId
                              into pd
                              from d in pd.DefaultIfEmpty()

                              select new
                              {
                                  d.Amount,
                                  p.ProjectId
                              }

                );

            //calculate amount moneypaid
            var listPaid = (from p in db.Projects.AsNoTracking()
                            join d in db.PeriodDetails.AsNoTracking() on p.ProjectId equals d.ProjectId
                            into pd
                            from d in pd.DefaultIfEmpty()

                            select new
                            {
                                d.Amount,
                                d.Payment,
                                p.ProjectId
                            }
                );

            //calculate money return back
            var listReturn = (from p in db.Projects.AsNoTracking()
                              join d in db.Periods.AsNoTracking() on p.ProjectId equals d.ProjectId
                              into pd
                              from d in pd.DefaultIfEmpty()

                              select new
                              {
                                  d.AmountReutrn,
                                  p.ProjectId
                              }

                );

            var list = (from p in db.Projects.AsNoTracking()
                        join d in db.Departments.AsNoTracking() on p.DepartmentId equals d.DepartmentId
                        into pd
                        from d in pd.DefaultIfEmpty()
                        where p.ProjectName.Contains(searchProject.ProjectName)
                        && (searchProject.Status == 0 || (searchProject.Status == 4 && p.Status == 4) || ((searchProject.Status > 0 && searchProject.Status < 4) && (p.Status > 0 && p.Status < 4)))
                        && (string.IsNullOrEmpty(searchProject.DepartmentId) || p.DepartmentId.Equals(searchProject.DepartmentId))
                        && (searchProject.PlanYear == 0 || p.PlanYear == searchProject.PlanYear)
                        orderby p.PlanYear
                        select new
                        {
                            ProjectId = p.ProjectId,
                            FundsFor = p.FundsFor,
                            PlanYear = p.PlanYear,
                            ProjectName = p.ProjectName,
                            Agency = p.Agency,
                            Amount = listAmount.Where(a => a.ProjectId.Equals(p.ProjectId)).Sum(a => a.Amount),
                            Count = listCount.Where(a => a.PlanYear == p.PlanYear).Count(),
                            Paid = listPaid.Where(a => a.ProjectId.Equals(p.ProjectId)).Sum(a => a.Amount) + listPaid.Where(a => a.ProjectId.Equals(p.ProjectId)).Sum(a => a.Payment),
                            GetBack = listReturn.Where(a => a.ProjectId.Equals(p.ProjectId)).Sum(a => a.AmountReutrn)
                        }).ToList();
            ResponseMessage respond = new ResponseMessage();
            respond.Data = list;
            return respond;
        }


        public ResponseMessage GetComboboxProject(ProjectEntity projectfind)
        {
            List<ProjectEntity> listProject = new List<ProjectEntity>();
            ProjectEntity project;
            var listData = (from p in db.Projects.AsNoTracking()
                            where (projectfind.PlanYear == 0) || p.PlanYear == projectfind.PlanYear
                            orderby p.ProjectName
                            select new
                            {
                                ProjectId = p.ProjectId,
                                ProjectName = p.ProjectName
                            }).ToList();

            foreach (var item in listData)
            {
                project = new ProjectEntity();
                project.ProjectId = item.ProjectId;
                project.ProjectName = item.ProjectName;
                listProject.Add(project);
            }

            ResponseMessage response = new ResponseMessage();
            response.Data = listProject;
            return response;
        }

        public ResponseMessage SearchPeriod(PeriodEntity periodSearch)
        {
            //count project each year
            var listMoneyGet = (from p in db.PeriodDetails.AsNoTracking()
                                select new
                                {
                                    p.Amount,
                                    p.AmountDate,
                                    p.AdvanceAmount,
                                    p.AdvanceDate,
                                    p.Payment,
                                    p.PaymentDate,
                                    p.ProjectId
                                }
            );

            var list = (from p in db.Periods.AsNoTracking()
                        where p.ProjectId.Equals(periodSearch.ProjectId)
                        orderby p.Year
                        select new
                        {
                            PeriodId = p.PeriodId,
                            Year = p.Year,
                            Amount = p.Amount,
                            AmountReutrn = p.AmountReutrn,
                            AmountForward = p.AmountForward,
                            BalanceForward = p.BalanceForward,
                            ProjectId = p.ProjectId,
                            Note = p.Note,
                            //Kinh phí đã cấp
                            MoneyGet = (from r in listMoneyGet
                                        where (r.AdvanceDate.Value.Year == p.Year || r.AmountDate.Value.Year == p.Year) && r.ProjectId.Equals(p.ProjectId)
                                        select (r.Amount == null ? 0 : r.Amount) + (r.AdvanceAmount == null ? 0 : r.AdvanceAmount)).Sum(),
                            //Kinh phí đã thanh toán
                            MoneyPaid = (from r in listMoneyGet
                                         where (r.PaymentDate.Value.Year == p.Year || r.AmountDate.Value.Year == p.Year) && r.ProjectId.Equals(p.ProjectId)
                                         select (r.Amount == null ? 0 : r.Amount) + (r.Payment == null ? 0 : r.Payment)).Sum(),
                            //Dư ứng
                            MoneyAdd = (from r in listMoneyGet
                                        where (r.AdvanceDate.Value.Year == p.Year || r.PaymentDate.Value.Year == p.Year) && r.ProjectId.Equals(p.ProjectId)
                                        select (r.AdvanceAmount == null ? 0 : r.AdvanceAmount) - (r.Payment == null ? 0 : r.Payment)).Sum()
                        }).ToList();

            ResponseMessage respond = new ResponseMessage();
            respond.Data = list;
            return respond;
        }

        public ResponseMessage SearchPeriodById(PeriodEntity periodSearch)
        {
            PeriodEntity result = new PeriodEntity();
            var period = db.Periods.Find(periodSearch.PeriodId);
            ResponseMessage response = new ResponseMessage();
            response.Data = period;
            return response;
        }

        public ResponseMessage SearchPeriodDetailById(PeriodDetailEntity periodDetailSearch)
        {
            PeriodDetailEntity result = new PeriodDetailEntity();
            var periodDetail = db.PeriodDetails.Find(periodDetailSearch.PeriodDetailId);
            ResponseMessage response = new ResponseMessage();
            response.Data = periodDetail;
            return response;
        }


        public ResponseMessage AddPeriod(PeriodEntity periodAdd)
        {
            ResponseMessage response = new ResponseMessage();

            var count = db.Periods.AsNoTracking().Where(p => p.Year == periodAdd.Year
                && p.ProjectId.Equals(periodAdd.ProjectId)).Count();
            if (count == 0)
            {
                using (var trans = db.Database.BeginTransaction())
                {
                    try
                    {
                        Period p = new Period()
                        {
                            PeriodId = Guid.NewGuid().ToString(),
                            ProjectId = periodAdd.ProjectId,
                            Year = periodAdd.Year,
                            Amount = periodAdd.Amount,
                            AmountReutrn = periodAdd.AmountReutrn
                        };

                        db.Periods.Add(p);
                        db.SaveChanges();
                        trans.Commit();
                    }
                    catch (Exception ex)
                    {
                        Console.Error.WriteLine(ex.Message);
                        response.MessageText = ResponseMessage.MSG_CANNOT_CONNECT_TO_THE_DATABASE;
                        response.Data = null;
                        return response;
                    }
                    return response;
                }
            }
            else
            {
                response.MessageText = "Năm phân kỳ đã tồn tại, vui lòng sử dụng chức năng cập nhật";
                response.Data = null;
                return response;
            }

        }

        public ResponseMessage UpdatePeriod(PeriodEntity periodUpdate)
        {
            ResponseMessage response = new ResponseMessage();
            using (var trans = db.Database.BeginTransaction())
            {
                try
                {
                    Period period = db.Periods.Find(periodUpdate.PeriodId);
                    period.Amount = periodUpdate.Amount;
                    period.AmountReutrn = periodUpdate.AmountReutrn;
                    db.SaveChanges();
                    trans.Commit();
                }
                catch (Exception ex)
                {
                    trans.Rollback();
                    Console.Error.WriteLine(ex.Message);
                    response.MessageText = ResponseMessage.MSG_CANNOT_CONNECT_TO_THE_DATABASE;
                    response.Data = null;
                    return response;

                }
            }
            return response;
        }

        public ResponseMessage DeletePeriod(PeriodEntity periodDelete)
        {
            ResponseMessage response = new ResponseMessage();
            using (var trans = db.Database.BeginTransaction())
            {
                try
                {
                    Period period = db.Periods.Find(periodDelete.PeriodId);
                    db.Periods.Remove(period);
                    db.SaveChanges();
                    trans.Commit();
                }
                catch (Exception ex)
                {
                    Console.Error.WriteLine(ex.Message);
                    response.MessageText = ResponseMessage.MSG_CANNOT_CONNECT_TO_THE_DATABASE;
                    response.Data = null;
                    return response;
                }
            }
            return response;
        }

        public ResponseMessage UpdateTransferPeriod(PeriodEntity periodTransfer)
        {
            ResponseMessage response = new ResponseMessage();
            using (var trans = db.Database.BeginTransaction())
            {
                try
                {
                    Period period = db.Periods.Single(p => p.Year == (periodTransfer.Year + 1)
                        && p.ProjectId.Equals(periodTransfer.ProjectId));
                    period.AmountForward = periodTransfer.AmountForward;
                    period.BalanceForward = periodTransfer.BalanceForward;
                    db.SaveChanges();
                    trans.Commit();
                }
                catch (Exception ex)
                {
                    trans.Rollback();
                    Console.Error.WriteLine(ex.Message);
                    response.MessageText = "Năm " + (periodTransfer.Year + 1) + " chưa được thêm vào phân kỳ!!";
                    response.Data = null;
                    return response;
                }
            }
            return response;
        }

        public ResponseMessage SearchPeriodDetail(PeriodEntity periodDetailSearch)
        {
            var list = (from p in db.PeriodDetails.AsNoTracking()
                        where p.ProjectId.Equals(periodDetailSearch.ProjectId) && (p.AmountDate.Value.Year == periodDetailSearch.Year || p.AdvanceDate.Value.Year == periodDetailSearch.Year)
                        orderby (p.AmountDate == null?p.AdvanceDate:p.AmountDate) 
                        select new
                        {
                            PeriodDetailId = p.PeriodDetailId,
                            Type = p.Type,
                            Amount = p.Amount,
                            AmountDate = p.AmountDate,
                            AdvanceAmount = p.AdvanceAmount,
                            AdvanceDate = p.AdvanceDate,
                            Payment = p.Payment,
                            PaymentDate = p.PaymentDate,
                            Note = p.Note,
                            ProjectId = p.ProjectId
                        }).ToList();

            ResponseMessage respond = new ResponseMessage();
            respond.Data = list;
            return respond;

        }

        public ResponseMessage AddPeriodDetail(PeriodDetailEntity periodDetailAdd)
        {
            ResponseMessage response = new ResponseMessage();

            using (var trans = db.Database.BeginTransaction())
            {
                try
                {
                    PeriodDetail p = new PeriodDetail()
                    {
                        PeriodDetailId = Guid.NewGuid().ToString(),
                        Type = periodDetailAdd.Type,
                        Amount = periodDetailAdd.Amount,
                        AmountDate = periodDetailAdd.AmountDate,
                        AdvanceAmount = periodDetailAdd.AdvanceAmount,
                        AdvanceDate = periodDetailAdd.AdvanceDate,
                        Payment = periodDetailAdd.Payment,
                        PaymentDate = periodDetailAdd.PaymentDate,
                        Note = periodDetailAdd.Note,
                        ProjectId = periodDetailAdd.ProjectId
                    };

                    db.PeriodDetails.Add(p);
                    db.SaveChanges();
                    trans.Commit();
                }
                catch (Exception ex)
                {
                    Console.Error.WriteLine(ex.Message);
                    response.MessageText = ResponseMessage.MSG_CANNOT_CONNECT_TO_THE_DATABASE;
                    response.Data = null;
                    return response;
                }
                return response;
            }

        }

        public ResponseMessage UpdatePeriodDetail(PeriodDetailEntity periodUpdateDetail)
        {
            ResponseMessage response = new ResponseMessage();
            using (var trans = db.Database.BeginTransaction())
            {
                try
                {
                    PeriodDetail periodDetail = db.PeriodDetails.Find(periodUpdateDetail.PeriodDetailId);
                    periodDetail.Type = periodUpdateDetail.Type;
                    periodDetail.Amount = periodUpdateDetail.Amount;
                    periodDetail.AmountDate = periodUpdateDetail.AmountDate;
                    periodDetail.Note = periodUpdateDetail.Note;
                    periodDetail.AdvanceAmount = periodUpdateDetail.AdvanceAmount;
                    periodDetail.AdvanceDate = periodUpdateDetail.AdvanceDate;
                    periodDetail.Payment = periodUpdateDetail.Payment;
                    periodDetail.PaymentDate = periodUpdateDetail.PaymentDate;
                    db.SaveChanges();
                    trans.Commit();
                }
                catch (Exception ex)
                {
                    trans.Rollback();
                    Console.Error.WriteLine(ex.Message);
                    response.MessageText = ResponseMessage.MSG_CANNOT_CONNECT_TO_THE_DATABASE;
                    response.Data = null;
                    return response;

                }
            }
            return response;
        }

        public ResponseMessage DeletePeriodDetail(PeriodDetailEntity periodDetailDelete)
        {
            ResponseMessage response = new ResponseMessage();
            using (var trans = db.Database.BeginTransaction())
            {
                try
                {
                    PeriodDetail periodDetail = db.PeriodDetails.Find(periodDetailDelete.PeriodDetailId);
                    db.PeriodDetails.Remove(periodDetail);
                    db.SaveChanges();
                    trans.Commit();
                }
                catch (Exception ex)
                {
                    Console.Error.WriteLine(ex.Message);
                    response.MessageText = ResponseMessage.MSG_CANNOT_CONNECT_TO_THE_DATABASE;
                    response.Data = null;
                    return response;
                }
            }
            return response;
        }

    }
}
