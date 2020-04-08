var player = createPlayerObject("Luke", 100, "Engineer", "", [], createStatObject(0, 0, 0, 0), 0, 0,false);
var rooms = [];
var headcrab = createEnemyObject("Headcrab","will jump at your head", 0, 20, 10, "Talons", [createBodyPartObject("Body","The Body of the headcrab", 5, 20, 0)])
var pickUpItemSound;
var pickUpAmmoSound;

function gameStart()
{
 //method will decide and pick between starter rooms based on class
 //player.username = sessionStorage.getItem("name");
 //player.charClass = sessionStorage.getItem("class");
 addRooms();
 pickUpItemSound = new sound("sounds/pickUpItem.mp3");
 pickUpAmmoSound = new sound("sounds/pickUpAmmo.mp3");
 var newCurrent = createRoomObject(0,0,0,0,0,0,0,0,0);
 if (player.charClass == "Hacker")
 {
   rooms.forEach((item, i) => {
     if(item.roomName == "computer lab")
     {
       newCurrent = item;
       document.getElementById("text-display").innerHTML +="Hacker Starter Text"
       item.roomDiscovered = true;
     }
   });
 }
 else if (player.charClass == "Engineer")
 {
   rooms.forEach((item, i) => {
     if(item.roomName == "quarters")
     {
       document.getElementById("text-display").innerHTML += "you, have just been sleeping after a long shift, when you are thrown suddenly to the floor with a bang that could wake the dead.You stumble to your feet, bleary-eyed, with no idea what's going on, but whatever it is, it isn't going to be fun."
       newCurrent = item;
       item.roomDiscovered = true;
     }
   });
 }
 else if (player.charClass == "SpaceCowboy")
 {
   rooms.forEach((item, i) => {
     if(item.roomName == "armory")
     {
       document.getElementById("text-display").innerHTML +="SpaceCowboy Starter Text"
       newCurrent = item;
       item.roomDiscovered = true;
     }
   });
 }
 player.currentRoom = newCurrent;
 document.getElementById("currentRoomDisplay").innerHTML +=player.currentRoom.roomName;
}
function createPlayerObject(usernameValue, healthValue, charClassValue, currentRoomValue, inventoryValue, statsValue, attackValue, defenseValue,detectedValue)
{
  var playerObject = {username:usernameValue, health:healthValue, charClass:charClassValue, currentRoom:currentRoomValue, inventory:inventoryValue, stats:statsValue, attack:attackValue, defense:defenseValue, detected:detectedValue};
  return playerObject;
}
function createStatObject(areasExploredValue, itemsCollectedValue, enemiesDefeatedValue, timeLeftValue)
{
  var statsObject = {areasExplored:areasExploredValue, itemsCollected:itemsCollectedValue, enemiesDefeated:enemiesDefeatedValue, timeLeft:timeLeftValue};
  return statsObject;
}
function createRoomObject(roomNameValue, typeValue, roomDescriptionValue, enemiesValue, exitsValue, roomItemsValue, interactableRoomObjectsValue, roomDiscoveredValue, lookedValue)
{
  var roomObject = {roomName:roomNameValue, type:typeValue, roomDescriptions:roomDescriptionValue, enemies:enemiesValue, exits:exitsValue, roomItems:roomItemsValue, interactables:interactableRoomObjectsValue, roomDiscovered:roomDiscoveredValue, looked:lookedValue};
  return roomObject;
}
function createExitObject(exitRoomNameValue, orientationValue,descriptionValue,blockedValue)
{
  var exitObject = {exitRoomName:exitRoomNameValue, orientation:orientationValue, description:descriptionValue, blocked:blockedValue};
  return exitObject;
}
function createItemObject(itemNameValue, itemTypeValue, itemDescriptionValue, itemSearchedValue, itemFilePathValue)
{
  var itemObject = {itemName:itemNameValue, itemType:itemTypeValue, itemDescription:itemDescriptionValue, itemSearched:itemSearchedValue, itemFilePath:itemFilePathValue};
  return itemObject;
}
function createWeaponObject(itemNameValue, ammoValue, magSizeValue, damageValue, weaponTypeValue, attackKeyValue, descriptionValue, itemFilePathValue)
{
  var weaponObject = {item:createItemObject(itemNameValue, "Weapon", descriptionValue, false, itemFilePathValue),ammo:ammoValue,magSize:magSizeValue,  damage:damageValue, weaponType:weaponTypeValue, attackKey:attackKeyValue};
  return weaponObject;
}
function createArmourObject(itemNameValue, bodyPartValue, defenseValue, descriptionValue, itemFilePathValue)
{
  var armourObject = {item:createItemObject(itemNameValue, "Armour", descriptionValue, false, itemFilePathValue), bodyPart:bodyPartValue, defense:defenseValue};
  return armourObject;
}
function createGadgetObject(itemNameValue, descriptionValue , itemFilePathValue)
{
  var gadgetObject = {item:createItemObject(itemNameValue, "Gadget", descriptionValue,  false, itemFilePathValue)};
  return gadgetObject;
}
function createDescriptionObject(actionValue,textValue){
  var descriptionObject ={action:actionValue,text:textValue};
  return descriptionObject;
}
function createAmmoObject(itemNameValue,descriptionValue,itemFilePathValue,amountValue)
{
  var ammoObject= {item:createItemObject(itemNameValue, "Ammo", descriptionValue, false, itemFilePathValue), amount:amountValue};
  return ammoObject;
}
function createHealthObject(itemNameValue,descriptionValue,itemFilePathValue,healthGainValue){
  var healthObject={item:createItemObject(itemNameValue, "Health", descriptionValue, false, itemFilePathValue), healthGain:healthGainValue};
  return healthObject;
}
function createPuzzleKeyObject(itemNameValue,descriptionValue,itemFilePathValue){
  var puzzleKeyObject={item:createItemObject(itemNameValue,"Puzzle", descriptionValue, false, itemFilePathValue)};
  return puzzleKeyObject;
}
function createPuzzleLockObject(interactableNameValue, descriptionValue, customCommandValue,descriptionUnlockedValue){
  var puzzleLockObject={interactableName:interactableNameValue, description:descriptionValue, customCommand:customCommandValue,descriptionUnlocked:descriptionUnlockedValue};
  return puzzleLockObject;
}
function createEnemyObject(enemyTypeValue,descriptionValue,filePathValue,healthValue,damagePerAttackValue,weaponValue, bodyPartsValue){
  var enemyObject={enemyType:enemyTypeValue,description:descriptionValue,filePath:filePathValue,health:healthValue,damagePerAttack:damagePerAttackValue, weapon:weaponValue, bodyParts:bodyPartsValue};
  return enemyObject;
}
function createLeverObject(interactableNameValue, descriptionValue, customCommandValue, pulledStateValue ,pulledDescriptionValue){
  var leverObject={interactableName:interactableNameValue, description:descriptionValue,customCommand:customCommandValue,pulledState:pulledStateValue,pulledDescription:pulledDescriptionValue};
  return leverObject;
}
function createBodyPartObject(partNameValue,filePathValue,damagePerHitValue, percentageToHitValue, descriptionValue){
  var bodyPartObject={partName:partNameValue, description:descriptionValue,baseDamagePerHit:damagePerHitValue,percentageToHit:percentageToHitValue, filePath:filePathValue};
  return bodyPartObject;
}
function createDataPadObject(itemNameValue,descriptionValue, informationValue, itemFilePathValue)
{
  var dataPadObject =  {item:createItemObject(itemNameValue, "Datapad", descriptionValue, false, itemFilePathValue), information:informationValue};
  return dataPadObject;
}
function createInteractableObject(interactableNameValue, descriptionValue, customCommandValue,)
{
  var interactableObject =  {interactableName:interactableNameValue, description:descriptionValue,customCommand:customCommandValue};
  return interactableObject;
}
function createBlockedPathObject(interactableNameValue, descriptionValue, customCommandValue,exitRoomNameValue,descriptionOpenValue,idValue){
  var blockedPathObject={interactableName:interactableNameValue, description:descriptionValue, customCommand:customCommandValue, exitRoomName:exitRoomNameValue,descriptionOpen:descriptionOpenValue,id:idValue};
  return blockedPathObject;
}

function createModifierObject(itemNameValue, descriptionValue, changeValue, mechanicChangeValue)
{
  var modifierObject = {item:createItemObject(itemNameValue, "Modifier", descriptionValue, false, ""), change:changeValue, mechanicChange:mechanicChangeValue};
  return modifierObject;
}
//createDataPadObject(itemNameValue, descriptionValue, informationValue)
//createHealthObject(itemNameValue,descriptionValue,itemFilePathValue,sizeValue)
//createAmmoObject(itemNameValue,descriptionValue,itemFilePathValue,amountValue)
//createDescriptionObject(actionValue,textValue)
//createEnemyObject(enemyTypeValue,descriptionValue,filePathValue,healthValue,damagePerAttackValue)
//createPuzzleObject(itemNameValue,descriptionValue,itemFilePathValue,puzzleTypeValue,puzzleMatchValue)

