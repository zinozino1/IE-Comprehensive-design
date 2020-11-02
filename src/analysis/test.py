


import konlpy.tag
import csv
from collections import Counter
import matplotlib.pyplot as plt
from konlpy.tag import Okt
import json
import sys
import base64

# result = json.loads(sys.argv[1])['body']
# # json.dumps(result)
# print(result)
# # print(result)
# print(json.dumps(result))

occupation = []
question = []
answer = []
f = open('../static/csv/pre_Data.csv', 'r', encoding='UTF-8')
rdr = csv.reader(f)
for row in rdr:
    # print(row)
    if row:
        occupation.append(row[0])
        question.append(row[1])
        answer.append(row[2])
f.close()
print(occupation[0])
