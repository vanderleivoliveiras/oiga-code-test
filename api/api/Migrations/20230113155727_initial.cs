using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Courses",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    name = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: true),
                    creationdate = table.Column<DateTime>(name: "creation_date", type: "date", nullable: true),
                    active = table.Column<bool>(type: "bit", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Courses", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Students",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    name = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: true),
                    lastname = table.Column<string>(name: "last_name", type: "varchar(100)", unicode: false, maxLength: 100, nullable: true),
                    creationdate = table.Column<DateTime>(name: "creation_date", type: "date", nullable: true),
                    active = table.Column<bool>(type: "bit", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Students", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "CourseStudents",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    courseid = table.Column<Guid>(name: "course_id", type: "uniqueidentifier", nullable: true),
                    studentid = table.Column<Guid>(name: "student_id", type: "uniqueidentifier", nullable: true),
                    grade = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CourseStudents", x => x.id);
                    table.ForeignKey(
                        name: "FK_CourseStudents_Courses",
                        column: x => x.courseid,
                        principalTable: "Courses",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK_CourseStudents_Students",
                        column: x => x.studentid,
                        principalTable: "Students",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "Evaluations",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    coursestudentid = table.Column<Guid>(name: "course_student_id", type: "uniqueidentifier", nullable: true),
                    stars = table.Column<int>(type: "int", nullable: true),
                    description = table.Column<string>(type: "varchar(max)", unicode: false, nullable: true),
                    creationdate = table.Column<DateTime>(name: "creation_date", type: "date", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Evaluations", x => x.id);
                    table.ForeignKey(
                        name: "FK_Evaluations_CourseStudents",
                        column: x => x.coursestudentid,
                        principalTable: "CourseStudents",
                        principalColumn: "id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_CourseStudents_course_id",
                table: "CourseStudents",
                column: "course_id");

            migrationBuilder.CreateIndex(
                name: "IX_CourseStudents_student_id",
                table: "CourseStudents",
                column: "student_id");

            migrationBuilder.CreateIndex(
                name: "IX_Evaluations_course_student_id",
                table: "Evaluations",
                column: "course_student_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Evaluations");

            migrationBuilder.DropTable(
                name: "CourseStudents");

            migrationBuilder.DropTable(
                name: "Courses");

            migrationBuilder.DropTable(
                name: "Students");
        }
    }
}
