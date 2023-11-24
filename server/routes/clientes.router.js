const express = require("express")
const router = express.Router()

router.get("/", (req,res)=>{
  res.send("clientes")
})

router.get("/:id", (req,res) => {
  const {id} = req.params;
  res.json({
    id,
    name: "Eduardo",
    last_name: "Esqueda",
    company: "Capsule corp"
  })
})

router.post("/", (req,res) => {
  const body = req.body;
  res.json({
    message:"created",
    data: body
  })
})

router.patch("/:id", (req,res) => {
  const body = req.body;
  const {id} = req.params;
  res.json({
    message: "updated",
    data: body,
    id
  })
})

router.delete("/:id", (req, res) =>{
  const {id} = req.params;
  res.json({
    message:"deleted",
    id
  })
})


module.exports = router
