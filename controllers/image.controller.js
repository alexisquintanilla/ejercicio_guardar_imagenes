import { nanoid } from 'nanoid'
import jimp from 'jimp'
import path from "path"
import nodemailer from 'nodemailer'

const __dirname = import.meta.dirname

const guardarImagen = async (req, res) => {
    try {
        const url = req.body.url

        const image = await jimp.read(url)
        const buffer = await image
            .resize(500, 500)
            .quality(60)
            .greyscale()
            .getBufferAsync("image/jpeg")

        const pathFile = path.join(__dirname, `../public/images/${nanoid()}.jpeg`)
        await image.writeAsync(pathFile)

        res.render('exito', { success: true })

        // res.setHeader("Content-Type", "image/jpeg")
        // res.send(buffer)

    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

const getInicio = (req, res) => {
    res.render('inicio')
}

const sendEmail = async (req, res) => {
    //proveedor smtp
    const transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    try {
        await transport.sendMail({
            from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
            to: "bar@example.com, baz@example.com", // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>", // html body
        });

        return res.json({ ok: true })
    } catch (error) {
        console.log(error)
        return res.send(error)
    }
}

export const imageController = {
    guardarImagen,
    getInicio,
    sendEmail
}