using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjectManagement.Business.Entity
{
    public class PeriodDetailEntity
    {
        public string PeriodDetailId { get; set; }
        public int? Type { get; set; }
        public int? Amount { get; set; }
        public DateTime? AmountDate { get; set; }
        public decimal? AdvanceAmount { get; set; }
        public DateTime? AdvanceDate { get; set; }
        public decimal? Payment { get; set; }
        public DateTime? PaymentDate { get; set; }
        public string Note { get; set; }
        public string ProjectId { get; set; }

    }
}
