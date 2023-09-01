using System;
public class Projects {
    public int Id {get; set;}
    public string? nameProyecto {get;set;}
    public string? description {get;set;}
    public float costoProyecto{get;set;}
    public DateTime fechaInicio{get;set;}
    public DateTime fechaFinal {get;set;}
    public bool divisionPay {get;set;}
    public bool variosClientes {get;set;}
    public string[]? clientes {get;set;}
    public string[]? trabajadores {get;set;}

}