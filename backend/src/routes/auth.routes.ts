import express from "express";
const router = express.Router();

router.post("/register", (req, res) => {
  res.json({ message: "Registro realizado com sucesso!" });
});

router.post("/login", (req, res) => {
  res.json({ message: "Login realizado com sucesso!" });
});

router.post("/logout", (req, res) => {
  res.json({ message: "Logout realizado com sucesso!" });
});

export default router;
