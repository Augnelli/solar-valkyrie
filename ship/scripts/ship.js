/* To Do
 * 1. Finish descriptions for each role type.
 * 2. 
 * 3. Work out bugs in general.
 * 4. Add Tonnage Algorithm
		4.1 Modular section, placed second to last in page.
		4.2 Updates to some sections change cost section display
		4.3 If tonnage used is > tonnage maximum, alert user to error.
		4.4 Display is a bar that fills as more sections are added.
 * 5. Add Cost Algorithm
 		5.1 Modular section, placed last in page.
 		5.2 Updates to some sections change cost section display
 		5.3 If cost
 * 6. Add fuel section
 * 7. Add armor section
 		7.1 Determined by selecting up to 3 chioces from a list of 7
 		7.2 Choice changes cost and tonnage remaining.
 * 8. Add Compartments
 		8.1 Determined by selecting any number of choices from a list of several
 		8.2 Choice changes cost and tonage remaining
 		8.3 Some choices change power and fuel usage per unit of time
 * 9. Add power section and power Algorithm
 		9.1 Pertains to PowerPlant, M-Drive, J-Drive, Comptuer, and Sensors
 		9.2 Determined by selecting 1 or more choices from a list of a few
 * 10. Add M-Drive and J-Drive section
 		10.1 
 * 11. Add Drive Algorithm
 		11.1 Pertains to M-Drive and J-Drive
 		11.2 Based on Size of ship, Drives Selected, Fuel remaining, Power Output
 * 12. Add Computer
 * 13. Add Weapons
 * 14. Add Sensors
 * 15. Add Deploy Vessels
 */

var ship = {
	name: document.getElementById('shipName'), 
	design: document.getElementById('shipDesign'), 
	techLevel: document.getElementById('techLevel'),
	role: document.getElementById('shipRole'), 
	tons: document.getElementById('shipTons'),
	fuel: document.getElementById('shipFuel'),
	mDrive: document.getElementById('mDrive'),
	jDrive: document.getElementById('jDrive'),
	armor: document.getElementById('shipArmor'),
	weapons: document.getElementById('shipWeapons')
};

var shipSize;
var hullHealth = 0;
var maxTonnageText;
var tonRemaining;
var percentile;
var speed;
var mDriveTons = 0;
var jDriveTons = 0;
var tonsUsedNumber = 15 + Number(mDriveTons) + Number(jDriveTons) + Number(ship.fuel.value);
var percentile = (tonsUsedNumber*100)/maxTonnageText;

