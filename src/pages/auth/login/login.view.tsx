import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaMusic } from 'react-icons/fa';
import { Button, IconButton, InputAdornment, TextField, Typography, Box } from '@mui/material';
import { IoEyeOff } from 'react-icons/io5';
import { BsEye } from 'react-icons/bs';
import { LoginFormInputs } from '../../types/global';
import SoundWaves from '../../../Components/effects-sound/sound-waves';
import Equalizer from '../../../Components/effects-sound/equalizer';
import { LoginService } from './login.service';
import { Context } from '../../../Context/AuthContext';

const schema = yup.object({
  email: yup.string().required('Campo Obrigatório'),
  password: yup.string().required('Campo Obrigatório'),
}).required();

const Login = () => {

  const service = new LoginService();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const { setIsAuthenticated, isAuthenticated } = useContext(Context)

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>({ resolver: yupResolver(schema) });

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const res = await service.login(data);

      if (res.token) {
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Falha ao realizar login:", error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);


  return (
    <main className="relative min-w-screen flex min-h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-br from-black via-purple-950 to-black p-4">
      <div className="absolute inset-0 opacity-20">
        <SoundWaves />
      </div>
      <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-5"></div>

      <div className="w-full max-w-md bg-black/40 backdrop-blur-md" >
        <div className="p-6 sm:p-8">
          <div className="mb-6 flex flex-col items-center justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-purple-500 p-3 shadow-[0_0_15px_rgba(219,39,119,0.5)]">
              <FaMusic className="h-8 w-8 text-white" aria-hidden="true" />
            </div>
            <Typography
              variant="h4"
              component="h1"
              className="mt-4 bg-gradient-to-r from-pink-500 via-purple-400 to-cyan-500 bg-clip-text text-3xl font-bold text-transparent"
            >
              StreamWave
            </Typography>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
            <div className="space-y-5">
              <div>
                <Box sx={{ position: 'relative', mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                    <FaEnvelope className="mr-2 text-pink-500" size={16} />
                    <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      E-mail
                    </Typography>
                  </Box>
                  <TextField
                    variant="outlined"
                    fullWidth
                    {...register("email")}
                    placeholder="Enter your username"
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
              </div>
              <div>
                <Box sx={{ position: 'relative', mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                    <FaLock className="mr-2 text-pink-500" size={16} />
                    <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      Senha
                    </Typography>
                  </Box>
                  <TextField
                    type={showPassword ? "text" : "password"}
                    variant="outlined"
                    fullWidth
                    {...register("password")}
                    placeholder="Enter your password"
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    autoComplete="current-password"
                    InputProps={{
                      sx: { borderRadius: "0.5rem" },
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label={showPassword ? "Hide password" : "Show password"}
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                            sx={{ color: "rgba(255, 255, 255, 0.7)" }}
                          >
                            {showPassword ? <IoEyeOff size={20} /> : <BsEye size={20} />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "rgba(219, 39, 119, 0.3)" },
                        "&:hover fieldset": { borderColor: "rgba(219, 39, 119, 0.5)" },
                        "&.Mui-focused fieldset": { borderColor: "rgba(219, 39, 119, 0.8)" },
                      },
                      "& .MuiInputLabel-root": {
                        color: "rgba(255, 255, 255, 0.7)",
                      },
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: "rgba(219, 39, 119, 0.8)",
                      },
                      "& .MuiInputBase-input": {
                        color: "white",
                      },
                    }}
                  />
                </Box>
              </div>

              {/* <FormControlLabel
                control={
                  <Checkbox
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    name="rememberMe"
                    sx={{
                      color: "rgba(219, 39, 119, 0.5)",
                      "&.Mui-checked": {
                        color: "rgba(219, 39, 119, 0.8)",
                      },
                    }}
                  />
                }
                label={<Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.7)" }}>Lembre-me</Typography>}
              /> */}
            </div>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              className="relative overflow-hidden py-3 text-white transition-all"
              sx={{
                background: "linear-gradient(to right, #ec4899, #9333ea)",
                "&:hover": {
                  background: "linear-gradient(to right, #db2777, #7e22ce)",
                  boxShadow: "0 0 15px rgba(219, 39, 119, 0.5)",
                },
                borderRadius: "0.5rem",
                height: "48px",
              }}
            >
              {/* {isSubmitting ? (
                <CircularProgress
                  size={24}
                  sx={{
                    color: "white",
                  }}
                />
              ) : (
                "LOGIN"
              )} */}
              LOGIN
            </Button>
          </form>
          <div className="mt-8 flex justify-center">
            <Equalizer />
          </div>
          <Typography variant="body2" className="mt-6 text-center text-sm text-gray-400">
            Ainda não tem uma conta?
            <NavLink to="/register" className="font-medium text-pink-500 hover:text-pink-400">
              Cadastre-se
            </NavLink>
          </Typography>
        </div>
      </div>
    </main>
  );
};

export default Login;
