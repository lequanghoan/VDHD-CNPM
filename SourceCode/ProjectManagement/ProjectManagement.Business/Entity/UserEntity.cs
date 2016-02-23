using ProjectManagement.Business.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjectManagement.Business.Entity
{
    public class UserEntity
    {
        public string UserId { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public string SecurityStamp { get; set; }
        public string PhoneNumber { get; set; }
        public bool LockoutEnabled { get; set; }
        public string UserName { get; set; }
        public string DepartmentId { get; set; }
        public string FullName { get; set; }
        public string Address { get; set; }
        public DateTime? Birthday { get; set; }
        public bool RoleAdmin { get; set; }
        public int Role { get; set; }
        public int Position { get; set; }
        // Biến dùng cho việc Search Cán bộ
        public int Status { get; set; }
        // Biến lưu chuỗi mật khẩu từ Client truyền lên
        public string Password { get; set; }
        //public virtual Department Department { get; set; }
    }
}
