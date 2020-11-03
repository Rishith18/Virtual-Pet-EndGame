class Food {
    constructor() {
        this.foodStock = null;
        this.lastFed = null;
        this.milkImage = loadImage("Milk.png");
    }

    

    display() {
        if (this.foodStock !== null) {
            var x, y=0
            for (var i = 0; i<this.foodStock; i++) {
                if (i%10===0) {
                    x=70;
                    y=y+50;
                }
                image(this.milkImage,x,y,50,50);
                x=x+30;
            }
        }
    }

    getFoodStock() {
        database.ref("food").on("value",(data) =>{
            this.foodStock = data.val();         
        })
    }

    writeFoodStock() {
        database.ref("/").update({
            food : this.foodStock
        })
    }

    deductFood() {
        if (this.foodStock > 0) {
            this.foodStock = this.foodStock - 1;
        }
        database.ref("/").update({
            food : this.foodStock
        })
    }

}