function addRooms()
{
  // start room instanciation
  var quarters =
  createRoomObject
  (
    "quarters", //Room Name
    "room", //Room Type
    [ //Room Descriptions
      createDescriptionObject
      (
        "first-entry",
        "You see beds lining the room, all with the bedding strewn about the place. It smells a tad like stale socks, and there isn’t anyone to be seen."
      ),
      createDescriptionObject
      (
        "second-entry",
        "You re-enter the quarters finding them exactly as you left it."
      )
    ],
     [headcrab], //Enemies Value
    [ //Exits to current room
      createExitObject("hallway01", "east", "You step out of the quarters and into one of the ships long dark hallways.",false)
    ],
    [ //Items in the current room
      createWeaponObject("pistol",9, 9, 10, "Ranged", ["shoot"], "It is a gun","images/laserpistol.png"),
      createGadgetObject("blowtorch","This is a blowtorch","images/blowtorch.png"),
      createAmmoObject("energy cells","This is an energy cell,it is used to reload weapons.","images/energycell.png",Math.floor((Math.random() * 10) + 1) )

    ],
    [

    ], //Number of interactable items in the room
    false //Has Room been entered/Discovered?
  );
  var armory =
  createRoomObject
  (
    "armory",//Room Name
    "room",//Room Type
    [//Room Descriptions
      createDescriptionObject
      (
        "first-entry",
        "You walk into the room, and see different kinds of weaponry in various stages of development, with bits of guns strewn about the tables they rest on. This must be the Armory."
      ),
      createDescriptionObject
      (
        "second-entry",
        "You re-enter the armory, finding the same weapon parts strewn on the floor."
      )
    ],
    [],//Enemies Value
    [ //Exits to current room
      createExitObject("hallway05", "north", "You exit the armory and enter into the hallway and see a junction.",false),
      createExitObject("hallway06", "south", "You creep out of the armory and enter into a dimly lit hallway.",false)
    ],
    [//Items in the current room
      createWeaponObject("revolver",6,6, 25,"Ranged", ["shoot"],"It is a gun","images/laserrevolver.png"),
      createGadgetObject("explosives","These are explosives","images/explosives.png"),
      createAmmoObject("energy cells","This is an energy cell,it is used to reload weapons.","images/energycell.png",Math.floor((Math.random() * 10) + 1) )
    ],
    [

    ], //Number of interactable items in the room
    false //Has Room been entered/Discovered?
  );

  var computerLab =
  createRoomObject
  (
    "computer lab",//Room Name
    "room",//Room Type
    [//Room Descriptions
      createDescriptionObject
      (
        "first-entry",
        "You step into the room and are greeted by a low hum of machines, you notice several computer panels dotting the walls, in the center of the room lies the ship's servers This must be the Computer Lab."
      ),
      createDescriptionObject
      (
        "second-entry",
        "You re-enter into the Computer Lab and are one again greeted by flashing displays and the hum of the servers. "
      )
    ],
    [],//Enemies Value
    [//Exits to current room
      createExitObject("hallway03", "north","You step out of the computer lab into a hallway and arrive at a junction. ",false),
      createExitObject("hallway06", "west","",true)
    ],
    [//Items in the current room
      createWeaponObject("pistol", 9, 9, 10, "Ranged", ["shoot"], "It is a gun","images/laserpistol.png"),
      createGadgetObject("hacking-tool","This is a hacking tool","images/hackingtool.png"),
      createAmmoObject("energy cells","This is an energy cell,it is used to reload weapons.","images/energycell.png", Math.floor((Math.random() * 10) + 1) )
    ],
    [
      createBlockedPathObject("rubble","You approach the rubble and quickly see there is no way through it, you might be able to clear it with something?","use explosives on rubble","hallway06","You plant the explosives in the center of the rubble and duck into an alcove, the explosives detonate leaving the way clear","rubble01"),
    ], //Number of interactable items in the room
    false //Has Room been entered/Discovered?
  );

  var storageUnit1 =
  createRoomObject
  (
    "storage unit 01",//Room Name
    "room",//Room Type
    [//Room Descriptions
      createDescriptionObject
      (
        "first-entry",
        "As you walk into the room, you realise it is little more than a glorified broom closet, with little space to move about , and only one way in or out."
      ),
      createDescriptionObject
      (
        "second-entry",
        "You re-enter the storage unit finding it undisturbed. "
      )
    ],
    [

    ],//Enemies Value
    [//Exits to current room
      createExitObject("hallway03", "east","You step out of the storage unit into a hallway and arrive at a junction. ",false)
    ],
    [//Items in the current room
      createAmmoObject("energy cells","This is an energy cell,it is used to reload weapons.","images/energycell.png",Math.floor((Math.random() * 10) + 1))
    ],
    [

    ], //Number of interactable items in the room
    false //Has Room been entered/Discovered?
  );
  var storageUnit2 =
  createRoomObject
  (
    "storage unit 02",//Room Name
    "room",//Room Type
    [
      createDescriptionObject
      (
      "first-entry",
      "As you enter the room, you quickly realise this may not have been this best idea, you see that several shelves and aisles have collapsed into each other, with large supply crates scattered on the floor blocking any path. This must have been a storage unit."
      ),
      createDescriptionObject
      (
        "second-entry",
        "You re-enter the wrecked storage unit and are greeted by the collapsed shelves once again. "
      )
    ],
    [],//Enemies Value
    [//Exits to current room
      createExitObject("hallway12", "south","You walk through the doorway and enter into the hallway",true),
      createExitObject("reactor room", "north","You crawl into the dark vent,crawling forward into the vent, you hear a distant low hum.",true),
      createExitObject("hallway11", "west","You walk past the cleared rubble and out of the room",true)
    ],
    [//Items in the current room
      createAmmoObject("energy cells","This is an energy cell,it is used to reload weapons.","images/energycell.png", Math.floor((Math.random() * 10) + 1) ),
      createHealthObject("health pack","This is a health pack","images/healthpack.png", 25)
    ],
    [
       createBlockedPathObject("vent","You try to open the vent and remove its screws but they don't budge, you might be able to cut it open with something?","use blowtorch on vent","reactor room","Using your blowtorch you succesfully burn through the vent supports, it falls to the floor leaving the dark vent open.","vent05"),
       createBlockedPathObject("rubble","You approach the rubble and quickly see there is no way through it, you might be able to clear it with something?","use explosives on rubble","hallway11","You plant the explosives in the center of the rubble and duck into an alcove, the explosives detonate leaving the way clear","rubble04"),
       createBlockedPathObject("door","You walk towards the door and see that the control panel has locked, you might be able to unlock it with something?","use hacking-tool on door","hallway13","Using your hacking-tool you succesfully hack into the door controls and open the door.","door05"),
    ], //Number of interactable items in the room
    false //Has Room been entered/Discovered?
  );
  var kitchen =
  createRoomObject
  (
    "kitchen",//Room Name
    "room",//Room Type
    [//Room Descriptions
      createDescriptionObject(
        "first-entry",
        "You enter into the room, the lights flickering as they flicker you see pots and pans strewn across the floor with a stove still flaming, providing an eerie dim light.The kitchen, whoever left here left in quite a hurry."
      ),
      createDescriptionObject(
        "second-entry",
        "You Re-enter the kitchen finding the pots and pans lying on the floor just like you left it the stove still quietly burning."
      ),
    ],
     [],//Enemies Value
     [//Exits to current room
       createExitObject("mess hall","north","You walk out of the kitchen through the unlocked door into another room.",true),
       createExitObject("hallway04", "south"," You slip out of the kitchen back into one of the ship's long hallways",false)
     ],
     [//Items in the current room
       createAmmoObject("energy cells","This is an energy cell","images/energycell.png",Math.floor((Math.random() * 10) + 1) ),
     ],
     [
       createBlockedPathObject("door","You walk towards the door and see that the control panel has locked, you might be able to unlock it with something?","use hacking-tool on door","mess hall","Using your hacking-tool you succesfully hack into the door controls and open the door.","door02"),
     ], //Number of interactable items in the room
     false //Has Room been entered/Discovered?
  );
  //FINISH DESCRIPTION
  var messHall =
  createRoomObject
  (
    "mess hall",//Room Name
    "room",//Room Type
    [//Room Descriptions
      createDescriptionObject(
        "first-entry",
        "first-entry mess hall placeholder"
      ),
      createDescriptionObject(
        "second-entry",
        "second-entry mess hall placeholder"
      ),
    ],
    [],//Enemies Value
    [//Exits to current room
      createExitObject("hallway12", "north","You step out of the mess hall into another one of the ship's long corridors.",false),
      createExitObject("kitchen","south","",true),
      createExitObject("hallway8", "west","You leave the mess hall and head into another hallway.",false)
    ],
    [//Items in the current room
      createDataPadObject("torn map","A map of part of the ship","You inspect the torn map and see that the north door leads towards the reactor room and the east door leads to the hanger bay.","images/tornmap.png"),
      createWeaponObject("shotgun",5,5,35,"Ranged",["shoot"],"It is a gun","images/lasershotgun.png"),
      createAmmoObject("energy cells","This is an energy cell","images/energycell.png", Math.floor((Math.random() * 10) + 1) ),
      createHealthObject("health kit","This is a health kit","images/healthkit.png", 50)
    ],
    [
      createBlockedPathObject("door","You walk towards the door and see that the control panel has locked, you might be able to unlock it with something?","use hacking-tool on door","kitchen","Using your hacking-tool you succesfully hack into the door controls and open the door.","door02"),
    ], //Number of interactable items in the room
    false //Has Room been entered/Discovered?
  );
  var maintenanceBay  =
  createRoomObject
  (
    "maintenance bay",//Room Name
    "room",//Room Type
    [//Room Descriptions
      createDescriptionObject(
        "first-entry",
        "You enter the room, and see a wall decorated with various power and repair tools, in the centre of the room are a series of workbenches with several robot and mechanical parts, the maintenance bay."
      ),
      createDescriptionObject(
        "second-entry",
        "You enter back into the maintence bay finding it exactly as you left it."
      ),
    ],
     [],//Enemies Value
    [//Exits to current room
      createExitObject("hallway10", "east","As you crawl forward into the vent, you hear it creak as you slowly crawl through it, lets hope nothing hears that.",true),
      createExitObject("hallway08", "south","You leave the maintence bay and enter back into the hallway.",false)
    ],
    [//Items in the current room
      createAmmoObject("energy cells","This is an energy cell","images/energycell.png", Math.floor((Math.random() * 10) + 1) ),
      createWeaponObject("smg",20,20,35,"Ranged",["shoot"],"It is a gun","images/lasersmg.png"),
      //createDataPadObject("")
    ],
    [
       createBlockedPathObject("vent","You try to open the vent and remove its screws but they don't budge, you might be able to cut it open with something?","use blowtorch on vent","hallway10","Using your blowtorch you succesfully burn through the vent supports, it falls to the floor leaving the dark vent open.","vent03"),
    ], //Number of interactable items in the room
    false //Has Room been entered/Discovered?
  );
  var hangerBay  =
   createRoomObject
   (
     "hanger bay",//Room Name
     "room",//Room Type
     [//Room Descriptions
       createDescriptionObject(
         "first-entry",
         "You quickly enter the hanger bay hoping for an escape, the room is oddly quiet"
       ),
       createDescriptionObject(
         "second-entry",
         "Yor renter the hanger bay."
       ),
     ],
     [],//Enemies Value
     [//Exits to current room
       createExitObject("hallway14", "east","You leave the hanger bay and enter back into the hallway.",false),
       createExitObject("exit", "west","",false)
      // createExitObject("escape pod","south")
     ],
     [//Items in the current room

     ],
     [

     ], //Number of interactable items in the room
     false //Has Room been entered/Discovered?
   );
  var researchLab  =
  createRoomObject
  (
    "research lab",//Room Name
    "room",//Room Type
    [//Room Descriptions
      createDescriptionObject(
        "first-entry",
        ""
      ),
      createDescriptionObject(
        "second-entry",
        ""
      ),
    ],
    [],//Enemies Value
    [//Exits to current room
      createExitObject("hallway09", "south","",false),
      createExitObject("hallway13", "east","You leave the research lab and enter back into the hallway.",false)
    ],
    [//Items in the current room
      createAmmoObject("energy cells","This is an energy cell","images/energycell.png", Math.floor((Math.random() * 10) + 1), ),
      createPuzzleKeyObject("data card","This is a data card","images/datacard.png")
    ],
    [
      createBlockedPathObject("rubble","You approach the rubble and quickly see there is no way through it, you might be able to clear it with something?","use explosives on rubble","hallway09","You plant the explosives in the center of the rubble and duck into an alcove, the explosives detonate leaving the way clear","rubble03"),
    ], //Number of interactable items in the room
    false //Has Room been entered/Discovered?
  );
  var reactorRoom =
  createRoomObject
  (
    "reactor room",//Room Name
    "room",//Room Type
    [//Room Descriptions
      createDescriptionObject(
        "first-entry",
        ""
      ),
      createDescriptionObject(
        "second-entry",
        ""
      ),
    ],
    [],//Enemies Value
    [//Exits to current room
      createExitObject("hallway11", "south", " ",true),
      createExitObject("storage unit 02", "east","You crawl into the dark vent, and hear the hum of the reactor fade.",true),
      createExitObject("hallway13", "west","You leave the research lab and enter into the corridor.",false)
    ],
    [//Items in the current room

      createDataPadObject("sticky note","A sticky note about the missing data card","The note reads: “Control panel broken 17:09, new data card required, there may be a spare in the research lab – Ensign Shrew","images/stickynote.png")
    ],
    [
      createPuzzleLockObject("console","You inspect the console, and see a flashing yellow screen along with an error message:ERROR MISSING DATACARD","insert data card","You insert the data card into the reactor control panel, the screen begins to flash green and an alert appears."),
      createBlockedPathObject("vent","You try to open the vent and remove its screws but they don't budge, you might be able to cut it open with something?","use blowtorch on vent","storage unit 02","Using your blowtorch you succesfully burn through the vent supports, it falls to the floor leaving the dark vent open.","vent05"),
      createBlockedPathObject("door","You walk towards the door and see that the control panel has locked, you might be able to unlock it with something?","use hacking-tool on door","hallway11","Using your hacking-tool you succesfully hack into the door controls and open the door.","door04"),
    ], //Number of interactable items in the room
    false //Has Room been entered/Discovered?
  );
  // hallway instanciation
  var hallway01 =
  createRoomObject
  (
    "hallway01",//Room Name
    "hallway",//Room Type
     [//Room Descriptions
       createDescriptionObject(
         "first-entry",
         "The hallway lies quiet and barren, covered in debris from an explosion of some sort."
       ),
       createDescriptionObject(
         "second-entry",
         "The hallway lies quiet."
       ),
     ],
     [],//Enemies Value
     [//Exits to current room
       createExitObject("hallway02", "north", "You countinue up the hallway north.",false),
       createExitObject("hallway04", "east","You crawl into the vent,it is dark and narrow with very little room to move, pushing forward you emerge in a hallway.",true),
       createExitObject("quarters", "west", "You head west through the hallway into the quarters",false),
       createExitObject("hallway03","south", "You head south down the hallway and reach a junction",false)
     ],
     [//Items in the current room

     ],
     [
       createInteractableObject("broadcast","You inspect the broadcast it flashes 'WARNING: SHIP INTEGRITY COMPROMISED ABANDON SHIP' That doesn't sound good better try and make it to the hanger bay","no"),
       createBlockedPathObject("vent","You try to open the vent and remove its screws but they don't budge, you might be able to cut it open with something?","use blowtorch on vent","hallway04","using your blowtorch you succesfully burn through the vent supports, it falls to the floor leaving the dark vent open.","vent01")
     ], //Number of interactable items in the room
     false //Has Room been entered/Discovered?
   );
  var hallway02 =
  createRoomObject
  (
    "hallway02",//Room Name
    "hallway",//Room Type
    [//Room Descriptions
      createDescriptionObject(
        "first-entry",
        "You reach the end of the hallway and arrive at a humming force-field. It is a dead end."
      ),
      createDescriptionObject(
        "second-entry",
        "You reach the end of the hallway and arrive at a humming force-field. It is a dead end."
      ),
    ],
    [],//Enemies Value
    [//Exits to current room
      createExitObject("hallway01", "south", "You head south down the hallway.",false)
    ],
    [//Items in the current room
      createInteractableObject("force-field","You examine the force field and see that beyond it part of the ship's hull as collaspsed leaving the other side of the hallway open to space","no")
    ],
    1, //Number of interactable items in the room
    false //Has Room been entered/Discovered?
  );
  var hallway03 =
  createRoomObject
  (
    "hallway03",//Room Name
    "hallway",//Room Type
    [//Room Descriptions
      createDescriptionObject(
        "first-entry",
        "You reach the junction and see three different paths."
      ),
      createDescriptionObject(
        "second-entry",
        "You reach the junction and see three different paths"
      ),
    ],
    [],//Enemies Value
    [//Exits to current room
      createExitObject("hallway01", "north","You head north up the hallway",false),
      createExitObject("storage unit 01", "west","You head west towards the storage unit",false),
      createExitObject("computer lab", "south","You head south towards the computer lab",false),
      createExitObject("hallway04","east","With the door now opened you head east into another hallway.",true),

    ],
    [//Items in the current room

    ],
    [
      createInteractableObject("broadcast","You inspect the broadcast it flashes “WARNING: SHIP INTEGRITY COMPROMISED ABANDON SHIP” That doesn’t sound good better try and make it to the hanger bay","no"),
      createBlockedPathObject("door","You walk towards the door and see that the control panel has locked, you might be able to unlock it with something?","use hacking-tool on door","hallway04","Using your hacking-tool you succesfully hack into the door controls and open the door.","door01"),
      createInteractableObject("Sign-post","You examine the sign post and and see that the computer lab is to the south, a storage unit lies to the west, and a hallway to the mess hall is to the east.")
    ], //Number of interactable items in the room
    false //Has Room been entered/Discovered?
  );
  var hallway04 =
  createRoomObject
  (
    "hallway04",//Room Name
    "hallway",//Room Type
    [//Room Descriptions
      createDescriptionObject(
        "first-entry",
        ""
      ),
      createDescriptionObject(
        "second-entry",
        ""
      ),
    ],
    [],//Enemies Value
    [//Exits to current room
      createExitObject("kitchen", "north","You head north to the end of the hallway into a room.",false),
      createExitObject("hallway05", "east","You head east into another one of the ships long hallways. ",false),
      createExitObject("hallway01", "west","You crawl into the vent,it is dark and narrow with very little room to move, pushing forward you emerge in a hallway.",true),
      createExitObject("hallway03","south","With the door opened you head south into another hallway.",true)

    ],
    [//Items in the current room
      createAmmoObject("energy cells","This is an energy cell,it is used to reload weapons.","images/energycell.png", Math.floor((Math.random() * 10) + 1) ),
      createHealthObject("health pack","This is a health pack","images/healthpack.png", 25)
    ],
    [
      createBlockedPathObject("vent","You try to open the vent and remove its screws but they don't budge, you might be able to cut it open with something?","use blowtorch on vent","hallway01","using your blowtorch you succesfully burn through the vent supports, it falls to the floor leaving the dark vent open.","vent01"),
      createBlockedPathObject("door","You walk towards the door and see that the control panel has locked, you might be able to unlock it with something?","use hacking-tool on door","hallway03","Using your hacking-tool you succesfully hack into the door controls and open the door.","door01"),
    ], //Number of interactable items in the room
    false //Has Room been entered/Discovered?
  );
  var hallway05 =
  createRoomObject
  (
    "hallway05",//Room Name
    "hallway",//Room Type
    [//Room Descriptions
      createDescriptionObject(
        "first-entry",
        "You step out into the hallway, it is barren, damaged cables hang loose from the ceiling sparking, best watch your step ."
      ),
      createDescriptionObject(
        "second-entry",
        "You enter the hallway once more it lies quiet."
      ),
    ],
     [],//Enemies Value
     [//Exits to current room
       createExitObject("hallway04", "west","You head north to the end of the hallway into a room.",false),
       createExitObject("armory","south","You step out of the hallway and walk into a room.",false),
       createExitObject("hallway07", "east","",true),
       createExitObject("hallway08", "north","You crawl into the dark vent, and slowly move through it,you emerge into a long hallway.",true)
     ],
     [//Items in the current room

     ],
     [
       createBlockedPathObject("vent","You try to open the vent and remove its screws but they don't budge, you might be able to cut it open with something?","use blowtorch on vent","hallway08","Using your blowtorch you succesfully burn through the vent supports, it falls to the floor leaving the dark vent open.","vent02"),
       createBlockedPathObject("rubble","You approach the rubble and quickly see there is no way through it, you might be able to clear it with something?","use explosives on rubble","hallway07","You plant the explosives in the center of the rubble and duck into an alcove, the explosives detonate leaving the way clear","rubble02"),
       createInteractableObject("Broadcast","You inspect the broadcast it flashes “WARNING: SHIP INTEGRITY COMPROMISED ABANDON SHIP” That doesn’t sound good better try and make it to the hanger bay","no")
     ], //Number of interactable items in the room
     false //Has Room been entered/Discovered?
   );
  var hallway06 =
  createRoomObject(
    "hallway06",//Room Name
    "hallway",//Room Type
    [//Room Descriptions
      createDescriptionObject(
        "first-entry",
        "You enter into the hallway and find that the emergency lighting has been damaged, leaving the hallway dark besides a single red dim light."
      ),
      createDescriptionObject(
        "second-entry",
        "You enter into the dim hallway once more."
      ),
    ],
     [],//Enemies Value
     [//Exits to current room
       createExitObject("armory", "north","you head north out of the dim hallway back into the armory.",false),
       createExitObject("computer lab", "west","",true)
     ],
     [//Items in the current room
       createAmmoObject("energy cells","This is an energy cell,it is used to reload weapons.","images/energycell.png", Math.floor((Math.random() * 10) + 1) ),
       createHealthObject("health kit","This is a health kit","images/healthkit.png", 50)
     ],
     [
        createBlockedPathObject("rubble","You approach the rubble and quickly see there is no way through it, you might be able to clear it with something?","use explosives on rubble","computer lab","You plant the explosives in the center of the rubble and duck into an alcove, the explosives detonate leaving the way clear","rubble01"),
     ], //Number of interactable items in the room
     false //Has Room been entered/Discovered?
   );
  var hallway07 =
  createRoomObject
  (
    "hallway07",//Room Name
    "hallway",//Room Type
    [//Room Descriptions
      createDescriptionObject(
        "first-entry",
        "You arrive at a junction and see multiple paths to take."
      ),
      createDescriptionObject(
        "second-entry",
        "You arrive at a junction and see multiple paths to take."
      ),
    ],
    [],//Enemies Value
    [//Exits to current room
      createExitObject("hallway14", "west","You countinue west further into the hallway",true),
      createExitObject("hallway09", "north","",true),
      createExitObject("hallway08", "east","You head east down the hallway",false),
      createExitObject("hallway05", "south","",true)
    ],
    [//Items in the current room
      createBlockedPathObject("door","You walk towards the door and see that the control panel has locked, you might be able to unlock it with something?","use hacking-tool on door","hallway09","Using your hacking-tool you succesfully hack into the door controls and open the door.","door03"),
      createBlockedPathObject("rubble","You approach the rubble and quickly see there is no way through it, you might be able to clear it with something?","use explosives on rubble","hallway05","You plant the explosives in the center of the rubble and duck into an alcove, the explosives detonate leaving the way clear","rubble02"),
      createInteractableObject("Sign-post","You examine the sign post and and see that the hanger bay is to the east end of the hall, the research lab is towards the north end of the hall,the armory is towards the south and the maintenance bay and mess hall are to the east.","no"),
      createInteractableObject("Powered Door","You examine the door and and see that it is blocking access to the hanger bay. It might open if the ship's power is restored.","no")
    ],
    [], //Number of interactable items in the room
    false //Has Room been entered/Discovered?
  );
  var hallway08 =
  createRoomObject
  (
    "hallway08",//Room Name
    "hallway",//Room Type
    [//Room Descriptions
      createDescriptionObject(
        "first-entry",
        ""
      ),
      createDescriptionObject(
        "second-entry",
        ""
      ),
    ],
    [], //Enemies Value
    [//Exits to current room
      createExitObject("maintenance bay", "north"," You head north out of the hallway into a room",false),
      createExitObject("mess hall", "east"," You head east down the hallway towards a room",false),
      createExitObject("hallway07", "west","You head west down the hallway towards a junction",false),
      createExitObject("hallway05","south","You crawl into the dark vent, and slowly move through it,and emerge into a long hallway.",true,)
    ],
    [//Items in the current room
      createHealthObject("health pack","This is a health pack","images/healthpack.png", 25)

    ],
    [
      createBlockedPathObject("vent","You try to open the vent and remove its screws but they don't budge, you might be able to cut it open with something?","use blowtorch on vent","hallway05","Using your blowtorch you succesfully burn through the vent supports, it falls to the floor leaving the dark vent open.","vent02"),
    ], //Number of interactable items in the room
    false //Has Room been entered/Discovered?
  );
  var hallway09 =
  createRoomObject
  (
    "hallway09",//Room Name
    "hallway",//Room Type
    [//Room Descriptions
      createDescriptionObject(
        "first-entry",
        ""
      ),
      createDescriptionObject(
        "second-entry",
        ""
      ),
    ],
    [], //Enemies Value
    [//Exits to current room
      createExitObject("research lab", "north","",true),
      createExitObject("hallway07", "south","",true),
      createExitObject("hallway10", "west","You countinue west down the hallway",false)
    ],
    [//Items in the current room
    ],
    [
      createBlockedPathObject("door","You walk towards the door and see that the control panel has locked, you might be able to unlock it with something?","use hacking-tool on door","hallway07","Using your hacking-tool you succesfully hack into the door controls and open the door.","door03"),
      createBlockedPathObject("rubble","You approach the rubble and quickly see there is no way through it, you might be able to clear it with something?","use explosives on rubble","research lab","You plant the explosives in the center of the rubble and duck into an alcove, the explosives detonate leaving the way clear","rubble03"),
    ], //Number of interactable items in the room
    false //Has Room been entered/Discovered?
  );
  var hallway10 =
  createRoomObject
  (
    "hallway10",//Room Name
    "hallway",//Room Type
    [//Room Descriptions
      createDescriptionObject(
        "first-entry",
        ""
      ),
      createDescriptionObject(
        "second-entry",
        ""
      ),
    ],
    [], //Enemies Value
    [//Exits to current room
      createExitObject("maintenance bay", "south","You crawl into the vent and make your way slowly through the tight space.",true),
      createExitObject("hallway13", "north","You crawl slowly though the vent, the light from the hallway infront of you illuminating your path.",true),
      createExitObject("hallway11","west","You countinue west down the hallway towards a junction.",false)
    ],
    [//Items in the current room
    ],
    [
      createBlockedPathObject("vent","You try to open the vent and remove its screws but they don't budge, you might be able to cut it open with something?","use blowtorch on vent","maintenance bay","Using your blowtorch you succesfully burn through the vent supports, it falls to the floor leaving the dark vent open.","vent03"),
      createBlockedPathObject("vent","You try to open the vent and remove its screws but they don't budge, you might be able to cut it open with something?","use blowtorch on vent","hallway13","Using your blowtorch you succesfully burn through the vent supports, it falls to the floor leaving the dark vent open.","vent04"),
    ], //Number of interactable items in the room
    false //Has Room been entered/Discovered?
  );
  var hallway11 =
  createRoomObject
  (
    "hallway11",//Room Name
    "hallway",//Room Type
    [//Room Descriptions
      createDescriptionObject(
        "first-entry",
        "You arrive at a junction and see multiple paths to take."
      ),
      createDescriptionObject(
        "second-entry",
        "You arrive at a junction and see multiple paths to take."
      ),
    ],
    [], //Enemies Value
    [//Exits to current room
      createExitObject("reactor room", "north","",true),
      createExitObject("storage unit 02", "west","",true),
      createExitObject("hallway10", "east", "you countinue east down the hallway.",false),
      createExitObject("hallway12", "south", "you countinue south down the hallway and see another junction",false)
    ],
    [//Items in the current room
    ],
    [
      createBlockedPathObject("door","You walk towards the door and see that the control panel has locked, you might be able to unlock it with something?","use hacking-tool on door","reactor room","Using your hacking-tool you succesfully hack into the door controls and open the door.","door04"),
      createBlockedPathObject("rubble","You approach the rubble and quickly see there is no way through it, you might be able to clear it with something?","use explosives on rubble","storage unit 02","You plant the explosives in the center of the rubble and duck into an alcove, the explosives detonate leaving the way clear","rubble04"),
    ], //Number of interactable items in the room
    false //Has Room been entered/Discovered?
  );
  var hallway12 =
  createRoomObject
  (
    "hallway12",//Room Name
    "hallway",//Room Type
    [//Room Descriptions
      createDescriptionObject(
        "first-entry",
        "Hallway12 first entry text placeholder"
      ),
      createDescriptionObject(
        "second-entry",
        "Hallway12 second entry text placeholder"
      ),
    ],
    [], //Enemies Value
    [//Exits to current room
      createExitObject("hallway11", "north","You head north up the hallway.",false),
      createExitObject("storage unit 02", "west","",true),
      createExitObject("mess hall", "south","You head south down the hallway and enter into a room.",false)
    ],
    [//Items in the current room

      createAmmoObject("energy cells","This is an energy cell,it is used to reload weapons.","images/energycell.png", Math.floor((Math.random() * 10) + 1) ),
    ],
    [
      createBlockedPathObject("door","You walk towards the door and see that the control panel has locked, you might be able to unlock it with something?","use hacking-tool on door","storage unit 02","Using your hacking-tool you succesfully hack into the door controls and open the door.","door05"),
      createInteractableObject("force-field","You examine the force field and see that beyond it part of the ship's hull as collaspsed leaving the other side of the hallway open to space","no"),
    ], //Number of interactable items in the room
    false //Has Room been entered/Discovered?
  );
  var hallway13 =
  createRoomObject
  (
    "hallway13",//Room Name
    "hallway",//Room Type
    [//Room Descriptions
      createDescriptionObject(
        "first-entry",
        "You enter into the hallway and find it covered in metal scrap and debris"
      ),
      createDescriptionObject(
        "second-entry",
        "You enter into the hallway and find it covered in metal scrap and debris"
      ),
    ],
     [], //Enemies Value
     [//Exits to current room
       createExitObject("research lab", "west","You head west down the hallway into the Research lab.",false),
       createExitObject("reactor room", "east","You head east down the hallway into the Reactor room.",false),
       createExitObject("hallway10", "south","You crawl slowly though the vent, and notice a hallway at the end of the vent.",true)
     ],
     [//Items in the current room
        createAmmoObject("energy cells","This is an energy cell,it is used to reload weapons.","images/energycell.png", Math.floor((Math.random() * 10) + 1)),
        createHealthObject("health kit","This is a health kit","images/healthkit.png", 50)
     ],
     [
       createBlockedPathObject("vent","You try to open the vent and remove its screws but they don't budge, you might be able to cut it open with something?","use blowtorch on vent","hallway10","Using your blowtorch you succesfully burn through the vent supports, it falls to the floor leaving the dark vent open.","vent04"),
     ], //Number of interactable items in the room
     false //Has Room been entered/Discovered?
   );
  var hallway14=
  createRoomObject
  (
    "hallway14",//Room Name
    "hallway",//Room Type
    [//Room Descriptions
      createDescriptionObject(
        "first-entry",
        "You enter into the hallway though the now powered door and see a sign for the hanger bay."
      ),
      createDescriptionObject(
        "second-entry",
        "You enter into the hallway though the now powered door and see a sign for the hanger bay."
      ),
    ],
     [], //Enemies Value
     [//Exits to current room
       createExitObject("hanger bay", "west","You head west into the hanger bay.", false),
       createExitObject("hallway07", "east","You head east back into the hallway.", false),
     ],
     [//Items in the current room
        createAmmoObject("energy cells","This is an energy cell,it is used to reload weapons.","images/energycell.png", Math.floor((Math.random() * 10) + 1) ),
        createHealthObject("health kit","This is a health kit","images/healthkit.png", 50),
        createHealthObject("health pack","This is a health pack","images/healthpack.png", 50)
     ],
     [], //Number of interactable items in the room
     false //Has Room been entered/Discovered?
   );
/*
  //vent instanciation
  var vent01=createRoomObject
  (
    "vent01",//Room Name
    "vent",//Room Type
    [//Room Descriptions
      createDescriptionObject(
        "first-entry",
        "The vent is dark and narrow with very little room to move about in."
      ),
      createDescriptionObject(
        "second-entry",
        "The vent is dark and narrow with very little room to move about in."
      ),
    ],
     [], //Enemies Value
     [//Exits to current room
       createExitObject("hallway04", "east","You crawl east out of the vent and emerge in a hallway.",false),
       createExitObject("hallway01", "west","You crawl west out of the vent and emerge in a hallway.",false),
     ],
     [//Items in the current room

     ],
     [], //Number of interactable items in the room
     false //Has Room been entered/Discovered?
   );
  var vent02 = createRoomObject
  (
    "vent02",//Room Name
    "vent",//Room Type
    [//Room Descriptions
      createDescriptionObject(
        "first-entry",
        "vent02 first-entry placeholder "
      ),
      createDescriptionObject(
        "second-entry",
        "vent02 second-entry placeholder"
      ),
    ],
     [], //Enemies Value
     [//Exits to current room
       createExitObject("hallway05", "south","You crawl south out of the vent and emerge in a hallway.",false),
       createExitObject("hallway08", "north","You crawl north out of the vent and emerge in a hallway.",false),
     ],
     [//Items in the current room

     ],
     [], //Number of interactable items in the room
     false //Has Room been entered/Discovered?
   );
  var vent03 = createRoomObject
  (
    "vent03",//Room Name
    "vent",//Room Type
    [//Room Descriptions
      createDescriptionObject(
        "first-entry",
        "As you crawl forward into the vent, you hear it creak as you slowly crawl through it, lets hope nothing hears that. "
      ),
      createDescriptionObject(
        "second-entry",
        "You crawl once more through the vent greeted once more by the creaking metal."
      ),
    ],
     [], //Enemies Value
     [//Exits to current room
       createExitObject("maintenance bay", "east","You crawl east out of the vent and emerge in the maintance bay.",false),
       createExitObject("hallway10", "north","You crawl north out of the vent and emerge in a hallway.",false),
     ],
     [//Items in the current room

     ],
     [], //Number of interactable items in the room
     false //Has Room been entered/Discovered?
   );
  var vent04 = createRoomObject
  (
    "vent04",//Room Name
    "vent",//Room Type
    [//Room Descriptions
      createDescriptionObject(
        "first-entry",
        "You crawl slowly though the vent you see the light from the hallway infront of you illuminating your path."
      ),
      createDescriptionObject(
        "second-entry",
        "You enter the dimly lit vent once more, hearing nothing but the quiet thud of your movement agaisnt the metal"
      ),
    ],
     [], //Enemies Value
     [//Exits to current room
       createExitObject("hallway13", "north","You crawl north out of the vent and emerge in a hallway.",false),
       createExitObject("hallway10", "south","You crawl south out of the vent and emerge in a hallway.",false),
     ],
     [//Items in the current room

     ],
     [], //Number of interactable items in the room
     false //Has Room been entered/Discovered?
   );
  var vent05 =  createRoomObject
  (
    "vent05",//Room Name
    "vent",//Room Type
    [//Room Descriptions
      createDescriptionObject(
        "first-entry",
        "crawling forward into the vent, you hear a distant low hum."
      ),
      createDescriptionObject(
        "second-entry",
        "crawling forward into the vent, you hear a distant low hum"
      ),
    ],
     [], //Enemies Value
     [//Exits to current room
       createExitObject("reactor room", "east","You crawl east out of the vent and emerge in the ruined reactor room.",false),
       createExitObject("storage unit 02", "south","You crawl south out of the vent and emerge in a large room.",false),
     ],
     [//Items in the current room

     ],
     [], //Number of interactable items in the room
     false //Has Room been entered/Discovered?
   );
*/

  rooms.push(quarters);
  rooms.push(computerLab);
  rooms.push(armory);
  rooms.push(storageUnit1);
  rooms.push(storageUnit2);
  rooms.push(messHall);
  rooms.push(kitchen);
  rooms.push(maintenanceBay);
  rooms.push(hangerBay);
  rooms.push(reactorRoom);
  rooms.push(researchLab);
  rooms.push(hallway01);
  rooms.push(hallway02);
  rooms.push(hallway03);
  rooms.push(hallway04);
  rooms.push(hallway05);
  rooms.push(hallway06);
  rooms.push(hallway07);
  rooms.push(hallway08);
  rooms.push(hallway09);
  rooms.push(hallway10);
  rooms.push(hallway11);
  rooms.push(hallway12);
  rooms.push(hallway13);
  rooms.push(hallway14);
/*  rooms.push(vent01);
  rooms.push(vent02);
  rooms.push(vent03);
  rooms.push(vent04);
  rooms.push(vent05);
  */

}