var shipDescription = function(){
	var text;
	var shipInfo;
	
	if (ship.name.value == undefined || ship.name.value == ""){
		text = "Your ship is Invalid.";
		shipInfo = "You must determine a <strong>Name</strong> for your ship.";
	} else if (ship.role.value == "noneSelected"){
		text = "Your ship is Invalid.";
		shipInfo = "You must select a <strong>Role</strong> for your ship.";
	} else if (ship.techLevel.value == "noneSelected"){
		text = 	"Your ship is Invalid.";
		shipInfo = "You must select a <strong>TL</strong> for your ship.";
	} else if (ship.design.value == "noneSelected"){
		text = 	"Your ship is Invalid.";
		shipInfo = "You must select a <strong>Design</strong> for your ship.";
	} else {
		text = "Your ship is called <em>" + ship.name.value + "</em> and is intended for " + ship.role.value + " Missions. It was created with TL " + ship.techLevel.value + " tech and has a " + ship.design.value + " design. ";

		if (ship.role.value == "Combat"){
			shipInfo = "Since your ship, <em>" + ship.name.value + "</em>, is a " + ship.role.value + " vessel, it will have heavy armor and multiple weapon turrets, all of at least TL " + ship.techLevel.value + ". ";
				document.getElementById('nextStep').style.display = "inline";
		} else if (ship.role.value == "Exploration"){
			shipInfo = ship.name.value + "\'s designation as an " + ship.role.value + " vessel means you will have access to the finest scientific equipment a TL " + ship.techLevel.value + " ship owner can install.";
				
				if(ship.techLevel.value == "9"){
					shipInfo = shipInfo + " Since your ship is using low grade tech, it will likely be doing high risk exploration at the edge of explored space.";
				} else if (ship.techLevel.value == "9" || ship.techLevel.value == "10"){
					shipInfo = shipInfo + " Since your ship is using the currently accepted standard of research equipment, your finds will be valued and interesting.";
				} else {
					shipInfo = shipInfo + " Your ship has access to the highest grade of research equipment available. Any finds you make will be highly detailed and extremly valuable.";
				}
				document.getElementById('nextStep').style.display = "inline";

		} else if (ship.role.value == "Trade"){
			shipInfo = ship.name.value + " will be plying the trade routes that criss-cross this sector. It's " + ship.design.value + " design means ";
				
				if(ship.design.value = "Streamlined"){
					shipInfo = shipInfo + " your ship will be able to move faster but with a smaller load of goods.";
				} else if (ship.design.value = "Distributed"){
					shipInfo = shipInfo + " your ship will be able to haul more goods but will travel slower.";
				} else {
					shipInfo = shipInfo + " your ship will have a balance between speed and cargo capacity.";
				}
				document.getElementById('nextStep').style.display = "inline";

		} else {
			shipInfo = "Utilizing TL " + ship.techLevel.value + " technology, this mining vessel will have ";
			
				if (ship.techLevel.value == "9"){
					shipInfo = shipInfo + "inexpensive and easily replaced mining tools.";
				} else if (ship.techLevel.value == "10"){
					shipInfo = shipInfo + "modern and easily repariable mining tools.";
				} else if (ship.techLevel.value == "11"){
					shipInfo = shipInfo + "advanced and efficient mining tools.";
				} else if (ship.techLevel.value ){
					shipInfo = shipInfo + "the newest and most high tech mining tools available.";
				}
				document.getElementById('nextStep').style.display = "inline";
		}
	}
	document.getElementById('description').innerHTML = text;
	document.getElementById('information').innerHTML = shipInfo;	
}
var roleSwitch = function() {
	switch(ship.role.value){
		case "Combat":
			document.getElementById("roleNotes").innerHTML = "<p><strong>Combat</strong>: +1 Weapons Platform, +10% more Hull Durability, and +1 Base Armor; your ship can take a beating and keep on flying.</p>";
			break;
		case "Exploration":
			document.getElementById("roleNotes").innerHTML = "<p><strong>Exploration</strong>: +1 Sensors Checks, +1 M-Drive Rating, and -10% J-Drive Tonnage; your ship can get there and explore like nothing else.</p>";
			break;
		case "Trade":
			document.getElementById("roleNotes").innerHTML = "<p><strong>Trade</strong>: +1 Base Armor, -10% J-Drive Tonnage, and +1 Comms Checks; your ship is able to move efficiently and effectively between ports.</p>";
			break;
		case "Mining":
			document.getElementById("roleNotes").innerHTML = "<p><strong>Mining</strong>: +2 Attached Drones, +1 M-Drive Rating, and +1 Sensors Checks; your ship is able to identify and haul in resources others might miss.</p>";
			break;
		default:
			document.getElementById("roleNotes").innerHTML = "<p>Select a role.</p>";
		}
}
var tlSwitch = function() {
	switch(ship.techLevel.value){
		case "9":
			document.getElementById("tlNotes").innerHTML = "<p><strong>TL 9</strong>: This is the lowest TL a ship can have and still be considered space worthy. TL 9 ships are inexpensive and often desperate options.</p>";
			break;
		case "10":
			document.getElementById("tlNotes").innerHTML = "<p><strong>TL 10</strong>: A TL 10 ship has access to Jump-2 drives, giving it a wider range of operation. This is important for all types of ships.</p>";
			break;
		case "11":
			document.getElementById("tlNotes").innerHTML = "<p><strong>TL 11</strong>: Utilizing the advanced Jump-3 and highly efficient Particle Beams, TL 11 ships are able to stand their own with ease against most foes.</p>";
			break;
		case "12":
			document.getElementById("tlNotes").innerHTML = "<p><strong>TL 12</strong>: Having the best shields and access to Jump-4 makes these ships formidable. Few Pirates are willing to take these vessels on, despite the high reward.</p>";
			break;
		default:
			document.getElementById("tlNotes").innerHTML = "<p>Select a TL.</p>";
		}
}
var designSwitch = function() {
	switch(ship.design.value){
		case "Standard":
			document.getElementById("designNotes").innerHTML = "<p><strong>Standard</strong>: Optimized for neither speed and agility nor vast internal space, a Standard design is easily repairable, since spare parts are readily available.</p>";
			break;
		case "Streamlined":
			document.getElementById("designNotes").innerHTML = "<p><strong>Streamlined</strong>: These types of ships have aerodynamic shapes, including wings, a pointed nose, and the drives located in the rear. These ships are fast and can navigate in atmosphere without penalty.</p>";
			break;
		case "Distributed":
			document.getElementById("designNotes").innerHTML = "<p><strong>Distributed</strong>: With boxy shapes and little to no symmetry, a distributed ship is optimized for internal space and durability. They can not operate in an atmospehre without being damaged in the process.</p>";
			break;
		default:
			document.getElementById("designNotes").innerHTML = "<p>Select a Design.</p>"
	}
}
var tonnageValidation = function() {
	var text;
	

	if (ship.design.value == "Streamlined"){
		maxTonnageText = ship.tons.value * 0.9;
	} else if (ship.design.value == "Distributed"){
		maxTonnageText = ship.tons.value * 1.1;
	} else {
		maxTonnageText = ship.tons.value;
	}

	if (isNaN(ship.tons.value) || ship.tons.value < 100 || ship.tons.value > 2000 || ship.tons.value == undefined || ship.tons.value == "") {
		text = "That is not a Valid Tonnage";
	} else {
		text = "With a displacement tonnage of " + ship.tons.value + " your ship, " + ship.name.value + ", is ";
		if(ship.tons.value < 499){
			text = text + " rather small, probably agile, and most importantly, relatively inexpensive to operate. Because your ship is " + ship.design.value + ", you have " + Math.round(maxTonnageText) + " cubic tons available for use.";
			shipSize = "Small";
		} else if (ship.tons.value < 999){
			text = text + " average sized, which makes it more flexible and able to take on a wide variety of jobs. Because your ship is " + ship.design.value + ", you have " + Math.round(maxTonnageText) + " cubic tons available for use.";
			shipSize = "Average";
		} else if (ship.tons.value < 1499){
			text = text + " quite large, meaning it will be expensive to operate and crew, but will be able to do multiple types of jobs. Because your ship is " + ship.design.value + ", you have " + Math.round(maxTonnageText) + " cubic tons available for use.";
			shipSize = "Large";
		} else {
			text = text + " truly enormous, this ship will need a crew of dozens and could be considered a flagship. Because your ship is " + ship.design.value + ", you have " + Math.round(maxTonnageText) + " cubic tons available for use.";
		}
	document.getElementById("tonsMax").innerHTML = Math.round(maxTonnageText);
	document.getElementById('fuelStep').style.display = "inline";
	}
	document.getElementById("tonnageValidation").innerHTML = text;
}
document.getElementById("barUsed").style.marginLeft = percentile + "%";

