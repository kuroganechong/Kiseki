import json

temp = {}
uw=s1=s2=s3=s4=t5 = False
parsestring = 'ATK'

def gendata(uw,s1,s2,s3,s4,t5):
    x = {}
    if(uw):
        x['uw'] = data["uw"]['description']
    if(s1):
        x['s1'] = {
            "description": data["s1"]["description"],
            "books": {
                "0": data["s1"]["books"]["0"],
                "1": data["s1"]["books"]["1"],
                "2": data["s1"]["books"]["2"]
            },
            "light": data["s1"]["light"],
            "dark": data["s1"]["dark"],
            "ut": data["s1"]["ut"]["description"]
        }
    if(s2):
        x['s2'] = {
            "description": data["s2"]["description"],
            "books": {
                "0": data["s2"]["books"]["0"],
                "1": data["s2"]["books"]["1"],
                "2": data["s2"]["books"]["2"]
            },
            "light": data["s2"]["light"],
            "dark": data["s2"]["dark"],
            "ut": data["s2"]["ut"]["description"]
        }
    if(s3):
        x['s3'] = {
            "description": data["s3"]["description"],
            "books": {
                "0": data["s3"]["books"]["0"],
                "1": data["s3"]["books"]["1"],
                "2": data["s3"]["books"]["2"]
            },
            "light": data["s3"]["light"],
            "dark": data["s3"]["dark"],
            "ut": data["s3"]["ut"]["description"]
        }
    if(s4):
        x['s4'] = {
            "description": data["s4"]["description"],
            "books": {
                "0": data["s4"]["books"]["0"],
                "1": data["s4"]["books"]["1"],
                "2": data["s4"]["books"]["2"]
            },
            "light": data["s4"]["light"],
            "dark": data["s4"]["dark"]
        }
    if(t5):
        x['t5'] = {
            "light": data["t5"]["light"],
            "dark": data["t5"]["dark"]
        }
    return x

def match(data, string):
    if(data.__contains__(string)):
        return True
    else:
        return False

counter = 1
for i in range(95):
    filepath = 'data/English/hero/' + str(counter) + '.json'
    try:
        with open(filepath) as f:
            data = json.load(f)

            uw=s1=s2=s3=s4=t5 = False

            for x in data['uw']['description']:
                if(x.__contains__(parsestring)):
                    uw = True
                    print("uw has atk")

            if(data["s1"]["description"].__contains__(parsestring)
            or data["s1"]["light"].__contains__(parsestring)
            or data["s1"]["dark"].__contains__(parsestring)):
                s1 = True
                print("s1 has atk")

            for x in data["s1"]["ut"]["description"]:
                if(x.__contains__(parsestring)):
                    s1 = True
                    print("s1 has atk")

            if(data["s2"]["description"].__contains__(parsestring)
            or data["s2"]["light"].__contains__(parsestring)
            or data["s2"]["dark"].__contains__(parsestring)):
                s2 = True
                print("s2 has atk")

            for x in data["s2"]["ut"]["description"]:
                if(x.__contains__(parsestring)):
                    s2 = True
                    print("s2 has atk")

            if(data["s3"]["description"].__contains__(parsestring)
            or data["s3"]["light"].__contains__(parsestring)
            or data["s3"]["dark"].__contains__(parsestring)):
                s3 = True
                print("s3 has atk")

            for x in data["s3"]["ut"]["description"]:
                if(x.__contains__(parsestring)):
                    s3 = True
                    print("s3 has atk")

            if(data["s4"]["description"].__contains__(parsestring)
            or data["s4"]["light"].__contains__(parsestring)
            or data["s4"]["dark"].__contains__(parsestring)):
                s4 = True
                print("s4 has atk")

            if(data["t5"]["dark"].__contains__(parsestring)):
                t5 = True
                print("t5 has atk")

            if(uw or s1 or s2 or s3 or s4 or t5):
                temp[counter] = gendata(uw,s1,s2,s3,s4,t5)

            f.close()
    except:
        print("file "+ str(counter) + '.json do not exist')
    counter = int(counter) + 1

with open("data/English/hero/output.json", "w") as output:
    json.dump(temp, output, ensure_ascii=False)