function getRoomTextDesc(currentRoom,entry)
{
  var roomDesc="";
  var textDescs= currentRoom.roomDescriptions;
  for (let i = 0; i < textDescs.length; i++) {
    if(textDescs[i].action === entry )
    {
      roomDesc=(textDescs[i].text);
    }
  }
  return roomDesc;
}

function displayAllEnemies()
{
  if(player.currentRoom.enemies.length > 0)
  {
    player.currentRoom.enemies.forEach((item, i) => {
      document.getElementById("text-display").innerHTML += "</br>>" +item.enemyType;
    });

  }
}

function outputCurrentRoomDesc()
{
  if(player.currentRoom.roomDiscovered==false)
  {
    roomDesc= getRoomTextDesc(player.currentRoom,"first-entry");
    player.currentRoom.roomDiscovered=true;
  }
  else
  {
    roomDesc= getRoomTextDesc(player.currentRoom,"second-entry");
  }
  document.getElementById("text-display").innerHTML += "</br>>" +roomDesc;
  randomPlaceHolderText();
}

function outputCurrentRoomExits()
{
//  document.getElementById("text-display").innerHTML += player.currentRoom.roomDescription;
   //var currentRoom=player.currentRoom.roomName;
   if(player.currentRoom.type=="hallway"){
     document.getElementById("text-display").innerHTML += "</br>>" + "You look around the hallway, ";
   }
   else{
    document.getElementById("text-display").innerHTML += "</br>>" + "You look around the " + player.currentRoom.roomName+",";
   }
   player.currentRoom.exits.forEach((item, i)=> {
   if(player.currentRoom.type=="hallway")
   {
     document.getElementById("text-display").innerHTML += "</br>>" + "there is a pathway to the " + item.orientation;
   }
   else
   {
     document.getElementById("text-display").innerHTML += "</br>>" + "there is a doorway to the " + item.orientation;
   }
  });
  ;
}

