import re


def try_sub():
    peach = "すももももももものうち"

    # Seemingly re.sub() replaces recursively by default
    new_peach = re.sub(r"も", "ま", peach)
    print(new_peach)  # すまままままままのうち

    addrs = [
        "前谷地1丁目2-3番地",
        "前谷地1丁目2番地の3",
        "前谷地1丁目2番地3",
        "前谷地1丁目2-3",
        "前谷地1-2-3",
    ]

    for addr in addrs:
        replaced1 = re.sub(r'(.*[0-9]+)番地$', r'\1', addr)
        replaced2 = re.sub(r'(.*[0-9]+)番地(.+)', r'\1-\2', addr)
        # print(replaced1)
        print(replaced2)


def split_address(addr):

    def concat_dict_values(my_dict, keys=[]):
        concated = ""

        for key in keys:
            if my_dict[key] is not None:
                concated += str(my_dict[key])

        return concated

    match_all = re.compile(
        r'(?P<pref>.+県)?(?P<city>.+市)?(?P<ward>.+区)?(?P<county>.+郡)?(?P<town>.+町)?(?P<village>.+村)?(?P<tail>.*)')

    matched = match_all.search(addr)
    levels = matched.groupdict()
    # print(levels)

    if (levels["city"] is not None) or (levels["ward"] is not None):
        return {"municipality": concat_dict_values(levels, ["city", "ward"]), "address": concat_dict_values(levels, ["town", "village", "tail"])}
    elif levels["town"] is not None:
        return {"municipality": levels["town"], "address": concat_dict_values(levels, ["village", "tail"])}
    elif levels["village"] is not None:
        return {"municipality": levels["village"], "address": levels["tail"]}


def use_pipe():

    test_str = "おいしい塩ラーメンですよ、塩ラーメン。"

    pattern_ramen = re.compile(r'(塩|醤油|とんこつ)ラーメン.*')
    print(pattern_ramen.search(test_str))


def split_test():
    addrs = [
        "宮城県仙台市青葉区子平町1-1",  # 市名のあとに町が入っている
        "本吉郡南三陸町多村山1-1",  # 町名のあとに村が入っている
        "南三陸町志津川1-1",
        "宮城県黒川郡大衡村大衡平林６２",
        "大衡村大衡平林６２",
        "福島県郡山市安積中央１",
        "千代田区大町111",
        "あいうえお"  # なににもマッチしない
    ]

    for addr in addrs:
        result = split_address(addr)
        print(result)

# use_pipe()
# split_test()
try_sub()
