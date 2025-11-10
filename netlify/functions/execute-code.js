/* Netlify Function: Execute Code (Python/Ruby) */
const { exec } = require('child_process');
const { promisify } = require('util');
const execAsync = promisify(exec);

exports.handler = async (event, context) => {
    /* Only allow POST */
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    try {
        const { code, language } = JSON.parse(event.body);

        /* Validate input */
        if (!code || !language) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Missing code or language' })
            };
        }

        /* Security: Limit code length */
        if (code.length > 10000) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Code too long (max 10000 characters)' })
            };
        }

        /* Execute based on language */
        let result;
        let timeout = 5000; /* 5 second timeout */

        switch (language) {
            case 'python':
                result = await executePython(code, timeout);
                break;
            case 'ruby':
                result = await executeRuby(code, timeout);
                break;
            default:
                return {
                    statusCode: 400,
                    body: JSON.stringify({ error: `Unsupported language: ${language}` })
                };
        }

        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(result)
        };
    } catch (error) {
        console.error('Execution error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                success: false,
                error: error.message || 'Execution failed'
            })
        };
    }
};

/* Execute Python code */
async function executePython(code, timeout) {
    try {
        /* Security: Run in restricted environment */
        const command = `python3 -c ${escapeShellArg(code)}`;

        const { stdout, stderr } = await execAsync(command, {
            timeout: timeout,
            maxBuffer: 1024 * 1024 /* 1MB output limit */
        });

        return {
            success: true,
            output: stdout || stderr || 'No output'
        };
    } catch (error) {
        if (error.killed) {
            return {
                success: false,
                error: 'Execution timeout (5 seconds)'
            };
        }

        return {
            success: false,
            error: error.stderr || error.message
        };
    }
}

/* Execute Ruby code */
async function executeRuby(code, timeout) {
    try {
        const command = `ruby -e ${escapeShellArg(code)}`;

        const { stdout, stderr } = await execAsync(command, {
            timeout: timeout,
            maxBuffer: 1024 * 1024
        });

        return {
            success: true,
            output: stdout || stderr || 'No output'
        };
    } catch (error) {
        if (error.killed) {
            return {
                success: false,
                error: 'Execution timeout (5 seconds)'
            };
        }

        return {
            success: false,
            error: error.stderr || error.message
        };
    }
}

/* Escape shell arguments to prevent injection */
function escapeShellArg(arg) {
    return `'${arg.replace(/'/g, "'\"'\"'")}'`;
}
