
import json
import sys
import base64

result = json.loads(sys.argv[1])['body']
# json.dumps(result)

# print(result)
print(json.dumps(result))
