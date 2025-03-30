import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    Grid,
    Typography,
    TextField,
    Button,
    IconButton,
    Divider,
    Box,
    makeStyles
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import backgroundImage from '../../assets/Rustreels/Branding/login_image.png';
import logo from '../../assets/Rustreels/Branding/Logo/logo.png';

// You'll need to import or create icons for Discord, Passkey, Google, Twitter (X), Telegram, Discord, and WhatsApp
// For this example, I'll use Material UI icons where possible and placeholders for others

const useStyles = makeStyles((theme) => ({
    dialog: {
        '& .MuiDialog-paper': {
            borderRadius: 8,
            backgroundColor: '#111',
            color: 'white',
            maxWidth: 810,
            margin: 0,
        },
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: 'white',
        zIndex: 1,
    },
    leftSide: {
        position: 'relative',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: 500,
        padding: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            opacity: 0.7,
            zIndex: -1,
        },
        '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(to bottom, rgba(30,30,30,0.5), rgba(30,30,30,0.8)), url("grid.png")',
            backgroundSize: '10px 10px',
            zIndex: -1,
        }
    },
    rightSide: {
        padding: theme.spacing(3, 5),
        backgroundColor: '#1C141B',
    },
    logoContainer: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: theme.spacing(2),
    },
    logo: {
        marginRight: theme.spacing(1),
        height: 40,
        width: 40,
    },
    brandName: {
        fontSize: 20,
    },
    promoText: {
        color: '#d542f5',
        marginTop: theme.spacing(15),
        marginBottom: theme.spacing(1),
    },
    rakeback: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: theme.spacing(2),
    },
    disclaimer: {
        color: '#aaa',
        textAlign: 'center',
        fontSize: 14,
        marginTop: 'auto',
    },
    termsLink: {
        color: '#aaa',
        textDecoration: 'underline',
        cursor: 'pointer',
        '&:hover': {
            color: 'white',
        },
    },
    socialIcons: {
        display: 'flex',
        gap: theme.spacing(1),
        justifyContent: 'center',
        marginTop: theme.spacing(2),
    },
    socialIcon: {
        backgroundColor: 'rgba(255,255,255,0.1)',
        color: 'white',
        padding: "6px 9px",
        borderRadius: "8px",
        '&:hover': {
            backgroundColor: 'rgba(255,255,255,0.2)',
        },
    },
    title: {
        fontSize: 18,
        marginBottom: theme.spacing(3),
    },
    input: {
        marginBottom: theme.spacing(2),
        '& .MuiOutlinedInput-root': {
            color: 'white',
            '& fieldset': {
                borderColor: 'rgba(255,255,255,0.2)',
            },
            '&:hover fieldset': {
                borderColor: 'rgba(255,255,255,0.4)',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#d542f5',
            },
        },
        '& .MuiFormLabel-root': {
            color: 'rgba(255,255,255,0.7)',
        },
    },
    forgotPassword: {
        textAlign: 'right',
        marginBottom: theme.spacing(2),
        '& a': {
            color: 'white',
            textDecoration: 'none',
            '&:hover': {
                textDecoration: 'underline',
            },
        },
    },
    signInButton: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(1.5),
        backgroundColor: '#ffc107',
        background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
        color: 'black',
        fontWeight: 'bold',
        '&:hover': {
            backgroundColor: '#FFA000',
        },
    },
    createAccountText: {
        textAlign: 'center',
        marginBottom: theme.spacing(3),
    },
    createAccountLink: {
        color: '#d542f5',
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline',
        },
    },
    dividerContainer: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: theme.spacing(3),
    },
    divider: {
        flexGrow: 1,
        backgroundColor: 'rgba(255,255,255,0.2)',
    },
    dividerText: {
        margin: theme.spacing(0, 2),
        color: 'rgba(255,255,255,0.7)',
    },
    passkeyButton: {
        marginBottom: theme.spacing(2),
        padding: theme.spacing(1.2),
        color: 'white',
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderColor: 'rgba(255,255,255,0.3)',
        '&:hover': {
            backgroundColor: 'rgba(255,255,255,0.2)',
        },
    },
    socialLogin: {
        display: 'flex',
        justifyContent: 'center',
        gap: theme.spacing(1),
        marginTop: theme.spacing(2),
    },
    socialLoginButton: {
        minWidth: 'auto',
        padding: "8px 12px",
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: theme.spacing(1),
        '&:hover': {
            backgroundColor: 'rgba(255,255,255,0.2)',
        },
    },
    passwordField: {
        position: 'relative',
    },
    visibilityIcon: {
        position: 'absolute',
        right: 10,
        top: '50%',
        transform: 'translateY(-50%)',
        cursor: 'pointer',
        color: 'rgba(255,255,255,0.7)',
    },
    promoContainer: {
        marginTop: theme.spacing(15),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    }
}));

