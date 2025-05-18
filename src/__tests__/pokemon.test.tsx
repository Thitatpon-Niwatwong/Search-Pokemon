const bulbasaur = {
    name: 'Bulbasaur',
    types: ['Grass', 'Poison'],
};

const charmander = {
    name: 'Charmander',
    types: ['Fire'],
};

const squirtle = {
    name: 'Squirtle',
    types: ['Water'],
};

describe('Pokémon Type Tests', () => {
    test('Bulbasaur should be Grass type', () => {
        expect(bulbasaur.types).toContain('Grass');
    });

    test('Charmander should be Fire type', () => {
        expect(charmander.types).toContain('Fire');
    });

    test('Squirtle should be Water type', () => {
        expect(squirtle.types).toContain('Water');
    });
});
