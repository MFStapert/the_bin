package com.gildedrose;

class GildedRose {
    public final static int CHANGE_RATE = 1;
    private final static int MAX_QUALITY = 50;
    private final static int TICKET_DOUBLING_THRESHOLD = 10;
    private final static int TICKET_TRIPLING_THRESHOLD = 5;
    Item[] items;

    public GildedRose(Item[] items) {
        this.items = items;
    }

    public void updateQuality() {
        for (Item item : items) {
            calculateQuality(item);
            calculateSellIn(item);

            // decide AGAIN
            if (item.sellIn < 0) {
                if (!item.name.equals("Aged Brie")) {
                    if (!item.name.equals("Backstage passes to a TAFKAL80ETC concert")) {
                        decreaseQuality(item);
                    }
                }
            }
        }
    }

    private void calculateSellIn(Item item) {
        if (!item.name.equals("Sulfuras, Hand of Ragnaros")) {
            item.sellIn = item.sellIn - CHANGE_RATE;
        }
    }

    private void calculateQuality(Item item) {
        if (doesItemDecreaseInValue(item)) {
            decreaseQuality(item);
        }
        else {
            if (item.quality < MAX_QUALITY) {
                if (item.name.equals("Aged Brie")) {
                    increaseValueOfBrie(item);
                } else if (item.name.equals("Backstage passes to a TAFKAL80ETC concert")) {
                    increaseItemOfBackstagePass(item);
                }
            }
        }
    }

    private void increaseItemOfBackstagePass(Item item) {
        if (item.sellIn <= TICKET_TRIPLING_THRESHOLD) {
            item.quality = item.quality + CHANGE_RATE * 3;
        } else if (item.sellIn <= TICKET_DOUBLING_THRESHOLD) {
            item.quality = item.quality + CHANGE_RATE * 2;
        } else {
            item.quality = item.quality + CHANGE_RATE;
        }
        if (item.sellIn == 0){
            item.quality = 0;
        }
    }

    private void increaseValueOfBrie(Item item) {
        item.quality = item.quality + CHANGE_RATE;
        if (item.sellIn <= 0) {
            item.quality = item.quality + CHANGE_RATE;
        }
    }

    private void decreaseQuality(Item item) {
        if (item.quality > 0) {
            if (!item.name.equals("Sulfuras, Hand of Ragnaros")) {
                item.quality = item.quality - CHANGE_RATE;
            }
        }
    }

    private boolean doesItemDecreaseInValue(Item item) {
        return !item.name.equals("Aged Brie")
            && !item.name.equals("Backstage passes to a TAFKAL80ETC concert");
    }
}
