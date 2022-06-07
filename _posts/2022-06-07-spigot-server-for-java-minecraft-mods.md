---
  layout: post
  title: Spigot Server for Java Minecraft Mods
  date: 2022-06-07
  categories:
  - programming
  tags:
  - education
  - classes
  - object-oriented programming
  - Java
  - Minecraft
  - mod
  - server
---

This summer I picked up "Absolute Beginner's Guide To Minecraft Mods Programming, second edition" by Rogers Cadenhead. I decided to blog about the process. This will serve as a project journal, but also as notes to myself so that I have a record of the process.

## Downloads

There are a few things I need to install on my MacBook (this is one of the first hurdles, because the author is using a PC):
 - JRE, the Java Runtime Environment
 - JDK, the Java Development Kit (had to register for an Oracle account)
 - Eclipse, I know I'm going to need to manage Java packages and build JAR files
 - A Spigot/Bukkit server (downloaded from [https://javaminecraft.com/spigot/](https://javaminecraft.com/spigot/))
 - The Minecraft client, aka the game [https://www.minecraft.net/en-us/download](https://www.minecraft.net/en-us/download)


## Start the Server

Create a shell script named start-server.sh to launch the server. Bukkit's wiki has directions for Mac OSX [here](https://bukkit.fandom.com/wiki/Setting_up_a_server#Mac_OS_X).
```
cd /Users/rileyju/minecraftserver/
java -Xms1024M -Xmx1024M -jar spigotserver.jar
```
Before running the shell script, you must use chmod to allow the script to run
  - Open up Terminal.app
  - Type into Terminal.app
    - chmod a+x
    - Warning: Do not hit return yet!
    - drag the start_server.command into Terminal.app
  - hit return

When you want to start the server, just drag start-server.sh into the terminal and press return

On first run, you will get the error "Failed to load eula.txt" because you need to agree to the eula. Find eula.txt and edit it to say eula=true

Open server.properties file. Details [here](https://minecraft.fandom.com/wiki/Server.properties#Java_Edition_2)
  - Change the message-of-the-day to motd=Riley Mod Server
  - Change the game mode. survival is 0, creative is 1, adventure is 2, spectator is 3
  - Set pvp to false. true would mean that players can kill each other.
false means that players cannot kill other players (also known as Player versus Environment (PvE)).
  - NOTICE that the query.port is set to 25565

## Launch Client and Find Server

On the splash screen, click the Multiplayer button.

If you don't see your server name (in my case "Riley Mod Server"), click Direct Connect. [Source](https://gaming.stackexchange.com/questions/153344/why-can-i-not-connect-to-my-bukkit-server): you need to get the local IP address of your computer unless you are connecting to the server on the same machine your server is running on.

To connect on your own computer to a server ran on your computer, connect to localhost:25565

To get your IP address to connect to your server from another computer, go to the Command Prompt and enter ipconfig, then get the ipv4 address. Then connect to Your_ipv4_address:25565

## Changing the Game Version

On first run, I got an "outdated server" error. The Spigot server is Minecraft v1.8.7

Open the Minecraft Launcher. In Java Edition, choose the Installations tab. Click the New Installation button. Give it a name like ModTester. Change the version to match the server: release 1.8.7

[https://help.minecraft.net/hc/en-us/articles/360034754852-Change-Game-Version-for-Minecraft-Java-Edition](https://help.minecraft.net/hc/en-us/articles/360034754852-Change-Game-Version-for-Minecraft-Java-Edition)
