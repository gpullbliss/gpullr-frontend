all:

finish:
	@grunt test
	@./gradlew changelogSnapshot

release:
	@grunt test
	@./gradlew changelogRelease

changelog:

version:

.PHONY: finish release
