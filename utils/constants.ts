export const TIMEOUTS = {
  ELEMENT_WAIT: 10000,
  API_WAIT: 15000,
};

export const ENDPOINTS = {
  AUTH: process.env.AUTH_ENDPOINT || '/v1/authentication',
  LEARNING_INSTANCE: process.env.LEARNING_INSTANCE_ENDPOINT || '/v1/learning-instances',
};

export const CONDITIONS = {
  IS_NOT_EMPTY: 'Is Not Empty',
  CONTAINS: 'Contains',
};

export const ACTIONS = {
  SET_VALUE: 'Set Value',
};
