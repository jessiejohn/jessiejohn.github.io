/*

Work with a partner to create a Dog constructor, which creates instances containing the following properties:


* name (string)
* species (string)
* foodsEaten (array)

And the following methods:

* eatSomething(food): takes the 'food' argument (passed as a string) and pushes it into the 'foodsEaten' array
* introduce: console.logs a string introducing itself, including its name, species, and what it has eaten.

Create 3 dogs total. Make sure all 3 dogs have all properties set and methods defined.

Exercise your dogs by retrieving their properties and using their methods. Practice using both syntaxes
for retrieving properties (dot notation and brackets).

*/

var Dog = function (name, species) {
	this.name = name
	this.species = species
	this.foodsEaten = []
	this.eatSomething = function (food) {
		this.foodsEaten.push(food)
	}
	this.introduce = function () {
		console.log('I am ' + this.name, 'a ' + this.species, 'i love eating '+ this.foodsEaten)
	}
}



var dog1 = new Dog ('Mickey', 'chiweenie')
dog1.eatSomething('chicken')
dog1.introduce()


var dog2 = new Dog ('Brew', 'dachshund')
dog2.eatSomething('beef')
dog2.eatSomething('milk')
dog2.introduce()

var dog3 = new Dog ('Dolly', 'terrier')
dog3.eatSomething('kibble')
dog3.introduce()
 



