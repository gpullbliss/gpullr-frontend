all:

finish:
	@./gradlew changelogSnapshot

release:
	@./gradlew changelogRelease

changelog:

version:

.PHONY: finish release
