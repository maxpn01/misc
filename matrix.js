const prompt = require("prompt-sync")({ sigint: true });

const genRandN = (max) => Math.floor(Math.random() * max);
const genArrayN = (n, max) => {
    return Array(n).fill()
                .map(() => Array(n).fill()
                .map(() => genRandN(max)));
};

class Matrix {
    constructor(array) {
        this.array = array;
    }

    add(otherMatrix, N) {
        let newMatrix = new Matrix(genArrayN(N, 0));

        for (let row = 0; row < N; row++) {
            for (let col = 0; col < N; col++) {
                newMatrix.array[row][col] = this.array[row][col] + otherMatrix.array[row][col];
            }
        }

        return newMatrix;
    }

    sub(otherMatrix, N) {
        let newMatrix = new Matrix(genArrayN(N, 0));

        for (let row = 0; row < N; row++) {
            for (let col = 0; col < N; col++) {
                newMatrix.array[row][col] = this.array[row][col] - otherMatrix.array[row][col];
            }
        }

        return newMatrix;
    }

    mul(otherMatrix, N) {
        let newMatrix = new Matrix(genArrayN(N, 0));

        for (let i = 0; i < N; i++) {
            for (let j = 0; j < N; j++) {
                for (let k = 0; k < N; k++) {
                    newMatrix.array[i][j] += this.array[i][k] * otherMatrix.array[k][j];
                }
            }
        }

        return newMatrix;
    }

    display() {
        this.array.forEach(row => console.log(row.join(" ")));
    }
}

const N = 500;
const maxN = 10;

const A = new Matrix(genArrayN(N, maxN));
const B = new Matrix(genArrayN(N, maxN));

try {
    // const C = A.mul(B, N);
    // A.display();
    // console.log(" ");
    // B.display();
    // console.log(" ");
    // C.display();
    // console.log(" ");

    let flop = N*N*2*N;
    console.log(`${(flop / 1e9).toFixed(2)} GFLOP`);

    const st = performance.now();
    A.mul(B, N);
    const et = performance.now();
    const s = (et - st) / 1000; // ms => s

    console.log(`${(flop/s * 1e-9).toFixed(2)} GFLOPS`);
} catch (error) {
    console.error(error.message);
}