/**
 * Utilitários para manipulação de datas sem problemas de timezone
 */

/**
 * Formata uma data ISO ou Date object para DD/MM/YYYY
 * Não sofre com problemas de timezone porque extrai diretamente os componentes
 */
export function formatDateBR(date: Date | string): string {
  if (typeof date === 'string') {
    // Extrai apenas a parte da data (YYYY-MM-DD) ignorando timezone
    const dateOnly = date.split('T')[0];
    const [year, month, day] = dateOnly.split('-');
    return `${day}/${month}/${year}`;
  }
  
  // Se for Date object, formata diretamente
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${day}/${month}/${year}`;
}

/**
 * Converte Date para string ISO ao meio-dia UTC (evita mudança de dia)
 * Útil para enviar datas ao backend
 */
export function dateToISONoon(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}T12:00:00.000Z`;
}

/**
 * Converte string de input datetime-local para ISO
 * Formatos aceitos:
 * - YYYY-MM-DD -> YYYY-MM-DDT12:00:00.000Z
 * - YYYY-MM-DDTHH:mm -> YYYY-MM-DDTHH:mm:00.000Z
 */
export function datetimeLocalToISO(datetime: string): string {
  if (!datetime.includes('T')) {
    // Só data, adiciona meio-dia UTC
    return `${datetime}T12:00:00.000Z`;
  } else if (!datetime.endsWith('Z')) {
    // datetime-local sem Z, adiciona
    return `${datetime}:00.000Z`;
  }
  return datetime;
}
