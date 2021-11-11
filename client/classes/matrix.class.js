class Matrix {
    constructor(size) {
        this.size = size;
    }

    get matrix() {
        let arr = new Array(this.size);
        for (var i = 0; i < arr.length; i++) {
            arr[i] = new Array(this.size);
        }
        return arr;
    }
}