using System;

namespace DTO
{
    public abstract class BaseDTO
    {
        public Guid? Id { get; set; }
    }
    public abstract class BaseDTO<TIdType> : BaseDTO
    {
        public new TIdType Id { get; set; }
    }
}
