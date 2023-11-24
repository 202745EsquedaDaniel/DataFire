const express = require("express")
const router = express.Router()

router.get("/", (req,res)=>{
  res.send("Proyectos")
})


router.get("/:id", (req,res) => {
  const {id} = req.params;
  res.json({
    id,
    name: "proyecto 1",
    fecha_inicio: "11/23/2023",
    fecha_fin:"11/24/2023"
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

module.exports = router;
