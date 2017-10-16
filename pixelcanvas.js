// Canvas holding pixels coordinate origin at 0,0 

class Pixel {

    constructor(x,y) {
        this.x = x;
        this.y = y;
    }

    toString() {
        return `(${this.x},${this.y})`;
    }    

}

class Canvas {

    constructor(width, height) {
        this.map = [];
        for (let i = 1; i <= width; i++) {
            for (let j = 1; j <= height; j++) {
                this.map.push(new Pixel(i, j));
            }
        }
    }

    findPixel(pixel) {
        if ((pixel.x === this[0]) && (pixel.y === this[1])) {
            return true;
        } else {
            false;
        }
    }
    
    getPixel(x, y) {
        return this.map.find(this.findPixel, [x, y]);
    }
    
}

canvas = new Canvas(3, 3);
console.log(canvas.getPixel(2, 2));