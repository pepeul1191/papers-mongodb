db.papers.updateMany({}, { $set: { tags: [] } })

db.papers.updateMany(
  {}, // Filtro vacío para seleccionar todos los documentos
  { $set: { search_string_id: null } } // Define el nuevo campo y su valor por defecto
);