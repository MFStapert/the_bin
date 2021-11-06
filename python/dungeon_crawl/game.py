from enum import Enum
from random import randint

import secrets


class GameController:

    def __init__(self, size, nroflvls):
        self.size = size
        self.maze = Maze(size)
        self.currlvl = 1
        self.nroflvls = nroflvls
        self.player = Player(0, 0)
        self.setplayerstart()

    def setplayerstart(self):
        randx = randint(0, self.size - 1)
        randy = randint(0, self.size - 1)
        self.player.setxy(randx, randy)

    def moveplayer(self, direction):
        currroom = self.maze.getroom(self.player.x, self.player.y)
        self.player.move(direction, currroom.getwall(direction), self.size)
        room = self.maze.getroom(self.player.x, self.player.y)
        roomentity = room.roomentity
        if roomentity is not None:
            return self.handleroomentity(room, roomentity)
        return GameEvent.MOVEOK

    def handlebattle(self, fight):
        if fight:
            self.player.fight(10)
        else:
            if randint(0, 1) is 0:
                self.player.run(20)
        if self.player.health > 0:
            return GameEvent.BATTLEOVER
        else:
            return GameEvent.DEATH

    def handleroomentity(self, room, roomentity):
        if roomentity is RoomEntity.EXIT:
            return self.foundexit()
        if roomentity is RoomEntity.MONSTER:
            room.roomentity = None
            return GameEvent.MONSTER
        if roomentity is RoomEntity.ITEM:
            room.roomentity = None
            self.player.items += 1
            return GameEvent.ITEM

    def foundexit(self):
        self.currlvl += 1
        if self.currlvl <= self.nroflvls:
            self.maze = Maze(self.size)
            self.setplayerstart()
            return GameEvent.LVLEXIT
        return GameEvent.END

    def playerhealth(self):
        return str(self.player.health)

    def playerinfo(self):
        return self.player.getitems()

    def playerroominfo(self):
        playerxy = self.player.getxy()
        room = self.maze.getroom(playerxy["x"], playerxy["y"])
        return " X: " + str(playerxy["x"]) + " Y: " + str(playerxy["y"]) + "\n" + str(room)


class GameEvent(Enum):
    MOVEOK = 1
    LVLEXIT = 2
    END = 3
    MONSTER = 4
    BATTLEOVER = 5
    ITEM = 6
    DEATH = 7
    NOTHING = 8


