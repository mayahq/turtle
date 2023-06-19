import { Schema, Symbol } from '../../deps.ts'

class PenDown extends Symbol {
    static schema: Schema = {
        inputSchema: {
            accumulated: {
                allowedTypes: ['pulse', 'procedure', 'json'],
                description: 'List of steps upto this point.',
                displayName: 'Accumulated',
                defaultType: 'pulse',
                defaultValue: 'accumulated',
            },
        },
        outputSchema: {
            accumulated: {
                type: 'eval' as 'pulse' | 'eval',
                description: 'The new list of steps so far, in order.',
                displayName: 'Result',
            },
        },
        editorProperties: {
            category: 'turtle',
            icon: '',
            color: 'green',
            paletteLabel: 'penDown',
        },
    }

    call: Symbol['call'] = async (ctx, vals, callback, _pulse) => {
        const accumulated = Array.isArray(vals.accumulated) ? vals.accumulated : []
        const steps = [...accumulated, { type: 'pendown' }]
        await ctx.set('turtleSteps', steps)

        // console.log('result', result)
        return callback({ accumulated: steps })
    }
}

export default PenDown
