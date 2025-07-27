import { createDefaultPreset } from 'ts-jest';

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
export default {
	testEnvironment: 'jest-environment-jsdom',
	transform: {
		...tsJestTransformCfg,
	},
	moduleNameMapper: {
		'^@utils/(.*)$': '<rootDir>/src/utils/$1',
		'^@store/(.*)$': '<rootDir>/src/services/$1',
	},
};
