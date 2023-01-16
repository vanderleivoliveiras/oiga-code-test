using api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CourseController : Controller
    {
        private readonly OigaDbContext _dbContext;

        public CourseController(OigaDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public IEnumerable<Course> Get()
        {
            return _dbContext.Courses.ToList();
        }

        [HttpGet]
        [Route("GetCoursesByStudent")]
        public IEnumerable<Course> GetCoursesByStudent(Guid studentId)
        {
            //use join here

            var courses  = _dbContext.CourseStudents.Where(w => w.StudentId == studentId)
              .Join(_dbContext.Courses,
                cs => cs.CourseId,
                c => c.Id,
                (cs, c) =>
                new Course
                {
                    Id = c.Id,
                    Name = c.Name,
                    CreationDate = c.CreationDate,
                    Active = c.Active,
                }
            );

            return courses;
        }
    }
}
