
var enemyMaxHealth = 0;
var currentCombat = "Weapon Attack";
var healHP = 0;
var hitchance;
var maxDamage;
var maxDamageRecieved;
var weaponDisabled = false;
var activeEnemyObj;
var inCombat = false;

function combatSetupV2(){
  //hide container
  document.getElementById('mapMain').classList.add('hideMe');
  document.getElementById('combatMain').classList.remove('hideMe');
  document.getElementById('userInput').classList.add('disabledbutton');
  document.getElementById('other1').classList.add('disabledbutton');
  //get the enemy object
  activeEnemyObj = window.player.currentRoom.enemies[0];
  enemyMaxHealth = activeEnemyObj.health;
  document.getElementById('EnemyName').innerHTML = activeEnemyObj.enemyType;

  currentCombat = 'Weapon';
  inCombat = true;
  healHP = 0;

  checkEquippedWeaponStatus();
  getHitboxes();
  //calculate basic stats
  calculateInfo();
  updateHP();
  updateCombatType();
  document.getElementById('healMethod').innerHTML = 'None, please select one first';
}

function updateHP(){
  //calcuate the new width based on health
  document.getElementById('healthBar').style.width =  window.player.health  + '%';
  document.getElementById('EnemyHB').style.width =  Math.floor((activeEnemyObj.health/enemyMaxHealth)*100) + '%';
  //update HP values
  document.getElementById('EnemyHealthValue').innerHTML = Math.floor((activeEnemyObj.health/enemyMaxHealth)*100) + '%' + ' ['+activeEnemyObj.health+'HP/'+enemyMaxHealth+'HP]';
  document.getElementById('healthStat').innerHTML = "Health: " + window.player.health + '%';
}

function checkEquippedWeaponStatus(){
  if(window.player.equippedWeapon.item.itemName == "fist"){
    document.getElementById('Attack1').disabled = true;
    document.getElementById("Attack2").checked = true;
    currentCombat = 'Melee';
  }
  else{
    document.getElementById('Attack1').disabled = false;
    document.getElementById("Attack1").checked = true;
    currentCombat = 'Weapon';
  }
}

function updateAmmo(){
  var ammo = window.player.equippedWeapon.ammo -= 1;
  var magSize = window.player.equippedWeapon.magSize;
  document.getElementById('currentWeaponMag').innerHTML = ammo + '/' + magSize;
}

function equipWeaponDrop(ev){
  var data = ev.dataTransfer.getData("text");
  var nodeCopy = document.getElementById(data).cloneNode(true);
  nodeCopy.id = data+'active'; /* We cannot use the same ID */
  if(event.target.tagName.toUpperCase() != "TD")//if the target isnt empty
  {
    var itemName = nodeCopy.id.split('_');
    for(var i=0; i<player.inventory.length;i++){
      //check that the item is a weapon
      if(player.inventory[i].item.itemType === "Weapon" && player.inventory[i].item.itemName == itemName[0]){
        window.equipWeapon(itemName[0]);
        break;
      }
    }

  }
  ev.preventDefault();
}


function updateCombatType(){
  //combat type change
  var combatOptions = document.getElementsByName('attacks');
  for (var i = 0, length = combatOptions.length; i < length; i++) {
    if (combatOptions[i].checked) {
      currentCombat = combatOptions[i].value;
      break;
    }
  }

  //display the current combat type
  document.getElementById('currentCombat').innerHTML =currentCombat;
  calculateInfo();
}

function healType(type){
  switch (type) {
    case 0:
      healHP = 25;
      document.getElementById('healMethod').innerHTML = 'health pack';
      break;
    case 1:
      healHP = 50;
      document.getElementById('healMethod').innerHTML = 'health kit';
      break;
  }

  document.getElementById('HealthGainedValue').innerHTML = healHP + "HP";
}

function calculateInfo(){
  var damageGiven = false;//damage can be given
  switch (currentCombat) {
    case "Weapon":
      hitchance = 0;
      maxDamage = window.player.equippedWeapon.damage;
      maxDamageRecieved = activeEnemyObj.damagePerAttack;
      damageGiven = true;
      break;
    case "Melee":
      hitchance = 0;
      maxDamage = 4;
      maxDamageRecieved = activeEnemyObj.damagePerAttack + 2;
      damageGiven = true;
      break;
    case "Heal":
      maxDamageRecieved = activeEnemyObj.damagePerAttack + 3;
      hitchance = 0;
      maxDamage = 0;
      document.getElementById('healContainer').classList.remove('hideMe');
      break;
    case "Escape":
      maxDamageRecieved = activeEnemyObj.damagePerAttack + 5;
      maxDamage = 0;
      break;
  }
  //if damage can be given to the enemy from the selected attack
  if(damageGiven){
    document.getElementById('Currenthitchance').classList.remove('hideMe');
    //document.getElementById('hitchanceValue').innerHTML = hitchance + "%";
    document.getElementById('MaxDamageValue').innerHTML = maxDamage + "HP";
    document.getElementById('CurrentDamageGiven').classList.remove('hideMe');
    document.getElementById('hitboxesContainer').classList.remove('hideMe');
    document.getElementById('hitchanceValue').innerHTML = hitchance + "%";
    document.getElementById('attackContainer').classList.remove('hideMe');
  }
  else{
    //damage cant be given
    document.getElementById('hitboxesContainer').classList.add('hideMe');
    document.getElementById('attackContainer').classList.add('hideMe');
  }

  if(currentCombat != "Heal"){
      document.getElementById('healContainer').classList.add('hideMe');
  }
  document.getElementById('MaxDamageRecievedValue').innerHTML = maxDamageRecieved + "HP";
  updateHitbox();
}

