from city import *


def main():
    # People
    p1 = Person("John", 20, 'M')
    p2 = Person("Jenna", 22, 'V')
    p3 = Person("Dakkon", 10, 'M')
    p4 = Worker("Lola", 30, 'V', "Cook")
    p5 = Worker("Tina", 21, 'V', "Priest")
    p6 = Worker("Stapert", 24, 'M', "Warrior")

    p7 = Person("Anouck", 20, 'V')
    p8 = Worker("Hieke", 29, 'V', "Docent")
    p9 = Person("Siep", 72, 'M')
    p10 = Person("Hans", 46, 'M')
    p11 = Worker("Egbert", 33, 'M', "Gangster")

    # People lists
    pl1 = [p1, p2, p3]
    pl2 = [p4, p5, p6]
    pl3 = [p7]
    pl4 = [p8, p9]
    pl5 = [p10, p11]

    # Streets
    s1 = Street("Beverwijkstraat", pl1)
    s2 = Street("Wijkbeverstraat", pl2)
    s3 = Street("Amsterdamwijk", pl3)
    s4 = Street("Amsterdamstraat", pl4)
    s5 = Street("Amsterdamweg", pl5)

    # Street lists
    sl1 = [s1, s2]
    sl2 = [s3, s4, s5]

    # Cities
    c1 = City("Beverwijk", sl1)
    c2 = City("Amsterdam", sl2)

    cl = [c1, c2]

    nav = Navigator(cl)
    clear()
    nav.mainmenu()

main()
