/* eslint:disable:no-unused-variable */
import Monadic from './lib/monadic'
import Populate from './lib/populate'

interface IElection {
    source: Array<any>,
    count: number,
    repetitive: boolean,
    weight: string,
    selected: Array<any>
}

export default class Election implements IElection {
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
        
        this.preCheck()

        if (this.weight) {
            
            if (method == 'monadic' ) {
                this.normalizeWeights()    
                this.selected = new Monadic(source, count, repetitive, weight, method).init()
            } 
            if (method == 'populate' ) {
                source.sort((a,b) => a[weight] - b[weight])
                const helperLowestWeight = source[0][weight] - (source[1][weight] - source[0][weight])

                const helperObj = {}
                helperObj['name'] = '__HELPER'
                helperObj[weight] = helperLowestWeight
                source.push(helperObj)
                
                console.log(source)
                this.normalizeWeights()
                console.log(source)
                this.selected = new Populate(source, count, repetitive, weight, method).init()
            }
            return
        }

        if (this.count === 1 && repetitive === false)
            this.selected = this.singleSelect()

        if (this.count > 1 && repetitive === true)
            this.selected = this.singleRepetitveSelect()

        if (this.count > 1 && repetitive === false)
            this.selected = this.multiSelect()

    }

    preCheck(): boolean {
        let isValid = true

        if (!this.source.length) throw new Error('Source is empty')

        if (this.count < 1) throw new Error('Count should be positive Number')

        if (this.source.length < this.count && this.repetitive === false)
            throw new Error(' count should not be more than source size')

        return isValid
    }

    normalizeWeights() {
        let weights = []
        this.source.forEach(item => weights.push(item[this.weight]))
        weights = this.normalize(weights)
        this.source.forEach((item, index) => item.normalizedWeight = weights[index] )
    }

    

    singleSelect(source = this.source) {
        const randomIndex = this.randomInt(0, this.source.length - 1)
        return source[randomIndex]
    }

    singleRepetitveSelect() {
        let count = this.count
        let selection = []
        while (count--)
            selection.push(this.singleSelect(this.source))
        return selection
    }

    multiSelect(source = this.source) {
        let count = this.count
        let selection = []
        while (count--) {
            const item = this.singleSelect(this.source)
            const key = this.source.findIndex(_item => _item == item)
            this.source.splice(key, 1)
            selection.push(item)
        }
        return selection
    }

    randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    normalize(arr: Array<number>): Array<number> {
        return arr.map(z => (z - Math.min(...arr)) / (Math.max(...arr) - Math.min(...arr)))
    }
}


