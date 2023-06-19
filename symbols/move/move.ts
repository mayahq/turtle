import { Schema, Symbol } from '../../deps.ts'

class Move extends Symbol {
    static schema: Schema = {
        inputSchema: {
            magnitude: {
                allowedTypes: ['procedure', 'pulse', 'number'],
                description: 'How much to read',
                displayName: 'Magnitude',
            },
            turn: {
                allowedTypes: ['procedure', 'pulse', 'number'],
                description: 'The degrees by which to turn to the right.',
                displayName: 'Turn',
            },
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
            paletteLabel: 'move',
        },
    }

    call: Symbol['call'] = async (ctx, vals, callback, _pulse) => {
        const accumulated = Array.isArray(vals.accumulated) ? vals.accumulated : []
        const steps = [...accumulated, { type: 'move', magnitude: vals.magnitude, turn: vals.turn }]
        await ctx.set('turtleSteps', steps)

        // console.log('result', result)
        return callback({ accumulated: steps })
    }
}

export default Move
