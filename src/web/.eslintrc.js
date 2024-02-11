const overrides = {
  eqeqeq: ['error', 'always', { null: 'ignore' }], // noisy
  'id-length': 'off', // noisy
  'no-console': 'off', // noisy
  'no-eq-null': 'off', // noisy
  'react/forbid-component-props': 'off', // noisy
  'react/prop-types': 'off', // noisy
  'unicorn/no-array-reduce': 'off', // noisy
};

/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: ['canonical/auto', 'canonical/browser', 'canonical/node'],
  ignorePatterns: ['build', 'node_modules', 'package-lock.json'],
  overrides: [
    {
      extends: [
        'canonical',
        'canonical/regexp',
        'canonical/jsdoc',
        'canonical/jsx-a11y',
        'canonical/react',
        'canonical/prettier',
      ],
      files: ['*.jsx'],
      parserOptions: {
        babelOptions: {
          parserOpts: {
            plugins: ['jsx'],
          },
        },
      },
      rules: {
        ...overrides,
        'react/no-set-state': 'off', // only useful when using state libs
      },
    },
    {
      extends: ['canonical/typescript-type-checking'],
      files: '*.{ts,tsx}',
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: ['./tsconfig.node.json'],
      },
    },
    {
      extends: ['canonical/vitest'],
      files: '*.test.{js,jsx,ts,tsx}',
      globals: {
        afterAll: true,
        afterEach: true,
        assert: true,
        beforeAll: true,
        beforeEach: true,
        describe: true,
        expect: true,
        it: true,
        suite: true,
        test: true,
        vi: true,
        vitest: true,
      },
      rules: {
        'vitest/no-disabled-tests': 'error',
        'vitest/no-skipped-tests': 'off', // renamed: https://github.com/veritem/eslint-plugin-vitest/issues/131
      },
    },
  ],
  root: true,
  rules: {
    ...overrides,

    'import/no-unassigned-import': [
      'error',
      {
        allow: ['semantic-ui-less/semantic.less', '**/*.css'],
      },
    ],
  },
};
