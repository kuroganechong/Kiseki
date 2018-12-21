temp = "["

counter = 1
for i in range(95):
    filepath = 'src/data/English/hero/' + str(counter) + '.json'
    try:
        with open(filepath) as f:
            data = f.read()
            temp = temp + data + ',\n'
            
    except:
        print("file "+ str(counter) + '.json do not exist')

    filepath = 'src/data/English/hero/' + str(counter) + '_1.json'
    try:
        with open(filepath) as f:
            data = f.read()
            temp = temp + data + ',\n'
            
    except:
        print("file "+ str(counter) + '.json do not exist')
    counter = int(counter) + 1
    
temp = temp + ']'

with open("src/data/English/hero/output.json", "w") as output:
    output.write(temp)