function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const OPERATORS = ['+', '-', '*', '/'];

// Checks for leading zero in multi-digit numbers (e.g. "04", "012")
function hasLeadingZero(str: string): boolean {
  return /^0\d+/.test(str);
}

// Generates a single valid 8-character equation
function generateRandomEquation(): string | null {
  let attempts = 0;

  while (attempts < 1000) {
    attempts++;

    const termCount = Math.random() < 0.5 ? 2 : 3;

    let expr = '';
    let numbers: string[] = [];

    for (let i = 0; i < termCount; i++) {
      const num = getRandomInt(0, 99).toString();
      numbers.push(num);
      expr += num;

      if (i < termCount - 1) {
        const op = OPERATORS[getRandomInt(0, OPERATORS.length - 1)];
        expr += op;
      }
    }

    try {
      const result = eval(expr);

      if (!Number.isInteger(result) || result < 0) continue;

      const resultStr = result.toString();
      const equation = `${expr}=${resultStr}`;

      // Skip if total length not 8 or any part has leading zero
      const hasInvalidNumber = [...numbers, resultStr].some((num) =>
        hasLeadingZero(num)
      );

      if (equation.length === 8 && !hasInvalidNumber) {
        return equation;
      }
    } catch {
      continue;
    }
  }

  return null;
}

export default generateRandomEquation;
