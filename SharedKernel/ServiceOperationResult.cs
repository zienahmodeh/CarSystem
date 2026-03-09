using System.Collections.Generic;

namespace SharedKernel
{
    public class ServiceOperationResult<T>
    {
        public ServiceOperationResult()
        {
            ErrorCodes = new List<Errors>();
            IsSuccessfull = true;
        }

        public bool IsSuccessfull { get; set; }
        public T Result { get; set; }
        public List<Errors> ErrorCodes { get; set; }
        public List<string> Errors
        {
            get
            {
                var _Errors = new List<string>();
                foreach (var error in ErrorCodes)
                {
                    _Errors.Add(Enums.GetEnumDescription(error));
                }
                return _Errors;
            }
        }
    }
    public class ServiceOperationResult<T1,T2> where T2 : struct
    {
        public ServiceOperationResult()
        {
            ErrorCodes = new List<T2>();
            IsSuccessfull = true;
        }

        public bool IsSuccessfull { get; set; }
        public T1 Result { get; set; }
        public List<T2> ErrorCodes { get; set; }
        public List<string> Errors
        {
            get
            {
                var _Errors = new List<string>();
                foreach (var error in ErrorCodes)
                {
                    _Errors.Add(Enums.GetEnumDescription(error));
                }
                return _Errors;
            }
        }
    }
    public class ServiceOperationResult
    {
        public ServiceOperationResult()
        {
            ErrorCodes = new List<Errors>();
            IsSuccessfull = true;
        }

        public bool IsSuccessfull { get; set; }
        public List<Errors> ErrorCodes { get; set; }
        public List<string> Errors
        {
            get
            {
                var _Errors = new List<string>();
                foreach (var error in ErrorCodes)
                {
                    _Errors.Add(Enums.GetEnumDescription(error));
                }
                return _Errors;
            }
        }
    }
}
