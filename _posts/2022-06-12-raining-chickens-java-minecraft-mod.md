---
  layout: post
  title: Raining Chickens Java Minecraft Mod
  date: 2022-06-12
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

The second Minecraft mod from "Absolute Beginner's Guide To Minecraft Mods Programming, second edition" by Rogers Cadenhead will spawn a random number of chickens in the air above the player when they type the command "/chickenstorm"

This is a very popular mod that I've actually had students mention to me in the past. For example... "In our Intro To Programming class, we learned how to make Minecraft mods and we made it rain chickens."

![Demo of the FireStorm Minecraft mod](/assets/firestorm-collage.jpg)

## Challenges

#### 1. Can you spawn 20-30 chickens instead of 1-30 chickens?

   Edit line 39 of the starter code `for (int i = 0; i < Math.random() * NUM_CHICKENS + 1; i++) {` to something like `for (int i = 0; i < randomAmount; i++) {` then add a new line above in which you declare a variable named `randomAmount` and set its value to a random number 20-30. Here is how to generate a random range in Java... `(int) (Math.random() * (maximum - minimum) + minimum)` The key to understanding this is to know that Math.random() will give you a decimal value from 0.0 to 0.9999999999. If we multiply Math.random * 30 then we will get random decimal values from 0.0 to 29.9999999999, but that's not what we want. We should instead multiply by the number of possible values we want and there are 11 possible values from 20 to 30. Finally, add 20 to the random number.

#### 2. Can you generate a "normal distribution" of chickens?

   A normal distribution (also known as a bell curve) will essentially mean that median values are more likely and extreme values are less likely. Consider rolling two dice. You have about a 44% change of rolling a 6, 7, or 8, but you only have about a 3% chance of rolling a 12. We would simulate this dice roll in Java like this `(int) (Math.random() * 6 + 1) + (int) (Math.random() * 6 + 1)` and we would get a bell curve of values ranging from 2 to 12. How can you change that code to generate a bell curve of values ranging from 20 to 30?

#### 3. Can you create a "/firestorm" command that generates flaming chickens?

   In the onCommand method add an if-else statement for `if (label.equalsIgnoreCase("firestorm"))` then call a new method named executeFirestorm(sender). You can copy/paste the executeCommand method and just change the title to executeFirestorm. Next, remove the code that makes 40% of them babies. Instead we will set them on fire. Check the Spigot API for the [Chicken class](https://helpch.at/docs/1.7.10/org/bukkit/entity/Chicken.html) and look for one of the Entity methods that has "fire" in the method name. You should find 3 methods that have to do with fire, but only one of them is a setter method. Invoke the method on `clucky` and provide a large integer number (such as 999) as an argument.

#### 4. Can you make the flaming chickens launch fireballs when they are first spawned?

   If you completed the last challenge, then you probably created chickens that were on fire for about 4 seconds and then died. This just leaves feathers and roasted chicken all over the place. How can we make a REAL firestorm? First, check the Spigot API for the [Chicken class](https://helpch.at/docs/1.7.10/org/bukkit/entity/Chicken.html) and find how to increase the max health and set the health of `clucky`. You might also notice that the Chicken class implements the ProjectileSource interface. You can use `Fireball flamey = clucky.launchProjectile(Fireball.class);` to generate a Fireball projectile. Finally, check the Spigot API for the [Fireball class](https://helpch.at/docs/1.7.10/org/bukkit/entity/Fireball.html) and find out how to set the direction of `flamey`. You will need to provide a Vector object as an argument, such as `new Vector(0, -1, 0)`




## ChickenStorm Starter Code

Source: [https://javaminecraft.com/source/ChickenStorm/ChickenStorm.java](https://javaminecraft.com/source/ChickenStorm/ChickenStorm.java)

```
package com.javaminecraft;

import java.util.logging.Logger;
import org.bukkit.Location;
import org.bukkit.Material;
import org.bukkit.World;
import org.bukkit.command.Command;
import org.bukkit.command.CommandSender;
import org.bukkit.entity.Chicken;
import org.bukkit.entity.Player;
import org.bukkit.plugin.java.JavaPlugin;

public class ChickenStorm extends JavaPlugin {
    public static final Logger LOG = Logger.getLogger("Minecraft");
    // the maximum number of chickens
    private static final int NUM_CHICKENS = 30;

    @Override
    public boolean onCommand(CommandSender sender, Command command,
        String label, String[] arguments) {

        if (label.equalsIgnoreCase("chickenstorm")) {
            if (sender instanceof Player) {
                executeCommand(sender);
            }
            return true;
        }
        return false;
    }

    // handle the chickenstorm command
    public void executeCommand(CommandSender sender) {
        Player me = (Player) sender;
        Location spot = me.getLocation();
        World world = me.getWorld();

        int quantity = 0;
        // loop from 1 to NUM_CHICKENS times
        for (int i = 0; i < Math.random() * NUM_CHICKENS + 1; i++) {
            // pick a spot for the chicken above the player
            Location chickenSpot = new Location(world,
                spot.getX() - 15 + Math.random() * 30,
                spot.getY() + 10 + Math.random() * 100,
                spot.getZ() - 15 + Math.random() * 30);
            if (chickenSpot.getBlock().getType() != Material.AIR) {
                // don't put the chicken in a solid block
                continue;
            }
            // create the chicken
            Chicken clucky = world.spawn(chickenSpot, Chicken.class);
            if (Math.random() < .4) {
                // make 40% of them babies
                clucky.setBaby();
            } else {
                // make the rest adults
                clucky.setAdult();
            }
            quantity++;
        }
        // tell the server log how many were created
        LOG.info(quantity + " chickens summoned");
    }
}
```
