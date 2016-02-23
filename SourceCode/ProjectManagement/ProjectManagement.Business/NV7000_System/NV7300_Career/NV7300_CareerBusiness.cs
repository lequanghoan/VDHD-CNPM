using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ProjectManagement.Business.Data;
using ProjectManagement.Business.Entity;
namespace ProjectManagement.Business.Projects
{
    public class NV7300_CareerBusiness
    {
        private ProjectManagementEntities db;

        public NV7300_CareerBusiness()
        {
            db = new ProjectManagementEntities();
        }
        /// <summary>
        /// Hàm lấy về danh sách lĩnh vực theo điều kiện tìm kiếm
        /// </summary>
        /// <param name="careerSearch"></param>
        /// <returns></returns>
        public ResponseMessage SearchCareer(CareerEntity careerSearch)
        {
            List<CareerEntity> listCareer = new List<CareerEntity>();
            CareerEntity career;
            var listData = db.Careers.AsNoTracking().Where(d => d.CareerName.Contains(careerSearch.CareerName)).OrderBy(n => n.CareerName);
            foreach (var item in listData)
            {
                career = new CareerEntity();
                career.CareerId = item.CareerId;
                career.CareerName = item.CareerName;
                career.Note = item.Note;
                listCareer.Add(career);
            }
            ResponseMessage response = new ResponseMessage();
            response.Data = listCareer;
            return response;
        }
        /// <summary>
        /// Hàm lấy về danh sách tất cả lĩnh vực
        /// </summary>
        /// <returns></returns>
        public ResponseMessage GetAllCareer()
        {
            List<CareerEntity> listcareer = new List<CareerEntity>();
            CareerEntity career;
            var listData = db.Careers.AsNoTracking().ToList();
            foreach (var item in listData)
            {
                career = new CareerEntity();
                career.CareerId = item.CareerId;
                career.CareerName = item.CareerName;
                career.Note = item.Note;
                listcareer.Add(career);
            }
            ResponseMessage response = new ResponseMessage();
            response.Data = listcareer;
            return response;
        }

        /// <summary>
        /// Hàm thêm mới lĩnh vực
        /// </summary>
        /// <param name="careerAdd">Đối tượng cần thêm mới</param>
        public ResponseMessage AddCareer(CareerEntity careerAdd)
        {
            ResponseMessage response = new ResponseMessage();
            using (var trans = db.Database.BeginTransaction())
            {
                try
                {
                    Career Career = new Career()
                    {
                        CareerId = Guid.NewGuid().ToString(),
                        CareerName = careerAdd.CareerName,
                        Note = careerAdd.Note
                    };

                    db.Careers.Add(Career);
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
        /// Hàm lấy về lĩnh vực theo id
        /// </summary>
        /// <param name="careerId">id lĩnh vực</param>
        /// <returns></returns>
        public ResponseMessage GetCareerById(string careerId)
        {
            CareerEntity result = new CareerEntity();
            var Career = db.Careers.Find(careerId);
            result.CareerId = careerId;
            result.CareerName = Career.CareerName;
            result.Note = Career.Note;
            ResponseMessage response = new ResponseMessage();
            response.Data = result;
            return response;
        }
        /// <summary>
        /// Hàm cập nhật lĩnh vực
        /// </summary>
        /// <param name="careerUpdate">Thông tin cập nhật</param>
        /// <returns></returns>
        public ResponseMessage EditCareer(CareerEntity careerUpdate)
        {
            ResponseMessage response = new ResponseMessage();
            using (var trans = db.Database.BeginTransaction())
            {
                try
                {
                    Career Career = db.Careers.Find(careerUpdate.CareerId);
                    Career.CareerName = careerUpdate.CareerName;
                    Career.Note = careerUpdate.Note;
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
        /// Hàm xóa lĩnh vực
        /// </summary>
        /// <param name="careerUpdate"></param>
        /// <returns></returns>
        public ResponseMessage DeleteCareer(CareerEntity careerUpdate)
        {
            using (var trans = db.Database.BeginTransaction())
            {
                try
                {
                    Career Career = db.Careers.Find(careerUpdate.CareerId);
                    db.Careers.Remove(Career);

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
