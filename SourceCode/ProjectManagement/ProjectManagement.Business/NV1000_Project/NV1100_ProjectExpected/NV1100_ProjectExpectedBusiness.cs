using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ProjectManagement.Business.Data;
using ProjectManagement.Business.Entity;

namespace ProjectManagement.Business.Projects
{
    public class NV1100_ProjectExpectedBusiness
    {

        private ProjectManagementEntities db;

        public NV1100_ProjectExpectedBusiness()
        {
            db = new ProjectManagementEntities();
        }

        /// <summary>
        /// Hàm lấy về danh sách nhiệm vụ dự kiến theo điều kiện tìm kiếm
        /// </summary>
        /// <param name="projectSearch"></param>
        /// <returns></returns>
        public ResponseMessage SearchProject(ProjectEntity projectSearch)
        {
            var listData = (from a in db.Projects.AsNoTracking()
                            join d in db.Departments.AsNoTracking() on a.DepartmentId equals d.DepartmentId
                                into pd
                            from d in pd.DefaultIfEmpty()
                            where (a.ProjectName.Contains(projectSearch.ProjectName))
                            && (projectSearch.ProjectType == 0 || a.ProjectType == projectSearch.ProjectType)
                            && (projectSearch.Status == 0 || a.Status == projectSearch.Status)
                            && (string.IsNullOrEmpty(projectSearch.DepartmentId) || projectSearch.DepartmentId.Equals(a.DepartmentId))
                            && (projectSearch.PlanYear == 0 || a.PlanYear == projectSearch.PlanYear)
                            && (a.Status < 4) orderby a.PlanYear descending
                            select new
                            {
                                a.ProjectId,
                                a.ProjectType,
                                ProjectTypeName = (a.ProjectType == 1) ? "Đề tài" : "Dự án",
                                a.PlanYear,
                                a.ProjectName,
                                a.Agency,
                                a.FundsFor,
                                d.DepartmentId,
                                d.DepartmentName,
                                a.Status
                            }).ToList();
            ResponseMessage response = new ResponseMessage();
            response.Data = listData;
            return response;
        }
        /// <summary>
        /// Hàm để duyệt dự án, đề tài
        /// </summary>
        /// <param name="updateProject"></param>
        /// <returns></returns>
        public ResponseMessage ApproveProject(ProjectEntity updateProject)
        {
            ResponseMessage response = new ResponseMessage();
            using (var trans = db.Database.BeginTransaction())
            {
                try
                {
                    Project project = db.Projects.Find(updateProject.ProjectId);
                    if (updateProject.Status != null)
                    {
                        project.Status = updateProject.Status;

                    }
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

        /// <summary>
        /// Hàm thay đổi phòng quản lý
        /// </summary>
        /// <param name="updateProject"></param>
        /// <returns></returns>
        public ResponseMessage ChangeDept(ProjectEntity updateProject)
        {
            ResponseMessage response = new ResponseMessage();
            using (var trans = db.Database.BeginTransaction())
            {
                try
                {
                    Project project = db.Projects.Find(updateProject.ProjectId);

                    project.DepartmentId = updateProject.DepartmentId;

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
        /// <summary>
        /// Hàm thêm mới nhiệm vụ
        /// </summary>
        /// <param name="project"></param>
        public ResponseMessage AddProject(ProjectEntity project)
        {
            ResponseMessage response = new ResponseMessage();
            using (var trans = db.Database.BeginTransaction())
            {
                try
                {
                    Project p = new Project()
                    {
                        ProjectId = Guid.NewGuid().ToString(),
                        ProjectName = project.ProjectNameExpected,
                        Agency = project.Agency,
                        PlanYear = project.PlanYear,
                        ProjectType = project.ProjectType,
                        Necessary = project.Necessary,
                        Target = project.TargetExpected,
                        ProjectContent = project.ContentExpected,
                        Product = project.ProductExpected,
                        FundsFor = project.FundsForExpected,
                        TargetExpected = project.TargetExpected,
                        ContentExpected = project.ContentExpected,
                        ProductExpected = project.ProductExpected,
                        FundsForExpected = project.FundsForExpected,
                        ProjectNameExpected = project.ProjectNameExpected,
                        Status = 1
                    };

                    db.Projects.Add(p);
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

        /// <summary>
        /// Hàm lấy về nhiệm vụ theo id
        /// </summary>
        /// <param name="deptId">id nhiệm vụ</param>
        /// <returns></returns>
        public ResponseMessage GetProjectById(string projectId)
        {
            ProjectEntity result = new ProjectEntity();
            var project = db.Projects.Find(projectId);
            ResponseMessage response = new ResponseMessage();
            response.Data = project;
            return response;
        }

        /// <summary>
        /// Hàm cập nhật nhiệm vụ
        /// </summary>
        /// <param name="projectUpdate">Thông tin cập nhật</param>
        /// <returns></returns>
        public ResponseMessage EditProject(ProjectEntity projectUpdate)
        {
            ResponseMessage response = new ResponseMessage();
            using (var trans = db.Database.BeginTransaction())
            {
                try
                {
                    Project project = db.Projects.Find(projectUpdate.ProjectId);
                    project.TargetExpected = projectUpdate.TargetExpected;
                    project.ContentExpected = projectUpdate.ContentExpected;
                    project.ProductExpected = projectUpdate.ProductExpected;
                    project.FundsForExpected = projectUpdate.FundsForExpected;
                    project.ProjectNameExpected = projectUpdate.ProjectNameExpected;
                    // Trường hợp nhiệm vụ chưa duyệt gì thì cập nhật tất cả
                    if (project.Status == 1)
                    {
                        project.ProjectName = projectUpdate.ProjectNameExpected;
                        project.Agency = projectUpdate.Agency;
                        project.PlanYear = projectUpdate.PlanYear;
                        project.ProjectType = projectUpdate.ProjectType;
                        project.Necessary = projectUpdate.Necessary;
                        project.Target = projectUpdate.TargetExpected;
                        project.ProjectContent = projectUpdate.ContentExpected;
                        project.Product = projectUpdate.ProductExpected;
                        project.FundsFor = projectUpdate.FundsForExpected;
                    }
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

        /// <summary>
        /// Hàm xóa nhiệm vụ
        /// </summary>
        /// <param name="projectDelete"></param>
        /// <returns></returns>
        public ResponseMessage DeleteProject(ProjectEntity projectDelete)
        {
            ResponseMessage response = new ResponseMessage();
            using (var trans = db.Database.BeginTransaction())
            {
                try
                {
                    Project project = db.Projects.Find(projectDelete.ProjectId);
                    db.Projects.Remove(project);
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
