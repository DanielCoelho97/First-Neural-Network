//Matrix class with all the operations that we need to make the neural network works!
class Matrix {
    rows = 0;
    cols = 0;
    matrix = [];
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.matrix = Matrix.randomizeMatrix(rows, cols);
    }

    static randomizeMatrix(rows, cols) {
        let matrix = [];
        for (let i=0; i<rows; i++) {
            let row = [];
            for (let j=0; j<cols; j++) {
                row.push(Math.floor(Math.random() * 2-1));
            }
            matrix.push(row);
        }
        return matrix;
    }

    show() {
        console.log(this.matrix);
    }

    static map(A, func) {
        let B = new Matrix(A.rows, A.cols);
        B.matrix =  B.matrix.map((row,i) =>
            row.map((number,j) =>
               func(number, i, j)
            )
        );
        return B;
    }

    static map2(A, func) {
        let B = new Matrix(A.rows, A.cols);
        B.matrix = B.matrix.map((row,i) =>
            row.map((n,j) =>
                func(A.matrix[i][j])
            )
        );
        return B;
    }

    static arrayToMatrix(array) {
        let A = new Matrix(array.length, 1);
        A = Matrix.map(A, (number, i, j) =>
            array[i]
        );
        return A;
    }

    static matrixToArray(A) {
        let array = [];
        Matrix.map(A, (number, i, j) => {
            array.push(A.matrix[i][j]);
        });
        return array;
    }

    static transpose(A) {
        let B = new Matrix(A.cols, A.rows);

        B = Matrix.map(B, (number, i, j) =>
            A.matrix[j][i]
        );
        return B;
    }

    static add(A, B) {
        if (A.rows !== B.rows || A.cols !== B.cols){
            return new Error(console.log('Erro: Rows or Cols dont match'));
        }
        let C = new Matrix(A.rows, A.cols);
        C = Matrix.map(C, (number, i, j) =>
            A.matrix[i][j] + B.matrix[i][j]
        );
        return C;
    }

    static subtract(A, B) {
        if (A.rows !== B.rows || A.cols !== B.cols){
            return new Error(console.log('Erro: Rows or Cols dont match'));
        }
        let C = new Matrix(A.rows, A.cols);
        C = Matrix.map(C, (number, i, j) =>
            A.matrix[i][j] - B.matrix[i][j]
        );
        return C;
    }

    static hadamard(A, B) {
        if (A.rows !== B.rows || A.cols !== B.cols){
            return new Error(console.log('Erro: Rows or Cols dont match'));
        }
        let C = new Matrix(A.rows, A.cols);
        C = Matrix.map(C, (number, i, j) =>
            A.matrix[i][j] * B.matrix[i][j]
        );
        return C;
    }

    static multiply_by_escalar(A, x) {
        let C = new Matrix(A.rows, A.cols);
        C = Matrix.map(C, (number, i, j) =>
            A.matrix[i][j] * x
        );
        return C;
    }


    static multiply(A, B) {
        let C = new Matrix(A.rows, B.cols);
        C = Matrix.map(C, (number, i, j) => {
           let newItem = 0;
           A.matrix[i].map((number, A_i) =>
               newItem += number * B.matrix[A_i][j]
           );
           return newItem;
        });
        return C;
    }

}










