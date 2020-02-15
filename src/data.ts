interface Data {
  [x: string]: {
    recyclable: boolean
    compostable: boolean
    displayName: string
    materialType: string
    description: string[]
    cost: number
  }
}

const data: Data = {
  bottle: {
    recyclable: true,
    compostable: false,
    displayName: 'Plastic Bottle',
    materialType: 'Polyethylene',
    description: [
      'Water Bottles are recyclable, make sure to remove the label, cap, and ring under the cap before recycling',
      'Consider switching to a reusable water bottle to save the enviroment',
    ],
    cost: 0.3,
  },
  book: {
    recyclable: true,
    compostable: true,
    displayName: 'Paper',
    materialType: 'Cellulose',
    description: [
      'Paper is recyclable and compostable',
      'Consider reusing paper to save the environment',
      'Avoid composting paper with metal attachments, such as staples and paperclips',
    ],
    cost: 0.01,
  },
  spoon: {
    recyclable: true,
    compostable: false,
    displayName: 'Spoon',
    materialType: 'Polypropylene',
    description: ['Recycle in standard recycling bin'],
    cost: 0.01,
  },
  fork: {
    recyclable: true,
    compostable: false,
    displayName: 'Fork',
    materialType: 'Polypropylene',
    description: ['Recycle in standard recycling bin'],
    cost: 0.01,
  },
  knife: {
    recyclable: true,
    compostable: false,
    displayName: 'Knife',
    materialType: 'Polypropylene',
    description: ['Recycle in standard recycling bin'],
    cost: 0.01,
  },
  cup: {
    recyclable: true,
    compostable: false,
    displayName: 'Plastic Cup',
    materialType: 'Polystyrene',
    description: [
      'Recycle in standard recycling bin',
      'Consider switching to a reusable cup to save the enviroment',
    ],
    cost: 0.02,
  },
  banana: {
    recyclable: false,
    compostable: true,
    displayName: 'Banana',
    materialType: 'Banana',
    description: ['Bananas are not recyclable but the peel is compostable'],
    cost: 0,
  },
  apple: {
    recyclable: false,
    compostable: true,
    displayName: 'Apple',
    materialType: 'Apple',
    description: ['Apples are not recyclable but the core is compostable'],
    cost: 0,
  },
  orange: {
    recyclable: false,
    compostable: true,
    displayName: 'Orange',
    materialType: 'Orange',
    description: ['Oranges are not recyclable but the skin is compostable'],
    cost: 0,
  },
}

export { data }
