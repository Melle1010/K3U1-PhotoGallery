const { filterImagesByCategory, searchImages } = require('./script.js');

const testImages = [
    { 
        id: 1, 
        category: 'birds', 
        tags: ['blue', 'feathers', 'flying'], 
        alt: 'A blue bird flying high',
        thumb: 'bird.jpg' 
    },
    { 
        id: 2, 
        category: 'fish', 
        tags: ['gold', 'water', 'wet'], 
        alt: 'A goldfish in a bowl',
        thumb: 'fish.jpg' 
    },
    { 
        id: 3, 
        category: 'birds', 
        tags: ['red', 'angry'], 
        alt: 'Red bird sitting',
        thumb: 'redbird.jpg' 
    }
];

describe('filterImagesByCategory', () => {

    test('ska returnera alla bilder om kategorin är "all"', () => {
        const result = filterImagesByCategory(testImages, 'all');
        expect(result.length).toBe(3);
        expect(result).toEqual(testImages);
    });

    test('ska bara returnera bilder som matchar specifik kategori', () => {
        const result = filterImagesByCategory(testImages, 'birds');
        expect(result.length).toBe(2);
        expect(result[0].category).toBe('birds');
        expect(result[1].category).toBe('birds');
    });

    test('ska returnera en tom lista om kategorin inte finns', () => {
        const result = filterImagesByCategory(testImages, 'dinosaurs');
        expect(result.length).toBe(0);
        expect(result).toEqual([]);
    });
});

describe('searchImages', () => {

    test('ska returnera alla bilder om sökfältet är tomt', () => {
        const result = searchImages(testImages, '');
        expect(result.length).toBe(3);
    });

    test('ska hitta bilder baserat på alt-text (case insensitive)', () => {
        const result = searchImages(testImages, 'Gold');
        expect(result.length).toBe(1);
        expect(result[0].alt).toContain('goldfish');
    });

    test('ska hitta bilder baserat på taggar', () => {
        const result = searchImages(testImages, 'flying');
        expect(result.length).toBe(1);
        expect(result[0].id).toBe(1);
    });

    test('ska returnera tomt om inget matchar', () => {
        const result = searchImages(testImages, 'zebra');
        expect(result.length).toBe(0);
    });
});