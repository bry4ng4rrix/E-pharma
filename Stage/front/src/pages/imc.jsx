import React, { useState, useRef } from 'react';
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  IconButton,
  Tooltip,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { VolumeUp as VolumeUpIcon } from '@mui/icons-material';

const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  marginTop: theme.spacing(3),
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
}));

const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    marginBottom: '1rem',
  },
});

const IMCPage = () => {
  const [formData, setFormData] = useState({
    taille: '',
    poids: '',
    age: '',
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const utteranceRef = useRef(null);

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      setIsSpeaking(true);
      
      // Créer une nouvelle utterance
      utteranceRef.current = new SpeechSynthesisUtterance(text);
      
      // Configurer la voix
      utteranceRef.current.lang = 'fr-FR';
      utteranceRef.current.rate = 1;
      utteranceRef.current.pitch = 1;
      
      // Événements de fin de lecture
      utteranceRef.current.onend = () => {
        setIsSpeaking(false);
      };
      
      // Commencer la lecture
      window.speechSynthesis.speak(utteranceRef.current);
    } else {
      alert('Votre navigateur ne supporte pas la synthèse vocale.');
    }
  };

  const stopSpeaking = () => {
    if (utteranceRef.current && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('http://localhost:8000/api/imc/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Une erreur est survenue');
      }

      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Calculateur d'IMC
        </Typography>
        <StyledCard>
          <form onSubmit={handleSubmit}>
            <StyledTextField
              fullWidth
              type="number"
              label="Taille (cm)"
              name="taille"
              value={formData.taille}
              onChange={handleChange}
              required
            />
            <StyledTextField
              fullWidth
              type="number"
              label="Poids (kg)"
              name="poids"
              value={formData.poids}
              onChange={handleChange}
              required
            />
            <StyledTextField
              fullWidth
              type="number"
              label="Âge"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
              sx={{ mt: 2 }}
            >
              {loading ? <CircularProgress size={24} /> : 'Calculer'}
            </Button>
          </form>

          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}

          {result && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" gutterBottom>
                Résultats
              </Typography>
              <Typography variant="body1" gutterBottom>
                Votre IMC est : {result.imc}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Catégorie : {result.categorie}
              </Typography>
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Conseils
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body1" sx={{ flex: 1 }}>
                  {result.conseils}
                </Typography>
                <Tooltip title={isSpeaking ? 'Arrêter la lecture' : 'Lire à voix haute'}>
                  <IconButton
                    onClick={() => {
                      if (isSpeaking) {
                        stopSpeaking();
                      } else {
                        speakText(result.conseils);
                      }
                    }}
                    sx={{ ml: 1 }}
                  >
                    <VolumeUpIcon color={isSpeaking ? 'primary' : 'action'} />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          )}
        </StyledCard>
      </Box>
    </Container>
  );
};

export default IMCPage;