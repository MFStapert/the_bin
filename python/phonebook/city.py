import os
import sys


# All the types of people in the city
class Person:

    def __init__(self, name="Nameless", age=0, sex='x'):
        self.name = name
        self.age = age
        self.sex = sex

    def __str__(self):
        return "Person with name: " + self.name + " age: " + str(self.age) + " sex: " + self.sex


class Worker(Person):
    def __init__(self, name="Nameless", age=0, sex='x', occupation="Undef"):
        super().__init__(name, age, sex)
        self.occupation = occupation

    def __str__(self):
        return super().__str__() + " occupation: " + self.occupation


# The streets in which the people live
class Street:
    def __init__(self, name="Unnamed street", people=None):
        self.name = name
        self.people = people

    def returnname(self):
        return self.name

    def returnperson(self, name):
        for person in self.people:
            if name == person.name:
                return person

    def returnnrofpeople(self):
        return len(self.people)

    def returnnrofworkingpeople(self):
        nrofworkingpeople = 0
        for person in self.people:
            if isinstance(person, Worker):
                nrofworkingpeople += 1
        return nrofworkingpeople

    def returnpeople(self):
        return self.people


# The city in which the streets are
class City:
    def __init__(self, name="Unnamed city", streets=None):
        self.name = name
        self.streets = streets

    def returnstreet(self, name):
        for street in self.streets:
            if name == street.name:
                return street
        raise Exception("Street not found")

    def returnstreets(self):
        return self.streets

    def returnnrofstreets(self):
        return len(self.streets)

    def returnnrofpeople(self):
        nrofpeople = 0
        for street in self.streets:
            nrofpeople = nrofpeople + street.returnnrofpeople()
        return nrofpeople

    def returnnrofworkingpeople(self):
        nrofpeople = 0
        for street in self.streets:
            nrofpeople = nrofpeople + street.returnnrofworkingpeople()
        return nrofpeople


class Navigator:
    def __init__(self, cities):
        self.cities = cities

    def mainmenu(self):
        print("Welcome the city info!")
        print("These are the cities: ")

        for city in self.cities:
            print("- "+city.name)

        print("Type city name for info, type exit to exit")
        self.handleinput(input())

    def handleinput(self, userinput):
        clear()
        try:
            if userinput.lower() == "exit":
                sys.exit()
            if userinput.lower() == "main":
                self.mainmenu()
            else:
                self.printcity(userinput)
        except InvalidInputSelection as e:
            print(e.value)
            self.mainmenu()

    def printcity(self, userinput):
        city = self.getcity(userinput)
        print("Name: "+city.name)
        print("Nr of streets: ",city.returnnrofstreets())
        print("Nr of people: ",city.returnnrofpeople())
        print("Nr of working people: ",city.returnnrofworkingpeople())

        for street in city.streets:
            print("---")
            print("Streetname: "+street.name)
            for person in street.people:
                print(str(person))
            print("---")

        print("Type main to return to main menu, type exit to exit")
        self.handleinput(input())

    def getcity(self, userinput):
        for city in self.cities:
            if city.name == userinput:
                return city
        raise InvalidInputSelection()


class InvalidInputSelection(BaseException):

    def __init__(self):
        self.value = "Invalid input!"

    def __str__(self):
        return str(self.value)


def clear():
    os.system('cls')
