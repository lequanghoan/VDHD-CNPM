using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjectManagement.Business.Entity
{
    public class LoginEntity
    {
        private int _ResponseCode;
        public int ResponseCode 
        {
            get { return _ResponseCode; }
            set
            {
                _ResponseCode = value;
                switch (_ResponseCode)
                {
                    case -1:
                        ResponseMessage = "Không kết nối được với máy chủ Dữ liệu. Vui lòng liên hệ với quản trị Hệ thống";
                        break;
                    case -2:
                        ResponseMessage = "Đơn vị quản lý của Người sử dụng không thuộc phạm vi Hệ thống. Vui lòng kiểm tra lại";
                        break;
                    case -3:
                        ResponseMessage = "Bạn chưa được phân quyền sử dụng. Vui lòng liên hệ với Quản trị Hệ thống";
                        break;
                    case -4:
                        ResponseMessage = "Người sử dụng không có trong Hệ thống. Vui lòng kiểm tra lại hoặc liên hệ với Quản trị Hệ thống";
                        break;
                    case -5:
                        ResponseMessage = "Sai mật khẩu. Vui lòng kiểm tra lại hoặc liên hệ với Quản trị Hệ thống";
                        break;
                    case -6:
                        ResponseMessage = "Người sử dụng đã bị khóa tài khoản. Liên hệ với Quản trị Hệ thống";
                        break;
                    case -7:
                        ResponseMessage = "Người sử dụng đã bị hủy bỏ";
                        break;
                    case -8:
                        ResponseMessage = "Sai tên hoặc mật khẩu";
                        break;

                    case 0: // Everything is OK
                        ResponseMessage = string.Empty;
                        break;

                    case 1:
                        ResponseMessage = "Mật khẩu đã hết hạn dùng. Đề nhị thay đổi trước khi sử dụng chương trình";
                        break;
                    default: 
                        ResponseMessage = string.Empty;
                        return;
                }
            }
        }
        public string ResponseMessage { get; private set; }

        private UserEntity _userInfor = new UserEntity();
        public UserEntity UserInfor 
        {
            get { return _userInfor; }
            set { _userInfor = value; }
        }
    }
}