var fuelTonnage = function(){
	var text;
	if (isNaN(ship.fuel.value) || ship.fuel.value == undefined || ship.fuel.value == "" || ship.fuel.value >= tonsMax) {
		text = "That is not a Valid Fuel Input";
	} else {
		if (ship.fuel.value < (ship.tons.value*0.05)){
			text = "With onlyl " + ship.fuel.value + " tons of fuel, your ship will be restricted to short flights."
		} else if (ship.fuel.value > (ship.tons.value*0.2)){
			text = "With a whopping " + ship.fuel.value + " tons of fuel, your ship is suited to long missions and several repeated jumps."
		} else if (ship.fuel.vale >= (ship.tons.value*0.8)){
			text = "Your ship is overloaded with fuel, it can do little else other than haul fuel to and from planets in the same system."
		} else {
			text = "With " + ship.fuel.value + " tons of fuel, your ship is ready for action. The 15 extra tons covers basic Computers, Sensors, and Life Support Modules."
		}
		document.getElementById("mobilityStep").style.display = "inline";
	}
	document.getElementById("fuelText").innerHTML = text;
	document.getElementById("tonsUsed").innerHTML = Number(tonsUsedNumber) + Number(ship.fuel.value);
	
}
var mobility = function(){
	var mDriveTons;

	if (ship.mDrive.value == "noneSelected"){
		document.getElementById("mobilityText").innerHTML = "You must select a type of <strong>M-Drive</strong>.";
	} else if (ship.mDrive.value == "Solar Sails"){
		document.getElementById("mobilityText").innerHTML = "Your ship sails on the cosmic wind emmanating from the stars. Dude.";
		mDriveTons = (ship.tons.value * 0.02);
	} else if (ship.mDrive.value == "Ion Drive") {
		document.getElementById("mobilityText").innerHTML = "Ion Drives are very efficient but have limited acceleration.";
		mDriveTons = (ship.tons.value * 0.03);
	} else {
		document.getElementById("mobilityText").innerHTML = "Fusion Thrusters can rapidly accelerate, although they use more resources";
		mDriveTons = (ship.tons.value * 0.04);
	}
	document.getElementById("tonsUsed").innerHTML = Number(tonsUsedNumber) + Number(mDriveTons);
}
var shipDurability = function(){
	var designMod;
	if (ship.design.value == "Streamlined"){
		designMod = 0.04;
	} else if (ship.design.value == "Standard"){
		designMod = 0.05;
	} else {
		designMod = 0.06;
	}
	if (ship.role.value = "Combat"){
		designMod = designMod+.01;
	}
	console.log()
	hullHealth = "Ship Hull Durability Rating: " + ship.tons.value * designMod;
	document.getElementById("hullDurability").innerHTML = hullHealth;
}


