/*

Virtual Farm

Goal: You'll be creating a virtual farm whose animals can be clicked on to get an alert displaying their name and what sound they make

Instructions:

1) Create a top-level "FarmAnimal" object that all the other farm animals will inherit from
2) "FarmAnimal" must have "name", "sound", and "image" instance props
3) Extend the prototype of "FarmAnimal" with a method, "talk" that alert's the animal's "name" and "sound"
4) Create three different animal constructors for your farm - each should inherit from "FarmAnimal".
  Give each animal a "name", a "sound", and an "image" (use the web and copy an image path)
5) Once you build your animal constructors, create an instance of each animal and push that instance into the "farmAnimals" array

	ex:

	new rooter = new Rooster('Roger');
	farmAnimals.push(rooster);

*/

function FarmAnimal (name,sound,image) {
	this.name = name
	this.sound = sound
	this.image =image
}

FarmAnimal.prototype.talk = function() {
	alert(this.name + this.sound)
}

var dog = new FarmAnimal ('Mickey', 'BowBow', 'http://petcyclopedia.com/img/pets/dog/chiweenie.jpg')
var cat = new FarmAnimal ('Tabby', 'MewoMeow', 'https://www.patiliyo.com/wp-content/uploads/2017/07/ruyada-kedi-gormek.jpg')
var pig = new FarmAnimal ('Moshy', 'Squeal', 'https://kids.nationalgeographic.com/content/dam/kids/photos/animals/Mammals/H-P/pig-fence.adapt.945.1.jpg')





// push all animal instances here, ex: farmAnimals.push(rooster)
var farmAnimals = [];

farmAnimals.push(dog);
farmAnimals.push(cat);
farmAnimals.push(pig);

farmAnimals.forEach(function(animal) {
	var bottom = Math.floor(Math.random() * 75) + '%'
	var left = Math.floor(Math.random() * 75) + '%'
	var $div = $('<div>')
		.addClass('animal')
		.css({ 
			'background': 'url(' + animal.image + ')',
			'background-size': 'cover',
			'bottom': bottom,
			'left': left
		})

	$div.click(function() {
		animal.talk()
	})

	$('body').append($div)
})



