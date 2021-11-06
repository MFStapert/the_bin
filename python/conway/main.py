import time
import os
import copy
import random


def init():
    h, w = 20, 20
    grid = [[0 for x in range(w)]for y in range(h)]
    for y, col in enumerate(grid):
        for x, row in enumerate(col):
            grid[y][x] = random.choice([0, 1])
    # grid[0][0] = 1
    # grid[0][1] = 1
    # grid[1][0] = 1
    # grid[1][1] = 1
    #
    # grid[2][2] = 1
    # grid[3][2] = 1
    # grid[2][3] = 1
    # grid[3][3] = 1

    return grid


def print_grid(grid):
    print_str = ""
    for y, col in enumerate(grid):
        for x, row in enumerate(col):
            if grid[y][x] == 1:
                print_str += str(row) + " "
            else:
                print_str += "  "
        print_str += "\n"
    print(print_str)


def get_live_cells(grid):
    cells = []
    for y, col in enumerate(grid):
        for x, row in enumerate(col):
            if grid[y][x] == 1:
                cells.append([x, y])
    return cells


def step(grid):
    new_grid = copy.deepcopy(grid)

    live_cells = get_live_cells(grid)
    for cell in live_cells:
        neighbours = get_neighbours(grid, cell)
        live_neighbours = 0
        for neighbour in neighbours:
            if grid[neighbour[1]][neighbour[0]] == 1:
                live_neighbours += 1
        if live_neighbours < 2:
            new_grid[cell[1]][cell[0]] = 0

    live_cells = get_live_cells(grid)
    for cell in live_cells:
        neighbours = get_neighbours(grid, cell)
        live_neighbours = 0
        for neighbour in neighbours:
            if grid[neighbour[1]][neighbour[0]] == 1:
                live_neighbours += 1
        if live_neighbours > 3:
            new_grid[cell[1]][cell[0]] = 0

    for y, col in enumerate(grid):
        for x, row in enumerate(col):
            if grid[y][x] == 0:
                neighbours = get_neighbours(grid, [x, y])
                live_neighbours = 0
                for neighbour in neighbours:
                    if grid[neighbour[1]][neighbour[0]] == 1:
                        live_neighbours += 1
                if live_neighbours == 3:
                    new_grid[y][x] = 1

    grid = new_grid
    return grid


def get_neighbours(grid, cell):
    neighbours = []
    for x in range(3):
        for y in range(3):
            pos_x = cell[0] - 1 + x
            pos_y = cell[1] - 1 + y
            if -1 < pos_x < len(grid[0]) and -1 < pos_y < len(grid[0]) and [pos_x, pos_y] != cell:
                neighbours.append([pos_x, pos_y])
    return neighbours


if __name__ == "__main__":
    game_grid = init()
    while True:
        os.system("cls")
        print_grid(game_grid)
        game_grid = step(game_grid)
        time.sleep(1)
