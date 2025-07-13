using CCB.Shared.Models;
using CCB.Shared.Constants;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using CCB.Shared.Entities;

namespace CCB.API.Endpoints
{
    public static class AuthenticationEndpoints
    {
        public static void MapAuthenticationEndpoints(this IEndpointRouteBuilder app)
        {
            var group = app.MapGroup("/api/authenticate");

            group.MapPost("/login", async (
                LoginModel model,
                UserManager<Player> userManager,
                IConfiguration configuration
            ) =>
            {
                var user = await userManager.FindByNameAsync(model.Username);
                if (user != null && await userManager.CheckPasswordAsync(user, model.Password))
                {
                    //var userRoles = await userManager.GetRolesAsync(user);

                    var authClaims = new List<Claim>
                    {
                        //new(ClaimTypes.Name, user.UserName),
                        new(ClaimTypes.Email, user.Email),
                        new(ClaimTypes.NameIdentifier, user.Id),
                        new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                    };

                    //foreach (var userRole in userRoles)
                    //{
                    //    authClaims.Add(new Claim(ClaimTypes.Role, userRole));
                    //}

                    var token = GetToken(authClaims, configuration);

                    return Results.Ok(new
                    {
                        token = new JwtSecurityTokenHandler().WriteToken(token),
                        expiration = token.ValidTo
                    });
                }

                return Results.Unauthorized();
            });

            group.MapPost("/register", async (
                RegisterModel model,
                UserManager<Player> userManager,
                RoleManager<IdentityRole> roleManager
            ) =>
            {
                var userExists = await userManager.FindByNameAsync(model.Username);
                if (userExists != null)
                    return Results.BadRequest(new Response { Status = "Error", Message = "User already exists!" });

                var user = new Player
                {
                    Email = model.Email,
                    SecurityStamp = Guid.NewGuid().ToString(),
                    UserName = model.Username
                };

                var result = await userManager.CreateAsync(user, model.Password);
                if (!result.Succeeded)
                    return Results.BadRequest(new Response { Status = "Error", Message = "User creation failed! Please check user details and try again." });

                if (!await roleManager.RoleExistsAsync(UserRoles.User))
                    await roleManager.CreateAsync(new IdentityRole(UserRoles.User));

                await userManager.AddToRoleAsync(user, UserRoles.User);

                return Results.Ok(new Response { Status = "Success", Message = "User created successfully!" });
            });

            group.MapPost("/register-admin", async (
                RegisterModel model,
                UserManager<Player> userManager,
                RoleManager<IdentityRole> roleManager
            ) =>
            {
                var userExists = await userManager.FindByNameAsync(model.Username);
                if (userExists != null)
                    return Results.BadRequest(new Response { Status = "Error", Message = "User already exists!" });

                var user = new Player
                {
                    Email = model.Email,
                    SecurityStamp = Guid.NewGuid().ToString(),
                    UserName = model.Username
                };

                var result = await userManager.CreateAsync(user, model.Password);
                if (!result.Succeeded)
                    return Results.BadRequest(new Response { Status = "Error", Message = "User creation failed! Please check user details and try again." });

                if (!await roleManager.RoleExistsAsync(UserRoles.Admin))
                    await roleManager.CreateAsync(new IdentityRole(UserRoles.Admin));

                if (!await roleManager.RoleExistsAsync(UserRoles.User))
                    await roleManager.CreateAsync(new IdentityRole(UserRoles.User));

                await userManager.AddToRoleAsync(user, UserRoles.Admin);
                await userManager.AddToRoleAsync(user, UserRoles.User);

                return Results.Ok(new Response { Status = "Success", Message = "User created successfully!" });
            });

            group.MapGet("/me", async (
                ClaimsPrincipal userPrincipal,
                UserManager<Player> userManager
            ) =>
            {
                var userId = userPrincipal.FindFirstValue(ClaimTypes.NameIdentifier);

                if (userId == null)
                    return Results.Unauthorized();

                var user = await userManager.FindByIdAsync(userId);
                if (user == null)
                    return Results.NotFound();

                var roles = await userManager.GetRolesAsync(user);

                return Results.Ok(new
                {
                    user.Id,
                    user.UserName,
                    user.Email,
                    Roles = roles
                });
            }).RequireAuthorization();
        }

        private static JwtSecurityToken GetToken(List<Claim> authClaims, IConfiguration config)
        {
            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["JWT:Secret"]));

            return new JwtSecurityToken(
                issuer: config["JWT:ValidIssuer"],
                audience: config["JWT:ValidAudience"],
                expires: DateTime.Now.AddHours(3),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
            );
        }
    }
}
