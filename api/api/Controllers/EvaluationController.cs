using api.DTOs;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EvaluationController : Controller
    {
        private readonly OigaDbContext _dbContext;

        public EvaluationController(OigaDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        [Route("GetCourseEvaluation")]
        public IEnumerable<Evaluation> GetCourseEvaluation(Guid courseId)
        {
            var courseStudentIds = _dbContext.CourseStudents.Where(w => w.CourseId == courseId).Select(s => s.Id);
            var evaluations = _dbContext.Evaluations.Where(w => w.CourseStudentId.HasValue && courseStudentIds.Contains(w.CourseStudentId.Value)).OrderByDescending(ob => ob.CreationDate);

            return evaluations;
        }


        [HttpPost]
        [Route("InsertEvaluation")]
        public string InsertEvaluation(EvaluationDto eval)
        {
            var courseStudent = _dbContext.CourseStudents.Where(courseStudent => courseStudent.CourseId == eval.CourseId && courseStudent.StudentId == eval.StudentId).FirstOrDefault();
            var evaluation = new Evaluation()
            {
                Id = Guid.NewGuid(),
                CourseStudentId = courseStudent?.Id,
                Stars = eval.Stars,
                Description = eval.Description,
                CourseStudent = courseStudent,
                CreationDate = DateTime.Now
            };
            var result = _dbContext.Evaluations.Add(evaluation);

            _dbContext.SaveChanges();

            return "ok";
        }
    }
}
