import { canvas as c } from '../../deps.ts'

type MoveInstruction = {
    type: 'move'
    magnitude: number
    turn: number
}

export type Instruction = {
    type: 'penup' | 'pendown'
} | MoveInstruction

function getRandomColor() {
    const colors = ['red', 'blue', 'green', 'black']
    const idx = Math.floor(Math.random() * 4)
    return colors[idx]
}

export function drawLinesFromInstructions(instructions: Instruction[]) {
    const canvas = c.createCanvas(200, 200)

    const ctx = canvas.getContext('2d')
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.strokeStyle = getRandomColor()

    let penDown = false
    let x = 0
    let y = 0
    let angle = 0

    ctx.beginPath()
    ctx.moveTo(x, y)

    for (const instruction of instructions) {
        switch (instruction.type) {
            case 'penup': {
                penDown = false
                break
            }
            case 'pendown': {
                penDown = true
                console.log('putting pen down')
                break
            }
            case 'move': {
                angle += instruction.turn * Math.PI / 180
                x += instruction.magnitude * Math.cos(angle)
                y += instruction.magnitude * Math.sin(angle)
                console.log('moving to', x, y)
                if (penDown) {
                    ctx.lineTo(x, y)
                } else {
                    ctx.moveTo(x, y)
                }
            }
        }
    }

    ctx.stroke()

    // Use canvas.toBuffer() or canvas.toDataURL() to get the image data
    return canvas.toBuffer()
}

// const instructions: Instruction[] = [
//     { type: 'move', magnitude: 100, turn: 0 },
//     { type: 'pendown' },
//     { type: 'move', magnitude: 100, turn: 60 },
//     { type: 'move', magnitude: 100, turn: 120 },
//     { type: 'move', magnitude: 100, turn: 120 },
//     // More instructions...
// ]

// const imageData = drawLinesFromInstructions(instructions)

// Deno.writeFileSync('res.png', imageData)
