function lcs(s1, s2) {
    let maxLength = 0;
    let endingIndex = s1.length;
    let steps = 0;

    let dp = new Array(s1.length + 1).fill(0).map(() => new Array(s2.length + 1).fill(0));

    for (let i = 1; i <= s1.length; i++) {
        for (let j = 1; j <= s2.length; j++) {

            if (s1[i-1] === s2[j-1])
                dp[i][j] = dp[i-1][j-1] + 1;

            if (dp[i][j] > maxLength) {
                maxLength = dp[i][j];
                endingIndex = i;
            }

            steps++;

        }
        console.log(dp[i]);
    }

    console.log("\nDynamic programming, O(N^2)");
    console.log("s1 * s2 = num of steps");
    console.log(s1.length, "*", s2.length, "=", steps, "\n");

    console.log(s1, s2);
    return s1.substring(endingIndex - maxLength, endingIndex);
}

console.log(lcs("ABAB", "BABA"));