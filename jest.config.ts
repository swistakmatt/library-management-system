import type { Config } from '@jest/types';


const config: Config.InitialOptions = {
  rootDir: '.',
  testEnvironment: 'node',
  preset: 'ts-jest',
  moduleNameMapper: {},
  verbose: true,
};


export default config;
