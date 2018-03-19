const NUMBER_OF_APPLES = 100;
const APPLE_WIDTH = 34;
const APPLE_HEIGHT = 46;

// This computes all the possible collision points for the
// generated apples. This is NOT the best approach since the more
// apples there are, the longer it takes to create the collision object.
// Someone should work on a better collision detection algorithm
const getAreaCoords = (apple) => {
    let halfAppleHeight = APPLE_HEIGHT / 2;
    let halfAppleWidth = APPLE_WIDTH / 2;

    let appleQ1Q3X = apple.x - halfAppleWidth;
    let appleQ2Q4X = apple.x + halfAppleWidth;
    let appleQ1Q2Y = apple.y + halfAppleHeight;
    let appleQ3Q4Y = apple.y - halfAppleHeight;

    let upperLeftCorner = {
        x: appleQ1Q3X,
        y: appleQ1Q2Y
    };

    let upperRightCorner = {
        x: appleQ2Q4X,
        y: appleQ1Q2Y
    };

    let lowerLeftCorner = {
        x: appleQ1Q3X,
        y: appleQ3Q4Y
    };

    let lowerRightCorner = {
        x: appleQ2Q4X,
        y: appleQ3Q4Y
    };

    let appleAreaCoords = {};

    // Iterate through each x column on the y row
    for (let row = upperLeftCorner.y; row >= lowerLeftCorner.y; row --) {
        for (let column = upperLeftCorner.x; column <= upperRightCorner.x; column ++) {
            // Create a unique key to look up the collision... (check for negative since we can't use "-" in a property name)
            appleAreaCoords[`${column < 0 ? 'N' + column * -1 : column}.${row < 0 ? 'N' + row * -1 : row}`] = {
                appleId: apple.id
            };
        }
    }
    return appleAreaCoords;
};

const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const load = () => {
    let apples = [];
    let appleCollisionCoords = {};

    console.log('LOADING APPLES');
    for (let i = 0; i < NUMBER_OF_APPLES; i++) {
        let apple = {
            id: i,
            color: '#be0000',
            x: getRandomInt(0, 2000),
            y: getRandomInt(0, 2000)
        };

        apples.push(apple);
        appleCollisionCoords = Object.assign({}, appleCollisionCoords, getAreaCoords(apple));
    }
    console.log('FINISHED!');

    return { apples, appleCollisionCoords };
};

module.exports = {
    load
};