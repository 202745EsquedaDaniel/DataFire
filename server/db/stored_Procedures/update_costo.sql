CREATE OR REPLACE FUNCTION UpdateProjectCost(projectId INT, serviceCost INT)
RETURNS VOID AS $$
DECLARE
  currentCost INT;
BEGIN
  RAISE NOTICE 'Calling UpdateProjectCost for Project ID: % with Service Cost: %', projectId, serviceCost;

  -- Obtener el costo actual del proyecto
  SELECT costo INTO currentCost FROM proyectos WHERE id = projectId;

  -- Actualizar el costo total del proyecto
  UPDATE proyectos SET costo = currentCost + serviceCost WHERE id = projectId;
END;
$$ LANGUAGE plpgsql;
