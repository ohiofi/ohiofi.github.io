---
  layout: post
  title: Baby Zombie Chicken Jockey Java Minecraft Mod
  date: 2022-06-24
  categories:
  - programming
  tags:
  - education
  - classes
  - object-oriented programming
  - Java
  - Minecraft
  - mod
  - chicken
---

You can spawn a random amount of chicken jockeys with the third Minecraft mod from "Absolute Beginner's Guide To Minecraft Mods Programming, second edition" by Rogers Cadenhead.

![Demo of the /zombiepig command](/assets/zombiepig.jpg)

## Challenges

#### 1. Can you create a "/zombiepig" command that generates pig-riding zombie-pigmen?

   In the onCommand method add an if-else statement for `if (label.equalsIgnoreCase("zombiepig"))` then call a new method named executeZombiePigCommand(sender). You can copy/paste the executeCommand method and just change the title to executeZombiePigCommand. Next, update the line that says `Chicken clucky = world.spawn(chickenSpot, Chicken.class);` so that it will spawn an instance of the Pig class and save it a variable type Pig (you can still use the variable name clucky if you want). Finally, update the line that says `Zombie rob = world.spawn(chickenSpot, Zombie.class);` so that it spawns an instance of the PigZombie class and saves it in a variable type PigZombie.

#### 2. Can you create a "/villagersheep" command that generates random-color sheep with villager jockeys?

    In the onCommand method add an if-else statement for `if (label.equalsIgnoreCase("villagersheep"))` then call a new method named executeVillagerSheepCommand(sender). You can copy/paste the executeCommand method and just change the title to executeVillagerSheepCommand. First, make it spawn an instance of the Sheep class and save it a variable type Sheep (you can still use the variable name clucky if you want). Next, make it spawn an instance of the Villager class and saves it in a variable type Villager. Look at the Spigot API for the [Villager class](https://helpch.at/docs/1.7.10/org/bukkit/entity/Villager.html) and find the setBaby method. Notice that unlike the setBaby method for the Zombie class, this method does NOT require any arguments. Finally, look at the Spigot API for the [Sheep class](https://helpch.at/docs/1.7.10/org/bukkit/entity/Sheep.html) and the [DyeColor class](https://helpch.at/docs/1.7.10/org/bukkit/DyeColor.html) in order to create an array of type DyeColor that contains several colors, randomly select a DyeColor from the list, and set the sheep's wool color.

#### 3. Can you generate a "normal distribution" of chicken jockeys?

   A normal distribution (also known as a bell curve) will expect that median values are more likely and extreme values are less likely. Consider rolling two dice. You have about a 44% change of rolling a 6, 7, or 8, but you only have about a 3% chance of rolling a 12. We would simulate rolling two dice in Java like this `(int) (Math.random() * 6 + 1) + (int) (Math.random() * 6 + 1)` and we would get a bell curve of values ranging from 2 to 12. How can you change that code to generate a bell curve of values ranging from 8 to 16?


![Demo of the /villagersheep command](/assets/villagersheep.jpg)

## ZombieChicken Starter Code

Source: [https://javaminecraft.com/source/ZombieChicken/ZombieChicken.java](https://javaminecraft.com/source/ZombieChicken/ZombieChicken.java)

```
package com.javaminecraft;

import java.util.logging.Logger;
import org.bukkit.Location;
import org.bukkit.World;
import org.bukkit.command.Command;
import org.bukkit.command.CommandSender;
import org.bukkit.entity.Chicken;
import org.bukkit.entity.Player;
import org.bukkit.entity.Zombie;
import org.bukkit.plugin.java.JavaPlugin;
import org.bukkit.potion.PotionEffect;
import org.bukkit.potion.PotionEffectType;

public class ZombieChicken extends JavaPlugin {
    public static final Logger LOG = Logger.getLogger("Minecraft");

    @Override
    public boolean onCommand(CommandSender sender, Command command,
        String label, String[] arguments) {

        if (label.equalsIgnoreCase("zombiechicken")) {
            if (sender instanceof Player) {
                executeCommand(sender);
                return true;
            }            
        }
        return false;
    }

    public void executeCommand(CommandSender sender) {
        Player me = (Player) sender;
        Location spot = me.getLocation();
        World world = me.getWorld();

        // spawn 1-10 chicken-riding zombies
        int quantity = (int) (Math.random() * 10) + 1;
        for (int i = 0; i < quantity; i++) {
            // set chicken and zombie location
            Location chickenSpot = new Location(world,
                spot.getX() + (Math.random() * 15),
                spot.getY() + 5,
                spot.getZ() + (Math.random() * 15));
            // create the mobs
            Chicken clucky = world.spawn(chickenSpot, Chicken.class);
            Zombie rob = world.spawn(chickenSpot, Zombie.class);
            rob.setBaby(true);
            clucky.setPassenger(rob);
            // increase the chicken's speed
            int speed = (int) (Math.random() * 10);
            PotionEffect potion = new PotionEffect(
                PotionEffectType.SPEED,
                Integer.MAX_VALUE,
                speed);
            clucky.addPotionEffect(potion);
        }
        LOG.info("[ZombieChicken] Created " + quantity + " chicken-riding zombies");
    }
}
```
