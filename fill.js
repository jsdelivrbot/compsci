var blessed = require('blessed');

class Pixel {

    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.box = blessed.box({
            left: x,            
            top: y,
            width: 1,
            height: 1,
            style: {
              bg: 'magenta'
            }
        });
    }

    setColor(color) {
        this.color = color;
        this.box.style = {
            bg: color
        };
    }

    toString() {
        return `(${this.x},${this.y})`;
    }

}

class Canvas {

    constructor(width, height) {
        this.screen = blessed.screen({
            smartCSR: true
        });
          this.map = [];
          for (let i = 0; i < width; i++) {
              for (let j = 0; j < height; j++) {
                  let pixel = new Pixel(i, j);
                  this.map.push(pixel);
                  this.screen.append(pixel.box);
              }
          }
        this.screen.render();
    }

    findPixel(pixel) {
        return (pixel.x === this[0]) && (pixel.y === this[1])
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

    fill(x, y, color) {
        let pixelClicked = this.getPixel(x, y);
        if (!pixelClicked.color) {
            pixelClicked.setColor(color);
            this.screen.render();
            let neighbors = this.getNeighbors(pixelClicked);
            neighbors.forEach(function(neighbor) {
                setTimeout(function() {
                    this.fill(neighbor.x, neighbor.y, color)
                }.bind(this, neighbor, color), 10);
            }.bind(this));           
        }
        return this;
    }

    fillWithStack(x, y, color) {
        let pixelClicked = this.getPixel(x, y);
        let pixelStack = [];
        pixelStack.push(pixelClicked);
        while (pixelStack.length != 0) {
            let currentPixel = pixelStack.pop();
            if (!currentPixel.color) {
                currentPixel.setColor(color);
                this.screen.render();
                let neighbors = this.getNeighbors(currentPixel);
                neighbors.forEach(function(neighbor) {
                    pixelStack.push(neighbor);
                });
            }
        }
        return this;
    }
    
}

let canvas = new Canvas(55, 15);
canvas.fill(25, 7, 'green');
