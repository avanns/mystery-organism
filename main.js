// Returns a random DNA base
const createRandomBase = () => {
  const dnaBases = ["A", "T", "C", "G"];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i += 1) {
    newStrand.push(createRandomBase());
  }
  return newStrand;
};

const complementaryStrand = {
  A: "T",
  T: "A",
  C: "G",
  G: "C",
};

// Creates a random DNA specimen
const pAequorFactory = (specimenNum, dna) => ({
  specimenNum,
  dna,
  mutate() {
    const randomIndex = Math.floor(Math.random() * 14);
    let newBase = createRandomBase();
    while (dna[randomIndex] === newBase) {
      newBase = createRandomBase();
    }
    dna.splice(randomIndex, 1, newBase);
    return dna;
  },
  // Compares DNA of one specimen to the current specimen. Gives a percentage.
  compareDNA(pAequor) {
    let match = 0;
    for (let j = 0; j < dna.length; j += 1) {
      if (pAequor.dna[j] === dna[j]) {
        match += 1;
      }
    }
    const percentageMatch = (match / pAequor.dna.length) * 100;
    console.log(
      `There is a ${percentageMatch.toFixed(
        2
      )}% DNA match between specimen numbers ${specimenNum} and ${
        pAequor.specimenNum
      }.`
    );
  },
  // Specimen will likely survive i.e. 60% or more of bases are C or G
  willLikelySurvive() {
    let match = 0;
    dna.forEach((el) => {
      if (el === "C" || el === "G") {
        match += 1;
      }
    });
    return (match / dna.length) * 100 >= 60;
  },
  // Finds the complementary DNA strand i.e. A = T, T = A, C = G, G = C
  complementStrand() {
    const dnaComplement = [];
    for (let k = 0; k < dna.length; k += 1) {
      dnaComplement[k] = complementaryStrand[dna[k]];
    }
    return dnaComplement;
  },
});

// Create an array of 30 specimens which will likely survive
const willLikelySurviveArray = [];
let specimenNumber = 1;

while (willLikelySurviveArray.length < 30) {
  const testSpecimen = pAequorFactory(specimenNumber, mockUpStrand());
  if (testSpecimen.willLikelySurvive()) {
    willLikelySurviveArray.push(testSpecimen);
  }
  specimenNumber += 1;
}

console.log(willLikelySurviveArray);

/**
 * Observations
 *
 * 0. I like your use of comments, although the code should be as 'self-documenting' as possible. Clarification can
 * be invaluable. See Clean Code for more musings on this from Uncle Bob
 * 1. Formatting was off - prettier will fix this
 * 2. Naming - what is pAequor? I've refactored returnRandBase to be called createRandomBase. Return is a reserved word so probably
 * best avoiding in names. I wouldn't shy away from using full words over abbreviations e.g. Random as opposed to Rand in this scenario.
 * This goes back to the conversation we had around using variables like temp - if you or another dev comes back to this code, will it
 * immediately make sense? Meaningful variable names are key
 * 3. A few minor spelling errors e.g. stand instead of strand. A bit picky but could prove problematic
 * 4. ComplementStrand was a bit verbose. I've reduced it down to a single lookup in a
 * new object carrying key value pairs - complementaryStrand. Look out for repetitive code - there's
 * probably scope to simplify it down
 * 5. I've replaced the unary ++ operator with += in line with the no-plusplus ESLint recommendation.
 * See https://eslint.org/docs/rules/no-plusplus for details
 * 6. I've used different letters, i through k in counters to avoid any confusion. This was flagged by
 * the SonarLint extension, which is a nice complement to ESLint
 * 7. I would avoid the use of so called 'magic numbers'. These are values which are hard coded. For instance
 * in the mockupStrand method you're returning 15 bases. What if you wanted to generate different numbers of
 * bases in different parts of your code? I'd personally update the signature of the method to accept the number
 * of bases you'd like to generate
 * 8. A readme file would be useful to describe the problem you're solving
 * 9. There are no tests. These would be good to prove your implementation behaves in the way you expect. Are there
 * any edge cases you need to consider? They'll also bolster the stock of your portfolio
 */

/**
 * Tips/Additions
 *
 * 0. Run `yarn install` to add the additional dependencies I've included. You can see these if you open up package.json
 * 1. You'll notice I've added .eslintrc.json. This uses the airbnb style rules as a base. These are utilised by many
 * companies as they're highly rated. See https://github.com/airbnb/javascript for the rules. VS Code should pick up this
 * config and highlight places where it thinks there's room for improvement (once #3 is in place). I've added a couple of
 * scripts to the pacakage.json. If you run `yarn lint`, a check will run which will highlight any issues (in line with VS Code).
 * `yarn lint:fix` will attempt to automatically remedy any issues, where programmer input is not required
 * 2. Ensure you have the Prettier and ESLint extensions installed. SonarLint and Bracket Pair Colorizer 2 are useful additions
 * 3. To format on save in VS Code, hit ⌘ + ⇧ + P & then search for “_Preferences: Open Settings (JSON)_”.
 * Insert "editor.formatOnSave": true. You will have to restart the IDE for the changes to take effect
 * 4. Check out jest https://jestjs.io/ for your unit tests. There's loads of videos to get you started:
 * https://www.youtube.com/results?search_query=jest+node+js+unit+testing
 * 5. Write a readme using Markdown. See https://www.makeareadme.com/
 * 6. .gitignore is handy if you haven't encountered it. It allows you to stipulate specific directories/files/patterns which you
 * don't want to push to your repository. In this case I've omitted the node_modules dir as this can be quite big, and can also
 * be recovered by simply running `yarn install` (which references the contents of package.json)
 * 7. Git commit messages should be in the imperative mood and describe what's been done. If I look at a commit history down the line
 * (either on GitHub or on the command line using `git log`) and see a message which reads 'tidied up code' I'll have no context as
 * to what's changed. See https://gist.github.com/robertpainsi/b632364184e70900af4ab688decf6f53 for some guidelines
 */

/**
 * Please let me know if you require any clarity on the above. We can have a chat once you've had time to digest it and we can
 * discuss any other queries you may have. Happy coding! :-)
 */
