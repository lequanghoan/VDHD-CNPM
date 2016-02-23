using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjectManagement.Business.Entity
{
  public  class ChangePasswordEntity
    {
      public string USERID { get; set; }
      public string USERNAME { get; set; }
      public string OLDPASSWORD { get; set; }
      public string NEWPASSWORD { get; set; }
      public string CONFIRMNEWPASSWORD { get; set; }

    }
}
