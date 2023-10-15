import Logo from '../img/1020/1020_Word.png'
import Logo2 from '../img/1020/1020.jpg'
import Logo3 from '../img/1020/1020_noBG_4.png'
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import StakingABI from '../abi/stakingABI.json'
import TokenABI from '../abi/IERC20ABI.json'
import '../css/About.css'
import swal from 'sweetalert'


const NumberCounter = ({ targetNumber }) => {
    const [currentNumber, setCurrentNumber] = useState(0);
    const [startAnimation, setStartAnimation] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const element = document.getElementById('counter'); // 替换为组件的正确 id 或 ref
            if (element) {
                const elementTop = element.getBoundingClientRect().top;
                const viewportHeight = window.innerHeight;

                if (elementTop < viewportHeight) {
                    setStartAnimation(true);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        if (startAnimation && currentNumber < targetNumber) {
            const timerId = setTimeout(() => {
                setCurrentNumber((prevNumber) => prevNumber + 1);
            }, 1);

            return () => {
                clearTimeout(timerId);
            };
        }
    }, [startAnimation, currentNumber, targetNumber]);

    return <div id="counter">{currentNumber}</div>;
};

const ArcSquare = () => {

    const arcStyle = {
        content: '',
        position: 'absolute',
        top: '0',
        right: '0',
        width: '30vw',
        height: '20vh',
        borderRadius: '0 0 0 200px',
        backgroundColor: '#FF963C', // Add background color
    };


    return (
        <div style={arcStyle}></div>
    );
};

const Navbar = ({ setLan, defaultAccountChange }) => {
    const [language, setLanguage] = useState("EN");
    const [defaultAccount, setDefaultAccount] = useState(null)
    const [connectButtonText, setConnectButtonText] = useState("Connect Wallet")

    const text =
    {
        en: 'Connect Wallet',
        ch: '連接錢包'
    }

    const handleLanguageChange = () => {
        if (language === "EN") {
            setLanguage("CH")
            setLan("CH")
            if (defaultAccount !== null) return;
            setConnectButtonText(text.ch)
            return;
        }
        if (language === "CH") {
            setLanguage("EN")
            setLan("EN")
            if (defaultAccount !== null) return;
            setConnectButtonText(text.en)
            return;
        }
    }

    useEffect(() => {
        changingAccount();
    }, [defaultAccount])

    const changingAccount = async () => {
        if (window.ethereum) {
            window.ethereum.on('accountsChanged', () => {
                connectWalletHandler()
            })
            window.ethereum.on('chainChanged', () => {
                connectWalletHandler()
            })
        }
    }

    const connectWalletHandler = async () => {
        if (window.ethereum) {
            window.ethereum.request({ method: 'eth_requestAccounts' })
                .then(async (result) => {
                    await accountChangeHandler(result[0]);
                    defaultAccountChange(result[0]);
                    setConnectButtonText(`${result[0].slice(0, 4)}...${result[0].slice(-4)}`);
                })
        } else {
            console.log('Error', 'Need to install MetaMask!', 'error')
        }
    }

    const accountChangeHandler = async (newAccount) => {
        checkCorrectNetwork();
        setDefaultAccount(newAccount);
    }

    const checkCorrectNetwork = async () => {
        const { ethereum } = window
        const chainId = await ethereum.request({ method: 'eth_chainId' })
        handleDefaultChainChange(chainId)
    }

    const handleDefaultChainChange = (value) => {
        console.log("Chain Change to " + value);
    }

    return (
        <header
            data-elementor-type="header" data-elementor-id={365} className="elementor elementor-365 elementor-location-header">

            <section className="elementor-section elementor-top-section elementor-element elementor-element-b51501d elementor-section-height-min-height elementor-section-boxed elementor-section-height-default elementor-section-items-middle" data-id="b51501d" data-element_type="section" data-settings="{&quot;background_background&quot;:&quot;classic&quot;}"
                style={{ backgroundColor: '#FF963C', color: '#A017D7', fontSize: '20px', fontWeight: 'bolder', height: '100px', position: 'fixed', width: '100vw', zIndex: '200' }}
            >
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                }}>
                    <div style={{
                        marginTop: '10px'
                    }}>
                        <a href="../index.htm">
                            <img
                                src={Logo}
                                className="attachment-full size-full wp-image-382"
                                alt=""
                                style={{
                                    width: '75px', height: '75px',
                                    backgroundColor: '#FF963C',
                                    borderRadius: '100px',
                                    border: '3px solid white'
                                }}
                            />
                        </a>
                    </div>
                    <button
                        onClick={connectWalletHandler}
                        style={{
                            backgroundColor: 'white',
                            color: 'purple',
                        }}
                    >
                        {connectButtonText}
                    </button>
                    <button onClick={handleLanguageChange} style={{
                        backgroundColor: 'white',
                        color: 'purple'
                    }}>
                        🌐
                        {language}
                    </button>
                </div>
                {/* <div className="elementor-container elementor-column-gap-default">
                    <div className="elementor-column elementor-col-33 elementor-top-column elementor-element elementor-element-8ce7a2a" data-id="8ce7a2a" data-element_type="column" data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
                        <div className="elementor-widget-wrap elementor-element-populated">
                            <div className="elementor-element elementor-element-7fdcd08 elementor-widget elementor-widget-theme-site-logo elementor-widget-image" data-id="7fdcd08" data-element_type="widget" data-widget_type="theme-site-logo.default">

                                <div className="elementor-widget-container">
                                    <a href="../index.htm">
                                        <img
                                            src={Logo}
                                            className="attachment-full size-full wp-image-382"
                                            alt=""
                                            style={{
                                                width: '75px', height: '75px',
                                                marginTop: '-7px',
                                                backgroundColor: '#FF963C',
                                                borderRadius: '100px',
                                                border: '3px solid white'
                                            }}
                                        />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <nav style={{ position: 'absolute', right: '5vw', top: '7px' }}>
                        <ul id="menu-1-e21e9a5" className="elementor-nav-menu">
                            <li className="menu-item menu-item-type-custom menu-item-object-custom current-menu-item menu-item-355">
                                <span>
                                    {
                                        language === "EN"
                                            ? text.en
                                            : text.ch
                                    }
                                </span>
                            </li>
                            <li>
                                <span style={{
                                    color: '#FF963C'
                                }}>Null</span>
                            </li>
                            <li className="menu-item menu-item-type-custom menu-item-object-custom current-menu-item menu-item-355"
                                onClick={handleLanguageChange}
                            >
                                <span>
                                    Change Language
                                </span>
                            </li>
                        </ul>
                    </nav>
                </div> */}
            </section>
        </header>
    )
}

