import os
import string
a = []
for f in os.listdir('.'):
	a.append(f)

a.sort()

for f in a[:10]:
	print f
	if f.endswith("gif"):
		print f
		os.rename(f, str(int(f[:2]) - 35) + '.gif')
