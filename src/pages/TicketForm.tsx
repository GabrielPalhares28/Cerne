import React, { useState } from "react";
import { Box, TextField, Button, Typography, MenuItem, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import cerneLogo from "../assets/cerne-logo.png";

const NovoChamado: React.FC = () => {
  const navigate = useNavigate();

  const [descricao, setDescricao] = useState<string>("");
  const [tipo, setTipo] = useState<string>("");
  const [imagem, setImagem] = useState<File | null>(null); // Estado para armazenar a imagem capturada
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleOpenCamera = async () => {
    try {
      const captureInput = document.createElement("input");
      captureInput.type = "file";
      captureInput.accept = "image/*";
      captureInput.capture = "environment"; // Abre a câmera do dispositivo
      captureInput.style.display = "none";

      captureInput.addEventListener("change", (event: any) => {
        if (event.target.files && event.target.files.length > 0) {
          setImagem(event.target.files[0]); // Salva a imagem capturada
        }
      });

      document.body.appendChild(captureInput);
      captureInput.click();
      document.body.removeChild(captureInput);
    } catch (error) {
      console.error("Erro ao abrir a câmera:", error);
    }
  };

  const handleSave = async () => {
    if (!descricao || !tipo) {
      setFeedback({ type: "error", message: "Preencha todos os campos antes de salvar." });
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("descricao", descricao);
      formData.append("tipo", tipo);
      if (imagem) {
        formData.append("imagem", imagem); // Adiciona a imagem capturada
      }

      const response = await axios.post("http://localhost:3000/chamados", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        setFeedback({ type: "success", message: "Chamado salvo com sucesso!" });
        setTimeout(() => navigate("/dashboard"), 2000);
      } else {
        throw new Error("Erro ao salvar chamado");
      }
    } catch (error) {
      setFeedback({ type: "error", message: "Ocorreu um erro ao salvar o chamado. Tente novamente." });
      console.error("Erro ao salvar chamado:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      sx={{
        background: "linear-gradient(180deg, #ffffff, #f0f4ff)",
        padding: 2,
      }}
    >
      <Box
        component="form"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        width="100%"
        maxWidth={360}
        bgcolor="white"
        borderRadius={3}
        boxShadow={3}
        padding={3}
        gap={2}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="flex-start"
          gap={2}
          marginBottom={2}
          width="100%"
        >
          <Box
            component="img"
            src={cerneLogo}
            alt="Logo CERNE"
            sx={{ width: 80 }}
          />
          <Box>
            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{
                color: "#071a5f",
                fontSize: "1.8rem",
              }}
            >
              CERNE
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                color: "#000000",
                fontSize: "1rem",
              }}
            >
              Novo Chamado
            </Typography>
          </Box>
        </Box>

        <TextField
          fullWidth
          label="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          variant="outlined"
          InputProps={{
            style: { borderRadius: 8 },
          }}
        />
        <TextField
          fullWidth
          select
          label="Tipo"
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          variant="outlined"
          InputProps={{
            style: { borderRadius: 8 },
          }}
        >
          <MenuItem value="manutencao">Manutenção</MenuItem>
          <MenuItem value="limpeza">Limpeza</MenuItem>
          <MenuItem value="abastecimento">Abastecimento</MenuItem>
        </TextField>

        {/* Botão para abrir a câmera */}
        <Button
          variant="outlined"
          onClick={handleOpenCamera}
          fullWidth
          sx={{
            borderRadius: 8,
            fontWeight: "bold",
          }}
        >
          {imagem ? imagem.name : "Abrir Câmera"}
        </Button>

        {feedback && (
          <Alert severity={feedback.type} onClose={() => setFeedback(null)}>
            {feedback.message}
          </Alert>
        )}

        <Button
          variant="contained"
          fullWidth
          color="primary"
          onClick={handleSave}
          disabled={isLoading}
          sx={{
            borderRadius: 8,
            padding: "10px 0",
            fontWeight: "bold",
            bgcolor: "#2F54EB",
            ":hover": {
              bgcolor: "#1d3bc2",
            },
          }}
        >
          {isLoading ? "Salvando..." : "Salvar"}
        </Button>
        <Button
          variant="outlined"
          fullWidth
          color="primary"
          onClick={() => navigate("/dashboard")}
          sx={{
            borderRadius: 8,
            padding: "10px 0",
            fontWeight: "bold",
            color: "#2F54EB",
            borderColor: "#2F54EB",
            ":hover": {
              bgcolor: "rgba(47, 84, 235, 0.1)",
              borderColor: "#1d3bc2",
            },
          }}
        >
          Cancelar
        </Button>
      </Box>
    </Box>
  );
};

export default NovoChamado;
