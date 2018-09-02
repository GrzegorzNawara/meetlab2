export const MenuConfig = {
  topMenu: [{
    title: 'Add Workshop',
    subtitle: 'Add new workshop',
    action: 'ADD_WORKSHOP',
    params: { title: 'Invisible Workshop', subtitle:'Workshop', look: 'look-workshop' }
  }],

  workshopMenu:[
    { title: 'MC Test',
      subtitle: 'Test wyboru PL',
      action: 'ADD_MCTEST',
      look: 'look-mc',
      params: {
        title: 'MC test', subtitle:'Test wyboru PL',
        test_id:'test0',
        shows: [{id:'KNOWLEDGE', max_points:4, description:'Wiedza'}],
        look: 'look-mc' }
    },
    { title: 'Video Test',
      subtitle: 'Dokument PL',
      action: 'ADD_DOCUMENT',
      look: 'look-document',
      params: {
        title: 'Video test', subtitle:'Dokument PL',
        doc:'video-test', look: 'look-document' }
    },
    { title: 'Dobra Postawa',
      subtitle: 'Dokument PL',
      action: 'ADD_DOCUMENT',
      look: 'look-document',
      params: {
        title: 'Dobra Postawa', subtitle:'Dokument PL',
        doc:'dobra-postawa', look: 'look-document' }
    },
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
      action: 'ADD_SIMULATION',
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
