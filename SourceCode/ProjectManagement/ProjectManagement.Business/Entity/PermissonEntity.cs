using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjectManagement.Business.Entity
{
    public class PermissonEntity
    {
        public string PermissionId { get; set; }
        public string ProjectId { get; set; }
        public string UserId { get; set; }
        public int? Role { get; set; }

    }
}
