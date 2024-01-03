CREATE OR REPLACE FUNCTION UpdateProjectCost(projectId INT, serviceCost INT)
RETURNS VOID AS $$
DECLARE
  currentCost INT;
BEGIN
  -- Obtener el costo actual del proyecto
  SELECT costo INTO currentCost FROM proyectos WHERE id = projectId;

  -- Actualizar el costo total del proyecto
  UPDATE proyectos SET costo = currentCost + serviceCost WHERE id = projectId;
END;
$$ LANGUAGE plpgsql;
