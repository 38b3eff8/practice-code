import re
station_names = '@bjb|北京北|VAP|beijingbei|bjb|0@bjd|北京东|BOP|beijingdong|bjd|1@bji|北京|BJP|beijing|bj|2@bjn|北京南|VNP|beijingnan|bjn|3@bjx|北京西|BXP|beijingxi|bjx|4@gzn|广州南|IZQ|guangzhounan|gzn|5@cqb|重庆北|CUW|chongqingbei|cqb|6@cqi|重庆|CQW|chongqing|cq|7@cqn|重庆南|CRW|chongqingnan|cqn|8@gzd|广州东|GGQ|guangzhoudong|gzd|9@sha|上海|SHH|shanghai|sh|10@shn|上海南|SNH|shanghainan|shn|11@shq|上海虹桥|AOH|shanghaihongqiao|shhq|12@shx|上海西|SXH|shanghaixi|shx|13@tjb|天津北|TBP|tianjinbei|tjb|14@tji|天津|TJP|tianjin|tj|15@tjn|天津南|TIP|tianjinnan|tjn|16'

group = re.findall('@(.+?)\|(.+?)\|', station_names)
print({item[1]:item[0] for item in group})
