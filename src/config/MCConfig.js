export const MCConfig = {
  tests: [{
    id: 'test1',
    title: 'Test title',
    subtitle: 'Test subtitle',
    look: 'look-mc-default',
    questions: [
      {
        stem: 'Is house cat a mammal?',
        answers: [
          'Yes', // answer a
          'It depends', // answer b
          'Probably no' // answer c
        ],
        score: [
          {choosen:'a', shows:'KNOWLEDGE', points:+3},
          {choosen:'b', shows:'KNOWLEDGE', points:+1},
          {choosen:'c', shows:'KNOWLEDGE', points:0}
      ]},
      {
        stem: 'Is my dog a mammal?',
        answers: [
          'Yes', // answer a
          'It depends', // answer b
          'Probably no' // answer c
        ],
        score: [
          {choosen:'a', shows:'KNOWLEDGE', points:+3},
          {choosen:'b', shows:'KNOWLEDGE', points:+1},
          {choosen:'c', shows:'KNOWLEDGE', points:0}
      ]},
  ]},
  {
    id: 'test2',
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
          {choosen:'a', shows:'KNOWLEDGE', points:+3},
          {choosen:'b', shows:'KNOWLEDGE', points:+1},
          {choosen:'c', shows:'KNOWLEDGE', points:0}
      ]},
      {
        stem: 'Is my fish a mammal?',
        answers: [
          'Yes', // answer a
          'It depends', // answer b
          'Probably no' // answer c
        ],
        score: [
          {choosen:'a', shows:'KNOWLEDGE', points:0},
          {choosen:'b', shows:'KNOWLEDGE', points:0},
          {choosen:'c', shows:'KNOWLEDGE', points:5}
      ]},
  ]}
]}
