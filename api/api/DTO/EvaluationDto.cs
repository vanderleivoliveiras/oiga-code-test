using System;
using System.Collections.Generic;

namespace api.DTOs;

public partial class EvaluationDto
{
    public Guid CourseId { get; set; }

    public Guid? StudentId { get; set; }

    public int? Stars { get; set; }

    public string? Description { get; set; }
}
