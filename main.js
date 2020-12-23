// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

// Creates a random DNA specimen
const pAequorFactory = (specimenNum, dna) => { 
  return {
  specimenNum,
  dna,
  mutate() {
    const randomIndex = Math.floor(Math.random() * 14);
    let newBase = returnRandBase();
    while (this.dna[randomIndex] === newBase) {
      newBase = returnRandBase();
    }
    this.dna.splice(randomIndex, 1, newBase);
    return this.dna;
  },

  // Compares DNA of one specimen to the current specimen. Gives a percentage.
  compareDNA(pAequor) {
    let match = 0;
    for(let i=0; i < this.dna.length; i++) {
      if (pAequor.dna[i] === this.dna[i]) {
        match++;
      }
    }
    const percentageMatch = ((match / pAequor.dna.length) * 100);
    console.log(`There is a ${percentageMatch.toFixed(2)}% DNA match between specimen numbers ${this.specimenNum} and ${pAequor.specimenNum}.`);
  },

  // Specimen will likely survive ie. 60% or more of bases are C or G
    willLikelySurvive: function () {
      let match = 0;
      this.dna.forEach(el => {
          if (el === 'C' || el === 'G') {
            match++;
          }
        });
        return ((match / this.dna.length) * 100) >= 60;
    },
// Finds the complementary DNA strand ie. A = T, T =A, C = G, G = C
    complementStrand() {
      const dnaComplement = [];
      for(let i = 0; i < dna.length; i++) {
      if (dna[i] === 'A') {
        dnaComplement[i] = 'T';
      }
      if (dna[i] === 'T') {
        dnaComplement[i] = 'A';
      }
      if (dna[i] === 'C') {
        dnaComplement[i] = 'G';
      }
      if (dna[i] === 'G') {
        dnaComplement[i] = 'C';
      }
    }
    return dnaComplement;
  }
}
}

// Create an array of 30 specimens which will likely survive
  let willLikelySurviveArray = [];
  let i = 1;

  while (willLikelySurviveArray.length < 30) {
    let testSpecimen = pAequorFactory(i, mockUpStrand());
    if (testSpecimen.willLikelySurvive()) {
      willLikelySurviveArray.push(testSpecimen);
    }
    i++;
  }
  console.log(willLikelySurviveArray);