function getHitboxes(){
  var enemyHitboxArray = activeEnemyObj.bodyParts;
  var hitboxes = document.getElementById('hitboxes')
  hitboxes.options.length = 0;
  for (var i = 0; i < enemyHitboxArray.length; i++) {
    var opt = document.createElement("option"); // Create the new element
    opt.value = enemyHitboxArray[i].partName; // set the value
    opt.text = enemyHitboxArray[i].partName + " | +" + enemyHitboxArray[i].percentageToHit + "% hitchance | +" + enemyHitboxArray[i].baseDamagePerHit + " max damage"; // set the text
    hitboxes.appendChild(opt); // add it to the select
  }
}

function updateHitbox(){
  var selectedHitbox = document.getElementById("hitboxes").selectedIndex;
  var hitchanceChange = activeEnemyObj.bodyParts[selectedHitbox].percentageToHit;
  var maxDmgChange = activeEnemyObj.bodyParts[selectedHitbox].baseDamagePerHit;

  if(hitchanceChange >= 0){
      document.getElementById('hitchanceValue').innerHTML = hitchanceChange +"%";
      //document.getElementById('hitchanceValue').style.color = "lime";
  }
  else{
    document.getElementById('addHitchance').innerHTML = hitchanceChange +"%";
    document.getElementById('addHitchance').style.color = "red";
  }

  document.getElementById('addMaxDamage').innerHTML = '+' + maxDmgChange + "HP";

  hitchance+=hitchanceChange;
  maxDamage+=maxDmgChange;
}

function leaveCombat(){
  document.getElementById('mapMain').classList.remove('hideMe');
  document.getElementById('combatMain').classList.add('hideMe');
  document.getElementById('userInput').classList.remove('disabledbutton');
  document.getElementById('other1').classList.remove('disabledbutton');
  inCombat = false;
}

//combat start button press
function nextRound(){
  //show combat hide overview
  document.getElementById('turnOptions').classList.remove('hideMe');
  document.getElementById('turnOverview').classList.add('hideMe');

}

function exectuteCombat(){

  document.getElementById('combatError').classList.add('hideMe');
  document.getElementById('combatError').classList.remove('hideMe');
  if(currentCombat == "Heal" && healHP == 0){
    document.getElementById('combatError').innerHTML = 'No heal method selected!';
  }
  else if(currentCombat == "Heal" && window.player.health >=100){
    document.getElementById('combatError').innerHTML = 'Already full health!';
  }
  else if(currentCombat == "Weapon" && window.player.equippedWeapon.ammo<=0){
    document.getElementById('combatError').innerHTML = 'No ammo in the mag try reloading!';
  }
  else{
    document.getElementById('combatError').classList.add('hideMe');
    var damageRecieved;
    var damageDealt;

    //calculate damage dealt
    if(Math.floor(Math.random()*100) <= hitchance && currentCombat != "Heal" && currentCombat != "Escape"){//hit the enemy
      damageDealt = Math.floor(Math.random()*maxDamage);
    }
    else{//missed the enemy
      damageDealt = 0;
    }

    //calculate damage recieved
    if(Math.floor(Math.random()*100) <= 60){
      damageRecieved = Math.floor(Math.random()*maxDamageRecieved);
    }
    else{//enemy missed
      damageRecieved = 0;
    }

    if(currentCombat == "Weapon"){
      updateAmmo();
    }
    else if(currentCombat == "Heal"){
      removeItem(document.getElementById('healMethod').innerHTML);
      if(window.player.health + healHP >= 100){
        window.player.health = 100;
      }
      else{
        window.player.health += healHP;
      }
    }

    window.player.health -= damageRecieved;
    activeEnemyObj.health -= damageDealt;
    updateHP();
     if(window.player.health<=0){
       //TODO you lose end game
     }
     else if(activeEnemyObj.health<=0){
       document.getElementById("text-display").innerHTML += "</br><span id='userTextRight'>>You manage to kill the enemy stone dead, making it look up to the great space eyes of the sky</span>";
       window.scrollBarAnchor();
       leaveCombat();
       //remove the enemy from the room once its dead
       player.currentRoom.enemies.splice(0,1);
       player.stats.enemiesDefeated++;
     }
     else if(currentCombat == "Escape"){
       if(damageRecieved >0){
         document.getElementById("text-display").innerHTML += "</br><span id='userTextRight'>>You manage to hide from the enemy but you have been hurt in the process!</span>";
         window.scrollBarAnchor();
       }
       else{
         document.getElementById("text-display").innerHTML += "</br><span id='userTextRight'>>You manage to hide from the enemy!</span>";
         window.scrollBarAnchor();
       }
       leaveCombat();
     }
     else{
      document.getElementById('TurndamageDealt').innerHTML = damageDealt;
      document.getElementById('TurndamageRecieved').innerHTML = damageRecieved;

      document.getElementById('TurnEnemyName').innerHTML = activeEnemyObj.enemyType;//placeholder
      document.getElementById('TurnEnemyName2').innerHTML = activeEnemyObj.enemyType;//placeholder

      document.getElementById('turnOptions').classList.add('hideMe');
      document.getElementById('turnOverview').classList.remove('hideMe');
    }
  }
}
