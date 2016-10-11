#!python3

d1 = {
    "one": [1, 2, 3],
    "two": {
        "three": 1,
        "seven": [{
            "a": 1,
            "b": 2
        }]
    },
    "five": 10
}

d2 = {
    "one": [1, 2, 3, 4, 5],
    "two": {
        "three": 2,
        "four": 2,
        "six": [1, 2, 3],
        "seven": [{
            "a": 1,
            "b": 2
        }, {
            "a": 3,
            "b": 4
        }]
    },
    "five": 20,
    "eight": 8
}


def merge_dict(d1, d2):
    for key, value in d2.items():
        old_value = d1.get(key, None)
        if old_value is None:
            d1[key] = value
            continue

        if not isinstance(value, old_value.__class__):
            print("type error")
            return

        if isinstance(old_value, dict):
            merge_dict(old_value, value)
        else:
            d1[key] = value

print(d1)
print(d2)
print()
merge_dict(d1, d2)

print(d1)
