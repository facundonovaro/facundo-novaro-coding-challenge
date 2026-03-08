// Type declaration for Node.js process (without external dependencies)
declare const process: {
    exit(code?: number): never;
} | undefined;

type TestResult = {
    name: string;
    passed: boolean;
    error?: string;
};

const testResults: TestResult[] = [];

export function expect<T>(actual: T) {
    return {
        toEqual: (expected: T) => {
            if (typeof actual === 'function') {
                throw new Error('toEqual cannot be used with a function. Call the function first or use toThrow to test errors.');
            }
            const actualStr = JSON.stringify(actual);
            const expectedStr = JSON.stringify(expected);
            if (actualStr !== expectedStr) {
                throw new Error(`Expected ${expectedStr}, but got ${actualStr}`);
            }
        },
        toThrow: (expectedError?: string) => {
            if (typeof actual !== 'function') {
                throw new Error('toThrow can only be used with a function');
            }
            try {
                actual();
                throw new Error('Expected function to throw, but it did not');
            } catch (error) {
                if (expectedError && error instanceof Error) {
                    if (error.message !== expectedError) {
                        throw new Error(`Expected error message to be exactly "${expectedError}", but got "${error.message}"`);
                    }
                }
            }
        }
    };
}

export function test(name: string, testFn: () => void) {
    try {
        testFn();
        testResults.push({ name, passed: true });
        console.log(`✓ ${name}`);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        testResults.push({ name, passed: false, error: errorMessage });
        console.error(`✗ ${name}`);
        console.error(`  Error: ${errorMessage}`);
    }
}

export function runTests() {
    console.log('\nRunning tests...\n');
    const passed = testResults.filter(r => r.passed).length;
    const total = testResults.length;
    console.log(`\n${passed}/${total} tests passed`);

    if (passed < total) {
        console.error('\nFailed tests:');
        testResults
            .filter(r => !r.passed)
            .forEach(r => {
                console.error(`  - ${r.name}: ${r.error}`);
            });
        if (typeof process !== 'undefined') {
            process.exit(1);
        }
    } else {
        console.log('\nAll tests passed! ✓');
        if (typeof process !== 'undefined') {
            process.exit(0);
        }
    }
}
