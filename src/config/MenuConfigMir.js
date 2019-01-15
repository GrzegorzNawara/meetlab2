export const MenuConfigMir = {
  topMenu: [{
    title: 'Add Workshop',
    subtitle: 'Add new workshop',
    action: 'ADD_WORKSHOP',
    params: { title: 'Invisible Workshop', subtitle:'Workshop', look: 'look-workshop' }
  }],
  workshopMenu:[
    { title: 'Agile Mindset PL',
      subtitle: 'Dokument PL',
      action: 'ADD_DOCUMENT',
      look: 'look-document',
      params: {
        title: 'Agile Mindset', subtitle:'Dokument PL',
        doc:'agile-mindset', look: 'look-document' }
    },
    { title: 'MIR',
      subtitle: 'Simulation',
      action: 'ADD_MIR',
      look: 'look-simulation',
      params: {
        title: 'Join MIR', subtitle:'Simulation',
        look: 'look-simulation' }
    },
    { title: 'CLEAR',
      subtitle: 'Clear this workshop',
      action: 'CLEAR_WORKSHOP',
      params: { look: 'look-menu-red' }
    }
  ]
}
