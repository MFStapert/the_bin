package com.gildedrose;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class GildedRoseTest {

    @Test
    void foo() {
        Item[] items = new Item[] { new Item("foo", 0, 0) };
        GildedRose app = new GildedRose(items);
        app.updateQuality();
        assertEquals("foo", app.items[0].name);
    }

    @Test
    void testSystemLowersQualityAtEndOfDay() {
        int startQuality = 10;
        int startSelIn = 10;
        Item[] items = new Item[] { new Item("foo", startSelIn, startQuality) };
        GildedRose app = new GildedRose(items);

        app.updateQuality();

        assertTrue(app.items[0].quality < startQuality);
        assertTrue(app.items[0].sellIn < startSelIn);
    }

    @Test
    void testQualityIsLoweredByRate() {
        int startQuality = 10;
        int startSelIn = 10;
        Item[] items = new Item[] { new Item("foo", startSelIn, startQuality) };
        GildedRose app = new GildedRose(items);

        app.updateQuality();
        assertEquals(app.items[0].quality, 9);
        assertEquals(app.items[0].sellIn, 9);

        app.updateQuality();
        assertEquals(app.items[0].quality, 8);
        assertEquals(app.items[0].sellIn, 8);
    }

    @Test
    void testItemDegradesTwiceAsFastAfterSellDatePasses() {
        int startQuality = 10;
        int startSelIn = 1;
        Item[] items = new Item[] { new Item("foo", startSelIn, startQuality) };
        GildedRose app = new GildedRose(items);

        app.updateQuality();
        assertEquals(app.items[0].quality, 9);

        app.updateQuality();
        assertEquals(app.items[0].quality, 7);
    }

    @Test
    void testQualityItemNeverGetsUnderZero() {
        int startQuality = 3;
        int startSelIn = 1;
        Item[] items = new Item[] { new Item("foo", startSelIn, startQuality) };
        GildedRose app = new GildedRose(items);

        app.updateQuality();
        assertEquals(app.items[0].quality, 2);

        app.updateQuality();
        assertEquals(app.items[0].quality, 0);

        app.updateQuality();
        assertEquals(app.items[0].quality, 0);
    }

    @Test
    void testQualityOfBrieImprovesWithAge() {
        int startQuality = 3;
        int startSelIn = 1;
        Item[] items = new Item[] { new Item("Aged Brie", startSelIn, startQuality) };
        GildedRose app = new GildedRose(items);

        app.updateQuality();
        assertEquals(4, app.items[0].quality);

        app.updateQuality();
        assertEquals(6, app.items[0].quality);
    }

    @Test
    void testQualityNeverGoesAboveFifty() {
        int startQuality = 49;
        int startSelIn = 1;
        Item[] items = new Item[] { new Item("Aged Brie", startSelIn, startQuality) };
        GildedRose app = new GildedRose(items);

        app.updateQuality();
        assertEquals(50, app.items[0].quality);

        app.updateQuality();
        assertEquals(50, app.items[0].quality);
    }

    @Test
    void testSulfurasNeverDecreasesAndQualityStaysAtEighty() {
        int startSelIn = 1;
        Item[] items = new Item[] { new Item("Sulfuras, Hand of Ragnaros", startSelIn, 80) };
        GildedRose app = new GildedRose(items);

        app.updateQuality();
        assertEquals(80, app.items[0].quality);
        assertEquals(startSelIn, app.items[0].sellIn);


        app.updateQuality();
        assertEquals(80, app.items[0].quality);
        assertEquals(startSelIn, app.items[0].sellIn);
    }

    @Test
    void testConcertTicketValueRateDoublesAfterTenDays() {
        int startQuality = 3;
        int startSelIn = 11;
        Item[] items = new Item[] { new Item("Backstage passes to a TAFKAL80ETC concert", startSelIn, startQuality) };
        GildedRose app = new GildedRose(items);

        app.updateQuality();
        assertEquals(4, app.items[0].quality);

        app.updateQuality();
        assertEquals(6, app.items[0].quality);
    }

    @Test
    void testConcertTicketValueRateTriplesWhenThereAreFiveDaysLeft() {
        int startQuality = 3;
        int startSelIn = 6;
        Item[] items = new Item[] { new Item("Backstage passes to a TAFKAL80ETC concert", startSelIn, startQuality) };
        GildedRose app = new GildedRose(items);

        app.updateQuality();
        assertEquals(5, app.items[0].quality);

        app.updateQuality();
        assertEquals(8, app.items[0].quality);
    }

    @Test
    void testConcertTicketValueRateDropsToZeroWhenNoDaysLeft() {
        int startQuality = 3;
        int startSelIn = 1;
        Item[] items = new Item[] { new Item("Backstage passes to a TAFKAL80ETC concert", startSelIn, startQuality) };
        GildedRose app = new GildedRose(items);

        app.updateQuality();
        assertEquals(6, app.items[0].quality);
        app.updateQuality();
        assertEquals(0, app.items[0].quality);
    }



//    @Test(expected = IllegalArgumentException.class)
//    void testQualityNormalItemExceedsFiftyAtInitialization() {
//        int startQuality = 80;
//        int startSelIn = 1;
//        Item[] items = new Item[] { new Item("foo", startSelIn, startQuality) };
//        GildedRose app = new GildedRose(items);
//    }
}
