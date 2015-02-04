all:

version:
	@scripts/git_devbliss_hooks/angularjs-version 'CHANGELOG.md'

finish:
	@scripts/git_devbliss_hooks/finish 'gpullr-frontend' 'CHANGELOG.md'

release:
	@scripts/git_devbliss_hooks/release

.PHONY: finish version release