require("../config/config")

const idToken = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjY5NGNmYTAxOTgyMDNlMjgwN2Q4MzRkYmE2MjBlZjczZjI4ZTRlMmMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcHJ1ZWJhLTVlY2Q0IiwiYXVkIjoicHJ1ZWJhLTVlY2Q0IiwiYXV0aF90aW1lIjoxNjM2NDc3OTc4LCJ1c2VyX2lkIjoiMWtiZjFyOHMzNWNsV2lUYUtWMDM1MlJ3eWQ3MyIsInN1YiI6IjFrYmYxcjhzMzVjbFdpVGFLVjAzNTJSd3lkNzMiLCJpYXQiOjE2MzY0Nzc5NzgsImV4cCI6MTYzNjQ4MTU3OCwiZW1haWwiOiJmcmFuY2lzY28ubW9yb3NpbmlAc21hbmRlcy5jb20uYXIiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsiZnJhbmNpc2NvLm1vcm9zaW5pQHNtYW5kZXMuY29tLmFyIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.Imm2NDcAoh8_w6ewAHRBN2Otote3evV6VcSahHPeYmb913ZsLd6XJnTk0z0g2oJj7HkPF5Nmo1nYDibRtXGLLMPMIU8SnOkGjfWHgrSw-7vEiBWjl9e3mUnhXHQAoWLUP0PsvYfdoqQiIlE9NwRRr7T3Iy5fHhdtlG0ovMEsREepdewQCqmd_JYE2CCzyspcl0C-r2F8ZOz4KtyH7pkm-QdlprGwolCP7sJaMnEwvXux0c8m6WDKqAO08exORR8RPO6-2mBmp4QnWN1uY4KM7r-Da8bEmFIcomNL6j1FWsKxFYLdCbTcf9ScRXIrls4287yy7AT9uX8WiAViRSA0sw"

const verificaToken = require("./verificaToken")

const verificaAuth = (req,res,next) => {

    
    verificaToken(idToken)
    .then((usuario) => {
        req.usuario = usuario.email
        next()
    })
    .catch((error) => {
        req.usuario = null
        next()
    })
    
    

}



module.exports = { verificaAuth }