function commandInput()
{
  var rawInput = document.getElementById("gameInput").value.trim();
  var gameInputText = rawInput.toLowerCase();
  document.getElementById("gameInput").value = "";
  if(/^ *$/.test(gameInputText))
  {
    document.getElementById("text-display").innerHTML += "</br><span id='userText'>" +">Doing nothing is not an option"+"</span>";
  }
  else
  {
    processCommands(gameInputText);
  }
  var elem = document.getElementById('text-display');
  elem.scrollTop = elem.scrollHeight;
}

function processCommands(input)
{
  var words = input.split(" ");
  var currentRoom=player.currentRoom.roomName;
  if(words.includes("go") == true)
  {
    document.getElementById("text-display").innerHTML += "</br><span id='userTextRight'>>" +input+"</span>";
    move(words);
  }
  else if (words.includes("search") == true)
  {
    document.getElementById("text-display").innerHTML += "</br><span id='userTextRight'>>" +input+"</span>";
    search(player.currentRoom);
  }
  else if (words.includes("examine") == true)//|| words.includes("inspect") == true
  {
    document.getElementById("text-display").innerHTML += "</br><span id='userTextRight'>>" +input+"</span>";
    words.splice(0,1);
    var examinedItem = words.toString().replace(/,/g," ");
    examineInteractables(player.currentRoom.interactables.length,examinedItem);
  }
  else if (words.includes("look") == true)
  {
      document.getElementById("text-display").innerHTML += "</br><span id='userTextRight'>>" +input+"</span>";
      outputCurrentRoomExits();
  }
    else if (words.includes("hint") == true)
  {
    document.getElementById("text-display").innerHTML += "</br><span id='userTextRight'>>" +input+"</span>";
    giveHint();

  }
  else if(words[0] == ("pick") && words[1] == ("up"))
  {
    document.getElementById("text-display").innerHTML += "</br><span id='userTextRight'>>" +input+"</span>";
    words.splice(0,2);
    var pickedUpItem = words.toString().replace(/,/g," ");
    pickUpItems(player.currentRoom,pickedUpItem,false);
  }
  else if(words[0] == ("use"))
  {
    document.getElementById("text-display").innerHTML += "</br><span id='userTextRight'>>" +input+"</span>";
    var itemBeingUsed = words.toString().replace(/,/g," ");
    useItem(itemBeingUsed);
  }
  else if(words[0] == ("take"))
  {
    document.getElementById("text-display").innerHTML += "</br><span id='userTextRight'>>" +input+"</span>";
    words.splice(0,1);
    var pickedUpItem = words.toString().replace(/,/g," ");

    pickUpItems(player.currentRoom,pickedUpItem,false);
  }

  else if(customCommandInput(words.toString().replace(/,/g," "))!=null){
    document.getElementById("text-display").innerHTML += "</br><span id='userTextRight'>>" +input+"</span>";
    processCustomCommand(customCommandInput(words.toString().replace(/,/g," ")));
  }

  else
  {
    document.getElementById("text-display").innerHTML += "</br><span id='userTextWrong'>>I don't know this command: '" +input+"'</span>";
  }
}

