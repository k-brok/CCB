using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;

public static class EndpointConventionBuilderExtensions
{
    public static RouteHandlerBuilder RequireRole(
        this RouteHandlerBuilder builder, params string[] roles)
    {
        var authorizeAttr = new AuthorizeAttribute
        {
            Roles = string.Join(",", roles)
        };

        return builder.RequireAuthorization(authorizeAttr);
    }
}