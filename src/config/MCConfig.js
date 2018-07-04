export const MCConfig = {
  tests: [{
    id: 'test0',
    title: 'Test title',
    subtitle: 'Test subtitle',
    look: 'look-mc-default',
    shows: [{id:'KNOWLEDGE', max_points:4, description:'Wiedza'}],
    questions: [
      {
        stem: 'Is house cat a mammal?',
        answers: [
          'Yes', // answer a
          'It depends', // answer b
          'Probably no' // answer c
        ],
        score: [
          {choosen:[1,0,0], shows:'KNOWLEDGE', points:50},
          {choosen:[0,1,0], shows:'KNOWLEDGE', points:25},
          {choosen:[0,0,1], shows:'KNOWLEDGE', points:0},
          {choosen:[0,0,1], shows:'KNOWLEDGE', points:0}
      ]},
      {
        stem: 'Is my dog a mammal?',
        answers: [
          'Yes', // answer a
          'It depends', // answer b
          'Probably no' // answer c
        ],
        score: [
          {choosen:[1,0,0], shows:'KNOWLEDGE', points:50},
          {choosen:[0,1,0], shows:'KNOWLEDGE', points:25},
          {choosen:[0,0,1], shows:'KNOWLEDGE', points:0}
      ]},
  ]},
  {
    id: 'test1',
    title: 'Another Test title',
    subtitle: 'Another Test subtitle',
    look: 'look-mc-default',
    questions: [
      {
        stem: 'Is see whale a mammal?',
        answers: [
          'Yes', // answer a
          'It depends', // answer b
          'Probably no' // answer c
        ],
        score: [
          {choosen:[1,0,0], shows:'KNOWLEDGE', points:1},
          {choosen:[0,1,0], shows:'KNOWLEDGE', points:0},
          {choosen:[0,0,1], shows:'KNOWLEDGE', points:0},
          {choosen:[1,1,1], shows:'KNOWLEDGE', points:0}
      ]},
      {
        stem: 'Is my fish a mammal?',
        answers: [
          'Yes', // answer a
          'It depends', // answer b
          'Probably no' // answer c
        ],
        score: [
          {choosen:[1,0,0], shows:'KNOWLEDGE', points:1},
          {choosen:[0,1,0], shows:'KNOWLEDGE', points:0},
          {choosen:[0,0,1], shows:'KNOWLEDGE', points:0}
      ]},
  ]}
]}
