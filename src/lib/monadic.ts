interface Neighboorhood {
    l: number, // lowest bound
    h: number, // highest bound
    d: number // distance
}

export default class monadic {
    source: any[];
    count: number;
    repetitive: boolean;
    weight: string;
    selected: any[];
    constructor(source: Array<any>, count: number = 1, repetitive: boolean = false, weight: string = null, method: string = null) {
        this.source = source
        this.count = count
        this.repetitive = repetitive
        this.weight = weight
        this.selected = []
    }

    init() {
        /* Create neighboors with points
        Point which has bigger neighboorhood area is more monadic and will get more changes to be this.selected. */

        /* Sort source array to create neighborhoods */
        this.source.sort((a,b) => a.normalizedWeight - b.normalizedWeight);

        let neighboorhoods = []
        this.source.forEach( (item, key, arr) => {
            let  N = {}

            if (!arr[key + 1]) {
                let last = neighboorhoods[neighboorhoods.length - 1]
                N = {l: item.normalizedWeight - last.d, h: item.normalizedWeight + last.d}
                neighboorhoods.push(N)
                return
            }

            let d = Math.abs(arr[key + 1].normalizedWeight - item.normalizedWeight)

            if (!key)
                N = {l: item.normalizedWeight - (d / 2), h: item.normalizedWeight + (d / 2), d: (d / 2)}
            else
                N = {l: item.normalizedWeight - neighboorhoods[key - 1].d, h: item.normalizedWeight + (d / 2), d: (d / 2)}
            neighboorhoods.push(N)
        })
        /* Neighborhood created */
        
        // console.log(neighboorhoods)
        /* Generate random float number in range of first neighboor lower to last neighboor highest */
        let min = neighboorhoods[0].l;
        let max = neighboorhoods[neighboorhoods.length - 1].h

        let random = this.randomFloat(min, max)
        // console.log(random)

        if (this.count == 1 && this.repetitive == false)
            return this.checkNumberInNeghborhoods(random, neighboorhoods)

        if (this.count > 1 && this.repetitive === true) {
            let count = this.count
            let selection = []
            while (count--) {
                let random = this.randomFloat(min, max)
                selection.push(this.checkNumberInNeghborhoods(random, neighboorhoods))
            }
            return selection
        }

    }

    checkNumberInNeghborhoods(n: number, neighboorhoods: Array<Neighboorhood>) {
        const index = neighboorhoods.findIndex( item => item.l < n && item .h > n)
        return (this.source[index])
    }

    randomFloat(min, max) {
        return Math.random() * (max - min) + min;
    };
}