function removeItem()
{

}

function reload()
{

}

function giveHint()
{

}

function processCustomCommand(interactable)
{
  //insert data card typed
   document.getElementById("text-display").innerHTML += "<br>> interactableName:" + interactable.interactableName;
  if(interactable.interactableName==="console")
  {
    if(checkInventory("data card") && player.currentRoom.roomName === "reactor room")
    {
      removeItem();
      document.getElementById("text-display").innerHTML += "</br>>" + interactable.descriptionUnlocked;
      player.currentRoom.interactables.push(createInteractableObject("Alert","You inspect the console alert it reads: 'SHIP POWER LOSSES DETECTED: RESET POWER GENERATORS BETA, GAMMA, DELTA, AND PULL MASTER SWITCH'","no"));
      player.currentRoom.interactables.push(createLeverObject("DELTA Lever","You inspect the lever, pulling it should restart the generator.","pull delta lever",false, "You pull the lever, and the generator begins to slowly rumble."));
      player.currentRoom.interactables.push(createLeverObject("BETA Lever","You inspect the lever, pulling it should restart the generator.","pull beta lever",false, "You pull the lever, and the generator begins to slowly rumble."));
      player.currentRoom.interactables.push(createLeverObject("GAMMA Lever","You inspect the lever, pulling it should restart the generator. ","pull gamma lever",false, "You pull the lever, and the generator begins to slowly rumble."));
      player.currentRoom.interactables.push(createLeverObject("Master Switch", "You Inspect the switch, pulling it should reset the ship's power once all the levers have been pulled.","pull master switch",false,"You pull the master switch and hear the hum of the ship as it's systems come back online. Hopefully the hanger bay door is open now."));
    }
  }
  else if(interactable.interactableName === "DELTA Lever" )
  {
    if( player.currentRoom.roomName === "reactor room")
    {
       interactable.pulledState=true;
       document.getElementById("text-display").innerHTML += "<br>>" + interactable.pulledDescription;
    }
  }
  else if(interactable.interactableName === "BETA Lever" )
  {
    if( player.currentRoom.roomName === "reactor room")
    {
       interactable.pulledState=true;
       document.getElementById("text-display").innerHTML += "<br>>" + interactable.pulledDescription;
    }
  }
  else if(interactable.interactableName === "GAMMA Lever" )
  {
    if( player.currentRoom.roomName === "reactor room" )
    {
      interactable.pulledState=true;
      document.getElementById("text-display").innerHTML += "<br>>" + interactable.pulledDescription;
    }
  }
  else if(interactable.interactableName === "Master Switch" )
  {
    if( player.currentRoom.roomName === "reactor room" && checkLever(player.currentRoom) )
    {
      interactable.pulledState=true;
      document.getElementById("text-display").innerHTML += "<br>>" + interactable.pulledDescription;
      var blockedPath={exitRoomName:"hallway14"};
      clearExit(blockedPath,hallway07);

    }
  }
}
function checkLever(room)
{
  var check =0;
  for(var i = 0; i < room.interactables.length; i++)
    {
      if(room.interactables[i].pulledState == true)
      {
        check++;
      }
    }
  if(check == 3 ){
    return true;
  }
  else{
    return false;
  }
}

