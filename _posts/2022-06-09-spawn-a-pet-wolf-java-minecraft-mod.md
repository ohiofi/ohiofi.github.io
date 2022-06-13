---
  layout: post
  title: Spawn a Pet Wolf Java Minecraft Mod
  date: 2022-06-09
  categories:
  - programming
  tags:
  - education
  - classes
  - object-oriented programming
  - Java
  - Minecraft
  - mod
  - wolf
---

This mod from "Absolute Beginner's Guide To Minecraft Mods Programming, second edition" by Rogers Cadenhead will spawn a wolf when the player types the command "/petwolf"

The first thing to notice is that the starter code is MISSING an important line of code. The starter code below will spawn a wolf at the player's location and set the collar color to pink. The starter code does NOT set the player to be the owner of the wolf.

![Demo of the PetWolf Minecraft mod](/assets/petwolf-collage.jpg)

## Challenges

#### 1. Can you set the player to be the owner of the wolf?

   Check the Spigot API documentation for the [Wolf class](https://helpch.at/docs/1.7.10/org/bukkit/entity/Wolf.html) and look for one of the Tameable methods that lets you change the owner.

#### 2. Can you randomize the collar color?

   Check the Spigot API for the [DyeColor class](https://helpch.at/docs/1.7.10/org/bukkit/DyeColor.html) for a list of the class constants (for example DyeColor.PINK), create an array of type DyeColor that contains several colors, and randomly select a DyeColor from the list.

#### 3. Can you give the wolf a random name?

   The [Wolf class](https://helpch.at/docs/1.7.10/org/bukkit/entity/Wolf.html) lists the methods that can change a wolf's custom name (look at the Nameable methods). Create an array of dog names, randomly select a name and use substring to get only the first half, randomly select a name and use substring to get only the second half, then set the wolf's custom name to be the first half concatenated with the second half. This should generate *interesting* names like Coodo (*Coo*per + Fi*do*), Root (*Ro*ver + Sp*ot*), Fiper (*Fi*do + Coo*per*), Coover (*Coo*per + Ro*ver*), Fiot (*Fi*do + Sp*ot*), Fiver (*Fi*do + Ro*ver*) and Rodo (*Ro*ver + Fi*do*).

![Another demo of the PetWolf Minecraft mod](/assets/petwolf-collage2.jpg)

## PetWolf Starter Code

Source: [https://javaminecraft.com/source/PetWolf/PetWolf.java](https://javaminecraft.com/source/PetWolf/PetWolf.java)

```
package com.javaminecraft;

import java.util.logging.*;
import org.bukkit.*;
import org.bukkit.command.*;
import org.bukkit.entity.*;
import org.bukkit.plugin.java.*;

public class PetWolf extends JavaPlugin {
    public static final Logger LOG = Logger.getLogger("Minecraft");

    public boolean onCommand(CommandSender sender, Command command,
        String label, String[] arguments) {

        if (label.equalsIgnoreCase("petwolf")) {
            if (sender instanceof Player) {
                // get the player
                Player me = (Player) sender;
                // get the player's current location
                Location spot = me.getLocation();
                // get the game world
                World world = me.getWorld();

                // spawn one wolf
                Wolf wolf = world.spawn(spot, Wolf.class);
                // set the color of its collar
                wolf.setCollarColor(DyeColor.PINK);
                LOG.info("[PetWolf] Howl!");
                return true;
            }
        }
        return false;
    }
}
```
