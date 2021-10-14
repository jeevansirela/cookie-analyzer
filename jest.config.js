/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
const { pathsToModuleNameMapper } = require('ts-jest/utils')
const { compilerOptions } = require('./tsconfig.json')

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@models/(.*)$': '<rootDir>/src/models/$1',
    '^@helpers/(.*)$': '<rootDir>/src/helpers/$1',
    '^@handlers/(.*)$': '<rootDir>/src/handlers/$1',
    '^@builders/(.*)$': '<rootDir>/src/builders/$1'
  },
  roots: ["<rootDir>/src"],
  testMatch: ["**/__tests__/**/*.+(ts|tsx|js)", "**/?(*.)+(spec|test).+(ts|tsx|js)"],
  transform: { "^.+\\.(ts|tsx)$": "ts-jest" },
};
