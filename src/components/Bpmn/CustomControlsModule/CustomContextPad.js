
class CustomContextPad {
  constructor(config, contextPad, injector, translate) {
    this.translate = translate

    if (config.autoPlace !== false) {
      this.autoPlace = injector.get('autoPlace', false)
    }

    contextPad.registerProvider(this)
  }

  getContextPadEntries = (element) => {

    function appendServiceTask() {
      var customEvent = new CustomEvent('custom', { 'detail': element.businessObject.id })
      document.dispatchEvent(customEvent)
    }

    return {
      'task-configuration': {
        group: 'edit',
        className: 'bpmn-icon-task-settings',
        title: this.translate('Task configuration'),
        action: {
          click: appendServiceTask,
          dragstart: () => { }
        }
      },
      $inject: [
        'config',
        'contextPad',
        'injector',
        'translate',
      ]
    }
  }
}


export default CustomContextPad
