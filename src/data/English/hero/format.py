import json

counter = 1
x=False
for i in range(95):
    filepath = 'data/English/hero/' + str(counter) + '.json'
    try:
        with open(filepath) as f:
            data = json.load(f)
            output = {}
            output['ally'] = 0
            output['id'] = counter
            output['data'] = {
                "s1": {
                    "1": [data["s1"]["description"],data["s1"]["books"]],
                    "2": [data["s1"]["light"]],
                    "3": [data["s1"]["dark"]],
                    "4": data["s1"]["ut"]["description"]},
                "s2": {
                    "1": [data["s2"]["description"],data["s2"]["books"]],
                    "2": [data["s2"]["light"]],
                    "3": [data["s2"]["dark"]],
                    "4": data["s2"]["ut"]["description"]},
                "s3": {
                    "1": [data["s3"]["description"],data["s3"]["books"]],
                    "2": [data["s3"]["light"]],
                    "3": [data["s3"]["dark"]],
                    "4": data["s3"]["ut"]["description"]},
                "s4": {
                    "1": [data["s4"]["description"],data["s4"]["books"]],
                    "2": [data["s4"]["light"]],
                    "3": [data["s4"]["dark"]],
                    "4": [[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]]}
            }
            output["uw"] = data["uw"]["description"]
            output["t5"] = {
                "1": [data["t5"]["light"]],
                "2": [data["t5"]["dark"]]
            }
            print("done parse, writing for %s" %(counter))
            x=True
    except:
        print("file "+ str(counter) + '.json do not exist')
        x=False

    if(x):
        with open(filepath, "w") as f:
            json.dump(output, f, ensure_ascii=False)
    counter = int(counter) + 1