using ProjectManagement.Business.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjectManagement.Business.Entity
{
    public class DepartmentEntity
    {
        public string DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        public string Note { get; set; }
    
        //public virtual ICollection<User> Users { get; set; }
    }
}
