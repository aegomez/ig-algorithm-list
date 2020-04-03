/// ----- Racing Car ----- ///

/*
 * Complete the 'minimumMovement' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts INTEGER_ARRAY obstacleLanes as parameter.
 */

export function minimumMovement(obstacleLanes: number[]): number {
    // Write your code here
    let moves = 0;

    // Car current lane
    let currentLane = 2;
    // Alternative choice after a lane change, if >0:
    // path can be corrected without increasing moves
    let alternative = 0;
    let temp = 0;

    for (let i = 0, len = obstacleLanes.length; i < len; i++) {
        let obstacle = obstacleLanes[i];

        if (obstacle === currentLane) {
            if (alternative) {
                // correct the path without increasing moves
                currentLane = alternative;
                alternative = 0;
            } else {
                // change lane and save the other path in
                // case we made the wrong choice
                temp = currentLane;
                currentLane = (currentLane % 3) + 1;
                alternative = ((temp + 1) % 3) + 1;
                moves++;
            }
        } else if (obstacle === alternative) {
            // alternative is not longer valid
            alternative = 0;
        }
    }

    return moves;
}
