using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjectManagement.Business.Entity
{
    public class ScheduleEntity
    {
        public string ScheduleId { get; set; }
        public string ScheduleName { get; set; }
        public string Content { get; set; }
        public int? MonthFrom { get; set; }
        public int? YearFrom { get; set; }
        public int? MonthTo { get; set; }
        public int? YearTo { get; set; }
        public bool? IsComplete { get; set; }
        public string Note { get; set; }
        public string ProjectId { get; set; }

    }
}
