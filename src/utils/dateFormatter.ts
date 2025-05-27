/**
 * Formatea una fecha en formato ISO (YYYY-MM-DD) al formato español de Perú
 * Evita problemas de zona horaria que pueden hacer que la fecha se muestre un día antes
 * 
 * @param dateString - Cadena de fecha en formato ISO (YYYY-MM-DD)
 * @returns - Fecha formateada en español de Perú
 */
export const formatDatePeru = (dateString: string): string => {
  if (!dateString) return '';
  
  // Extraemos los componentes de la fecha directamente
  const [year, month, day] = dateString.split('-').map(num => parseInt(num, 10));
  
  // Creamos un array con los nombres de los meses en español
  const months = [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
  ];
  
  // Formato: día de mes de año (ejemplo: 26 de mayo de 2024)
  return `${day} de ${months[month - 1]} de ${year}`;
};
