using api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class StudentController : Controller
    {

        private readonly OigaDbContext _dbContext;

        public StudentController(OigaDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        [Route("GetStudents")]

        public IEnumerable<Student> GetStudents()
        {
            var students = _dbContext.Students.ToList();

            return students;
        }
    }
}