function clearExit(blockedPath,room)
{
      for(var j = 0; j < room.exits.length; j++)
      {
        if(room.exits[j].exitRoomName === blockedPath.exitRoomName)
        {
            room.exits[j].blocked=false;
        }
      }
}

function customCommandInput(words)
{
  var stop = false;
  var i = 0;
  do{
      document.getElementById("text-display").innerHTML+= "<br>> words:"+words;
      document.getElementById("text-display").innerHTML+= "<br>> custom command:"+player.currentRoom.interactables[i].customCommand;
      if(player.currentRoom.interactables[i].customCommand === words)
      {
        stop = true;
        document.getElementById("text-display").innerHTML+="MATCH";
        return player.currentRoom.interactables[i];
      }
      i++;
  }while(i < player.currentRoom.interactables.length);
  if(stop == false){
    //return null;
  }
}

function removeBlockage(blockedPath)
{
  document.getElementById("text-display").innerHTML += "<br>>"+ blockedPath.descriptionOpen ;
  for(var i = 0; i < rooms.length; i++)
  {
    for(var j = 0; j < rooms[i].interactables.length; j++)
    {
      if(rooms[i].interactables[j].id === blockedPath.id)
      {
         clearExit(rooms[i].interactables[j],rooms[i]);

         rooms[i].interactables.splice(j, 1);
      }
    }
  }
}

