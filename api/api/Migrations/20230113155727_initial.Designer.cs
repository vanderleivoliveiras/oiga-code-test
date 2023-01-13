﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using api.Models;

#nullable disable

namespace api.Migrations
{
    [DbContext(typeof(OigaDbContext))]
    [Migration("20230113155727_initial")]
    partial class initial
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.2")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("api.Models.Course", b =>
                {
                    b.Property<Guid>("Id")
                        .HasColumnType("uniqueidentifier")
                        .HasColumnName("id");

                    b.Property<bool?>("Active")
                        .HasColumnType("bit")
                        .HasColumnName("active");

                    b.Property<DateTime?>("CreationDate")
                        .HasColumnType("date")
                        .HasColumnName("creation_date");

                    b.Property<string>("Name")
                        .HasMaxLength(100)
                        .IsUnicode(false)
                        .HasColumnType("varchar(100)")
                        .HasColumnName("name");

                    b.HasKey("Id");

                    b.ToTable("Courses");
                });

            modelBuilder.Entity("api.Models.CourseStudent", b =>
                {
                    b.Property<Guid>("Id")
                        .HasColumnType("uniqueidentifier")
                        .HasColumnName("id");

                    b.Property<Guid?>("CourseId")
                        .HasColumnType("uniqueidentifier")
                        .HasColumnName("course_id");

                    b.Property<int?>("Grade")
                        .HasColumnType("int")
                        .HasColumnName("grade");

                    b.Property<Guid?>("StudentId")
                        .HasColumnType("uniqueidentifier")
                        .HasColumnName("student_id");

                    b.HasKey("Id");

                    b.HasIndex("CourseId");

                    b.HasIndex("StudentId");

                    b.ToTable("CourseStudents");
                });

            modelBuilder.Entity("api.Models.Evaluation", b =>
                {
                    b.Property<Guid>("Id")
                        .HasColumnType("uniqueidentifier")
                        .HasColumnName("id");

                    b.Property<Guid?>("CourseStudentId")
                        .HasColumnType("uniqueidentifier")
                        .HasColumnName("course_student_id");

                    b.Property<DateTime?>("CreationDate")
                        .HasColumnType("date")
                        .HasColumnName("creation_date");

                    b.Property<string>("Description")
                        .IsUnicode(false)
                        .HasColumnType("varchar(max)")
                        .HasColumnName("description");

                    b.Property<int?>("Stars")
                        .HasColumnType("int")
                        .HasColumnName("stars");

                    b.HasKey("Id");

                    b.HasIndex("CourseStudentId");

                    b.ToTable("Evaluations");
                });

            modelBuilder.Entity("api.Models.Student", b =>
                {
                    b.Property<Guid>("Id")
                        .HasColumnType("uniqueidentifier")
                        .HasColumnName("id");

                    b.Property<bool?>("Active")
                        .HasColumnType("bit")
                        .HasColumnName("active");

                    b.Property<DateTime?>("CreationDate")
                        .HasColumnType("date")
                        .HasColumnName("creation_date");

                    b.Property<string>("LastName")
                        .HasMaxLength(100)
                        .IsUnicode(false)
                        .HasColumnType("varchar(100)")
                        .HasColumnName("last_name");

                    b.Property<string>("Name")
                        .HasMaxLength(100)
                        .IsUnicode(false)
                        .HasColumnType("varchar(100)")
                        .HasColumnName("name");

                    b.HasKey("Id");

                    b.ToTable("Students");
                });

            modelBuilder.Entity("api.Models.CourseStudent", b =>
                {
                    b.HasOne("api.Models.Course", "Course")
                        .WithMany("CourseStudents")
                        .HasForeignKey("CourseId")
                        .HasConstraintName("FK_CourseStudents_Courses");

                    b.HasOne("api.Models.Student", "Student")
                        .WithMany("CourseStudents")
                        .HasForeignKey("StudentId")
                        .HasConstraintName("FK_CourseStudents_Students");

                    b.Navigation("Course");

                    b.Navigation("Student");
                });

            modelBuilder.Entity("api.Models.Evaluation", b =>
                {
                    b.HasOne("api.Models.CourseStudent", "CourseStudent")
                        .WithMany("Evaluations")
                        .HasForeignKey("CourseStudentId")
                        .HasConstraintName("FK_Evaluations_CourseStudents");

                    b.Navigation("CourseStudent");
                });

            modelBuilder.Entity("api.Models.Course", b =>
                {
                    b.Navigation("CourseStudents");
                });

            modelBuilder.Entity("api.Models.CourseStudent", b =>
                {
                    b.Navigation("Evaluations");
                });

            modelBuilder.Entity("api.Models.Student", b =>
                {
                    b.Navigation("CourseStudents");
                });
#pragma warning restore 612, 618
        }
    }
}
