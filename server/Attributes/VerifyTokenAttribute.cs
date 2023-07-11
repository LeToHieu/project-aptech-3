using System;
using MediaWebApi.Filters;
using Microsoft.AspNetCore.Mvc;

namespace MediaWebApi.Attributes
{
    public class VerifyTokenAttribute : TypeFilterAttribute
    {

        public VerifyTokenAttribute()
            : base(typeof(VerifyTokenFilter))
        {

        }
    }
}