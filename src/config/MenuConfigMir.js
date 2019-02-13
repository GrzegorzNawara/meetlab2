export const MenuConfigMir = {
  topMenu: [{
    title: 'New Workshop',
    subtitle: 'Mir\'91',
    action: 'ADD_WORKSHOP',
    params: { title: 'Simulation Workshop', subtitle:'Raven 13', look: 'lookWorkshop' }
  }],
  workshopMenu:[
    { title: 'Zasady (PL)',
      subtitle: 'Mir\'91 - Zasady',
      action: 'ADD_DOCUMENT',
      params: { doc:'rules_mir91_pl', look: 'lookDocument' }
    },
    { title: 'START MIR',
      subtitle: 'Simulation Sprint',
      action: 'START_MIR_SPRINT',
      params: {
        title: 'MIR Sprint', subtitle:'Simulation',
        show: 'onNonRunning',
        look: 'lookSimulation' }
    },
    { title: 'END MIR',
      subtitle: 'Simulation Sprint',
      action: 'END_MIR_SPRINT',
      params: {
        title: 'MIR Sprint', subtitle:'Simulation',
        show: 'onRunning',
        look: 'lookSimulation' }
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
    mainColorBg: '#333333',
    mainColor: '#ffffff',
    secondaryColorBg: '#c1670b',
    secondaryColor: '#ffffff'
}
export const cssStylesMir = {
  logo: { navBar: 'images/logo-mir.png',
          white: 'images/logo-mir-white-small.png'
        },

  lookSpinner: { backgroundColor:theme.secondaryColorBg, color:theme.secondaryColor },

  lookDefault: { backgroundColor:'#aaaaff', color:'#555555' },
  lookMenu: { backgroundColor:'#2c97cf', color:'#ffffff' },
  lookMenuClear: { backgroundColor:'#ff0000', color:'#ffffff' },

  lookGate: { backgroundColor:theme.secondaryColorBg, color:theme.secondaryColor },
  lookWorkshop: { backgroundColor:theme.mainColorBg, color:theme.mainColor },
  lookDocument: { backgroundColor:'#dddddd', color:'#333333' },

  lookSimulation: { backgroundColor:theme.secondaryColorBg, color:theme.secondaryColor },
  lookSimulationOver: { backgroundColor:'#888888', color:'#ffffff' },
  lookSimulationResults: { backgroundColor:'#eeeeee', color:'#666666' },

  lookMCTest: { backgroundColor:'#ffd65c', color:'#000000' },
  lookMCScore: { fontSize:'1.5em' },
  lookMCScoreLabel: { fontSize:'0.7em' },

  rankingChecked: { color:'#666666' },
  rankingUnchecked: { color:'#cccccc' }
}
