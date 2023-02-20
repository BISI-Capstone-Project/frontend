commit:
	git add .
	@echo "making a commit $@: m=$(m)"
	git commit -m $@"${m}"
	git push