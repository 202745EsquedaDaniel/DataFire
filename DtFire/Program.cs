using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<TodoDb>(opt => opt.UseInMemoryDatabase("TodoList"));
builder.Services.AddDbContext<WorkerDb>(opt => opt.UseInMemoryDatabase("WorkerList"));
builder.Services.AddDbContext<PartnerDb>(opt => opt.UseInMemoryDatabase("PartnerList"));
builder.Services.AddDbContext<ProjectDb>(opt => opt.UseInMemoryDatabase("ProjectList"));

builder.Services.AddDatabaseDeveloperPageExceptionFilter();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c=> {
    c.SwaggerDoc("v1", new OpenApiInfo {
        Title = "DataFire API", 
        Description = "Datos del servicio DataFire", 
        Version = "v1"
        });
    }
);

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI( c => {c.SwaggerEndpoint("/swagger/v1/swagger.json","DataFire API V1");});

app.MapGet("/", () => "Hello World!");


//Zona de enrutamiento de los trabajadores
app.MapGet("/workers",async(WorkerDb db) => await db.Workers.ToListAsync());

//Zona de enrutamiento de los clientes
app.MapGet("/partners", async(PartnerDb db) => await db.Partners.ToListAsync());


//**
//Zona de enrutamiento de los proyectos
app.MapGet("/projects", async(ProjectDb db) => 
    await db.Projects.ToListAsync());

app.MapPost("/projects/{id}", async(int id, ProjectDb db) => 
    await db.Projects.FindAsync(id)
        is  Projects projects
        ? Results.Ok(projects)
        : Results.NotFound());

//**
app.MapGet("/todoitems", async (TodoDb db) =>
    await db.Todos.ToListAsync());

app.MapGet("/todoitems/complete", async (TodoDb db) =>
    await db.Todos.Where(t => t.IsComplete).ToListAsync());

//Get que obtiene los datos mediante el id
app.MapGet("/todoitems/{id}", async (int id, TodoDb db) =>
    await db.Todos.FindAsync(id)
        is Todo todo
            ? Results.Ok(todo)
            : Results.NotFound());

//API QUE LLAMA A TODOS LOS ITEMS DE LA LISTA
app.MapPost("/todoitems", async (Todo todo, TodoDb db) =>
{
    db.Todos.Add(todo);
    await db.SaveChangesAsync();

    return Results.Created($"/todoitems/{todo.Id}", todo);
});

app.MapPut("/todoitems/{id}", async (int id, Todo inputTodo, TodoDb db) =>
{
    var todo = await db.Todos.FindAsync(id);

    if (todo is null) return Results.NotFound();

    todo.Name = inputTodo.Name;
    todo.IsComplete = inputTodo.IsComplete;

    await db.SaveChangesAsync();

    return Results.NoContent();
});
//Borrar mediante id un item de la lista
app.MapDelete("/todoitems/{id}", async (int id, TodoDb db) =>
{
    if (await db.Todos.FindAsync(id) is Todo todo)
    {
        db.Todos.Remove(todo);
        await db.SaveChangesAsync();
        return Results.NoContent();
    }

    return Results.NotFound();
});

app.Run();
