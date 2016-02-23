using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ProjectManagement.Business.Data;
using ProjectManagement.Business.Entity;
namespace ProjectManagement.Business.Projects
{
    public class NV7100_DepartmentBusiness
    {
        private ProjectManagementEntities db;

        public NV7100_DepartmentBusiness()
        {
            db = new ProjectManagementEntities();
        }
        /// <summary>
        /// Hàm lấy về danh sách phòng/ban theo điều kiện tìm kiếm
        /// </summary>
        /// <param name="deptSearch"></param>
        /// <returns></returns>
        public ResponseMessage SearchDepartment(DepartmentEntity deptSearch)
        {
            List<DepartmentEntity> listDept = new List<DepartmentEntity>();
            DepartmentEntity dept;
            var listData = db.Departments.AsNoTracking().Where(d => d.DepartmentName.Contains(deptSearch.DepartmentName)).OrderBy(n => n.DepartmentName);
            foreach (var item in listData)
            {
                dept = new DepartmentEntity();
                dept.DepartmentId = item.DepartmentId;
                dept.DepartmentName = item.DepartmentName;
                dept.Note = item.Note;
                listDept.Add(dept);
            }
            ResponseMessage response = new ResponseMessage();
            response.Data = listDept;
            return response;
        }
        /// <summary>
        /// Hàm lấy về danh sách tất cả phòng/ban
        /// </summary>
        /// <returns></returns>
        public ResponseMessage GetAllDepartment()
        {
            List<DepartmentEntity> listDept = new List<DepartmentEntity>();
            DepartmentEntity dept;
            var listData = db.Departments.AsNoTracking().ToList();
            foreach (var item in listData)
            {
                dept = new DepartmentEntity();
                dept.DepartmentId = item.DepartmentId;
                dept.DepartmentName = item.DepartmentName;
                dept.Note = item.Note;
                listDept.Add(dept);
            }
            ResponseMessage response = new ResponseMessage();
            response.Data = listDept;
            return response;
        }

        /// <summary>
        /// Hàm thêm mới phòng/ban
        /// </summary>
        /// <param name="deptAdd">Đối tượng cần thêm mới</param>
        public ResponseMessage AddDepartment(DepartmentEntity deptAdd)
        {
            ResponseMessage response = new ResponseMessage();
            using (var trans = db.Database.BeginTransaction())
            {
                try
                {
                    Department department = new Department()
                    {
                        DepartmentId = Guid.NewGuid().ToString(),
                        DepartmentName = deptAdd.DepartmentName,
                        Note = deptAdd.Note
                    };

                    db.Departments.Add(department);
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
        /// Hàm lấy về phòng ban theo id
        /// </summary>
        /// <param name="deptId">id phòng ban</param>
        /// <returns></returns>
        public ResponseMessage GetDepartmentById(string deptId)
        {
            DepartmentEntity result = new DepartmentEntity();
            var department = db.Departments.Find(deptId);
            result.DepartmentId = deptId;
            result.DepartmentName = department.DepartmentName;
            result.Note = department.Note;
            ResponseMessage response = new ResponseMessage();
            response.Data = result;
            return response;
        }
        /// <summary>
        /// Hàm cập nhật phòng ban
        /// </summary>
        /// <param name="deptUpdate">Thông tin cập nhật</param>
        /// <returns></returns>
        public ResponseMessage EditDepartment(DepartmentEntity deptUpdate)
        {
            ResponseMessage response = new ResponseMessage();
            using (var trans = db.Database.BeginTransaction())
            {
                try
                {
                    Department department = db.Departments.Find(deptUpdate.DepartmentId);
                    department.DepartmentName = deptUpdate.DepartmentName;
                    department.Note = deptUpdate.Note;
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
        /// Hàm xóa phòng ban
        /// </summary>
        /// <param name="deptUpdate"></param>
        /// <returns></returns>
        public ResponseMessage DeleteDepartment(DepartmentEntity deptUpdate)
        {
            using (var trans = db.Database.BeginTransaction())
            {
                try
                {
                    Department department = db.Departments.Find(deptUpdate.DepartmentId);
                    db.Departments.Remove(department);

                    db.SaveChanges();
                    trans.Commit();
                }
                catch
                {
                    trans.Rollback();
                }
            }
            ResponseMessage response = new ResponseMessage();
            return response;

        }
    }
}