class Maze:

    def __init__(self, size):
        self.size = size
        self.level = [[0 for x in range(size)]for y in range(size)]
        self.buildmaze(size)

    def buildtestmaze(self, size):
        for x in range(size):
            for y in range(size):
                room = Room(x, y)
                room.disablewalls()
                self.level[x][y] = room
                if randint(0, 1) is 0:
                    self.level[x][y].roomentity = RoomEntity.MONSTER
                else:
                    self.level[x][y].roomentity = RoomEntity.ITEM
        self.level[0][1].roomentity = RoomEntity.EXIT

    def buildmaze(self, size):
        for x in range(size):
            for y in range(size):
                self.level[x][y] = Room(x, y)
                if randint(0, 1) is 0:
                    self.level[x][y].roomentity = RoomEntity.MONSTER
                else:
                    self.level[x][y].roomentity = RoomEntity.ITEM
        nrofunvisitedrooms = self.size * self.size
        mazestack = []
        currentroom = self.level[0][0]
        while nrofunvisitedrooms != 0:
            unvisitedneighbours = self.getunvisitedneighbours(currentroom.x, currentroom.y)
            if not currentroom.visited:
                currentroom.visited = True
                nrofunvisitedrooms -= 1
            if len(unvisitedneighbours) > 0:
                nextroom = secrets.choice(unvisitedneighbours)
                mazestack.append(currentroom)
                self.removewalls(currentroom, nextroom)
                currentroom = nextroom
            else:
                currentroom = mazestack.pop()

        self.level[1][4].roomentity = RoomEntity.EXIT

    def getneighbours(self, x, y):
        neighbours = []
        if y - 1 > 0:
            neighbours.append(self.level[x][y - 1])
        if x + 1 != self.size:
            neighbours.append(self.level[x + 1][y])
        if y + 1 != self.size:
            neighbours.append(self.level[x][y + 1])
        if x - 1 > 0:
            neighbours.append(self.level[x - 1][y])
        return neighbours

    def getneighbourscwithheckforwalls(self, x, y):
        neighbours = []
        for neighbour in self.getneighbours(x, y):
            if neighbour.x == x:
                if neighbour.y < y:
                    if not neighbour.northernwall:
                        neighbours.append(neighbour)
                else:
                    if not neighbour.southernwall:
                        neighbours.append(neighbour)
            else:
                if neighbour.x > x:
                    if not neighbour.easternwall:
                        neighbours.append(neighbour)
                else:
                    if not neighbour.westernwall:
                        neighbours.append(neighbour)
        return neighbours

    def getunvisitedneighbours(self, x, y):
        neighbours = []
        for neighbour in self.getneighbours(x, y):
            if neighbour.visited is False:
                neighbours.append(neighbour)
        return neighbours

    @staticmethod
    def removewalls(currentroom, nextroom):
        if currentroom.x == nextroom.x:
            if currentroom.y < nextroom.y:
                currentroom.southernwall = False
                nextroom.northernwall = False
            else:
                currentroom.northernwall = False
                nextroom.southernwall = False
        else:
            if currentroom.x > nextroom.x:
                currentroom.westernwall = False
                nextroom.easternwall = False
            else:
                currentroom.easternwall = False
                nextroom.westernwall = False

    def getroom(self, x, y):
        return self.level[x][y]


class Player:

    def __init__(self, x, y):
        self.x = x
        self.y = y
        self.health = 100
        self.items = 0

    def setxy(self, x, y):
        self.x = x
        self.y = y

    def move(self, direction, wall, mazesize):
        if direction is Direction.NORTH and self.y - 1 >= 0 and not wall:
            self.y -= 1
        if direction is Direction.EAST and self.x + 1 != mazesize and not wall:
            self.x += 1
        if direction is Direction.SOUTH and self.y + 1 != mazesize  and not wall:
            self.y += 1
        if direction is Direction.WEST and self.x - 1 >= 0 and not wall:
            self.x -= 1

    def fight(self, monster):
        if monster - self.items > 0:
            self.health -= monster - self.items

    def run(self, dmg):
        self.health -= dmg

    def getxy(self):
        return {"x": self.x, "y": self.y}

    def getitems(self):
        return "Your items account for: " + str(self.items) + " armor "


class Direction(Enum):
    NORTH = 0
    EAST = 1
    SOUTH = 2
    WEST = 3


class Room:

    def __init__(self, x, y):
        self.x = x
        self.y = y
        self.northernwall = True
        self.easternwall = True
        self.southernwall = True
        self.westernwall = True
        self.visited = False
        self.roomentity = None

    def disablewalls(self):
        self.northernwall = False
        self.easternwall = False
        self.southernwall = False
        self.westernwall = False

    def getwall(self, direction):
        if direction is Direction.NORTH:
            return self.northernwall
        if direction is Direction.EAST:
            return self.easternwall
        if direction is Direction.SOUTH:
            return self.southernwall
        if direction is Direction.WEST:
            return self.westernwall

    def __str__(self):
        wallstr = "There is a path open to the "
        if not self.northernwall:
            wallstr += " north "
        if not self.easternwall:
            wallstr += " east "
        if not self.southernwall:
            wallstr += " south "
        if not self.westernwall:
            wallstr += " west "
        return wallstr


class RoomEntity(Enum):
    EXIT = 1
    ITEM = 2
    MONSTER = 3