const LoginModal = ({ open, onClose }) => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            className={classes.dialog}
            maxWidth="md"
            fullWidth
        >
            <IconButton className={classes.closeButton} onClick={onClose}>
                <CloseIcon />
            </IconButton>

            <DialogContent style={{ padding: 0 }}>
                <Grid container>
                    {/* Left side with promo */}
                    <Grid item xs={12} md={6} className={classes.leftSide}>
                        <div>
                            <div className={classes.logoContainer}>
                                <img src={logo} alt="Logo" className={classes.logo} />
                                <Typography className={classes.brandName}>RUST REELS</Typography>
                            </div>
                        </div>

                        <div className={classes.promoContainer}>
                            <Typography className={classes.promoText}>SIGN UP & GET</Typography>
                            <Typography className={classes.rakeback}>50% RAKE BACK</Typography>

                            <Typography className={classes.disclaimer}>
                                By accessing this site, I confirm that at least<br />
                                18 years old and have read and agree to the<br />
                                <span className={classes.termsLink}>Terms of Service</span>.
                            </Typography>

                            <div className={classes.socialIcons}>
                                <IconButton size="small" className={classes.socialIcon}>
                                    <TwitterIcon fontSize="small" />
                                </IconButton>
                                <IconButton size="small" className={classes.socialIcon}>
                                    {/* Discord icon placeholder */}
                                    <span role="img" aria-label="discord">📱</span>
                                </IconButton>
                                <IconButton size="small" className={classes.socialIcon}>
                                    <InstagramIcon fontSize="small" />
                                </IconButton>
                            </div>
                        </div>
                    </Grid>

                    {/* Right side with login form */}
                    <Grid item xs={12} md={6} className={classes.rightSide}>
                        <Typography className={classes.title}>Sign In</Typography>

                        <TextField
                            className={classes.input}
                            variant="outlined"
                            fullWidth
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <div className={classes.passwordField}>
                            <TextField
                                className={classes.input}
                                variant="outlined"
                                fullWidth
                                placeholder="Enter Password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <div className={classes.visibilityIcon} onClick={togglePasswordVisibility}>
                                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </div>
                        </div>

                        <div className={classes.forgotPassword}>
                            <a href="#">Forgot Your Password?</a>
                        </div>

                        <Button
                            variant="contained"
                            fullWidth
                            className={classes.signInButton}
                        >
                            Sign In
                        </Button>

                        <div className={classes.createAccountText}>
                            New to RUST REELS? <a href="#" className={classes.createAccountLink}>Create Account.</a>
                        </div>

                        <div className={classes.dividerContainer}>
                            <Divider className={classes.divider} />
                            <Typography className={classes.dividerText}>OR Log In With</Typography>
                            <Divider className={classes.divider} />
                        </div>

                        <Button
                            variant="outlined"
                            fullWidth
                            className={classes.passkeyButton}
                            startIcon={<Box component="span" role="img" aria-label="key">🔑</Box>}
                        >
                            Log In With Passkey
                        </Button>

                        <div className={classes.socialLogin}>
                            <Button className={classes.socialLoginButton}>
                                <Box component="span" role="img" aria-label="google">G</Box>
                            </Button>
                            <Button className={classes.socialLoginButton}>
                                <Box component="span" role="img" aria-label="twitter">𝕏</Box>
                            </Button>
                            <Button className={classes.socialLoginButton}>
                                <Box component="span" role="img" aria-label="telegram">✈️</Box>
                            </Button>
                            <Button className={classes.socialLoginButton}>
                                <Box component="span" role="img" aria-label="discord">👾</Box>
                            </Button>
                            <Button className={classes.socialLoginButton}>
                                <Box component="span" role="img" aria-label="whatsapp">📱</Box>
                            </Button>
                        </div>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    );
};

export default LoginModal;