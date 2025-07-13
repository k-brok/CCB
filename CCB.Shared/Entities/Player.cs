using Microsoft.AspNetCore.Identity;

namespace CCB.Shared.Entities
{
    public class Player : IdentityUser
    {
        public List<City> Citys { get; set; }
    }
}
