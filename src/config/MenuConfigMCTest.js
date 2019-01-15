export const MenuConfigMCTest = {
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
    { title: 'CLEAR',
      subtitle: 'Clear this workshop',
      action: 'CLEAR_WORKSHOP',
      params: { look: 'look-menu-red' }
    }
  ]
}
