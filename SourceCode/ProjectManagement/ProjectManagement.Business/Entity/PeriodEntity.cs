using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjectManagement.Business.Entity
{
    public class PeriodEntity
    {
        public string PeriodId { get; set; }
        public int? Year { get; set; }
        public decimal? Amount { get; set; }
        public decimal? AmountReutrn { get; set; }
        public decimal? AmountForward { get; set; }
        public decimal? BalanceForward { get; set; }
        public string ProjectId { get; set; }
        public string Note { get; set; }

    }
}
