all:

finish:
	@./gradlew changelogSnapshot

release:
	@./gradlew changelogRelease

.PHONY: finish release
