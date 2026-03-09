using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Reflection;

namespace SharedKernel
{
    public static class SystemExtendedMethods
    {
        public static IEnumerable<TSource> DistinctBy<TSource>(this IEnumerable<TSource> source, params Func<TSource, object>[] keySelectors)
        {
            var keys = keySelectors.ToDictionary(x => x, x => new HashSet<object>());

            foreach (var element in source)
            {
                var flag = true;

                foreach (var (keySelector, hashSet) in keys)
                {
                    flag = flag && hashSet.Add(keySelector(element));
                }

                if (flag)
                {
                    yield return element;
                }
            }
        }
    }

    public enum Errors
    {
        [Description("General Error")]
        GeneralError = 0,
        [Description("Validation Failed")]
        ValidationFailed = 1,
        [Description("{0}")]
        InternalServreError = 2
    }
    public static class Enums
    {
        public static string GetEnumDescription<T>(T value)
        {
            FieldInfo fi = value.GetType().GetField(value.ToString());

            if (fi != null)
            {
                DescriptionAttribute[] attributes =
                (DescriptionAttribute[])fi.GetCustomAttributes(typeof(DescriptionAttribute), false);

                if (attributes != null && attributes.Length > 0)
                {
                    return attributes[0].Description;
                }
                else
                {
                    return value.ToString();
                }
            }
            else
            {
                return value.ToString();
            }

        }
    }
}