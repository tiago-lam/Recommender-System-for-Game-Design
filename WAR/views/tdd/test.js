function testSquare(input, expectedOutput)
{
    var output = square(input);
    return expectedOutput == output;
}

function squareWorks()
{
    return testSquare(2, 4)
        && testSquare(3, 9)
        && testSquare(-2, 4)
        && testSquare(0, 0);
}

function square(n)
{
    return n+2;
}
