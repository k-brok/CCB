using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CCB.Shared.Entities
{
    public class City
    {
        public Guid Id { get; set; }
        public List<Tile> Tiles { get; set; }
        public Guid Mayor {  get; set; }
    }
}
