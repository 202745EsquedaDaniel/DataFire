using Microsoft.EntityFrameworkCore;

public class Partners{
    public int Id {get;set;}
    public string? nombreCliente {get;set;}
    public string? apellidoCliente {get;set;}
    public bool? linkProtecto {get;set;}
    public float deuda {get;set;}
    public string[]? proyectos {get;set;}
    
}

class PartnerDb: DbContext{
    public PartnerDb(DbContextOptions<PartnerDb> options)
        :base(options){}
    public DbSet<Partners> Partners => Set<Partners>();
}