function checkInventory(item){
  for(var i=0; i<player.inventory.length;i++){
    document.getElementById("text-display").innerHTML+= "<br>> item:"+player.inventory[i].item.itemName;
    if(player.inventory[i].item.itemName === item){

      return true;
    }
  }
}

function useItem(words)
{
  //Health packs
  //Health Kits
  document.getElementById("text-display").innerHTML+="<br>>"+ words;
  if(words.includes("health-kit"))
  {
      if(checkInventory("health-kit"))
      {
      }
      else{
        document.getElementById("text-display").innerHTML += "</br><span id='userTextWrong'>>You don't have that item</span>";
      }
  }
  else if(words.includes("health-pack"))
  {
      if(checkInventory("health-pack"))
      {
      }
      else{
          document.getElementById("text-display").innerHTML += "</br><span id='userTextWrong'>>You don't have that item</span>";
      }
  }
  else if( words.includes("blowtorch") )
  {
    var match = false;
    if(checkInventory("blowtorch"))
    {
      player.currentRoom.interactables.forEach((interactable, i) =>
      {
        if(words === interactable.customCommand)
        {
            removeBlockage(interactable);
            match=true;
        }
      });
      if(match==false){
          document.getElementById("text-display").innerHTML += "</br><span id='userTextWrong'>>You can't use that item on that.</span>";
      }
    }
    else{
      document.getElementById("text-display").innerHTML += "</br><span id='userTextWrong'>>You don't have that item.</span>";
    }
  }
  else if(words.includes("explosive"))
  {
    var match = false;
    if(checkInventory("explosive"))
    {
      player.currentRoom.interactables.forEach((interactable, i) =>
      {
        if(words === interactable.customCommand)
        {

            removeBlockage(interactable);
            match=true;
        }
      });
      if(match==false){
          document.getElementById("text-display").innerHTML += "</br><span id='userTextWrong'>>You can't use that item on that.</span>";
      }
    }
    else{
      document.getElementById("text-display").innerHTML += "</br><span id='userTextWrong'>>You don't have that item.</span>";
    }
  }
  else if(words.includes("hacking-tool")  ){
    var match = false;
    if(checkInventory("hacking-tool"))
    {
      player.currentRoom.interactables.forEach((interactable, i) =>
      {
        if(words === interactable.customCommand)
        {

            removeBlockage(interactable);
            match=true;
        }
      });
      if(match==false){
          document.getElementById("text-display").innerHTML += "</br><span id='userTextWrong'>>You can't use that item on that.</span>";
      }
    }
    else{
      document.getElementById("text-display").innerHTML += "</br><span id='userTextWrong'>>You don't have that item.</span>";
    }
  }
  else
  {
    document.getElementById("text-display").innerHTML += "</br><span id='userTextWrong'>>I don't know that command</span>";
  }
}

function examineInteractables(roomInteractables, words)
{
  if(roomInteractables >= 1)
  {
    player.currentRoom.interactables.forEach((interactable, i) =>
    {
      if(words === interactable.interactableName)
      {
        document.getElementById("text-display").innerHTML += "</br><span>>"+interactable.description+"</span>";
      }
    });
  }
  else
  {
    document.getElementById("text-display").innerHTML += "</br><span>>There is nothing to interact with in this room</span>";
  }
}

function pickUpItems(playerRoom,words,dragged)
{
      playerRoom.roomItems.forEach((item, i) => {

      if(item.item.itemName.includes(words) && item.item.itemSearched==true && (item.item.itemType=="Gadget" || item.item.itemType=="Weapon"||item.item.itemType=="Ammo"||item.item.itemType=="Health"||item.item.itemType=="Puzzle"||item.item.itemType=="Data"))
      {
        player.inventory.push(item);
        playerRoom.roomItems.splice(i, 1);
        if(item.item.itemType === "Ammo")
        {
          document.getElementById("text-display").innerHTML += "</br><span id='userTextRight'>>"+ item.amount +" "+ item.item.itemName +" added to inventory"+"</span>";
          pickUpAmmoSound.play();

        }
        else if(item.item.itemType!="Ammo")
        {
          document.getElementById("text-display").innerHTML += "</br><span id='userTextRight'>>" +item.item.itemName +" added to inventory"+"</span>";
          pickUpItemSound.play();
        }
        if(!dragged)
        {
          addItemToInventory(item.item);
          pickUpItemSound.play();
        }

      }
      /*if(words.includes(item.item.itemName) && item.item.itemSearched==true && (item.item.itemType=="Interact"))
      {
        document.getElementById("text-display").innerHTML += "</br><span id='userTextWrong'>>" +"You cannot pick up the "+item.item.itemName +"</span>";
        document.getElementById("text-display").innerHTML += "</br><span id='userTextWrong'>>" +"Try examining it instead!" +"</span>";
      }*/

    });
}
function search(playerRoom)
{
  if(playerRoom.roomItems.length >=1)
  {
    playerRoom.roomItems.forEach((item, i) => {
        if(item.item.itemType == "Gadget" ){
          document.getElementById("text-display").innerHTML += "</br><span id='userTextGadget'>>You notice a '" +item.item.itemName+"'</span>";
        }
        else if(item.item.itemType == "Weapon" ){
          document.getElementById("text-display").innerHTML += "</br><span id='userTextWeapon'>>You notice a '" +item.item.itemName+"'</span>";
        }
        else if(item.item.itemType == "Ammo" ){
          document.getElementById("text-display").innerHTML += "</br><span id='userTextWeapon'>>You notice some '" +item.item.itemName+"'</span>";
        }
        else if(item.item.itemType == "Health" )
        {
          document.getElementById("text-display").innerHTML += "</br><span id='userTextHealth'>>You notice a '" +item.item.itemName+"'</span>";
        }
        else if(item.item.itemType =="Datapad"){
            document.getElementById("text-display").innerHTML += "</br><span id='userTextDatapad'>>You notice a '" +item.item.itemName+"'</span>";
        }
        else if(item.item.itemType =="Puzzle"){
            document.getElementById("text-display").innerHTML += "</br><span id='userTextPuzzle'>>You notice a '" +item.item.itemName+"'</span>";
        }
        item.item.itemSearched = true;
      });

      vicinity(playerRoom);
  }
  else
  {
    document.getElementById( "text-display" ).innerHTML += "</br><span>>There are no items in this room</span>";
  }
  if(playerRoom.interactables.length >= 1)
  {
    playerRoom.interactables.forEach((item, i) => {
      document.getElementById("text-display").innerHTML += "</br><span id='userTextInteractable'>>You notice a '" +item.interactableName+"'</span>";
    });
  }
  else
  {
    {
      document.getElementById("text-display").innerHTML += "</br><span>>There is nothing interesting to look at</span>";
    }
  }
  displayAllEnemies();
}

