import React, { useState } from "react";
import { Box, TextField, Button, Typography, MenuItem, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Biblioteca para requisições HTTP
import cerneLogo from "../assets/cerne-logo.png"; // Certifique-se de que a imagem está no caminho correto

const NovoChamado: React.FC = () => {
  const navigate = useNavigate();

  const [descricao, setDescricao] = useState<string>("");
  const [tipo, setTipo] = useState<string>("");
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false); // Para exibir estado de carregamento

  const handleSave = async () => {
    if (!descricao || !tipo) {
      setFeedback({ type: "error", message: "Preencha todos os campos antes de salvar." });
      return;
    }

    setIsLoading(true);

    try {
      // Enviar o chamado para o backend com a URL corrigida
      const response = await axios.post("http://localhost:3000/chamados", {
        descricao,
        tipo,
      });

      if (response.status === 201) {
        setFeedback({ type: "success", message: "Chamado salvo com sucesso!" });

        // Redirecionar após um curto intervalo
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
        background: "linear-gradient(180deg, #ffffff, #f0f4ff)", // Fundo gradiente
        padding: 2,
      }}
    >
      {/* Card principal com conteúdo */}
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
        {/* Logo, Título e Subtítulo */}
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
            sx={{ width: 80 }} // Tamanho da logo ajustado
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

        {/* Campos do formulário */}
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

        {/* Feedback Visual */}
        {feedback && (
          <Alert severity={feedback.type} onClose={() => setFeedback(null)}>
            {feedback.message}
          </Alert>
        )}

        {/* Botões */}
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
