//import { isEqual } from "lodash";
//import { isEqual } from "lodash";
const tests = []

/**
 * @param {string} name
 *
 */


function define_test(name, definition) {

    tests.push({ name, definition })
}

function runTests() {
    tests.forEach(({ name, definition }) => {
        console.error(name)
        try {
            definition();
            console.error(`✔️ Passed\n`)
        } catch (e) {
            console.error(`❌ Failed: ${e.message}\n`)
        }
    })
}

// testing the  attacks
function AssertEqual(obtained_array, expected_array, message) {
    const obtained = obtained_array.flat(Infinity);
    const expected = expected_array.flat(Infinity);

    if (JSON.stringify(obtained) !== JSON.stringify(expected)) {

        const errorMsg = [
            `Expected result is ${JSON.stringify(expected)}, not ${JSON.stringify(obtained)}`,
            message
        ].join(': ')
        throw new Error(errorMsg)
    }

}

function AssertEqual_string(obtained_str, expected_str, message) {

    if (JSON.stringify(obtained_str) !== JSON.stringify(expected_str)) {

        const errorMsg = [
            `Expected result is ${JSON.stringify(expected_str)}, not ${JSON.stringify(obtained_str)}`,
            message
        ].join(': ')
        throw new Error(errorMsg)
    }

}



/**
 * @param {() => void} fn
 * @param {string=} matchErrorMessage
 * @param {string=} message
 */
function assertThrowsError(fn, matchErrorMessage, message) {
    let thrownError = null
    try {
        fn()
    } catch (e) {
        thrownError = e
    }
    if (!thrownError) {
        const errorMsg = [
            `Expected function to throw error but it did not. File is not empty`

        ].filter(v => v)
            .join(': ')
        throw new Error(errorMsg)
    }
    if (matchErrorMessage && matchErrorMessage === thrownError.message) return
    const errorMsg = [
        ` Error message : "${matchErrorMessage}" `,
        message
    ].filter(v => v)
        .join(': ')
    throw new Error(errorMsg)
}

function createStub(pokemon, stubMethod, implementation) {
    const actualValue = pokemon[stubMethod]
    pokemon[stubMethod] = implementation
    return {
        restore: () => {
            pokemon[stubMethod] = actualValue;

        }
    }
}

module.exports = { define_test, runTests, assertThrowsError, AssertEqual, AssertEqual_string };