function getDetailsOfItem(imgPath){
  var found = false;
  player.currentRoom.roomItems.forEach((item, i) => {
      if(imgPath.includes(item.item.itemFilePath)){
        document.getElementById('hoverInfo').innerHTML = item.item.itemDescription;
        found = true;
      }
    });
    return found;
}

function vicinity(playerRoom)
{
  //get the correct table using a query
  var elements = document.querySelectorAll("#other1 td");
  var tableIndex = 0;

  playerRoom.roomItems.forEach((item, i) => {
    if(item.item.itemSearched == true)
    {
      //add inventory item to vicinity
      var name = item.item.itemName + "_img";
      elements[tableIndex].innerHTML = "<img src="+ item.item.itemFilePath +" alt=" + item.item.itemName + " class='inventoryItem' draggable='true' ondragstart='drag(event)' onmouseover='displayInfo(this)' onmouseleave='hideInfo(this)' id="+ name+">";
      tableIndex++;
    }
    else{
    }
  });
  clearVicinity(tableIndex);
}

function clearVicinity(startIndex){
  var elements = document.querySelectorAll("#other1 td");
  //clear all other inventory items
  for (var i = startIndex; i < 4; i++) {
    elements[i].innerHTML = '';
  }
}

function move(words)
{
  var direction = "";
  var checkDirection = 0;
  if(words.includes("north") == true)
  {
    direction += "north";
    checkDirection++;
  }
  if (words.includes("east") == true)
  {
    direction += "east";
    checkDirection++;
  }
  if (words.includes("south") == true)
  {
    direction += "south";
    checkDirection++;
  }
  if (words.includes("west") == true)
  {
    direction += "west";
    checkDirection++;
  }
  if(checkDirection===1)
  {
    goDirection(direction);
  }
  else if(checkDirection > 1)
  {
    document.getElementById("text-display").innerHTML+= "</br>>You can't go in multiple directions...";
  }
  else if(checkDirection === 0)
  {
    document.getElementById("text-display").innerHTML+= "</br>>I guess you're staying here then...</br>";
  }
}

function goDirection(direction)
{
  var exitExistsFlag = 0;
  var openOrientations = "";

  player.currentRoom.exits.forEach((item, i) => {
    openOrientations += item.orientation;
    openOrientations  += " ";
  });
  var possibleExits = openOrientations.split(" ");

  possibleExits.forEach((orientationAvailable, i) => {
    if(direction===orientationAvailable)
    {
      exitExistsFlag++;
    }
  });

  var newCurrent = (0,0,0,0,0,0,0,0,0);
  if(exitExistsFlag === 1)
  {
      player.currentRoom.exits.forEach((roomExit, i) => {
          if(roomExit.orientation === direction && roomExit.blocked === false)
          {

            newCurrent = returnNewRoom(roomExit.exitRoomName);
            document.getElementById("text-display").innerHTML +="</br>>"+ roomExit.description;
            player.currentRoom = newCurrent;
            if(player.currentRoom.roomDiscovered==true)
            {
            //  document.getElementById("text-display").innerHTML+= "</br>>" +player.currentRoom.roomDescription;
              vicinity(player.currentRoom);
            }
            else
            {
              clearVicinity(0);
            //  document.getElementById("text-display").innerHTML+= "</br>>" +player.currentRoom.roomDescription;
            }
            outputCurrentRoomDesc();
            document.getElementById("currentRoomDisplay").innerHTML ="Current Room: "+ player.currentRoom.roomName;
          }
          //CHANGE
          if(roomExit.orientation === direction && roomExit.blocked===true){
              if(roomExit.exitRoomName.includes("vent")){
                  document.getElementById("text-display").innerHTML +="</br><span id='userTextWrong'>>"+ "You cannot go that way it is blocked by a vent.";
              }
              if(roomExit.exitRoomName.includes("rubble")){
                  document.getElementById("text-display").innerHTML +="</br><span id='userTextWrong'>>"+ "You cannot go that way it is blocked by rubble and debris.";
              }
              if(roomExit.exitRoomName.includes("door")){
                  document.getElementById("text-display").innerHTML +="</br><span id='userTextWrong'>>"+ "You cannot go that way it is blocked by a locked door.";
              }
          }
      });
  }
  else
  {
    document.getElementById("text-display").innerHTML+= "</br>>There is nowhere in that direction..";
  }
}
function returnNewRoom(roomExit)
{
  var newRoom =  createRoomObject(0,0,0,0,0,0,0);
  rooms.forEach((existingRoom, i) => {
    if(roomExit == existingRoom.roomName)
      newRoom = existingRoom;
  });
  return newRoom;
}

function charHealth()
{
  var className = document.getElementById("charClass");
  if (className == "Hacker")
  {
    return 100;
  }
  else if (classHealth == "Engineer")
  {
    return 100;
  }
  else
  {
    return 120;
  }
}

function charStart()
{
  if (document.getElementById("Hacker").checked)
  {
    return document.getElementById("Hacker").value;
  }
  else if (document.getElementById("Engineer").checked)
  {
    return document.getElementById("Engineer").value;
  }
  else if (document.getElementById("SpaceCowboy").value)
  {
    return document.getElementById("SpaceCowboy").value;
  }
}

function addItemToInventory(item){

    var elements = document.querySelectorAll("#inventory td");

    for (var i = 0; i < elements.length; i++) {
      if(elements[i].innerHTML == ''){
        elements[i].innerHTML += "<img src="+ item.itemFilePath +" alt=" + item.itemDescription + " class='inventoryItem'>";
        break;
      }
    }

    vicinity(player.currentRoom);
}

function nameOutput()
{
  var nameInput = document.getElementById("name").value;
  var classSelect = charStart();
  alert(nameInput + " " + classSelect);
}

function changeTextDescription()
{
  var desc = "";
  if(charStart() == "Hacker")
  {
    desc = "Tasked with maintaining the ship’s computer systems, he knows his tech like the back of his hand and will use it to keep himself up and running from whatever is out there.";
  }
  else if(charStart() == "Engineer")
  {
    desc = "Armed with his blowtorch, he uses his knowhow to hold the ship together, and with his smarts, he can take on anything in his path.";
  }
  else if(charStart() =="SpaceCowboy")
  {
    desc = "Travelling through space is a risky business to most, but unlike the rest, he can outshoot bandits, criminals and things that go bump in the night before they have the chance to blink.";
  }
  document.getElementById("CharacterDesc").innerHTML = desc;
}

function randomNumber(range)
{
  return Math.round(Math.random() * range) + 1;
}

function randomPlaceHolderText()
{
  var number = randomNumber(5);

  if (number === 1)
  {
    document.getElementById("gameInput").placeholder = "Enter your action";
  }
  else if (number === 2)
  {
    document.getElementById("gameInput").placeholder = "Do your worst";
  }
  else if (number === 3)
  {
    document.getElementById("gameInput").placeholder = "What is happening";
  }
  else if (number === 4)
  {
    document.getElementById("gameInput").placeholder = "Enemies = bad";
  }
  else if (number === 5)
  {
    document.getElementById("gameInput").placeholderr = "Did you pick it up?";
  }
}

function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
}
