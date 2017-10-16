// Canvas holding pixels coordinate origin at 0,0 

class Pixel {

    constructor(x,y) {
        this.x = x;
        this.y = y;
    }

    setColor(color) {
        this.color = color;
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
    
    getNeighbors(pixel) {
        let neighbors = [];

        let leftNeighbor = this.getPixel(pixel.x-1, pixel.y);
        if (leftNeighbor) {
            neighbors.push(leftNeighbor);
        }

        let bottomNeighbor = this.getPixel(pixel.x, pixel.y-1);
        if (bottomNeighbor) {
            neighbors.push(bottomNeighbor);
        }

        let rightNeighbor = this.getPixel(pixel.x+1, pixel.y);
        if (rightNeighbor) {
            neighbors.push(rightNeighbor);
        }

        let topNeighbor = this.getPixel(pixel.x, pixel.y+1);
        if (topNeighbor) {
            neighbors.push(topNeighbor);
        }

        return neighbors;

    }

    ripplefill(x, y, color) {

        let pixelClicked = this.getPixel(x, y);

        if (!pixelClicked.color) {

            pixelClicked.setColor(color);
            let neighbors = this.getNeighbors(pixelClicked);
            neighbors.forEach(function(neighbor) {
                this.ripplefill(neighbor.x, neighbor.y, color);
            }.bind(this));
        
        }
        return this;
    }    
}

let canvas = new Canvas(3, 3);
console.log(canvas.map);
console.log(canvas.ripplefill(2, 2, 'yellow').map);
