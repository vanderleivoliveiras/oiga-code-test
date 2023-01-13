using api.DTOs;
using api.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private readonly OigaDbContext _dbContext;

        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger, OigaDbContext dbContext)
        {
            _logger = logger;
            _dbContext = dbContext;
        }

        [HttpGet(Name = "GetWeatherForecast")]
        public IEnumerable<Course> Get()
        {
            var test = _dbContext.Courses.ToList();

            return test;
        }

        [HttpGet]
        [Route("GetStudents")]

        public IEnumerable<Student> GetStudents()
        {
            var students = _dbContext.Students.ToList();

            return students;
        }

        [HttpGet]
        [Route("GetCoursesByStudent")]
        public IEnumerable<Course> GetCoursesByStudent(Guid studentId)
        {
            //use join here
            var coursesIds = _dbContext.CourseStudents.Where(w => w.StudentId == studentId).Select(s => s.CourseId);
            var courses = _dbContext.Courses.Where(w => coursesIds.Contains(w.Id));

            return courses;
        }

        [HttpGet]
        [Route("GetCourseEvaluation")]
        public IEnumerable<Evaluation> GetCourseEvaluation(Guid courseId)
        {
            //use join here
            var courseStudentIds = _dbContext.CourseStudents.Where(w => w.CourseId == courseId).Select(s => s.Id);
            var evaluations = _dbContext.Evaluations.Where(w => w.CourseStudentId.HasValue && courseStudentIds.Contains(w.CourseStudentId.Value));

            return evaluations;
        }


        [HttpPost]
        [Route("InsertEvaluation")]
        public string InsertEvaluation(EvaluationDto eval)
        {
            var courseStudent = _dbContext.CourseStudents.Where(courseStudent => courseStudent.CourseId == eval.CourseId && courseStudent.StudentId == eval.StudentId).FirstOrDefault();
            var teste = new Evaluation()
            {
                Id = Guid.NewGuid(),
                CourseStudentId = courseStudent?.Id,
                Stars = eval.Stars,
                Description = eval.Description,
                CourseStudent = courseStudent,
                CreationDate  = DateTime.Now 
            };
            var result = _dbContext.Evaluations.Add(teste);

            _dbContext.SaveChanges();

            return "ok";
        }
    }
}