/************* coming soon *************
var sensors = {
	radar: true, 
	lidar: true, 
	densitrometer: true, 
	bioscanner: true, 
	cost: 1.1
};
var mDrive = {
	cost: 10, 
	rating: 9, 
	fuelPerWeek: 3
};
var jDrive = {
	cost: 4, 
	rating: 2, 
	fuelPerJump: 15
};
var powerPlant = {
	cost: 2.5, 
	output: 10, 
	fuelPerWeek: 2
};
var cargo = {
	cost: 0.1, 
	tons: 200
};

var computer = {
	cost: 2.5
};

var accelerationFunction = function(){

	switch (){
		case 0:
			speed = "unable to move on its own and must be towed to and from port.";
			break;
		case 1:
		case 2:
			speed = "slow, barely able to move out of the way of incoming debris, even with ample warning.";
			break;
		case 3:
		case 4:
			speed = "average, able to move when it needs to and can even make planetfall.";
			break;
		case 5:
		case 6:
			speed = "agile, able to keep pace with some light craft and even dodge some long ranged attacks.";
			break;
		case 7:
		case 8:
			speed = "fast, able to outrun some light craft and easily dodge most attacks.";
			break;
		case 9:
		case 10:
			speed = "very fast, possibly keeping pace with an interceptor. This ship is very hard to hit with long range attacks.";
			break;
		default:
			speed = "unknown, there is likely something wrong with the m-Drive.";
	}
	document.getElementById("").innerHTML = "With a maximum acceleration of " +  + " the ship is " + speed;
// fuel stuff
	if (fuel.fuelScoops === true && ship.design == "Streamlined"){
		console.log("It is able to replenish it's fuel on its own by either skimming a gas giant or landing in a body of liquid water.");
	} else if (fuel.fuelScoops === true && ship.design == "Standard"){
		console.log("The ship can refuel by carefully landing on a world with liquid water or at any station with a fuel depot.");
	} else if (fuel.fuelScoops === false || ship.design == "Distrbuted"){
		console.log("The ship is unable to refuel on its own and must rely on fuel depots.");
	}


// combat stuff
*/
