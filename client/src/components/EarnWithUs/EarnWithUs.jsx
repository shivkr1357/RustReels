import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, Button } from "@material-ui/core";
import MainLayout from "../Layout/MainLayout";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import ContentCopyIcon from '@material-ui/icons/FileCopy';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import qrImage from "../../assets/qr-image.png";
import giftIcon from "../../assets/gift-icon.png";
import letterSymbol from "../../assets/letter-symbol.png";
// import QRCode from 'qrcode.react';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    width: "100%",
    margin: "0 auto 20px",
    overflow: "hidden",
    borderRadius: "10px",
    padding: "20px",
    [theme.breakpoints.down('sm')]: {
      padding: "10px",
    }
  },
  header: {
    display: "flex",
    alignItems: "center",
    marginBottom: "30px",
    gap: "15px",
    color: "#fff",
    "& .backButton": {
      display: "flex",
      alignItems: "center",
      gap: "5px",
      color: "#666",
      cursor: "pointer",
      textDecoration: "none",
      fontSize: "14px",
      "&:hover": {
        color: "#fff"
      }
    }
  },
  titleSection: {
    marginBottom: "30px",
    "& hr": {
      border: "none",
      borderTop: "1px solid #2A1F2D",
      margin: "15px 0"
    }
  },
  mainContent: {
    display: "flex",
    gap: "20px",
    [theme.breakpoints.down('sm')]: {
      flexDirection: "column",
    }
  },
  leftSection: {
    flex: "0 0 60%",
  },
  rightSection: {
    flex: 1,
  },
  tabsContainer: {
    display: "flex",
    background: "#130812",
    borderRadius: "8px",
    width: "fit-content",
    marginBottom: "25px",
  },
  tab: {
    padding: "8px 40px",
    background: "transparent",
    border: "none",
    color: "#666",
    cursor: "pointer",
    borderRadius: "4px",
    fontSize: "14px",
    transition: "all 0.3s ease",
    "&:hover": {
      color: "#fff"
    },
    "&.active": {
      background: "linear-gradient(to bottom, rgba(67, 20, 56, 1) 0%, rgba(67, 20, 56, 0.3) 49%, rgba(65, 19, 53, 0.09) 100% )",
      color: "#fff"
    }
  },
  coinSelector: {
    marginBottom: "30px",
    "& .label": {
      color: "#666",
      marginBottom: "10px",
      display: "block",
      fontSize: "14px"
    }
  },
  coinDropdown: {
    position: "relative",
    marginBottom: "8px",
    "& .dropdownTrigger": {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      padding: "12px 16px",
      background: "#130812",
      borderRadius: "12px",
      cursor: "pointer",
      border: "1px solid #201520",
      "& img": {
        width: "24px",
        height: "24px",
        borderRadius: "50%"
      },
      "& .coinInfo": {
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        "& .coinName": {
          color: "#fff",
          fontSize: "14px",
          fontWeight: 500
        }
      },
      "& .arrowIcon": {
        color: "#666",
        padding: "4px",
        background: "#201520",
        borderRadius: "6px",
        transition: "transform 0.3s ease",
        transform: props => props.isDropdownOpen ? "rotate(180deg)" : "rotate(0)"
      }
    }
  },
  dropdownMenu: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    background: "#130812",
    borderRadius: "12px",
    padding: "8px",
    marginTop: "8px",
    zIndex: 999,
    border: "1px solid #201520",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
  },
  dropdownItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px",
    cursor: "pointer",
    borderRadius: "8px",
    transition: "background 0.2s ease",
    "&:hover": {
      background: "#201520"
    },
    "& img": {
      width: "24px",
      height: "24px",
      borderRadius: "50%"
    },
    "& span": {
      color: "#666",
      fontSize: "14px",
      fontWeight: 500
    },
    "&:hover span": {
      color: "#fff"
    }
  },
  balanceText: {
    color: "#666",
    fontSize: "14px",
    paddingLeft: "4px",
    "& span": {
      color: "#fff"
    }
  },
  addressSection: {
    borderRadius: "8px",
    marginBottom: "20px"
  },
  networkInfo: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    "& .title": {
      color: "#fff",
      display: "flex",
      alignItems: "center",
      gap: "8px"
    },
    "& .time": {
      color: "#666",
      display: "flex",
      alignItems: "center",
      gap: "5px",
      "& span": {
        color: "#fff"
      }
    }
  },
  addressBox: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    background: "#0F020D",
    border: "1px solid #291E2A",
    padding: "0px 12px",
    borderRadius: "8px",
    "& input": {
      flex: 1,
      background: "transparent",
      border: "none",
      color: "#fff",
      fontSize: "14px",
      "&:focus": {
        outline: "none"
      }
    }
  },
  copyButton: {
    minWidth: "unset",
    padding: "8px 16px",
    background: "#E9AD00",
    color: "#000",
    border: "none",
    borderRadius: "4px",
    fontSize: "14px",
    cursor: "pointer",
    textTransform: "none",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    "&:hover": {
      background: "#d19c00"
    },
    "& .copyIcon": {
      width: "16px",
      height: "16px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      "& svg": {
        fontSize: "16px"
      }
    }
  },
  bonusBox: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "15px",
    background: "transparent",
    borderRadius: "8px",
    marginBottom: "20px",
    "& .bonusText": {
      color: "#fff",
      "& span": {
        color: "#E41AFA"
      }
    }
  },
  giftIcon: {
    height: "20px",
  },
  tipsSection: {
    background: "#0F020D",
    border: "1px solid #291E2A",
    borderRadius: "8px",
    padding: "20px",
    marginTop: "50px",
    "& h3": {
      color: "#fff",
      marginBottom: "15px",
      fontSize: "16px"
    },
    "& ul": {
      listStyle: "none",
      padding: 0,
      margin: 0,
      "& li": {
        color: "#666",
        marginBottom: "10px",
        fontSize: "14px",
        display: "flex",
        alignItems: "flex-start",
        gap: "10px",
        "&::before": {
          content: '"•"',
          color: "#666"
        }
      }
    }
  },
  networkSelector: {
    "& .networks": {
      display: "flex",
      gap: "8px",
      flexWrap: "wrap",
      marginBottom: "15px",
      background: "#0F020D",
      padding: "2px",
      borderRadius: "8px",
      border: "1px solid #291E2A",
    },
    "& .networkButton": {
      padding: "8px 16px",
      borderRadius: "8px",
      fontSize: "14px",
      border: "1px solid transparent",
      background: "transparent",
      color: "#666",
      cursor: "pointer",
      transition: "all 0.3s ease",
      "&.active": {
        background: "linear-gradient(to bottom, rgba(67, 20, 56, 1) 0%, rgba(67, 20, 56, 0.3) 49%, rgba(65, 19, 53, 0.09) 100%)",
        borderColor: "transparent",
        color: "#fff"
      }
    }   
  },

  qrSection: {
    borderRadius: "12px",
    padding: "24px",
    position: "relative",
    "& .infoIcon": {
      position: "absolute",
      top: "12px",
      left: "12px",
      color: "#666",
      fontSize: "20px",
      cursor: "pointer"
    },
    "& .title": {
      color: "#fff",
      fontSize: "16px",
      fontWeight: 500,
      textAlign: "center",
      marginBottom: "24px"
    },
    "& .qrWrapper": {
      width: "100%",
      borderRadius: "12px",
      padding: "0px 24px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      marginBottom: "24px",
      "& img": {
        width: "75%",
        height: "75%",
        objectFit: "contain"
      },
      "& .coinIcon": {
        position: "absolute",
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        background: "#fff",
        padding: "4px",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)"
      }
    },
    "& .warningSection": {
      display: "flex",
      flexDirection: "column",
      gap: "8px",
    },
    "& .warning": {
      color: "#666",
      fontSize: "14px",
      textAlign: "left"
    },
    "& .subWarning": {
      color: "#666",
      fontSize: "12px",
      textAlign: "left",
      opacity: 0.8,
    }
  },
  arrivalTime: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "6px",
    color: "#666",
    fontSize: "14px",
    "& svg": {
      fontSize: "16px",
      opacity: 0.7
    },
    "& span": {
      color: "#fff"
    }
  },
}));

