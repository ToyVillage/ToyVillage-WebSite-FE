export const COLORS = {
  main: {
    forestGreen: "#3A7D44",
    woodBrown: "#735437",
    green: "#38B14A",
  },
} as const;

export const TYPOGRAPHY = {
  title: {
    1: ['64px', { fontWeight: '600', lineHeight: 'auto' }],
    2: ['48px', { fontWeight: '600', lineHeight: 'auto' }],
    3: ['36px', { fontWeight: '600', lineHeight: 'auto' }],
  },
  subtitle: {
    1: ['24px', { fontWeight: '600', lineHeight: 'auto' }],
    2: ['20px', { fontWeight: '600', lineHeight: 'auto' }],
    3: ['18px', { fontWeight: '600', lineHeight: 'auto' }],
  },
  body: {
    1: ['20px', { fontWeight: '500', lineHeight: 'auto' }],
    2: ['18px', { fontWeight: '700', lineHeight: 'auto' }],
    3: ['16px', { fontWeight: '500', lineHeight: 'auto' }],
  },
} as const;