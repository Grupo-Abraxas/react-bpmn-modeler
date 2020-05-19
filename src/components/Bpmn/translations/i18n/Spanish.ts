const i18nSpanish: Record<string, string> = {
  // Palette buttons
  'Activate the hand tool': 'Activar la herramienta de mano',
  'Activate the lasso tool': 'Activar la herramienta de lazo',
  'Activate the create/remove space tool': 'Activar la herramienta de crear/eliminar espacio',
  'Activate the global connect tool': 'Activar la herramienta de conexión global',
  'Create expanded SubProcess': 'Crear subproceso expandido',
  'Create DataObjectReference': 'Crear referencia de objeto de datos',
  'Create DataStoreReference': 'Crear referencia de almacén de datos',
  'Create Group': 'Crear grupo',
  // Start tool
  'Create StartEvent': 'Crear evento Inicio',
  'Intermediate Throw Event': 'Evento de lanzamiento intermedio',
  'End Event': 'Fin del evento',
  'Message Start Event': 'Evento de inicio de mensaje',
  'Timer Start Event': 'Evento de inicio del temporizador',
  'Conditional Start Event': 'Evento de inicio condicional',
  'Signal Start Event': 'Evento de inicio de señal',
  // Intermediate/Boundary tool
  'Create Intermediate/Boundary Event': 'Crear evento Intermedio/Límite',
  'Start Event': 'Iniciar evento',
  'Message Intermediate Catch Event': 'Mensaje de captura de evento intermedio',
  'Message Intermediate Throw Event': 'Evento de lanzamiento intermedio de mensaje',
  'Timer Intermediate Catch Event': 'Temporizador de captura de eventos intermedios',
  'Escalation Intermediate Throw Event': 'Evento de lanzamiento intermedio de escalada',
  'Conditional Intermediate Catch Event': 'Evento de captura intermedia condicional',
  'Link Intermediate Catch Event': 'Evento de captura de enlace intermedio',
  'Link Intermediate Throw Event': 'Evento de lanzamiento intermedio de enlace',
  'Compensation Intermediate Throw Event': 'Evento de lanzamiento intermedio de compensación',
  'Signal Intermediate Catch Event': 'Evento de captura de señal intermedia',
  'Signal Intermediate Throw Event': 'Evento de lanzamiento intermedio de señal',
  // End tool
  'Create EndEvent': 'Crear evento Fin',
  'Message End Event': 'Evento de fin de mensaje',
  'Escalation End Event': 'Evento de fin de escalamiento',
  'Error End Event': 'Evento de fin de error',
  'Compensation End Event': 'Evento final de compensación',
  'Signal End Event': 'Evento de fin de señal',
  'Terminate End Event': 'Finalizar evento final',
  // Create Gateway tool
  'Create Gateway': 'Crear puerta de enlace',
  'Parallel Gateway': 'Puerta de enlace paralela',
  'Inclusive Gateway': 'Portal inclusivo',
  'Complex Gateway': 'Complejo Gateway',
  'Event based Gateway': 'Gateway basado en eventos',
  //
  'Create Task': 'Crear tarea',
  'Parallel Multi Instance': 'Instancia múltiple paralela',
  'Sequential Multi Instance': 'Instancia múltiple secuencial',
  Loop: 'Bucle',
  'Send Task': 'Enviar tarea',
  'Receive Task': 'Recibir tarea',
  'User Task': 'Tarea del usuario',
  'Manual Task': 'Tarea manual',
  'Business Rule Task': 'Tarea de reglas de negocios',
  'Service Task': 'Tarea de servicio',
  'Script Task': 'Tarea de guión',
  'Call Activity': 'Actividad de llamada',
  'Sub Process (collapsed)': 'Subproceso (colapsado)',
  'Sub Process (expanded)': 'Subproceso (expandido)',
  'Create Pool/Participant': 'Crear Grupo/Participante',
  'Add Lane above': 'Agrega carril arriba',
  'Divide into two Lanes': 'Divide en dos carriles',
  'Divide into three Lanes': 'Divide en tres carriles',
  'Add Lane below': 'Agregue carril a continuación',

  // Tool options
  'Connect using Sequence/MessageFlow or Association':
    'Conectar usando Secuencia/Flujo de mensajes o Asociación',
  'Append EndEvent': 'Añadir Evento Fin',
  'Append Gateway': 'Agregar puerta de enlace',
  'Append Task': 'Añadir tarea',
  'Append Intermediate/Boundary Event': 'Añadir evento Intermedio/Límite',
  'Append {type}': 'Agregar {type}',
  'Change type': 'Cambiar tipo',
  Remove: 'Eliminar',
  TextAnnotation: 'Anotación de texto',

  // Errors
  'no parent for {element} in {parent}': 'Sin padre para {element} en {parent}',
  'no shape type specified': 'No se especificó ningún tipo de forma',
  'flow elements must be children of pools/participants':
    'Los elementos de flujo deben ser hijos grupos/participantes',
  'out of bounds release': 'lanzamiento fuera de límites',
  'more than {count} child lanes': 'más que {count} lineas hijas',
  'element required': 'elemento requerido',
  'diagram not part of bpmn:Definitions': 'diagrama no es parte de bpmn:Definitions',
  'no diagram to display': 'No hay diagrama para mostrar',
  'no process or collaboration to display': 'Sin proceso o colaboración para mostrar',
  'element {element} referenced by {referenced}#{property} not yet drawn':
    'elemento {element} referenciado por {referenced}#{property} aún no dibujado',
  'already rendered {element}': 'ya renderizado {element}',
  'failed to import {element}': 'falló al importar {element}'
}

export default i18nSpanish
