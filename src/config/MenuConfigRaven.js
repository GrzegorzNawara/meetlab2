export const MenuConfigRaven = {
  topMenu: [{
    title: 'New Workshop',
    subtitle: 'Raven 13',
    action: 'ADD_WORKSHOP',
    params: { title: 'Simulation Workshop', subtitle:'Raven 13', look: 'lookWorkshop' }
  }],
  workshopMenu:[
    { title: 'Zasady (PL)',
      subtitle: 'Raven 13 - Zasady',
      action: 'ADD_DOCUMENT',
      params: { doc:'rules_raven13_pl', look: 'lookDocument' }
    },
    { title: 'Rules (EN)',
      subtitle: 'Raven 13 - Rules',
      action: 'ADD_DOCUMENT',
      params: { doc:'rules_raven13_en', look: 'lookDocument' }
    },
    { title: 'RAVEN',
      subtitle: 'Start Simulation',
      action: 'ADD_RAVEN',
      params: {
        title: 'Join Raven', subtitle:'Simulation',
        look: 'lookSimulation' }
    },
    { title: 'Dobra Postawa (PL)',
      subtitle: 'Show Dokument',
      action: 'ADD_DOCUMENT',
      params: { doc:'dobra-postawa', look: 'lookDocument' }
    },
    { title: 'Agile Mindset (PL)',
      subtitle: 'Show Dokument',
      action: 'ADD_DOCUMENT',
      params: { doc:'agile-mindset', look: 'lookDocument' }
    },
    { title: 'UNDO',
      subtitle: 'Remove last item',
      action: 'DELETE_LAST_BRICK',
      params: { show: 'onNonEmpty', look: 'lookMenuClear' }
    },
    { title: 'DELETE',
      subtitle: 'Remove this workshop',
      action: 'DELETE_WORKSHOP',
      params: { show: 'onEmpty', look: 'lookMenuClear' }
    }
  ]
}

const theme = {
    mainColorBg: '#8083ac',
    mainColor: '#ffffff',
    secondaryColorBg: '#53567f',
    secondaryColor: '#ffffff'
}
export const cssStylesRaven = {
  logo: { navBar: 'images/logo-raven.png',
          white: 'images/logo-raven-white.png'
        },

  lookSpinner: { backgroundColor:theme.secondaryColorBg, color:theme.secondaryColor },

  lookDefault: { backgroundColor:'#aaaaff', color:'#555555' },
  lookMenu: { backgroundColor:'#2c97cf', color:'#ffffff' },
  lookMenuClear: { backgroundColor:'#ff0000', color:'#ffffff' },

  lookGate: { backgroundColor:theme.secondaryColorBg, color:theme.secondaryColor },
  lookWorkshop: { backgroundColor:theme.mainColorBg, color:theme.mainColor },
  lookDocument: { backgroundColor:'#dddddd', color:'#333333' },

  lookSimulation: { backgroundColor:theme.secondaryColorBg, color:theme.secondaryColor },
  lookSimulationOver: { backgroundColor:'#aaaaaa', color:'#ffffff' },
  lookSimulationResults: { backgroundColor:'#eeeeee', color:'#666666' },

  lookMCTest: { backgroundColor:'#ffd65c', color:'#000000' },
  lookMCScore: { fontSize:'1.5em' },
  lookMCScoreLabel: { fontSize:'0.7em' },

  rankingChecked: { color:'#666666' },
  rankingUnchecked: { color:'#cccccc' }
}
