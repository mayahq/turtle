import { Schema, Symbol } from '../../deps.ts'

class PenUp extends Symbol {
    static schema: Schema = {
        inputSchema: {
            accumulated: {
                allowedTypes: ['pulse', 'procedure', 'json'],
                description: 'List of steps upto this point.',
                displayName: 'Accumulated',
            },
        },
        outputSchema: {
            result: {
                type: 'eval' as 'pulse' | 'eval',
                description: 'The new list of steps so far, in order.',
                displayName: 'Result',
            },
        },
        editorProperties: {
            category: 'turtle',
            icon: '',
            color: 'green',
            paletteLabel: 'penUp',
        },
    }

    call: Symbol['call'] = async (ctx, vals, callback, _pulse) => {
        const steps = [...vals.accumulated, { type: 'penup' }]
        await ctx.set('turtleSteps', steps)

        // console.log('result', result)
        return callback({ result: steps })
    }
}

export default PenUp
