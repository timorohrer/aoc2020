valid = 0
for line in pwd.splitlines():
	try:
		range, letter, password= line.split()
		count = password.count(letter[0])
		range = list(map(int, range.split('-')))
		if (count >= range[0] and count <= range[1]):
			valid+=1
	except:
		pass
	
print(valid)

valid = 0
for line in pwd.splitlines():
	try:
		range, letter, password= line.split()
		range = list(map(int, range.split('-')))
		pos1 = range[0]
		pos2 = range[1]
		if (password[pos1-1] == letter[0]):
			if (password[pos2-1] != letter[0]):
				valid+=1
		else:
			if (password[pos2-1] == letter[0]):
				valid+=1
	except:
		pass
		
print(valid)
