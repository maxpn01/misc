input_string = input()

def change_text(s):
    new_string = ""

    for word in s.split():
        word += " "
        for char in word:
            new_string += char.upper() + " "

    return new_string
    
print(change_text(input_string))