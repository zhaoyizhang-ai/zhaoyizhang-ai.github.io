export default {
  config: {
    default: true,
    MD013: false,
    MD024: { siblings_only: true },
    MD033: false,
    MD034: false,
    MD041: false,
    MD046: { style: 'fenced' }
  },
  globs: ['!_site/**', '!vendor/**', '!node_modules/**']
};