const Hero = ({ language }) => {
    return (
        <section className="elementor-section elementor-top-section elementor-element elementor-element-158e9de2 elementor-section-height-min-height elementor-section-boxed elementor-section-height-default elementor-section-items-middle" data-id="158e9de2" data-element_type="section" data-settings="{&quot;background_background&quot;:&quot;classic&quot;,&quot;shape_divider_bottom&quot;:&quot;clouds&quot;}"
            style={{
                backgroundColor: 'rgb(83,0,117)',
                marginTop: '100px'
            }}>
            <div className="elementor-background-overlay" />
            <div className="elementor-shape elementor-shape-bottom" data-negative="false"
                style={{ fill: '#FDF8FF' }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 283.5 27.8" preserveAspectRatio="xMidYMax slice">
                    <path className="elementor-shape-fill" d="M0 0v6.7c1.9-.8 4.7-1.4 8.5-1 9.5 1.1 11.1 6 11.1 6s2.1-.7 4.3-.2c2.1.5 2.8 2.6 2.8 2.6s.2-.5 1.4-.7c1.2-.2 1.7.2 1.7.2s0-2.1 1.9-2.8c1.9-.7 3.6.7 3.6.7s.7-2.9 3.1-4.1 4.7 0 4.7 0 1.2-.5 2.4 0 1.7 1.4 1.7 1.4h1.4c.7 0 1.2.7 1.2.7s.8-1.8 4-2.2c3.5-.4 5.3 2.4 6.2 4.4.4-.4 1-.7 1.8-.9 2.8-.7 4 .7 4 .7s1.7-5 11.1-6c9.5-1.1 12.3 3.9 12.3 3.9s1.2-4.8 5.7-5.7c4.5-.9 6.8 1.8 6.8 1.8s.6-.6 1.5-.9c.9-.2 1.9-.2 1.9-.2s5.2-6.4 12.6-3.3c7.3 3.1 4.7 9 4.7 9s1.9-.9 4 0 2.8 2.4 2.8 2.4 1.9-1.2 4.5-1.2 4.3 1.2 4.3 1.2.2-1 1.4-1.7 2.1-.7 2.1-.7-.5-3.1 2.1-5.5 5.7-1.4 5.7-1.4 1.5-2.3 4.2-1.1c2.7 1.2 1.7 5.2 1.7 5.2s.3-.1 1.3.5c.5.4.8.8.9 1.1.5-1.4 2.4-5.8 8.4-4 7.1 2.1 3.5 8.9 3.5 8.9s.8-.4 2 0 1.1 1.1 1.1 1.1 1.1-1.1 2.3-1.1 2.1.5 2.1.5 1.9-3.6 6.2-1.2 1.9 6.4 1.9 6.4 2.6-2.4 7.4 0c3.4 1.7 3.9 4.9 3.9 4.9s3.3-6.9 10.4-7.9 11.5 2.6 11.5 2.6.8 0 1.2.2c.4.2.9.9.9.9s4.4-3.1 8.3.2c1.9 1.7 1.5 5 1.5 5s.3-1.1 1.6-1.4c1.3-.3 2.3.2 2.3.2s-.1-1.2.5-1.9 1.9-.9 1.9-.9-4.7-9.3 4.4-13.4c5.6-2.5 9.2.9 9.2.9s5-6.2 15.9-6.2 16.1 8.1 16.1 8.1.7-.2 1.6-.4V0H0z">
                    </path>
                </svg>
            </div>

            <ArcSquare />
            <div className="elementor-container elementor-column-gap-default">

                <div className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-c60e6f3" data-id="c60e6f3" data-element_type="column">
                    <div className="elementor-widget-wrap elementor-element-populated">
                        <div className="elementor-element elementor-element-3bc66942 elementor-widget elementor-widget-heading" data-id="3bc66942" data-element_type="widget" data-widget_type="heading.default">
                            <div className="elementor-widget-container"
                                style={{
                                    color: 'white',
                                    fontSize: '40px',
                                    fontWeight: 'bolder',
                                }}>
                                <h1 className="elementor-heading-title elementor-size-default">
                                    1020
                                </h1>
                            </div>
                        </div>
                        <div className="elementor-element elementor-element-139d546e elementor-widget elementor-widget-text-editor" data-id="139d546e" data-element_type="widget" data-widget_type="text-editor.default">
                            <div className="elementor-widget-container" style={{
                                backgroundColor: 'rgb(255,150,60)'
                            }}>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

const Content1 = ({ language }) => {

    return (
        <section className="elementor-section elementor-top-section elementor-element elementor-element-33f4dadb elementor-section-boxed elementor-section-height-default elementor-section-height-default" data-id="33f4dadb" data-element_type="section">
            <div className="elementor-container elementor-column-gap-default" >
                <div className="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-2f0d0f59" data-id="2f0d0f59" data-element_type="column"
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <img src={Logo3} alt="Logo2"
                        style={{
                            width: '24vw',
                            minWidth: '200px',
                            height: '24vw',
                            minHeight: '200px',
                        }} />
                </div>

                <div className="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-d48ea1e" data-id="d48ea1e" data-element_type="column">
                    <div className="elementor-widget-wrap elementor-element-populated">
                        <div className="elementor-element elementor-element-15c5ff74 elementor-widget elementor-widget-heading" data-id="15c5ff74" data-element_type="widget" data-widget_type="heading.default">
                            <div className="elementor-widget-container">
                                {/* <h5 style={{
                                    color: '#FF963C', fontWeight: 'bold'
                                }}>
                                    {
                                        language === "EN"
                                            ? "We are"
                                            : "我們是"
                                    } 1020
                                </h5> */}
                            </div>
                        </div>
                        <div className="elementor-element elementor-element-9d8fabf elementor-widget elementor-widget-heading" data-id="9d8fabf" data-element_type="widget" data-widget_type="heading.default">
                            <div className="elementor-widget-container">
                                <h1 style={{
                                    color: '#A017D7', fontWeight: 'bolder'
                                }}>
                                    1020 DApp<br />
                                    {
                                        language === "EN"
                                            ? " Staking Center"
                                            : " 質押中心"
                                    }

                                </h1>
                            </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', width: '320px' }}>
                            <div className="elementor-widget-container">
                                <p style={{
                                    color: 'gray',
                                    display: 'flex',
                                    justifyContent: 'center'
                                }}>
                                    {
                                        language === "EN"
                                            ? "The staking Dapp exclusively for 1020 has arrived."
                                            : "專屬於 1020 的質押 Dapp 來了"
                                    }
                                </p>
                                <p style={{
                                    color: 'gray',
                                    display: 'flex',
                                    justifyContent: 'center'
                                }}>
                                    {
                                        language === "EN"
                                            ? "Users can stake within the Dapp."
                                            : "用戶可於 Dapp 中質押"
                                    }
                                    <br />

                                    1.
                                    {
                                        language === "EN"
                                            ? "Earn 1020 from staking JNY."
                                            : "JNY 獲取 1020 收益"
                                    }
                                    <br />
                                    2.
                                    {
                                        language === "EN"
                                            ? "Earn gem energy from staking 1020 LP."
                                            : "1020LP 獲取 寶石能量值獎勵"
                                    }
                                </p>
                            </div>
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                maxWidth: '100vw',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <div className='box' style={{
                                backgroundColor: 'rgb(83,0,117)',
                                color: 'white',
                                width: '15vw',
                                height: '10vh',
                                minWidth: '280px',
                                minHeight: '50px',
                                borderRadius: '20px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                margin: '20px'
                            }}>
                                <span style={{
                                    color: 'orange',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    fontSize: '20px',
                                    fontWeight: 'bolder',
                                }}>
                                    <span>
                                        <NumberCounter targetNumber={99} />
                                    </span>
                                    <span>
                                        +
                                    </span>
                                </span>
                                <span style={{
                                    fontWeight: 'bold'
                                }}>
                                    {
                                        language === "EN"
                                            ? "User Staked"
                                            : "質押用戶"
                                    }
                                </span>
                            </div>
                            <a
                                href="#Staking"
                                style={{
                                    fontWeight: 'bolder',
                                    color: 'rgb(83,0,117)',
                                    backgroundColor: 'orange',
                                    color: 'white',
                                    width: '15vw',
                                    height: '10vh',
                                    minWidth: '280px',
                                    minHeight: '50px',
                                    borderRadius: '20px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    margin: '20px'
                                }}>
                                ⭐
                                {
                                    language === "EN"
                                        ? "Start Staking"
                                        : "前往質押"
                                }
                                ⭐
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

const Content2 = ({ language, _1020CA }) => {
    const JNYCA = "0x1E83D06E17CAE34415BeA30116aC755456131020"
    const JNYLink = `https://pancakeswap.finance/swap?outputCurrency=${JNYCA}`
    const CA = _1020CA;
    const link = `https://pancakeswap.finance/swap?outputCurrency=${CA}`

    const LeftColumn = [
        'Total Supply : 10200',
        'Max Wallet : 20',
        'Anti Bot',
    ]
    return (
        <section className="elementor-section elementor-top-section elementor-element-1cd26e9 elementor-section-boxed elementor-section-height-default elementor-section-height-default" data-id="1cd26e9" data-element_type="section">
            <div className="elementor-container elementor-column-gap-default" style={{
                display: 'flex', flexDirection: 'column'
            }}>
                <div className="elementor-element elementor-element-33e5fbe2 elementor-widget elementor-widget-heading" data-id="33e5fbe2" data-element_type="widget" data-widget_type="heading.default"
                    style={{
                        display: 'flex', flexWrap: 'wrap', justifyContent: 'center',
                    }}>
                    <h5 style={{
                        color: '#A017D7', fontWeight: 'bolder',
                        wordBreak: 'break-all',
                        padding: '20px',
                    }}>
                        1020
                        {
                            language === "EN"
                                ? " CA : "
                                : " 合約 : "
                        }
                        <br />
                        <p style={{
                            paddingLeft: '20px',
                            color: 'gray'
                        }}>
                            <br />
                            {CA}
                        </p>
                    </h5>

                    <a
                        href={link}
                        style={{
                            fontWeight: 'bolder',
                            color: 'rgb(83,0,117)'
                        }}>

                        <button className='box' style={{
                            width: '15vw',
                            height: '10vh',
                            minWidth: '280px',
                            minHeight: '50px',
                            borderRadius: '20px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            margin: '20px',
                        }}>
                            {
                                language === "EN"
                                    ? "Buy 1020 On PancakeSwap"
                                    : "在 PancakeSwap 購買 1020"
                            }
                        </button>
                    </a>
                </div>
            </div>
        </section>
    )
}

const CountdownTimer = ({ targetDate, language }) => {
    const timeUnknown = false;
    const calculateTimeLeft = () => {
        const now = new Date().getTime();
        const timeLeft = targetDate - now;

        if (timeLeft < 0) {
            return {
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0
            };
        }

        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        return {
            days,
            hours,
            minutes,
            seconds
        };
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, [targetDate])
    const countdownBoxStyle = {
        display: 'inline-block',
        textAlign: 'center',
        margin: '0 10px',
    };

    const countdownValueStyle = {
        fontSize: '24px',
        fontWeight: 'bold',
    };

    const countdownLabelStyle = {
        fontSize: '14px',
        color: '#888',
    };
    if (!timeUnknown)
        return (
            <div>
                <span style={{ marginTop: '20px', marginBottom: '40px' }}>
                    {language === "EN"
                        ? "Open In " : "即將開放"
                    }
                </span>
                <br />
                <div style={countdownBoxStyle}>
                    <div style={countdownValueStyle}>{timeLeft.days}</div>
                    <div style={countdownLabelStyle}>Days</div>
                </div>
                <div style={countdownBoxStyle}>
                    <div style={countdownValueStyle}>{timeLeft.hours}</div>
                    <div style={countdownLabelStyle}>Hours</div>
                </div>
                <div style={countdownBoxStyle}>
                    <div style={countdownValueStyle}>{timeLeft.minutes}</div>
                    <div style={countdownLabelStyle}>Minutes</div>
                </div>
                <div style={countdownBoxStyle}>
                    <div style={countdownValueStyle}>{timeLeft.seconds}</div>
                    <div style={countdownLabelStyle}>Seconds</div>
                </div>
            </div>
        );
    else
        return (
            <div>
                <span style={{ marginTop: '20px', marginBottom: '40px' }}>
                    {language === "EN"
                        ? "Open In " : "即將開放"
                    }
                </span>
                <br />
                <div style={countdownBoxStyle}>
                    <div style={countdownValueStyle}>XX</div>
                    <div style={countdownLabelStyle}>Days</div>
                </div>
                <div style={countdownBoxStyle}>
                    <div style={countdownValueStyle}>XX</div>
                    <div style={countdownLabelStyle}>Hours</div>
                </div>
                <div style={countdownBoxStyle}>
                    <div style={countdownValueStyle}>XX</div>
                    <div style={countdownLabelStyle}>Minutes</div>
                </div>
                <div style={countdownBoxStyle}>
                    <div style={countdownValueStyle}>XX</div>
                    <div style={countdownLabelStyle}>Seconds</div>
                </div>
            </div>
        );
};

const StakingCard = ({
    fatherTokenName,
    sonTokenName,
    language,
    defaultAccount,
    contract,
    fatherContract,
    fatherDecimals,
    fatherBalance,
    fatherStaked,
    sonGained,
    provider,
    isSuccess,
    Phase,
    startBlock,
    bonusEndBlock,
    hasBeenClaimdReward,
}) => {
    const [inputValue, setInputValue] = useState(''); // 初始化狀態為空字符串
    const [isAreaOpenJudge, setIsAreaOpenJudge] = useState(false);
    const handleInputChange = (event) => {
        setInputValue(event.target.value); // 更新狀態為輸入的值
    };

    useEffect(() => {
        if (startBlock === null || startBlock === 0) return;
        const judgeAreaOpen = () => {
            const currentTimestamp = Math.floor(Date.now() / 1000)

            if (+currentTimestamp < +startBlock) setIsAreaOpenJudge(true);
            // if (+currentTimestamp < +startBlock) setIsAreaOpenJudge(false);
            else setIsAreaOpenJudge(true)
        }
        judgeAreaOpen();
    }, [defaultAccount, startBlock])


    const placeHolderText = language === "EN" ? "Amount to Stake" : "質押數量";

    const defaultInviter = "0x0000000000000000000000000000000000000000"

    const handleWithdraw = async () => {
        if (isAreaOpenJudge === false) return;
        const realFatherStaked = ethers.utils.parseUnits(`${fatherStaked}`, fatherDecimals)
        try {
            const result = await contract.withdraw(realFatherStaked);
            provider
                .getTransaction(result.hash)
                .then((tx) => {
                    // 監聽交易上鍊事件
                    tx.wait().then(async (receipt) => {
                        //  授權成功
                        console.log(`交易已上鍊，區塊高度為 ${receipt.blockNumber}`)
                        isSuccess(true)
                    })
                })
        } catch (err) {
            swal("error",`${err.reason}`,"error")
        }
    }

    const handleClaim = async () => {
        if (isAreaOpenJudge === false) return;
        try {
            const result = await contract.withdraw(0);
            provider
                .getTransaction(result.hash)
                .then((tx) => {
                    // 監聽交易上鍊事件
                    tx.wait().then(async (receipt) => {
                        //  授權成功
                        console.log(`交易已上鍊，區塊高度為 ${receipt.blockNumber}`)
                        isSuccess(true)
                    })
                })
        } catch (err) {
            console.log(err)
        }
    }
    const approveAndSendTx = async () => {
        if (defaultAccount === null) return;
        if (inputValue === "" || inputValue === null) return;
        if (isAreaOpenJudge === false) return;

        const amount = ethers.utils.parseUnits(inputValue, fatherDecimals);
        try {
            const isApproved = await checkApproved(amount);
            if (!isApproved) {
                approveTokenToContract(amount);
                return;
            }
            sendTx(amount);
        } catch (error) {
            console.log(error)
        }
    }

    const checkApproved = async (amount) => {
        try {
            const result = await fatherContract.allowance(
                defaultAccount, contract.address
            )
            if (+result >= +amount)
                return true;
            return false;
        } catch (err) {
            console.log(err)
        }
    }


    const approveTokenToContract = async (amount) => {
        console.log(amount)
        if (defaultAccount === null) {
            return;
        }
        try {
            const result = await fatherContract.approve(
                contract.address, amount
            )

            provider
                .getTransaction(result.hash)
                .then((tx) => {
                    // 監聽交易上鍊事件
                    tx.wait().then(async (receipt) => {
                        //  授權成功
                        console.log(`交易已上鍊，區塊高度為 ${receipt.blockNumber}`)
                        try {
                            await sendTx(amount)
                        } catch (err) {
                            console.log(err)
                        }
                    })
                })
        } catch (error) {
            console.log(error)
        }
    }

    const sendTx = async (amount) => {
        const gasLimitGwei = "1700000"
        try {
            const result = await contract.deposit(amount, defaultInviter, {
                gasLimit: gasLimitGwei
            });
            provider
                .getTransaction(result.hash)
                .then((tx) => {
                    // 監聽交易上鍊事件
                    tx.wait().then(async (receipt) => {
                        //  授權成功
                        console.log(`交易已上鍊，區塊高度為 ${receipt.blockNumber}`)
                        isSuccess(true)
                    })
                })
        } catch (err) {
            console.log(err)
        }
    }


    const areaNotOpenStyle = {
        filter: 'blur(10px)',
        position: 'relative',
        zIndex: '1'
    }

    const handlePercentage = (value) => {
        const tempAmount = fatherBalance * value / 100;
        setInputValue(`${tempAmount}`)
    }

    if (defaultAccount === null) {
        return (
            <div style={{ position: 'relative' }}>
                <span style={{
                    position: 'absolute',
                    marginLeft: '15vw',
                    marginTop: '10vh',
                    zIndex: '100',
                    fontSize: '30px',
                    fontWeight: 'bolder',
                    color: 'blueviolet',
                }}>
                    <div style={{
                        color: 'gray'
                    }}>
                        {
                            language === "EN"
                                ? " Please Connect Your Wallet "
                                : " 請連接錢包 "
                        }
                    </div>
                    <br />
                    <h4 style={{ textAlign: 'center' }}>

                        {
                            language === "EN"
                                ? " Stake "
                                : " 質押 "
                        }
                        {fatherTokenName}
                        <br />
                        {
                            language === "EN"
                                ? " to Earn "
                                : " 賺取 "
                        } {sonTokenName}
                    </h4>
                </span>
                <div style={{
                    filter: 'blur(10px)',
                    position: 'relative',
                    zIndex: '1'
                }}>
                    <div style={{
                        padding: '20px', minWidth: '360px', width: '45vw',
                        margin: '10px',
                        color: 'purple',
                        backgroundColor: 'white',
                        borderRadius: '20px'
                    }}>
                        <h3 style={{ textAlign: 'center' }}>
                            {
                                language === "EN"
                                    ? `Phase ${Phase}`
                                    : `第 ${Phase} 期`
                            }
                        </h3>
                        <div>
                            <h4 style={{ textAlign: 'center' }}>

                                {
                                    language === "EN"
                                        ? " Stake "
                                        : " 質押 "
                                }
                                {fatherTokenName}

                                <br />
                                {
                                    language === "EN"
                                        ? " to Earn "
                                        : " 賺取 "
                                } {sonTokenName}
                            </h4>
                            <TableComponent
                                fatherTokenName={fatherTokenName}
                                sonTokenName={sonTokenName}
                                language={language}
                                fatherHolding={fatherBalance}
                                fatherStaked={fatherStaked}
                                sonGained={sonGained}
                                startBlock={startBlock}
                                bonusEndBlock={bonusEndBlock}
                                hasBeenClaimdReward={hasBeenClaimdReward}
                            />
                            <div style={{
                                display: 'flex',
                                margin: '20px',
                                alignItems: 'center'
                            }}>
                                <button>
                                    {
                                        language === "EN"
                                            ? " Stake"
                                            : " 質押"
                                    }
                                </button>
                                <input
                                    placeholder={placeHolderText}
                                    type="number"
                                    value={inputValue}
                                    onChange={handleInputChange}
                                    style={{
                                        marginLeft: '20px',
                                        marginRight: '20px',
                                        width: '100px'
                                    }}
                                />
                                {fatherTokenName}
                            </div>
                            <div style={{
                                display: 'flex', flexDirection: 'row'
                            }}>
                                <button>
                                    25%
                                </button>
                                <button>
                                    50%
                                </button>
                                <button>
                                    75%
                                </button>
                                <button>
                                    Max
                                </button>
                            </div>
                            <div style={{
                                display: 'flex',
                                margin: '20px'
                            }}>
                                <button>
                                    {
                                        language === "EN"
                                            ? "Claim "
                                            : "領取 "
                                    }
                                    {sonTokenName}
                                </button>
                            </div>
                            <div style={{
                                display: 'flex',
                                margin: '20px'
                            }}>
                                <button>
                                    {
                                        language === "EN"
                                            ? " Unstake"
                                            : " 解除質押"
                                    } {fatherTokenName}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (

            <div style={{ position: 'relative' }}>
                {
                    isAreaOpenJudge
                        ? null
                        :
                        <span style={{
                            position: 'absolute',
                            marginLeft: '15vw',
                            marginTop: '10vh',
                            zIndex: '100',
                            fontSize: '30px',
                            fontWeight: 'bolder',
                        }}>

                            <div style={{
                                color: 'gray'
                            }}>
                                <CountdownTimer targetDate={startBlock * 1000} language={language} />
                            </div>
                            <br />
                            <h4 style={{
                                textAlign: 'center',
                                color: 'blueviolet',
                            }}>

                                {
                                    language === "EN"
                                        ? " Stake "
                                        : " 質押 "
                                }
                                {fatherTokenName}
                                <br />

                                {
                                    language === "EN"
                                        ? " to Earn "
                                        : " 賺取 "
                                } {sonTokenName}
                            </h4>
                        </span>
                }
                <div style={isAreaOpenJudge ? null : areaNotOpenStyle}>
                    <div style={{
                        padding: '20px', minWidth: '360px', width: '45vw',
                        margin: '10px',
                        color: 'purple',
                        backgroundColor: 'white',
                        borderRadius: '20px'
                    }}>
                        <h3 style={{ textAlign: 'center' }}>
                            {
                                language === "EN"
                                    ? `Phase ${Phase}`
                                    : `第 ${Phase} 期`
                            }
                        </h3>
                        <div>
                            <h4 style={{ textAlign: 'center' }}>

                                {
                                    language === "EN"
                                        ? " Stake "
                                        : " 質押 "
                                }
                                {fatherTokenName}

                                <br />
                                {
                                    language === "EN"
                                        ? " to Earn "
                                        : " 賺取 "
                                } {sonTokenName}
                            </h4>
                            <TableComponent
                                fatherTokenName={fatherTokenName}
                                sonTokenName={sonTokenName}
                                language={language}
                                fatherHolding={fatherBalance}
                                fatherStaked={fatherStaked}
                                sonGained={sonGained}
                                startBlock={startBlock}
                                bonusEndBlock={bonusEndBlock}
                                hasBeenClaimdReward={hasBeenClaimdReward}
                            />
                            <div style={{
                                display: 'flex',
                                margin: '20px',
                                alignItems: 'center'
                            }}>
                                <button onClick={approveAndSendTx}>
                                    {
                                        language === "EN"
                                            ? " Stake"
                                            : " 質押"
                                    }
                                </button>
                                <input
                                    placeholder={placeHolderText}
                                    type="number"
                                    value={inputValue}
                                    onChange={handleInputChange}
                                    style={{
                                        marginLeft: '20px',
                                        marginRight: '20px',
                                        width: '100px'
                                    }}
                                />
                                {fatherTokenName}
                            </div>

                            <div style={{
                                display: 'flex', flexDirection: 'row',
                                // justifyContent: 'space-evenly',
                                margin: '20px',
                            }}>
                                <button style={{ marginRight: '10px' }}
                                    onClick={() => handlePercentage(25)}
                                >
                                    25%
                                </button>
                                <button style={{ marginRight: '10px' }}
                                    onClick={() => handlePercentage(50)}
                                >
                                    50%
                                </button>
                                <button style={{ marginRight: '10px' }}
                                    onClick={() => handlePercentage(75)}
                                >
                                    75%
                                </button>
                                <button style={{ marginRight: '10px' }}
                                    onClick={() => handlePercentage(99.999)}
                                >
                                    Max
                                </button>
                            </div>
                            <hr />
                            <div style={{
                                display: 'flex',
                                margin: '20px'
                            }}>
                                <button onClick={handleClaim}>
                                    {
                                        language === "EN"
                                            ? "Claim "
                                            : "領取 "
                                    }
                                    {sonTokenName}
                                </button>
                            </div>
                            <div style={{
                                display: 'flex',
                                margin: '20px'
                            }}>
                                <button onClick={handleWithdraw}>
                                    {
                                        language === "EN"
                                            ? " Unstake"
                                            : " 解除質押"
                                    } {fatherTokenName}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const TableComponent = ({
    fatherTokenName,
    sonTokenName,
    language,
    fatherHolding,
    fatherStaked,
    sonGained,
    startBlock,
    bonusEndBlock,
    hasBeenClaimdReward
}) => {
    const BlockchainTimestampConverter = ({ timestamp }) => {
        if (timestamp === null) return;
        // 將區塊鍊的時間戳轉換為正式的時間
        const formattedTime = new Date(timestamp * 1000).toLocaleString();
        return (<span>{formattedTime}</span>)
    };
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <table style={{ border: '1px solid black', width: '100%', borderRadius: '10px' }}>
                <tbody>
                    <tr>
                        <td style={{ border: '1px solid black', padding: '8px' }}>

                            {
                                language === "EN"
                                    ? "Holding "
                                    : "持有 "
                            } {fatherTokenName}
                        </td>
                        <td style={{ border: '1px solid black', padding: '8px' }}>{fatherHolding}</td>
                    </tr>
                    <tr>
                        <td style={{ border: '1px solid black', padding: '8px' }}>
                            {
                                language === "EN"
                                    ? "Staked "
                                    : "質押中  "
                            } {fatherTokenName}
                        </td>
                        <td style={{
                            border: '1px solid black', padding: '8px',
                        }}>
                            {fatherStaked}
                        </td>
                    </tr>
                    <tr>
                        <td style={{ border: '1px solid black', padding: '8px' }}>
                            {
                                language === "EN"
                                    ? "Claimable "
                                    : "可領取的 "
                            }
                            {sonTokenName}
                        </td>
                        <td style={{ border: '1px solid black', padding: '8px' }}>{sonGained}</td>
                    </tr>
                    <tr>
                        <td style={{ border: '1px solid black', padding: '8px' }}>
                            {
                                language === "EN"
                                    ? "Claimed "
                                    : "已領取的 "
                            }
                            {sonTokenName}
                        </td>
                        <td style={{ border: '1px solid black', padding: '8px' }}>{hasBeenClaimdReward}</td>
                    </tr>
                    <tr>
                        <td style={{ border: '1px solid black', padding: '8px' }}>
                            {
                                language === "EN"
                                    ? "Pool Start Time "
                                    : "礦池開始時間 "
                            }
                        </td>
                        <td style={{ border: '1px solid black', padding: '8px' }}>
                            <BlockchainTimestampConverter timestamp={startBlock} />
                        </td>
                    </tr>
                    <tr>
                        <td style={{ border: '1px solid black', padding: '8px' }}>
                            {
                                language === "EN"
                                    ? "Pool End Time "
                                    : "礦池結束時間"
                            }
                        </td>
                        <td style={{ border: '1px solid black', padding: '8px' }}>
                            <BlockchainTimestampConverter timestamp={bonusEndBlock} />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}


const ProductCard = ({ product, addToCart, language }) => {
    const { name, price, image, description } = product;

    const styles = {
        container: {
            fontFamily: 'Arial, sans-serif',
            textAlign: 'center',
            padding: '20px',
        },
        header: {
            fontSize: '24px',
            marginBottom: '20px',
        },
        productList: {
            display: 'flex',
            justifyContent: 'space-around',
            flexWrap: 'wrap',
        },
        productCard: {
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '10px',
            margin: '10px',
            width: '240px',
        },
        productImage: {
            width: '100%',
            borderRadius: '8px',
        },
        productName: {
            fontSize: '18px',
            margin: '10px 0',
        },
        productPrice: {
            fontSize: '16px',
            fontWeight: 'bold',
        },
        productDescription: {
            fontSize: '14px',
            marginBottom: '10px',
        },
        addToCartButton: {
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            padding: '5px 10px',
            cursor: 'pointer',
        },
        cart: {
            marginTop: '20px',
        },
        cartItems: {
            listStyleType: 'none',
            padding: '0',
        },
    };

    return (
        <div style={styles.productCard}>
            {/* <img src={image} alt={name} style={styles.productImage} /> */}
            <h3 style={styles.productName}>{name}</h3>
            <p style={styles.productPrice}>{price}
                {
                    language === "EN"
                        ? " ∞ Gem Energy"
                        : " ∞ 寶石能量值"

                }
            </p>
            <p style={styles.productDescription}>{description}</p>
            <button onClick={() => addToCart(product)} style={styles.addToCartButton}>
                {
                    language === "EN"
                        ? "Payment (Coming Soon)"
                        : "支付（待開放）"
                }
            </button>
        </div>
    );
};


const Marquee = ({ content, speed }) => {
    const [offset, setOffset] = useState(0);

    const containerStyle = {
        color: 'purple',
        backgroundColor: '#FF963C',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50px',
    }

    const marqueeStyle = {
        transform: `translateX(-${offset}px)`,
        whiteSpace: 'nowrap',
        display: 'flex',
        animation: `marquee-animation ${speed}s linear infinite`,
        fontSize: '20px',
        fontWeight: 'bolder'
    };

    return (
        <div className="marquee-container" style={containerStyle}>
            <div className="marquee" style={marqueeStyle}>
                <div className="marquee-content">{content}</div>
                <div className="marquee-content">{content}</div>
                <div className="marquee-content">{content}</div>
            </div>
        </div>
    );
};

const Staking = ({
    defaultAccount,
    language,
    stakingCA,
    stakingCA2,
    lpStakingCA,
    jnyCA,
    _1020CA,
    _1020LPCA,
    pointCA,
    stakingCA3,
    X1020CA,
}) => {

    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);

    //  Staking Contract
    const [contract, setContract] = useState(null);
    const [lpStakingContract, setLpStakingContract] = useState(null);

    //  Time
    const [contractStartBlock, setContractStartBlock] = useState(null);
    const [contractEndBlock, setContractEndBlock] = useState(null);
    const [lpContractStartBlock, setLpContractStartBlock] = useState(null);
    const [lpContractEndBlock, setLpContractEndBlock] = useState(null);

    //  Token Contract
    const [jnyContract, setJNYContract] = useState(null);
    const [_1020Contract, set1020Contract] = useState(null);
    const [_1020LPContract, set1020LPContract] = useState(null);
    const [pointContract, setPointContract] = useState(null);

    const [_x1020Contract, setX1020Contract] = useState(null);

    const [jnyDecimals, setJNYDecimals] = useState(null);
    const [jnyBalance, setJNYBalance] = useState(null);
    const [jnyStaked, setJNYStaked] = useState(null);

    const [_1020deicmals, set1020Decimals] = useState(null);
    const [earned1020, setEarned1020] = useState(null);

    const [_X1020deicmals, setX1020Decimals] = useState(null);

    const [_1020LPDecimals, set1020LPDecimals] = useState(null);
    const [_1020LPBalance, set1020LPBalance] = useState(null);
    const [_1020LPStaked, set1020LPStaked] = useState(null);

    const [pointDeicmals, setPointDecimals] = useState(null);
    const [earnedPoint, setEarnedPoint] = useState(null);

    //  Claimed
    const [hasBeenClaimdReward, setHasBeenClaimed] = useState(null);
    const [pointHasBeenClaimedReward, setPointHasBeenClaimedReward] = useState(null);

    //  Contract2
    //  Contract
    const [contract2, setContract2] = useState(null);
    const [contract2Staked, setContract2Staked] = useState(null);
    const [contract2Earned1020, setContract2Earned1020] = useState(null);
    const [contract2StartBlock, setContract2StartBlock] = useState(null);
    const [contract2EndBlock, setContract2EndBlock] = useState(null);
    const [contract2Claimed1020, setContract2Claimed1020] = useState(null);
    
    //  Contract3
    const [contract3, setContract3] = useState(null);
    const [contract3Staked, setContract3Staked] = useState(null);
    const [contract3Earned1020, setContract3EarnedX1020] = useState(null);
    const [contract3StartBlock, setContract3StartBlock] = useState(null);
    const [contract3EndBlock, setContract3EndBlock] = useState(null);
    const [contract3Claimed1020, setContract3Claimed1020] = useState(null);

    //質押合約
    const StakingCA = stakingCA;
    const LPStakingCA = lpStakingCA;

    //代幣合約
    const JNYCA = jnyCA;
    const CA_1020 = _1020CA
    const LP_1020 = _1020LPCA
    const PointCA = pointCA
    const CA_X1020 = X1020CA

    const parseAndTruncate = (amount, afterDecimal) => {
        const parts = String(amount).split('.');
        if (parts.length === 1 || afterDecimal <= 0) {
            return parts[0];
        }
        const integerPart = parts[0];
        let decimalPart = parts[1] || '';
        decimalPart = decimalPart.padEnd(afterDecimal, '0');
        decimalPart = decimalPart.substring(0, afterDecimal);
        return `${integerPart}.${decimalPart}`;
    };
    

    // const parseAndTruncate = (amount, afterDeciaml) => {
    //     const multiplier = Math.pow(10, afterDeciaml);
    //     const truncatedAmount = Math.floor(amount * multiplier) / multiplier;
    //     return truncatedAmount;
    // };

    const handleIsTxOnChain = async (value) => {
        console.log("New Transaction On Chain, Reload Data")
        await updateData();
    }

    const tryGetUserById = async (tempUserId, tempContract, setClaimed, decimal) => {
        try {
            const getUserById = await tempContract.getUserById(tempUserId);
            const formattedPointReward = ethers.utils.formatUnits(`${getUserById.hasBeenClaimdReward}`, decimal)
            if (getUserById.userAddr.toLowerCase() === defaultAccount.toLowerCase())
                setClaimed(parseAndTruncate(formattedPointReward, 9))
            else
                setClaimed(0)
        } catch (err) {
            setClaimed(0)
        }
    }

    const updateData = async () => {
        const tempBalanceJNY = await jnyContract.balanceOf(defaultAccount);
        const formattedBalance = ethers.utils.formatUnits(`${tempBalanceJNY}`, jnyDecimals);
        setJNYBalance(parseAndTruncate(formattedBalance, 2));

        const tempStakedJNY = await contract.getUserTotalAmount(defaultAccount);
        const formattedStakedBalance = ethers.utils.formatUnits(`${tempStakedJNY}`, jnyDecimals);
        setJNYStaked(parseAndTruncate(formattedStakedBalance, 2));

        const tempGained1020 = await contract.pendingReward(defaultAccount);
        const formattedGained1020 = ethers.utils.formatUnits(`${tempGained1020}`, _1020deicmals);
        setEarned1020(parseAndTruncate(formattedGained1020, 5));

        const tempStakedJNY_2 = await contract2.getUserTotalAmount(defaultAccount);
        const formattedStakedBalance_2 = ethers.utils.formatUnits(`${tempStakedJNY_2}`, jnyDecimals);
        setContract2Staked(parseAndTruncate(formattedStakedBalance_2, 2));

        const tempGained1020_2 = await contract2.pendingReward(defaultAccount);
        const formattedGained1020_2 = ethers.utils.formatUnits(`${tempGained1020_2}`, _1020deicmals);
        setContract2Earned1020(parseAndTruncate(formattedGained1020_2, 5));

        const temp1020LPBalance = await _1020LPContract.balanceOf(defaultAccount);
        const formatted1020LPBalance = ethers.utils.formatUnits(`${temp1020LPBalance}`, _1020LPDecimals);
        set1020LPBalance(parseAndTruncate(formatted1020LPBalance, 9))

        const tempStaked1020LP = await lpStakingContract.getUserTotalAmount(defaultAccount);
        const formattedStaked1020LPBalance = ethers.utils.formatUnits(`${tempStaked1020LP}`, _1020LPDecimals);
        set1020LPStaked(parseAndTruncate(formattedStaked1020LPBalance, 9));

        //  可提領的 Point
        const tempGainedPoint = await lpStakingContract.pendingReward(defaultAccount);
        const formattedGainedPoint = ethers.utils.formatUnits(`${tempGainedPoint}`, pointDeicmals);
        setEarnedPoint(parseAndTruncate(formattedGainedPoint, 9));

        const tempStakedJNY_3 = await contract3.getUserTotalAmount(defaultAccount);
        const formattedStakedBalance_3 = ethers.utils.formatUnits(`${tempStakedJNY_3}`, jnyDecimals);
        setContract3Staked(parseAndTruncate(formattedStakedBalance_3, 2));

        const tempGainedX1020 = await contract3.pendingReward(defaultAccount);
        const formattedGainedX1020 = ethers.utils.formatUnits(`${tempGainedX1020}`, _X1020deicmals);
        setContract3EarnedX1020(parseAndTruncate(formattedGainedX1020, 5));
    }

    const updateEthers = async () => {
        try {
            const tempProvider = new ethers.providers.Web3Provider(window.ethereum);
            setProvider(tempProvider);

            const tempSigner = tempProvider.getSigner();
            setSigner(tempSigner);

            //  合約資料
            const tempContract = new ethers.Contract(StakingCA, StakingABI, tempSigner)
            setContract(tempContract);
            const tempLPStakingContract = new ethers.Contract(LPStakingCA, StakingABI, tempSigner)
            setLpStakingContract(tempLPStakingContract);
            const tempContract2 = new ethers.Contract(stakingCA2, StakingABI, tempSigner)
            setContract2(tempContract2);

            console.log(1)

            const tempContractStartBlock = await tempContract.startBlock();
            const formattedContractStartBlock = ethers.utils.formatUnits(`${tempContractStartBlock}`, 0);
            setContractStartBlock(formattedContractStartBlock)

            const tempLpContractStartBlock = await tempLPStakingContract.startBlock();
            const formattedLpContractStartBlock = ethers.utils.formatUnits(`${tempLpContractStartBlock}`, 0);
            setLpContractStartBlock(formattedLpContractStartBlock)

            const tempContractStartBlock_2 = await tempContract2.startBlock();
            const formattedContractStartBlock_2 = ethers.utils.formatUnits(`${tempContractStartBlock_2}`, 0);
            setContract2StartBlock(formattedContractStartBlock_2)

            console.log(2)

            //  代幣資料
            const tempJNYContract = new ethers.Contract(JNYCA, TokenABI, tempSigner)
            setJNYContract(tempJNYContract);
            const temp1020Contract = new ethers.Contract(CA_1020, TokenABI, tempSigner)
            set1020Contract(temp1020Contract);
            const temp1020LPContract = new ethers.Contract(LP_1020, TokenABI, tempSigner)
            set1020LPContract(temp1020LPContract);
            const tempPointContract = new ethers.Contract(PointCA, TokenABI, tempSigner)
            setPointContract(tempPointContract);
            
            console.log(3)


            //  代幣精度
            
            const tempDecimalJNY = await tempJNYContract.decimals();
            setJNYDecimals(tempDecimalJNY);
            const tempDecimal1020 = await temp1020Contract.decimals();
            set1020Decimals(tempDecimal1020);
            const tempDecimal1020LP = await temp1020LPContract.decimals();
            set1020LPDecimals(tempDecimal1020LP);
            const tempDecimalPoint = await tempPointContract.decimals();
            setPointDecimals(tempDecimalPoint);


            console.log(4)
            //  質押 JNY 獲得 1020 資料

            //  持有JNY
            const tempBalanceJNY = await tempJNYContract.balanceOf(defaultAccount);
            const formattedBalance = ethers.utils.formatUnits(`${tempBalanceJNY}`, tempDecimalJNY);
            setJNYBalance(parseAndTruncate(formattedBalance, 2));

            //  質押JNY
            const tempStakedJNY = await tempContract.getUserTotalAmount(defaultAccount);
            const formattedStakedBalance = ethers.utils.formatUnits(`${tempStakedJNY}`, tempDecimalJNY);
            setJNYStaked(parseAndTruncate(formattedStakedBalance, 2));

            //  可提領的1020
            const tempGained1020 = await tempContract.pendingReward(defaultAccount);
            const formattedGained1020 = ethers.utils.formatUnits(`${tempGained1020}`, tempDecimal1020);
            setEarned1020(parseAndTruncate(formattedGained1020, 5));


            //  質押 1020LP 獲得 Points 資料

            //  持有 1020LP
            const temp1020LPBalance = await temp1020LPContract.balanceOf(defaultAccount);
            const formatted1020LPBalance = ethers.utils.formatUnits(`${temp1020LPBalance}`, tempDecimal1020LP);
            set1020LPBalance(parseAndTruncate(formatted1020LPBalance, 9))

            //  質押 1020LP
            const tempStaked1020LP = await tempLPStakingContract.getUserTotalAmount(defaultAccount);
            const formattedStaked1020LPBalance = ethers.utils.formatUnits(`${tempStaked1020LP}`, tempDecimal1020LP);
            set1020LPStaked(parseAndTruncate(formattedStaked1020LPBalance, 9));

            //  可提領的 Point
            const tempGainedPoint = await tempLPStakingContract.pendingReward(defaultAccount);
            const formattedGainedPoint = ethers.utils.formatUnits(`${tempGainedPoint}`, tempDecimalPoint);
            setEarnedPoint(parseAndTruncate(formattedGainedPoint, 9));

            //  質押合約 結束時間
            const tempContractEndBlock = await tempContract.bonusEndBlock();
            const formattedContractEndBlock = ethers.utils.formatUnits(`${tempContractEndBlock}`, 0);
            setContractEndBlock(formattedContractEndBlock)

            const tempLpContractEndBlock = await tempLPStakingContract.bonusEndBlock();
            const formattedLpContractEndBlock = ethers.utils.formatUnits(`${tempLpContractEndBlock}`, 0);
            setLpContractEndBlock(formattedLpContractEndBlock)

            const tempContractEndBlock_2 = await tempContract2.bonusEndBlock();
            const formattedContractEndBlock_2 = ethers.utils.formatUnits(`${tempContractEndBlock_2}`, 0);
            setContract2EndBlock(formattedContractEndBlock_2)
            

            //  已領取的 1020 數量
            const tempUserId = await tempContract._usersId(defaultAccount)
            tryGetUserById(tempUserId, tempContract, setHasBeenClaimed, tempDecimal1020);

            //  已領取的 Point 數量
            const tempLpStakingUserId = await tempLPStakingContract._usersId(defaultAccount)
            tryGetUserById(tempLpStakingUserId, tempLPStakingContract, setPointHasBeenClaimedReward, tempDecimalPoint);

            const tempStakedJNY2 = await tempContract2.getUserTotalAmount(defaultAccount);
            const formattedStakedBalance2 = ethers.utils.formatUnits(`${tempStakedJNY2}`, tempDecimalJNY);
            setContract2Staked(parseAndTruncate(formattedStakedBalance2, 2));

            
            const tempGained1020_2 = await tempContract2.pendingReward(defaultAccount);
            const formattedGained1020_2 = ethers.utils.formatUnits(`${tempGained1020_2}`, tempDecimal1020);
            setContract2Earned1020(parseAndTruncate(formattedGained1020_2, 5));

            const tempUserId_2 = await tempContract2._usersId(defaultAccount)
            tryGetUserById(tempUserId_2, tempContract2, setContract2Claimed1020, tempDecimal1020);

            //  X1020
            
            const tempContract3 = new ethers.Contract(stakingCA3, StakingABI, tempSigner)
            setContract3(tempContract3);

            const tempContractStartBlock_3 = await tempContract3.startBlock();
            const formattedContractStartBlock_3 = ethers.utils.formatUnits(`${tempContractStartBlock_3}`, 0);
            setContract3StartBlock(formattedContractStartBlock_3)

            const tempContractEndBlock_3 = await tempContract3.bonusEndBlock();
            const formattedContractEndBlock_3 = ethers.utils.formatUnits(`${tempContractEndBlock_3}`, 0);
            setContract3EndBlock(formattedContractEndBlock_3)

            const tempX1020Contract = new ethers.Contract(CA_X1020, TokenABI, tempSigner)
            setX1020Contract(tempX1020Contract);

            const tempDecimalX1020 = await tempX1020Contract.decimals();
            setX1020Decimals(tempDecimalX1020);
            
            //  可提領的X1020
            const tempGainedX1020 = await tempContract3.pendingReward(defaultAccount);
            const formattedGainedX1020 = ethers.utils.formatUnits(`${tempGainedX1020}`, tempDecimalX1020);
            setContract3EarnedX1020(parseAndTruncate(formattedGainedX1020, 5));
            
            const tempStakedJNY3 = await tempContract3.getUserTotalAmount(defaultAccount);
            const formattedStakedBalance3 = ethers.utils.formatUnits(`${tempStakedJNY3}`, tempDecimalJNY);
            setContract3Staked(parseAndTruncate(formattedStakedBalance3, 2));

            const tempUserId_3 = await tempContract3._usersId(defaultAccount)
            tryGetUserById(tempUserId_3, tempContract3, setContract3Claimed1020, tempDecimalX1020);
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if (defaultAccount === null) return;
        updateEthers();
    }, [defaultAccount])

    const stakingContract3SonTokenName = language === "EN" ? "Gem Energy" : "寶石能量值"

    return (
        <section id="Staking"
            style={{
                minHeight: '50vh',
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                backgroundColor: 'rgb(83,0,117)',
                justifyContent: 'space-evenly',
                padding: '20px',
            }}>
            <StakingCard
                fatherTokenName={"JNY"}
                sonTokenName={"1020"}
                language={language}
                contract={contract}
                defaultAccount={defaultAccount}
                fatherContract={jnyContract}
                provider={provider}
                fatherDecimals={jnyDecimals}
                fatherBalance={jnyBalance}
                fatherStaked={jnyStaked}
                sonGained={earned1020}
                isSuccess={handleIsTxOnChain}
                isAreaOpen={true}
                Phase={1}
                startBlock={contractStartBlock}
                bonusEndBlock={contractEndBlock}
                hasBeenClaimdReward={hasBeenClaimdReward}
            />
            <StakingCard
                fatherTokenName={"1020LP"}
                sonTokenName={stakingContract3SonTokenName}
                language={language}
                contract={lpStakingContract}
                defaultAccount={defaultAccount}
                fatherContract={_1020LPContract}
                provider={provider}
                fatherDecimals={_1020LPDecimals}
                fatherBalance={_1020LPBalance}
                fatherStaked={_1020LPStaked}
                sonGained={earnedPoint}
                isSuccess={handleIsTxOnChain}
                isAreaOpen={false}
                Phase={2}
                startBlock={lpContractStartBlock}
                bonusEndBlock={lpContractEndBlock}
                hasBeenClaimdReward={pointHasBeenClaimedReward}
            />
            <StakingCard
                fatherTokenName={"JNY"}
                sonTokenName={"1020"}
                language={language}
                contract={contract2}
                defaultAccount={defaultAccount}
                fatherContract={jnyContract}
                provider={provider}
                fatherDecimals={jnyDecimals}
                fatherBalance={jnyBalance}
                fatherStaked={contract2Staked}
                sonGained={contract2Earned1020}
                isSuccess={handleIsTxOnChain}
                isAreaOpen={false}
                Phase={3}
                startBlock={contract2StartBlock}
                bonusEndBlock={contract2EndBlock}
                hasBeenClaimdReward={contract2Claimed1020}
            />
            <StakingCard
                fatherTokenName={"JNY"}
                sonTokenName={"X1020"}
                language={language}
                contract={contract3}
                defaultAccount={defaultAccount}
                fatherContract={jnyContract}
                provider={provider}
                fatherDecimals={jnyDecimals}
                fatherBalance={jnyBalance}
                fatherStaked={contract3Staked}
                sonGained={contract3Earned1020}
                isSuccess={handleIsTxOnChain}
                isAreaOpen={false}
                Phase={4}
                startBlock={contract3StartBlock}
                bonusEndBlock={contract3EndBlock}
                hasBeenClaimdReward={contract3Claimed1020}
            />
        </section>
    )
}

const Shop = ({ language }) => {
    const productListstyles = {
        display: 'flex',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '20px',
        margin: '20px',
        flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center',
    };

    const products = [
        {
            id: 1,
            name: language === "EN"
                ? "Collaboration Whitelist Exchange Zone"
                : "合作白名單兌換區",
            price: 0.99,
            image: 'product1.jpg',
            description:
                language === "EN"
                    ? "High-Quality Collaborative Research Project Whitelist"
                    : "高品質合作投研項目白名單",
        },
        {
            id: 2,
            name: language === "EN"
                ? "1020 Token Exchange Zone"
                : "1020 代幣兌換區",
            price: 1.99,
            image: 'product2.jpg',
            description:
                language === "EN"
                    ? "High Net Worth 1020 Tokens"
                    : "高淨值1020代幣",
        },
        {
            id: 3,
            name: language === "EN"
                ? "NFT Exchange Zone"
                : "NFT兌換區",
            price: 2.99,
            image: 'product2.jpg',
            description:
                language === "EN"
                    ? "Limited Edition Collectible NFT"
                    : "限量珍藏級NFT"
        },
        {
            id: 4,
            name: language === "EN"
                ? "1020 Venture Company Equity"
                : "1020 風投公司股權",
            price: 3.99,
            image: 'product2.jpg',
            description:
                language === "EN"
                    ? "1020 establishes an industry-leading enterprise risk management company, where community members can exchange for valuable equity, enjoying unique opportunities and resources."
                    : "1020成立行內領先企業風控公司，社區成員可兌換價值股權，享受獨特機會及資源",
        },
        {
            id: 5,
            name: language === "EN"
                ? "Irregular Event Benefits"
                : "不定期活動福利",
            price: "unknown",
            image: 'product2.jpg',
            description:
                language === "EN"
                    ? "Irregularly held events with benefits, featuring abundant gifts and airdrops."
                    : "不定期舉辦的活動，提供豐富的禮品和空投。",
        },
        // Add more products...
    ];
    const addToCart = () => {
        console.log("Added");
    }
    const containerStyles = {
        display: 'grid',
        margin: '20px',
        marginLeft: '5vw'
    }
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'center',
            justifyContent: 'center'
        }}>
            <h1 style={{
                color: '#A017D7', fontWeight: 'bolder'
            }}>
                {
                    language === "EN"
                        ? "Gem Energy Point Ecosystem Center"
                        : "寶石能量point生態中心"
                }

            </h1>
            <div>
                <div style={productListstyles}>
                    {products.map(product => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            addToCart={addToCart}
                            language={language}
                        />
                    ))}
                </div>
            </div>
        </div >
    )
}

const Footer = () => {
    return (
        <footer data-elementor-type="footer" data-elementor-id={387} className="elementor elementor-387 elementor-location-footer">
            <section className="elementor-section elementor-top-section elementor-element elementor-element-1675da0 elementor-section-boxed elementor-section-height-default elementor-section-height-default" data-id="1675da0" data-element_type="section" data-settings="{&quot;background_background&quot;:&quot;classic&quot;}"
                style={{ backgroundColor: '#FF963C', display: 'flex', justifyContent: 'center', color: 'white', marginTop: '10px' }}>
                <p>COPYRIGHT 2023 © 1020 | POWERED BY 1020</p>
            </section>
        </footer>
    )
}

const About = () => {
    const [language, setLanguage] = useState("EN")
    const [defaultAccount, setDefaultAccount] = useState(null);
    const languageHandler = (value) => {
        setLanguage(value)
    }
    const handleDefaultAccountChange = (value) => {
        setDefaultAccount(value);
        console.log(value)
    }

    const CAs = {
        stakingCA: '0xc70D391ee54bE502154d0d48Be2674eafe7f7CB7',     //Formal
        // stakingCA: '0x410e2968f2CDC049ed5E2622Ed8CE9a3064CD9Fe',        //Test
        stakingCA2: '0x9E0D2393068921a8C46469A1d9F0504F2DFCbcf8',
        JNYCA: '0x1E83D06E17CAE34415BeA30116aC755456131020',
        _1020CA: '0x606261Dd5C435f4628bb557EC8CF3b5a0B131020',
        X1020CA: '0x8aA98bdbC4BF7E6A65aBBb19244b850f0cB32024',

        // lpStakingCA: '0x25dA6086b943393b79746869832414d32Ef5aDe4',  //Moto
        lpStakingCA: '0xC3F60887319b97a3bdE64B4c7E6E9FbDC2a07171',  //  New
        _1020LPCA: '0x7f41f3EA8D269B535353C912b3871a83236cB8B0',    //  New
        // _1020LPCA: '0x42B9E132569Cb3FA1B3af0a52D5Cac5d98A9eC44', // Moto
        PointCA: '0x1c65D4A15e943f4fd2DaE158D8c3E9fD0f7EbfE0',

        stakingCA3:'0x1031Cd792842b72F0a1d3111D048c2cAbD311727',
    }

    const stakingCenterText = language === "EN" ? "Staking Center" : "質押中心";
    return (
        <div style={{ backgroundColor: '#FDF8FF' }}>
            <Navbar setLan={languageHandler} defaultAccountChange={handleDefaultAccountChange} />

            <div data-elementor-type="wp-page" data-elementor-id={177} className="elementor elementor-177">
                <Hero language={language} />
                <Content1 language={language} />
                <Content2 language={language} _1020CA={CAs._1020CA} />

                <Marquee
                    content={stakingCenterText}
                    speed={10}
                />
                <Staking
                    defaultAccount={defaultAccount} language={language}
                    stakingCA={CAs.stakingCA}
                    stakingCA2={CAs.stakingCA2}
                    lpStakingCA={CAs.lpStakingCA}
                    jnyCA={CAs.JNYCA}
                    _1020CA={CAs._1020CA}
                    _1020LPCA={CAs._1020LPCA}
                    pointCA={CAs.PointCA}
                    stakingCA3={CAs.stakingCA3}
                    X1020CA={CAs.X1020CA}
                />

                <Marquee
                    content={null}
                    speed={10}
                />
                <Shop language={language} />
            </div>
            <Footer />
        </div>
    );
}

export default About;