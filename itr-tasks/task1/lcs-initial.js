f = () => {
    let a = process.argv.slice(2), s = [], r = ""

    if (a.length === 0) return " ";
    if (a.length === 1) return a[0].toString();

    for (let i = 0; i < a[0].length; i++) {
        for (let j = i + 1; j < a[0].length + 1; j++)
            s.push(a[0].slice(i, j))
    }

    for (let i = 0; i < s.length; i++) {
        let isCommon = true

        for (let j = 1; j < a.length; j++) {
            if (!a[j].includes(s[i])) {
                isCommon = false;
                break;
            }
        }

        if (isCommon && s[i].length > r.length) r = s[i]
    }

    return r
}
console.log(f())