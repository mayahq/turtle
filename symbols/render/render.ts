import { base64Encode, Schema, Symbol } from '../../deps.ts'
import { drawLinesFromInstructions, Instruction } from './canvas.ts'

class Render extends Symbol {
    static schema: Schema = {
        inputSchema: {
            steps: {
                allowedTypes: ['procedure', 'pulse', 'json'],
                description: 'The list of steps to render, in order.',
                displayName: 'Steps',
                defaultType: 'pulse',
                defaultValue: 'accumulated',
            },
        },
        outputSchema: {
            result: {
                type: 'eval' as 'pulse' | 'eval',
                description: 'Base64 representation of resulting image after rendering the steps.',
                displayName: 'Result',
            },
        },
        editorProperties: {
            category: 'turtle',
            icon: '',
            color: 'green',
            paletteLabel: 'render',
        },
    }

    call: Symbol['call'] = async (_ctx, vals, callback, _pulse) => {
        const steps: Instruction[] = vals.steps
        const imageBuffer = drawLinesFromInstructions(steps)

        return callback({ result: base64Encode(imageBuffer) })
    }
}

export default Render
