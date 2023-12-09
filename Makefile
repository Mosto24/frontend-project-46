commander:
	node gendiff.js
lint:
	npx eslint .
install:
	npm ci
	npm publish --dry-run
	sudo npm link