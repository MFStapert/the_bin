from game import GameController, GameEvent, Direction
import os

# cli parameters for maze size and nr of levels


class CLI:

    def __init__(self, size=6, levels=3):
        self.gamecontroller = GameController(size, levels)
        self.gameloop = False
        self.battlestate = False

    def handleinputs(self, strin):
        if self.battlestate:
            if strin == "f":
                print("You fought!")
                return self.gamecontroller.handlebattle(True)
            if strin == "r":
                print("You ran!")
                return self.gamecontroller.handlebattle(False)
        if not self.battlestate:
            if strin == "n":
                return self.gamecontroller.moveplayer(Direction.NORTH)
            if strin == "e":
                return self.gamecontroller.moveplayer(Direction.EAST)
            if strin == "s":
                return self.gamecontroller.moveplayer(Direction.SOUTH)
            if strin == "w":
                return self.gamecontroller.moveplayer(Direction.WEST)
        if strin == "i":
            print(self.gamecontroller.player.getitems())
            return GameEvent.NOTHING
        if strin == "h" or strin == "help":
            print(" n,e,s,w for directions, i inventory, f fight, r run")
            return GameEvent.NOTHING
        if strin == "x":
            return GameEvent.END

    def handlegameoutput(self, gameoutput):
        if gameoutput is GameEvent.MOVEOK:
            os.system('cls')
            print(self.gamecontroller.playerroominfo())
        if gameoutput is GameEvent.ITEM:
            os.system('cls')
            print("Picked up item")
            print(self.gamecontroller.playerroominfo())
        if gameoutput is GameEvent.MONSTER:
            self.battleloop()
        if gameoutput is GameEvent.BATTLEOVER:
            self.battlestate = False
            os.system('cls')
            print("Finished battle your life is now " + self.gamecontroller.playerhealth())
            print(self.gamecontroller.playerroominfo())
        if gameoutput is GameEvent.LVLEXIT:
            os.system('cls')
            print("Entered lvl: " + str(self.gamecontroller.currlvl))
            print(self.gamecontroller.playerroominfo())
        if gameoutput is GameEvent.DEATH:
            os.system('cls')
            print("You died")
            print("Game Over")
            self.battlestate = False
            self.gameloop = False
        if gameoutput is GameEvent.END:
            os.system('cls')
            print("Game Over")
            self.gameloop = False

    def battleloop(self):
        self.battlestate = True
        print("Monster encountered, fight or run")
        while self.battlestate:
            self.getinputandhandlegameoutput()

    def startgameloop(self):
        self.gameloop = True
        print("Started the game, you are now in room: ")
        print("Press H for help")
        print(self.gamecontroller.playerroominfo())
        while self.gameloop:
            self.getinputandhandlegameoutput()

    def getinputandhandlegameoutput(self):
        strin = input()
        gameoutput = self.handleinputs(strin)
        self.handlegameoutput(gameoutput)

    def hi(self):
        print("hi")

if __name__ == "__main__":
    os.system('cls')
    cli = CLI()
    cli.startgameloop()
    quit()
