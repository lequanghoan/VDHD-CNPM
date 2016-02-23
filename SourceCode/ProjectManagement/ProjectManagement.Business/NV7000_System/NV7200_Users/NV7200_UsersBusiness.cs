using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ProjectManagement.Business.Data;
using ProjectManagement.Business.Entity;
using System.Security.Cryptography;
namespace ProjectManagement.Business.Projects
{
    public class NV7200_UserBusiness
    {
        private ProjectManagementEntities db;

        private static NV7200_UserBusiness _instance;

        public static NV7200_UserBusiness Instance()
        {
            if (_instance == null)
            {
                _instance = new NV7200_UserBusiness();
            }

            return _instance;
        }

        public NV7200_UserBusiness()
        {
            db = new ProjectManagementEntities();
        }

        /// <summary>
        /// Hàm lấy về danh sách cán bộ theo điều kiện tìm kiếm
        /// </summary>
        /// <param name="UserSearch"></param>
        /// <returns></returns>
        public ResponseMessage SearchUser(UserEntity userSearch)
        {
            var listData = (from u in db.Users.AsNoTracking()
                            join d in db.Departments.AsNoTracking() on u.DepartmentId equals d.DepartmentId
                            into pd
                            from d in pd.DefaultIfEmpty()
                            where (u.FullName.Contains(userSearch.FullName) && (userSearch.Position == 0 || userSearch.Position == u.Position)
                                && (userSearch.Status == 0 || userSearch.Status == 1 && u.LockoutEnabled || userSearch.Status == 2 && !u.LockoutEnabled))
                            select new
                        {
                            u.UserId,
                            u.FullName,
                            u.Email,
                            u.Address,
                            u.DepartmentId,
                            d.DepartmentName,
                            u.Position,
                            u.LockoutEnabled
                        }).ToList();
            ResponseMessage response = new ResponseMessage();
            response.Data = listData;
            return response;
        }
        /// <summary>
        /// Hàm lấy về danh sách tất cả cán bộ
        /// </summary>
        /// <returns></returns>
        //public ResponseMessage GetAllUser()
        //{
        //    List<UserEntity> listUser = new List<UserEntity>();
        //    UserEntity User;
        //    var listData = db.Users.AsNoTracking().ToList();
        //    foreach (var item in listData)
        //    {
        //        User = new UserEntity();
        //        User.UserId = item.UserId;
        //        User.UserName = item.UserName;
        //        User.Note = item.Note;
        //        listUser.Add(User);
        //    }
        //    ResponseMessage response = new ResponseMessage();
        //    response.Data = listUser;
        //    return response;
        //}

