using System;

namespace SharedKernel
{
    public class Hook<T>
    {
        public Object Id { get; set; }
        public string Text
        {
            get
            {
                T enumVal = (T)Enum.Parse(typeof(T), Id.ToString());

                return Enums.GetEnumDescription(enumVal);
            }
        }
    }
    public class Hook
    {
        public Guid? Id { get; set; }
        public string Text { get; set; }
    }
    public class Hook<T1, T2>
    {
        public T1 Id { get; set; }
        public T2 Text { get; set; }
    }
}