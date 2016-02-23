using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjectManagement.Business
{
    public class ResponseMessage
    {
        public const string MSG_CANNOT_CONNECT_TO_THE_DATABASE = "Không thể truy cập dữ liệu từ server. Vui lòng liên hệ quản trị.";
        public const string MSG_MAXNUMBERRECORD = "Số bản ghi tìm thấy lớn hơn giới hạn cho phép. Đề nghị thêm điều kiện tìm kiếm.";
        public const string MSG_INCORRECTPASSWORD = "Mật khẩu cũ nhập không chính xác.";

        /// <summary>
        /// The friendly message to the UI. Empty is default value, that means no problem.
        /// </summary>
        public string MessageText { get; set; }

        /// <summary>
        /// Indicate that the message responses successfully, when MessageText is null or empty;
        /// </summary>
        public bool IsSuccess
        {
            get { return string.IsNullOrEmpty(MessageText); }
        }

        /// <summary>
        /// The data object may be a DataTable, a model,....
        /// When a problem occurs, the Data maybe null and the MessageText will show the reason.
        /// </summary>
        public object Data { get; set; }
    }
}
