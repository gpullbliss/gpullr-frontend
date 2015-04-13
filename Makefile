all:

finish:
	@grunt test
	@./gradlew changelogSnapshot

release:
	@./gradlew changelogRelease

changelog:

version:

.PHONY: finish release
