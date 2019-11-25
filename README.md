## Selector

A library for selecting part of the data based on simple or random weighting with different algorithms such as isolation points or popularity

Election class accepts 5 parameters.

 1. array of Data
 2. how many item we want to select
 3. can we select repeative data or not
 4. weights for using algorithms. It's optional.
 5. name of algorithm. It's optional.

### simeple usage
we have array of people, let's select two of them without repeative item.
election object has a selected property which is elected items
```javascript
let arr = ['farhad', 'Negar', 'Ali', 'Negin', 'Reza', 'Hasan', 'Maryam', 'Sara'];
const election =  new  Election(arr, 2, false)
console.log(election)
/*
Election {
source: [ 'Ali', 'Negin', 'Reza', 'Hasan', 'Maryam', 'Sara' ],
count: 2,
repetitive: false,
weight: null,
selected: [ 'Negar', 'farhad' ] }
*/
```
### Monadic
This algorithm is use full when we have weight for our data and we want to select those which are in isolated area.
in other word with monadic algorithm those data who are more isolated have more chance to be selected.
#### simple example
```javascript
let products = [
	{ name:  'IPhone X', price:  4500 },
	{ name:  'Samsung S10', price:  11700 },
	{ name:  'Huawei Mate 10', price:  7600 },
	{ name:  'LG lite 5', price:  4200 },
	{ name:  'HTC Pro V', price:  3420 },
]
const election =  new  Election(products, 1, false, 'price', 'monadic')
```
here we pass price of products as weights.
Now Huawei and Samsung s10 have more chance to be selected
I repeat this in loop to see how many times which one is selected more.
so I changed above code as well as below
```javascript
let products = [
	{ name:  'IPhone X', price:  4500 },
	{ name:  'Samsung S10', price:  11700 },
	{ name:  'Huawei Mate 10', price:  7600 },
	{ name:  'LG lite 5', price:  4200 },
	{ name:  'HTC Pro V', price:  3420 },
]
for(let i =  0; i <  20; i++) {
	const election =  new  Election(products, 1, false, 'price', 'monadic')
	console.log(election.selected['name'])
}
/*
Huawei Mate 10  
HTC Pro V  
IPhone X  
Huawei Mate 10  
HTC Pro V  
Samsung S10  
IPhone X  
Huawei Mate 10  
Samsung S10  
Huawei Mate 10  
Samsung S10  
Huawei Mate 10  
Samsung S10  
IPhone X  
Huawei Mate 10  
Huawei Mate 10  
LG lite 5  
Samsung S10  
Huawei Mate 10  
Huawei Mate 10
*/
```
As we said Huawei and Samsung selected more than the others because their weights are isolated (are alone) and other products which their prices are in close range have less chance to be selected.
Huawei selected 9 times.
Samsung selected 5 times.

Road Map
 - [x] Simple Random
 - [x] Monadic Algorithm
 - [ ] Popularity Algorithm
