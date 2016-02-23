using ProjectManagement.Business.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjectManagement.Business.Entity
{
    public class ProfileEntity
    {
        public string ProfileId { get; set; }
        public string ProfileName { get; set; }
        public string Description { get; set; }
        public string FileName { get; set; }
        public string ProjectId { get; set; }
        public string PathFile { get; set; }
    }
}