const EarnWithUs = () => {
  const [activeTab, setActiveTab] = useState('crypto');
  const [selectedCoin, setSelectedCoin] = useState('USDT');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const address = "TJS17hderSofru63Hdbso2bsdjh9a";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleCoinSelect = (coin) => {
    setSelectedCoin(coin);
    setIsDropdownOpen(false);
  };

  const classes = useStyles({ isDropdownOpen });

  return (
    <MainLayout>
      <Box className={classes.wrapper}>
        <div className={classes.header}>
          <a href="/" className="backButton">
            <ArrowBackIcon /> Return to home page
          </a>
        </div>

        <div className={classes.mainContent}>
          <div className={classes.leftSection}>
            <div className={classes.titleSection}>
              <Typography variant="h6" style={{ color: "#fff" }}>
                Deposits 
              </Typography>
              <hr />
            </div>
            <div className={classes.tabsContainer}>
              <button 
                className={`${classes.tab} ${activeTab === 'skin' ? 'active' : ''}`}
                onClick={() => setActiveTab('skin')}
              >
                Skin
              </button>
              <button 
                className={`${classes.tab} ${activeTab === 'cash' ? 'active' : ''}`}
                onClick={() => setActiveTab('cash')}
              >
                Cash
              </button>
              <button 
                className={`${classes.tab} ${activeTab === 'crypto' ? 'active' : ''}`}
                onClick={() => setActiveTab('crypto')}
              >
                Crypto
              </button>
            </div>

            <div className={classes.coinSelector}>
              <span className="label">Coin</span>
              <div className={classes.coinDropdown} ref={dropdownRef}>
                <div className="dropdownTrigger" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                  <img src={letterSymbol} alt={selectedCoin} style={{height: "15px", width: "15px", marginRight: "-2px" }}/>
                  <div className="coinInfo">
                    <span className="coinName">{selectedCoin}</span>
                    <KeyboardArrowDownIcon className="arrowIcon" style={{ fontSize: 20 }} />
                  </div>
                </div>
                {isDropdownOpen && (
                  <div className={classes.dropdownMenu}>
                    {['USDT', 'BTC', 'ETH', 'LTC'].map((coin) => (
                      <div 
                        key={coin}
                        className={classes.dropdownItem}
                        onClick={() => handleCoinSelect(coin)}
                      >
                        <img src={letterSymbol} alt={coin} style={{height: "15px", width: "15px", marginRight: "-2px" }}/>
                        <span>{coin}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className={classes.balanceText}>
                Total Balance: <span>0.43734734 TRC</span>
              </div>
            </div>

            <div className={classes.addressSection}>
              <div className={classes.networkInfo}>
                <div className="title">
                  TRC20 Address <InfoOutlinedIcon style={{ fontSize: 16 }} />
                </div>
              </div>

              <div className={classes.addressBox}>
                <input type="text" value={address} readOnly />
                <Button 
                  className={classes.copyButton}
                  onClick={() => navigator.clipboard.writeText(address)}
                >
                  <span className="copyIcon">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.3333 6H7.33333C6.59695 6 6 6.59695 6 7.33333V13.3333C6 14.0697 6.59695 14.6667 7.33333 14.6667H13.3333C14.0697 14.6667 14.6667 14.0697 14.6667 13.3333V7.33333C14.6667 6.59695 14.0697 6 13.3333 6Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M3.33333 10H2.66667C2.31305 10 1.97391 9.85952 1.72386 9.60948C1.47381 9.35943 1.33333 9.02029 1.33333 8.66667V2.66667C1.33333 2.31305 1.47381 1.97391 1.72386 1.72386C1.97391 1.47381 2.31305 1.33333 2.66667 1.33333H8.66667C9.02029 1.33333 9.35943 1.47381 9.60948 1.72386C9.85952 1.97391 10 2.31305 10 2.66667V3.33333" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  Copy
                </Button>
              </div>
            </div>

            <div className={classes.bonusBox}>
            <img src={giftIcon} alt="giftIcon" className={classes.giftIcon} />
              <span className="bonusText">
                Get extra <span>bonus</span> on minimum of <span>$10</span> deposit.
              </span>
            </div>

            <div className={classes.tipsSection}>
              <h3>Tips</h3>
              <ul>
                <li>If you have deposited please pay attention to the text messages/m site letters and emails we send to you. Your assets will be temporarily unavailable for withdrawals.</li>
                <li>Coins will be deposited after 1 network confirmations.</li>
                <li>Until 2 confirmations are made,an equivalent amount of your assets will be temporarily unavailable for withdrawals.</li>
                <li>You could check the blockchain records and deposit status at Deposit Records.</li>
              </ul>
            </div>
          </div>

          <div className={classes.rightSection}>
            <Typography variant="h6" style={{ color: "#fff", marginBottom: "15px", display: "flex", alignItems: "center", gap: "8px" }}>
              Deposits Networks <InfoOutlinedIcon style={{ fontSize: 16, opacity: 0.7 }} />
            </Typography>
            
            <div className={classes.networkSelector}>
              <div className="networks">
                {['BTC', 'ETH', 'BEP20', 'TRC', 'LTC', 'USDC'].map((network) => (
                  <button
                    key={network}
                    className={`networkButton ${network === 'TRC' ? 'active' : ''}`}
                  >
                    {network}
                  </button>
                ))}
              </div>
             
            </div>
            <div className={classes.arrivalTime}>
                <InfoOutlinedIcon />
                Average arrival time: <span>3 Minutes</span>
              </div>
            <div className={classes.qrSection}>
              <div className="title">TRC20 Address</div>
              <div className="qrWrapper">
                <img src={qrImage} alt="QR Code" />
                
              </div>
              <div className="warningSection">
              <InfoOutlinedIcon style={{ fontSize: 16 }} />
                <div className="warning">
                  Send Only USDT to this Address!
                </div>
                <div className="subWarning">
                  Sending coin or token other than BTC to this Address may result in the loss of your deposit.
                </div>
              </div>
            </div>
          </div>
        </div>
      </Box>
    </MainLayout>
  );
};

export default EarnWithUs; 