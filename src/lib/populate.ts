
export default class Populate {
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
        // normalize weights
        console.log('init')
        this.source.sort((a,b) => a.normalizedWeight - b.normalizedWeight);
        this.source.forEach(A => console.log(A.normalizedWeight))
        let random = this.randomFloat(0, Math.PI/2)

        let v = Math.sin(random)

        this.selectFromTop(v)

        return this.selected
    }

    selectFromTop(v: number) {
        this.source.forEach( item => {
           // if (item.normalizedWeight > )
        })
    }

    randomFloat(min, max) {
        return Math.random() * (max - min) + min;
    };
}