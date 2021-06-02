module.exports = {
	env: {
		node: true,
		es6: true,
	},
	extends: [
		"eslint:recommended",
		"plugin:jest/all",
		"plugin:testing-library/react",
		"plugin:prettier/recommended",
		"prettier",
	],
	parserOptions: {
		ecmaVersion: 12,
		sourceType: "module",
	},
	rules: {
		"arrow-body-style": "error",
		"arrow-parens": "error",
		"arrow-spacing": "error",
		"constructor-super": "error",
		"generator-star-spacing": "error",
		"no-class-assign": "error",
		"no-confusing-arrow": "error",
		"no-const-assign": "error",
		"no-dupe-class-members": "error",
		"no-duplicate-imports": "error",
		"no-new-symbol": "error",
		"no-restricted-exports": "off",
		"no-restricted-imports": "off",
		"no-this-before-super": "error",
		"no-useless-computed-key": "error",
		"no-useless-constructor": "error",
		"no-useless-rename": "error",
		"no-var": "error",
		"object-shorthand": "error",
		"prefer-arrow-callback": "error",
		"prefer-const": "error",
		"prefer-destructuring": "error",
		"prefer-numeric-literals": "error",
		"prefer-rest-params": "error",
		"prefer-spread": "error",
		"prefer-template": "error",
		"require-yield": "error",
		"rest-spread-spacing": "error",
		"sort-imports": "off",
		"symbol-description": "error",
		"template-curly-spacing": "error",
		"yield-star-spacing": "error",

		"jest/no-jest-import": "off",
	},
	overrides: [
		{
			files: ["*.test.ts", "*.test.tsx"],
			rules: {
				"jest/no-jest-import": "error",
			},
		},
		{
			settings: {
				react: {
					version: "detect",
				},
			},
			files: ["*.ts", "*.tsx"],
			env: {
				browser: true,
				es2021: true,
			},
			parser: "@typescript-eslint/parser",
			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
				project: ["./tsconfig.json"],
			},
			plugins: ["react", "@typescript-eslint"],
			extends: [
				"plugin:jest/all",
				"plugin:testing-library/react",
				"plugin:react/recommended",
				"plugin:react-hooks/recommended",
				"plugin:unicorn/recommended",
				"plugin:import/errors",
				"plugin:import/warnings",
				"plugin:import/typescript",
				"plugin:jsx-a11y/strict",
				"plugin:@typescript-eslint/recommended",
				"plugin:@typescript-eslint/recommended-requiring-type-checking",
				"plugin:prettier/recommended",
				"prettier",
			],
			rules: {
				"@typescript-eslint/explicit-module-boundary-types": "off",
				"@typescript-eslint/no-floating-promises": "off",
				"import/no-unresolved": "off",
				"unicorn/no-null": "off",
				"unicorn/consistent-function-scoping": "off",
				"unicorn/prevent-abbreviations": [
					"error",
					{
						replacements: {
							props: {
								properties: false,
							},
						},
					},
				],
				"unicorn/consistent-function-scping": "off",
				// deprecated, see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/label-has-for.md#deprecated-label-has-for
				"jsx-a11y/label-has-for": "off",
				"jsx-a11y/label-has-associated-control": "error",

				"react/react-in-jsx-scope": "off",
			},
		},
	],
};
