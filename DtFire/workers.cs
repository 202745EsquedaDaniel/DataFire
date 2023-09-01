using Microsoft.EntityFrameworkCore;

public class Workers{
    public int Id {get;set;}
    public string? nombre{get;set;}
    public string? apellidos{get;set;}
    public string? detalles{get;set;}
    public string[]? encargos {get;set;}
    public float pago{get;set;}
    public DateTime fechaPago{get;set;}
    public float pagoMensual{get;set;}
}

class WorkerDb : DbContext{
    public WorkerDb(DbContextOptions<WorkerDb> options)
        :base(options){}

    public DbSet<Workers> Workers => Set<Workers>();
}