        /// <summary>
        /// Hàm thêm mới cán bộ
        /// </summary>
        /// <param name="userAdd">Đối tượng cần thêm mới</param>
        public ResponseMessage AddUser(UserEntity userAdd)
        {
            string constPass = "123456";
            ResponseMessage response = new ResponseMessage();
            using (var trans = db.Database.BeginTransaction())
            {
                try
                {
                    User user = new User()
                    {
                        UserId = Guid.NewGuid().ToString(),
                        UserName = userAdd.UserName,
                        FullName = userAdd.FullName,
                        Email = userAdd.Email,
                        PhoneNumber = userAdd.PhoneNumber,
                        Address = userAdd.Address,
                        DepartmentId = userAdd.DepartmentId,
                        Birthday = userAdd.Birthday,
                        RoleAdmin = userAdd.RoleAdmin,
                        LockoutEnabled = false,
                        Position = userAdd.Position
                    };
                    user.PasswordHash = CreateSalt();
                    user.SecurityStamp = ComputeHash(constPass + user.PasswordHash);
                    db.Users.Add(user);
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
        /// Hàm tạo chuỗi PasswordHash
        /// </summary>
        /// <returns></returns>
        public static string CreateSalt()
        {
            string salt = string.Empty;
            Random random = new Random();
            while (salt.Length < 32)
            {
                salt = salt + Convert.ToString(random.Next(0, 9));
            }
            return salt;
        }
        /// <summary>
        /// Hàm tạo chuỗi SecurityStamp
        /// </summary>
        /// <param name="target">chuỗi PasswordHash để tạo chuỗi SecurityStamp</param>
        /// <returns></returns>
        private string ComputeHash(string target)
        {
            SHA256Managed hashAlgorithm = new SHA256Managed();

            byte[] data = System.Text.Encoding.ASCII.GetBytes(target);

            byte[] bytes = hashAlgorithm.ComputeHash(data);

            return BitConverter.ToString(bytes).ToLower().Replace("-", string.Empty);
        }

        /// <summary>
        /// Hàm lấy về cán bộ theo id
        /// </summary>
        /// <param name="UserId">id cán bộ</param>
        /// <returns></returns>
        public ResponseMessage GetUserById(string userId)
        {
            UserEntity result = new UserEntity();
            var user = db.Users.Find(userId);
            result.UserId = userId;
            result.UserName = user.UserName;
            result.FullName = user.FullName;
            result.Email = user.Email;
            result.PhoneNumber = user.PhoneNumber;
            result.Birthday = user.Birthday;
            result.DepartmentId = user.DepartmentId;
            result.Address = user.Address;
            result.RoleAdmin = user.RoleAdmin;
            result.Position = (int)user.Position;

            ResponseMessage response = new ResponseMessage();
            response.Data = result;
            return response;
        }
        /// <summary>
        /// Hàm cập nhật cán bộ
        /// </summary>
        /// <param name="userUpdate">Thông tin cập nhật</param>
        /// <returns></returns>
        public ResponseMessage EditUser(UserEntity userUpdate)
        {
            ResponseMessage response = new ResponseMessage();
            using (var trans = db.Database.BeginTransaction())
            {
                try
                {
                    User user = db.Users.Find(userUpdate.UserId);
                    user.UserName = userUpdate.UserName;
                    user.FullName = userUpdate.FullName;
                    user.Email = userUpdate.Email;
                    user.PhoneNumber = userUpdate.PhoneNumber;
                    user.Birthday = userUpdate.Birthday;
                    user.DepartmentId = userUpdate.DepartmentId;
                    user.Address = userUpdate.Address;
                    user.Position = userUpdate.Position;
                    user.RoleAdmin = userUpdate.RoleAdmin;
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
        /// Hàm khóa/bỏ khóa cán bộ
        /// </summary>
        /// <param name="userUpdate">Thông tin cập nhật</param>
        /// <returns></returns>
        public ResponseMessage LockUser(UserEntity userUpdate)
        {
            ResponseMessage response = new ResponseMessage();
            using (var trans = db.Database.BeginTransaction())
            {
                try
                {
                    User user = db.Users.Find(userUpdate.UserId);
                    if (userUpdate.LockoutEnabled && !user.LockoutEnabled)
                        user.LockoutEnabled = true;
                    if (!userUpdate.LockoutEnabled && user.LockoutEnabled)
                        user.LockoutEnabled = false;
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
        /// Hàm xóa cán bộ
        /// </summary>
        /// <param name="userUpdate"></param>
        /// <returns></returns>
        public ResponseMessage DeleteUser(UserEntity userUpdate)
        {
            using (var trans = db.Database.BeginTransaction())
            {
                try
                {
                    User User = db.Users.Find(userUpdate.UserId);
                    db.Users.Remove(User);

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

        public LoginEntity Login(string userName, string password)
        {
            LoginEntity loginEntity = new LoginEntity();

            var userLogin = db.Users.AsNoTracking().Where(r => r.UserName.Equals(userName)).FirstOrDefault();
            if (userLogin != null)
            {
                if (userLogin.LockoutEnabled == true)
                {
                    //Tài khoản bị khóa. Lên hệ quản trị để kích hoạt lại
                    loginEntity.ResponseCode = -6;
                }
                else
                {
                    var securityStamp = ComputeHash(password + userLogin.PasswordHash);
                    var user = db.Users.AsNoTracking().Where(r => r.UserName.Equals(userName) && r.SecurityStamp.Equals(securityStamp)).FirstOrDefault();
                    if (user != null)
                    {
                        UserEntity userEntity = new UserEntity()
                        {
                            FullName = user.FullName,
                            UserName = user.UserName,
                            UserId = user.UserId
                        };

                        loginEntity.UserInfor = userEntity;
                    }
                    else
                    {
                        // Mật khẩu không đúng
                        loginEntity.ResponseCode = -5;
                    }
                }
            }
            else
            {
                // Người dùng không có trong hệ thống
                loginEntity.ResponseCode = -4;
            }


            return loginEntity;
        }

        public ResponseMessage ChangePassword(ChangePasswordEntity changePasswordEntity)
        {
            ResponseMessage response = new ResponseMessage();

            try
            {
                using (var trans = db.Database.BeginTransaction())
                {
                    try
                    {
                        var user = db.Users.Find(changePasswordEntity.USERID);
                        if (ComputeHash(changePasswordEntity.OLDPASSWORD + user.PasswordHash).Equals(user.SecurityStamp))
                        {
                            user.SecurityStamp = ComputeHash(changePasswordEntity.NEWPASSWORD + user.PasswordHash);

                            db.SaveChanges();
                            trans.Commit();

                        }
                        else
                        {
                            response.MessageText = ResponseMessage.MSG_INCORRECTPASSWORD;
                            response.Data = null;
                        }

                    }
                    catch (Exception ex)
                    {
                        trans.Rollback();
                        Console.Error.WriteLine(ex.Message);
                        response.MessageText = ResponseMessage.MSG_CANNOT_CONNECT_TO_THE_DATABASE;
                        response.Data = null;
                    }
                }
            }
            catch (Exception ex)
            {

                Console.Error.WriteLine(ex.Message);
                response.MessageText = ResponseMessage.MSG_CANNOT_CONNECT_TO_THE_DATABASE;
                response.Data = null;
            }

            return response;
        }

    }
}
