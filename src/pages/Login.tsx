import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import cerneLogo from "../assets/cerne-logo.png"; // Certifique-se de que a imagem está em src/assets

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  // Função para verificar as credenciais
  const handleLogin = () => {
    const validEmail = "gabrielpalhares764@gmail.com";
    const validPassword = "12345";

    // Verificando se o e-mail e senha correspondem
    if (email === validEmail && password === validPassword) {
      setError(""); // Limpa a mensagem de erro
      navigate("/dashboard"); // Redireciona para o Dashboard
    } else {
      setError("Usuário ou senha incorretos."); // Exibe mensagem de erro
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
          gap={2} // Espaçamento entre a logo e o texto
          marginBottom={2} // Espaçamento entre o header e o restante do card
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
              Sistema de Chamados
            </Typography>
          </Box>
        </Box>

        {/* Campos de formulário */}
        <TextField
          fullWidth
          label="Usuário"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          InputProps={{
            style: { borderRadius: 8 },
          }}
        />
        <TextField
          fullWidth
          label="Senha"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            style: { borderRadius: 8 },
          }}
        />
        {error && (
          <Typography
            variant="body2"
            color="error"
            sx={{ marginTop: 1, textAlign: "center" }}
          >
            {error}
          </Typography>
        )}
        <Button
          variant="contained"
          fullWidth
          color="primary"
          onClick={handleLogin}
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
          Entrar
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
