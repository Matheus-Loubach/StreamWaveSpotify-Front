import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Box
} from '@mui/material';
import { FaMusic, FaUser, FaEnvelope, FaLock, FaCheckCircle } from 'react-icons/fa';
import Equalizer from '../../../Components/effects-sound/equalizer';
import SoundWaves from '../../../Components/effects-sound/sound-waves';
import { RegisterService } from './register.service';
import { IRegisterData } from '../../types/global';


const schema = yup.object().shape({
  name: yup.string().required("Usuário obrigatório"),
  email: yup.string().email("E-mail inválido").required("E-mail obrigatório"),
  password: yup.string().min(6, "Senha deve ter no mínimo 6 caracteres").required("Senha obrigatória"),
  passwordConf: yup.string().oneOf([yup.ref("password")], "Senhas devem ser iguais").required("Confirmação obrigatória"),
});

export default function RegisterPage() {

  const service = new RegisterService();

  const { register, handleSubmit, formState: { errors }, reset } = useForm<IRegisterData>({
    resolver: yupResolver(schema)
  });


  const onSubmit = async (data: IRegisterData) => {
    const res = await service.register(data);
    if (res) {
      console.log('Registro efetuado');
    }
  };

  return (
    <main className="relative flex min-w-screen min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-black via-purple-950 to-black">
      <div className="absolute inset-0 opacity-20">
        <SoundWaves />
      </div>

      <Card sx={{
        maxWidth: '28rem',
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        backdropFilter: 'blur(8px)',
        zIndex: 10,
      }}>
        <CardContent sx={{ padding: 4 }}>
          <div className="mb-6 flex flex-col items-center justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-purple-500 p-3 shadow-[0_0_15px_rgba(219,39,119,0.5)]">
              <FaMusic className="h-8 w-8 text-white" />
            </div>
            <Typography
              variant="h4"
              component="h1"
              sx={{
                marginTop: 2,
                fontWeight: 'bold',
                background: 'linear-gradient(to right, #ec4899, #a855f7, #06b6d4)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              STREAM WAVE
            </Typography>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Box sx={{ position: 'relative', mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                <FaUser className="mr-2 text-pink-500" size={16} />
                <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  Usuário
                </Typography>
              </Box>
              <TextField
                fullWidth
                placeholder="Usuário"
                {...register('name')}
                error={!!errors.name}
                helperText={errors.name?.message}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    '& fieldset': {
                      borderColor: 'rgba(219, 39, 119, 0.3)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(219, 39, 119, 0.5)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'rgba(219, 39, 119, 0.8)',
                    },
                  },
                  '& .MuiInputBase-input': {
                    color: 'white',
                  },
                  '& .MuiFormHelperText-root': {
                    color: '#f43f5e',
                  },
                }}
              />
            </Box>

            <Box sx={{ position: 'relative', mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                <FaEnvelope className="mr-2 text-pink-500" size={16} />
                <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  E-mail
                </Typography>
              </Box>
              <TextField
                fullWidth
                type="email"
                placeholder="Seu melhor E-mail"
                {...register('email')}
                error={!!errors.email}
                helperText={errors.email?.message}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    '& fieldset': {
                      borderColor: 'rgba(219, 39, 119, 0.3)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(219, 39, 119, 0.5)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'rgba(219, 39, 119, 0.8)',
                    },
                  },
                  '& .MuiInputBase-input': {
                    color: 'white',
                  },
                  '& .MuiFormHelperText-root': {
                    color: '#f43f5e',
                  },
                }}
              />
            </Box>

            <Box sx={{ position: 'relative', mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                <FaLock className="mr-2 text-pink-500" size={16} />
                <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  Senha
                </Typography>
              </Box>
              <TextField
                fullWidth
                type="password"
                placeholder="Crie uma senha"
                {...register('password')}
                error={!!errors.password}
                helperText={errors.password?.message}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    '& fieldset': {
                      borderColor: 'rgba(219, 39, 119, 0.3)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(219, 39, 119, 0.5)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'rgba(219, 39, 119, 0.8)',
                    },
                  },
                  '& .MuiInputBase-input': {
                    color: 'white',
                  },
                  '& .MuiFormHelperText-root': {
                    color: '#f43f5e',
                  },
                }}
              />
            </Box>

            <Box sx={{ position: 'relative', mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                <FaCheckCircle className="mr-2 text-pink-500" size={16} />
                <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  Confirmar Senha
                </Typography>
              </Box>
              <TextField
                fullWidth
                type="password"
                placeholder="Confirme sua senha"
                {...register('passwordConf')}
                error={!!errors.passwordConf}
                helperText={errors.passwordConf?.message}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    '& fieldset': {
                      borderColor: 'rgba(219, 39, 119, 0.3)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(219, 39, 119, 0.5)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'rgba(219, 39, 119, 0.8)',
                    },
                  },
                  '& .MuiInputBase-input': {
                    color: 'white',
                  },
                  '& .MuiFormHelperText-root': {
                    color: '#f43f5e',
                  },
                }}
              />
            </Box>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                marginTop: 3,
                padding: '0.75rem 0',
                background: 'linear-gradient(to right, #ec4899, #9333ea)',
                '&:hover': {
                  background: 'linear-gradient(to right, #db2777, #7e22ce)',
                },
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* {isSubmitting ? (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CircularProgress size={20} sx={{ color: 'white', mr: 1 }} />
                  Cadastrando...
                </Box>
              ) : ( */}
              Cadastrar
              {/* // )} */}
            </Button>
          </form>

          <div className="mt-8 flex justify-center">
            <Equalizer />
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
