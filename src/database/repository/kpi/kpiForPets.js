const math = require('mathjs');

class KPIForPets {
    constructor(selectedSpecies) {
        this._selectedSpecies = selectedSpecies;
    }

    async calculateKPI(petsList) {
        const theMostNumerousSpecies = this._calculateMostNumerousSpecies(petsList);
        const KPI = {
            theMostNumerousSpecies,
        };

        if(this._selectedSpecies) {
            const petsOfSpecies = petsList.filter((pet) => pet.species === this._selectedSpecies);
            const ageAverageBetweenSameSpecies = this._calculateAgeAverageBetweenSameSpecies(petsOfSpecies);
            const standardDeviationBetweenAgesOfSameSpecies = this._calculateStandardDeviation(petsOfSpecies);

            return {
                ...KPI,
                ageAverageBetweenSameSpecies,
                standardDeviationBetweenAgesOfSameSpecies,
            }
        }

        return KPI;
    }

    _calculateMostNumerousSpecies(petsList) {
        const petSpecies = petsList.map((pet) => pet.species);

        const numberOfEachSpecies = {};

        let speciesCount = 0, numerousSpecies;

        petSpecies.forEach((species) => {
            (!numberOfEachSpecies[species]) ? numberOfEachSpecies[species] = 1 : numberOfEachSpecies[species]++;

            if(numberOfEachSpecies[species] > speciesCount) {
                speciesCount = numberOfEachSpecies[species];
                numerousSpecies = species;
            }
        });

        const numberOfEachSpeciesSorted = Object.fromEntries(
            Object.entries(numberOfEachSpecies).sort(([,a],[,b]) => b-a)
        );

        return numberOfEachSpeciesSorted;
    }

    _calculateAgeAverageBetweenSameSpecies(petsOfSpecies) {

        const average = petsOfSpecies.reduce((result, pet) => result + pet.age, 0) / petsOfSpecies.length;

        return average;
    }

    _calculateStandardDeviation(petsOfSpecies) {
        const petsAge = petsOfSpecies.map((pet) => pet.age);

        return math.std(petsAge);
    }
}

module.exports = KPIForPets;