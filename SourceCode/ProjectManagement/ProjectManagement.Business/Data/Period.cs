//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace ProjectManagement.Business.Data
{
    using System;
    using System.Collections.Generic;
    
    public partial class Period
    {
        public string PeriodId { get; set; }
        public Nullable<int> Year { get; set; }
        public Nullable<decimal> Amount { get; set; }
        public Nullable<decimal> AmountReutrn { get; set; }
        public Nullable<decimal> AmountForward { get; set; }
        public Nullable<decimal> BalanceForward { get; set; }
        public string ProjectId { get; set; }
        public string Note { get; set; }
    }
}
